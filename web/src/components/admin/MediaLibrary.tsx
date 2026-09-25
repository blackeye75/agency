'use client'
import { api } from '@/lib/admin/client'
import { Uploader, useMedia } from './Media'
import { useToast } from './Toasts'

const size = (b: number) => (b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${Math.round(b / 1e3)} KB`)

export function MediaLibrary() {
  const toast = useToast()
  const { items, error, reload } = useMedia()
  const copy = async (url: string) => { await navigator.clipboard.writeText(url); toast('Link copied') }
  const remove = async (path: string) => {
    if (!confirm('Delete this file? Pages that use it will show a broken image.')) return
    try { await api(`/media?path=${encodeURIComponent(path)}`, { method: 'DELETE' }); toast('Deleted'); reload() } catch (e) { toast((e as Error).message, true) }
  }
  return (
    <>
      <div className="adm-top"><div><h1>Media</h1><p>Images and videos for any page, section, project or post. Files are served from Supabase Storage.</p></div></div>
      <div style={{ marginBottom: 18 }}><Uploader onDone={reload} /></div>
      {error && <p className="notice notice--err">{error}</p>}
      {!items ? <p>Loading…</p> : items.length === 0 ? <p className="empty-state">No files yet.</p> : (
        <div className="media-grid">
          {items.map((m) => (
            <div className="media-tile" key={m.path}>
              {m.type.startsWith('video') ? <video src={m.url} muted controls /> : <img src={m.url} alt="" />}
              <div className="media-tile__meta">
                <b title={m.name}>{m.name}</b><span>{size(m.size)}</span>
                <div className="adm-actions"><button className="btn btn--sm" onClick={() => copy(m.url)}>Copy link</button><button className="btn btn--sm btn--danger" onClick={() => remove(m.path)}>Delete</button></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
