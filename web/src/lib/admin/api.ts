import 'server-only'
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { currentAdmin } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/supabase/env'
import { CMS_TAG } from '@/lib/cms/queries'

export const json = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { 'Cache-Control': 'private, no-store' } })
export const fail = (error: string, status = 400) => json({ error }, status)

// Every admin endpoint starts here. Row level security enforces the same rule
// in the database; this check just gives a clear error early.
export async function requireAdmin() {
  if (!hasSupabase) return { error: fail('Supabase is not configured. Set the variables in .env.local.', 503) } as const
  const { supabase, email } = await currentAdmin()
  if (!email) {
    const { data } = await supabase.auth.getClaims()
    return { error: data?.claims ? fail('Your account is not an admin. Ask an existing admin to add your email.', 403) : fail('Please sign in.', 401) } as const
  }
  return { supabase, email } as const
}

// Expire the public cache right away so the next visit (and the realtime
// refresh in open tabs) shows the change.
export function published() {
  revalidateTag(CMS_TAG, { expire: 0 })
}

export async function body<T = Record<string, unknown>>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T
  } catch {
    return null
  }
}

export const dbError = (e: { message: string; code?: string } | null) =>
  e ? fail(e.code === '23505' ? 'That slug or key is already used.' : e.message, e.code === '42501' ? 403 : 400) : null

export const COLLECTIONS = ['services', 'projects', 'posts'] as const
export type Collection = (typeof COLLECTIONS)[number]
export const isCollection = (c: string): c is Collection => (COLLECTIONS as readonly string[]).includes(c)

// Columns an admin may write, per table. Anything else in a request is dropped.
export const WRITABLE: Record<Collection, string[]> = {
  services: ['slug', 'title', 'summary', 'body', 'features', 'deliverables', 'color', 'cover_url', 'position', 'published', 'seo_title', 'seo_description'],
  projects: ['slug', 'name', 'client', 'category', 'service_slug', 'year', 'url', 'color', 'cover_url', 'gallery', 'summary', 'body', 'quote', 'quote_author', 'rating', 'results', 'tags', 'featured', 'position', 'published', 'seo_title', 'seo_description'],
  posts: ['slug', 'title', 'excerpt', 'body', 'cover_url', 'tags', 'author', 'read_minutes', 'published_at', 'published', 'seo_title', 'seo_description'],
}
export function pick(input: Record<string, unknown>, keys: string[]) {
  const out: Record<string, unknown> = {}
  for (const k of keys) if (k in input) out[k] = input[k] === '' && /(_url|_title|_description|url|service_slug|year|rating|read_minutes)$/.test(k) ? null : input[k]
  return out
}
