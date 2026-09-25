'use client'
import { Fragment, useRef } from 'react'
import { gsap, useGSAP } from '@/components/motion/gsap'
import { useViewport } from '@/components/motion/useViewport'
import { alt } from '@/lib/cms/text'
import type { StoryData } from '@/lib/cms/types'

const ICONS = ['cursor', 'heart', 'chart', 'crown', 'bolt']
const SCATTER: Record<string, [number, number, number]> = {
  cursor: [0.28, 0.3, -14], heart: [0.6, 0.22, 10], chart: [0.44, 0.58, -6], crown: [0.7, 0.6, 16], bolt: [0.22, 0.62, -10],
}

// Split each statement line into text and [icon] slots.
function parse(lines: StoryData['lines']) {
  const slots: { id: string; line: number; key: string }[] = []
  const parts = lines.map((l, li) =>
    l.text.split(/(\[\w+\])/g).filter(Boolean).map((p) => {
      const m = /^\[(\w+)\]$/.exec(p)
      if (m && ICONS.includes(m[1])) {
        const key = `${m[1]}-${slots.length}`
        slots.push({ id: m[1], line: li, key })
        return { slot: key, id: m[1] }
      }
      return { text: p }
    }),
  )
  return { parts, slots }
}

// Crency: icons leave a row, scatter, then land inside the statement.
export function Story({ data }: { data: StoryData }) {
  const ref = useRef<HTMLElement>(null)
  const { mobile, reduce } = useViewport()
  const { parts, slots } = parse(data.lines)
  const key = JSON.stringify(data)

  useGSAP(() => {
    if (reduce || mobile) return
    const sec = ref.current!
    const copy = sec.querySelector('.story__copy')
    const rowSlots = [...sec.querySelectorAll('[data-row-slot]')]
    const lineEls = [...sec.querySelectorAll<HTMLElement>('.sl__in')]
    const BASE = 200
    const rel = (el: Element) => {
      const r = el.getBoundingClientRect(), s = sec.getBoundingClientRect()
      return { x: r.left - s.left, y: r.top - s.top, w: r.width }
    }
    const flyer = (k: string) => sec.querySelector(`.flyer[data-icon="${k}"]`)
    const slot = (s: (typeof slots)[number]) => {
      const el = sec.querySelector(`[data-slot="${s.key}"]`)!, line = lineEls[s.line], r = rel(el)
      const off = ((gsap.getProperty(line, 'yPercent') as number) / 100) * line.offsetHeight + (gsap.getProperty(line, 'y') as number)
      return { x: r.x, y: r.y - off, w: r.w }
    }
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' }, scrollTrigger: { trigger: sec, start: 'top top', end: '+=260%', pin: true, scrub: 1, invalidateOnRefresh: true } })
    tl.to(copy, { y: -140, opacity: 0, duration: 1.4, ease: 'power2.in' }, 0)
    slots.forEach((s, i) => {
      const [sx, sy, sr] = SCATTER[s.id] ?? [0.2 + ((i * 0.17) % 0.6), 0.25 + ((i * 0.23) % 0.4), i % 2 ? 8 : -8]
      tl.fromTo(flyer(s.key),
        { x: () => rel(rowSlots[i]).x, y: () => rel(rowSlots[i]).y, scale: () => rel(rowSlots[i]).w / BASE, rotation: 0 },
        { x: () => sx * sec.clientWidth, y: () => sy * sec.clientHeight, scale: () => (rel(rowSlots[i]).w * 0.45) / BASE, rotation: sr, duration: 2.2 }, 0.9 + i * 0.28)
    })
    lineEls.forEach((line, li) => {
      const t = 4.6 + li * 1.25
      tl.fromTo(line, { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: 'power3.out' }, t)
      slots.filter((s) => s.line === li).forEach((s, k) =>
        tl.to(flyer(s.key), { x: () => slot(s).x, y: () => slot(s).y, scale: () => slot(s).w / BASE, rotation: 0, duration: 1.3 }, t - 0.25 + k * 0.15))
    })
    tl.to({}, { duration: 0.8 })
  }, { scope: ref, dependencies: [key, mobile, reduce], revertOnUpdate: true })

  return (
    <section className="story" ref={ref} id="about">
      <div className="story__copy">
        <h2 className="story__title">{data.title}</h2>
        <p className="story__text">{data.text}</p>
      </div>
      <div className="story__row" aria-hidden="true">{slots.map((s) => <span key={s.key} data-row-slot />)}</div>
      <p className="statement">
        {parts.map((line, li) => (
          <span className="sl" key={li}>
            <span className="sl__in">
              {line.map((p, pi) => (
                <Fragment key={pi}>
                  {'slot' in p
                    ? <span className="slot" data-slot={p.slot}><svg aria-hidden="true"><use href={`#ic-${p.id}`} /></svg></span>
                    : alt(p.text ?? '')}
                </Fragment>
              ))}
            </span>
          </span>
        ))}
      </p>
      <div className="icon-layer" aria-hidden="true">
        {slots.map((s) => <svg key={s.key} className="flyer" data-icon={s.key}><use href={`#ic-${s.id}`} /></svg>)}
      </div>
    </section>
  )
}
