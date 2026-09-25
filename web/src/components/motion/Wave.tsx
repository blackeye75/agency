'use client'
import { useRef } from 'react'
import { ScrollTrigger, useGSAP, prefersReduced } from './gsap'
import { wavePath, WAVE_PHASE } from './shapes'

// Wavy bottom edge whose phase follows the scroll (Crency).
export function Wave({ color }: { color: string }) {
  const ref = useRef<SVGSVGElement>(null)
  useGSAP(() => {
    const svg = ref.current
    const path = svg?.querySelector('path')
    if (!svg || !path || prefersReduced()) return
    ScrollTrigger.create({
      trigger: svg, start: 'top bottom', end: 'top top',
      onUpdate: (s) => path.setAttribute('d', wavePath(WAVE_PHASE + Math.PI * s.progress)),
    })
  })
  return (
    <svg ref={ref} className="wave" preserveAspectRatio="none" viewBox="0 0 1000 100" aria-hidden="true">
      <path fill={color} d={wavePath(WAVE_PHASE)} />
    </svg>
  )
}
