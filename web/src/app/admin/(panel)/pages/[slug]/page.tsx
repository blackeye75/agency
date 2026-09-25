import { Suspense } from 'react'
import { PageEditor } from '@/components/admin/PageEditor'

async function Editor({ params }: Pick<PageProps<'/admin/pages/[slug]'>, 'params'>) {
  const { slug } = await params
  return <PageEditor key={slug} slug={slug} />
}

export default function EditPage({ params }: PageProps<'/admin/pages/[slug]'>) {
  return <Suspense fallback={<p>Loading…</p>}><Editor params={params} /></Suspense>
}
