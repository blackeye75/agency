// Content shapes shared by the public site, the admin panel and the API.

export type Tone = 'orange' | 'blue' | 'lime' | 'violet' | 'pink' | 'sky' | 'red' | 'yellow' | 'ink' | 'lilac' | 'cream'

export type Link = { label: string; href: string }
export type Logo = { name: string; icon?: string; logo?: string }

export type Settings = {
  brand: { name: string; tagline: string }
  seo: { title: string; description: string; ogImage?: string }
  contact: { email: string; phone: string; address: string; mapUrl: string; hours: string }
  nav: Link[]
  cta: Link
  dock: { menuLabel: string; cta: Link; secondary: Link }
  socials: Link[]
  footer: { word: string; pronunciation: string; definition: string; credit: string; badge: string; legal: Link[] }
  transitionWords: string[]
  loader: { enabled: boolean; text: string }
  detailCta: { title: string; button: Link }
}

// ---- Section data, keyed by section type --------------------------------

export type HeroData = { tag: string; line1: string; words: { text: string }[]; line3: string; badge: Link }
export type ManifestoData = { label: string; curveText: string; paragraph: string }
export type StoryData = { title: string; text: string; lines: { text: string }[] }
export type ConnectionData = {
  label: string; line1: string; word: string; line3: string; rating: string; ratingText: string; logos: Logo[]
}
export type LogoBandData = { label: string; tone: Tone; direction: 'left' | 'right'; items: Logo[] }
export type HeadingData = { title: string }
export type ServiceCardsData = { cards: { title: string; text: string; button: Link; tone: Tone }[] }
export type CasesData = { limit: number }
export type SignpostsData = { primary: Link; secondary: Link }
export type BondData = { title: string }
export type AboutData = { label: string; paragraph: string; link: Link; photos: { src: string; alt: string }[] }
export type AuditData = { title: string; chips: { label: string; value: number; tone: Tone }[]; cta: Link }
export type MoodData = { title: string; sub: string; options: { label: string; ring: string; cta: string; href: string }[] }
export type MarqueeData = { text: string }
export type PageHeroData = { eyebrow: string; title: string; text: string }
export type ServicesListData = { label: string; title: string }
export type ProcessData = { label: string; title: string; steps: { title: string; text: string; duration: string }[] }
export type CtaBandData = { title: string; text: string; button: Link }
export type ProjectsGridData = { label: string; allLabel: string }
export type PostsGridData = { label: string; empty: string }
export type ContactData = { title: string; text: string; formTitle: string; success: string }
export type QuoteData = {
  title: string; text: string; budgets: { text: string }[]; timelines: { text: string }[]; success: string
}

export type SectionDataMap = {
  hero: HeroData
  manifesto: ManifestoData
  story: StoryData
  connection: ConnectionData
  logoBand: LogoBandData
  heading: HeadingData
  serviceCards: ServiceCardsData
  cases: CasesData
  signposts: SignpostsData
  bond: BondData
  about: AboutData
  audit: AuditData
  mood: MoodData
  marquee: MarqueeData
  pageHero: PageHeroData
  servicesList: ServicesListData
  process: ProcessData
  ctaBand: CtaBandData
  projectsGrid: ProjectsGridData
  postsGrid: PostsGridData
  contact: ContactData
  quote: QuoteData
}

export type SectionType = keyof SectionDataMap

export type Section<K extends SectionType = SectionType> = {
  id: string
  page_slug: string
  key: string
  type: K
  label: string | null
  position: number
  visible: boolean
  data: SectionDataMap[K]
}

export type Page = {
  slug: string
  title: string
  seo_title: string | null
  seo_description: string | null
  og_image: string | null
}

// ---- Collections ---------------------------------------------------------

export type Service = {
  id: string
  slug: string
  title: string
  summary: string
  body: string
  features: { title: string; text: string }[]
  deliverables: { text: string }[]
  color: Tone
  cover_url: string | null
  position: number
  published: boolean
  seo_title: string | null
  seo_description: string | null
}

export type Project = {
  id: string
  slug: string
  name: string
  client: string
  category: string
  service_slug: string | null
  year: number | null
  url: string | null
  color: Tone
  cover_url: string | null
  gallery: { src: string; alt: string }[]
  summary: string
  body: string
  quote: string
  quote_author: string
  rating: number | null
  results: { value: string; label: string }[]
  tags: { text: string }[]
  featured: boolean
  position: number
  published: boolean
  seo_title: string | null
  seo_description: string | null
}

export type Post = {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string
  cover_url: string | null
  tags: { text: string }[]
  author: string
  read_minutes: number | null
  published_at: string
  published: boolean
  seo_title: string | null
  seo_description: string | null
}

export type Lead = {
  id: string
  kind: 'contact' | 'quote'
  name: string
  email: string
  phone: string | null
  company: string | null
  services: string[]
  budget: string | null
  timeline: string | null
  message: string
  source_page: string | null
  status: 'new' | 'contacted' | 'won' | 'lost' | 'spam'
  created_at: string
}

export type CollectionName = 'services' | 'projects' | 'posts'
export type CollectionItem = { services: Service; projects: Project; posts: Post }
