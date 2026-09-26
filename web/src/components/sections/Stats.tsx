'use client'
import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from '@/components/motion/gsap'
import { Use } from '@/components/site/Sprites'
import type { StatsData } from '@/lib/cms/types'

// Big counter: counts 0 → value like the loader while a thin orange line
// fills, then the facts rise in. Replays every time it scrolls into view.
export function Stats({ data }: { data: StatsData }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    const sec = ref.current!
    const num = sec.querySelector('[data-count]')!
    const bar = sec.querySelector('.stats__bar i')
    const after = sec.querySelectorAll('.stats__caption, .stats__item')
    const n = { v: 0 }
    const show = () => { num.textContent = String(Math.round(n.v)) }
    if (prefersReduced()) {
      n.v = data.value; show()
      gsap.set(bar, { scaleX: 1 })
      return
    }
    const tl = gsap.timeline({ paused: true })
      .fromTo(n, { v: 0 }, { v: data.value, duration: 2, ease: 'power2.inOut', onUpdate: show }, 0)
      .fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: 2, ease: 'power2.inOut' }, 0)
      .fromTo(after, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, 1.2)
    tl.progress(0)
    show()
    ScrollTrigger.create({
      trigger: sec, start: 'top 70%', end: 'bottom 30%',
      onEnter: () => tl.restart(),
      onEnterBack: () => tl.restart(),
      onLeave: () => tl.pause(0),
      onLeaveBack: () => tl.pause(0),
    })
  }, { scope: ref, dependencies: [data.value, data.items.length], revertOnUpdate: true })

  return (
    <section className="stats" ref={ref} aria-label={`${data.value}${data.suffix} ${data.caption}`}>
      {data.label && <p className="label label--orange stats__label"><Use id="flower8" />{data.label}</p>}
      <p className="stats__num" aria-hidden="true"><span data-count>{data.value}</span><i>{data.suffix}</i></p>
      <div className="stats__bar" aria-hidden="true"><i /></div>
      {data.caption && <p className="stats__caption">{data.caption}</p>}
      {data.items.length > 0 && (
        <ul className="stats__items">
          {data.items.map((it, i) => <li className="stats__item" key={i}><b>{it.value}</b><span>{it.label}</span></li>)}
        </ul>
      )}
    </section>
  )
}
