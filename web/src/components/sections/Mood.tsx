'use client'
import { useId, useRef, useState } from 'react'
import { gsap, useGSAP, prefersReduced } from '@/components/motion/gsap'
import { starPath } from '@/components/motion/shapes'
import { Lines } from '@/components/motion/Lines'
import { Cta } from '@/components/site/Cta'
import type { MoodData } from '@/lib/cms/types'

const STAR = starPath(14, 58, 44)
const TONES = ['red', 'lime', 'orange'] as const
const FILL = { red: 'var(--red)', lime: 'var(--lime)', orange: 'var(--orange)' }
const RING_LEN = (2 * Math.PI * 74 - 6).toFixed(1)

function Face({ i }: { i: number }) {
  if (i % 3 === 0) return (
    <>
      <path d="M-24 -18 l16 8 M24 -18 l-16 8" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="-14" cy="-2" r="6" fill="var(--red)" /><circle cx="14" cy="-2" r="6" fill="var(--red)" />
      <path d="M-16 24 q16 -12 32 0" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
    </>
  )
  if (i % 3 === 1) return (
    <>
      <ellipse cx="-13" cy="-4" rx="9" ry="14" fill="#fff" stroke="var(--ink)" strokeWidth="4" /><ellipse cx="13" cy="-4" rx="9" ry="14" fill="#fff" stroke="var(--ink)" strokeWidth="4" />
      <circle cx="-11" cy="0" r="5" fill="var(--ink)" /><circle cx="15" cy="0" r="5" fill="var(--ink)" />
      <ellipse cx="0" cy="26" rx="7" ry="5" fill="var(--ink)" />
    </>
  )
  return (
    <>
      <ellipse cx="-13" cy="-6" rx="9" ry="12" fill="#fff" stroke="var(--ink)" strokeWidth="4" /><ellipse cx="13" cy="-6" rx="9" ry="12" fill="#fff" stroke="var(--ink)" strokeWidth="4" />
      <circle cx="-12" cy="-4" r="5" fill="var(--ink)" /><circle cx="14" cy="-4" r="5" fill="var(--ink)" />
      <path d="M-18 16 q18 20 36 0" fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
    </>
  )
}

// Crency's stickers: the chosen mood changes the button below.
export function Mood({ data }: { data: MoodData }) {
  const ref = useRef<HTMLElement>(null)
  const uid = useId().replace(/:/g, '')
  const [picked, setPicked] = useState(Math.min(1, data.options.length - 1))
  const option = data.options[picked] ?? data.options[0]
  useGSAP(() => {
    if (prefersReduced()) return
    gsap.from('.sticker', { y: 80, opacity: 0, rotation: () => gsap.utils.random(-20, 20), duration: 0.8, ease: 'back.out(1.6)', stagger: 0.12, scrollTrigger: { trigger: '.mood__options', start: 'top 85%', toggleActions: 'play none none reverse' } })
  }, { scope: ref, dependencies: [data.options.length], revertOnUpdate: true })

  const choose = (i: number, svg: SVGSVGElement | null) => {
    setPicked(i)
    if (svg && !prefersReduced()) gsap.fromTo(svg, { rotation: -12, scale: 0.9 }, { rotation: 0, scale: 1.06, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  }
  return (
    <section className="mood" ref={ref} id="mood">
      <Lines text={data.title} className="mega mega--ink" />
      <p className="mood__sub">{data.sub}</p>
      <fieldset className="mood__options">
        <legend className="sr">What brings you here?</legend>
        {data.options.map((o, i) => {
          const tone = TONES[i % 3]
          return (
            <label key={i} className={`sticker sticker--${tone}`} data-cursor="click">
              <input type="radio" name={`mood-${uid}`} checked={picked === i} onChange={(e) => choose(i, e.currentTarget.parentElement!.querySelector('svg'))} />
              <svg viewBox="-100 -100 200 200" aria-hidden="true">
                <defs><path id={`ring-${uid}-${i}`} d="M0,-74 a74,74 0 1,1 -0.01,0" /></defs>
                <circle r="96" fill={FILL[tone]} stroke="var(--ink)" strokeWidth="4" />
                <g className="ring"><text textLength={RING_LEN} lengthAdjust="spacingAndGlyphs"><textPath href={`#ring-${uid}-${i}`}>{o.ring}</textPath></text></g>
                <path d={STAR} fill="#fff" stroke="var(--ink)" strokeWidth="3" />
                <Face i={i} />
              </svg>
              <span className="box" aria-hidden="true" /><span className="sr">{o.label}</span>
            </label>
          )
        })}
      </fieldset>
      {option && <Cta href={option.href || '/quote'} label={option.cta} variant="ink" />}
    </section>
  )
}
