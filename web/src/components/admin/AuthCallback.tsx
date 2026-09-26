'use client'
import { useEffect, useState, type FormEvent } from 'react'
import Link from 'next/link'
import type { EmailOtpType } from '@supabase/supabase-js'
import { browserClient } from '@/lib/supabase/browser'

type State = { step: 'checking' | 'set-password' | 'error' | 'done'; message?: string }

// Landing page for every Supabase email link (confirm sign-up, reset password,
// magic link). Supports all three link styles Supabase sends: ?code= (PKCE),
// #access_token= (links sent from the dashboard) and ?token_hash=.
export function AuthCallback() {
  const [state, setState] = useState<State>({ step: 'checking' })
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const db = browserClient()
    const url = new URL(window.location.href)
    const hash = new URLSearchParams(url.hash.slice(1))
    const q = url.searchParams
    const type = (hash.get('type') || q.get('type') || '') as EmailOtpType | ''
    const recovery = type === 'recovery' || q.get('next') === 'reset'
    const linkError = hash.get('error_description') || q.get('error_description')

    ;(async () => {
      if (!db) throw new Error('Supabase is not configured.')
      if (linkError) throw new Error(linkError.replace(/\+/g, ' '))
      // The client may already have exchanged a ?code= on start-up.
      let { data: { session } } = await db.auth.getSession()
      if (!session && hash.get('access_token') && hash.get('refresh_token')) {
        const r = await db.auth.setSession({ access_token: hash.get('access_token')!, refresh_token: hash.get('refresh_token')! })
        if (r.error) throw r.error
        session = r.data.session
      }
      if (!session && q.get('code')) {
        const r = await db.auth.exchangeCodeForSession(q.get('code')!)
        if (r.error) throw new Error('This link must be opened in the same browser where you asked for it. Request a new one from the login page.')
        session = r.data.session
      }
      if (!session && q.get('token_hash') && type) {
        const r = await db.auth.verifyOtp({ token_hash: q.get('token_hash')!, type })
        if (r.error) throw r.error
        session = r.data.session
      }
      window.history.replaceState(null, '', '/admin/auth' + (recovery ? '?next=reset' : ''))
      if (!session) throw new Error('This link is invalid or has expired. Links work once and only the newest one is valid. Request a new one from the login page.')
      if (recovery) setState({ step: 'set-password' })
      else { setState({ step: 'done' }); window.location.replace('/admin') }
    })().catch((e: Error) => setState({ step: 'error', message: e.message }))
  }, [])

  async function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const password = String(fd.get('password'))
    if (password !== String(fd.get('confirm'))) return setState({ step: 'set-password', message: 'The two passwords do not match.' })
    setBusy(true)
    const { error } = (await browserClient()?.auth.updateUser({ password })) ?? { error: new Error('Not configured') }
    setBusy(false)
    if (error) return setState({ step: 'set-password', message: error.message })
    setState({ step: 'done', message: 'Password saved. Opening the CMS…' })
    window.location.replace('/admin')
  }

  return (
    <div className="login">
      <div className="login__box">
        <h1>NOVA<br /><span>CMS</span></h1>
        {state.step === 'checking' && <p>Checking your link…</p>}
        {state.step === 'done' && <p className="notice notice--ok">{state.message ?? 'Signed in. Opening the CMS…'}</p>}
        {state.step === 'error' && (
          <>
            <p className="notice notice--err">{state.message}</p>
            <Link className="btn btn--orange" href="/admin/login">Back to login</Link>
          </>
        )}
        {state.step === 'set-password' && (
          <form onSubmit={save}>
            <p style={{ margin: 0 }}>Choose a new password for the CMS.</p>
            <label className="f"><span className="f__label">New password</span><input className="in" name="password" type="password" minLength={8} required autoComplete="new-password" /></label>
            <label className="f"><span className="f__label">Repeat it</span><input className="in" name="confirm" type="password" minLength={8} required autoComplete="new-password" /></label>
            {state.message && <p className="notice notice--err">{state.message}</p>}
            <button className="btn btn--orange" disabled={busy}>{busy ? 'Saving…' : 'Save password and sign in'}</button>
          </form>
        )}
      </div>
    </div>
  )
}
