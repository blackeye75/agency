import { dbError, fail, json, requireAdmin } from '@/lib/admin/api'
import { MEDIA_BUCKET } from '@/lib/supabase/env'

// Files are uploaded straight from the browser to Supabase Storage (so large
// videos don't pass through this server); listing and deleting happen here.
export async function GET() {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const bucket = auth.supabase.storage.from(MEDIA_BUCKET)
  const { data, error } = await bucket.list('uploads', { limit: 500, sortBy: { column: 'created_at', order: 'desc' } })
  if (error) return dbError(error)!
  return json({
    items: data.filter((f) => f.id).map((f) => ({
      name: f.name, path: `uploads/${f.name}`, size: (f.metadata?.size as number) ?? 0, type: (f.metadata?.mimetype as string) ?? '',
      created_at: f.created_at, url: bucket.getPublicUrl(`uploads/${f.name}`).data.publicUrl,
    })),
  })
}

export async function DELETE(req: Request) {
  const auth = await requireAdmin()
  if ('error' in auth) return auth.error
  const path = new URL(req.url).searchParams.get('path')
  if (!path?.startsWith('uploads/') || path.includes('..')) return fail('Bad path.')
  const { error } = await auth.supabase.storage.from(MEDIA_BUCKET).remove([path])
  if (error) return dbError(error)!
  return json({ ok: true })
}
