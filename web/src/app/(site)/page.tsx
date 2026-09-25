import { CmsPage, pageMetadata } from '@/lib/cms/page'

export const generateMetadata = () => pageMetadata('home')

export default function HomePage() {
  return <CmsPage slug="home" />
}
