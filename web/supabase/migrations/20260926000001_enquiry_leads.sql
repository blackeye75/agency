-- Enquiry form on the home and contact pages.
alter table public.leads drop constraint leads_kind_check;
alter table public.leads add constraint leads_kind_check check (kind in ('contact', 'quote', 'enquiry'));
