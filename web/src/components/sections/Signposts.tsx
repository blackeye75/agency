'use client'
import { useRef } from 'react'
import { gsap, useGSAP, prefersReduced } from '@/components/motion/gsap'
import { starPath } from '@/components/motion/shapes'
import { TLink } from '@/components/site/TLink'
import { alt } from '@/lib/cms/text'
import type { SignpostsData } from '@/lib/cms/types'

const STAR = starPath(8, 48, 16)

export function Signposts({ data }: { data: SignpostsData }) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    if (prefersReduced()) return
    const st = () => ({ trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: 1 })
    gsap.fromTo('.sign--cases', { xPercent: 70 }, { xPercent: -8, ease: 'none', scrollTrigger: st() })
    gsap.fromTo('.sign--blogs', { xPercent: -70 }, { xPercent: 8, ease: 'none', scrollTrigger: st() })
  }, { scope: ref })
  return (
    <section className="signs" ref={ref}>
      <div className="signs__plane" />
      <TLink href={data.primary.href} className="sign sign--cases">
        <span className="sign__side" /><span className="sign__face">{alt(data.primary.label)}</span>
        <svg className="sign__star" viewBox="-50 -50 100 100" aria-hidden="true"><path d={STAR} fill="var(--lime)" /></svg>
      </TLink>
      <TLink href={data.secondary.href} className="sign sign--blogs">
        <span className="sign__face">{alt(data.secondary.label)}</span><span className="sign__side" />
      </TLink>
    </section>
  )
}
