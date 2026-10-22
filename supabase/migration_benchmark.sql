-- Avtalsbenchmarken: opt-in-flagga + avidentifierad klausullagring
-- Kör i Supabase SQL Editor.

-- 1. Opt-in per uppladdning (default av)
alter table public.analyses
  add column if not exists benchmark_opt_in boolean not null default false;

-- 2. Avidentifierad klausullagring. INGEN koppling till användare (user_id saknas
--    med flit) och inga hela dokument – bara klausulnivå, med belopp/PII borttaget
--    i backend innan det skrivs hit.
create table if not exists public.benchmark_clauses (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  contract_type    text,          -- normaliserad kategori-slug (aldrig råtiteln)
  clause_type      text,          -- klausulens namn (t.ex. "Indexreglering av hyra")
  clause_text      text,          -- avidentifierad klausultext (belopp/PII strippat)
  risk_level       text,          -- low | medium | high
  normalized_value jsonb          -- fylls av taxonomin i januari; null nu
);

-- 3. RLS på utan policys => bara service_role (backend) kan läsa/skriva.
alter table public.benchmark_clauses enable row level security;

create index if not exists benchmark_clauses_type_idx
  on public.benchmark_clauses (contract_type, clause_type);
