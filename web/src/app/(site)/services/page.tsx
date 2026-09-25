import { CmsPage, pageMetadata } from '@/lib/cms/page'

export const generateMetadata = () => pageMetadata('services')

export default function ServicesPage() {
  return <CmsPage slug="services" />
}
