'use client'
import { gsap, useGSAP, prefersReduced } from '@/components/motion/gsap'

export function FooterMotion() {
  useGSAP(() => {
    if (prefersReduced()) return
    const st = { trigger: '.footer', start: 'top 70%', toggleActions: 'play none none reverse', refreshPriority: -1 }
    gsap.from('.footer__nav span', { yPercent: 110, duration: 0.8, ease: 'power3.out', stagger: 0.08, scrollTrigger: st })
    gsap.from('.footer__mark', { yPercent: 40, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: st })
  })
  return null
}
