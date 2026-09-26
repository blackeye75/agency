'use client'
import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP, prefersReduced } from '@/components/motion/gsap'
import type { StatsData } from '@/lib/cms/types'

// The loader's big counter as a section: counts 0 → value while the orange,
// blue and lime columns rise behind it, then the caption and facts land.
export function Stats({ data }: { data: StatsData }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    const sec = ref.current!
    const num = sec.querySelector('[data-count]')!
    const cols = sec.querySelectorAll('.stats__col')
    const after = sec.querySelectorAll('.stats__caption, .stats__item')
    const n = { v: 0 }
    const show = () => { num.textContent = String(Math.round(n.v)) }
    if (prefersReduced()) {
      n.v = data.value; show()
      return
    }
    show()
    gsap.set(cols, { scaleY: 0 })
    gsap.set(after, { opacity: 0, y: 30 })
    const tl = gsap.timeline({ paused: true })
      .to(n, { v: data.value, duration: 2, ease: 'power2.inOut', onUpdate: show }, 0)
      .to(cols, { scaleY: 1, duration: 0.9, ease: 'power3.inOut', stagger: 0.12 }, 1.1)
      .to(after, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, 1.7)
    ScrollTrigger.create({ trigger: sec, start: 'top 65%', once: true, onEnter: () => tl.play() })
  }, { scope: ref, dependencies: [data.value, data.items.length], revertOnUpdate: true })

  return (
    <section className="stats" ref={ref} aria-label={`${data.value}${data.suffix} ${data.caption}`}>
      <div className="stats__cols" aria-hidden="true"><i className="stats__col lb--orange" /><i className="stats__col lb--blue" /><i className="stats__col lb--lime" /></div>
      {data.label && <p className="stats__label">{data.label}</p>}
      <p className="stats__num" aria-hidden="true"><span data-count>{data.value}</span><i>{data.suffix}</i></p>
      {data.caption && <p className="stats__caption">{data.caption}</p>}
      {data.items.length > 0 && (
        <ul className="stats__items">
          {data.items.map((it, i) => <li className="stats__item" key={i}><b>{it.value}</b><span>{it.label}</span></li>)}
        </ul>
      )}
    </section>
  )
}
