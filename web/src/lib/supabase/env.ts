// Supabase connection details. Both are public: the publishable key can only do
// what row level security allows. When they are missing the site renders the
// built-in default content and the admin panel explains how to connect.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ''
export const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_KEY)

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000').replace(/\/$/, '')

export const MEDIA_BUCKET = 'media'
