import { Lines } from '@/components/motion/Lines'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { TLink } from '@/components/site/TLink'
import type { ContactData, Service, Settings } from '@/lib/cms/types'

const ICON = {
  mail: 'M3 6h18v12H3z M3 6l9 7 9-7',
  phone: 'M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z',
  pin: 'M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 2',
}
const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

export function Contact({ data, settings, services }: { data: ContactData; settings: Settings; services: Service[] }) {
  const { email, phone, address, mapUrl, hours } = settings.contact
  return (
    <section className="sec sec--cream">
      <div className="contact">
        <div>
          <Lines text={data.title} className="mega contact__title" />
          <p className="contact__text" data-reveal>{data.text}</p>
          <ul className="info">
            {email && <li data-reveal><TLink href={`mailto:${email}`} className="tone-orange"><i><Icon d={ICON.mail} /></i><span><small>Email</small><strong>{email}</strong></span></TLink></li>}
            {phone && <li data-reveal="0.05"><TLink href={`tel:${phone.replace(/\s/g, '')}`} className="tone-blue"><i><Icon d={ICON.phone} /></i><span><small>Phone</small><strong>{phone}</strong></span></TLink></li>}
            {address && (
              <li data-reveal="0.1">
                {mapUrl
                  ? <TLink href={mapUrl} className="tone-lime"><i><Icon d={ICON.pin} /></i><span><small>Studio · open in maps</small><strong>{address}</strong></span></TLink>
                  : <div className="tone-lime"><i><Icon d={ICON.pin} /></i><span><small>Studio</small><strong>{address}</strong></span></div>}
              </li>
            )}
            {hours && <li data-reveal="0.15"><div className="tone-violet"><i><Icon d={ICON.clock} /></i><span><small>Hours</small><strong>{hours}</strong></span></div></li>}
          </ul>
        </div>
        <EnquiryForm title={data.formTitle} success={data.success} button="send enquiry" services={services.map((s) => s.title)} />
      </div>
    </section>
  )
}
