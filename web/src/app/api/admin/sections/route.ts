import { body, dbError, fail, json, published, requireAdmin } from '@/lib/admin/api'
import { SECTION_TYPES } from '@/lib/cms/schema'

export async function POST(req: Request) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const input = await body<{ page_slug: string; type: string; key?: string; label?: string; data?: object; position?: number }>(req)
  if (!input?.page_slug || !input.type || !(input.type in SECTION_TYPES)) return fail('Pick a page and a section type.')
  const key = (input.key || `${input.type}-${Date.now().toString(36)}`).toLowerCase().replace(/[^a-z0-9-]+/g, '-')
  const { data, error } = await auth.supabase.from('sections')
    .insert({ page_slug: input.page_slug, type: input.type, key, label: input.label ?? SECTION_TYPES[input.type as keyof typeof SECTION_TYPES].label, data: (input.data ?? {}) as never, position: input.position ?? 999 })
    .select().single()
  if (error) return dbError(error)!
  published()
  return json({ section: data }, 201)
}
