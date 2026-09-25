'use client'
import { useRef } from 'react'
import { gsap, useGSAP, prefersReduced } from '@/components/motion/gsap'
import { coilPath, scallop } from '@/components/motion/shapes'
import { Use } from '@/components/site/Sprites'
import type { ConnectionData } from '@/lib/cms/types'

const COIL = coilPath()
const SCALLOP = scallop(9, 96, 8)

// Copula: the coil draws itself inside CONNECTION, the rating pops, logos loop.
export function Connection({ data }: { data: ConnectionData }) {
  const ref = useRef<HTMLElement>(null)
  const o = data.word.toUpperCase().indexOf('O')
  const [before, after] = o >= 0 ? [data.word.slice(0, o), data.word.slice(o + 1)] : [data.word, '']
  useGSAP(() => {
    if (prefersReduced()) return
    const st = (start: string) => ({ trigger: '.conn', start, toggleActions: 'play none none reverse' })
    gsap.fromTo('.coil path', { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.8, ease: 'power2.inOut', scrollTrigger: st('top 70%') })
    gsap.from('.rating', { scale: 0, rotation: -40, duration: 0.9, ease: 'back.out(1.8)', scrollTrigger: st('top 55%') })
    gsap.from('.conn > span[aria-hidden]', { yPercent: 40, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, scrollTrigger: st('top 80%') })
    gsap.to('.logos__track', { xPercent: -50, duration: 28, ease: 'none', repeat: -1 })
  }, { scope: ref, dependencies: [JSON.stringify(data)], revertOnUpdate: true })

  const logo = (l: ConnectionData['logos'][number], i: number, hidden?: boolean) => (
    <span key={`${hidden ? 'b' : 'a'}${i}`} className={`lg lg--${(i % 8) + 1}`} aria-hidden={hidden || undefined}>
      {l.logo ? <img src={l.logo} alt={hidden ? '' : l.name} /> : l.name}
    </span>
  )
  return (
    <section className="clients" ref={ref}>
      <p className="label label--ink"><Use id="flower8" />{data.label}</p>
      <h2 className="conn">
        <span className="sr">{data.line1} {data.word} {data.line3}</span>
        <span aria-hidden="true">{data.line1}</span>
        <span aria-hidden="true">{before}{o >= 0 && <svg className="coil" viewBox="0 0 400 100" preserveAspectRatio="none"><path d={COIL} /></svg>}{after}</span>
        <span aria-hidden="true">{data.line3}</span>
        {data.rating && (
          <span className="rating" aria-hidden="true">
            <svg viewBox="-100 -100 200 200">
              <path d={SCALLOP} fill="var(--blue)" />
              <defs><path id="rating-ring" d="M0,-66 a66,66 0 1,1 -0.01,0" /></defs>
              <g className="rating__ring"><text><textPath href="#rating-ring">{`${data.ratingText} ${data.ratingText}`}</textPath></text></g>
              <text className="rating__num" y="20" textAnchor="middle">{data.rating}</text>
            </svg>
          </span>
        )}
      </h2>
      <div className="logos" aria-label="Clients">
        <div className="logos__track">
          {data.logos.map((l, i) => logo(l, i))}
          {data.logos.map((l, i) => logo(l, i, true))}
        </div>
      </div>
    </section>
  )
}
