import { dbError, json, requireAdmin } from '@/lib/admin/api'

export async function GET() {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const { data, error } = await auth.supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(500)
  if (error) return dbError(error)!
  return json({ items: data })
}
