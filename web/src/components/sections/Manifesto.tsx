'use client'
import { useId, useRef } from 'react'
import { gsap, useGSAP } from '@/components/motion/gsap'
import { useViewport } from '@/components/motion/useViewport'
import { Use } from '@/components/site/Sprites'
import type { ManifestoData } from '@/lib/cms/types'

// Copula: the line travels along a curve while the section is pinned.
export function Manifesto({ data }: { data: ManifestoData }) {
  const ref = useRef<HTMLElement>(null)
  const id = useId().replace(/:/g, '')
  const { mobile, reduce } = useViewport()
  useGSAP(() => {
    const sec = ref.current!
    const svg = sec.querySelector('svg.manifesto__curve')!
    const path = sec.querySelector<SVGPathElement>('[data-wave-path]')!
    const tp = sec.querySelector<SVGTextPathElement>('textPath')!
    const para = sec.querySelector('.manifesto__para')
    let textLen = 0, pathLen = 0
    const build = () => {
      const W = sec.clientWidth, H = sec.clientHeight, y0 = H * 0.42, a = H * (mobile ? 0.08 : 0.16)
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
      path.setAttribute('d', `M${-0.3 * W},${y0 + a} C${0.15 * W},${y0 - a} ${0.35 * W},${y0 - a * 0.9} ${0.52 * W},${y0 + a * 0.2} S${0.95 * W},${y0 + a * 1.4} ${1.3 * W},${y0 - a * 0.6}`)
      textLen = tp.getComputedTextLength(); pathLen = path.getTotalLength()
    }
    build()
    if (reduce) {
      tp.setAttribute('startOffset', String((pathLen - textLen) / 2))
      gsap.set(para, { opacity: 1, y: innerHeight * 0.2 })
      return
    }
    const o = { v: 0 }
    const set = () => tp.setAttribute('startOffset', (-textLen + o.v * (pathLen + textLen)).toFixed(1))
    gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=240%', pin: true, scrub: 1, invalidateOnRefresh: true, onRefresh: () => { build(); set() } } })
      .fromTo(o, { v: 0 }, { v: 1, ease: 'none', duration: 3, onUpdate: set })
      .fromTo(para, { opacity: 0 }, { opacity: 0.12, ease: 'none', duration: 0.3 }, '-=0.1')
      .to(para, { opacity: 1, ease: 'none', duration: 1 })
      .to({}, { duration: 0.4 })
  }, { scope: ref, dependencies: [data.curveText, data.paragraph, mobile, reduce], revertOnUpdate: true })

  return (
    <section className="manifesto" ref={ref}>
      <p className="label"><Use id="flower8" />{data.label}</p>
      <svg className="manifesto__curve" aria-hidden="true">
        <path id={`curve-${id}`} data-wave-path fill="none" />
        <text><textPath href={`#curve-${id}`}>{data.curveText}</textPath></text>
      </svg>
      <p className="sr">{data.curveText}</p>
      <p className="manifesto__para">{data.paragraph}</p>
    </section>
  )
}
