import { CmsPage, pageMetadata } from '@/lib/cms/page'

export const generateMetadata = () => pageMetadata('projects')

export default function ProjectsPage() {
  return <CmsPage slug="projects" />
}
