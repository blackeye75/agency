'use client'
import { useEffect, useState } from 'react'
import { isMobile, prefersReduced } from './gsap'

// Breakpoint and motion preference for animation setup. Animations rebuild when
// either changes, the same way the preview reloaded when crossing 768px.
export function useViewport() {
  const [state, setState] = useState(() => ({ mobile: isMobile(), reduce: prefersReduced() }))
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () =>
      setState((s) => (s.mobile === isMobile() && s.reduce === mq.matches ? s : { mobile: isMobile(), reduce: mq.matches }))
    update()
    window.addEventListener('resize', update)
    mq.addEventListener('change', update)
    return () => {
      window.removeEventListener('resize', update)
      mq.removeEventListener('change', update)
    }
  }, [])
  return state
}
