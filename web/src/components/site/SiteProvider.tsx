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
  transitionRef: React.RefObject<HTMLDivElement | null>
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
      const panel = layer.querySelector('.curtain__panel')!
      const bands = layer.querySelectorAll('.lb')
      const texts = layer.querySelectorAll('.loader__count, .loader__word')
      const count = layer.querySelector('[data-count]')!
      const n = { v: 0 }
      const show = () => { count.textContent = String(Math.round(n.v)) }
      const started = performance.now()
      layer.classList.add('is-active')
      gsap.set(layer, { visibility: 'visible' })
      gsap.set(bands, { scaleY: 0 })
      gsap.set(texts, { opacity: 1 })
      show()
      // 1. The loader panel slides up over the page and starts counting.
      gsap.to(n, { v: 72, duration: 1.3, ease: 'power2.out', onUpdate: show })
      gsap.fromTo(panel, { yPercent: 100 }, {
        yPercent: 0, duration: 0.8, ease: 'power3.inOut',
        onComplete: () => {
          setCovered(true)
          router.push(target, { scroll: false })
          arrived.then(() => {
            land()
            // 2. Once the new page has set itself up (still covered), finish
            // exactly like the intro loader: count to 100, colour columns
            // rise, then the whole loader lifts off.
            requestAnimationFrame(() => requestAnimationFrame(() => {
              ScrollTrigger.refresh()
              const wait = Math.max(0, 1.1 - (performance.now() - started) / 1000)
              gsap.timeline({
                delay: wait,
                onComplete: () => {
                  gsap.set(layer, { visibility: 'hidden' })
                  gsap.set(panel, { yPercent: 100 })
                  layer.classList.remove('is-active')
                  busy.current = false
                },
              })
                .to(n, { v: 100, duration: 0.6, ease: 'power2.inOut', onUpdate: show, overwrite: true })
                .to(bands, { scaleY: 1, duration: 0.6, ease: 'power3.inOut', stagger: 0.1 }, 0.1)
                .to(texts, { opacity: 0, duration: 0.2 }, 0.55)
                .add(() => scroll.lenis?.start(), 0.8)
                .to(panel, { yPercent: -100, duration: 0.8, ease: 'power4.inOut' }, 0.8)
                .add(() => setCovered(false), 1.15)
            }))
          })
        },
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
    () => ({ navigate, menuOpen, setMenuOpen, closeMenuRef, transitionRef, onRoute }),
    [navigate, menuOpen, onRoute],
  )
  return <SiteContext value={value}>{children}</SiteContext>
}
