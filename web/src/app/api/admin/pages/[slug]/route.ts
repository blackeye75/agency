import { body, dbError, fail, json, published, requireAdmin } from '@/lib/admin/api'

export async function GET(_req: Request, { params }: RouteContext<'/api/admin/pages/[slug]'>) {
  const { slug } = await params
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const [page, sections] = await Promise.all([
    auth.supabase.from('pages').select('*').eq('slug', slug).maybeSingle(),
    auth.supabase.from('sections').select('*').eq('page_slug', slug).order('position'),
  ])
  if (page.error) return dbError(page.error)!
  if (!page.data) return fail('Page not found.', 404)
  return json({ page: page.data, sections: sections.data ?? [] })
}

export async function PATCH(req: Request, { params }: RouteContext<'/api/admin/pages/[slug]'>) {
  const { slug } = await params
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const input = await body(req)
  if (!input) return fail('Missing data.')
  const patch: Record<string, string | null> = {}
  for (const k of ['title', 'seo_title', 'seo_description', 'og_image'] as const) if (k in input) patch[k] = (input[k] as string) || (k === 'title' ? slug : null)
  const { error } = await auth.supabase.from('pages').update(patch as never).eq('slug', slug)
  if (error) return dbError(error)!
  published()
  return json({ ok: true })
}
