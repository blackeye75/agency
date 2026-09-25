import 'server-only'
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'
import { SUPABASE_KEY, SUPABASE_URL, hasSupabase } from './env'

// Cookie-less client for public reads inside 'use cache' scopes. It always
// reads as a visitor, so drafts never leak into the cached public pages.
let client: ReturnType<typeof createClient<Database>> | null = null

export function publicClient() {
  if (!hasSupabase) return null
  client ??= createClient<Database>(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
  return client
}
