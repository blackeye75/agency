'use client'
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { gsap, prefersReduced } from '@/components/motion/gsap'
import { CtaButton } from '@/components/site/Cta'

type Status = { kind: 'idle' | 'sending' | 'ok' | 'error'; message?: string }

// Shared submit logic for the contact and quote forms (POST /api/leads).
export function LeadForm({ kind, title, success, submitLabel, children, className = '' }: {
  kind: 'contact' | 'quote' | 'enquiry'; title: string; success: string; submitLabel: string; children: ReactNode; className?: string
}) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const okRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (status.kind === 'ok' && okRef.current && !prefersReduced()) {
      gsap.fromTo(okRef.current, { scale: 0.8, rotation: -3, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 0.7, ease: 'back.out(2)' })
    }
  }, [status.kind])

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const body = {
      kind,
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      company: String(fd.get('company') ?? ''),
      message: String(fd.get('message') ?? ''),
      services: fd.getAll('services').map(String),
      budget: String(fd.get('budget') ?? ''),
      timeline: String(fd.get('timeline') ?? ''),
      website: String(fd.get('website') ?? ''),
      source_page: window.location.pathname,
    }
    setStatus({ kind: 'sending' })
    try {
      const res = await fetch('/api/leads', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json.error ?? 'Something went wrong. Please try again or email us.')
      form.reset()
      setStatus({ kind: 'ok' })
    } catch (err) {
      setStatus({ kind: 'error', message: (err as Error).message })
    }
  }

  return (
    <form className={`form ${className}`} onSubmit={submit} noValidate={false} data-reveal>
      <h2 className="form__title">{title}</h2>
      {children}
      <label className="hp" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {status.kind === 'ok' && <p ref={okRef} className="form__status form__status--ok" role="status">{success}</p>}
      {status.kind === 'error' && <p className="form__status form__status--err" role="alert">{status.message}</p>}
      <div><CtaButton label={status.kind === 'sending' ? 'sending…' : submitLabel} variant="orange" disabled={status.kind === 'sending'} /></div>
    </form>
  )
}

export function Field({ label, name, type = 'text', required, placeholder, textarea, autoComplete }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; textarea?: boolean; autoComplete?: string
}) {
  return (
    <label className="field">
      <span>{label}{required && ' *'}</span>
      {textarea
        ? <textarea name={name} required={required} placeholder={placeholder} maxLength={5000} rows={5} />
        : <input name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} maxLength={type === 'email' ? 320 : 200} />}
    </label>
  )
}
