'use client'
import { useEffect, useState } from 'react'
import { api, timeAgo } from '@/lib/admin/client'
import type { Lead } from '@/lib/cms/types'
import { useToast } from './Toasts'

const STATUSES: Lead['status'][] = ['new', 'contacted', 'won', 'lost', 'spam']

export function Leads() {
  const toast = useToast()
  const [items, setItems] = useState<Lead[] | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [error, setError] = useState<string | null>(null)
  useEffect(() => { api<{ items: Lead[] }>('/leads').then((r) => setItems(r.items)).catch((e) => setError(e.message)) }, [])

  const setStatus = async (l: Lead, status: Lead['status']) => {
    try {
      await api(`/leads/${l.id}`, { method: 'PATCH', body: { status } })
      setItems((xs) => xs?.map((x) => (x.id === l.id ? { ...x, status } : x)) ?? null)
    } catch (e) { toast((e as Error).message, true) }
  }
  const remove = async (l: Lead) => {
    if (!confirm(`Delete the message from ${l.name}?`)) return
    try {
      await api(`/leads/${l.id}`, { method: 'DELETE' })
      setItems((xs) => xs?.filter((x) => x.id !== l.id) ?? null)
    } catch (e) { toast((e as Error).message, true) }
  }
  const exportCsv = () => {
    const rows = [['date', 'kind', 'status', 'name', 'email', 'phone', 'company', 'services', 'budget', 'timeline', 'message', 'page']]
    items?.forEach((l) => rows.push([l.created_at, l.kind, l.status, l.name, l.email, l.phone ?? '', l.company ?? '', l.services.join('; '), l.budget ?? '', l.timeline ?? '', l.message, l.source_page ?? '']))
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n')
    const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })), download: 'leads.csv' })
    a.click()
  }

  const shown = (items ?? []).filter((l) => filter === 'all' || l.status === filter || l.kind === filter)
  return (
    <>
      <div className="adm-top">
        <div><h1>Leads</h1><p>Messages from the contact and quote forms.</p></div>
        <div className="adm-actions">
          <select className="in" style={{ width: 170 }} value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter">
            <option value="all">All</option><option value="quote">Quote requests</option><option value="contact">Contact messages</option>
            {STATUSES.map((s) => <option key={s} value={s}>Status: {s}</option>)}
          </select>
          <button className="btn" onClick={exportCsv} disabled={!items?.length}>Export CSV</button>
        </div>
      </div>
      {error && <p className="notice notice--err">{error}</p>}
      {!items ? <p>Loading…</p> : shown.length === 0 ? <p className="empty-state">No leads yet. They arrive here when someone sends a form.</p> : (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table className="adm-table">
            <thead><tr><th>From</th><th>Request</th><th>Status</th><th>Received</th><th /></tr></thead>
            <tbody>
              {shown.map((l) => (
                <tr key={l.id}>
                  <td>
                    <b>{l.name}</b>{l.company && <> · {l.company}</>}<br />
                    <a href={`mailto:${l.email}`}>{l.email}</a>{l.phone && <><br /><a href={`tel:${l.phone}`}>{l.phone}</a></>}
                  </td>
                  <td>
                    <span className={`pill ${l.kind === 'quote' ? 'pill--new' : ''}`}>{l.kind}</span>{' '}
                    {l.services.length > 0 && <span>{l.services.join(', ')}</span>}
                    {(l.budget || l.timeline) && <div style={{ color: 'var(--muted)', fontSize: 12 }}>{[l.budget, l.timeline].filter(Boolean).join(' · ')}</div>}
                    {l.message && <p className="lead-msg">{l.message}</p>}
                  </td>
                  <td>
                    <select className="in" value={l.status} onChange={(e) => setStatus(l, e.target.value as Lead['status'])} aria-label="Status">
                      {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td>{timeAgo(l.created_at)}<div style={{ color: 'var(--muted)', fontSize: 12 }}>{l.source_page}</div></td>
                  <td><button className="btn btn--sm btn--danger" onClick={() => remove(l)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
