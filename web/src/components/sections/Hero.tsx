'use client'
import { useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP } from '@/components/motion/gsap'
import { whenIntroDone, whenRevealed } from '@/components/motion/scroll'
import { useViewport } from '@/components/motion/useViewport'
import { Wave } from '@/components/motion/Wave'
import { ScBadge } from '@/components/site/ScBadge'
import { Use } from '@/components/site/Sprites'
import { alt, lines, plain } from '@/lib/cms/text'
import type { HeroData } from '@/lib/cms/types'

// Crency's hero with Copula's rotating word. The pen line and the floating
// stickers are gone; the rotor now cycles DIGITAL 360 / SOFTWARE / PRODUCT / ALL-IN-ONE.
export function Hero({ data, next }: { data: HeroData; next?: string }) {
  const ref = useRef<HTMLElement>(null)
  const rotor = useRef<HTMLSpanElement>(null)
  const { reduce } = useViewport()
  const words = data.words.map((w) => w.text).filter(Boolean)
  const key = JSON.stringify(data)

  useGSAP(() => {
    const root = ref.current, el = rotor.current
    if (!root || !el) return
    let alive = true
    let current: gsap.core.Timeline | undefined
    const show = (i: number) => {
      if (!alive || !words.length) return
      el.replaceChildren(...[...words[i]].map((c) => Object.assign(document.createElement('span'), { className: 'ch', textContent: c })))
      const chars = el.querySelectorAll('.ch')
      current = gsap.timeline({ onComplete: () => show((i + 1) % words.length) })
        .fromTo(chars, { opacity: 0, yPercent: 40, rotation: () => gsap.utils.random(-12, 12) }, { opacity: 1, yPercent: 0, rotation: 0, duration: 0.5, ease: 'back.out(1.6)', stagger: 0.06 })
        .to(chars, { opacity: 0, yPercent: -30, duration: 0.35, ease: 'power2.in', stagger: 0.045 }, '+=2.2')
    }
    if (reduce) {
      el.textContent = words[0] ?? ''
      return
    }
    const chars = [...root.querySelectorAll<HTMLElement>('[data-split]')].flatMap((s) => SplitText.create(s, { type: 'chars' }).chars)
    const tl = gsap.timeline({ paused: true })
      .from(chars, { yPercent: 120, opacity: 0, rotation: () => gsap.utils.random(-14, 14), duration: 0.9, ease: 'power3.out', stagger: 0.035 }, 0)
      .from('.ast', { scale: 0, rotation: -180, duration: 1, ease: 'back.out(1.8)' }, 0.5)
      .from('.scbadge', { scale: 0, rotation: 90, duration: 0.9, ease: 'back.out(2)' }, 0.7)
      .from('.hero__tag', { opacity: 0, y: 20, duration: 0.6 }, 0.6)
      .add(() => show(0), 0.4)
    whenIntroDone(() => whenRevealed(() => tl.play()))
    ScrollTrigger.create({
      trigger: root, start: 'top top', end: 'bottom top',
      onEnterBack: () => gsap.fromTo(chars, { yPercent: 120, rotation: () => gsap.utils.random(-14, 14) }, { yPercent: 0, rotation: 0, duration: 0.7, ease: 'power3.out', stagger: 0.02, overwrite: true }),
    })
    return () => { alive = false; current?.kill() }
  }, { scope: ref, dependencies: [key, reduce], revertOnUpdate: true })

  return (
    <section className="hero" ref={ref}>
      <p className="hero__tag" data-intro>{lines(data.tag)}</p>
      <h1 className="hero__title" key={key}>
        <span className="sr">{plain(data.line1)} {words.join(', ')} {plain(data.line3)}</span>
        <span className="hl hl--1" aria-hidden="true" data-split data-intro>{alt(data.line1)}</span>
        <span className="hl hl--rotor" aria-hidden="true" ref={rotor} data-intro>{' '}</span>
        <span className="hl hl--3" aria-hidden="true">
          <span data-split data-intro>{alt(data.line3)}</span>
          <Use id="asterisk" className="ast" />
          {data.badge?.href && <ScBadge href={data.badge.href} label={data.badge.label} />}
        </span>
      </h1>
      {next && <Wave color={next} />}
    </section>
  )
}
