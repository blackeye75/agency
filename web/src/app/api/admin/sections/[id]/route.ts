import { body, dbError, fail, json, published, requireAdmin } from '@/lib/admin/api'

export async function PATCH(req: Request, { params }: RouteContext<'/api/admin/sections/[id]'>) {
  const { id } = await params
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const input = await body(req)
  if (!input) return fail('Missing data.')
  const patch: Record<string, unknown> = {}
  if ('data' in input && typeof input.data === 'object') patch.data = input.data
  if ('label' in input) patch.label = String(input.label ?? '')
  if ('visible' in input) patch.visible = Boolean(input.visible)
  if ('position' in input) patch.position = Number(input.position)
  const { data, error } = await auth.supabase.from('sections').update(patch as never).eq('id', id).select().single()
  if (error) return dbError(error)!
  published()
  return json({ section: data })
}

export async function DELETE(_req: Request, { params }: RouteContext<'/api/admin/sections/[id]'>) {
  const { id } = await params
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const { error } = await auth.supabase.from('sections').delete().eq('id', id)
  if (error) return dbError(error)!
  published()
  return json({ ok: true })
}
