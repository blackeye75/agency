// Default content. The site renders this when Supabase isn't connected or a
// table is empty, and `npm run seed:sql` turns it into SQL for a fresh database.
// Everything here can be edited in the admin panel.
//
// Text fields accept two markers:  {O} swaps a letter for the alternate font
// ({O|wide}, {T|slant}, {b|script}, {G|g} pick a variant) and a new line breaks
// a heading. In the icon story, [crown] [heart] [bolt] [cursor] [chart] place icons.

import type { Page, Post, Project, Section, SectionDataMap, SectionType, Service, Settings } from './types'

export const seedSettings: Settings = {
  brand: { name: 'nova', tagline: 'Digital 360: software, product and growth, all in one studio.' },
  seo: {
    title: 'Nova Studio · Digital 360 agency',
    description:
      'Nova Studio designs, builds and grows digital products: websites, web software, e-commerce, mobile apps, SEO, marketing and AI automation.',
  },
  contact: {
    email: 'hello@example.com',
    phone: '+91 90000 00000',
    address: 'Your studio address, City, India',
    mapUrl: 'https://maps.google.com',
    hours: 'Mon–Sat · 10:00–19:00 IST',
  },
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  cta: { label: 'Get a quote', href: '/quote' },
  dock: {
    menuLabel: 'Menu',
    cta: { label: 'get my product', href: '/quote' },
    secondary: { label: 'Cases', href: '/projects' },
  },
  socials: [
    { label: 'in', href: 'https://www.linkedin.com' },
    { label: 'gh', href: 'https://github.com' },
    { label: 'ig', href: 'https://www.instagram.com' },
    { label: 'x', href: 'https://x.com' },
  ],
  footer: {
    word: 'nova',
    pronunciation: '[noh-vuh] noun • latin',
    definition:
      'The word *nova* derives from the Latin word *novus* meaning "new": a star that suddenly shines brighter than ever before.',
    credit: 'Developed and designed by Nova Studio, 2026. All rights reserved.',
    badge: "LET'S\nBUILD",
    legal: [
      { label: 'Terms', href: '/blog' },
      { label: 'Privacy Policy', href: '/blog' },
      { label: 'Cookie policy', href: '/blog' },
    ],
  },
  transitionWords: ['CODE', 'SPEED', 'SCALE'],
  loader: { enabled: true, text: 'loading good vibes' },
  detailCta: { title: 'HAVE A PROJECT\nIN MIND?', button: { label: 'get a quote', href: '/quote' } },
}

export const seedPages: Page[] = [
  { slug: 'home', title: 'Home', seo_title: null, seo_description: null, og_image: null },
  { slug: 'services', title: 'Services', seo_title: 'Services · Nova Studio', seo_description: 'Nine ways we help brands grow in digital, from corporate websites to AI agents.', og_image: null },
  { slug: 'projects', title: 'Projects', seo_title: 'Projects · Nova Studio', seo_description: 'Selected websites, software, stores and apps we designed and built.', og_image: null },
  { slug: 'blog', title: 'Blog', seo_title: 'Blog · Nova Studio', seo_description: 'Notes on design, engineering, SEO and growth from the Nova team.', og_image: null },
  { slug: 'contact', title: 'Contact', seo_title: 'Contact · Nova Studio', seo_description: 'Tell us about your project. We reply within 24 hours.', og_image: null },
  { slug: 'quote', title: 'Get a quote', seo_title: 'Get a quote · Nova Studio', seo_description: 'Pick the services you need, share a budget and get a fixed quote.', og_image: null },
]

const PROCESS: SectionDataMap['process'] = {
  label: 'HOW WE WORK',
  title: 'FROM IDEA\nTO LAUNCH',
  steps: [
    { title: 'Discovery', duration: '1–2 weeks', text: 'We learn your business, users and goals, audit what exists and agree on scope, budget and success metrics.' },
    { title: 'Design', duration: '1–2 weeks', text: 'Wireframes, then high-fidelity screens and a clickable prototype. You approve every screen before we write code.' },
    { title: 'Development', duration: '2–3 weeks', text: 'Clean, tested code in short sprints with a live staging link, so you see progress every few days.' },
    { title: 'Launch', duration: '1 week', text: 'Performance, SEO and security checks, analytics, go-live and a handover session for your team.' },
    { title: 'Support', duration: 'Ongoing', text: 'Monitoring, updates, backups and new features on a monthly plan, with a 24-hour response time.' },
  ],
}

const CTA: SectionDataMap['ctaBand'] = {
  title: "LET'S BUILD\nSOMETHING GREAT",
  text: 'Tell us where you want to be in six months. We will map the fastest way there, with a fixed quote.',
  button: { label: 'get a quote', href: '/quote' },
}

type SeedSection = { [K in SectionType]: { key: string; type: K; label: string; data: SectionDataMap[K]; visible?: boolean } }[SectionType]

const SECTIONS: Record<string, SeedSection[]> = {
  home: [
    {
      key: 'hero', type: 'hero', label: 'Hero',
      data: {
        tag: 'New name, same\nengineering DNA',
        line1: 'Y{O|wide}UR',
        words: [{ text: 'DIGITAL 360' }, { text: 'SOFTWARE' }, { text: 'PRODUCT' }, { text: 'ALL-IN-ONE' }],
        line3: 'AGEN{c}Y',
        badge: { label: "LET'S\nBUILD", href: '/quote' },
      },
    },
    {
      key: 'manifesto', type: 'manifesto', label: 'Manifesto (curved text)',
      data: {
        label: 'OUR MANIFESTO',
        curveText: 'THE CODE BEHIND BRAND SUCCESS ✺',
        paragraph: 'We bring strategy, engineering, and an agile approach together to help brands connect with people, and turn that connection into real results.',
      },
    },
    {
      key: 'story', type: 'story', label: 'Icon story',
      data: {
        title: 'WE ENGINEER PRODUCTS AND PLATFORMS THAT SCALE',
        text: 'Clean in code. Sharp in function. Across our client projects: load times down 63%, release cycles 4× faster, 99.98% uptime after launch.',
        lines: [
          { text: 'We {b|script}uild products [crown] people love' },
          { text: 'and software [heart] that wins clients.' },
          { text: 'Cl{e}an in code. [bolt]' },
          { text: 'Sharp in [cursor][chart] function.' },
        ],
      },
    },
    {
      key: 'clients', type: 'connection', label: 'Clients (coil + rating)',
      data: {
        label: 'OUR CLIENTS',
        line1: 'WHEN THE',
        word: 'CONNECTION',
        line3: 'IS REAL, IT SHOWS',
        rating: '9.6',
        ratingText: 'OVERALL CLIENT RATING SCORE ·',
        logos: [],
      },
    },
    { key: 'services-head', type: 'heading', label: 'Services heading', data: { title: 'WHAT ARE WE\nBUILDING FOR\nYOU?' } },
    {
      key: 'service-cards', type: 'serviceCards', label: 'Service cards (3D flip)',
      data: {
        cards: [
          { title: 'PRODUCT\nDESIGN', tone: 'lime', text: 'Interfaces that convert. Clear flows that make the next step obvious. Less hesitation. More forward movement.', button: { label: 'design my product', href: '/services/corporate-web-design' } },
          { title: 'WEB & APP\nENGINEERING', tone: 'orange', text: 'Speed you can feel: fast loading, rock-solid APIs, tests built in. Your product just works, and quietly earns trust.', button: { label: 'build my product', href: '/services/web-software-apps' } },
          { title: 'CUSTOM\nSOFTWARE?', tone: 'blue', text: "When things don't fit templates (SaaS, platform, marketplace or internal tools) we turn complexity into clarity.", button: { label: 'discuss my project', href: '/quote' } },
        ],
      },
    },
    {
      key: 'tech-stack', type: 'logoBand', label: 'Tech stack marquee',
      data: {
        label: 'OUR TECH STACK', tone: 'lime', direction: 'left',
        items: [
          { name: 'JavaScript', icon: 'javascript' }, { name: 'TypeScript', icon: 'typescript' }, { name: 'React', icon: 'react' },
          { name: 'Next.js', icon: 'nextdotjs' }, { name: 'Node.js', icon: 'nodedotjs' }, { name: 'Supabase', icon: 'supabase' },
          { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'Tailwind CSS', icon: 'tailwindcss' }, { name: 'GSAP', icon: 'gsap' },
          { name: 'Flutter', icon: 'flutter' }, { name: 'Figma', icon: 'figma' }, { name: 'Docker', icon: 'docker' },
          { name: 'VS Code' }, { name: 'Cursor', icon: 'cursor' }, { name: 'Claude', icon: 'claude' }, { name: 'Codex' },
          { name: 'GitHub Copilot', icon: 'githubcopilot' }, { name: 'Vercel', icon: 'vercel' },
        ],
      },
    },
    { key: 'cases', type: 'cases', label: 'Case carousel', data: { limit: 11 } },
    {
      key: 'signposts', type: 'signposts', label: 'Signposts',
      data: { primary: { label: 'VIEW ALL CA{S}ES', href: '/projects' }, secondary: { label: 'VIEW ALL BLOGS', href: '/blog' } },
    },
    { key: 'bond', type: 'bond', label: 'Two-circle reveal', data: { title: 'NICE TO\nBUILD\nWITH YOU' } },
    {
      key: 'about', type: 'about', label: 'About (word fill)',
      data: {
        label: 'ABOUT US',
        paragraph: "We're thinkers, makers, and coders, coffee lovers (mostly all), bug hunters, curious by nature, pragmatic by choice. We explore, question, and ship until the answer fits. Every project is a journey, and we're here for the ride.",
        link: { label: 'BUILD MORE WITH US', href: '/contact' },
        photos: [],
      },
    },
    { key: 'process', type: 'process', label: 'Process', data: PROCESS },
    {
      key: 'audit', type: 'audit', label: 'Free audit',
      data: {
        title: '{G|g}ET A FREE\nAUDIT OF YOUR\nPRODUC{T|slant}',
        chips: [
          { label: 'Speed', value: 99, tone: 'sky' },
          { label: 'SEO', value: 100, tone: 'orange' },
          { label: 'Security', value: 94, tone: 'yellow' },
          { label: 'Code quality', value: 82, tone: 'violet' },
          { label: 'Accessibility', value: 89, tone: 'lime' },
        ],
        cta: { label: 'get my free audit', href: '/quote?service=seo-performance' },
      },
    },
    {
      key: 'mood', type: 'mood', label: 'Mood picker',
      data: {
        title: 'SO… HOW {D|slant}O\nWE MAKE YOU FEEL?',
        sub: "Choose your vibe, we're listening.",
        options: [
          { label: 'Just looking', ring: 'JUST LOOKING · NOT RIGHT NOW · JUST LOOKING · NOT RIGHT NOW ·', cta: 'keep me posted', href: '/blog' },
          { label: 'I want a product', ring: 'I WANT A PRODUCT · I WANT A PRODUCT · I WANT A PRODUCT ·', cta: 'get my product', href: '/quote' },
          { label: 'I want a free audit', ring: 'I WANT A FREE AUDIT · I WANT A FREE AUDIT · I WANT A FREE AUDIT ·', cta: 'get my free audit', href: '/quote?service=seo-performance' },
        ],
      },
    },
    {
      key: 'enquiry', type: 'enquiry', label: 'Enquiry form',
      data: {
        label: 'START A PROJECT',
        title: 'GOT AN IDEA?\nLET\'S TALK',
        text: 'Tell us what you are building. We reply within 24 hours with next steps and a rough estimate.',
        formTitle: 'SEND AN ENQUIRY',
        button: 'send enquiry',
        success: 'Thanks! Your enquiry is in. We will reply within 24 hours.',
      },
    },
    {
      key: 'partners', type: 'logoBand', label: 'Partners marquee',
      data: {
        label: 'OUR PARTNERS', tone: 'blue', direction: 'right',
        items: [
          { name: 'Razorpay', icon: 'razorpay' }, { name: 'Shiprocket' }, { name: 'Shopify', icon: 'shopify' },
          { name: 'WordPress', icon: 'wordpress' }, { name: 'WooCommerce', icon: 'woocommerce' }, { name: 'Stripe', icon: 'stripe' },
          { name: 'PayPal', icon: 'paypal' }, { name: 'Google', icon: 'google' }, { name: 'Meta', icon: 'meta' },
          { name: 'Cloudflare', icon: 'cloudflare' }, { name: 'Zoho', icon: 'zoho' }, { name: 'HubSpot', icon: 'hubspot' },
          { name: 'WhatsApp', icon: 'whatsapp' }, { name: 'Mailchimp', icon: 'mailchimp' },
        ],
      },
    },
    { key: 'marquee', type: 'marquee', label: 'Name marquee', data: { text: 'NOVA' } },
  ],
  services: [
    { key: 'hero', type: 'pageHero', label: 'Page hero', data: { eyebrow: 'SERVICES', title: 'WE GROW\nYOUR BRAND\nIN DIGIT{A}L', text: 'Nine services, one team. Pick one, or let us run your whole digital 360: from the first pixel to the thousandth customer.' } },
    { key: 'list', type: 'servicesList', label: 'Services list', data: { label: 'WHAT WE DO', title: 'NINE WAYS\nWE HELP' } },
    { key: 'process', type: 'process', label: 'Process', data: PROCESS },
    { key: 'cta', type: 'ctaBand', label: 'Call to action', data: CTA },
  ],
  projects: [
    { key: 'hero', type: 'pageHero', label: 'Page hero', data: { eyebrow: 'PROJECTS', title: 'WORK WE\'RE\nPR{O|wide}UD OF', text: 'Corporate sites, software, stores and apps, built for brands that wanted more than a template.' } },
    { key: 'grid', type: 'projectsGrid', label: 'Projects grid', data: { label: 'SELECTED WORK', allLabel: 'All' } },
    { key: 'cta', type: 'ctaBand', label: 'Call to action', data: CTA },
  ],
  blog: [
    { key: 'hero', type: 'pageHero', label: 'Page hero', data: { eyebrow: 'BLOG', title: 'NOTES FROM\nTHE ST{U}DIO', text: 'What we learn building websites, software and growth engines, written down so you can use it too.' } },
    { key: 'grid', type: 'postsGrid', label: 'Posts grid', data: { label: 'LATEST POSTS', empty: 'New posts are on the way.' } },
    { key: 'cta', type: 'ctaBand', label: 'Call to action', data: CTA },
  ],
  contact: [
    { key: 'hero', type: 'pageHero', label: 'Page hero', data: { eyebrow: 'CONTACT', title: "LET'S TALK\nAB{O|wide}UT IT", text: 'A new website, an app, or a second opinion on what you already have: tell us, we reply within 24 hours.' } },
    { key: 'form', type: 'contact', label: 'Contact details + form', data: { title: 'SAY HELLO', text: 'Prefer email or a call? Use the details below, or send the form and we will get back to you.', formTitle: 'SEND A MESSAGE', success: 'Thanks! Your message is in. We will reply within 24 hours.' } },
    { key: 'marquee', type: 'marquee', label: 'Name marquee', data: { text: 'NOVA' } },
  ],
  quote: [
    { key: 'hero', type: 'pageHero', label: 'Page hero', data: { eyebrow: 'GET A QUOTE', title: 'TELL US WHAT\nY{O|wide}U NEED', text: 'Pick the services, share a budget and a timeline. We send a fixed quote within two working days.' } },
    {
      key: 'form', type: 'quote', label: 'Quote form',
      data: {
        title: 'YOUR PROJECT',
        text: 'The more you tell us, the sharper the quote. Nothing here is binding.',
        budgets: [{ text: 'Under ₹50k' }, { text: '₹50k – ₹2L' }, { text: '₹2L – ₹5L' }, { text: '₹5L – ₹10L' }, { text: '₹10L+' }, { text: 'Not sure yet' }],
        timelines: [{ text: 'ASAP' }, { text: '1–2 months' }, { text: '3–6 months' }, { text: 'Flexible' }],
        success: 'Thanks! We have your brief and will send a quote within two working days.',
      },
    },
  ],
}

export const seedSections: Section[] = Object.entries(SECTIONS).flatMap(([page, list]) =>
  list.map((s, i) => ({
    id: `seed-${page}-${s.key}`,
    page_slug: page,
    key: s.key,
    type: s.type,
    label: s.label,
    position: i,
    visible: s.visible ?? true,
    data: s.data,
  })) as Section[],
)

const svc = (s: Omit<Service, 'id' | 'published' | 'cover_url' | 'seo_title' | 'seo_description'>): Service => ({
  id: `seed-service-${s.slug}`, published: true, cover_url: null, seo_title: null, seo_description: null, ...s,
})

export const seedServices: Service[] = [
  svc({
    slug: 'corporate-web-design', position: 0, color: 'orange', title: 'Corporate web design',
    summary: 'Fast, beautiful company websites that explain what you do in five seconds and turn visitors into enquiries.',
    body: 'Your website is often the first meeting with a client. We design and build corporate sites that feel premium, load instantly and are easy for your team to update.\n\nEvery site comes with a content management system, SEO foundations and analytics, so it keeps working after launch.',
    features: [
      { title: 'Custom design', text: 'No templates. A look built around your brand and your buyers.' },
      { title: 'Editable content', text: 'Update every text, image and page yourself, no developer needed.' },
      { title: 'Motion that guides', text: 'Tasteful animation that draws the eye to what matters.' },
      { title: 'SEO ready', text: 'Clean markup, fast pages and structured data from day one.' },
    ],
    deliverables: [{ text: 'Brand-aligned UI design' }, { text: 'Responsive website' }, { text: 'CMS with page sections' }, { text: 'Analytics and SEO setup' }, { text: 'Training session' }],
  }),
  svc({
    slug: 'web-software-apps', position: 1, color: 'blue', title: 'Web software & apps',
    summary: 'Dashboards, portals, SaaS products and internal tools, engineered to scale and pleasant to use.',
    body: 'When a spreadsheet or an off-the-shelf tool stops being enough, we build the software your business actually needs.\n\nWe plan the data model with you, design the flows, and ship in short sprints with a live staging link.',
    features: [
      { title: 'Product thinking', text: 'We challenge scope so you launch sooner with what matters.' },
      { title: 'Solid architecture', text: 'Typed code, tests and a database designed for growth.' },
      { title: 'Roles and security', text: 'Sign-in, permissions and audit trails done properly.' },
      { title: 'Integrations', text: 'Payments, email, CRMs, ERPs and any API you use.' },
    ],
    deliverables: [{ text: 'Product scope and roadmap' }, { text: 'UX flows and UI design' }, { text: 'Web application' }, { text: 'Admin panel' }, { text: 'Documentation and handover' }],
  }),
  svc({
    slug: 'e-commerce', position: 2, color: 'lime', title: 'E-commerce',
    summary: 'Online stores on Shopify, WooCommerce or custom stacks, with payments, shipping and marketing wired in.',
    body: 'We build stores that sell: quick product pages, a checkout without friction, and the back-office tools you need to run it.\n\nPayments with Razorpay or Stripe, shipping with Shiprocket, and marketing pixels are set up and tested before launch.',
    features: [
      { title: 'Conversion-first UX', text: 'Product pages and checkout designed around buying.' },
      { title: 'Payments and shipping', text: 'Razorpay, Stripe, PayPal, Shiprocket and more.' },
      { title: 'Catalogue tools', text: 'Bulk import, variants, stock and discounts.' },
      { title: 'Growth ready', text: 'Pixels, feeds and email flows from day one.' },
    ],
    deliverables: [{ text: 'Store design' }, { text: 'Shopify, WooCommerce or custom build' }, { text: 'Payment and shipping setup' }, { text: 'Product import' }, { text: 'Launch checklist' }],
  }),
  svc({
    slug: 'seo-performance', position: 3, color: 'sky', title: 'SEO & performance',
    summary: 'Technical SEO, content structure and Core Web Vitals work that moves you up the results page.',
    body: 'Rankings follow speed, structure and useful content. We audit your site, fix what slows it down, and build a plan for the searches your buyers make.\n\nYou get a clear report every month, in plain language.',
    features: [
      { title: 'Technical audit', text: 'Crawl, indexation, schema and site speed checked in depth.' },
      { title: 'Core Web Vitals', text: 'We make pages load and respond instantly.' },
      { title: 'Content plan', text: 'Topics and pages mapped to real search demand.' },
      { title: 'Local SEO', text: 'Google Business Profile and local listings tuned.' },
    ],
    deliverables: [{ text: 'Free audit report' }, { text: 'Speed optimisation' }, { text: 'Keyword and content map' }, { text: 'Schema markup' }, { text: 'Monthly reporting' }],
  }),
  svc({
    slug: 'management-maintenance', position: 4, color: 'violet', title: 'Management & maintenance',
    summary: 'Updates, backups, monitoring and small improvements every month, so your site never falls behind.',
    body: 'Websites and apps need care. We keep yours secure, fast and up to date, and handle the small changes your team needs.\n\nEvery plan includes uptime monitoring and a 24-hour response time.',
    features: [
      { title: 'Security updates', text: 'Frameworks, plugins and servers kept patched.' },
      { title: 'Backups', text: 'Daily backups with tested restores.' },
      { title: 'Monitoring', text: 'Uptime and error alerts go straight to us.' },
      { title: 'Change hours', text: 'Monthly hours for content and feature tweaks.' },
    ],
    deliverables: [{ text: 'Monthly maintenance plan' }, { text: 'Uptime monitoring' }, { text: 'Backups' }, { text: 'Priority support' }, { text: 'Monthly health report' }],
  }),
  svc({
    slug: 'business-automation', position: 5, color: 'yellow', title: 'Business automation',
    summary: 'Connect your tools and remove repetitive work: leads, invoices, reports and approvals that run themselves.',
    body: 'Most teams lose hours a week copying data between apps. We map your processes and automate them with n8n, Zapier or custom code.\n\nThe result: fewer mistakes, faster responses and a team focused on real work.',
    features: [
      { title: 'Process mapping', text: 'We find the tasks worth automating first.' },
      { title: 'Tool integrations', text: 'CRMs, sheets, accounting, WhatsApp and email.' },
      { title: 'Custom workflows', text: 'n8n, Zapier or code, whatever fits best.' },
      { title: 'Dashboards', text: 'Live numbers instead of weekly spreadsheets.' },
    ],
    deliverables: [{ text: 'Automation audit' }, { text: 'Workflow build' }, { text: 'Integrations' }, { text: 'Reporting dashboard' }, { text: 'Team training' }],
  }),
  svc({
    slug: 'digital-marketing', position: 6, color: 'pink', title: 'Digital marketing',
    summary: 'Performance ads, social media and email campaigns measured against one thing: revenue.',
    body: 'We plan, launch and optimise campaigns on Google, Meta and email, with tracking you can trust.\n\nCreative, landing pages and analytics come from the same team, so nothing gets lost between agencies.',
    features: [
      { title: 'Paid ads', text: 'Google and Meta campaigns tuned every week.' },
      { title: 'Social media', text: 'Content calendars and creatives that fit your brand.' },
      { title: 'Email and WhatsApp', text: 'Automated flows that bring customers back.' },
      { title: 'Tracking', text: 'Pixels, conversions and dashboards set up correctly.' },
    ],
    deliverables: [{ text: 'Marketing plan' }, { text: 'Ad campaigns' }, { text: 'Landing pages' }, { text: 'Creative assets' }, { text: 'Monthly performance report' }],
  }),
  svc({
    slug: 'mobile-apps', position: 7, color: 'red', title: 'Mobile apps',
    summary: 'iOS and Android apps with React Native or Flutter, from prototype to the App Store and Play Store.',
    body: 'We design and build mobile apps that feel native, work offline and are a joy to use.\n\nOne codebase for both platforms keeps costs down, and we handle store submission and updates.',
    features: [
      { title: 'Cross-platform', text: 'React Native or Flutter for iOS and Android.' },
      { title: 'Native feel', text: 'Smooth gestures, notifications and offline mode.' },
      { title: 'Backend included', text: 'APIs, auth and an admin panel to run the app.' },
      { title: 'Store launch', text: 'Listings, screenshots and review handled for you.' },
    ],
    deliverables: [{ text: 'App design' }, { text: 'iOS and Android app' }, { text: 'Backend and admin' }, { text: 'Store submission' }, { text: 'Analytics and crash reporting' }],
  }),
  svc({
    slug: 'ai-agents-automation', position: 8, color: 'ink', title: 'AI agents & automation',
    summary: 'AI assistants, chatbots and agents built on Claude and other models, connected to your data and tools.',
    body: 'AI is useful when it is connected to your real work. We build assistants that answer customers, agents that handle back-office tasks, and search over your own documents.\n\nWe start with one measurable use case, prove it, then expand.',
    features: [
      { title: 'Support assistants', text: 'Answer customers on your site and WhatsApp, around the clock.' },
      { title: 'Internal agents', text: 'Draft, summarise, classify and update records for your team.' },
      { title: 'Knowledge search', text: 'Ask questions over your documents and data.' },
      { title: 'Safe by design', text: 'Guardrails, human review and clear logs.' },
    ],
    deliverables: [{ text: 'Use-case workshop' }, { text: 'AI agent or assistant' }, { text: 'Tool and data integrations' }, { text: 'Evaluation and guardrails' }, { text: 'Usage dashboard' }],
  }),
]

type ProjectSeed = Pick<Project, 'slug' | 'name' | 'client' | 'category' | 'service_slug' | 'year' | 'color' | 'quote' | 'rating'> & { tag: string }
const PROJECTS: ProjectSeed[] = [
  { slug: 'zenith', name: 'ZENITH', client: 'Zenith Fitness', category: 'Mobile', service_slug: 'mobile-apps', year: 2026, color: 'lime', rating: 4.9, tag: 'MOBILE APP', quote: 'They shipped our app in eight weeks and it has not gone down once.' },
  { slug: 'kite', name: 'KITE', client: 'Kite Travel', category: 'Software', service_slug: 'web-software-apps', year: 2026, color: 'blue', rating: 5.0, tag: 'WEB PLATFORM', quote: 'Clear process, honest estimates and a product our users love.' },
  { slug: 'orbitpay', name: 'ORBITPAY', client: 'OrbitPay', category: 'Software', service_slug: 'web-software-apps', year: 2025, color: 'orange', rating: 4.9, tag: 'FINTECH API', quote: 'Security-first engineering. Our audit passed on the first try.' },
  { slug: 'umbra', name: 'UMBRA', client: 'Umbra Studio', category: 'Corporate', service_slug: 'corporate-web-design', year: 2025, color: 'lime', rating: 5.0, tag: 'CORPORATE WEBSITE', quote: 'Our new site finally feels as good as the work we do.' },
  { slug: 'lumen-labs', name: 'LUMEN LABS', client: 'Lumen Labs', category: 'Software', service_slug: 'ai-agents-automation', year: 2026, color: 'blue', rating: 4.9, tag: 'AI AGENT', quote: 'Their support agent answers 70% of our tickets before a human needs to.' },
  { slug: 'northwind', name: 'NORTHWIND', client: 'Northwind', category: 'Automation', service_slug: 'business-automation', year: 2025, color: 'orange', rating: 5.0, tag: 'BUSINESS AUTOMATION', quote: 'They helped us structure the process before writing any code. We save 30 hours a week.' },
  { slug: 'pulse-health', name: 'PULSE HEALTH', client: 'Pulse Health', category: 'Corporate', service_slug: 'seo-performance', year: 2025, color: 'lime', rating: 4.8, tag: 'SEO & PERFORMANCE', quote: 'Organic traffic tripled in six months. Accessible, compliant and fast.' },
  { slug: 'ferry', name: 'FERRY', client: 'Ferry Logistics', category: 'Software', service_slug: 'web-software-apps', year: 2024, color: 'blue', rating: 4.9, tag: 'MARKETPLACE', quote: 'Bookings doubled in the first quarter after launch.' },
  { slug: 'bloom', name: 'BLOOM', client: 'Bloom Market', category: 'E-Commerce', service_slug: 'e-commerce', year: 2026, color: 'orange', rating: 5.0, tag: 'SHOPIFY STORE', quote: 'Page speed went from painful to instant, and so did our checkout.' },
  { slug: 'volt', name: 'VOLT', client: 'Volt Energy', category: 'Marketing', service_slug: 'digital-marketing', year: 2024, color: 'lime', rating: 4.9, tag: 'DIGITAL MARKETING', quote: 'Cost per lead down 42% while volume went up.' },
  { slug: 'harbor', name: 'HARBOR', client: 'Harbor CRM', category: 'E-Commerce', service_slug: 'management-maintenance', year: 2024, color: 'blue', rating: 4.9, tag: 'MAINTENANCE', quote: 'Zero downtime in two years. We forget the site even needs care.' },
]

export const seedProjects: Project[] = PROJECTS.map((p, i) => ({
  id: `seed-project-${p.slug}`,
  slug: p.slug,
  name: p.name,
  client: p.client,
  category: p.category,
  service_slug: p.service_slug,
  year: p.year,
  url: null,
  color: p.color,
  cover_url: null,
  gallery: [],
  summary: `${p.client} came to us for ${p.tag.toLowerCase()}. We planned, designed and shipped it end to end.`,
  body: `## The brief\n\n${p.client} needed a partner who could move fast without cutting corners.\n\n## What we did\n\nDiscovery workshops, a clickable prototype, then weekly releases to a staging link until launch day.\n\n## The result\n\n> ${p.quote}`,
  quote: p.quote,
  quote_author: p.client,
  rating: p.rating,
  results: [
    { value: '63%', label: 'faster load times' },
    { value: '4×', label: 'quicker releases' },
    { value: '99.98%', label: 'uptime after launch' },
  ],
  tags: [{ text: p.tag }, { text: 'DESIGN' }, { text: 'ENGINEERING' }],
  featured: true,
  position: i,
  published: true,
  seo_title: null,
  seo_description: null,
}))

export const seedPosts: Post[] = [
  {
    id: 'seed-post-website-speed', slug: 'why-website-speed-wins-clients', title: 'Why website speed quietly wins you clients',
    excerpt: 'Every second of load time costs enquiries. Here is what actually makes a site fast, and what to fix first.',
    body: 'A slow site does not look broken, it just loses people.\n\n## What to measure\n\nLook at **Largest Contentful Paint**, **Interaction to Next Paint** and **Cumulative Layout Shift**. Google uses all three.\n\n## What to fix first\n\n1. Oversized images\n2. Render-blocking fonts and scripts\n3. Slow hosting and no caching\n\nFix those and most sites get twice as fast in a week.',
    cover_url: null, tags: [{ text: 'PERFORMANCE' }, { text: 'SEO' }], author: 'Nova Studio', read_minutes: 4,
    published_at: '2026-09-01T09:00:00Z', published: true, seo_title: null, seo_description: null,
  },
  {
    id: 'seed-post-ai-agents', slug: 'ai-agents-for-small-teams', title: 'AI agents for small teams: where to start',
    excerpt: 'Skip the hype. Pick one repetitive task, measure it, automate it. A practical guide.',
    body: 'The best first AI project is boring: a task your team repeats every day.\n\n## Good first use cases\n\n- Answering common customer questions\n- Summarising calls and emails\n- Sorting and tagging incoming leads\n\n## Keep a human in the loop\n\nStart with drafts a person approves. When the drafts are reliably good, let the agent act on its own.',
    cover_url: null, tags: [{ text: 'AI' }, { text: 'AUTOMATION' }], author: 'Nova Studio', read_minutes: 5,
    published_at: '2026-08-20T09:00:00Z', published: true, seo_title: null, seo_description: null,
  },
  {
    id: 'seed-post-shopify-or-custom', slug: 'shopify-or-custom-store', title: 'Shopify, WooCommerce or custom: choosing your store',
    excerpt: 'Each option fits a different stage of growth. How to choose without regretting it a year later.',
    body: '## Shopify\n\nFastest to launch, great apps, monthly fees.\n\n## WooCommerce\n\nFlexible and familiar if you already run WordPress.\n\n## Custom\n\nWhen your catalogue, pricing or checkout does not fit a template.\n\nNot sure? Ask us for a free audit and we will recommend one in writing.',
    cover_url: null, tags: [{ text: 'E-COMMERCE' }], author: 'Nova Studio', read_minutes: 3,
    published_at: '2026-08-05T09:00:00Z', published: true, seo_title: null, seo_description: null,
  },
]
