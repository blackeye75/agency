'use client'
import { useState, type FormEvent } from 'react'
import Link from 'next/link'
import { browserClient } from '@/lib/supabase/browser'

export function Login() {
  const [mode, setMode] = useState<'in' | 'up' | 'reset'>('in')
  const [msg, setMsg] = useState<{ ok?: boolean; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const db = browserClient()

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!db) return
    const fd = new FormData(e.currentTarget)
    const email = String(fd.get('email')).trim().toLowerCase()
    const password = String(fd.get('password') ?? '')
    setBusy(true)
    setMsg(null)
    const redirect = `${window.location.origin}/admin/auth`
    const { error } =
      mode === 'in' ? await db.auth.signInWithPassword({ email, password })
      : mode === 'up' ? await db.auth.signUp({ email, password, options: { emailRedirectTo: redirect } })
      : await db.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/admin/auth?next=reset` })
    setBusy(false)
    if (error) return setMsg({ text: error.message })
    if (mode === 'in') {
      const next = new URLSearchParams(window.location.search).get('next')
      window.location.href = next?.startsWith('/admin') ? next : '/admin'
      return
    }
    setMsg({ ok: true, text: mode === 'up' ? 'Account created. Check your inbox to confirm the email, then sign in. Only emails on the admin list can edit content.' : 'Check your inbox and open the newest reset link in this same browser. Asking again cancels earlier links.' })
  }

  return (
    <div className="login">
      <div className="login__box">
        <h1>NOVA<br /><span>CMS</span></h1>
        <p>Edit every page, section, service, project and post on the site.</p>
        {!db ? <p className="notice notice--err">Supabase is not configured. Add the keys to .env.local and restart.</p> : (
          <form onSubmit={submit}>
            <div className="tabs" role="tablist">
              <button type="button" role="tab" aria-selected={mode === 'in'} className={`btn btn--sm${mode === 'in' ? ' btn--primary' : ''}`} onClick={() => setMode('in')}>Sign in</button>
              <button type="button" role="tab" aria-selected={mode === 'up'} className={`btn btn--sm${mode === 'up' ? ' btn--primary' : ''}`} onClick={() => setMode('up')}>Create account</button>
            </div>
            <label className="f"><span className="f__label">Email</span><input className="in" name="email" type="email" required autoComplete="email" /></label>
            {mode !== 'reset' && <label className="f"><span className="f__label">Password</span><input className="in" name="password" type="password" required minLength={8} autoComplete={mode === 'up' ? 'new-password' : 'current-password'} /></label>}
            {msg && <p className={`notice ${msg.ok ? 'notice--ok' : 'notice--err'}`}>{msg.text}</p>}
            <button className="btn btn--orange" disabled={busy}>{busy ? 'Please wait…' : mode === 'in' ? 'Sign in' : mode === 'up' ? 'Create account' : 'Send reset link'}</button>
            <button type="button" className="btn btn--sm btn--ghost" onClick={() => setMode(mode === 'reset' ? 'in' : 'reset')}>{mode === 'reset' ? 'Back to sign in' : 'Forgot password?'}</button>
          </form>
        )}
        <Link href="/" style={{ color: 'var(--lilac)', fontWeight: 700 }}>← Back to the site</Link>
      </div>
    </div>
  )
}
