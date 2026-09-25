// Generated from the Supabase schema (supabase/migrations). Regenerate after schema changes:
//   npx supabase gen types typescript --project-id lfftdrhhrpcnbqosxnbb > src/lib/supabase/database.types.ts
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

type Row<T> = T
type Ins<T> = Partial<T>

type AdminsRow = { created_at: string; email: string }
type LeadsRow = {
  budget: string | null; company: string | null; created_at: string; email: string; id: string; kind: string
  message: string; name: string; phone: string | null; services: Json; source_page: string | null; status: string; timeline: string | null
}
type PagesRow = {
  og_image: string | null; seo_description: string | null; seo_title: string | null; slug: string; title: string
  updated_at: string; updated_by: string | null
}
type PostsRow = {
  author: string; body: string; cover_url: string | null; created_at: string; excerpt: string; id: string; published: boolean
  published_at: string; read_minutes: number | null; seo_description: string | null; seo_title: string | null; slug: string
  tags: Json; title: string; updated_at: string; updated_by: string | null
}
type ProjectsRow = {
  body: string; category: string; client: string; color: string; cover_url: string | null; created_at: string; featured: boolean
  gallery: Json; id: string; name: string; position: number; published: boolean; quote: string; quote_author: string
  rating: number | null; results: Json; seo_description: string | null; seo_title: string | null; service_slug: string | null
  slug: string; summary: string; tags: Json; updated_at: string; updated_by: string | null; url: string | null; year: number | null
}
type SectionsRow = {
  data: Json; id: string; key: string; label: string | null; page_slug: string; position: number; type: string
  updated_at: string; updated_by: string | null; visible: boolean
}
type ServicesRow = {
  body: string; color: string; cover_url: string | null; created_at: string; deliverables: Json; features: Json; id: string
  position: number; published: boolean; seo_description: string | null; seo_title: string | null; slug: string; summary: string
  title: string; updated_at: string; updated_by: string | null
}
type SettingsRow = { data: Json; id: string; updated_at: string; updated_by: string | null }

type T<R, Req extends keyof R> = {
  Row: Row<R>
  Insert: Ins<R> & Pick<R, Req>
  Update: Ins<R>
  Relationships: []
}

export type Database = {
  __InternalSupabase: { PostgrestVersion: '14.5' }
  public: {
    Tables: {
      admins: T<AdminsRow, 'email'>
      leads: T<LeadsRow, 'email' | 'kind' | 'name'>
      pages: T<PagesRow, 'slug' | 'title'>
      posts: T<PostsRow, 'slug' | 'title'>
      projects: T<ProjectsRow, 'name' | 'slug'>
      sections: T<SectionsRow, 'key' | 'page_slug' | 'type'>
      services: T<ServicesRow, 'slug' | 'title'>
      settings: T<SettingsRow, never>
    }
    Views: { [_ in never]: never }
    Functions: { is_admin: { Args: never; Returns: boolean } }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

export type TableName = keyof Database['public']['Tables']
export type TableRow<N extends TableName> = Database['public']['Tables'][N]['Row']
