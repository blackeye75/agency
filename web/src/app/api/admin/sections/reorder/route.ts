import { body, dbError, fail, json, published, requireAdmin } from '@/lib/admin/api'

// Body: { ids: string[] } in the new order.
export async function POST(req: Request) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const input = await body<{ ids: string[] }>(req)
  if (!Array.isArray(input?.ids)) return fail('Missing order.')
  const results = await Promise.all(input.ids.map((id, position) => auth.supabase.from('sections').update({ position }).eq('id', id)))
  const failed = results.find((r) => r.error)
  if (failed?.error) return dbError(failed.error)!
  published()
  return json({ ok: true })
}
