'use client'
import { Suspense, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger, useGSAP, finePointer, prefersReduced } from '@/components/motion/gsap'
import { finishIntro, scroll, whenIntroDone } from '@/components/motion/scroll'
import { useSite } from './SiteProvider'
import { TLink } from './TLink'
import { Arrow, Use } from './Sprites'
import type { Settings } from '@/lib/cms/types'

const isActive = (path: string, href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(href + '/'))

function NavLinksLive({ nav }: { nav: Settings['nav'] }) {
  const path = usePathname()
  return nav.map((l) => (
    <TLink key={l.href} href={l.href} aria-current={isActive(path, l.href) ? 'page' : undefined}>{l.label}</TLink>
  ))
}
function NavLinks({ nav }: { nav: Settings['nav'] }) {
  return (
    <nav className="nav__links" aria-label="Main">
      <Suspense fallback={nav.map((l) => <TLink key={l.href} href={l.href}>{l.label}</TLink>)}>
        <NavLinksLive nav={nav} />
      </Suspense>
    </nav>
  )
}

export function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement
    const next = root.dataset.theme === 'light' ? 'dark' : 'light'
    root.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch {}
    ScrollTrigger.refresh()
  }
  return (
    <button className="theme-toggle" onClick={toggle} data-cursor="click" aria-label="Switch between dark and light theme">
      <svg className="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="currentColor" /></svg>
      <svg className="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor" /><g stroke="currentColor" strokeWidth="2" strokeLinecap="round">{[0, 45, 90, 135, 180, 225, 270, 315].map((r) => <path key={r} d="M12 2.5v2.2" transform={`rotate(${r} 12 12)`} />)}</g></svg>
    </button>
  )
}

export function Nav({ settings }: { settings: Settings }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    const nav = ref.current
    if (!nav) return
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (s) => gsap.to(nav, { yPercent: s.direction === 1 && s.scroll() > 200 ? -160 : 0, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }),
    })
  })
  return (
    <header className="nav" ref={ref} data-page-part data-chrome="top">
      <TLink href="/" className="nav__logo" aria-label={`${settings.brand.name} home`}>{settings.brand.name}<Use id="asterisk" /></TLink>
      <NavLinks nav={settings.nav} />
      <div className="nav__tools">
        <ThemeToggle />
        <TLink href={settings.cta.href} className="nav__cta">{settings.cta.label}<Arrow /></TLink>
      </div>
    </header>
  )
}

export function Dock({ settings }: { settings: Settings }) {
  const { setMenuOpen } = useSite()
  return (
    <div className="dock" data-page-part data-chrome="bottom">
      <button className="dock__item" onClick={() => setMenuOpen(true)} data-cursor="click" aria-haspopup="dialog"><i />Open: <b>{settings.dock.menuLabel}</b></button>
      <TLink className="dock__cta" href={settings.dock.cta.href}>{settings.dock.cta.label}</TLink>
      <TLink className="dock__item" href={settings.dock.secondary.href}><i />View: <b>{settings.dock.secondary.label}</b></TLink>
    </div>
  )
}

// Nav and dock slide in once the loader is gone (only on the first visit).
export function ChromeIntro() {
  useEffect(() => {
    const root = document.documentElement
    const top = document.querySelector('[data-chrome="top"]')
    const bottom = document.querySelector('[data-chrome="bottom"]')
    if (root.classList.contains('intro-seen') || prefersReduced()) return
    gsap.set([top, bottom], { opacity: 0 })
    whenIntroDone(() => {
      gsap.fromTo(top, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 })
      gsap.fromTo(bottom, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.6)', delay: 1.4 })
    })
  }, [])
  return null
}

export function Loader({ settings }: { settings: Settings }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    const root = document.documentElement
    if (!el || !settings.loader.enabled || root.classList.contains('intro-seen') || prefersReduced()) {
      el?.remove()
      finishIntro()
      return
    }
    try { sessionStorage.setItem('intro', '1') } catch {}
    scroll.lenis?.stop()
    gsap.ticker.lagSmoothing(500, 33) // don't let a slow first frame skip the intro
    const n = { v: 0 }
    const count = el.querySelector('[data-count]')!
    let tl: gsap.core.Timeline | undefined
    const id = requestAnimationFrame(() => requestAnimationFrame(() => {
      tl = gsap.timeline({ onComplete: () => { el.remove(); scroll.lenis?.start(); gsap.ticker.lagSmoothing(0) } })
        .to(n, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => { count.textContent = String(Math.round(n.v)) } })
        .to(el.querySelectorAll('.lb'), { scaleY: 1, duration: 0.6, ease: 'power3.inOut', stagger: 0.1 }, 0.9)
        .to(el.querySelectorAll('.loader__count, .loader__word'), { opacity: 0, duration: 0.2 }, '-=0.15')
        .to(el, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' })
        .add(finishIntro, '-=0.45')
    }))
    return () => { cancelAnimationFrame(id); tl?.kill() }
  }, [settings.loader.enabled])
  if (!settings.loader.enabled) return null
  return (
    <div className="loader" ref={ref} aria-hidden="true">
      <div className="loader__bands"><div className="lb lb--orange" /><div className="lb lb--blue" /><div className="lb lb--lime" /></div>
      <p className="loader__count"><span data-count>0</span><i>%</i></p>
      <p className="loader__word">{settings.loader.text}<span className="blink">_</span></p>
    </div>
  )
}

export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const cur = ref.current
    if (!cur || !finePointer() || prefersReduced()) return
    const root = document.documentElement
    root.classList.add('has-cursor')
    cur.dataset.state = 'you'
    gsap.set(cur, { opacity: 0 })
    const xTo = gsap.quickTo(cur, 'x', { duration: 0.16, ease: 'power3' })
    const yTo = gsap.quickTo(cur, 'y', { duration: 0.16, ease: 'power3' })
    let shown = false
    const move = (e: PointerEvent) => {
      if (!shown) { gsap.set(cur, { x: e.clientX, y: e.clientY }); gsap.to(cur, { opacity: 1, duration: 0.2 }); shown = true }
      xTo(e.clientX); yTo(e.clientY)
    }
    const over = (e: PointerEvent) => {
      const t = (e.target as Element).closest?.('[data-cursor], a, button, input, label, select, textarea') as HTMLElement | null
      cur.dataset.state = t ? t.dataset.cursor ?? 'click' : 'you'
    }
    const leave = () => { gsap.to(cur, { opacity: 0, duration: 0.2 }); shown = false }
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    root.addEventListener('pointerleave', leave)
    return () => {
      root.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      root.removeEventListener('pointerleave', leave)
    }
  }, [])
  return (
    <div className="cursor" ref={ref} aria-hidden="true">
      <div className="cursor__icon">
        <svg className="ci ci--you" viewBox="0 0 24 24"><path d="M3 2 L20 10 L12 12 L9 20 Z" fill="var(--lime)" stroke="var(--ink)" strokeWidth="1.2" strokeLinejoin="round" /></svg>
        <svg className="ci ci--click" viewBox="0 0 24 24"><path d="M9 11 V4.5 a1.6 1.6 0 0 1 3.2 0 V10 l.2-1 a1.6 1.6 0 0 1 3.1.4 V11 a1.6 1.6 0 0 1 3 .6 V16 c0 3.2-2.4 5.5-5.6 5.5 h-1.2 c-2 0-3.3-.8-4.4-2.4 L4.4 14.4 a1.6 1.6 0 0 1 2.5-2 Z" fill="var(--orange)" stroke="var(--ink)" strokeWidth="1.1" strokeLinejoin="round" /></svg>
        <svg className="ci ci--drag" viewBox="0 0 24 24"><path d="M7 10 V8 a1.5 1.5 0 0 1 3 0 V7 a1.5 1.5 0 0 1 3 0 V8 a1.5 1.5 0 0 1 3 0 v1 a1.5 1.5 0 0 1 3 0 V15 c0 3.5-2.5 6-6 6 h-1.5 c-2.2 0-3.6-1-4.6-2.6 L4.6 14 A1.5 1.5 0 0 1 7 12.3 Z" fill="var(--sky)" stroke="var(--ink)" strokeWidth="1.1" strokeLinejoin="round" /></svg>
      </div>
      <div className="cursor__label"><span className="cl cl--you">You</span><span className="cl cl--click">Click</span><span className="cl cl--drag">Drag</span></div>
    </div>
  )
}

export function Transition({ words }: { words: string[] }) {
  const { transitionRef } = useSite()
  const tones = ['lime', 'orange', 'blue'] as const
  const icons = [<i key="t" className="ico-target" />, <i key="e" className="ico-eye" />, <Use key="a" id="asterisk" className="mq-ast" />]
  useGSAP(() => {
    if (prefersReduced()) return
    gsap.utils.toArray<HTMLElement>('.band__track', transitionRef.current).forEach((t, i) =>
      gsap.fromTo(t, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 9, ease: 'none', repeat: -1 }))
  }, { scope: transitionRef })
  return (
    <div className="transition" ref={transitionRef} aria-hidden="true">
      <div className="transition__dim" />
      <div className="transition__bands">
        {tones.map((tone, i) => (
          <div key={tone} className={`band band--${tone}`}>
            <div className="band__track">
              {Array.from({ length: 6 }, (_, k) => (
                <span key={k} style={{ display: 'contents' }}><span>{words[i] ?? words[0] ?? ''}</span>{icons[i]}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="transition__wipe" />
    </div>
  )
}

function RouteWatcherLive() {
  const path = usePathname()
  const { onRoute, setMenuOpen } = useSite()
  useEffect(() => {
    onRoute(path)
  }, [path, onRoute, setMenuOpen])
  return null
}
export function RouteWatcher() {
  return <Suspense fallback={null}><RouteWatcherLive /></Suspense>
}
