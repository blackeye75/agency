import { Lines } from '@/components/motion/Lines'
import { EnquiryForm } from '@/components/forms/EnquiryForm'
import { TLink } from '@/components/site/TLink'
import { Use } from '@/components/site/Sprites'
import type { EnquiryData, Service, Settings } from '@/lib/cms/types'

export function Enquiry({ data, services, settings }: { data: EnquiryData; services: Service[]; settings: Settings }) {
  const { email, phone } = settings.contact
  return (
    <section className="sec sec--cream enquiry" id="enquiry">
      <div className="contact">
        <div>
          <p className="label label--orange" style={{ marginBottom: '3vh' }}><Use id="flower8" />{data.label}</p>
          <Lines text={data.title} className="mega contact__title" />
          <p className="contact__text" data-reveal>{data.text}</p>
          <p className="enquiry__direct" data-reveal="0.1">
            {email && <TLink href={`mailto:${email}`}>{email}</TLink>}
            {phone && <TLink href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</TLink>}
          </p>
        </div>
        <EnquiryForm title={data.formTitle} success={data.success} button={data.button} services={services.map((s) => s.title)} />
      </div>
    </section>
  )
}
