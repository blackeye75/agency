import { getPosts, getServices, getSettings } from '@/lib/cms/queries'
import { INDIA, LOCATIONS } from '@/lib/locations'
import { BUSINESS, abs } from '@/lib/seo'

// llms.txt (llmstxt.org): a plain summary of the site for AI search tools.
export async function GET() {
  const [settings, services, posts] = await Promise.all([getSettings(), getServices(), getPosts()])
  const body = [
    `# ${BUSINESS.legalName}`,
    '',
    `> ${INDIA.seoDescription}`,
    '',
    `${BUSINESS.legalName} is headquartered in ${BUSINESS.locality}, ${BUSINESS.region}, India, founded in ${BUSINESS.foundingDate}, and serves clients across India, including ${LOCATIONS.map((l) => l.name).join(', ')}. Contact: ${settings.contact.email}, ${settings.contact.phone}.`,
    '',
    '## Services',
    ...services.filter((s) => s.published).map((s) => `- [${s.title}](${abs(`/services/${s.slug}`)}): ${s.summary}`),
    '',
    '## Locations',
    `- [Digital agency in India](${abs('/locations')}): ${INDIA.intro}`,
    ...LOCATIONS.map((l) => `- [${l.name}](${abs(`/locations/${l.slug}`)}): ${l.intro}`),
    '',
    '## Blog',
    ...posts.filter((p) => p.published).map((p) => `- [${p.title}](${abs(`/blog/${p.slug}`)}): ${p.excerpt}`),
    '',
    '## Optional',
    `- [Projects](${abs('/projects')}): selected websites, software, stores and apps`,
    `- [Get a quote](${abs('/quote')})`,
    `- [Contact](${abs('/contact')})`,
    '',
  ].join('\n')
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
