'use client'
import { Field, LeadForm } from './LeadForm'

// Short enquiry form used on the home and contact pages.
export function EnquiryForm({ title, success, button, services }: { title: string; success: string; button: string; services: string[] }) {
  return (
    <LeadForm kind="enquiry" title={title} success={success} submitLabel={button || 'send enquiry'}>
      <div className="form__row">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="form__row">
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" />
        <label className="field">
          <span>Interested in</span>
          <select name="services" defaultValue="">
            <option value="">Choose a service</option>
            {services.map((s) => <option key={s} value={s}>{s}</option>)}
            <option value="Something else">Something else</option>
          </select>
        </label>
      </div>
      <Field label="Your message" name="message" textarea required placeholder="What are you planning? Links, goals, deadlines…" />
    </LeadForm>
  )
}
