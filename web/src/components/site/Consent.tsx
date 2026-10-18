'use client'
import { useState, useSyncExternalStore } from 'react'
import { ALL, KEY } from '@/lib/gtm'

const noop = () => () => {}

export function ConsentBanner() {
  // Hidden on the server and until the stored choice is read, so it never flashes for returning visitors.
  const stored = useSyncExternalStore(noop, () => { try { return localStorage.getItem(KEY) } catch { return null } }, () => 'unknown')
  const [done, setDone] = useState(false)
  if (stored || done) return null
  const choose = (v: 'granted' | 'denied') => {
    try { localStorage.setItem(KEY, v) } catch {}
    const w = window as unknown as { gtag?: (...a: unknown[]) => void }
    w.gtag?.('consent', 'update', Object.fromEntries(ALL.map((k) => [k, v])))
    setDone(true)
  }
  return (
    <div className="consent" role="dialog" aria-label="Cookie consent">
      <p>We use cookies to measure traffic and improve our ads. You can say no and the site works the same. <a href="/privacy-policy">Cookie policy</a></p>
      <div>
        <button type="button" onClick={() => choose('denied')}>Reject</button>
        <button type="button" className="consent__ok" onClick={() => choose('granted')}>Accept</button>
      </div>
    </div>
  )
}
