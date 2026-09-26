// Describes every editable field so the admin panel can build its forms.
// Keep in sync with ./types.ts.

import type { CollectionName, SectionType } from './types'

export type Option = { value: string; label: string }

export type Field =
  | { kind: 'text' | 'textarea' | 'markdown'; name: string; label: string; hint?: string }
  | { kind: 'number'; name: string; label: string; hint?: string; min?: number; max?: number; step?: number }
  | { kind: 'boolean'; name: string; label: string; hint?: string }
  | { kind: 'select'; name: string; label: string; hint?: string; options: Option[] }
  | { kind: 'tone' | 'icon' | 'media' | 'date'; name: string; label: string; hint?: string }
  | { kind: 'link'; name: string; label: string; hint?: string }
  | { kind: 'list'; name: string; label: string; hint?: string; item: Field[]; itemLabel?: string }

export const TONES: Option[] = ['orange', 'blue', 'lime', 'violet', 'pink', 'sky', 'red', 'yellow', 'ink', 'lilac', 'cream'].map(
  (t) => ({ value: t, label: t }),
)

const ALT_HINT = 'New line = line break. {O} uses the alternate font for a letter ({O|wide}, {T|slant}, {b|script}).'

const text = (name: string, label: string, hint?: string): Field => ({ kind: 'text', name, label, hint })
const area = (name: string, label: string, hint?: string): Field => ({ kind: 'textarea', name, label, hint })
const link = (name: string, label: string, hint?: string): Field => ({ kind: 'link', name, label, hint })
const list = (name: string, label: string, item: Field[], itemLabel?: string, hint?: string): Field => ({
  kind: 'list', name, label, item, itemLabel, hint,
})
const strings = (name: string, label: string, hint?: string) => list(name, label, [text('text', 'Text')], 'text', hint)
const logos = (name: string, label: string) =>
  list(name, label, [
    text('name', 'Name'),
    { kind: 'icon', name: 'icon', label: 'Brand icon', hint: 'Optional. Pick a built-in logo, or upload one below.' },
    { kind: 'media', name: 'logo', label: 'Logo image', hint: 'Optional. SVG or PNG, shown instead of the icon.' },
  ], 'name')

export const SECTION_TYPES: Record<SectionType, { label: string; description: string; fields: Field[] }> = {
  hero: {
    label: 'Hero', description: 'Big title with the rotating word and the spinning badge.',
    fields: [
      area('tag', 'Small tag (top left)'),
      text('line1', 'First line', ALT_HINT),
      strings('words', 'Rotating words', 'Shown one after another in orange on the middle line.'),
      text('line3', 'Last line', ALT_HINT),
      link('badge', 'Spinning badge', 'Use a new line in the label to split it.'),
    ],
  },
  manifesto: {
    label: 'Manifesto', description: 'Blue section: text travels along a curve, then a paragraph fades in.',
    fields: [text('label', 'Label'), text('curveText', 'Curved text'), area('paragraph', 'Paragraph')],
  },
  story: {
    label: 'Icon story', description: 'Icons fly from a row into a four-line statement.',
    fields: [
      text('title', 'Title'), area('text', 'Intro text'),
      strings('lines', 'Statement lines', 'Place icons with [crown] [heart] [bolt] [cursor] [chart]. ' + ALT_HINT),
    ],
  },
  connection: {
    label: 'Clients', description: 'Coil lettering and the rating badge, with an optional client logo marquee.',
    fields: [
      text('label', 'Label'), text('line1', 'Line 1'), text('word', 'Coil word', 'The first O becomes the coil.'),
      text('line3', 'Line 3'), text('rating', 'Rating'), text('ratingText', 'Rating ring text'),
      { ...logos('logos', 'Client logo marquee'), hint: 'Optional. Leave empty to hide the marquee.' },
    ],
  },
  logoBand: {
    label: 'Logo marquee', description: 'A scrolling band of logos: tech stack, partners, tools.',
    fields: [
      text('label', 'Label'),
      { kind: 'tone', name: 'tone', label: 'Colour' },
      { kind: 'select', name: 'direction', label: 'Direction', options: [{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }] },
      logos('items', 'Logos'),
    ],
  },
  heading: { label: 'Big heading', description: 'A full-width display heading on cream.', fields: [area('title', 'Title', ALT_HINT)] },
  serviceCards: {
    label: 'Service cards', description: 'Three cards that flip in 3D as you scroll.',
    fields: [
      list('cards', 'Cards', [area('title', 'Title', ALT_HINT), area('text', 'Text'), link('button', 'Button'), { kind: 'tone', name: 'tone', label: 'Colour' }], 'title', 'Designed for three cards.'),
    ],
  },
  cases: {
    label: 'Case carousel', description: 'Coverflow of featured projects (edit them under Projects).',
    fields: [{ kind: 'number', name: 'limit', label: 'Number of projects', min: 1, max: 30 }],
  },
  signposts: {
    label: 'Signposts', description: 'Two arrow signs that slide past each other.',
    fields: [link('primary', 'Orange sign', ALT_HINT), link('secondary', 'Lilac sign')],
  },
  bond: { label: 'Circle reveal', description: 'Orange circles close in around a title.', fields: [area('title', 'Title', ALT_HINT)] },
  about: {
    label: 'About', description: 'Words fill in as you scroll, with rotating team photos.',
    fields: [
      text('label', 'Label'), area('paragraph', 'Paragraph'), link('link', 'Link'),
      list('photos', 'Team photos', [{ kind: 'media', name: 'src', label: 'Photo' }, text('alt', 'Description')], 'alt', 'Leave empty to show illustrated faces.'),
    ],
  },
  audit: {
    label: 'Audit', description: 'Score chips count up around a big title.',
    fields: [
      area('title', 'Title', ALT_HINT),
      list('chips', 'Score chips', [text('label', 'Label'), { kind: 'number', name: 'value', label: 'Score %', min: 0, max: 100 }, { kind: 'tone', name: 'tone', label: 'Colour' }], 'label', 'Up to five chips.'),
      link('cta', 'Button'),
    ],
  },
  mood: {
    label: 'Mood picker', description: 'Three stickers; the choice changes the button.',
    fields: [
      area('title', 'Title', ALT_HINT), text('sub', 'Subtitle'),
      list('options', 'Stickers', [text('label', 'Label'), text('ring', 'Ring text'), text('cta', 'Button text'), text('href', 'Button link')], 'label', 'Designed for three stickers.'),
    ],
  },
  marquee: { label: 'Name marquee', description: 'The giant orange marquee.', fields: [text('text', 'Word')] },
  pageHero: {
    label: 'Page hero', description: 'Title block at the top of inner pages.',
    fields: [text('eyebrow', 'Eyebrow'), area('title', 'Title', ALT_HINT), area('text', 'Intro')],
  },
  servicesList: { label: 'Services list', description: 'Numbered list of every published service.', fields: [text('label', 'Label'), area('title', 'Title', ALT_HINT)] },
  process: {
    label: 'Process', description: 'Numbered timeline of how you work.',
    fields: [text('label', 'Label'), area('title', 'Title', ALT_HINT), list('steps', 'Steps', [text('title', 'Title'), text('duration', 'Duration'), area('text', 'Text')], 'title')],
  },
  ctaBand: { label: 'Call to action', description: 'Big closing call to action.', fields: [area('title', 'Title', ALT_HINT), area('text', 'Text'), link('button', 'Button')] },
  projectsGrid: { label: 'Projects grid', description: 'All projects with category filters.', fields: [text('label', 'Label'), text('allLabel', '"All" filter label')] },
  postsGrid: { label: 'Posts grid', description: 'All published blog posts.', fields: [text('label', 'Label'), text('empty', 'Text when there are no posts')] },
  contact: {
    label: 'Contact', description: 'Contact details (from Settings) and a contact form.',
    fields: [text('title', 'Title'), area('text', 'Text'), text('formTitle', 'Form title'), area('success', 'Message after sending')],
  },
  enquiry: {
    label: 'Enquiry form', description: 'Short enquiry form (name, email, phone, service, message). Sends an email and lands in Leads.',
    fields: [text('label', 'Label'), area('title', 'Title', ALT_HINT), area('text', 'Text'), text('formTitle', 'Form title'), text('button', 'Button text'), area('success', 'Message after sending')],
  },
  quote: {
    label: 'Quote form', description: 'Services, budget and timeline picker.',
    fields: [text('title', 'Title'), area('text', 'Text'), strings('budgets', 'Budget options'), strings('timelines', 'Timeline options'), area('success', 'Message after sending')],
  },
}

// Blank data for a newly added section.
export function emptyValue(field: Field): unknown {
  switch (field.kind) {
    case 'number': return 0
    case 'boolean': return false
    case 'list': return []
    case 'link': return { label: '', href: '' }
    case 'tone': return 'orange'
    case 'select': return field.options[0]?.value ?? ''
    default: return ''
  }
}
export const emptyData = (fields: Field[]) => Object.fromEntries(fields.map((f) => [f.name, emptyValue(f)]))

const seo: Field[] = [
  text('seo_title', 'SEO title', 'Defaults to the title.'),
  area('seo_description', 'SEO description', 'Defaults to the summary.'),
]

export const COLLECTIONS: Record<CollectionName, { label: string; singular: string; title: string; path: string; fields: Field[] }> = {
  services: {
    label: 'Services', singular: 'service', title: 'title', path: '/services/',
    fields: [
      text('title', 'Title'), text('slug', 'URL slug', 'Lowercase letters, numbers and dashes.'),
      { kind: 'boolean', name: 'published', label: 'Published' },
      { kind: 'tone', name: 'color', label: 'Colour' },
      area('summary', 'Summary'), { kind: 'markdown', name: 'body', label: 'Body' },
      list('features', 'Features', [text('title', 'Title'), area('text', 'Text')], 'title'),
      strings('deliverables', 'Deliverables'),
      { kind: 'media', name: 'cover_url', label: 'Cover image' },
      { kind: 'number', name: 'position', label: 'Order', min: 0 },
      ...seo,
    ],
  },
  projects: {
    label: 'Projects', singular: 'project', title: 'name', path: '/projects/',
    fields: [
      text('name', 'Name', 'Shown on the card and its spine.'), text('slug', 'URL slug'),
      { kind: 'boolean', name: 'published', label: 'Published' },
      { kind: 'boolean', name: 'featured', label: 'Show in the home carousel' },
      text('client', 'Client'), text('category', 'Category', 'Used for the filters, e.g. Corporate, Software, E-Commerce.'),
      text('service_slug', 'Service slug', 'Links the project to a service page.'),
      { kind: 'number', name: 'year', label: 'Year', min: 1990, max: 2100 },
      text('url', 'Live URL'), { kind: 'tone', name: 'color', label: 'Card colour' },
      { kind: 'media', name: 'cover_url', label: 'Cover image' },
      list('gallery', 'Gallery', [{ kind: 'media', name: 'src', label: 'Image' }, text('alt', 'Description')], 'alt'),
      area('summary', 'Summary'), { kind: 'markdown', name: 'body', label: 'Case study' },
      area('quote', 'Client quote'), text('quote_author', 'Quote author'),
      { kind: 'number', name: 'rating', label: 'Rating', min: 0, max: 5, step: 0.1 },
      list('results', 'Results', [text('value', 'Value'), text('label', 'Label')], 'label'),
      strings('tags', 'Tags'),
      { kind: 'number', name: 'position', label: 'Order', min: 0 },
      ...seo,
    ],
  },
  posts: {
    label: 'Blog posts', singular: 'post', title: 'title', path: '/blog/',
    fields: [
      text('title', 'Title'), text('slug', 'URL slug'),
      { kind: 'boolean', name: 'published', label: 'Published' },
      { kind: 'date', name: 'published_at', label: 'Publish date', hint: 'Future dates stay hidden until then.' },
      area('excerpt', 'Excerpt'), { kind: 'markdown', name: 'body', label: 'Body' },
      { kind: 'media', name: 'cover_url', label: 'Cover image' },
      strings('tags', 'Tags'), text('author', 'Author'),
      { kind: 'number', name: 'read_minutes', label: 'Reading time (minutes)', min: 1 },
      ...seo,
    ],
  },
}

// Settings are edited as grouped objects; each group maps to a key of Settings.
export const SETTINGS_GROUPS: { key: string; title: string; fields: Field[]; listOf?: Field[]; strings?: boolean }[] = [
  { key: 'brand', title: 'Brand', fields: [text('name', 'Logo word'), area('tagline', 'Tagline')] },
  { key: 'seo', title: 'Default SEO', fields: [text('title', 'Site title'), area('description', 'Description'), { kind: 'media', name: 'ogImage', label: 'Share image' }] },
  { key: 'contact', title: 'Contact details', fields: [text('email', 'Email'), text('phone', 'Phone'), area('address', 'Address'), text('mapUrl', 'Map link'), text('hours', 'Opening hours')] },
  { key: 'nav', title: 'Main menu', fields: [], listOf: [text('label', 'Label'), text('href', 'Link')] },
  { key: 'cta', title: 'Header button', fields: [text('label', 'Label'), text('href', 'Link')] },
  { key: 'dock', title: 'Bottom dock', fields: [text('menuLabel', 'Menu label'), link('cta', 'Main button'), link('secondary', 'Second link')] },
  { key: 'socials', title: 'Social links', fields: [], listOf: [text('label', 'Short label (in, gh, ig…)'), text('href', 'Link')] },
  { key: 'footer', title: 'Footer', fields: [
    text('word', 'Big word'), text('pronunciation', 'Pronunciation'), area('definition', 'Definition', 'Wrap words in *stars* to colour them.'),
    text('credit', 'Credit line'), area('badge', 'Badge text'), list('legal', 'Legal links', [text('label', 'Label'), text('href', 'Link')], 'label'),
  ] },
  { key: 'transitionWords', title: 'Page transition words (the three bands)', fields: [], strings: true },
  { key: 'loader', title: 'Loader (site opening and going home)', fields: [{ kind: 'boolean', name: 'enabled', label: 'Show the loader when the site opens' }, text('text', 'Text under the counter')] },
  { key: 'detailCta', title: 'Detail page call to action', fields: [area('title', 'Title', ALT_HINT), link('button', 'Button')] },
]
