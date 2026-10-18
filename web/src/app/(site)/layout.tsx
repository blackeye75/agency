import '@/styles/chrome.css'
import '@/styles/home.css'
import '@/styles/pages.css'
import { getServices, getSettings } from '@/lib/cms/queries'
import { SiteProvider } from '@/components/site/SiteProvider'
import { Sprites } from '@/components/site/Sprites'
import { ChromeIntro, Curtain, Cursor, Dock, Loader, Nav, RouteWatcher, Transition } from '@/components/site/Chrome'
import { Menu } from '@/components/site/Menu'
import { Footer } from '@/components/site/Footer'
import { LiveRefresh } from '@/components/site/LiveRefresh'
import { ConsentBanner } from '@/components/site/Consent'
import { gtmBoot } from '@/lib/gtm'
import { JsonLd, organizationLd, websiteLd } from '@/lib/seo'

export default async function SiteLayout({ children }: LayoutProps<'/'>) {
  const [settings, services] = await Promise.all([getSettings(), getServices()])
  const published = services.filter((s) => s.published)
  const gtm = settings.seo.gtmId?.trim()
  const hasGtm = Boolean(gtm && /^GTM-[A-Z0-9]+$/.test(gtm))
  return (
    <SiteProvider>
      {hasGtm && <script dangerouslySetInnerHTML={{ __html: gtmBoot(gtm!) }} />}
      {hasGtm && <noscript><iframe src={`https://www.googletagmanager.com/ns.html?id=${gtm}`} height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>}
      <a className="skip" href="#main">Skip to content</a>
      <Sprites />
      <Loader settings={settings} />
      <Cursor />
      <Nav settings={settings} />
      <Dock settings={settings} />
      <main id="main">{children}</main>
      <Footer settings={settings} services={published} />
      <Menu settings={settings} />
      <Transition words={settings.transitionWords} />
      <Curtain text={settings.loader.text} />
      <ChromeIntro />
      <RouteWatcher />
      <LiveRefresh />
      <JsonLd data={organizationLd(settings, published)} />
      <JsonLd data={websiteLd(settings)} />
      {hasGtm && <ConsentBanner />}
    </SiteProvider>
  )
}
