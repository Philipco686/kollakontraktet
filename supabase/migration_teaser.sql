-- ============================================================
-- Kolla Kontraktet – Migration: Teaser + automatisk kvot-nollställning
-- Kör detta i Supabase SQL Editor (efter schema.sql)
-- ============================================================

-- Räkna gratis testanalyser per användare (teaser)
alter table public.profiles
  add column if not exists free_analyses_used int not null default 0;

-- Markera om en analys är upplåst (full) eller en teaser (låst)
-- Befintliga analyser sätts till upplåsta så de inte göms.
alter table public.analyses
  add column if not exists is_unlocked boolean not null default true;

-- Tidsstämpel för lazy månadsnollställning av kvoten
alter table public.subscriptions
  add column if not exists usage_reset_at timestamptz not null default now();

-- Säkerställ att service_role har åtkomst till de nya kolumnerna
grant all on public.profiles to service_role;
grant all on public.analyses to service_role;
grant all on public.subscriptions to service_role;
