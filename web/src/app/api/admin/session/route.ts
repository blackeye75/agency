import { currentAdmin } from '@/lib/supabase/server'
import { hasSupabase } from '@/lib/supabase/env'
import { json } from '@/lib/admin/api'

export async function GET() {
  if (!hasSupabase) return json({ configured: false, email: null, admin: false })
  const { supabase, email } = await currentAdmin()
  const { data } = await supabase.auth.getClaims()
  return json({ configured: true, email: (data?.claims?.email as string) ?? null, admin: Boolean(email) })
}
