'use client'
import { useEffect, useState } from 'react'
import { Field, LeadForm } from './LeadForm'
import type { QuoteData } from '@/lib/cms/types'

export function QuoteForm({ data, services }: { data: QuoteData; services: { slug: string; title: string }[] }) {
  const [picked, setPicked] = useState<string[]>([])
  // ?service=seo-performance preselects a service (links from the audit and service pages).
  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get('service')
    if (s) setPicked((p) => (p.includes(s) ? p : [...p, s]))
  }, [])
  const toggle = (slug: string) => setPicked((p) => (p.includes(slug) ? p.filter((x) => x !== slug) : [...p, slug]))
  return (
    <LeadForm kind="quote" title={data.title} success={data.success} submitLabel="send my brief">
      <fieldset className="fieldset">
        <legend>Services you need</legend>
        <div className="picks">
          {services.map((s) => (
            <label key={s.slug} className="pick" data-cursor="click">
              <input type="checkbox" name="services" value={s.title} checked={picked.includes(s.slug)} onChange={() => toggle(s.slug)} />
              <span>{s.title}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset className="fieldset">
        <legend>Budget</legend>
        <div className="picks">{data.budgets.map((b) => <label key={b.text} className="pick" data-cursor="click"><input type="radio" name="budget" value={b.text} /><span>{b.text}</span></label>)}</div>
      </fieldset>
      <fieldset className="fieldset">
        <legend>Timeline</legend>
        <div className="picks">{data.timelines.map((t) => <label key={t.text} className="pick" data-cursor="click"><input type="radio" name="timeline" value={t.text} /><span>{t.text}</span></label>)}</div>
      </fieldset>
      <div className="form__row">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="form__row">
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
        <Field label="Company" name="company" autoComplete="organization" />
      </div>
      <Field label="Tell us about the project" name="message" textarea placeholder="Goals, audience, links you like, anything that helps" />
    </LeadForm>
  )
}
