-- ============================================================
-- Kolla Kontraktet – Migration: Rate limiting
-- Kör detta i Supabase SQL Editor
-- ============================================================

create table if not exists public.rate_limits (
  id          uuid primary key default uuid_generate_v4(),
  user_id     uuid not null,
  action      text not null,
  created_at  timestamptz default now() not null
);

create index if not exists rate_limits_lookup_idx
  on public.rate_limits(user_id, action, created_at desc);

-- Ingen ska kunna läsa/skriva denna tabell från klienten
alter table public.rate_limits enable row level security;

grant all on public.rate_limits to service_role;
