'use client'
import { Suspense, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, prefersReduced } from '@/components/motion/gsap'
import { scroll } from '@/components/motion/scroll'
import { useSite } from './SiteProvider'
import { TLink } from './TLink'
import type { Settings } from '@/lib/cms/types'

function Links({ nav }: { nav: Settings['nav'] }) {
  const path = usePathname()
  return nav.map((l) => <TLink key={l.href} href={l.href} aria-current={path === l.href ? 'page' : undefined}>{l.label}</TLink>)
}

// Three sliding circles (Crency). Opened from the dock.
export function Menu({ settings }: { settings: Settings }) {
  const { menuOpen, setMenuOpen, closeMenuRef } = useSite()
  const ref = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const closing = useRef(false)

  const parts = () => [document.getElementById('main'), ...document.querySelectorAll('[data-page-part]')].filter(Boolean) as HTMLElement[]

  useEffect(() => {
    const menu = ref.current
    if (!menu || !menuOpen) return
    lastFocus.current = document.activeElement as HTMLElement
    menu.hidden = false
    scroll.lenis?.stop()
    parts().forEach((el) => el.classList.add('page-blur'))
    const circles = menu.querySelectorAll('[data-circle]')
    const items = menu.querySelectorAll('.menu__links > *, .round')
    const first = menu.querySelector<HTMLElement>('.menu__links a')
    if (prefersReduced()) { first?.focus(); return }
    const tl = gsap.timeline()
      .fromTo([circles[2], circles[1], circles[0]], { xPercent: 190 }, { xPercent: 0, duration: 1, ease: 'power4.out', stagger: 0.12 })
      .fromTo(items, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.06 }, '-=0.45')
      .add(() => first?.focus())
    return () => { tl.kill() }
  }, [menuOpen])

  useEffect(() => {
    closeMenuRef.current = (after?: () => void) => {
      const menu = ref.current
      if (!menu || menu.hidden || closing.current) { after?.(); return }
      closing.current = true
      const done = () => {
        menu.hidden = true
        closing.current = false
        parts().forEach((el) => el.classList.remove('page-blur'))
        scroll.lenis?.start()
        setMenuOpen(false)
        if (after) after()
        else lastFocus.current?.focus?.()
      }
      if (prefersReduced()) return done()
      gsap.timeline({ onComplete: done })
        .to(menu.querySelectorAll('.menu__links > *, .round'), { opacity: 0, y: -20, duration: 0.25, stagger: 0.03 })
        .to(menu.querySelectorAll('[data-circle]'), { xPercent: -230, duration: 0.8, ease: 'power3.in', stagger: 0.08 }, '-=0.1')
    }
  }, [closeMenuRef, setMenuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      const menu = ref.current
      if (!menu) return
      if (e.key === 'Escape') closeMenuRef.current?.()
      if (e.key === 'Tab') {
        const f = [...menu.querySelectorAll<HTMLElement>('a, button')]
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen, closeMenuRef])

  return (
    <div className="menu" ref={ref} role="dialog" aria-modal="true" aria-label="Menu" hidden>
      <div className="menu__scrim" onClick={() => closeMenuRef.current?.()} />
      <div className="menu__circle menu__circle--orange" data-circle>
        <TLink href="/blog" className="round round--dark">
          <svg className="round__arrow" style={{ transform: 'rotate(-90deg)' }} aria-hidden="true"><use href="#arrow-ne" /></svg>
          <svg className="round__text" viewBox="-50 -50 100 100" aria-hidden="true"><defs><path id="rt1" d="M-36,0 a36,36 0 1,0 72,0" /></defs><text><textPath href="#rt1" startOffset="50%" textAnchor="middle">View Blogs</textPath></text></svg>
          <span className="sr">View blogs</span>
        </TLink>
      </div>
      <div className="menu__circle menu__circle--lime" data-circle>
        <nav className="menu__links" aria-label="Menu">
          <Suspense fallback={settings.nav.map((l) => <TLink key={l.href} href={l.href}>{l.label}</TLink>)}>
            <Links nav={settings.nav} />
          </Suspense>
          <TLink href={settings.cta.href}>{settings.cta.label}</TLink>
          <button className="menu__close" onClick={() => closeMenuRef.current?.()} data-cursor="click"><span>close</span><i>✕</i></button>
        </nav>
      </div>
      <div className="menu__circle menu__circle--blue" data-circle>
        <TLink href="/projects" className="round round--light">
          <svg className="round__arrow" style={{ transform: 'rotate(90deg)' }} aria-hidden="true"><use href="#arrow-ne" /></svg>
          <svg className="round__text" viewBox="-50 -50 100 100" aria-hidden="true"><defs><path id="rt2" d="M-36,0 a36,36 0 1,0 72,0" /></defs><text><textPath href="#rt2" startOffset="50%" textAnchor="middle">View Cases</textPath></text></svg>
          <span className="sr">View cases</span>
        </TLink>
      </div>
    </div>
  )
}
