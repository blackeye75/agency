'use client'
import { useRef } from 'react'
import { gsap, useGSAP, prefersReduced } from './gsap'
import { scroll } from './scroll'

// Attaches looping marquee motion to the closest server-rendered section, so
// the section markup (and its logo data) can stay on the server.
export function MarqueeMotion({ selector, duration = 22, reverse = false, boost = true, spin }: {
  selector: string; duration?: number; reverse?: boolean; boost?: boolean; spin?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  useGSAP(() => {
    const host = ref.current?.parentElement
    const track = host?.querySelector<HTMLElement>(selector)
    if (!track || prefersReduced()) return
    const loop = gsap.fromTo(track, { xPercent: reverse ? -50 : 0 }, { xPercent: reverse ? 0 : -50, duration, ease: 'none', repeat: -1 })
    if (spin) track.querySelectorAll(spin).forEach((a) => gsap.to(a, { rotation: 360, duration: 6, ease: 'none', repeat: -1 }))
    if (!boost || !scroll.lenis) return
    const off = scroll.lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      loop.timeScale(1 + Math.min(Math.abs(velocity) / 8, 4))
      gsap.to(loop, { timeScale: 1, duration: 0.8, ease: 'power2.out', overwrite: true })
    })
    return () => off()
  })
  return <span ref={ref} hidden />
}
