import { body, dbError, fail, json, published, requireAdmin } from '@/lib/admin/api'
import { seedSettings } from '@/lib/cms/seed'

export async function GET() {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const { data, error } = await auth.supabase.from('settings').select('data, updated_at').eq('id', 'site').maybeSingle()
  if (error) return dbError(error)!
  return json({ data: { ...seedSettings, ...((data?.data as object) ?? {}) }, updated_at: data?.updated_at ?? null })
}

export async function PUT(req: Request) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const input = await body<{ data: Record<string, unknown> }>(req)
  if (!input?.data || typeof input.data !== 'object') return fail('Missing settings data.')
  const { error } = await auth.supabase.from('settings').upsert({ id: 'site', data: input.data as never })
  if (error) return dbError(error)!
  published()
  return json({ ok: true })
}
