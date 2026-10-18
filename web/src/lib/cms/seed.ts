// Default content. The site renders this when Supabase isn't connected or a
// table is empty, and `npm run seed:sql` turns it into SQL for a fresh database.
// Everything here can be edited in the admin panel.
//
// Text fields accept two markers:  {O} swaps a letter for the alternate font
// ({O|wide}, {T|slant}, {b|script}, {G|g} pick a variant) and a new line breaks
// a heading. In the icon story, [crown] [heart] [bolt] [cursor] [chart] place icons.

import { SERVICE_COPY } from './service-copy.ts'
import { SEO_POSTS } from './seo-posts.ts'
import { PORTFOLIO } from './portfolio.ts'
import type { Page, Post, Project, Section, SectionDataMap, SectionType, Service, Settings } from './types'

export const seedSettings: Settings = {
  brand: { name: 'nexusbee', tagline: 'Digital 360: software, product and growth, all in one studio.' },
  seo: {
    title: 'Website Development, Digital Marketing, SEO & AI Automation Agency in India · NexusBee',
    description:
      'NexusBee is a Noida-based agency for website development, digital marketing, SEO and AI automation, with 7+ years of experience helping businesses across India grow.',
    gtmId: 'GTM-PBF89LDZ',
    googleVerification: 'Qnx-nwkNTRPwSCEAaXY_XBZyGLX8rlQ0n1hhHXFjqjg',
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
    word: 'nexusbee',
    pronunciation: '[nek-suhs-bee] noun',
    definition:
      'A *nexus* is the point where things connect; a *bee* never stops building. Together: one busy studio where brands, code and growth meet.',
    credit: 'Developed and designed by NexusBee, 2026. All rights reserved.',
    badge: "LET'S\nBUILD",
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Cookie policy', href: '/privacy-policy' },
    ],
  },
  transitionWords: ['CODE', 'SPEED', 'SCALE'],
  loader: { enabled: true, text: 'loading good vibes' },
  detailCta: { title: 'HAVE A PROJECT\nIN MIND?', button: { label: 'get a quote', href: '/quote' } },
}

export const seedPages: Page[] = [
  { slug: 'home', title: 'Home', seo_title: null, seo_description: null, og_image: null },
  { slug: 'services', title: 'Services', seo_title: 'Website Development, Digital Marketing, SEO & AI Automation Services in India · NexusBee', seo_description: 'Website and app development, digital marketing, SEO and AI automation from one Noida-based team with 7+ years of experience, for businesses across India.', og_image: null },
  { slug: 'projects', title: 'Projects', seo_title: 'Our Work: Websites, Apps, Marketing & AI Automation Projects · NexusBee', seo_description: 'Selected websites, web apps, e-commerce stores, marketing campaigns and AI automation projects designed and built by NexusBee.', og_image: null },
  { slug: 'blog', title: 'Blog', seo_title: 'Web Development, Digital Marketing, SEO & AI Automation Insights · NexusBee', seo_description: 'In-depth guides on website development, digital marketing, SEO and AI automation for Indian businesses, from the NexusBee team.', og_image: null },
  { slug: 'contact', title: 'Contact', seo_title: 'Contact NexusBee · Digital Agency in Noida, India', seo_description: 'Talk to NexusBee about website development, digital marketing, SEO or AI automation. Based in Noida, working across India. We reply within 24 hours.', og_image: null },
  { slug: 'quote', title: 'Get a quote', seo_title: 'Get a Quote for Website Development, Marketing, SEO or AI Automation · NexusBee', seo_description: 'Tell us what you need: a website, app, digital marketing, SEO or AI automation. Share a budget and timeline and get a fixed quote within two working days.', og_image: null },
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
        words: [{ text: 'WEBSITES' }, { text: 'MARKETING' }, { text: 'SEO' }, { text: 'AI AUTOMATION' }],
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
    {
      key: 'stats', type: 'stats', label: 'Projects counter',
      data: {
        label: 'OUR TRACK RECORD', value: 325, suffix: '+', caption: 'PROJECTS COMPLETED',
        items: [{ value: '120+', label: 'happy clients' }, { value: '7', label: 'years building' }, { value: '9', label: 'services under one roof' }, { value: '4.9', label: 'average rating' }],
      },
    },
    { key: 'services-head', type: 'heading', label: 'Services heading', data: { title: 'WHAT ARE WE\nBUILDING FOR\nYOU?' } },
    {
      key: 'service-cards', type: 'serviceCards', label: 'Service cards (3D flip)',
      data: {
        cards: [
          { title: 'WEBSITES\n& APPS', tone: 'lime', text: 'Business websites, web apps, e-commerce stores and mobile apps. Fast, SEO-ready and built to scale.', button: { label: 'build my website', href: '/services/website-app-development' } },
          { title: 'MARKETING\n& SEO', tone: 'orange', text: 'Social media, Google and Meta ads, and SEO that bring qualified leads, measured on revenue, not likes.', button: { label: 'grow my business', href: '/services/digital-marketing' } },
          { title: 'AI &\nAUTOMATION', tone: 'blue', text: 'AI agents, WhatsApp chatbots and workflows that answer leads instantly and take repetitive work off your team.', button: { label: 'automate my work', href: '/services/ai-agents-automation' } },
        ],
      },
    },
    { key: 'services-list', type: 'servicesList', label: 'Services list', data: { label: 'OUR SERVICES', title: 'EVERYTHING\nWE DO' } },
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
      key: 'faq', type: 'faq', label: 'FAQ',
      data: {
        title: 'QUESTIONS\nWE GET ASKED',
        items: [
          { q: 'What does NexusBee do?', a: 'NexusBee is a digital agency in Noida with 7+ years of experience. We design and build websites, web applications, e-commerce stores and mobile apps, run SEO and digital marketing, and build AI agents and business automation for companies across India.' },
          { q: 'Do you work with businesses outside Noida?', a: 'Yes. We work with clients all over India, including Delhi NCR, Mumbai, Pune, Bangalore and Hyderabad. Projects run smoothly over video calls, a shared project board and a live staging link.' },
          { q: 'How much does a website or app cost?', a: 'It depends on the pages, features and integrations you need. After a short discovery call we send a fixed, written quote, so the price does not change halfway through the project.' },
          { q: 'How long does a project take?', a: 'A company website usually takes 4 to 8 weeks, an MVP web or mobile app 8 to 14 weeks, and a first AI automation a few weeks. We agree a timeline with milestones before we start.' },
          { q: 'Will we own the website, code and accounts?', a: 'Yes. Your domain, code, hosting, ad accounts and data stay in your name from day one.' },
          { q: 'Do you offer support after launch?', a: 'Yes. Monthly maintenance plans cover updates, backups, security, monitoring, content changes and new features, with clear response times.' },
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
    { key: 'marquee', type: 'marquee', label: 'Name marquee', data: { text: 'NEXUSBEE' } },
  ],
  services: [
    { key: 'hero', type: 'pageHero', label: 'Page hero', data: { eyebrow: 'SERVICES', title: 'WE GROW\nYOUR BRAND\nIN DIGIT{A}L', text: 'Five services, one team. Pick one, or let us run your whole digital 360: from the first pixel to the thousandth customer.' } },
    { key: 'list', type: 'servicesList', label: 'Services list', data: { label: 'WHAT WE DO', title: 'FIVE WAYS\nWE HELP' } },
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
    { key: 'marquee', type: 'marquee', label: 'Name marquee', data: { text: 'NEXUSBEE' } },
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
  id: `seed-service-${s.slug}`, published: true, cover_url: null, ...s, ...SERVICE_COPY[s.slug],
})

export const seedServices: Service[] = [
  svc({
    slug: 'website-app-development', position: 0, color: 'orange', title: 'Website & app development',
    summary: 'Corporate websites, web applications, e-commerce stores and mobile apps: fast, SEO-ready and built to scale.',
    body: '',
    features: [
      { title: 'Business websites', text: 'Custom-designed, fast websites with a CMS your team can edit.' },
      { title: 'Web apps & SaaS', text: 'Portals, dashboards, marketplaces and internal tools.' },
      { title: 'E-commerce', text: 'Shopify, WooCommerce or custom stores with Indian payments and GST.' },
      { title: 'Mobile apps', text: 'Android and iOS from one codebase, with store launch handled.' },
      { title: 'Integrations', text: 'CRMs, ERPs, payment gateways, WhatsApp and any API.' },
      { title: 'SEO & speed built in', text: 'Core Web Vitals, structured data and analytics from day one.' },
    ],
    deliverables: [{ text: 'Discovery and scope' }, { text: 'UX and UI design' }, { text: 'Website, web app, store or mobile app' }, { text: 'CMS or admin panel' }, { text: 'SEO, analytics and launch' }, { text: 'Training and handover' }],
  }),
  svc({
    slug: 'digital-marketing', position: 1, color: 'pink', title: 'Digital marketing & social media management',
    summary: 'Social media management, Google and Meta ads, content and email campaigns measured against one thing: revenue.',
    body: '',
    features: [
      { title: 'Social media management', text: 'Content calendars, reels, posts and community management.' },
      { title: 'Paid ads', text: 'Google, Meta and LinkedIn campaigns tuned every week.' },
      { title: 'Landing pages', text: 'Fast pages built to turn clicks into enquiries.' },
      { title: 'Email and WhatsApp', text: 'Automated flows that bring customers back.' },
      { title: 'Tracking', text: 'Pixels, conversions and dashboards set up correctly.' },
      { title: 'Monthly reporting', text: 'Leads, sales and return on ad spend in plain language.' },
    ],
    deliverables: [{ text: 'Marketing and content strategy' }, { text: 'Monthly social media calendar' }, { text: 'Ad campaigns' }, { text: 'Creative assets' }, { text: 'Landing pages' }, { text: 'Monthly performance report' }],
  }),
  svc({
    slug: 'ai-agents-automation', position: 2, color: 'ink', title: 'AI agents & automation',
    summary: 'AI agents, chatbots and business process automation connected to your data and tools, built on Claude and other models.',
    body: '',
    features: [
      { title: 'AI chatbots', text: 'Answer customers on your website and WhatsApp, around the clock.' },
      { title: 'Lead agents', text: 'Reply instantly, qualify leads, update your CRM and book calls.' },
      { title: 'Document processing', text: 'Invoices, purchase orders and forms read into your systems.' },
      { title: 'Process automation', text: 'Leads, invoices, reports and approvals that run themselves.' },
      { title: 'Knowledge search', text: 'Ask questions over your own documents and data.' },
      { title: 'Safe by design', text: 'Guardrails, human review and clear logs.' },
    ],
    deliverables: [{ text: 'Process and use-case workshop' }, { text: 'AI agent or chatbot' }, { text: 'Workflow automation' }, { text: 'Tool and data integrations' }, { text: 'Evaluation and guardrails' }, { text: 'Usage dashboard' }],
  }),
  svc({
    slug: 'seo-performance', position: 3, color: 'sky', title: 'SEO & performance',
    summary: 'Technical SEO, content structure and Core Web Vitals work that moves you up the results page.',
    body: '',
    features: [
      { title: 'Technical audit', text: 'Crawl, indexation, schema and site speed checked in depth.' },
      { title: 'Core Web Vitals', text: 'We make pages load and respond instantly.' },
      { title: 'Content plan', text: 'Topics and pages mapped to real search demand.' },
      { title: 'Local SEO', text: 'Google Business Profile and local listings tuned.' },
    ],
    deliverables: [{ text: 'Free audit report' }, { text: 'Speed optimisation' }, { text: 'Keyword and content map' }, { text: 'Schema markup' }, { text: 'Monthly reporting' }],
  }),
  svc({
    slug: 'management-maintenance', position: 4, color: 'violet', title: 'Maintenance & management',
    summary: 'Updates, backups, security, monitoring and improvements every month, so your website and apps never fall behind.',
    body: '',
    features: [
      { title: 'Security updates', text: 'Frameworks, plugins and servers kept patched.' },
      { title: 'Backups', text: 'Daily backups with tested restores.' },
      { title: 'Monitoring', text: 'Uptime and error alerts go straight to us.' },
      { title: 'Change hours', text: 'Monthly hours for content and feature tweaks.' },
    ],
    deliverables: [{ text: 'Monthly maintenance plan' }, { text: 'Uptime monitoring' }, { text: 'Backups' }, { text: 'Priority support' }, { text: 'Monthly health report' }],
  }),
]

type ProjectSeed = Pick<Project, 'slug' | 'name' | 'client' | 'category' | 'service_slug' | 'year' | 'color' | 'quote' | 'rating'> & { tag: string }
const PROJECTS: ProjectSeed[] = [
  { slug: 'zenith', name: 'ZENITH', client: 'Zenith Fitness', category: 'Mobile', service_slug: 'website-app-development', year: 2026, color: 'lime', rating: 4.9, tag: 'MOBILE APP', quote: 'They shipped our app in eight weeks and it has not gone down once.' },
  { slug: 'kite', name: 'KITE', client: 'Kite Travel', category: 'Software', service_slug: 'website-app-development', year: 2026, color: 'blue', rating: 5.0, tag: 'WEB PLATFORM', quote: 'Clear process, honest estimates and a product our users love.' },
  { slug: 'orbitpay', name: 'ORBITPAY', client: 'OrbitPay', category: 'Software', service_slug: 'website-app-development', year: 2025, color: 'orange', rating: 4.9, tag: 'FINTECH API', quote: 'Security-first engineering. Our audit passed on the first try.' },
  { slug: 'umbra', name: 'UMBRA', client: 'Umbra Studio', category: 'Corporate', service_slug: 'website-app-development', year: 2025, color: 'lime', rating: 5.0, tag: 'CORPORATE WEBSITE', quote: 'Our new site finally feels as good as the work we do.' },
  { slug: 'lumen-labs', name: 'LUMEN LABS', client: 'Lumen Labs', category: 'Software', service_slug: 'ai-agents-automation', year: 2026, color: 'blue', rating: 4.9, tag: 'AI AGENT', quote: 'Their support agent answers 70% of our tickets before a human needs to.' },
  { slug: 'northwind', name: 'NORTHWIND', client: 'Northwind', category: 'Automation', service_slug: 'ai-agents-automation', year: 2025, color: 'orange', rating: 5.0, tag: 'BUSINESS AUTOMATION', quote: 'They helped us structure the process before writing any code. We save 30 hours a week.' },
  { slug: 'pulse-health', name: 'PULSE HEALTH', client: 'Pulse Health', category: 'Corporate', service_slug: 'seo-performance', year: 2025, color: 'lime', rating: 4.8, tag: 'SEO & PERFORMANCE', quote: 'Organic traffic tripled in six months. Accessible, compliant and fast.' },
  { slug: 'ferry', name: 'FERRY', client: 'Ferry Logistics', category: 'Software', service_slug: 'website-app-development', year: 2024, color: 'blue', rating: 4.9, tag: 'MARKETPLACE', quote: 'Bookings doubled in the first quarter after launch.' },
  { slug: 'bloom', name: 'BLOOM', client: 'Bloom Market', category: 'E-Commerce', service_slug: 'website-app-development', year: 2026, color: 'orange', rating: 5.0, tag: 'SHOPIFY STORE', quote: 'Page speed went from painful to instant, and so did our checkout.' },
  { slug: 'volt', name: 'VOLT', client: 'Volt Energy', category: 'Marketing', service_slug: 'digital-marketing', year: 2024, color: 'lime', rating: 4.9, tag: 'DIGITAL MARKETING', quote: 'Cost per lead down 42% while volume went up.' },
  { slug: 'harbor', name: 'HARBOR', client: 'Harbor CRM', category: 'E-Commerce', service_slug: 'management-maintenance', year: 2024, color: 'blue', rating: 4.9, tag: 'MAINTENANCE', quote: 'Zero downtime in two years. We forget the site even needs care.' },
]

const SAMPLE_PROJECTS: Project[] = PROJECTS.map((p, i) => ({
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

export const seedProjects: Project[] = [...PORTFOLIO, ...SAMPLE_PROJECTS]

export const seedPosts: Post[] = SEO_POSTS
