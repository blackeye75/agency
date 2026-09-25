import { Suspense } from 'react'
import { CollectionEditor } from '@/components/admin/Collections'

async function Editor({ params }: Pick<PageProps<'/admin/services/[id]'>, 'params'>) {
  const { id } = await params
  return <CollectionEditor key={id} name="services" id={id} />
}

export default function Edit({ params }: PageProps<'/admin/services/[id]'>) {
  return <Suspense fallback={<p>Loading…</p>}><Editor params={params} /></Suspense>
}
