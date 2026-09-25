'use client'
import { useId, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { BRAND_ICONS, BRAND_ICON_OPTIONS } from '@/lib/brand-icons'
import { TONES, emptyData, type Field } from '@/lib/cms/schema'
import { MediaPicker, Thumb } from './Media'

type Obj = Record<string, unknown>
const TONE_COLOR: Record<string, string> = {
  orange: '#eb4304', blue: '#0500d4', lime: '#d4ff3a', violet: '#4b00f0', pink: '#e6368c', sky: '#3d5bff',
  red: '#d81e24', yellow: '#ffd60a', ink: '#120030', lilac: '#cebcf2', cream: '#f2eee9',
}
export const toneColor = (t: string) => TONE_COLOR[t] ?? '#888'

// Renders a whole form from field definitions.
export function Fields({ fields, value, onChange }: { fields: Field[]; value: Obj; onChange: (v: Obj) => void }) {
  return (
    <div className="fields">
      {fields.map((f) => (
        <FieldInput key={f.name} field={f} value={value?.[f.name]} onChange={(v) => onChange({ ...value, [f.name]: v })} />
      ))}
    </div>
  )
}

export function FieldInput({ field, value, onChange }: { field: Field; value: unknown; onChange: (v: unknown) => void }) {
  const id = useId()
  const label = (
    <label htmlFor={id}>
      {field.label}
    </label>
  )
  const hint = field.hint && <p className="f__hint">{field.hint}</p>
  const str = value == null ? '' : String(value)

  switch (field.kind) {
    case 'text':
      return <div className="f">{label}<input id={id} className="in" value={str} onChange={(e) => onChange(e.target.value)} />{hint}</div>
    case 'textarea':
      return <div className="f">{label}<textarea id={id} className="in" rows={Math.min(8, Math.max(2, str.split('\n').length + 1))} value={str} onChange={(e) => onChange(e.target.value)} />{hint}</div>
    case 'markdown':
      return <MarkdownField id={id} label={field.label} hint={field.hint} value={str} onChange={onChange} />
    case 'number':
      return (
        <div className="f">{label}
          <input id={id} className="in" type="number" min={field.min} max={field.max} step={field.step ?? 1} value={value == null ? '' : String(value)}
            onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))} />{hint}
        </div>
      )
    case 'boolean':
      return <div className="f"><label className="switch"><input id={id} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />{field.label}</label>{hint}</div>
    case 'select':
      return (
        <div className="f">{label}
          <select id={id} className="in" value={str} onChange={(e) => onChange(e.target.value)}>
            {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>{hint}
        </div>
      )
    case 'tone':
      return (
        <div className="f"><span className="f__label">{field.label} <span style={{ opacity: .6 }}>{str}</span></span>
          <div className="tones" role="radiogroup" aria-label={field.label}>
            {TONES.map((t) => <button type="button" key={t.value} aria-pressed={str === t.value} title={t.label} style={{ background: toneColor(t.value) }} onClick={() => onChange(t.value)} />)}
          </div>{hint}
        </div>
      )
    case 'icon': {
      const icon = BRAND_ICONS[str]
      return (
        <div className="f">{label}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {icon ? <svg className="icon-preview" viewBox="0 0 24 24"><path d={icon.path} /></svg> : null}
            <select id={id} className="in" value={str} onChange={(e) => onChange(e.target.value || undefined)}>
              <option value="">No icon</option>
              {BRAND_ICON_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>{hint}
        </div>
      )
    }
    case 'media':
      return <MediaField id={id} label={field.label} hint={field.hint} value={str} onChange={onChange} />
    case 'date': {
      const local = str ? new Date(str).toISOString().slice(0, 16) : ''
      return <div className="f">{label}<input id={id} className="in" type="datetime-local" value={local} onChange={(e) => onChange(e.target.value ? new Date(e.target.value + 'Z').toISOString() : new Date().toISOString())} />{hint}</div>
    }
    case 'link': {
      const v = (value as { label?: string; href?: string }) ?? {}
      return (
        <div className="f"><span className="f__label">{field.label}</span>
          <div className="in-row">
            <textarea aria-label={`${field.label} label`} className="in" rows={1} placeholder="Label" value={v.label ?? ''} onChange={(e) => onChange({ ...v, label: e.target.value })} />
            <input aria-label={`${field.label} link`} className="in" placeholder="/page, https://… or mailto:" value={v.href ?? ''} onChange={(e) => onChange({ ...v, href: e.target.value })} />
          </div>{hint}
        </div>
      )
    }
    case 'list':
      return <ListField field={field} value={Array.isArray(value) ? (value as Obj[]) : []} onChange={onChange} />
  }
}

function MarkdownField({ id, label, hint, value, onChange }: { id: string; label: string; hint?: string; value: string; onChange: (v: string) => void }) {
  const [preview, setPreview] = useState(false)
  return (
    <div className="f">
      <span className="f__label"><label htmlFor={id}>{label}</label>
        <button type="button" className="btn btn--sm btn--ghost" onClick={() => setPreview((p) => !p)}>{preview ? 'Edit' : 'Preview'}</button>
      </span>
      {preview
        ? <div className="card" style={{ background: 'var(--cream)', color: 'var(--ink)' }}><div className="prose"><ReactMarkdown remarkPlugins={[remarkGfm]}>{value || '_Nothing yet._'}</ReactMarkdown></div></div>
        : <textarea id={id} className="in in--md" value={value} onChange={(e) => onChange(e.target.value)} />}
      <p className="f__hint">{hint ?? 'Markdown: ## heading, **bold**, - list, > quote, [link](https://…), ![image](url).'}</p>
    </div>
  )
}

function MediaField({ id, label, hint, value, onChange }: { id: string; label: string; hint?: string; value: string; onChange: (v: string | null) => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="f">
      <label htmlFor={id}>{label}</label>
      <div className="media-field">
        <Thumb url={value || undefined} />
        <div style={{ display: 'grid', gap: 6 }}>
          <input id={id} className="in" placeholder="https://… or pick from the library" value={value} onChange={(e) => onChange(e.target.value || null)} />
          <div className="adm-actions">
            <button type="button" className="btn btn--sm" onClick={() => setOpen(true)}>Library / upload</button>
            {value && <button type="button" className="btn btn--sm btn--danger" onClick={() => onChange(null)}>Remove</button>}
          </div>
        </div>
      </div>
      {hint && <p className="f__hint">{hint}</p>}
      {open && <MediaPicker onClose={() => setOpen(false)} onPick={(url) => { onChange(url); setOpen(false) }} />}
    </div>
  )
}

function ListField({ field, value, onChange }: { field: Extract<Field, { kind: 'list' }>; value: Obj[]; onChange: (v: Obj[]) => void }) {
  const [open, setOpen] = useState<number | null>(value.length <= 1 ? 0 : null)
  const single = field.item.length === 1 && field.item[0].kind === 'text'
  const move = (i: number, d: number) => {
    const j = i + d
    if (j < 0 || j >= value.length) return
    const next = [...value]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
    setOpen(open === i ? j : open)
  }
  const title = (item: Obj, i: number) => {
    const t = field.itemLabel ? item[field.itemLabel] : Object.values(item).find((v) => typeof v === 'string')
    return (typeof t === 'string' && t.replace(/\n/g, ' ').trim()) || `Item ${i + 1}`
  }
  return (
    <div className="f">
      <span className="f__label">{field.label} <span style={{ opacity: .6 }}>{value.length}</span></span>
      {field.hint && <p className="f__hint">{field.hint}</p>}
      <div className="list">
        {value.map((item, i) => (
          <div className="list__item" key={i}>
            <div className="list__head">
              {single ? (
                <input className="in" aria-label={`${field.label} ${i + 1}`} value={String(item[field.item[0].name] ?? '')} onChange={(e) => onChange(value.map((x, k) => (k === i ? { ...x, [field.item[0].name]: e.target.value } : x)))} />
              ) : (
                <button type="button" className="list__title" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>{open === i ? '▾' : '▸'} {title(item, i)}</button>
              )}
              <button type="button" className="btn btn--icon btn--ghost" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>↑</button>
              <button type="button" className="btn btn--icon btn--ghost" aria-label="Move down" disabled={i === value.length - 1} onClick={() => move(i, 1)}>↓</button>
              <button type="button" className="btn btn--icon btn--ghost btn--danger" aria-label="Remove" onClick={() => onChange(value.filter((_, k) => k !== i))}>✕</button>
            </div>
            {!single && open === i && (
              <div className="list__body"><Fields fields={field.item} value={item} onChange={(v) => onChange(value.map((x, k) => (k === i ? v : x)))} /></div>
            )}
          </div>
        ))}
      </div>
      <div><button type="button" className="btn btn--sm" onClick={() => { onChange([...value, emptyData(field.item)]); setOpen(value.length) }}>+ Add {field.itemLabel === 'text' ? 'item' : 'one'}</button></div>
    </div>
  )
}
