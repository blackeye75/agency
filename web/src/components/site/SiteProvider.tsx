'use client'
import { createContext, use, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReduced } from '@/components/motion/gsap'
import { scroll, setCovered } from '@/components/motion/scroll'

type Site = {
  navigate: (href: string) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  // Registered by the menu so a link inside it can close it before leaving.
  closeMenuRef: React.RefObject<((after?: () => void) => void) | null>
  // Band marquee transition (between inner pages) and its paused band loops.
  transitionRef: React.RefObject<HTMLDivElement | null>
  loopsRef: React.RefObject<gsap.core.Tween[]>
  // Loader transition, used when going to the home page.
  curtainRef: React.RefObject<HTMLDivElement | null>
  onRoute: (path: string) => void
}

const SiteContext = createContext<Site | null>(null)

export function useSite() {
  const site = use(SiteContext)
  if (!site) throw new Error('useSite must be used inside <SiteProvider>')
  return site
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenuRef = useRef<((after?: () => void) => void) | null>(null)
  const transitionRef = useRef<HTMLDivElement | null>(null)
  const loopsRef = useRef<gsap.core.Tween[]>([])
  const curtainRef = useRef<HTMLDivElement | null>(null)
  const pending = useRef<{ path: string; resolve: () => void } | null>(null)
  const busy = useRef(false)

  // Smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    const reduce = prefersReduced()
    const lenis = new Lenis({ lerp: reduce ? 1 : 0.09, smoothWheel: !reduce })
    scroll.lenis = lenis
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    history.scrollRestoration = 'manual'
    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      scroll.lenis = null
    }
  }, [])

  const onRoute = useCallback((path: string) => {
    if (pending.current && pending.current.path === path) {
      pending.current.resolve()
      pending.current = null
    }
  }, [])

  const scrollToHash = useCallback((hash: string) => {
    const target = hash && hash !== '#top' ? document.querySelector(hash) : 0
    if (target === null) return
    scroll.lenis?.scrollTo(target as HTMLElement | number, { immediate: prefersReduced(), force: true, duration: 1.4 })
  }, [])

  const go = useCallback(
    (href: string) => {
      const url = new URL(href, window.location.href)
      if (url.origin !== window.location.origin) {
        window.location.href = href
        return
      }
      const same = url.pathname === window.location.pathname
      if (same) {
        if (url.search !== window.location.search) router.push(url.pathname + url.search + url.hash, { scroll: false })
        scrollToHash(url.hash)
        return
      }
      const target = url.pathname + url.search + url.hash
      const arrived = new Promise<void>((resolve) => {
        pending.current = { path: url.pathname, resolve }
        setTimeout(resolve, 6000)
      })
      const land = () => {
        window.scrollTo(0, 0)
        scroll.lenis?.scrollTo(0, { immediate: true, force: true })
        ScrollTrigger.refresh()
        if (url.hash) requestAnimationFrame(() => scrollToHash(url.hash))
      }

      if (busy.current) return
      const toHome = url.pathname === '/'
      const layer = toHome ? curtainRef.current : transitionRef.current
      if (prefersReduced() || !layer) {
        router.push(target, { scroll: false })
        arrived.then(land)
        return
      }
      busy.current = true
      scroll.lenis?.stop()
      layer.classList.add('is-active')
      gsap.set(layer, { visibility: 'visible' })
      const started = performance.now()
      // Swap the route once the screen is covered, then call reveal() after
      // the new page has set itself up (splits, pins) underneath.
      const swap = (reveal: () => void) => {
        setCovered(true)
        router.push(target, { scroll: false })
        arrived.then(() => {
          land()
          requestAnimationFrame(() => requestAnimationFrame(() => { ScrollTrigger.refresh(); reveal() }))
        })
      }
      const done = () => {
        gsap.set(layer, { visibility: 'hidden' })
        layer.classList.remove('is-active')
        busy.current = false
      }

      if (toHome) {
        // The intro loader: counts up while covering, finishes at 100%, the
        // colour columns rise and the panel lifts off.
        const panel = layer.querySelector('.curtain__panel')!
        const cols = layer.querySelectorAll('.lb')
        const texts = layer.querySelectorAll('.loader__count, .loader__word')
        const count = layer.querySelector('[data-count]')!
        const n = { v: 0 }
        const show = () => { count.textContent = String(Math.round(n.v)) }
        gsap.set(cols, { scaleY: 0 })
        gsap.set(texts, { opacity: 1 })
        show()
        gsap.to(n, { v: 72, duration: 1.3, ease: 'power2.out', onUpdate: show })
        gsap.fromTo(panel, { yPercent: 100 }, {
          yPercent: 0, duration: 0.8, ease: 'power3.inOut',
          onComplete: () => swap(() => {
            gsap.timeline({ delay: Math.max(0, 1.1 - (performance.now() - started) / 1000), onComplete: () => { gsap.set(panel, { yPercent: 100 }); done() } })
              .to(n, { v: 100, duration: 0.6, ease: 'power2.inOut', onUpdate: show, overwrite: true })
              .to(cols, { scaleY: 1, duration: 0.6, ease: 'power3.inOut', stagger: 0.1 }, 0.1)
              .to(texts, { opacity: 0, duration: 0.2 }, 0.55)
              .add(() => scroll.lenis?.start(), 0.8)
              .to(panel, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, 0.8)
              .add(() => setCovered(false), 1.15)
          }),
        })
        return
      }

      // The marquee bands: one solid block sweeps up, holds, and lifts off.
      const dim = layer.querySelector('.transition__dim')
      const bands = layer.querySelector('.transition__bands')
      const loops = loopsRef.current
      const ease = 'power2.inOut'
      const SWEEP = 1.1
      loops.forEach((l) => l.play())
      gsap.timeline()
        .fromTo(dim, { opacity: 0 }, { opacity: 0.6, duration: 0.8, ease: 'sine.out' }, 0)
        .fromTo(bands, { yPercent: 105 }, { yPercent: 0, duration: SWEEP, ease }, 0)
        .add(() => swap(() => {
          scroll.lenis?.start()
          gsap.timeline({
            delay: 0.3, // hold the covered screen a beat so the band words read
            onComplete: () => { gsap.set(bands, { yPercent: 105 }); loops.forEach((l) => l.pause()); done() },
          })
            .to(bands, { yPercent: -105, duration: SWEEP, ease }, 0)
            .to(dim, { opacity: 0, duration: 0.8, ease: 'sine.inOut' }, 0.35)
            .add(() => setCovered(false), 0.5)
        }))
    },
    [router, scrollToHash],
  )

  const navigate = useCallback(
    (href: string) => {
      const close = closeMenuRef.current
      if (menuOpen && close) close(() => go(href))
      else go(href)
    },
    [go, menuOpen],
  )

  const value = useMemo(
    () => ({ navigate, menuOpen, setMenuOpen, closeMenuRef, transitionRef, loopsRef, curtainRef, onRoute }),
    [navigate, menuOpen, onRoute],
  )
  return <SiteContext value={value}>{children}</SiteContext>
}
