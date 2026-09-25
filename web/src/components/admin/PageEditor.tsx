'use client'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { api } from '@/lib/admin/client'
import { SECTION_TYPES, emptyData } from '@/lib/cms/schema'
import { seedSections } from '@/lib/cms/seed'
import type { Section, SectionType } from '@/lib/cms/types'
import { Fields } from './Fields'
import { useToast } from './Toasts'

type Row = Section & { updated_at?: string }
type PageRow = { slug: string; title: string; seo_title: string | null; seo_description: string | null; og_image: string | null }

const PAGE_FIELDS = [
  { kind: 'text', name: 'title', label: 'Page name' },
  { kind: 'text', name: 'seo_title', label: 'SEO title', hint: 'Shown in search results and the browser tab.' },
  { kind: 'textarea', name: 'seo_description', label: 'SEO description', hint: 'About 150 characters.' },
  { kind: 'media', name: 'og_image', label: 'Share image', hint: 'Used when the page is shared on social media (1200×630).' },
] as const

export const pagePath = (slug: string) => (slug === 'home' ? '/' : `/${slug}`)

// Section-by-section editor for one page, with a live preview beside it.
export function PageEditor({ slug }: { slug: string }) {
  const toast = useToast()
  const [page, setPage] = useState<PageRow | null>(null)
  const [pageDraft, setPageDraft] = useState<PageRow | null>(null)
  const [rows, setRows] = useState<Row[]>([])
  const [drafts, setDrafts] = useState<Record<string, { data: object; label: string }>>({})
  const [selected, setSelected] = useState<string>('page')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [adding, setAdding] = useState(false)
  const [preview, setPreview] = useState(true)
  const [frameKey, setFrameKey] = useState(0)
  const frame = useRef<HTMLIFrameElement>(null)

  const load = useCallback(async () => {
    try {
      const r = await api<{ page: PageRow; sections: Row[] }>(`/pages/${slug}`)
      setPage(r.page)
      setPageDraft(r.page)
      setRows(r.sections)
      setDrafts({})
      setSelected((s) => (s === 'page' || r.sections.some((x) => x.id === s) ? s : r.sections[0]?.id ?? 'page'))
    } catch (e) {
      setError((e as Error).message)
    }
  }, [slug])
  // Fetch on mount; load() only sets state after the request resolves.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load() }, [load])

  const dirty = Object.keys(drafts).length > 0 || JSON.stringify(page) !== JSON.stringify(pageDraft)
  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault() }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const refreshPreview = () => setTimeout(() => setFrameKey((k) => k + 1), 400)
  const current = rows.find((r) => r.id === selected)
  const draft = current ? drafts[current.id] ?? { data: current.data, label: current.label ?? '' } : null
  const def = current ? SECTION_TYPES[current.type as SectionType] : null

  async function save() {
    setSaving(true)
    try {
      if (page && pageDraft && JSON.stringify(page) !== JSON.stringify(pageDraft)) {
        await api(`/pages/${slug}`, { method: 'PATCH', body: pageDraft })
      }
      await Promise.all(Object.entries(drafts).map(([id, d]) => api(`/sections/${id}`, { method: 'PATCH', body: d })))
      toast('Saved and published')
      await load()
      refreshPreview()
    } catch (e) {
      toast((e as Error).message, true)
    } finally {
      setSaving(false)
    }
  }

  async function toggle(r: Row) {
    try {
      await api(`/sections/${r.id}`, { method: 'PATCH', body: { visible: !r.visible } })
      setRows((rs) => rs.map((x) => (x.id === r.id ? { ...x, visible: !r.visible } : x)))
      toast(r.visible ? 'Section hidden' : 'Section shown')
      refreshPreview()
    } catch (e) { toast((e as Error).message, true) }
  }

  async function move(i: number, d: number) {
    const j = i + d
    if (j < 0 || j >= rows.length) return
    const next = [...rows]
    ;[next[i], next[j]] = [next[j], next[i]]
    setRows(next)
    try {
      await api('/sections/reorder', { body: { ids: next.map((r) => r.id) } })
      refreshPreview()
    } catch (e) { toast((e as Error).message, true); load() }
  }

  async function remove(r: Row) {
    if (!confirm(`Delete the "${r.label || r.type}" section? This cannot be undone.`)) return
    try {
      await api(`/sections/${r.id}`, { method: 'DELETE' })
      toast('Section deleted')
      setSelected('page')
      await load()
      refreshPreview()
    } catch (e) { toast((e as Error).message, true) }
  }

  async function add(type: SectionType) {
    const example = seedSections.find((s) => s.type === type)
    try {
      const r = await api<{ section: Row }>('/sections', {
        body: { page_slug: slug, type, label: SECTION_TYPES[type].label, data: example?.data ?? emptyData(SECTION_TYPES[type].fields), position: rows.length },
      })
      setAdding(false)
      toast('Section added')
      await load()
      setSelected(r.section.id)
      refreshPreview()
    } catch (e) { toast((e as Error).message, true) }
  }

  const types = useMemo(() => Object.entries(SECTION_TYPES) as [SectionType, (typeof SECTION_TYPES)[SectionType]][], [])

  if (error) return <p className="notice notice--err">{error}</p>
  if (!page || !pageDraft) return <p>Loading…</p>

  return (
    <>
      <div className="adm-top">
        <div>
          <h1>{page.title}</h1>
          <p>Edit each section of this page. Changes go live when you save; the preview updates on its own.</p>
        </div>
        <div className="adm-actions">
          <button className="btn" onClick={() => setPreview((p) => !p)}>{preview ? 'Hide preview' : 'Show preview'}</button>
          <a className="btn" href={pagePath(slug)} target="_blank" rel="noreferrer">Open page ↗</a>
        </div>
      </div>

      <div className={`editor${preview ? ' editor--preview' : ''}`}>
        <div className="sections" aria-label="Sections">
          <div className="sec-item" aria-current={selected === 'page'}>
            <button className="sec-item__name" onClick={() => setSelected('page')}><b>Page settings</b><small>Name and SEO</small></button>
          </div>
          {rows.map((r, i) => (
            <div key={r.id} className={`sec-item${r.visible ? '' : ' is-hidden'}`} aria-current={selected === r.id}>
              <button className="sec-item__name" onClick={() => setSelected(r.id)}>
                <b>{drafts[r.id] ? '• ' : ''}{(drafts[r.id]?.label ?? r.label) || r.type}</b>
                <small>{SECTION_TYPES[r.type as SectionType]?.label ?? r.type}</small>
              </button>
              <div className="sec-item__tools">
                <button className="btn btn--icon btn--ghost" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
                <button className="btn btn--icon btn--ghost" aria-label="Move down" disabled={i === rows.length - 1} onClick={() => move(i, 1)}>↓</button>
                <button className="btn btn--icon btn--ghost" aria-label={r.visible ? 'Hide section' : 'Show section'} title={r.visible ? 'Hide' : 'Show'} onClick={() => toggle(r)}>{r.visible ? '◉' : '○'}</button>
              </div>
            </div>
          ))}
          <button className="btn btn--primary" onClick={() => setAdding(true)}>+ Add section</button>
        </div>

        <div>
          {selected === 'page' ? (
            <div className="card">
              <h2 style={{ marginBottom: 14 }}>Page settings</h2>
              <Fields fields={PAGE_FIELDS as never} value={pageDraft as never} onChange={(v) => setPageDraft(v as PageRow)} />
            </div>
          ) : current && def && draft ? (
            <div className="card">
              <div className="adm-top" style={{ marginBottom: 14 }}>
                <div><h2>{def.label}</h2><p>{def.description}</p></div>
                <button className="btn btn--sm btn--danger" onClick={() => remove(current)}>Delete section</button>
              </div>
              <div className="fields">
                <div className="f">
                  <label htmlFor="sec-label">Name in this list</label>
                  <input id="sec-label" className="in" value={draft.label} onChange={(e) => setDrafts({ ...drafts, [current.id]: { ...draft, label: e.target.value } })} />
                </div>
                <Fields fields={def.fields} value={draft.data as Record<string, unknown>} onChange={(v) => setDrafts({ ...drafts, [current.id]: { ...draft, data: v } })} />
              </div>
            </div>
          ) : <p>Pick a section.</p>}
          <div className="savebar">
            <span className={dirty ? 'dirty' : ''}>{dirty ? 'Unsaved changes' : 'All changes saved'}</span>
            <div className="adm-actions">
              {dirty && <button className="btn btn--sm btn--ghost" onClick={() => { setDrafts({}); setPageDraft(page) }}>Discard</button>}
              <button className="btn btn--primary" disabled={!dirty || saving} onClick={save}>{saving ? 'Saving…' : 'Save & publish'}</button>
            </div>
          </div>
        </div>

        {preview && (
          <div className="preview">
            <div className="preview__bar">
              <span>Live preview · {pagePath(slug)}</span>
              <button className="btn btn--sm" onClick={() => setFrameKey((k) => k + 1)}>Reload</button>
            </div>
            <iframe key={frameKey} ref={frame} src={pagePath(slug)} title="Page preview" />
          </div>
        )}
      </div>

      {adding && (
        <div className="modal" role="dialog" aria-modal="true" aria-label="Add a section" onClick={(e) => e.target === e.currentTarget && setAdding(false)}>
          <div className="modal__box">
            <div className="modal__head"><h2>Add a section</h2><button className="btn" onClick={() => setAdding(false)}>Close</button></div>
            <p style={{ margin: 0, color: 'var(--muted)' }}>It is added at the end of the page with example content. Move it with the arrows.</p>
            <div className="type-grid">
              {types.map(([type, t]) => <button key={type} onClick={() => add(type)}><b>{t.label}</b><span>{t.description}</span></button>)}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
