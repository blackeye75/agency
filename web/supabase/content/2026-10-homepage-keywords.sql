-- Puts the four services into the homepage headline (the page's H1), which is what Google weighs most on the page:
-- "YOUR DIGITAL 360 / SOFTWARE / PRODUCT / ALL-IN-ONE AGENCY" becomes "YOUR WEBSITES / MARKETING / SEO / AI AUTOMATION AGENCY".
-- Only changes the rotating words if they are still the original ones. Run once in the Supabase SQL editor; safe to re-run.
update public.sections
set data = jsonb_set(data, '{words}', '[{"text":"WEBSITES"},{"text":"MARKETING"},{"text":"SEO"},{"text":"AI AUTOMATION"}]'::jsonb)
where page_slug = 'home' and key = 'hero'
  and data->'words' = '[{"text":"DIGITAL 360"},{"text":"SOFTWARE"},{"text":"PRODUCT"},{"text":"ALL-IN-ONE"}]'::jsonb;
