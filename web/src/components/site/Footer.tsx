import { ScBadge } from './ScBadge'
import { TLink } from './TLink'
import { FooterMotion } from './FooterMotion'
import { emphasis } from '@/lib/cms/text'
import type { Service, Settings } from '@/lib/cms/types'

// Copula's dictionary footer, with webmind-style contact and service links.
export function Footer({ settings, services }: { settings: Settings; services: Service[] }) {
  const { footer, contact } = settings
  return (
    <footer className="footer" data-page-part>
      <div className="footer__left">
        <p className="footer__mark">{footer.word}</p>
        <p className="footer__def"><b>{footer.pronunciation}</b><br />{emphasis(footer.definition)}</p>
        <div className="footer__contact">
          <TLink className="footer__mail" href={`mailto:${contact.email}`}>{contact.email}</TLink>
          {contact.phone && <TLink className="footer__phone" href={`tel:${contact.phone.replace(/\s/g, '')}`}>{contact.phone}</TLink>}
        </div>
      </div>
      <nav className="footer__nav" aria-label="Footer">
        {settings.nav.filter((l) => l.href !== '/').map((l) => <TLink key={l.href} href={l.href}><span>{l.label}</span></TLink>)}
      </nav>
      <ScBadge href={settings.cta.href} label={footer.badge} large />
      {services.length > 0 && (
        <nav className="footer__services" aria-label="Services">
          {services.map((s) => <TLink key={s.slug} href={`/services/${s.slug}`}>{s.title}</TLink>)}
        </nav>
      )}
      <div className="footer__bottom">
        <p>{footer.credit}</p>
        <div className="footer__social">
          {settings.socials.map((s) => <TLink key={s.label + s.href} href={s.href} aria-label={s.label}>{s.label}</TLink>)}
        </div>
        <p className="footer__legal">{footer.legal.map((l) => <TLink key={l.label} href={l.href}>{l.label}</TLink>)}</p>
      </div>
      <FooterMotion />
    </footer>
  )
}
