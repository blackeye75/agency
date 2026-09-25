import { body, dbError, fail, json, requireAdmin } from '@/lib/admin/api'

const STATUSES = ['new', 'contacted', 'won', 'lost', 'spam']

export async function PATCH(req: Request, { params }: RouteContext<'/api/admin/leads/[id]'>) {
  const { id } = await params
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const input = await body<{ status: string }>(req)
  if (!input || !STATUSES.includes(input.status)) return fail('Unknown status.')
  const { error } = await auth.supabase.from('leads').update({ status: input.status }).eq('id', id)
  if (error) return dbError(error)!
  return json({ ok: true })
}

export async function DELETE(_req: Request, { params }: RouteContext<'/api/admin/leads/[id]'>) {
  const { id } = await params
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const { error } = await auth.supabase.from('leads').delete().eq('id', id)
  if (error) return dbError(error)!
  return json({ ok: true })
}
