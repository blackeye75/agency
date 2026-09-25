-- Agency website CMS.
--
-- Site-wide settings live in `settings` (one row). Each page is a row in
-- `pages`, and its content is an ordered list of `sections`, one row per
-- section, with the section's fields stored as JSON so the admin panel can edit
-- any section type. Services, projects and blog posts are full collections with
-- their own detail pages. Contact and quote forms write to `leads`.
--
-- Anyone may read published content (the public site does). Only the email
-- addresses listed in `admins` may change it, enforced with row level security.

-- ---------------------------------------------------------------------------
-- Admins
-- ---------------------------------------------------------------------------

create table public.admins (
  email text primary key check (email = lower(email)),
  created_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create policy "Users can read their own admin row" on public.admins
  for select to authenticated
  using (email = lower(coalesce(auth.jwt() ->> 'email', '')));

-- True when the signed-in user's email is in `admins`. Add admins in the SQL
-- editor:  insert into public.admins (email) values ('you@example.com');
create function public.is_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select exists (
    select 1 from public.admins
    where email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- Keeps updated_at / updated_by current on every content table.
create function public.touch_row()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Content tables
-- ---------------------------------------------------------------------------

create table public.settings (
  id text primary key default 'site' check (id = 'site'),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

create table public.pages (
  slug text primary key check (slug ~ '^[a-z0-9-]+$'),
  title text not null,
  seo_title text,
  seo_description text,
  og_image text,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);

create table public.sections (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null references public.pages (slug) on update cascade on delete cascade,
  key text not null check (key ~ '^[a-z0-9-]+$'),
  type text not null,
  label text,
  position integer not null default 0,
  visible boolean not null default true,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null,
  unique (page_slug, key)
);
create index sections_page_position on public.sections (page_slug, position);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null,
  summary text not null default '',
  body text not null default '',
  features jsonb not null default '[]'::jsonb,
  deliverables jsonb not null default '[]'::jsonb,
  color text not null default 'orange',
  cover_url text,
  position integer not null default 0,
  published boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);
create index services_position on public.services (position);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null,
  client text not null default '',
  category text not null default 'software',
  service_slug text references public.services (slug) on update cascade on delete set null,
  year integer check (year between 1990 and 2100),
  url text,
  color text not null default 'orange',
  cover_url text,
  gallery jsonb not null default '[]'::jsonb,
  summary text not null default '',
  body text not null default '',
  quote text not null default '',
  quote_author text not null default '',
  rating numeric(2, 1) check (rating between 0 and 5),
  results jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  featured boolean not null default false,
  position integer not null default 0,
  published boolean not null default true,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);
create index projects_position on public.projects (position);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  cover_url text,
  tags jsonb not null default '[]'::jsonb,
  author text not null default '',
  read_minutes integer check (read_minutes > 0),
  published_at timestamptz not null default now(),
  published boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users (id) on delete set null
);
create index posts_published_at on public.posts (published_at desc);

do $$
declare t text;
begin
  foreach t in array array['settings', 'pages', 'sections', 'services', 'projects', 'posts'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create trigger %I before insert or update on public.%I for each row execute function public.touch_row()', t || '_touch', t);
    execute format('grant select on public.%I to anon, authenticated', t);
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format('create policy "Admins can add" on public.%I for insert to authenticated with check (public.is_admin())', t);
    execute format('create policy "Admins can change" on public.%I for update to authenticated using (public.is_admin()) with check (public.is_admin())', t);
    execute format('create policy "Admins can remove" on public.%I for delete to authenticated using (public.is_admin())', t);
  end loop;
end $$;

-- Settings, pages and sections are always public.
create policy "Public can read" on public.settings for select to anon, authenticated using (true);
create policy "Public can read" on public.pages for select to anon, authenticated using (true);
create policy "Public can read" on public.sections for select to anon, authenticated using (true);

-- Collections: visitors see published rows, admins also see drafts.
create policy "Public can read published" on public.services for select to anon using (published);
create policy "Readers and admins" on public.services for select to authenticated using (published or public.is_admin());
create policy "Public can read published" on public.projects for select to anon using (published);
create policy "Readers and admins" on public.projects for select to authenticated using (published or public.is_admin());
create policy "Public can read published" on public.posts for select to anon using (published and published_at <= now());
create policy "Readers and admins" on public.posts for select to authenticated using ((published and published_at <= now()) or public.is_admin());

-- ---------------------------------------------------------------------------
-- Leads from the contact and quote forms
-- ---------------------------------------------------------------------------

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('contact', 'quote')),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) <= 320 and email like '%_@_%'),
  phone text check (char_length(phone) <= 40),
  company text check (char_length(company) <= 200),
  services jsonb not null default '[]'::jsonb,
  budget text check (char_length(budget) <= 100),
  timeline text check (char_length(timeline) <= 100),
  message text not null default '' check (char_length(message) <= 5000),
  source_page text check (char_length(source_page) <= 300),
  status text not null default 'new' check (status in ('new', 'contacted', 'won', 'lost', 'spam')),
  created_at timestamptz not null default now()
);
create index leads_created_at on public.leads (created_at desc);

alter table public.leads enable row level security;
grant insert on public.leads to anon, authenticated;
grant select, update, delete on public.leads to authenticated;

create policy "Anyone can send a lead" on public.leads
  for insert to anon, authenticated with check (status = 'new');
create policy "Admins can read leads" on public.leads
  for select to authenticated using (public.is_admin());
create policy "Admins can update leads" on public.leads
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete leads" on public.leads
  for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Media: images, logos and videos uploaded from the admin panel
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('media', 'media', true, 52428800,
        array['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif', 'video/mp4', 'video/webm'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

create policy "Admins can upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
create policy "Admins can replace media" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());
create policy "Admins can remove media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());
create policy "Admins can list media" on storage.objects
  for select to authenticated using (bucket_id = 'media' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Realtime: the public site refreshes when content changes
-- ---------------------------------------------------------------------------

alter publication supabase_realtime add table
  public.settings, public.pages, public.sections, public.services, public.projects, public.posts;
