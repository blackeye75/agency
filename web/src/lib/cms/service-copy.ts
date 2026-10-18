// Long-form, keyword-targeted copy for each service (SEO title, description and Markdown body).
// The seed uses it for fresh installs; supabase/content/2026-10-service-copy.sql loads it into a live database.
// A "## Frequently asked questions" block in a body becomes the page's FAQ section and FAQ rich result.

import type { Service } from './types'

type Copy = Pick<Service, 'seo_title' | 'seo_description' | 'body'>

export const SERVICE_COPY: Record<string, Copy> = {
  'corporate-web-design': {
    seo_title: 'Website Development Company in India | Corporate Website Design · NexusBee',
    seo_description: 'Custom website design and development for Indian businesses. Fast, SEO-ready corporate websites with an easy CMS, built by a Noida team with 7+ years of experience.',
    body: `Your website is usually the first meeting a buyer has with your company, and it often happens before you know they exist. They compare you with two or three competitors on their phone, decide in seconds whether you look credible, and either send an enquiry or close the tab. NexusBee designs and builds corporate websites that win that moment: clear about what you do, fast on every device and easy for your team to keep up to date.

We are a website development company based in Noida, and for more than seven years we have built websites for startups, SMEs and established businesses across India. Every site is designed from scratch around your brand and your buyers. No recycled themes, no page builders that slow everything down.

## What a NexusBee website includes

- **Custom design** based on your brand, your audience and the action you want visitors to take.
- **Responsive development** that is tested on real phones, tablets and desktops, not just a resized browser window.
- **A content management system** so your team can edit text, images, pages, services, case studies and blog posts without calling a developer.
- **Technical SEO built in**: clean HTML, one H1 per page, meta tags, canonical URLs, an XML sitemap, robots.txt and structured data for Google.
- **Performance budgets**: we aim to pass Core Web Vitals on mobile, with optimised images, lean code and fast hosting.
- **Conversion tracking**: enquiry forms, click-to-call and WhatsApp buttons connected to Google Analytics and your CRM.
- **Accessibility**: readable contrast, keyboard navigation and screen-reader labels, because a site everyone can use converts better.
- **Security basics**: HTTPS, spam-protected forms, regular updates and backups.

## Our website development process

**1. Discovery.** We learn about your business, your customers and your competitors, review your current website and analytics, and agree on goals such as more enquiries, better-quality leads or a stronger brand.

**2. Structure and content.** We plan the sitemap, the page structure and the keywords each page should rank for. If you need help with copy, we write it with you.

**3. Design.** You see wireframes first, then high-fidelity designs for desktop and mobile. Nothing is built until you approve the screens.

**4. Development.** We build in short sprints on a live staging link, so you can click through progress every few days instead of waiting for a big reveal.

**5. Launch.** Before go-live we run performance, SEO, accessibility and cross-browser checks, set up redirects from your old URLs so you keep your Google rankings, and connect analytics.

**6. Support.** After launch we train your team on the CMS and offer monthly maintenance plans for updates, backups, monitoring and improvements.

## Built to rank, not just to look good

A beautiful website that nobody finds is an expensive brochure. Every page we build targets a clear search intent, loads quickly and carries the structured data Google uses for rich results. For businesses that serve specific cities, we add location pages and local SEO so you show up for searches like "website development company near me".

## Who we build websites for

We work with manufacturers, professional services firms, healthcare providers, education businesses, real estate developers, SaaS companies and D2C brands across India, including Delhi NCR, Mumbai, Pune, Bangalore and Hyderabad. Some clients need a five-page company site; others need a multilingual website with hundreds of pages, a resource library and integrations with their CRM or ERP.

## Why choose NexusBee as your website development company

- **One team from design to growth**: the people who build your website also understand SEO, marketing and automation.
- **Fixed, written scope**: you know exactly which pages and features you are paying for.
- **You own everything**: domain, code, hosting and content stay in your name.
- **Long-term support**: we are still here after launch, with clear response times.

## Frequently asked questions

### How much does website development cost in India?

It depends on the number of pages, custom design work, integrations and content. A focused company website costs far less than a large multilingual site or a web application. After a short discovery call we send a fixed quote, so the price does not change halfway through the project.

### How long does it take to build a corporate website?

Most company websites take 4 to 8 weeks from discovery to launch. Larger sites with many templates, integrations or content migration take longer and are planned in milestones.

### Will I be able to update the website myself?

Yes. Every website comes with an easy content management system and a training session, so your team can edit pages, add blog posts and update services without a developer.

### Will my new website be SEO-friendly?

Yes. Technical SEO is part of every build: fast pages, clean markup, meta tags, an XML sitemap, structured data and redirects from your old URLs so you keep existing rankings.

### Do you redesign existing websites?

Yes. We audit your current site, keep what works, fix what does not and migrate your content and URLs carefully, so the redesign improves your search performance instead of resetting it.`,
  },

  'web-software-apps': {
    seo_title: 'Custom Web Application Development Company in India | SaaS & Portals · NexusBee',
    seo_description: 'Custom web application development in India: SaaS products, dashboards, customer portals and internal tools built with Next.js, React and Node.js by a team with 7+ years of experience.',
    body: `Off-the-shelf software fits most businesses until it suddenly does not. Your team starts exporting spreadsheets, copying data between tools and building workarounds for things the software should simply do. That is when a custom web application pays for itself. NexusBee designs and builds web software that fits the way your business actually works: SaaS products, customer portals, dashboards and internal tools.

We are a web application development company in Noida with more than seven years of experience building software for startups and growing businesses across India. Our engineers write clean, typed and tested code, and our designers make sure the result is pleasant to use every day.

## What we build

- **SaaS products and MVPs**: from the first version you put in front of users to a multi-tenant platform with billing, roles and an admin panel.
- **Customer and partner portals**: self-service portals for orders, bookings, documents, support tickets and account management.
- **Dashboards and reporting**: real-time views of sales, operations and finance data pulled from your existing systems.
- **Internal tools**: approval workflows, inventory and job tracking, CRM extensions and back-office tools that replace fragile spreadsheets.
- **Marketplaces and booking platforms**: listings, search, payments, availability and notifications.
- **APIs and integrations**: connecting your application with payment gateways like Razorpay and Stripe, CRMs, ERPs, WhatsApp, email and accounting tools.

## Our technology

We build mostly with **TypeScript, React, Next.js and Node.js**, with **PostgreSQL** (often via Supabase) for data. This stack is fast, well supported and easy to hire for, so your in-house team can take over the code whenever you are ready. We deploy to reliable cloud platforms such as Vercel and AWS, with automated backups, monitoring and error tracking.

When you already have a stack, we work with it rather than rewriting everything.

## How we run a software project

**Discovery and scoping.** We map your users, workflows and data, then agree on the smallest version that delivers real value. A tight first release gets you feedback sooner and costs less.

**Design and prototyping.** Clickable prototypes let you test flows with real users before we write production code.

**Development in sprints.** Two-week sprints with a demo at the end of each one and a live staging environment you can use at any time. You always know what is done, what is next and what it costs.

**Quality and security.** Automated tests, code review, role-based access control, input validation and secure handling of personal data are part of every sprint, not an afterthought.

**Launch and growth.** We handle deployment, monitoring and a smooth handover, then keep improving the product on a monthly retainer if you want us to.

## Why businesses choose NexusBee for custom software

- **Product thinking**: we question requirements and help you cut scope that does not move the needle.
- **Transparent pricing**: fixed-price phases or a monthly team, agreed in writing.
- **Handover-ready code**: documented, typed and tested, so you are never locked in.
- **Full ownership**: the code, data and cloud accounts belong to you.
- **One partner**: the same team can build the marketing website, run growth campaigns and add AI features later.

## Frequently asked questions

### How much does custom web application development cost in India?

Cost depends on the number of user roles, screens, integrations and the level of security and scale required. We usually start with a fixed-price discovery phase, then quote the first release in writing so you can budget with confidence.

### How long does it take to build an MVP?

A focused MVP typically takes 8 to 12 weeks from discovery to launch. We help you define the smallest version that proves your idea, then grow it based on real user feedback.

### Which technologies do you use for web applications?

Mostly TypeScript, React, Next.js and Node.js with PostgreSQL, deployed on Vercel or AWS. We adapt to your existing stack when that is the better choice.

### Will we own the source code?

Yes. You own the code, the data and every cloud account from day one. We hand over documentation so your team or another vendor can continue the work.

### Can you take over an existing application?

Yes. We start with a code and security audit, fix the most urgent issues, then continue development in regular sprints.`,
  },

  'e-commerce': {
    seo_title: 'E-commerce Website Development Company in India | Shopify & WooCommerce · NexusBee',
    seo_description: 'E-commerce website development in India: fast Shopify, WooCommerce and custom online stores with Razorpay payments, shipping, GST invoices and marketing built in.',
    body: `Online shoppers in India are impatient. They browse on mobile data, compare prices across marketplaces and leave the moment a page is slow or a checkout step is confusing. NexusBee builds e-commerce websites that are fast, easy to buy from and simple to manage, so more visitors become customers and more customers come back.

We are an e-commerce website development company based in Noida with more than seven years of experience building stores for D2C brands, retailers, manufacturers and wholesalers across India.

## Shopify, WooCommerce or custom: we help you choose

**Shopify** is the fastest way to launch a polished store, with reliable hosting, a huge app ecosystem and easy day-to-day management. It suits most D2C brands.

**WooCommerce** makes sense if you already run WordPress, need full control over hosting or want to avoid monthly platform fees.

**A custom store** built with Next.js and a headless commerce backend is the right choice when your catalogue, pricing, subscriptions or B2B ordering do not fit a template, or when speed and design freedom are your competitive edge.

We recommend a platform in writing after a short discovery call, based on your catalogue, budget, team and growth plans.

## What your online store includes

- **Conversion-focused design** with clear product pages, honest reviews, size guides and trust signals.
- **Fast, mobile-first performance**, with optimised images and lean themes that pass Core Web Vitals.
- **Indian payments**: Razorpay, PayU, Cashfree, UPI, cards, net banking, wallets and cash on delivery.
- **Shipping and logistics** through Shiprocket, Delhivery or your own couriers, with pin code checks and tracking.
- **GST-ready invoices**, tax settings and accounting integrations.
- **WhatsApp and email automation** for abandoned carts, order updates and repeat purchases.
- **SEO foundations**: clean URLs, product and breadcrumb structured data, collection pages that target real searches and an XML sitemap.
- **Analytics and ads tracking**: GA4 e-commerce events, Meta Pixel and Conversions API, and Google Merchant Center feeds.

## Beyond launch: growing your store

A store launch is the start, not the finish. We help you grow with SEO for category and product pages, performance marketing on Google Shopping and Meta, email and WhatsApp flows, and regular conversion rate optimisation based on real data. Our maintenance plans cover updates, backups, uptime monitoring and new features every month.

## Migrating an existing store

Moving from another platform? We migrate products, customers, orders and content, then set up 301 redirects from every old URL so you keep your search rankings and backlinks.

## Why brands choose NexusBee for e-commerce development

- **Speed first**: fast stores sell more, especially on mobile.
- **Honest platform advice**: we recommend what fits your business, not what is easiest for us.
- **One team for build and growth**: development, SEO, ads and automation under one roof.
- **You own your store**: accounts, data and domain stay in your name.

## Frequently asked questions

### How much does an e-commerce website cost in India?

It depends on the platform, the number of products and custom features such as subscriptions, B2B pricing or marketplace integrations. A Shopify store is usually the most affordable to launch; custom stores cost more but offer full control. We send a fixed quote after a discovery call.

### Should I choose Shopify or WooCommerce?

Shopify is best if you want a reliable store that is easy to run with little technical effort. WooCommerce suits businesses already on WordPress or those who want full control over hosting. We will recommend one in writing based on your needs.

### Can you integrate Razorpay, UPI and cash on delivery?

Yes. We integrate Razorpay, PayU, Cashfree and other Indian payment gateways with UPI, cards, net banking, wallets and cash on delivery, plus shipping partners like Shiprocket and Delhivery.

### How long does it take to build an online store?

A Shopify or WooCommerce store usually takes 4 to 8 weeks, depending on the catalogue and integrations. Custom stores take longer and are delivered in milestones.

### Will my store be optimised for Google?

Yes. We set up SEO-friendly URLs, product structured data, collection pages that target real searches, an XML sitemap and fast page speed, and we can run ongoing SEO after launch.`,
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

  'business-automation': {
    seo_title: 'Business Process Automation Services in India | Workflow Automation · NexusBee',
    seo_description: 'Business process automation in India: connect your CRM, forms, WhatsApp, sheets and accounting tools to automate leads, invoices, reports and approvals.',
    body: `Every business has work that follows the same steps every day: copying leads from a form into a CRM, sending quotes, chasing payments, updating spreadsheets, preparing weekly reports and getting approvals by email. Each task takes a few minutes, but together they eat hours of your team's week and cause mistakes. NexusBee's business process automation services connect your tools so that work runs itself.

We are a Noida-based team with more than seven years of experience building software and automation for businesses across India.

## What we automate

- **Lead management**: capture leads from your website, ads, WhatsApp and marketplaces, add them to your CRM, assign them to the right salesperson and send instant follow-ups.
- **Sales and quotations**: generate quotes and proposals from templates, send them for approval and track their status.
- **Invoicing and payments**: create GST invoices, send payment links, record payments in your accounting software and remind customers automatically.
- **Reporting**: pull data from sales, marketing and operations tools into dashboards and scheduled reports.
- **Approvals**: purchase requests, leave requests and expense claims routed to the right person with reminders and an audit trail.
- **Customer onboarding**: welcome emails, document collection, account setup and task lists triggered automatically when a deal closes.
- **Data sync**: keep your CRM, ERP, e-commerce store, spreadsheets and email tools in step without manual copy and paste.

## Tools we work with

We connect tools such as Google Workspace, Microsoft 365, Zoho, HubSpot, Salesforce, Tally, Razorpay, Shopify, WooCommerce, WhatsApp Business, Slack and many more. Depending on the job, we use automation platforms like Make, Zapier or n8n, or write custom integrations when you need more control, better reliability or lower running costs.

## Our approach

**1. Map the process.** We sit with your team, document how the work happens today and measure how long it takes.

**2. Fix the process first.** Automating a messy process just makes mess faster. We simplify the steps before we automate them.

**3. Start with one high-value workflow.** We pick the task that saves the most time or prevents the most errors, automate it and measure the result.

**4. Scale what works.** Once the first automation proves its value, we roll out the next ones.

**5. Monitor and maintain.** Every automation has logging and error alerts, so failures are caught and fixed quickly.

## Add AI where it helps

Some steps need judgement, such as reading an email, classifying a support request or extracting data from an invoice. We add AI to these steps with a person reviewing the output until the results are reliable. See our AI agents and automation service for more.

## Why choose NexusBee for business automation

- **Process first, tools second**: we design the workflow before choosing the platform.
- **Measurable results**: we track hours saved and errors prevented.
- **Reliable and documented**: every automation is logged, monitored and explained to your team.
- **No lock-in**: accounts and workflows are set up in your name.

## Frequently asked questions

### What is business process automation?

It means using software to perform repetitive, rule-based tasks, such as moving data between tools, sending follow-ups and generating invoices, so your team can focus on work that needs human judgement.

### Which business processes should we automate first?

Start with tasks that are frequent, time-consuming and follow clear rules, such as lead capture and follow-up, invoicing and reporting. We help you pick the workflow with the best return.

### Do you use Zapier, Make or custom code?

All three. Platforms like Zapier, Make and n8n are quick to set up; custom integrations are better for complex, high-volume or sensitive workflows. We recommend the right option for each process.

### How much does business automation cost?

It depends on the number of workflows, tools and how complex the logic is. Most clients start with one workflow at a fixed price, then add more once they see the time saved.

### Can you automate WhatsApp messages and follow-ups?

Yes. We use the WhatsApp Business API to send order updates, reminders and follow-ups and to route incoming messages to your team or CRM.`,
  },

  'digital-marketing': {
    seo_title: 'Digital Marketing Agency in India | Google Ads, Meta Ads & Social Media · NexusBee',
    seo_description: 'Performance-focused digital marketing in India: Google Ads, Meta Ads, LinkedIn, social media, email and WhatsApp campaigns measured on leads, sales and ROI.',
    body: `Clicks, likes and impressions are easy to buy. Leads and sales are not. NexusBee is a digital marketing agency in India that runs every campaign against one question: is it bringing in revenue at a cost that makes sense for your business? We plan, run and optimise campaigns across Google, Meta, LinkedIn, email and WhatsApp, with tracking set up properly from day one.

We are based in Noida and have more than seven years of experience helping businesses across India grow online.

## Our digital marketing services

**Google Ads.** Search, Performance Max, Shopping and YouTube campaigns built around high-intent keywords, tight ad groups, strong landing pages and negative keywords that stop wasted spend.

**Meta Ads (Facebook and Instagram).** Prospecting and retargeting campaigns with creative testing, lead forms, catalogue ads for e-commerce and the Conversions API for accurate tracking.

**LinkedIn Ads.** Account-based and job-title targeting for B2B companies that sell to specific industries and decision-makers.

**Social media management.** Content calendars, posts, reels and community management for Instagram, LinkedIn, Facebook and YouTube that build your brand and support your paid campaigns.

**Email and WhatsApp marketing.** Welcome series, nurture sequences, abandoned cart flows and broadcast campaigns that turn one-time visitors into repeat customers.

**Landing pages and conversion rate optimisation.** Fast, focused landing pages for each campaign, with A/B tests on headlines, offers and forms.

**Analytics and tracking.** GA4, Google Tag Manager, Meta Pixel and CRM integration so every lead and sale is attributed to the campaign that produced it.

## How we run campaigns

1. **Strategy**: we learn your margins, sales cycle and ideal customers, then set targets for cost per lead and return on ad spend.
2. **Tracking setup**: conversion tracking is configured and tested before we spend a single rupee.
3. **Launch**: campaigns go live with multiple ad creatives and audiences to test.
4. **Optimise weekly**: we pause what does not work, scale what does and keep testing new ideas.
5. **Report monthly**: clear reports on spend, leads, cost per lead, sales and next steps.

## Built on a strong website

Ads send people to your website, so your website decides how much of your budget turns into enquiries. Because NexusBee also builds websites and landing pages, we fix slow pages, confusing forms and weak offers instead of just asking for a bigger budget.

## Who we work with

We run campaigns for D2C and e-commerce brands, real estate developers, education and coaching businesses, healthcare providers, B2B and SaaS companies and local service businesses across India.

## Why choose NexusBee as your digital marketing agency

- **Revenue-focused**: we report on leads, sales and ROI, not vanity metrics.
- **Full-funnel team**: ads, landing pages, SEO and automation under one roof.
- **Transparent**: ad accounts are in your name and you see every rupee spent.
- **No long lock-in contracts**: we keep clients by delivering results.

## Frequently asked questions

### How much should I spend on digital marketing in India?

It depends on your industry, competition and targets. We recommend starting with a test budget large enough to gather data across a few campaigns, then scaling what delivers the best cost per lead or return on ad spend.

### Which is better for my business: Google Ads or Meta Ads?

Google Ads captures people who are already searching for what you sell, so it usually brings higher-intent leads. Meta Ads is better for creating demand, building an audience and retargeting. Most businesses benefit from a mix, which we plan based on your goals.

### How soon will I see results from paid ads?

Paid campaigns can start bringing leads within days of launch. It usually takes a few weeks of testing and optimisation to reach a stable cost per lead.

### Do I own the ad accounts?

Yes. All ad, analytics and tracking accounts are created in your name, and we work in them with access you control.

### Do you also do SEO?

Yes. SEO builds long-term organic traffic while paid ads deliver faster results. Many clients combine both for steady, compounding growth.`,
  },

  'mobile-apps': {
    seo_title: 'Mobile App Development Company in India | Android & iOS Apps · NexusBee',
    seo_description: 'Mobile app development in India: Android and iOS apps built with React Native or Flutter, from MVP and UI/UX design to Play Store and App Store launch and support.',
    body: `A good mobile app becomes part of your customers' daily routine. A bad one gets uninstalled after the first try. NexusBee designs and develops mobile apps for Android and iOS that are fast, easy to use and built to grow, from the first prototype to launch on the Google Play Store and Apple App Store.

We are a mobile app development company based in Noida with more than seven years of experience building digital products for startups and businesses across India.

## Apps we build

- **Customer apps** for ordering, booking, loyalty, payments and account management.
- **On-demand and marketplace apps** with real-time tracking, chat and notifications.
- **Business and field-team apps** for sales teams, technicians and delivery staff, with offline support.
- **Health, fitness and education apps** with content, progress tracking and subscriptions.
- **Companion apps** for an existing web platform, SaaS product or e-commerce store.

## Cross-platform development with React Native and Flutter

Most businesses do not need two separate apps written twice. We use **React Native** or **Flutter** to build one codebase that runs on both Android and iOS, which lowers cost, speeds up delivery and keeps both apps in step. When an app needs deep native features, we write native modules where they are needed.

## What every app includes

- **UI/UX design** with wireframes, high-fidelity screens and a clickable prototype you can test before development starts.
- **Secure authentication** with OTP login, social sign-in and role-based access.
- **Backend and APIs**, or integration with your existing systems.
- **Payments** with Razorpay, UPI and in-app purchases.
- **Push notifications, analytics and crash reporting** to understand and engage users.
- **Performance and offline support** for patchy mobile networks.
- **App Store and Play Store submission**, including store listings, screenshots and review guidelines.

## Our app development process

1. **Discovery**: users, goals, features and the smallest version worth launching.
2. **Design**: user flows, wireframes and a clickable prototype.
3. **Development**: two-week sprints with test builds you can install on your phone.
4. **Testing**: functional, device and performance testing across Android and iOS.
5. **Launch**: store submission, analytics and monitoring.
6. **Growth**: updates, new features and support after launch.

## Why choose NexusBee for mobile app development

- **One codebase, two platforms**: faster delivery and lower cost.
- **Design-led**: apps that feel simple, even when the logic behind them is not.
- **Full-stack team**: we build the app, the backend, the admin panel and the marketing website.
- **You own the code** and the developer accounts.
- **Long-term partner**: support plans keep your app updated for new OS versions.

## Frequently asked questions

### How much does mobile app development cost in India?

It depends on the number of screens, features, integrations and whether you need a custom backend. A focused MVP costs much less than a full-featured platform. We share a fixed quote for the first release after discovery.

### How long does it take to build a mobile app?

A focused MVP usually takes 10 to 14 weeks including design, development, testing and store submission. Larger apps are delivered in phases.

### Should I build with React Native or Flutter?

Both build high-quality apps for Android and iOS from one codebase. We recommend one based on your features, existing technology and team. If you already use React for your website, React Native is often the natural choice.

### Do you publish the app on the Play Store and App Store?

Yes. We prepare the store listings and handle submission and review, using developer accounts in your name.

### Do you provide support after the app launches?

Yes. Our support plans cover bug fixes, OS updates, monitoring and new features.`,
  },

  'ai-agents-automation': {
    seo_title: 'AI Automation Agency in India | AI Agents & Chatbot Development · NexusBee',
    seo_description: 'AI automation agency in India: custom AI agents, chatbots for WhatsApp and websites, document processing and workflow automation built on leading AI models.',
    body: `AI is useful when it takes real, repetitive work off your team's plate. NexusBee is an AI automation agency in India that builds practical AI agents and chatbots connected to your data and tools: assistants that answer customer questions, qualify leads, read documents, draft replies and keep your systems up to date.

We are based in Noida with more than seven years of experience building software and automation, and we build with leading AI models, including Claude, choosing the right one for each task.

## AI solutions we build

**AI chatbots for websites and WhatsApp.** Assistants trained on your products, services, policies and FAQs that answer questions around the clock in English, Hindi and other languages, collect lead details and hand over to a person when needed.

**Lead qualification agents.** Agents that respond to new enquiries within seconds, ask the right questions, score leads, update your CRM and book meetings in your calendar.

**Customer support automation.** Agents that draft replies, categorise and route tickets, summarise long conversations and look up order or account information.

**Document processing.** Extracting data from invoices, purchase orders, forms, resumes and contracts into your systems, with a person reviewing exceptions.

**Internal knowledge assistants.** A private assistant that answers your team's questions from your SOPs, policies, product docs and past projects.

**Sales and research agents.** Researching prospects, preparing call briefs and drafting personalised outreach for your team to review.

**AI features inside your product.** Search, summarisation, recommendations and copilots added to your web or mobile app.

## How we build AI that works

1. **Pick one measurable task.** We start with a repetitive job where we can measure hours saved or response time.
2. **Prepare your knowledge.** We organise your documents and data so the AI gives accurate, up-to-date answers.
3. **Build with guardrails.** Clear instructions, access controls, source references and limits on what the agent can do.
4. **Keep a human in the loop.** At first, a person approves outputs. Automation increases as accuracy is proven.
5. **Evaluate and monitor.** We test agents against real examples, log every conversation and keep improving accuracy.

## Data privacy and security

Your data stays under your control. We use business-grade AI APIs that do not train on your data, restrict access to what each agent needs, and log activity for review. Sensitive workflows can include redaction and approval steps.

## Connected to your tools

Our AI agents work with your website, WhatsApp Business, email, CRM (HubSpot, Zoho, Salesforce), Google Workspace, Microsoft 365, Slack, help desks and databases, often alongside our business process automation.

## Why choose NexusBee as your AI automation agency

- **Practical, not hype**: we start with use cases that save time in the first month.
- **Engineering depth**: secure integrations, evaluation and monitoring, not just a prompt in a chat window.
- **Model-agnostic**: we choose the best model for accuracy, speed and cost.
- **Ownership**: accounts, data and code stay with you.

## Frequently asked questions

### What is an AI agent?

An AI agent is software that uses a language model to understand requests and take actions, such as looking up information, updating a CRM, drafting a reply or booking a meeting, within limits you define.

### Can you build a WhatsApp chatbot for my business?

Yes. We build AI chatbots on the WhatsApp Business API that answer questions from your knowledge base, capture leads, share order updates and hand conversations to your team when needed.

### Will the AI give wrong answers to customers?

We reduce this risk by grounding answers in your own documents, setting clear rules, testing against real questions and keeping a human in the loop until accuracy is proven. Agents are told to hand over to a person when they are unsure.

### Is our business data safe?

Yes. We use business-grade AI APIs that do not use your data for training, restrict each agent's access and log activity. We can also add redaction for sensitive information.

### How much does AI automation cost in India?

It depends on the use case, integrations and volume. Most clients start with one focused agent at a fixed price, plus a usage-based running cost for the AI model, then expand once the results are clear.`,
  },
}
