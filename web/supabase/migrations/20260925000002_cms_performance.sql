-- Tuning after Supabase's performance advisor.

-- Evaluate the auth checks once per query instead of once per row.
drop policy "Users can read their own admin row" on public.admins;
create policy "Users can read their own admin row" on public.admins
  for select to authenticated
  using (email = lower(coalesce((select auth.jwt()) ->> 'email', '')));

do $$
declare t text;
begin
  foreach t in array array['settings', 'pages', 'sections', 'services', 'projects', 'posts'] loop
    execute format('alter policy "Admins can add" on public.%I with check ((select public.is_admin()))', t);
    execute format('alter policy "Admins can change" on public.%I using ((select public.is_admin())) with check ((select public.is_admin()))', t);
    execute format('alter policy "Admins can remove" on public.%I using ((select public.is_admin()))', t);
    execute format('create index if not exists %I on public.%I (updated_by)', t || '_updated_by', t);
  end loop;
end $$;

alter policy "Readers and admins" on public.services using (published or (select public.is_admin()));
alter policy "Readers and admins" on public.projects using (published or (select public.is_admin()));
alter policy "Readers and admins" on public.posts using ((published and published_at <= now()) or (select public.is_admin()));
alter policy "Admins can read leads" on public.leads using ((select public.is_admin()));
alter policy "Admins can update leads" on public.leads using ((select public.is_admin())) with check ((select public.is_admin()));
alter policy "Admins can delete leads" on public.leads using ((select public.is_admin()));

create index if not exists projects_service_slug on public.projects (service_slug);
