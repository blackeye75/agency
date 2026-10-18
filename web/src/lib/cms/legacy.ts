import type { Service } from './types'

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


// Earlier service bodies (the original samples and the October drafts); an unedited one shows the current copy.
export const LEGACY_SERVICE_BODIES: Record<string, string[]> = {
  "seo-performance": [
    "Rankings follow speed, structure and useful content. We audit your site, fix what slows it down, and build a plan for the searches your buyers make.\n\nYou get a clear report every month, in plain language.",
    "Ranking on Google is not about tricks. It is about a fast, well-structured website that clearly answers what people are searching for, backed by a reputation other websites are willing to link to. NexusBee is an SEO agency in India that combines engineering and marketing, so we can fix the technical problems most agencies only report on, and then build the content and authority that move you up the results page.\n\nWe are based in Noida and have more than seven years of experience building and optimising websites for businesses across India.\n\n## Our SEO services\n\n**Technical SEO audit and fixes.** We crawl your site the way Google does and fix what holds it back: indexing errors, duplicate content, broken links, redirect chains, missing canonical tags, poor internal linking, sitemap and robots.txt problems, and structured data errors. Because we are developers, we fix the issues ourselves instead of sending you a spreadsheet.\n\n**Core Web Vitals and page speed.** Google measures how quickly your pages load (LCP), respond (INP) and stay stable (CLS). We optimise images, fonts, scripts and hosting until your pages are fast on real mobile connections.\n\n**Keyword research and strategy.** We find the searches your buyers actually make, including commercial terms like \"best ... company in India\", and map one primary keyword and a few related terms to every page so pages do not compete with each other.\n\n**On-page SEO.** Titles, meta descriptions, headings, internal links, image alt text and content improvements on your most important pages.\n\n**Content that ranks.** Service pages, location pages, comparison pages and blog posts written for people first, structured for search engines and backed by your real expertise.\n\n**Local SEO.** Google Business Profile optimisation, consistent name, address and phone details across directories, review strategy and city pages for every location you serve.\n\n**Link building and digital PR.** Earning links from relevant Indian and industry websites through guest articles, partnerships, directories and expert quotes. No paid link farms.\n\n**Reporting that means something.** Monthly reports on rankings, organic traffic, leads and revenue from search, with a clear plan for the next month.\n\n## How we work\n\n1. **Audit** your website, competitors and current rankings.\n2. **Fix** technical issues and quick wins in the first weeks.\n3. **Build** content and authority month by month based on the keyword plan.\n4. **Measure** results in Google Search Console and Analytics, then refine.\n\nSEO compounds over time. Most clients see technical improvements and early ranking gains within the first three months, with bigger traffic and lead growth over six to twelve months.\n\n## SEO for AI search\n\nSearch is changing. Google AI Overviews, ChatGPT and Perplexity increasingly answer questions directly. We structure your content with clear answers, FAQs, structured data and an llms.txt file so AI tools can understand and cite your business.\n\n## Why choose NexusBee as your SEO agency\n\n- **Developers and marketers in one team**: technical issues get fixed, not just reported.\n- **White-hat only**: no shortcuts that risk a Google penalty.\n- **Focused on leads**: we measure enquiries and sales, not vanity traffic.\n- **Transparent**: you get access to every report, account and change we make.\n\n## Frequently asked questions\n\n### How long does SEO take to show results?\n\nTechnical fixes and quick wins often show results within weeks, but meaningful ranking and traffic growth usually takes three to six months, depending on your competition, website age and starting point.\n\n### Do you guarantee first-page rankings?\n\nNo honest agency can guarantee rankings, because Google controls them. We commit to a clear plan, transparent reporting and the work that consistently moves rankings, traffic and leads.\n\n### How much do SEO services cost in India?\n\nSEO is usually a monthly retainer based on the size of your website, your competition and how much content and link building you need. We share a written proposal after a free audit.\n\n### What is included in a technical SEO audit?\n\nCrawling and indexing, site speed and Core Web Vitals, mobile usability, duplicate content, redirects, canonical tags, internal linking, structured data, sitemap and robots.txt, plus a prioritised fix list.\n\n### Do you offer local SEO for multiple cities?\n\nYes. We optimise your Google Business Profile, keep your business details consistent across directories and build unique location pages for each city you serve.",
  ],
  "management-maintenance": [
    "Websites and apps need care. We keep yours secure, fast and up to date, and handle the small changes your team needs.\n\nEvery plan includes uptime monitoring and a 24-hour response time.",
    "A website is never finished. Plugins and frameworks need updates, security threats change, content gets stale and small bugs appear when browsers update. Left alone, a website slowly gets slower, less secure and less effective. NexusBee's website maintenance plans keep your site fast, secure and up to date, so you can focus on your business.\n\nWe are a Noida-based team with more than seven years of experience building and supporting websites, web applications and online stores for businesses across India.\n\n## What our website maintenance plans include\n\n- **Software updates**: CMS, framework, theme, plugin and dependency updates, tested on staging before they go live.\n- **Daily backups** stored off-site, with tested restores, so nothing is ever lost.\n- **Uptime monitoring** around the clock, with alerts to our team the moment your site goes down.\n- **Security**: SSL renewal, malware scans, firewall rules, spam protection for forms and fixes for known vulnerabilities.\n- **Performance checks**: regular Core Web Vitals and page speed reviews, image optimisation and caching.\n- **SEO health**: monitoring Google Search Console for crawl errors, broken links and indexing issues.\n- **Content updates**: new pages, text and image changes, blog uploads and banner updates done for you.\n- **Small improvements**: hours each month for new sections, forms, landing pages and design tweaks.\n- **Monthly report** summarising updates, uptime, speed, security and the work we completed.\n\n## Platforms we support\n\nWe maintain websites built with Next.js, React, WordPress, WooCommerce, Shopify and custom PHP or Node.js applications. If we did not build your site, we start with a short audit so we understand its code, hosting and risks before taking over.\n\n## Response times you can rely on\n\nEvery plan has a clear response time. Urgent issues such as downtime or a hacked site get immediate attention, and regular requests are handled within one business day. You get a single point of contact who knows your website, not a ticket queue.\n\n## Why maintenance matters\n\n- **Security**: most hacked websites run outdated software. Regular updates close those gaps.\n- **Speed**: slow sites lose visitors and rankings. Ongoing optimisation keeps pages fast.\n- **Reliability**: monitoring and backups mean problems are caught early and fixed quickly.\n- **Growth**: a steady stream of improvements keeps your website working as a sales tool instead of becoming outdated.\n\n## Why choose NexusBee for website maintenance\n\n- **Developers, not just support staff**: the people looking after your site can also fix complex problems and build new features.\n- **Predictable monthly pricing** with no surprise bills.\n- **Transparent reporting** of everything we do.\n- **No lock-in**: your hosting, code and accounts stay in your name.\n\n## Frequently asked questions\n\n### What does a website maintenance plan include?\n\nSoftware and security updates, daily backups, uptime monitoring, SSL management, speed and SEO checks, content updates and a set number of hours for small improvements each month, plus a monthly report.\n\n### How much does website maintenance cost in India?\n\nPlans are priced monthly based on the size and complexity of your website and how many hours of changes you need. We recommend a plan after a short review of your site.\n\n### Can you maintain a website that another agency built?\n\nYes. We start with an audit of the code, hosting and security, fix any urgent issues, then take over regular maintenance.\n\n### What happens if my website goes down?\n\nOur monitoring alerts us immediately. We investigate, restore service from backups if needed and tell you what happened and how we prevented it from happening again.\n\n### Do you maintain WordPress and Shopify websites?\n\nYes. We maintain WordPress, WooCommerce, Shopify, Next.js and custom websites and applications.",
  ],
  "digital-marketing": [
    "We plan, launch and optimise campaigns on Google, Meta and email, with tracking you can trust.\n\nCreative, landing pages and analytics come from the same team, so nothing gets lost between agencies.",
    "Clicks, likes and impressions are easy to buy. Leads and sales are not. NexusBee is a digital marketing agency in India that runs every campaign against one question: is it bringing in revenue at a cost that makes sense for your business? We plan, run and optimise campaigns across Google, Meta, LinkedIn, email and WhatsApp, with tracking set up properly from day one.\n\nWe are based in Noida and have more than seven years of experience helping businesses across India grow online.\n\n## Our digital marketing services\n\n**Google Ads.** Search, Performance Max, Shopping and YouTube campaigns built around high-intent keywords, tight ad groups, strong landing pages and negative keywords that stop wasted spend.\n\n**Meta Ads (Facebook and Instagram).** Prospecting and retargeting campaigns with creative testing, lead forms, catalogue ads for e-commerce and the Conversions API for accurate tracking.\n\n**LinkedIn Ads.** Account-based and job-title targeting for B2B companies that sell to specific industries and decision-makers.\n\n**Social media management.** Content calendars, posts, reels and community management for Instagram, LinkedIn, Facebook and YouTube that build your brand and support your paid campaigns.\n\n**Email and WhatsApp marketing.** Welcome series, nurture sequences, abandoned cart flows and broadcast campaigns that turn one-time visitors into repeat customers.\n\n**Landing pages and conversion rate optimisation.** Fast, focused landing pages for each campaign, with A/B tests on headlines, offers and forms.\n\n**Analytics and tracking.** GA4, Google Tag Manager, Meta Pixel and CRM integration so every lead and sale is attributed to the campaign that produced it.\n\n## How we run campaigns\n\n1. **Strategy**: we learn your margins, sales cycle and ideal customers, then set targets for cost per lead and return on ad spend.\n2. **Tracking setup**: conversion tracking is configured and tested before we spend a single rupee.\n3. **Launch**: campaigns go live with multiple ad creatives and audiences to test.\n4. **Optimise weekly**: we pause what does not work, scale what does and keep testing new ideas.\n5. **Report monthly**: clear reports on spend, leads, cost per lead, sales and next steps.\n\n## Built on a strong website\n\nAds send people to your website, so your website decides how much of your budget turns into enquiries. Because NexusBee also builds websites and landing pages, we fix slow pages, confusing forms and weak offers instead of just asking for a bigger budget.\n\n## Who we work with\n\nWe run campaigns for D2C and e-commerce brands, real estate developers, education and coaching businesses, healthcare providers, B2B and SaaS companies and local service businesses across India.\n\n## Why choose NexusBee as your digital marketing agency\n\n- **Revenue-focused**: we report on leads, sales and ROI, not vanity metrics.\n- **Full-funnel team**: ads, landing pages, SEO and automation under one roof.\n- **Transparent**: ad accounts are in your name and you see every rupee spent.\n- **No long lock-in contracts**: we keep clients by delivering results.\n\n## Frequently asked questions\n\n### How much should I spend on digital marketing in India?\n\nIt depends on your industry, competition and targets. We recommend starting with a test budget large enough to gather data across a few campaigns, then scaling what delivers the best cost per lead or return on ad spend.\n\n### Which is better for my business: Google Ads or Meta Ads?\n\nGoogle Ads captures people who are already searching for what you sell, so it usually brings higher-intent leads. Meta Ads is better for creating demand, building an audience and retargeting. Most businesses benefit from a mix, which we plan based on your goals.\n\n### How soon will I see results from paid ads?\n\nPaid campaigns can start bringing leads within days of launch. It usually takes a few weeks of testing and optimisation to reach a stable cost per lead.\n\n### Do I own the ad accounts?\n\nYes. All ad, analytics and tracking accounts are created in your name, and we work in them with access you control.\n\n### Do you also do SEO?\n\nYes. SEO builds long-term organic traffic while paid ads deliver faster results. Many clients combine both for steady, compounding growth.",
  ],
  "ai-agents-automation": [
    "AI is useful when it is connected to your real work. We build assistants that answer customers, agents that handle back-office tasks, and search over your own documents.\n\nWe start with one measurable use case, prove it, then expand.",
    "AI is useful when it takes real, repetitive work off your team's plate. NexusBee is an AI automation agency in India that builds practical AI agents and chatbots connected to your data and tools: assistants that answer customer questions, qualify leads, read documents, draft replies and keep your systems up to date.\n\nWe are based in Noida with more than seven years of experience building software and automation, and we build with leading AI models, including Claude, choosing the right one for each task.\n\n## AI solutions we build\n\n**AI chatbots for websites and WhatsApp.** Assistants trained on your products, services, policies and FAQs that answer questions around the clock in English, Hindi and other languages, collect lead details and hand over to a person when needed.\n\n**Lead qualification agents.** Agents that respond to new enquiries within seconds, ask the right questions, score leads, update your CRM and book meetings in your calendar.\n\n**Customer support automation.** Agents that draft replies, categorise and route tickets, summarise long conversations and look up order or account information.\n\n**Document processing.** Extracting data from invoices, purchase orders, forms, resumes and contracts into your systems, with a person reviewing exceptions.\n\n**Internal knowledge assistants.** A private assistant that answers your team's questions from your SOPs, policies, product docs and past projects.\n\n**Sales and research agents.** Researching prospects, preparing call briefs and drafting personalised outreach for your team to review.\n\n**AI features inside your product.** Search, summarisation, recommendations and copilots added to your web or mobile app.\n\n## How we build AI that works\n\n1. **Pick one measurable task.** We start with a repetitive job where we can measure hours saved or response time.\n2. **Prepare your knowledge.** We organise your documents and data so the AI gives accurate, up-to-date answers.\n3. **Build with guardrails.** Clear instructions, access controls, source references and limits on what the agent can do.\n4. **Keep a human in the loop.** At first, a person approves outputs. Automation increases as accuracy is proven.\n5. **Evaluate and monitor.** We test agents against real examples, log every conversation and keep improving accuracy.\n\n## Data privacy and security\n\nYour data stays under your control. We use business-grade AI APIs that do not train on your data, restrict access to what each agent needs, and log activity for review. Sensitive workflows can include redaction and approval steps.\n\n## Connected to your tools\n\nOur AI agents work with your website, WhatsApp Business, email, CRM (HubSpot, Zoho, Salesforce), Google Workspace, Microsoft 365, Slack, help desks and databases, often alongside our business process automation.\n\n## Why choose NexusBee as your AI automation agency\n\n- **Practical, not hype**: we start with use cases that save time in the first month.\n- **Engineering depth**: secure integrations, evaluation and monitoring, not just a prompt in a chat window.\n- **Model-agnostic**: we choose the best model for accuracy, speed and cost.\n- **Ownership**: accounts, data and code stay with you.\n\n## Frequently asked questions\n\n### What is an AI agent?\n\nAn AI agent is software that uses a language model to understand requests and take actions, such as looking up information, updating a CRM, drafting a reply or booking a meeting, within limits you define.\n\n### Can you build a WhatsApp chatbot for my business?\n\nYes. We build AI chatbots on the WhatsApp Business API that answer questions from your knowledge base, capture leads, share order updates and hand conversations to your team when needed.\n\n### Will the AI give wrong answers to customers?\n\nWe reduce this risk by grounding answers in your own documents, setting clear rules, testing against real questions and keeping a human in the loop until accuracy is proven. Agents are told to hand over to a person when they are unsure.\n\n### Is our business data safe?\n\nYes. We use business-grade AI APIs that do not use your data for training, restrict each agent's access and log activity. We can also add redaction for sensitive information.\n\n### How much does AI automation cost in India?\n\nIt depends on the use case, integrations and volume. Most clients start with one focused agent at a fixed price, plus a usage-based running cost for the AI model, then expand once the results are clear.",
  ],
}

// Original sample post bodies (44-63 words); an unedited one is shown as the full guide from ./seo-posts.
export const LEGACY_POST_BODIES: Record<string, string> = {
  "why-website-speed-wins-clients": "A slow site does not look broken, it just loses people.\n\n## What to measure\n\nLook at **Largest Contentful Paint**, **Interaction to Next Paint** and **Cumulative Layout Shift**. Google uses all three.\n\n## What to fix first\n\n1. Oversized images\n2. Render-blocking fonts and scripts\n3. Slow hosting and no caching\n\nFix those and most sites get twice as fast in a week.",
  "ai-agents-for-small-teams": "The best first AI project is boring: a task your team repeats every day.\n\n## Good first use cases\n\n- Answering common customer questions\n- Summarising calls and emails\n- Sorting and tagging incoming leads\n\n## Keep a human in the loop\n\nStart with drafts a person approves. When the drafts are reliably good, let the agent act on its own.",
  "shopify-or-custom-store": "## Shopify\n\nFastest to launch, great apps, monthly fees.\n\n## WooCommerce\n\nFlexible and familiar if you already run WordPress.\n\n## Custom\n\nWhen your catalogue, pricing or checkout does not fit a template.\n\nNot sure? Ask us for a free audit and we will recommend one in writing.",
}

// October 2026: nine services became five. Old slug -> the service that replaced it (next.config redirects the URLs too).
export const MERGED_SERVICES: Record<string, string> = {
  'corporate-web-design': 'website-app-development',
  'web-software-apps': 'website-app-development',
  'e-commerce': 'website-app-development',
  'mobile-apps': 'website-app-development',
  'business-automation': 'ai-agents-automation',
}

// The services that were added by that change.
export const ADDED_SERVICES = ['website-app-development']

// Original fields of the four services that stayed; an unedited field shows the new version.
export const LEGACY_SERVICES: Record<string, Pick<Service, 'title' | 'summary' | 'position' | 'features' | 'deliverables'>> = {
  "seo-performance": {
    "title": "SEO & performance",
    "summary": "Technical SEO, content structure and Core Web Vitals work that moves you up the results page.",
    "position": 3,
    "features": [
      {
        "title": "Technical audit",
        "text": "Crawl, indexation, schema and site speed checked in depth."
      },
      {
        "title": "Core Web Vitals",
        "text": "We make pages load and respond instantly."
      },
      {
        "title": "Content plan",
        "text": "Topics and pages mapped to real search demand."
      },
      {
        "title": "Local SEO",
        "text": "Google Business Profile and local listings tuned."
      }
    ],
    "deliverables": [
      {
        "text": "Free audit report"
      },
      {
        "text": "Speed optimisation"
      },
      {
        "text": "Keyword and content map"
      },
      {
        "text": "Schema markup"
      },
      {
        "text": "Monthly reporting"
      }
    ]
  },
  "management-maintenance": {
    "title": "Management & maintenance",
    "summary": "Updates, backups, monitoring and small improvements every month, so your site never falls behind.",
    "position": 4,
    "features": [
      {
        "title": "Security updates",
        "text": "Frameworks, plugins and servers kept patched."
      },
      {
        "title": "Backups",
        "text": "Daily backups with tested restores."
      },
      {
        "title": "Monitoring",
        "text": "Uptime and error alerts go straight to us."
      },
      {
        "title": "Change hours",
        "text": "Monthly hours for content and feature tweaks."
      }
    ],
    "deliverables": [
      {
        "text": "Monthly maintenance plan"
      },
      {
        "text": "Uptime monitoring"
      },
      {
        "text": "Backups"
      },
      {
        "text": "Priority support"
      },
      {
        "text": "Monthly health report"
      }
    ]
  },
  "digital-marketing": {
    "title": "Digital marketing",
    "summary": "Performance ads, social media and email campaigns measured against one thing: revenue.",
    "position": 6,
    "features": [
      {
        "title": "Paid ads",
        "text": "Google and Meta campaigns tuned every week."
      },
      {
        "title": "Social media",
        "text": "Content calendars and creatives that fit your brand."
      },
      {
        "title": "Email and WhatsApp",
        "text": "Automated flows that bring customers back."
      },
      {
        "title": "Tracking",
        "text": "Pixels, conversions and dashboards set up correctly."
      }
    ],
    "deliverables": [
      {
        "text": "Marketing plan"
      },
      {
        "text": "Ad campaigns"
      },
      {
        "text": "Landing pages"
      },
      {
        "text": "Creative assets"
      },
      {
        "text": "Monthly performance report"
      }
    ]
  },
  "ai-agents-automation": {
    "title": "AI agents & automation",
    "summary": "AI assistants, chatbots and agents built on Claude and other models, connected to your data and tools.",
    "position": 8,
    "features": [
      {
        "title": "Support assistants",
        "text": "Answer customers on your site and WhatsApp, around the clock."
      },
      {
        "title": "Internal agents",
        "text": "Draft, summarise, classify and update records for your team."
      },
      {
        "title": "Knowledge search",
        "text": "Ask questions over your documents and data."
      },
      {
        "title": "Safe by design",
        "text": "Guardrails, human review and clear logs."
      }
    ],
    "deliverables": [
      {
        "text": "Use-case workshop"
      },
      {
        "text": "AI agent or assistant"
      },
      {
        "text": "Tool and data integrations"
      },
      {
        "text": "Evaluation and guardrails"
      },
      {
        "text": "Usage dashboard"
      }
    ]
  }
}

// October-draft SEO fields of the two services whose scope grew; unedited ones show the current copy.
export const LEGACY_SERVICE_SEO: Record<string, { seo_title: string | null; seo_description: string | null }> = {
  "digital-marketing": {
    "seo_title": "Digital Marketing Agency in India | Google Ads, Meta Ads & Social Media · NexusBee",
    "seo_description": "Performance-focused digital marketing in India: Google Ads, Meta Ads, LinkedIn, social media, email and WhatsApp campaigns measured on leads, sales and ROI."
  },
  "ai-agents-automation": {
    "seo_title": "AI Automation Agency in India | AI Agents & Chatbot Development · NexusBee",
    "seo_description": "AI automation agency in India: custom AI agents, chatbots for WhatsApp and websites, document processing and workflow automation built on leading AI models."
  }
}
