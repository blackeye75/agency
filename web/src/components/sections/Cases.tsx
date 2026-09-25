'use client'
import { useRef } from 'react'
import { gsap, useGSAP } from '@/components/motion/gsap'
import { useViewport } from '@/components/motion/useViewport'
import { starPath } from '@/components/motion/shapes'
import { TLink } from '@/components/site/TLink'
import { pad } from '@/lib/cms/text'
import type { Project } from '@/lib/cms/types'

const ICONS = ['ic-cursor', 'ic-heart', 'ic-chart', 'ic-crown', 'ic-bolt']
const BURST = starPath(9, 500, 90)

// Crency's coverflow. Covers are now one plain colour per project; on phones
// the card in focus shows its cover above the details.
export function Cases({ projects, brand }: { projects: Project[]; brand: string }) {
  const ref = useRef<HTMLElement>(null)
  const { mobile, reduce } = useViewport()
  const key = projects.map((p) => p.id + p.name + p.color + p.quote).join('|')

  useGSAP(() => {
    const sec = ref.current!
    const stage = sec.querySelector<HTMLElement>('.cases__stage')!
    const cards = [...stage.querySelectorAll<HTMLElement>('.case')]
    if (!cards.length) return
    let active = Math.min(cards.length - 1, Math.floor(cards.length / 2))
    let spread = reduce || mobile ? 1 : 0.2
    let busy = false
    const cw = () => (mobile ? Math.min(innerWidth * 0.8, 420) : Math.min(Math.max(innerWidth * 0.24, 220), 380))
    const sizes = () => {
      const w = cw()
      stage.style.setProperty('--cw', w + 'px')
      stage.style.setProperty('--ch', (mobile ? w * 0.82 + 260 : w * 1.32) + 'px')
    }
    const layout = (dur = 0.8) => {
      const w = cw()
      cards.forEach((card, i) => {
        const off = i - active, a = Math.abs(off), s = Math.sign(off), on = off === 0
        card.classList.toggle('is-closed', !on)
        card.classList.toggle('is-left', s < 0)
        card.setAttribute('aria-hidden', on ? 'false' : 'true')
        card.querySelectorAll('a').forEach((l) => (l.tabIndex = on ? 0 : -1))
        const detail = card.querySelector<HTMLElement>('.case__detail')!
        if (mobile) {
          const x = on ? 0 : s * (w * 0.9 + (a - 1) * w * 0.08)
          gsap.to(card, { x, z: -a * 60, rotationY: on ? 0 : -s * 28, scale: on ? 1 : 0.9, zIndex: 100 - a, duration: dur, ease: 'power3.out', overwrite: 'auto' })
          const inner = detail.firstElementChild as HTMLElement
          gsap.to(detail, { height: on ? inner.offsetHeight : 0, duration: dur, ease: 'power3.out', overwrite: 'auto' })
          if (on) stage.style.height = card.querySelector<HTMLElement>('.case__cover')!.offsetHeight + inner.offsetHeight + 56 + 'px'
        } else {
          const x = on ? -w / 2 : s * (w * 0.95 + (a - 1) * w * 0.2)
          gsap.to(card, { x: x * spread, z: -a * 70, rotationY: on ? 0 : -s * 34, scale: 1 - a * 0.025, zIndex: 100 - a, duration: dur, ease: 'power3.out', overwrite: 'auto' })
          gsap.to(detail, { width: on ? w : 0, duration: dur, ease: 'power3.out', overwrite: 'auto' })
        }
      })
    }
    const go = (i: number) => {
      active = gsap.utils.clamp(0, cards.length - 1, i)
      busy = true
      layout(0.8)
      gsap.delayedCall(0.8, () => (busy = false))
    }
    sizes()
    layout(0)

    let startX: number | null = null
    const down = (e: PointerEvent) => { if ((e.target as Element).closest('a')) return; startX = e.clientX; stage.setPointerCapture(e.pointerId) }
    const move = (e: PointerEvent) => { if (startX === null) return; const dx = e.clientX - startX; if (Math.abs(dx) > (mobile ? 40 : 70)) { go(active - Math.sign(dx)); startX = e.clientX } }
    const up = () => (startX = null)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'ArrowRight') go(active + 1); if (e.key === 'ArrowLeft') go(active - 1) }
    const click = (e: MouseEvent) => { const c = (e.target as Element).closest<HTMLElement>('.case.is-closed'); if (c) { e.preventDefault(); go(Number(c.dataset.i)) } }
    const prev = sec.querySelector('[data-case-prev]')!, next = sec.querySelector('[data-case-next]')!
    const onPrev = () => go(active - 1), onNext = () => go(active + 1)
    const resize = () => { sizes(); layout(0) }
    stage.addEventListener('pointerdown', down); stage.addEventListener('pointermove', move)
    stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up)
    stage.addEventListener('keydown', onKey); stage.addEventListener('click', click, true)
    prev.addEventListener('click', onPrev); next.addEventListener('click', onNext)
    window.addEventListener('resize', resize)

    if (!reduce && !mobile) {
      const proxy = { s: 0.2 }
      gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 15%', scrub: 1 } })
        .fromTo(stage, { yPercent: 35 }, { yPercent: 0, ease: 'none' }, 0)
        .fromTo(proxy, { s: 0.2 }, { s: 1, ease: 'power1.out', onUpdate: () => { spread = proxy.s; if (!busy) layout(0) } }, 0)
    }
    if (!reduce) {
      gsap.fromTo('.cases__burst', { rotation: -25, scale: 0.35 }, { rotation: 30, scale: 1.05, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: 1 } })
    }
    return () => {
      stage.removeEventListener('pointerdown', down); stage.removeEventListener('pointermove', move)
      stage.removeEventListener('pointerup', up); stage.removeEventListener('pointercancel', up)
      stage.removeEventListener('keydown', onKey); stage.removeEventListener('click', click, true)
      prev.removeEventListener('click', onPrev); next.removeEventListener('click', onNext)
      window.removeEventListener('resize', resize)
    }
  }, { scope: ref, dependencies: [key, mobile, reduce], revertOnUpdate: true })

  return (
    <section className="cases" ref={ref} id="cases">
      <svg className="cases__burst" viewBox="-500 -500 1000 1000" aria-hidden="true"><path d={BURST} fill="var(--blue)" /></svg>
      <div className="cases__stage" data-cursor="drag" tabIndex={0} aria-roledescription="carousel" aria-label="Case studies. Drag or use the arrow keys.">
        {projects.map((p, i) => (
          <div className={`case tone-${p.color}`} data-i={i} key={p.id}>
            <div className="case__cover">
              <div className="case__logo">{brand}✱</div>
              <div className="case__tags">
                {(p.tags.length ? p.tags.map((t) => t.text) : ['PRODUCT', 'DESIGN']).slice(0, 4).map((t, k, arr) => (
                  <span key={k}>{t}{k < arr.length - 1 && (k % 2 ? <br /> : <em> • </em>)}</span>
                ))}
              </div>
              <div className="case__screen">{p.cover_url ? <img src={p.cover_url} alt="" draggable={false} /> : p.name}</div>
              <div className="case__icons" aria-hidden="true">{ICONS.map((id) => <svg key={id}><use href={`#${id}`} /></svg>)}</div>
              <div className="case__spine" aria-hidden="true">{p.name}</div>
            </div>
            <div className="case__detail">
              <div className="case__detail-in">
                <span className="case__count">{pad(i + 1)} / {pad(projects.length)}</span>
                {p.quote && <p className="case__quote">“{p.quote}”</p>}
                <TLink href={`/projects/${p.slug}`} className="case__view">VIEW CASE</TLink>
                <div className="case__client">{p.rating != null && <span className="case__rating">{Number(p.rating).toFixed(1)}</span>}{p.client.toUpperCase()}</div>
                {p.tags[0] && <span className="case__service">{p.tags[0].text}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="cases__nav">
        <button data-case-prev data-cursor="click" aria-label="Previous case">←</button>
        <button data-case-next data-cursor="click" aria-label="Next case">→</button>
      </div>
    </section>
  )
}
