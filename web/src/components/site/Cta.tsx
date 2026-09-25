'use client'
import { useRef } from 'react'
import { gsap } from '@/components/motion/gsap'
import { TLink } from './TLink'
import { Arrow } from './Sprites'

// Pill + round arrow that swap sides on hover (Crency).
export function Cta({ href, label, variant = 'white', className = '' }: { href: string; label: string; variant?: 'white' | 'ink' | 'orange'; className?: string }) {
  const pill = useRef<HTMLSpanElement>(null)
  const arrow = useRef<HTMLSpanElement>(null)
  const ease = 'back.out(1.7)'
  const enter = () => {
    if (!pill.current || !arrow.current) return
    gsap.to(arrow.current, { x: -(pill.current.offsetWidth + 4), duration: 0.45, ease })
    gsap.to(pill.current, { x: arrow.current.offsetWidth + 4, duration: 0.45, ease })
    gsap.to(arrow.current.querySelector('svg'), { rotation: 45, duration: 0.45, ease })
  }
  const leave = () => {
    gsap.to([arrow.current, pill.current], { x: 0, duration: 0.45, ease })
    gsap.to(arrow.current?.querySelector('svg') ?? [], { rotation: 0, duration: 0.45, ease })
  }
  return (
    <TLink href={href} className={`cta cta--${variant} ${className}`} onMouseEnter={enter} onMouseLeave={leave}>
      <span className="cta__pill" ref={pill}>{label}</span>
      <span className="cta__arrow" ref={arrow}><Arrow /></span>
    </TLink>
  )
}

// Same look for form submit buttons.
export function CtaButton({ label, variant = 'white', disabled }: { label: string; variant?: 'white' | 'ink' | 'orange'; disabled?: boolean }) {
  const pill = useRef<HTMLSpanElement>(null)
  const arrow = useRef<HTMLSpanElement>(null)
  const ease = 'back.out(1.7)'
  return (
    <button
      type="submit"
      className={`cta cta--${variant}`}
      data-cursor="click"
      disabled={disabled}
      onMouseEnter={() => {
        if (!pill.current || !arrow.current) return
        gsap.to(arrow.current, { x: -(pill.current.offsetWidth + 4), duration: 0.45, ease })
        gsap.to(pill.current, { x: arrow.current.offsetWidth + 4, duration: 0.45, ease })
      }}
      onMouseLeave={() => gsap.to([arrow.current, pill.current], { x: 0, duration: 0.45, ease })}
    >
      <span className="cta__pill" ref={pill}>{label}</span>
      <span className="cta__arrow" ref={arrow}><Arrow /></span>
    </button>
  )
}
