import type { Metadata, Viewport } from 'next'
import '@fontsource/bebas-neue'
import '@fontsource/mulish/400.css'
import '@fontsource/mulish/500.css'
import '@fontsource/mulish/600.css'
import '@fontsource/mulish/700.css'
import '@fontsource/mulish/800.css'
import '@fontsource/mulish/500-italic.css'
import '@fontsource/mulish/800-italic.css'
import '@fontsource/unbounded/300.css'
import '@fontsource/unbounded/400.css'
import 'lenis/dist/lenis.css'
import '@/styles/base.css'
import { getSettings } from '@/lib/cms/queries'
import { SITE_URL } from '@/lib/supabase/env'

// Runs before paint: restores the theme and decides whether the intro loader
// plays (every time the site opens, except in the CMS preview or with reduced motion).
const BOOT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.dataset.theme=t}catch(e){}
if(window.top!==window.self||matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('intro-seen');d.classList.add('intro-pending')})()`

export async function generateMetadata(): Promise<Metadata> {
  const { seo, brand } = await getSettings()
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: seo.title, template: `%s` },
    description: seo.description,
    applicationName: brand.name,
    openGraph: { title: seo.title, description: seo.description, images: seo.ogImage ? [seo.ogImage] : undefined, type: 'website' },
    icons: { icon: '/icon.svg' },
  }
}

export const viewport: Viewport = { themeColor: '#120030', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
