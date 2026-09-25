'use client'
import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './database.types'
import { SUPABASE_KEY, SUPABASE_URL, hasSupabase } from './env'

let client: ReturnType<typeof createBrowserClient<Database>> | null = null

export function browserClient() {
  if (!hasSupabase) return null
  client ??= createBrowserClient<Database>(SUPABASE_URL, SUPABASE_KEY)
  return client
}
