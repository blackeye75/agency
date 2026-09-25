import 'server-only'
import nodemailer, { type Transporter } from 'nodemailer'

// Sends form enquiries through Gmail's SMTP server. Needs a Google account with
// 2-step verification and an app password (Google Account → Security → App passwords).
//   GMAIL_USER          the Gmail / Google Workspace address that sends the mail
//   GMAIL_APP_PASSWORD  the 16-character app password (not your normal password)
//   LEADS_NOTIFY_TO     optional: where enquiries go (comma separated), defaults to GMAIL_USER
//   LEADS_AUTOREPLY     optional: "true" also sends the visitor a short confirmation
const user = process.env.GMAIL_USER
const pass = process.env.GMAIL_APP_PASSWORD?.replace(/\s+/g, '')

export const mailConfigured = Boolean(user && pass)

let transport: Transporter | null = null
function mailer() {
  transport ??= nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  })
  return transport
}

export type LeadMail = {
  kind: string
  name: string
  email: string
  phone?: string
  company?: string
  services?: string[]
  budget?: string
  timeline?: string
  message?: string
  source_page?: string
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
// Keep header values on one line.
const line = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

const LABEL: Record<string, string> = { enquiry: 'New enquiry', contact: 'New message', quote: 'New quote request' }

export function leadEmail(lead: LeadMail, brand: string) {
  const rows: [string, string | undefined][] = [
    ['Name', lead.name], ['Email', lead.email], ['Phone', lead.phone], ['Company', lead.company],
    ['Interested in', lead.services?.join(', ')], ['Budget', lead.budget], ['Timeline', lead.timeline],
    ['Page', lead.source_page],
  ]
  const filled = rows.filter(([, v]) => v)
  const subject = line(`${LABEL[lead.kind] ?? 'New lead'} from ${lead.name}${lead.services?.length ? ` · ${lead.services.join(', ')}` : ''}`).slice(0, 180)
  const text = [...filled.map(([k, v]) => `${k}: ${v}`), '', lead.message ?? ''].join('\n')
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#120030">
  <h2 style="margin:0 0 12px">${esc(LABEL[lead.kind] ?? 'New lead')} · ${esc(brand)}</h2>
  <table cellpadding="6" style="border-collapse:collapse">${filled.map(([k, v]) => `<tr><td style="color:#666;padding-right:16px">${esc(k)}</td><td><b>${esc(v!)}</b></td></tr>`).join('')}</table>
  ${lead.message ? `<p style="white-space:pre-wrap;background:#f2eee9;padding:14px;border-radius:10px">${esc(lead.message)}</p>` : ''}
  <p style="color:#666;font-size:13px">Reply to this email to answer ${esc(lead.name)} directly.</p></div>`
  return { subject, text, html }
}

export async function sendLeadMail(lead: LeadMail, brand: string) {
  if (!mailConfigured) return { sent: false as const, reason: 'not-configured' }
  const to = process.env.LEADS_NOTIFY_TO || user!
  const { subject, text, html } = leadEmail(lead, brand)
  await mailer().sendMail({
    from: { name: line(`${brand} website`), address: user! },
    to,
    replyTo: { name: line(lead.name), address: lead.email },
    subject, text, html,
  })
  if (process.env.LEADS_AUTOREPLY === 'true') {
    await mailer().sendMail({
      from: { name: line(brand), address: user! },
      to: { name: line(lead.name), address: lead.email },
      subject: line(`Thanks, ${lead.name}: we got your message`),
      text: `Hi ${lead.name},\n\nThanks for reaching out to ${brand}. We have your message and will reply within 24 hours.\n\n— ${brand}`,
    }).catch((e: unknown) => console.error('[mail] auto-reply failed', e))
  }
  return { sent: true as const }
}
