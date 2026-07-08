-- ============================================================
-- Kolla Kontraktet – Supabase Schema
-- Kör detta i Supabase SQL Editor
-- ============================================================

-- Aktivera UUID-extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES
-- ============================================================
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  created_at  timestamptz default now() not null
);

-- RLS
alter table public.profiles enable row level security;

create policy "Användare kan se sin egen profil"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Användare kan uppdatera sin egen profil"
  on public.profiles for update
  using (auth.uid() = id);

-- Skapa profil automatiskt vid registrering
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- SUBSCRIPTIONS
-- ============================================================
create table public.subscriptions (
  id                          uuid primary key default uuid_generate_v4(),
  user_id                     uuid not null references auth.users(id) on delete cascade,
  stripe_customer_id          text not null,
  stripe_subscription_id      text,
  plan                        text not null check (plan in ('personal', 'business', 'onetime')),
  status                      text not null check (status in ('active', 'canceled', 'past_due', 'trialing')),
  analyses_used_this_month    int default 0 not null,
  current_period_end          timestamptz,
  created_at                  timestamptz default now() not null,
  updated_at                  timestamptz default now() not null,
  unique(user_id)
);

-- RLS
alter table public.subscriptions enable row level security;

create policy "Användare kan se sin egen prenumeration"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Webhook (service role) hanterar inserts/updates via backend

-- Uppdatera updated_at automatiskt
create or replace function public.update_updated_at()
returns trigger language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger update_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute procedure public.update_updated_at();

-- Återställ månadsräknare varje månad
-- (kör via cron-job i Supabase eller extern scheduler)
create or replace function public.reset_monthly_usage()
returns void language plpgsql security definer
as $$
begin
  update public.subscriptions
  set analyses_used_this_month = 0
  where plan in ('personal', 'business')
    and status = 'active';
end;
$$;

-- ============================================================
-- ANALYSES
-- ============================================================
create table public.analyses (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  title          text not null,
  original_text  text not null,
  result         jsonb not null,
  created_at     timestamptz default now() not null
);

-- RLS
alter table public.analyses enable row level security;

create policy "Användare kan se sina egna analyser"
  on public.analyses for select
  using (auth.uid() = user_id);

create policy "Användare kan skapa analyser"
  on public.analyses for insert
  with check (auth.uid() = user_id);

-- Index för snabba queries
create index analyses_user_id_created_at_idx
  on public.analyses(user_id, created_at desc);

-- ============================================================
-- SÄKERHET: Service role-åtkomst för webhooks
-- Stripe-webhooks kör med service role (SUPABASE_SERVICE_ROLE_KEY)
-- och kringgår RLS – det är avsiktligt och korrekt.
-- ============================================================
