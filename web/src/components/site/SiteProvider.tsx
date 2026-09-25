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
      if (prefersReduced() || !layer || busy.current) {
        router.push(target, { scroll: false })
        arrived.then(land)
        return
      }
      busy.current = true
      scroll.lenis?.stop()
      const dim = layer.querySelector('.transition__dim')
      const bands = layer.querySelector('.transition__bands')
      const wipe = layer.querySelector('.transition__wipe')
      layer.classList.add('is-active')
      gsap.timeline()
        .set(layer, { visibility: 'visible' })
        .fromTo(dim, { opacity: 0 }, { opacity: 0.8, duration: 0.35, ease: 'power2.out' })
        .fromTo(bands, { opacity: 0 }, { opacity: 1, duration: 0.01 })
        .fromTo(layer.querySelectorAll('.band'), { yPercent: 160 }, { yPercent: 0, duration: 0.6, ease: 'power4.out', stagger: 0.08 }, '<')
        .fromTo(wipe, { xPercent: -101 }, { xPercent: 0, duration: 0.45, ease: 'power3.inOut' }, '+=0.25')
        .add(() => {
          router.push(target, { scroll: false })
          arrived.then(() => {
            land()
            scroll.lenis?.start()
            gsap.timeline({
              onComplete: () => {
                layer.classList.remove('is-active')
                busy.current = false
              },
            })
              .set([bands, dim], { opacity: 0 })
              .to(wipe, { xPercent: 101, duration: 0.55, ease: 'power3.inOut', delay: 0.1 })
              .set(layer, { visibility: 'hidden' })
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
    () => ({ navigate, menuOpen, setMenuOpen, closeMenuRef, transitionRef, onRoute }),
    [navigate, menuOpen, onRoute],
  )
  return <SiteContext value={value}>{children}</SiteContext>
}
