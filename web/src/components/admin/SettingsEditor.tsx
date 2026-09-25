'use client'
import { useEffect, useState, type FormEvent } from 'react'
import { api } from '@/lib/admin/client'
import { SETTINGS_GROUPS, type Field } from '@/lib/cms/schema'
import { browserClient } from '@/lib/supabase/browser'
import { FieldInput, Fields } from './Fields'
import { useToast } from './Toasts'

type Obj = Record<string, unknown>

export function SettingsEditor() {
  const toast = useToast()
  const [saved, setSaved] = useState<Obj | null>(null)
  const [draft, setDraft] = useState<Obj | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  useEffect(() => { api<{ data: Obj }>('/settings').then((r) => { setSaved(r.data); setDraft(r.data) }).catch((e) => setError(e.message)) }, [])
  const dirty = JSON.stringify(saved) !== JSON.stringify(draft)

  const save = async () => {
    setSaving(true)
    try { await api('/settings', { method: 'PUT', body: { data: draft } }); setSaved(draft); toast('Settings saved and published') }
    catch (e) { toast((e as Error).message, true) }
    finally { setSaving(false) }
  }

  if (error) return <p className="notice notice--err">{error}</p>
  if (!draft) return <p>Loading…</p>
  return (
    <>
      <div className="adm-top"><div><h1>Settings</h1><p>Site-wide content: brand, menu, contact details, footer and SEO defaults.</p></div></div>
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', alignItems: 'start' }}>
        {SETTINGS_GROUPS.map((g) => {
          const value = draft[g.key]
          const set = (v: unknown) => setDraft({ ...draft, [g.key]: v })
          let body
          if (g.strings) {
            const f: Field = { kind: 'list', name: g.key, label: g.title, item: [{ kind: 'text', name: 'text', label: 'Word' }], itemLabel: 'text' }
            body = <FieldInput field={f} value={((value as string[]) ?? []).map((text) => ({ text }))} onChange={(v) => set((v as { text: string }[]).map((x) => x.text))} />
          } else if (g.listOf) {
            const f: Field = { kind: 'list', name: g.key, label: g.title, item: g.listOf, itemLabel: 'label' }
            body = <FieldInput field={f} value={value} onChange={set} />
          } else {
            body = <Fields fields={g.fields} value={(value as Obj) ?? {}} onChange={set} />
          }
          return <section className="card" key={g.key}><h2 style={{ marginBottom: 12 }}>{g.title}</h2>{body}</section>
        })}
        <PasswordCard />
      </div>
      <div className="savebar">
        <span className={dirty ? 'dirty' : ''}>{dirty ? 'Unsaved changes' : 'All changes saved'}</span>
        <button className="btn btn--primary" disabled={!dirty || saving} onClick={save}>{saving ? 'Saving…' : 'Save & publish'}</button>
      </div>
    </>
  )
}

function PasswordCard() {
  const toast = useToast()
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const password = String(new FormData(form).get('password'))
    const { error } = (await browserClient()?.auth.updateUser({ password })) ?? { error: new Error('Not configured') }
    if (error) toast(error.message, true)
    else { toast('Password changed'); form.reset() }
  }
  return (
    <section className="card">
      <h2 style={{ marginBottom: 12 }}>Your password</h2>
      <form className="fields" onSubmit={submit}>
        <div className="f"><label htmlFor="pw">New password</label><input id="pw" className="in" name="password" type="password" minLength={8} required autoComplete="new-password" /></div>
        <div><button className="btn">Change password</button></div>
      </form>
    </section>
  )
}
