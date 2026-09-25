'use client'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/components/motion/gsap'
import { useViewport } from '@/components/motion/useViewport'
import { Lines } from '@/components/motion/Lines'
import { pad } from '@/lib/cms/text'
import type { ProcessData } from '@/lib/cms/types'

// Numbered timeline; the orange line draws with the scroll.
export function Process({ data }: { data: ProcessData }) {
  const ref = useRef<HTMLElement>(null)
  const { mobile, reduce } = useViewport()
  useGSAP(() => {
    if (reduce) return
    const vertical = innerWidth <= 1000
    gsap.fromTo('.process__line i', vertical ? { scaleY: 0 } : { scaleX: 0 }, {
      ...(vertical ? { scaleY: 1 } : { scaleX: 1 }), ease: 'none',
      scrollTrigger: { trigger: '.process__track', start: 'top 75%', end: vertical ? 'bottom 60%' : 'top 25%', scrub: 1 },
    })
    gsap.utils.toArray<HTMLElement>('.step').forEach((step, i) => {
      gsap.from(step.querySelector('.step__dot'), { scale: 0, rotation: -90, duration: 0.7, ease: 'back.out(2)', scrollTrigger: { trigger: step, start: vertical ? 'top 80%' : 'top 85%', toggleActions: 'play none none reverse' }, delay: vertical ? 0 : i * 0.12 })
      gsap.from(step.querySelectorAll('.step__dur, h3, p'), { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: step, start: vertical ? 'top 80%' : 'top 85%', toggleActions: 'play none none reverse' }, delay: vertical ? 0.1 : 0.1 + i * 0.12 })
    })
  }, { scope: ref, dependencies: [JSON.stringify(data.steps), mobile, reduce], revertOnUpdate: true })
  return (
    <section className={`sec sec--lilac process${reduce ? ' is-static' : ''}`} ref={ref}>
      <div className="sec-head">
        <div>
          <p className="label label--ink" style={{ marginBottom: '3vh' }}>{data.label}</p>
          <Lines text={data.title} className="mega" />
        </div>
        <span className="sec-head__num">({pad(data.steps.length)})</span>
      </div>
      <div className="process__track">
      <span className="process__line" aria-hidden="true"><i /></span>
      <ol className="process__steps" style={{ '--n': data.steps.length } as React.CSSProperties}>
        {data.steps.map((s, i) => (
          <li className="step" key={i}>
            <span className="step__dot" aria-hidden="true">{pad(i + 1)}</span>
            {s.duration && <span className="step__dur">{s.duration}</span>}
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
      </div>
    </section>
  )
}
