'use client'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/components/motion/gsap'
import { useViewport } from '@/components/motion/useViewport'
import { lines } from '@/lib/cms/text'
import type { BondData } from '@/lib/cms/types'

// Copula: two huge orange circles close in on the title.
export function Bond({ data }: { data: BondData }) {
  const ref = useRef<HTMLElement>(null)
  const { reduce } = useViewport()
  useGSAP(() => {
    const sec = ref.current!
    const layer = sec.querySelector<HTMLElement>('.bond__orange')!
    const title = layer.querySelector('.bond__title')
    const apply = (p: number) => {
      const W = sec.clientWidth, H = sec.clientHeight, r = Math.max(W * 0.9, H)
      const d0 = H * 0.12, d1 = H / 2 + r - Math.sqrt(r * r - (W / 2) ** 2) + H * 0.05
      layer.style.setProperty('--r', r + 'px'); layer.style.setProperty('--h', H + 'px'); layer.style.setProperty('--d', d0 + (d1 - d0) * p + 'px')
    }
    if (reduce) { apply(1); return }
    const o = { p: 0 }
    apply(0)
    gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=160%', pin: true, scrub: 1, onRefresh: () => apply(o.p) } })
      .to(o, { p: 1, ease: 'power1.inOut', duration: 1, onUpdate: () => apply(o.p) })
      .fromTo(title, { scale: 0.88, rotation: -3 }, { scale: 1, rotation: 0, ease: 'none', duration: 1 }, 0)
      .to({}, { duration: 0.25 })
  }, { scope: ref, dependencies: [reduce], revertOnUpdate: true })
  return (
    <section className="bond" ref={ref}>
      <div className="bond__orange"><h2 className="bond__title">{lines(data.title)}</h2></div>
    </section>
  )
}
