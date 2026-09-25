import { CmsPage, pageMetadata } from '@/lib/cms/page'

export const generateMetadata = () => pageMetadata('blog')

export default function BlogPage() {
  return <CmsPage slug="blog" />
}
