import '@/styles/chrome.css'
import '@/styles/home.css'
import '@/styles/pages.css'
import { getServices, getSettings } from '@/lib/cms/queries'
import { SiteProvider } from '@/components/site/SiteProvider'
import { Sprites } from '@/components/site/Sprites'
import { ChromeIntro, Cursor, Dock, Loader, Nav, RouteWatcher, Transition } from '@/components/site/Chrome'
import { Menu } from '@/components/site/Menu'
import { Footer } from '@/components/site/Footer'
import { LiveRefresh } from '@/components/site/LiveRefresh'

export default async function SiteLayout({ children }: LayoutProps<'/'>) {
  const [settings, services] = await Promise.all([getSettings(), getServices()])
  const published = services.filter((s) => s.published)
  return (
    <SiteProvider>
      <a className="skip" href="#main">Skip to content</a>
      <Sprites />
      <Loader settings={settings} />
      <Cursor />
      <Nav settings={settings} />
      <Dock settings={settings} />
      <main id="main">{children}</main>
      <Footer settings={settings} services={published} />
      <Menu settings={settings} />
      <Transition text={settings.loader.text} />
      <ChromeIntro />
      <RouteWatcher />
      <LiveRefresh />
    </SiteProvider>
  )
}
