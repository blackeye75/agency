'use client'
import { useRef } from 'react'
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReduced } from '@/components/motion/gsap'
import { Wave } from '@/components/motion/Wave'
import { TLink } from '@/components/site/TLink'
import { Use } from '@/components/site/Sprites'
import type { AboutData } from '@/lib/cms/types'

const FACES = [
  { bg: '#f4d1c1', skin: '#e8b89a', hair: '#2b1a12', top: '#120030' },
  { bg: '#cfcfcf', skin: '#bdbdbd', hair: '#1c1c1c', top: '#2e2e2e' },
  { bg: '#cebcf2', skin: '#f1c7a6', hair: '#6b3b1f', top: '#0500d4' },
  { bg: '#d4ff3a', skin: '#d99c74', hair: '#1a1a1a', top: '#120030' },
  { bg: '#ffd8a8', skin: '#e0ac86', hair: '#402010', top: '#eb4304' },
  { bg: '#e0e0e0', skin: '#b5b5b5', hair: '#5a5a5a', top: '#222' },
]

// Copula: words fill in with the scroll while team photos flick through.
export function About({ data, next }: { data: AboutData; next?: string }) {
  const ref = useRef<HTMLElement>(null)
  const photos = data.photos.filter((p) => p.src)
  useGSAP(() => {
    const sec = ref.current!
    const faces = [...sec.querySelectorAll('.faces > *')]
    let k = 0, timer: ReturnType<typeof setInterval> | undefined
    const tick = () => { faces[k]?.classList.remove('is-on'); k = (k + 1) % faces.length; faces[k]?.classList.add('is-on') }
    const reduce = prefersReduced()
    if (!reduce && faces.length > 1) ScrollTrigger.create({ trigger: sec, start: 'top bottom', end: 'bottom top', onToggle: (s) => { clearInterval(timer); if (s.isActive) timer = setInterval(tick, 800) } })
    const para = sec.querySelector<HTMLElement>('.about__para')!
    SplitText.create(para, {
      type: 'words', wordsClass: 'w', autoSplit: true,
      onSplit(self) {
        if (reduce) return
        return gsap.to(self.words, { opacity: 1, ease: 'none', stagger: 0.1, scrollTrigger: { trigger: para, start: 'top 75%', end: 'bottom 45%', scrub: 1 } })
      },
    })
    return () => clearInterval(timer)
  }, { scope: ref, dependencies: [data.paragraph, photos.length], revertOnUpdate: true })

  return (
    <section className="about" ref={ref}>
      <p className="label"><Use id="flower8" />{data.label}</p>
      <p className="about__para" key={data.paragraph}>{data.paragraph}</p>
      {data.link?.href && <TLink href={data.link.href} className="ulink">{data.link.label}</TLink>}
      <div className="faces" aria-hidden="true">
        {photos.length
          ? photos.map((p, i) => <img key={p.src + i} src={p.src} alt="" className={i ? '' : 'is-on'} />)
          : FACES.map((f, i) => (
              <svg key={i} viewBox="0 0 100 100" className={i ? '' : 'is-on'}>
                <rect width="100" height="100" fill={f.bg} />
                <path d="M18 100 C20 74 34 66 50 66 C66 66 80 74 82 100 Z" fill={f.top} />
                <rect x="44" y="54" width="12" height="14" rx="4" fill={f.skin} />
                <ellipse cx="50" cy="42" rx="15" ry="18" fill={f.skin} />
                <path d="M34 44 C30 22 44 16 52 18 C66 20 70 30 66 46 C64 34 58 28 50 28 C42 28 36 34 34 44 Z" fill={f.hair} />
                {i % 2 ? <><rect x="38" y="38" width="10" height="7" rx="3" fill="none" stroke={f.hair} strokeWidth="1.5" /><rect x="52" y="38" width="10" height="7" rx="3" fill="none" stroke={f.hair} strokeWidth="1.5" /></> : null}
                <path d="M44 51 Q50 55 56 51" fill="none" stroke="#7a3b2a" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            ))}
      </div>
      {next && <Wave color={next} />}
    </section>
  )
}
