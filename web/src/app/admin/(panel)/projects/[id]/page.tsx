import { Suspense } from 'react'
import { CollectionEditor } from '@/components/admin/Collections'

async function Editor({ params }: Pick<PageProps<'/admin/projects/[id]'>, 'params'>) {
  const { id } = await params
  return <CollectionEditor key={id} name="projects" id={id} />
}

export default function Edit({ params }: PageProps<'/admin/projects/[id]'>) {
  return <Suspense fallback={<p>Loading…</p>}><Editor params={params} /></Suspense>
}
