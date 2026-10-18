import type { Metadata } from 'next'
import { getSettings } from '@/lib/cms/queries'
import { Markdown } from '@/components/pages/Markdown'
import { LocationHero } from '@/components/pages/Location'
import { PageMotion } from '@/components/motion/PageMotion'

const UPDATED = '18 October 2026'

export const metadata: Metadata = {
  title: 'Privacy & Cookie Policy · NexusBee',
  description: 'How NexusBee collects, uses and protects personal data from enquiries and website visits, which cookies we use, and how to exercise your rights.',
  alternates: { canonical: '/privacy-policy' },
}

export default async function PrivacyPage() {
  const { contact, brand } = await getSettings()
  return (
    <>
      <LocationHero crumbs={[{ label: 'Home', href: '/' }, { label: 'Privacy policy' }]} eyebrow={`LAST UPDATED ${UPDATED.toUpperCase()}`} title={'PRIVACY &\nCOOKIES'} intro="What we collect, why we collect it and the choices you have." />
      <section className="sec sec--cream">
        <Markdown>{`This policy explains how ${brand.name} ("we", "us") handles personal data when you visit this website or contact us. We follow India's Digital Personal Data Protection Act, 2023.

## What we collect

- **Enquiries and quote requests.** When you fill in a form we receive what you enter: your name, email address, phone number, company, the services you are interested in, budget, timeline, your message and the page you sent it from.
- **Analytics.** Only if you accept cookies, Google Analytics (loaded through Google Tag Manager) records how the site is used, such as pages viewed, device type and approximate location. We do not use it to identify you personally.
- **Preferences on your device.** Your theme choice (light or dark) and your cookie choice are stored in your browser's local storage. They never leave your device.

We do not sell personal data, and we do not ask for sensitive data such as financial or health information.

## How we use it

- To reply to your enquiry, prepare a quote and deliver work you ask us to do.
- To understand which pages and campaigns are useful, so we can improve the site (only with your consent).
- To keep the website secure and working.

## Who processes it

Form submissions are stored in our database on Supabase and sent to our team by email. The website is hosted on Vercel. Analytics, if you accept it, is processed by Google. These providers act on our instructions and may store data outside India under their own security and privacy commitments.

## How long we keep it

We keep enquiries for as long as needed to respond and, if we work together, for the length of the relationship and any period required by law. You can ask us to delete your data at any time.

## Cookies

We only set analytics and advertising cookies after you click **Accept** on the cookie banner. If you click **Reject**, the site works exactly the same and Google tags run in a cookieless mode. To change your choice, clear this site's data in your browser and you will be asked again.

## Your rights

You can ask us to access, correct or erase your personal data, withdraw consent, or raise a grievance. Write to [${contact.email}](mailto:${contact.email}) and we will respond within 30 days. If you are not satisfied, you may complain to the Data Protection Board of India.

## Contact

${brand.name} · ${contact.address}
Email: [${contact.email}](mailto:${contact.email})${contact.phone ? ` · Phone: ${contact.phone}` : ''}`}</Markdown>
      </section>
      <PageMotion version="privacy" />
    </>
  )
}
