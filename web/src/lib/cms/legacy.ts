// SEO titles and descriptions the site shipped with before October 2026. A live row still holding one of
// these was never edited, so the current keyword-targeted default is shown instead of the generic one.
export const LEGACY_SITE_SEO = {
  titles: ['NexusBee · Digital 360 agency', 'NexusBee · Website Development, Digital Marketing & AI Automation Agency in India'],
  descriptions: [
    'NexusBee designs, builds and grows digital products: websites, web software, e-commerce, mobile apps, SEO, marketing and AI automation.',
    'NexusBee is a Noida-based digital agency with 7+ years of experience in website development, web apps, e-commerce, mobile apps, SEO, digital marketing and AI automation for businesses across India.',
  ],
}

export const LEGACY_PAGE_SEO: Record<string, { seo_title: string; seo_description: string }> = {
  services: { seo_title: 'Services · NexusBee', seo_description: 'Nine ways we help brands grow in digital, from corporate websites to AI agents.' },
  projects: { seo_title: 'Projects · NexusBee', seo_description: 'Selected websites, software, stores and apps we designed and built.' },
  blog: { seo_title: 'Blog · NexusBee', seo_description: 'Notes on design, engineering, SEO and growth from the NexusBee team.' },
  contact: { seo_title: 'Contact · NexusBee', seo_description: 'Tell us about your project. We reply within 24 hours.' },
  quote: { seo_title: 'Get a quote · NexusBee', seo_description: 'Pick the services you need, share a budget and get a fixed quote.' },
}


// Original two-paragraph service bodies; an unedited one is shown as the long-form copy from ./service-copy.
export const LEGACY_SERVICE_BODIES: Record<string, string> = {
  "corporate-web-design": "Your website is often the first meeting with a client. We design and build corporate sites that feel premium, load instantly and are easy for your team to update.\n\nEvery site comes with a content management system, SEO foundations and analytics, so it keeps working after launch.",
  "web-software-apps": "When a spreadsheet or an off-the-shelf tool stops being enough, we build the software your business actually needs.\n\nWe plan the data model with you, design the flows, and ship in short sprints with a live staging link.",
  "e-commerce": "We build stores that sell: quick product pages, a checkout without friction, and the back-office tools you need to run it.\n\nPayments with Razorpay or Stripe, shipping with Shiprocket, and marketing pixels are set up and tested before launch.",
  "seo-performance": "Rankings follow speed, structure and useful content. We audit your site, fix what slows it down, and build a plan for the searches your buyers make.\n\nYou get a clear report every month, in plain language.",
  "management-maintenance": "Websites and apps need care. We keep yours secure, fast and up to date, and handle the small changes your team needs.\n\nEvery plan includes uptime monitoring and a 24-hour response time.",
  "business-automation": "Most teams lose hours a week copying data between apps. We map your processes and automate them with n8n, Zapier or custom code.\n\nThe result: fewer mistakes, faster responses and a team focused on real work.",
  "digital-marketing": "We plan, launch and optimise campaigns on Google, Meta and email, with tracking you can trust.\n\nCreative, landing pages and analytics come from the same team, so nothing gets lost between agencies.",
  "mobile-apps": "We design and build mobile apps that feel native, work offline and are a joy to use.\n\nOne codebase for both platforms keeps costs down, and we handle store submission and updates.",
  "ai-agents-automation": "AI is useful when it is connected to your real work. We build assistants that answer customers, agents that handle back-office tasks, and search over your own documents.\n\nWe start with one measurable use case, prove it, then expand.",
}

// Original sample post bodies (44-63 words); an unedited one is shown as the full guide from ./seo-posts.
export const LEGACY_POST_BODIES: Record<string, string> = {
  "why-website-speed-wins-clients": "A slow site does not look broken, it just loses people.\n\n## What to measure\n\nLook at **Largest Contentful Paint**, **Interaction to Next Paint** and **Cumulative Layout Shift**. Google uses all three.\n\n## What to fix first\n\n1. Oversized images\n2. Render-blocking fonts and scripts\n3. Slow hosting and no caching\n\nFix those and most sites get twice as fast in a week.",
  "ai-agents-for-small-teams": "The best first AI project is boring: a task your team repeats every day.\n\n## Good first use cases\n\n- Answering common customer questions\n- Summarising calls and emails\n- Sorting and tagging incoming leads\n\n## Keep a human in the loop\n\nStart with drafts a person approves. When the drafts are reliably good, let the agent act on its own.",
  "shopify-or-custom-store": "## Shopify\n\nFastest to launch, great apps, monthly fees.\n\n## WooCommerce\n\nFlexible and familiar if you already run WordPress.\n\n## Custom\n\nWhen your catalogue, pricing or checkout does not fit a template.\n\nNot sure? Ask us for a free audit and we will recommend one in writing.",
}
