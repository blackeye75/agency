'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { api, slugify, timeAgo } from '@/lib/admin/client'
import { COLLECTIONS } from '@/lib/cms/schema'
import type { CollectionName } from '@/lib/cms/types'
import { Fields, toneColor } from './Fields'
import { useToast } from './Toasts'

type Item = Record<string, unknown> & { id: string; slug: string; published: boolean; updated_at?: string }

const BLANK: Record<CollectionName, Record<string, unknown>> = {
  services: { title: '', slug: '', summary: '', body: '', features: [], deliverables: [], color: 'orange', published: false, position: 99 },
  projects: { name: '', slug: '', client: '', category: 'Software', color: 'orange', summary: '', body: '', quote: '', quote_author: '', gallery: [], results: [], tags: [], featured: true, published: false, position: 99, year: new Date().getFullYear() },
  posts: { title: '', slug: '', excerpt: '', body: '', tags: [], author: '', published: false, published_at: new Date().toISOString(), read_minutes: 3 },
}

export function CollectionList({ name }: { name: CollectionName }) {
  const def = COLLECTIONS[name]
  const [items, setItems] = useState<Item[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [q, setQ] = useState('')
  useEffect(() => {
    api<{ items: Item[] }>(`/collections/${name}`).then((r) => setItems(r.items)).catch((e) => setError(e.message))
  }, [name])
  const shown = (items ?? []).filter((i) => !q || JSON.stringify([i[def.title], i.slug, i.category]).toLowerCase().includes(q.toLowerCase()))
  return (
    <>
      <div className="adm-top">
        <div><h1>{def.label}</h1><p>Each {def.singular} has its own page at {def.path}slug. Drafts stay hidden from the site.</p></div>
        <div className="adm-actions">
          <input className="in" style={{ width: 220 }} placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search" />
          <Link className="btn btn--primary" href={`/admin/${name}/new`}>+ New {def.singular}</Link>
        </div>
      </div>
      {error && <p className="notice notice--err">{error}</p>}
      {!items ? <p>Loading…</p> : shown.length === 0 ? <p className="empty-state">Nothing here yet.</p> : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table className="adm-table">
            <thead><tr><th>{def.title === 'name' ? 'Name' : 'Title'}</th><th>Status</th>{name === 'projects' && <th>Category</th>}{name === 'posts' ? <th>Date</th> : <th>Order</th>}<th>Updated</th><th /></tr></thead>
            <tbody>
              {shown.map((i) => (
                <tr key={i.id}>
                  <td>
                    {'color' in i && <span className="swatch" style={{ background: toneColor(String(i.color)) }} />}
                    <Link href={`/admin/${name}/${i.id}`}>{String(i[def.title] || i.slug)}</Link>
                    <div style={{ color: 'var(--muted)', fontSize: 12 }}>{def.path}{i.slug}</div>
                  </td>
                  <td><span className={`pill ${i.published ? 'pill--on' : 'pill--off'}`}>{i.published ? 'Published' : 'Draft'}</span>{i.featured === true && <> <span className="pill">Home</span></>}</td>
                  {name === 'projects' && <td>{String(i.category ?? '')}</td>}
                  <td>{name === 'posts' ? new Date(String(i.published_at)).toLocaleDateString('en-GB') : String(i.position ?? '')}</td>
                  <td>{timeAgo(i.updated_at)}</td>
                  <td><a className="btn btn--sm" href={`${def.path}${i.slug}`} target="_blank" rel="noreferrer">View ↗</a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

export function CollectionEditor({ name, id }: { name: CollectionName; id: string }) {
  const def = COLLECTIONS[name]
  const router = useRouter()
  const toast = useToast()
  const isNew = id === 'new'
  const [saved, setSaved] = useState<Item | null>(null)
  const [draft, setDraft] = useState<Record<string, unknown> | null>(isNew ? BLANK[name] : null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [slugTouched, setSlugTouched] = useState(!isNew)

  useEffect(() => {
    if (isNew) return
    api<{ item: Item }>(`/collections/${name}/${id}`).then((r) => { setSaved(r.item); setDraft(r.item) }).catch((e) => setError(e.message))
  }, [name, id, isNew])

  const dirty = JSON.stringify(saved ?? BLANK[name]) !== JSON.stringify(draft)
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault() }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const change = (v: Record<string, unknown>) => {
    if (v.slug !== draft?.slug) setSlugTouched(true)
    if (!slugTouched && v[def.title] !== draft?.[def.title]) v = { ...v, slug: slugify(String(v[def.title] ?? '')) }
    setDraft(v)
  }

  async function save() {
    if (!draft) return
    setSaving(true)
    try {
      if (isNew) {
        const r = await api<{ item: Item }>(`/collections/${name}`, { body: draft })
        toast(`${def.singular[0].toUpperCase() + def.singular.slice(1)} created`)
        router.replace(`/admin/${name}/${r.item.id}`)
      } else {
        const r = await api<{ item: Item }>(`/collections/${name}/${id}`, { method: 'PATCH', body: draft })
        setSaved(r.item); setDraft(r.item)
        toast('Saved and published')
      }
    } catch (e) {
      toast((e as Error).message, true)
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    if (!confirm(`Delete this ${def.singular}? This cannot be undone.`)) return
    try {
      await api(`/collections/${name}/${id}`, { method: 'DELETE' })
      toast('Deleted')
      router.replace(`/admin/${name}`)
    } catch (e) { toast((e as Error).message, true) }
  }

  if (error) return <p className="notice notice--err">{error}</p>
  if (!draft) return <p>Loading…</p>
  return (
    <>
      <div className="adm-top">
        <div>
          <p style={{ margin: 0 }}><Link href={`/admin/${name}`}>← {def.label}</Link></p>
          <h1>{String(draft[def.title] || `New ${def.singular}`)}</h1>
        </div>
        <div className="adm-actions">
          {!isNew && <a className="btn" href={`${def.path}${String(saved?.slug ?? '')}`} target="_blank" rel="noreferrer">View ↗</a>}
          {!isNew && <button className="btn btn--danger" onClick={remove}>Delete</button>}
        </div>
      </div>
      <div className="card" style={{ maxWidth: 900 }}>
        <Fields fields={def.fields} value={draft} onChange={change} />
      </div>
      <div className="savebar" style={{ maxWidth: 900 }}>
        <span className={dirty ? 'dirty' : ''}>{dirty ? 'Unsaved changes' : 'All changes saved'}</span>
        <button className="btn btn--primary" disabled={(!dirty && !isNew) || saving} onClick={save}>{saving ? 'Saving…' : isNew ? 'Create' : 'Save & publish'}</button>
      </div>
    </>
  )
}
