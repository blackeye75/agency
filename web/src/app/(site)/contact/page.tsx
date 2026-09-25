import { CmsPage, pageMetadata } from '@/lib/cms/page'

export const generateMetadata = () => pageMetadata('contact')

export default function ContactPage() {
  return <CmsPage slug="contact" />
}
