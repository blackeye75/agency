'use client'
import { useGSAP, gsap, ScrollTrigger, prefersReduced } from './gsap'

// Rendered last on every page: fades up [data-reveal] blocks and re-measures
// every ScrollTrigger once the page's sections have set up their own motion.
export function PageMotion({ version }: { version?: string }) {
  useGSAP(() => {
    const main = document.getElementById('main')
    if (!main) return
    if (!prefersReduced()) {
      gsap.utils.toArray<HTMLElement>('[data-reveal]', main).forEach((el) => {
        gsap.from(el, {
          y: 60, opacity: 0, duration: 1, ease: 'power3.out',
          delay: Number(el.dataset.reveal) || 0,
          scrollTrigger: { trigger: el, start: 'top 97%', toggleActions: 'play none none reverse' },
        })
      })
      gsap.utils.toArray<HTMLElement>('[data-spin]', main).forEach((el) => {
        gsap.to(el, { rotation: 240, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1 } })
      })
    }
    ScrollTrigger.sort()
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(id)
  }, { dependencies: [version], revertOnUpdate: true })
  return null
}
