import 'server-only'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './database.types'
import { SUPABASE_KEY, SUPABASE_URL } from './env'

// Per-request client that acts as the signed-in user (route handlers only).
export async function serverClient() {
  const store = await cookies()
  return createServerClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll: () => store.getAll(),
      setAll(list) {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options))
        } catch {
          // Called from a Server Component: the proxy refreshes the session instead.
        }
      },
    },
  })
}

// The signed-in admin, or null. Verifies the JWT and checks the admins table.
export async function currentAdmin() {
  const supabase = await serverClient()
  const { data } = await supabase.auth.getClaims()
  const email = data?.claims?.email as string | undefined
  if (!email) return { supabase, email: null }
  const { data: isAdmin } = await supabase.rpc('is_admin')
  return { supabase, email: isAdmin ? email : null }
}
