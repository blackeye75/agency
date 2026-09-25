'use client'
import { createContext, use, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReduced } from '@/components/motion/gsap'
import { scroll } from '@/components/motion/scroll'

type Site = {
  navigate: (href: string) => void
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  // Registered by the menu so a link inside it can close it before leaving.
  closeMenuRef: React.RefObject<((after?: () => void) => void) | null>
  transitionRef: React.RefObject<HTMLDivElement | null>
  // The band marquees, played only while the transition is on screen.
  loopsRef: React.RefObject<gsap.core.Tween[]>
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

      const layer = transitionRef.current
      if (busy.current) return
      if (prefersReduced() || !layer) {
        router.push(target, { scroll: false })
        arrived.then(land)
        return
      }
      busy.current = true
      scroll.lenis?.stop()
      const dim = layer.querySelector('.transition__dim')
      const bands = layer.querySelector('.transition__bands')
      const loops = loopsRef.current
      // Gentle in-out curve and unhurried timing so the sweep reads as one calm motion.
      const ease = 'power2.inOut'
      const SWEEP = 1.1
      layer.classList.add('is-active')
      loops.forEach((l) => l.play())
      gsap.timeline()
        .set(layer, { visibility: 'visible' })
        .fromTo(dim, { opacity: 0 }, { opacity: 0.6, duration: 0.8, ease: 'sine.out' }, 0)
        .fromTo(bands, { yPercent: 105 }, { yPercent: 0, duration: SWEEP, ease }, 0)
        .add(() => {
          router.push(target, { scroll: false })
          arrived.then(() => {
            land()
            // Let the new page finish its heavy setup (splits, pins) while
            // it is still covered, then lift the bands off in one motion.
            requestAnimationFrame(() => requestAnimationFrame(() => {
              ScrollTrigger.refresh()
              scroll.lenis?.start()
              gsap.timeline({
                delay: 0.3, // hold the covered screen a beat so the band words read
                onComplete: () => {
                  gsap.set(layer, { visibility: 'hidden' })
                  gsap.set(bands, { yPercent: 105 })
                  loops.forEach((l) => l.pause())
                  layer.classList.remove('is-active')
                  busy.current = false
                },
              })
                .to(bands, { yPercent: -105, duration: SWEEP, ease }, 0)
                .to(dim, { opacity: 0, duration: 0.8, ease: 'sine.inOut' }, 0.35)
            }))
          })
        })
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
    () => ({ navigate, menuOpen, setMenuOpen, closeMenuRef, transitionRef, loopsRef, onRoute }),
    [navigate, menuOpen, onRoute],
  )
  return <SiteContext value={value}>{children}</SiteContext>
}
