import { json, requireAdmin, dbError } from '@/lib/admin/api'

export async function GET() {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const [pages, sections] = await Promise.all([
    auth.supabase.from('pages').select('slug, title, updated_at').order('slug'),
    auth.supabase.from('sections').select('page_slug'),
  ])
  if (pages.error) return dbError(pages.error)!
  const counts = new Map<string, number>()
  sections.data?.forEach((s) => counts.set(s.page_slug, (counts.get(s.page_slug) ?? 0) + 1))
  return json({ pages: pages.data.map((p) => ({ ...p, sections: counts.get(p.slug) ?? 0 })) })
}
