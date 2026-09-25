import { z } from 'zod'
import { publicClient } from '@/lib/supabase/public'
import { fail, json } from '@/lib/admin/api'

const Lead = z.object({
  kind: z.enum(['contact', 'quote']),
  name: z.string().trim().min(1, 'Please add your name.').max(200),
  email: z.string().trim().email('Please add a valid email.').max(320),
  phone: z.string().trim().max(40).optional().default(''),
  company: z.string().trim().max(200).optional().default(''),
  message: z.string().trim().max(5000).optional().default(''),
  services: z.array(z.string().max(100)).max(20).optional().default([]),
  budget: z.string().trim().max(100).optional().default(''),
  timeline: z.string().trim().max(100).optional().default(''),
  source_page: z.string().max(300).optional().default(''),
  website: z.string().optional().default(''), // honeypot
})

// Rough per-instance rate limit: 5 leads per address per 10 minutes.
const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now(), recent = (hits.get(ip) ?? []).filter((t) => now - t < 600_000)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > 5
}

export async function POST(req: Request) {
  const parsed = Lead.safeParse(await req.json().catch(() => null))
  if (!parsed.success) return fail(parsed.error.issues[0]?.message ?? 'Please check the form.', 422)
  const lead = parsed.data
  if (lead.website) return json({ ok: true }) // bots fill the hidden field
  if (lead.kind === 'contact' && !lead.message) return fail('Please add a short message.', 422)
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (limited(ip)) return fail('Too many messages. Please try again in a few minutes.', 429)

  const db = publicClient()
  if (!db) return fail('The form is not connected yet. Please email us instead.', 503)
  const { error } = await db.from('leads').insert({
    kind: lead.kind, name: lead.name, email: lead.email, phone: lead.phone || null, company: lead.company || null,
    message: lead.message, services: lead.services, budget: lead.budget || null, timeline: lead.timeline || null,
    source_page: lead.source_page || null,
  })
  if (error) return fail('Could not send your message. Please email us instead.', 500)
  return json({ ok: true }, 201)
}
