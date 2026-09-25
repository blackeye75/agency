'use client'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/components/motion/gsap'
import { useViewport } from '@/components/motion/useViewport'
import { TLink } from '@/components/site/TLink'
import { lines } from '@/lib/cms/text'
import type { ServiceCardsData } from '@/lib/cms/types'

// Crency: the middle card rises and flips, the side cards follow.
export function ServiceCards({ data }: { data: ServiceCardsData }) {
  const ref = useRef<HTMLElement>(null)
  const { mobile, reduce } = useViewport()
  const cards = data.cards
  useGSAP(() => {
    if (reduce || mobile || cards.length !== 3) return
    const sec = ref.current!
    const [left, mid, right] = [...sec.querySelectorAll('.scard')]
    gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top top', end: '+=170%', pin: true, scrub: 1 } })
      .fromTo(mid, { yPercent: 95, rotationX: 42, rotationY: -26, rotationZ: -7 }, { yPercent: 0, rotationX: 12, rotationY: -12, rotationZ: -2, duration: 1.4, ease: 'power2.out' })
      .to(mid, { rotationY: 90, rotationX: 0, rotationZ: 0, duration: 0.9, ease: 'power2.in' })
      .fromTo([left, right], { yPercent: 130, rotationX: 35 }, { yPercent: 0, rotationX: 0, duration: 1.3, ease: 'power3.out', stagger: 0.12 }, '<0.35')
      .fromTo(mid, { rotationY: -90 }, { rotationY: 0, duration: 0.9, ease: 'power2.out', immediateRender: false }, '>-0.7')
      .to({}, { duration: 0.5 })
  }, { scope: ref, dependencies: [JSON.stringify(cards), mobile, reduce], revertOnUpdate: true })

  return (
    <section className="services" ref={ref} id="services">
      <div className="services__stage" style={{ '--cols': Math.max(cards.length, 1) } as React.CSSProperties}>
        {cards.map((c, i) => (
          <article key={i} className={`scard tone-${c.tone}`}>
            <h3>{lines(c.title)}</h3>
            <p>{c.text}</p>
            <svg className="scard__flower" aria-hidden="true"><use href="#flower12" /></svg>
            {c.button?.href && <TLink href={c.button.href} className="scard__btn">{c.button.label}</TLink>}
          </article>
        ))}
      </div>
    </section>
  )
}
