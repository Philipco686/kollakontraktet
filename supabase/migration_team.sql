-- ============================================================
-- Kolla Kontraktet – Migration: Team / delad prenumeration (Företag)
-- Kör detta i Supabase SQL Editor
-- ============================================================

create table if not exists public.team_members (
  id          uuid primary key default uuid_generate_v4(),
  owner_id    uuid not null references auth.users(id) on delete cascade,
  email       text not null,
  created_at  timestamptz default now() not null,
  unique(owner_id, email)
);

create index if not exists team_members_email_idx on public.team_members(email);
create index if not exists team_members_owner_idx on public.team_members(owner_id);

-- Endast backend (service role) hanterar denna tabell
alter table public.team_members enable row level security;

grant all on public.team_members to service_role;
