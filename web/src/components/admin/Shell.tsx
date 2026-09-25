'use client'
import { Suspense, useEffect, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { browserClient } from '@/lib/supabase/browser'
import { Toasts } from './Toasts'

type Session = { configured: boolean; email: string | null; admin: boolean }

const PAGES = [['home', 'Home'], ['services', 'Services'], ['projects', 'Projects'], ['blog', 'Blog'], ['contact', 'Contact'], ['quote', 'Get a quote']]
const LINKS: [string, [string, string][]][] = [
  ['Overview', [['/admin', 'Dashboard']]],
  ['Pages', PAGES.map(([s, l]) => [`/admin/pages/${s}`, l])],
  ['Collections', [['/admin/services', 'Services'], ['/admin/projects', 'Projects'], ['/admin/posts', 'Blog posts']]],
  ['Inbox & files', [['/admin/leads', 'Leads'], ['/admin/media', 'Media']]],
  ['Site', [['/admin/settings', 'Settings']]],
]

function NavLive() {
  const path = usePathname()
  return <Nav path={path} />
}
function Nav({ path }: { path?: string }) {
  return (
    <nav className="adm-nav" aria-label="Admin">
      {LINKS.map(([group, links]) => (
        <div key={group} style={{ display: 'contents' }}>
          <p>{group}</p>
          {links.map(([href, label]) => {
            const active = path && (href === '/admin' ? path === href : path === href || path.startsWith(href + '/'))
            return <Link key={href} href={href} aria-current={active ? 'page' : undefined}>{label}</Link>
          })}
        </div>
      ))}
    </nav>
  )
}

export function Shell({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    fetch('/api/admin/session', { cache: 'no-store' }).then((r) => r.json()).then(setSession).catch(() => setSession({ configured: false, email: null, admin: false }))
  }, [])
  const signOut = async () => {
    await browserClient()?.auth.signOut()
    router.replace('/admin/login')
    router.refresh()
  }
  return (
    <Toasts>
      <div className="adm">
        <aside className="adm-side">
          <Link href="/admin" className="adm-brand">nova<svg viewBox="-50 -50 100 100" aria-hidden="true"><g fill="currentColor"><rect x="-8" y="-48" width="16" height="96" rx="2" /><rect x="-8" y="-48" width="16" height="96" rx="2" transform="rotate(60)" /><rect x="-8" y="-48" width="16" height="96" rx="2" transform="rotate(120)" /></g></svg><small>CMS</small></Link>
          <Suspense fallback={<Nav />}><NavLive /></Suspense>
          <div className="adm-side__foot">
            <a className="btn btn--sm" href="/" target="_blank" rel="noreferrer">View site ↗</a>
            {session?.email && <span>{session.email}</span>}
            <button className="btn btn--sm btn--ghost" onClick={signOut}>Sign out</button>
          </div>
        </aside>
        <main className="adm-main">
          {session && !session.configured && <p className="notice notice--err">Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to .env.local.</p>}
          {session && session.configured && !session.admin ? (
            <div className="card" style={{ maxWidth: 560 }}>
              <h1>Not an admin yet</h1>
              <p>You are signed in as <b>{session.email ?? 'unknown'}</b>, but this email is not on the admin list. An existing admin can add it in the Supabase SQL editor:</p>
              <pre className="in" style={{ whiteSpace: 'pre-wrap' }}>{`insert into public.admins (email) values ('${session.email ?? 'you@example.com'}');`}</pre>
              <button className="btn" onClick={signOut}>Sign out</button>
            </div>
          ) : children}
        </main>
      </div>
    </Toasts>
  )
}
