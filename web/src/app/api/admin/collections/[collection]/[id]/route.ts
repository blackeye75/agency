import { WRITABLE, body, dbError, fail, isCollection, json, pick, published, requireAdmin } from '@/lib/admin/api'

type Ctx = RouteContext<'/api/admin/collections/[collection]/[id]'>

export async function GET(_req: Request, { params }: Ctx) {
  const { collection, id } = await params
  if (!isCollection(collection)) return fail('Unknown collection.', 404)
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const { data, error } = await auth.supabase.from(collection).select('*').eq('id', id).maybeSingle()
  if (error) return dbError(error)!
  if (!data) return fail('Not found.', 404)
  return json({ item: data })
}

export async function PATCH(req: Request, { params }: Ctx) {
  const { collection, id } = await params
  if (!isCollection(collection)) return fail('Unknown collection.', 404)
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const input = await body(req)
  if (!input) return fail('Missing data.')
  const { data, error } = await auth.supabase.from(collection).update(pick(input, WRITABLE[collection]) as never).eq('id', id).select().single()
  if (error) return dbError(error)!
  published()
  return json({ item: data })
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const { collection, id } = await params
  if (!isCollection(collection)) return fail('Unknown collection.', 404)
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const { error } = await auth.supabase.from(collection).delete().eq('id', id)
  if (error) return dbError(error)!
  published()
  return json({ ok: true })
}
