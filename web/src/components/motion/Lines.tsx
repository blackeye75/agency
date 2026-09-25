'use client'
import { useRef, type ElementType, type ReactNode } from 'react'
import { gsap, SplitText, useGSAP, prefersReduced } from './gsap'
import { lines as renderLines } from '@/lib/cms/text'

// Heading that rises line by line when it scrolls into view (Crency).
// Keyed by its text so a CMS update swaps in a fresh element for SplitText.
export function Lines({ as: Tag = 'h2', text, className, children, start = 'top 85%' }: {
  as?: ElementType; text: string; className?: string; children?: ReactNode; start?: string
}) {
  const ref = useRef<HTMLElement>(null)
  useGSAP(() => {
    const el = ref.current
    if (!el) return
    SplitText.create(el, {
      type: 'lines', mask: 'lines', autoSplit: true,
      onSplit(self) {
        if (prefersReduced()) return
        return gsap.from(self.lines, {
          yPercent: 115, duration: 1, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: el, start, toggleActions: 'play none none reverse' },
        })
      },
    })
  }, { dependencies: [text], revertOnUpdate: true })
  return <Tag key={text} ref={ref} className={className}>{children ?? renderLines(text)}</Tag>
}
