'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { api, timeAgo } from '@/lib/admin/client'
import type { Lead } from '@/lib/cms/types'

type Counts = { pages: { slug: string; title: string; sections: number; updated_at: string }[]; services: number; projects: number; posts: number; leads: Lead[] }

export function Dashboard() {
  const [c, setC] = useState<Counts | null>(null)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    Promise.all([
      api<{ pages: Counts['pages'] }>('/pages'),
      api<{ items: unknown[] }>('/collections/services'),
      api<{ items: unknown[] }>('/collections/projects'),
      api<{ items: unknown[] }>('/collections/posts'),
      api<{ items: Lead[] }>('/leads'),
    ]).then(([p, s, pr, po, l]) => setC({ pages: p.pages, services: s.items.length, projects: pr.items.length, posts: po.items.length, leads: l.items }))
      .catch((e) => setError(e.message))
  }, [])
  if (error) return <p className="notice notice--err">{error}</p>
  if (!c) return <p>Loading…</p>
  const fresh = c.leads.filter((l) => l.status === 'new')
  return (
    <>
      <div className="adm-top"><div><h1>Dashboard</h1><p>Everything on the website is editable here. Saved changes appear on the live site within seconds.</p></div></div>
      <div className="grid-cards" style={{ marginBottom: 24 }}>
        <Link href="/admin/leads" className="card stat"><b>{fresh.length}</b><span>new leads</span></Link>
        <Link href="/admin/services" className="card stat"><b>{c.services}</b><span>services</span></Link>
        <Link href="/admin/projects" className="card stat"><b>{c.projects}</b><span>projects</span></Link>
        <Link href="/admin/posts" className="card stat"><b>{c.posts}</b><span>blog posts</span></Link>
      </div>
      <div className="grid-cards" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', alignItems: 'start' }}>
        <section className="card">
          <h2 style={{ marginBottom: 10 }}>Pages</h2>
          <table className="adm-table"><tbody>
            {c.pages.map((p) => <tr key={p.slug}><td><Link href={`/admin/pages/${p.slug}`}>{p.title}</Link></td><td>{p.sections} sections</td><td>{timeAgo(p.updated_at)}</td></tr>)}
          </tbody></table>
        </section>
        <section className="card">
          <h2 style={{ marginBottom: 10 }}>Latest leads</h2>
          {c.leads.length === 0 ? <p className="empty-state">No leads yet.</p> : (
            <table className="adm-table"><tbody>
              {c.leads.slice(0, 6).map((l) => <tr key={l.id}><td><b>{l.name}</b><br /><span style={{ color: 'var(--muted)' }}>{l.email}</span></td><td><span className={`pill ${l.status === 'new' ? 'pill--new' : ''}`}>{l.status}</span></td><td>{timeAgo(l.created_at)}</td></tr>)}
            </tbody></table>
          )}
        </section>
      </div>
    </>
  )
}
