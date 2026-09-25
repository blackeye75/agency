import { WRITABLE, body, dbError, fail, isCollection, json, pick, published, requireAdmin } from '@/lib/admin/api'

export async function GET(_req: Request, { params }: RouteContext<'/api/admin/collections/[collection]'>) {
  const { collection } = await params
  if (!isCollection(collection)) return fail('Unknown collection.', 404)
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const order = collection === 'posts' ? 'published_at' : 'position'
  const { data, error } = await auth.supabase.from(collection).select('*').order(order, { ascending: collection !== 'posts' })
  if (error) return dbError(error)!
  return json({ items: data })
}

export async function POST(req: Request, { params }: RouteContext<'/api/admin/collections/[collection]'>) {
  const { collection } = await params
  if (!isCollection(collection)) return fail('Unknown collection.', 404)
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const input = await body(req)
  if (!input) return fail('Missing data.')
  const row = pick(input, WRITABLE[collection])
  if (!row.slug) return fail('Add a URL slug.')
  const { data, error } = await auth.supabase.from(collection).insert(row as never).select().single()
  if (error) return dbError(error)!
  published()
  return json({ item: data }, 201)
}
