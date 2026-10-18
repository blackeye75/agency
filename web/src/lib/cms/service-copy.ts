// Long-form, keyword-targeted copy for each of the five services (SEO title, description and Markdown body).
// The seed uses it for fresh installs; supabase/content/2026-10-services.sql loads it into a live database.
// A "## Frequently asked questions" block in a body becomes the page's FAQ section and FAQ rich result.

import type { Service } from './types'

type Copy = Pick<Service, 'seo_title' | 'seo_description' | 'body'>

export const SERVICE_COPY: Record<string, Copy> = {
  'website-app-development': {
    seo_title: 'Website & App Development Company in India | Web, Mobile & E-commerce · NexusBee',
    seo_description: 'Custom website, web application, e-commerce and mobile app development in India. Fast, SEO-ready and built to scale by a Noida team with 7+ years of experience.',
    body: `Your website or app is often the first serious conversation a buyer has with your business, and increasingly it is where the business itself runs: bookings, orders, client portals, dashboards and the tools your team uses every day. NexusBee designs and builds all of it under one roof, so your corporate website, web application, online store and mobile app share one standard of design, engineering and care.

We are a Noida-based website and app development company with more than seven years of experience building for startups, SMEs and established businesses across India. Every project is designed around your buyers and your workflows, built on modern, well-supported technology and handed over with full ownership.

## What we build

### Corporate and business websites
Fast, custom-designed websites that explain what you do in seconds, prove why you are credible and turn visitors into enquiries. Every site includes a content management system your team can use, technical SEO foundations, structured data and conversion tracking.

### Web applications and SaaS
Customer portals, dashboards, booking and marketplace platforms, internal tools and SaaS products. We plan the data model and user roles with you, design clear flows and ship in short sprints with a live staging environment.

### E-commerce stores
Shopify, WooCommerce and custom stores built for speed and conversion, with Indian payment gateways (Razorpay, PayU, Cashfree, UPI and cash on delivery), GST-ready invoicing, shipping integrations such as Shiprocket and Delhivery, and WhatsApp order updates.

### Mobile apps
Android and iOS apps from a single cross-platform codebase, with secure login, payments, push notifications, offline support and store submission handled for you.

### Integrations and APIs
Connections to CRMs, ERPs, accounting tools, payment gateways, WhatsApp and third-party APIs, so your website or app fits the systems you already use.

## Our technology

We build mostly with **TypeScript, React, Next.js and Node.js**, with **PostgreSQL** (often through Supabase) for data, and cross-platform frameworks for mobile. This stack is fast, secure and widely supported, so your in-house team or another partner can take over the code whenever you choose. Where you already have a platform, we work with it rather than rebuilding for the sake of it.

## How we work

| Phase | What happens | Typical duration |
| --- | --- | --- |
| Discovery | Goals, users, scope, integrations and success metrics agreed in writing | 1–2 weeks |
| Design | Wireframes, high-fidelity screens and a clickable prototype you approve | 1–3 weeks |
| Development | Short sprints with demos and a live staging link | 2–10 weeks |
| Quality and launch | Performance, SEO, accessibility, security and device testing, then go-live | 1 week |
| Support | Training, monitoring, updates and improvements on a monthly plan | Ongoing |

A focused company website typically launches in 4 to 8 weeks; web applications, large stores and mobile apps are delivered in phases.

## Built for performance and search

Every build has a performance budget so pages pass Core Web Vitals on mobile, along with clean markup, metadata, structured data, an XML sitemap and redirects from old URLs. A website that loads quickly and ranks well keeps paying back long after launch.

## Why businesses choose NexusBee

- **One team for every platform:** website, web app, store and mobile app built to one standard.
- **Fixed, written scope:** every template, feature and integration listed before work begins.
- **Engineering you can hand over:** typed, tested and documented code.
- **You own everything:** domain, code, hosting, app store and cloud accounts stay in your name.
- **Growth built in:** the same team can run [SEO](/services/seo-performance), [digital marketing](/services/digital-marketing) and [AI automation](/services/ai-agents-automation) once you launch.

## Frequently asked questions

### How much does website or app development cost in India?

It depends on the number of templates or screens, custom features, integrations and content. A focused company website costs far less than a web application, a large online store or a mobile app. After a short discovery call we send a fixed, itemised quote. Our guide to [website development costs in India](/blog/website-development-cost-india) explains what drives the price.

### How long does it take to build a website or app?

A company website usually takes 4 to 8 weeks. Web applications and mobile app MVPs typically take 8 to 14 weeks, and larger platforms are delivered in phases.

### Do you build e-commerce stores on Shopify and WooCommerce?

Yes. We build on Shopify, WooCommerce and custom stacks and recommend a platform in writing after discovery. Our comparison of [Shopify, WooCommerce and custom stores](/blog/shopify-or-custom-store) explains the trade-offs.

### Can you build both Android and iOS apps?

Yes. We build Android and iOS apps from one cross-platform codebase, which reduces cost and keeps both apps in step, and we handle store submission.

### Will we be able to update the website ourselves?

Yes. Every website comes with an easy content management system and a training session, so your team can edit pages, publish articles and update services without a developer.

### Do we own the code?

Yes. You own the code, design files, domain and every account from day one, and we provide documentation for a smooth handover.`,
  },

  'digital-marketing': {
    seo_title: 'Digital Marketing & Social Media Management Agency in India · NexusBee',
    seo_description: 'Digital marketing and social media management in India: Google Ads, Meta Ads, Instagram and LinkedIn management, content and email campaigns measured on leads and revenue.',
    body: `Clicks, likes and impressions are easy to buy. Qualified leads, sales and a brand people remember are not. NexusBee is a digital marketing and social media management agency that runs every campaign and every content calendar against one question: is it growing the business at a cost that makes sense?

We are based in Noida, with more than seven years of experience helping businesses across India grow online. Strategy, creative, paid media, social media, landing pages and analytics come from one team, so nothing gets lost between agencies.

## Social media management

Your social profiles are often where buyers check whether you are active, credible and worth contacting. We manage them end to end:

- **Strategy and content pillars** that reflect your brand, audience and goals.
- **Monthly content calendars** with posts, carousels, reels and stories for Instagram, LinkedIn, Facebook and YouTube.
- **Design and short-form video** produced to a consistent visual identity.
- **Community management:** replies to comments and messages, and escalation of enquiries to your team.
- **LinkedIn for B2B:** company page management and thought-leadership content for founders and leaders.
- **Monthly reporting** on reach, engagement, profile visits, website clicks and enquiries generated.

## Performance marketing

**Google Ads.** Search, Performance Max, Shopping and YouTube campaigns built around high-intent keywords, tight ad groups and landing pages designed for a single action.

**Meta Ads (Facebook and Instagram).** Prospecting and retargeting with structured creative testing, lead forms, catalogue ads and the Conversions API for accurate tracking.

**LinkedIn Ads.** Job-title and account-based targeting for B2B companies selling to specific industries and decision-makers.

**Email and WhatsApp marketing.** Welcome series, nurture sequences, abandoned-cart flows and broadcasts that turn one-time visitors into repeat customers.

## Landing pages and conversion

Ads and social posts send people to your website, so the page they land on decides how much of your budget turns into enquiries. Because NexusBee also [builds websites](/services/website-app-development), we create fast, focused landing pages and test headlines, offers and forms instead of simply asking for a bigger budget.

## Tracking you can trust

GA4, Google Tag Manager, Meta Pixel and Conversions API, and CRM integration are set up and tested before we spend a rupee, so every lead and sale can be traced back to the campaign or post that produced it.

## How we work

1. **Strategy:** goals, unit economics, audiences and channels agreed in writing, with targets for cost per lead or return on ad spend.
2. **Foundations:** tracking, profiles, brand templates and landing pages prepared.
3. **Launch:** campaigns and content calendars go live, with several creatives and audiences to test.
4. **Optimise weekly:** we cut what does not work and scale what does.
5. **Report monthly:** spend, leads, cost per lead, sales, engagement and next steps in plain language.

## Who we work with

D2C and e-commerce brands, real estate developers, education and coaching businesses, healthcare providers, B2B and SaaS companies and local service businesses across India.

## Why choose NexusBee

- **Revenue-focused:** we report on leads, sales and return on ad spend, not vanity metrics.
- **Social and performance together:** organic content and paid campaigns planned as one programme.
- **Full-funnel team:** creative, ads, landing pages, [SEO](/services/seo-performance) and [automation](/services/ai-agents-automation) under one roof.
- **Transparent:** ad accounts and social profiles stay in your name, and you see every rupee spent.

## Frequently asked questions

### What does social media management include?

Strategy, monthly content calendars, post and reel design, captions, scheduling, community management and monthly reporting across the platforms that matter to your audience, such as Instagram, LinkedIn, Facebook and YouTube.

### Which platforms should my business be on?

It depends on your audience. B2B companies usually focus on LinkedIn and Google; consumer brands on Instagram, Meta Ads and YouTube. We recommend a channel mix based on where your buyers spend time and how they buy.

### How much should I spend on digital marketing in India?

It depends on your industry, competition and targets. We recommend starting with a test budget large enough to compare a few campaigns, then scaling what delivers the best cost per lead or return on ad spend.

### How soon will we see results?

Paid campaigns can bring enquiries within days and usually stabilise after a few weeks of testing. Social media and SEO build steadily over months.

### Do we own our ad accounts and social profiles?

Yes. All ad, analytics and social accounts stay in your name, and we work in them with access you control.`,
  },

  'ai-agents-automation': {
    seo_title: 'AI Automation Agency in India | AI Agents, Chatbots & Business Process Automation · NexusBee',
    seo_description: 'AI agents, WhatsApp and website chatbots, document processing and business process automation for Indian businesses, built safely and connected to your tools.',
    body: `AI is useful when it takes real, repetitive work off your team's plate. NexusBee is an AI automation agency in India that builds practical AI agents, chatbots and business process automation connected to your data and tools: assistants that answer customers, workflows that move data between systems, and agents that qualify leads, read documents and keep your records up to date.

We are based in Noida with more than seven years of experience building software and automation, and we build with leading AI models, including Claude, choosing the right one for each task.

## AI agents and chatbots

**Website and WhatsApp assistants.** Trained on your products, services, policies and FAQs, they answer questions around the clock in English, Hindi and other languages, collect lead details and hand over to a person when needed.

**Lead qualification agents.** They respond to new enquiries within seconds, ask the right questions, score leads, update your CRM and book meetings in your calendar.

**Customer support automation.** Agents draft replies, categorise and route tickets, summarise long conversations and look up order or account information.

**Document processing.** Data from invoices, purchase orders, forms, resumes and contracts is extracted into your systems, with a person reviewing exceptions.

**Internal knowledge assistants.** A private assistant answers your team's questions from your SOPs, policies, product documents and past projects.

## Business process automation

Many tasks do not need AI at all, just reliable connections between your tools. We automate:

- **Lead capture and follow-up** from your website, ads, WhatsApp and marketplaces into your CRM.
- **Quotes, invoices and payment reminders,** including GST invoices and payment links.
- **Reports and dashboards** pulled together automatically from sales, marketing and finance tools.
- **Approvals** for purchases, leave and expenses, with reminders and an audit trail.
- **Data sync** between your CRM, ERP, e-commerce store, accounting software and spreadsheets.

We connect tools such as Google Workspace, Microsoft 365, Zoho, HubSpot, Salesforce, Tally, Razorpay, Shopify and WhatsApp Business, using platforms like Make, Zapier or n8n or custom integrations where you need more control, reliability or lower running costs.

## How we build automation that works

1. **Map the process** with your team and measure how long it takes today.
2. **Simplify first.** Automating a messy process just makes mess faster.
3. **Start with one measurable use case,** such as instant lead response or invoice processing.
4. **Build with guardrails:** clear instructions, limited access, logging and human review where it matters.
5. **Evaluate and monitor:** we test against real examples before launch and track accuracy and time saved afterwards.
6. **Scale what works** to the next process.

## Data privacy and security

Your data stays under your control. We use business-grade AI services that do not train on your data, restrict each automation to the data it needs, log activity and keep human review for sensitive decisions, in line with India's Digital Personal Data Protection Act.

## Why choose NexusBee as your AI automation agency

- **Practical, not hype:** use cases that save time in the first month.
- **AI and automation together:** we use rules where rules work and AI where judgement is needed.
- **Engineering depth:** secure integrations, evaluation and monitoring, not just a chatbot widget.
- **Ownership:** accounts, data and code stay with you.

Read our guides to [AI automation use cases for Indian businesses](/blog/ai-automation-for-small-business-india) and [getting started with AI agents](/blog/ai-agents-for-small-teams).

## Frequently asked questions

### What is the difference between AI agents and business process automation?

Business process automation follows fixed rules, such as adding every website lead to your CRM. AI agents handle tasks that need understanding, such as reading an email, answering a question or extracting data from an invoice. Most workflows combine both.

### Can you build a WhatsApp chatbot for my business?

Yes. We build AI assistants on the WhatsApp Business API that answer questions from your knowledge base, capture leads, share order updates and hand conversations to your team when needed.

### Will the AI give wrong answers to customers?

We reduce this risk by grounding answers in your own documents, setting clear rules, testing against real questions and keeping a person in the loop until accuracy is proven. Assistants hand over when they are unsure.

### Which tools can you connect?

Common ones include Google Workspace, Microsoft 365, Zoho, HubSpot, Salesforce, Tally, Razorpay, Shopify, WooCommerce, WhatsApp Business and Slack, plus most tools that offer an API.

### How much does AI automation cost in India?

It depends on the use case, integrations and volume. Most clients start with one focused automation at a fixed price, plus modest running costs for AI usage, then expand once the results are clear.`,
  },

  'seo-performance': {
    seo_title: 'SEO Agency in India | Technical SEO, Local SEO & Core Web Vitals · NexusBee',
    seo_description: 'SEO services in India from NexusBee: technical SEO audits, Core Web Vitals, local SEO, content strategy and link building that bring qualified leads, not just traffic.',
    body: `Ranking on Google is not about tricks. It is about a fast, well-structured website that clearly answers what people are searching for, backed by a reputation other websites are willing to link to. NexusBee is an SEO agency in India that combines engineering and marketing, so we can fix the technical problems most agencies only report on, and then build the content and authority that move you up the results page.

We are based in Noida and have more than seven years of experience building and optimising websites for businesses across India.

## Our SEO services

**Technical SEO audit and fixes.** We crawl your site the way Google does and fix what holds it back: indexing errors, duplicate content, broken links, redirect chains, missing canonical tags, poor internal linking, sitemap and robots.txt problems, and structured data errors. Because we are developers, we fix the issues ourselves instead of sending you a spreadsheet.

**Core Web Vitals and page speed.** Google measures how quickly your pages load (LCP), respond (INP) and stay stable (CLS). We optimise images, fonts, scripts and hosting until your pages are fast on real mobile connections.

**Keyword research and strategy.** We find the searches your buyers actually make, including commercial terms like "best ... company in India", and map one primary keyword and a few related terms to every page so pages do not compete with each other.

**On-page SEO.** Titles, meta descriptions, headings, internal links, image alt text and content improvements on your most important pages.

**Content that ranks.** Service pages, location pages, comparison pages and blog posts written for people first, structured for search engines and backed by your real expertise.

**Local SEO.** Google Business Profile optimisation, consistent name, address and phone details across directories, review strategy and city pages for every location you serve.

**Link building and digital PR.** Earning links from relevant Indian and industry websites through guest articles, partnerships, directories and expert quotes. No paid link farms.

**Reporting that means something.** Monthly reports on rankings, organic traffic, leads and revenue from search, with a clear plan for the next month.

## How we work

1. **Audit** your website, competitors and current rankings.
2. **Fix** technical issues and quick wins in the first weeks.
3. **Build** content and authority month by month based on the keyword plan.
4. **Measure** results in Google Search Console and Analytics, then refine.

SEO compounds over time. Most clients see technical improvements and early ranking gains within the first three months, with bigger traffic and lead growth over six to twelve months.

## SEO for AI search

Search is changing. Google AI Overviews, ChatGPT and Perplexity increasingly answer questions directly. We structure your content with clear answers, FAQs, structured data and an llms.txt file so AI tools can understand and cite your business.

## Why choose NexusBee as your SEO agency

- **Developers and marketers in one team**: technical issues get fixed, not just reported.
- **White-hat only**: no shortcuts that risk a Google penalty.
- **Focused on leads**: we measure enquiries and sales, not vanity traffic.
- **Transparent**: you get access to every report, account and change we make.

## Frequently asked questions

### How long does SEO take to show results?

Technical fixes and quick wins often show results within weeks, but meaningful ranking and traffic growth usually takes three to six months, depending on your competition, website age and starting point.

### Do you guarantee first-page rankings?

No honest agency can guarantee rankings, because Google controls them. We commit to a clear plan, transparent reporting and the work that consistently moves rankings, traffic and leads.

### How much do SEO services cost in India?

SEO is usually a monthly retainer based on the size of your website, your competition and how much content and link building you need. We share a written proposal after a free audit.

### What is included in a technical SEO audit?

Crawling and indexing, site speed and Core Web Vitals, mobile usability, duplicate content, redirects, canonical tags, internal linking, structured data, sitemap and robots.txt, plus a prioritised fix list.

### Do you offer local SEO for multiple cities?

Yes. We optimise your Google Business Profile, keep your business details consistent across directories and build unique location pages for each city you serve.`,
  },

  'management-maintenance': {
    seo_title: 'Website Maintenance Services in India | Updates, Security & Support · NexusBee',
    seo_description: 'Monthly website maintenance in India: updates, backups, security, uptime monitoring, speed checks and content changes with a 24-hour response time.',
    body: `A website is never finished. Plugins and frameworks need updates, security threats change, content gets stale and small bugs appear when browsers update. Left alone, a website slowly gets slower, less secure and less effective. NexusBee's website maintenance plans keep your site fast, secure and up to date, so you can focus on your business.

We are a Noida-based team with more than seven years of experience building and supporting websites, web applications and online stores for businesses across India.

## What our website maintenance plans include

- **Software updates**: CMS, framework, theme, plugin and dependency updates, tested on staging before they go live.
- **Daily backups** stored off-site, with tested restores, so nothing is ever lost.
- **Uptime monitoring** around the clock, with alerts to our team the moment your site goes down.
- **Security**: SSL renewal, malware scans, firewall rules, spam protection for forms and fixes for known vulnerabilities.
- **Performance checks**: regular Core Web Vitals and page speed reviews, image optimisation and caching.
- **SEO health**: monitoring Google Search Console for crawl errors, broken links and indexing issues.
- **Content updates**: new pages, text and image changes, blog uploads and banner updates done for you.
- **Small improvements**: hours each month for new sections, forms, landing pages and design tweaks.
- **Monthly report** summarising updates, uptime, speed, security and the work we completed.

## Platforms we support

We maintain websites built with Next.js, React, WordPress, WooCommerce, Shopify and custom PHP or Node.js applications. If we did not build your site, we start with a short audit so we understand its code, hosting and risks before taking over.

## Response times you can rely on

Every plan has a clear response time. Urgent issues such as downtime or a hacked site get immediate attention, and regular requests are handled within one business day. You get a single point of contact who knows your website, not a ticket queue.

## Why maintenance matters

- **Security**: most hacked websites run outdated software. Regular updates close those gaps.
- **Speed**: slow sites lose visitors and rankings. Ongoing optimisation keeps pages fast.
- **Reliability**: monitoring and backups mean problems are caught early and fixed quickly.
- **Growth**: a steady stream of improvements keeps your website working as a sales tool instead of becoming outdated.

## Why choose NexusBee for website maintenance

- **Developers, not just support staff**: the people looking after your site can also fix complex problems and build new features.
- **Predictable monthly pricing** with no surprise bills.
- **Transparent reporting** of everything we do.
- **No lock-in**: your hosting, code and accounts stay in your name.

## Frequently asked questions

### What does a website maintenance plan include?

Software and security updates, daily backups, uptime monitoring, SSL management, speed and SEO checks, content updates and a set number of hours for small improvements each month, plus a monthly report.

### How much does website maintenance cost in India?

Plans are priced monthly based on the size and complexity of your website and how many hours of changes you need. We recommend a plan after a short review of your site.

### Can you maintain a website that another agency built?

Yes. We start with an audit of the code, hosting and security, fix any urgent issues, then take over regular maintenance.

### What happens if my website goes down?

Our monitoring alerts us immediately. We investigate, restore service from backups if needed and tell you what happened and how we prevented it from happening again.

### Do you maintain WordPress and Shopify websites?

Yes. We maintain WordPress, WooCommerce, Shopify, Next.js and custom websites and applications.`,
  },
}
