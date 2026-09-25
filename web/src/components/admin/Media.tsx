'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { browserClient } from '@/lib/supabase/browser'
import { MEDIA_BUCKET } from '@/lib/supabase/env'
import { api } from '@/lib/admin/client'
import { useToast } from './Toasts'

export type MediaItem = { name: string; path: string; size: number; type: string; created_at: string; url: string }

const isVideo = (url: string) => /\.(mp4|webm)(\?|$)/i.test(url)
export function Thumb({ url }: { url?: string }) {
  if (!url) return <div className="media-thumb">none</div>
  return <div className="media-thumb">{isVideo(url) ? <video src={url} muted /> : <img src={url} alt="" />}</div>
}

// Uploads straight to Supabase Storage with the admin's session.
export async function uploadFiles(files: File[]): Promise<string[]> {
  const db = browserClient()
  if (!db) throw new Error('Supabase is not configured.')
  const urls: string[] = []
  for (const file of files) {
    const clean = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/-+/g, '-')
    const path = `uploads/${Date.now().toString(36)}-${clean}`
    const { error } = await db.storage.from(MEDIA_BUCKET).upload(path, file, { contentType: file.type, cacheControl: '31536000', upsert: false })
    if (error) throw new Error(`${file.name}: ${error.message}`)
    urls.push(db.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl)
  }
  return urls
}

export function useMedia() {
  const [items, setItems] = useState<MediaItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const load = useCallback(() => {
    api<{ items: MediaItem[] }>('/media').then((r) => setItems(r.items)).catch((e) => setError(e.message))
  }, [])
  useEffect(load, [load])
  return { items, error, reload: load }
}

export function Uploader({ onDone, accept = 'image/*,video/mp4,video/webm' }: { onDone: (urls: string[]) => void; accept?: string }) {
  const toast = useToast()
  const input = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [over, setOver] = useState(false)
  const run = async (files: File[]) => {
    if (!files.length) return
    setBusy(true)
    try {
      const urls = await uploadFiles(files)
      toast(`Uploaded ${urls.length} file${urls.length > 1 ? 's' : ''}`)
      onDone(urls)
    } catch (e) {
      toast((e as Error).message, true)
    } finally {
      setBusy(false)
    }
  }
  return (
    <div
      className={`drop${over ? ' is-over' : ''}`}
      onDragOver={(e) => { e.preventDefault(); setOver(true) }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => { e.preventDefault(); setOver(false); run([...e.dataTransfer.files]) }}
    >
      <p style={{ margin: '0 0 10px' }}>{busy ? 'Uploading…' : 'Drop images or videos here (max 50 MB each)'}</p>
      <button type="button" className="btn btn--primary" disabled={busy} onClick={() => input.current?.click()}>Choose files</button>
      <input ref={input} type="file" accept={accept} multiple hidden onChange={(e) => { run([...(e.target.files ?? [])]); e.target.value = '' }} />
    </div>
  )
}

export function MediaPicker({ onPick, onClose }: { onPick: (url: string) => void; onClose: () => void }) {
  const { items, error, reload } = useMedia()
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', k)
    return () => document.removeEventListener('keydown', k)
  }, [onClose])
  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Media library" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__box">
        <div className="modal__head"><h2>Media library</h2><button className="btn" onClick={onClose}>Close</button></div>
        <Uploader onDone={(urls) => { reload(); if (urls.length === 1) onPick(urls[0]) }} />
        {error && <p className="notice notice--err">{error}</p>}
        {!items ? <p>Loading…</p> : items.length === 0 ? <p className="empty-state">No files yet. Upload one above.</p> : (
          <div className="media-grid">
            {items.map((m) => (
              <div className="media-tile" key={m.path}>
                <button className="media-tile__pick" onClick={() => onPick(m.url)} aria-label={`Use ${m.name}`}>
                  {m.type.startsWith('video') ? <video src={m.url} muted /> : <img src={m.url} alt="" />}
                </button>
                <div className="media-tile__meta"><b>{m.name}</b></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
