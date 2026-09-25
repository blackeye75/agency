'use client'
import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from '@/components/motion/gsap'
import { Lines } from '@/components/motion/Lines'
import { Wave } from '@/components/motion/Wave'
import { Cta } from '@/components/site/Cta'
import type { AuditData } from '@/lib/cms/types'

const SPOTS = [['50%', '-8%'], ['90%', '20%'], ['40%', '50%'], ['10%', '74%'], ['80%', '76%'], ['20%', '10%'], ['66%', '96%']]

// Crency: score chips pop in and count up.
export function Audit({ data, next }: { data: AuditData; next?: string }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    const chips = gsap.utils.toArray<HTMLElement>('.chip', ref.current)
    const fill = (c: HTMLElement, v: number) => {
      c.querySelector('b')!.textContent = Math.round(v) + '%'
    }
    if (prefersReduced()) {
      chips.forEach((c) => { const v = Number(c.dataset.value); fill(c, v); gsap.set(c, { scale: 1 }); gsap.set(c.querySelector('s'), { scaleX: v / 100 }) })
      return
    }
    const tl = gsap.timeline({ paused: true })
    chips.forEach((c, i) => {
      const target = Number(c.dataset.value), val = { v: 0 }
      tl.fromTo(c, { scale: 0, rotation: -8 }, { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(2)' }, i * 0.18)
        .to(val, { v: target, duration: 1.6, ease: 'power2.out', onUpdate: () => fill(c, val.v) }, i * 0.18 + 0.1)
        .fromTo(c.querySelector('s'), { scaleX: 0 }, { scaleX: target / 100, duration: 1.6, ease: 'power2.out' }, i * 0.18 + 0.1)
    })
    ScrollTrigger.create({ trigger: ref.current, start: 'top 55%', once: true, onEnter: () => tl.play() })
  }, { scope: ref, dependencies: [JSON.stringify(data.chips)], revertOnUpdate: true })

  return (
    <section className="audit" ref={ref}>
      <div className="audit__wrap">
        <Lines text={data.title} className="mega mega--lilac audit__title" />
        {data.chips.map((c, i) => (
          <div key={i} className={`chip tone-${c.tone}`} data-value={c.value} style={{ '--x': SPOTS[i % SPOTS.length][0], '--y': SPOTS[i % SPOTS.length][1] } as React.CSSProperties}>
            <i />{c.label}<b>0%</b><u><s /></u>
          </div>
        ))}
      </div>
      {data.cta?.href && <Cta href={data.cta.href} label={data.cta.label} variant="white" />}
      {next && <Wave color={next} />}
    </section>
  )
}
