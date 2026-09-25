import type { Metadata } from 'next'
import '@/styles/pages.css'
import '@/styles/admin.css'

export const metadata: Metadata = { title: 'CMS · Admin', robots: { index: false, follow: false } }

export default function AdminLayout({ children }: LayoutProps<'/admin'>) {
  return children
}
