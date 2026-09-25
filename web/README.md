# Nova Studio website + CMS

The agency website: Next.js 16 (App Router, Cache Components) with a built-in content management system on Supabase. Every text, image, section, service, project and blog post is editable at `/admin`. Saved changes go live within seconds.

## Run it

```bash
cd web
cp .env.example .env.local   # already filled in for the "agency-website" Supabase project
npm install
npm run dev                  # http://localhost:3000, CMS at http://localhost:3000/admin
```

Other scripts: `npm run build`, `npm run lint`, `npm run typecheck`, `npm run seed:sql`.

## Admin access

1. Open `/admin/login` and choose **Create account** with the email on the admin list, then confirm it from your inbox.
2. Only emails in the `admins` table can edit. To add someone, run this in the Supabase SQL editor:
   ```sql
   insert into public.admins (email) values ('teammate@example.com');
   ```

## What you can edit

| Admin page | Controls |
| --- | --- |
| Pages (Home, Services, Projects, Blog, Contact, Get a quote) | Each page is a list of sections. Edit any field, add sections of 22 types, reorder, hide or delete them, and set the page's SEO. A live preview sits beside the editor. |
| Services, Projects, Blog posts | Full collections with their own detail pages (`/services/…`, `/projects/…`, `/blog/…`), drafts, SEO fields and Markdown bodies. |
| Leads | Messages from the contact and quote forms, with status and CSV export. |
| Media | Upload images and videos (up to 50 MB) to Supabase Storage and reuse them anywhere. |
| Settings | Logo word, menu, header button, dock, contact details, socials, footer, loader, transition words, default SEO. |

Text markers: in headings, a new line breaks the line and `{O}` swaps a letter for the alternate font (`{O|wide}`, `{T|slant}`, `{b|script}`, `{G|g}`). In the icon story, `[crown] [heart] [bolt] [cursor] [chart]` place the icons.

## How it fits together

```
src/
  app/(site)/         public pages: home, services, projects, blog, contact, quote (+ detail pages)
  app/admin/          CMS screens
  app/api/leads       public form endpoint
  app/api/admin/*     CMS API: settings, pages, sections, collections, leads, media
  components/sections one component per section type (GSAP + Lenis motion)
  lib/cms/            content types, field schema, default content, cached queries
  lib/supabase/       Supabase clients
  proxy.ts            keeps the admin session fresh and guards /admin
supabase/migrations   database schema, row level security, storage bucket, realtime
```

- **Reads** are cached with `'use cache'` under the `cms` tag. The admin API expires the tag after each write, and a realtime listener refreshes open tabs.
- **Security** lives in the database: row level security lets anyone read published content and send a lead, and only admins can change content, read leads or manage media.
- **Fallback**: without Supabase variables the site renders the default content in `src/lib/cms/seed.ts`, so it always builds.
- **New database**: apply `supabase/migrations/*.sql`, then run the output of `npm run seed:sql` in the SQL editor.

## Enquiry emails (Gmail)

The enquiry, contact and quote forms save every message to **Leads** and, when these variables are set, email it through Gmail's SMTP server (`smtp.gmail.com:465`). Replying to the email answers the visitor directly.

1. On the Google account that should send the mail, turn on 2-Step Verification.
2. Create an app password: Google Account → Security → 2-Step Verification → **App passwords**.
3. Add the variables in Vercel (or `.env.local`):

| Variable | Value |
| --- | --- |
| `GMAIL_USER` | the sending address, e.g. `hello@yourdomain.com` or `you@gmail.com` |
| `GMAIL_APP_PASSWORD` | the 16-character app password |
| `LEADS_NOTIFY_TO` | optional: who receives enquiries (comma separated), defaults to `GMAIL_USER` |
| `LEADS_AUTOREPLY` | optional: `true` also sends the visitor a short confirmation |

## Deploy (Vercel)

Import the repository, set **Root Directory** to `web`, and add the three variables from `.env.example` (set `NEXT_PUBLIC_SITE_URL` to the real domain). In Supabase → Authentication → URL configuration, add the domain to the redirect URLs so confirmation emails link back correctly.
