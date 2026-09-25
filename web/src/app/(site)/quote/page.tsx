import { CmsPage, pageMetadata } from '@/lib/cms/page'

export const generateMetadata = () => pageMetadata('quote')

export default function QuotePage() {
  return <CmsPage slug="quote" />
}
