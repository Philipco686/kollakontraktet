import { createClient } from '@supabase/supabase-js'
import type { Subscription, Analysis } from '@/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Client = any

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function getActiveSubscription(_supabase: Client, userId: string): Promise<Subscription | null> {
  const admin = adminClient()
  const { data } = await admin
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'active')
    .single()

  if (!data) return null

  // Lazy månadsnollställning: nollställ kvoten för återkommande planer
  // om det gått minst 30 dagar sedan senaste nollställningen.
  const isRecurring = data.plan === 'personal' || data.plan === 'business'
  if (isRecurring && data.usage_reset_at) {
    const sinceReset = Date.now() - new Date(data.usage_reset_at).getTime()
    if (sinceReset >= THIRTY_DAYS_MS) {
      const now = new Date().toISOString()
      await admin
        .from('subscriptions')
        .update({ analyses_used_this_month: 0, usage_reset_at: now })
        .eq('id', data.id)
      data.analyses_used_this_month = 0
      data.usage_reset_at = now
    }
  }

  return data
}

// Max antal användare på ett Företag-team (inklusive ägaren)
export const MAX_TEAM_TOTAL = 5

// Användarens "effektiva" prenumeration: egen om den finns, annars via ett
// Företag-team hen är medlem i (delad prenumeration).
export async function getEffectiveSubscription(
  supabase: Client,
  userId: string,
  email: string | null | undefined
): Promise<Subscription | null> {
  const own = await getActiveSubscription(supabase, userId)
  if (own) return own
  if (!email) return null

  const admin = adminClient()
  const { data: membership } = await admin
    .from('team_members')
    .select('owner_id')
    .eq('email', email.toLowerCase())
    .limit(1)
    .maybeSingle()

  if (!membership) return null

  const { data: ownerSub } = await admin
    .from('subscriptions')
    .select('*')
    .eq('user_id', membership.owner_id)
    .eq('status', 'active')
    .eq('plan', 'business')
    .maybeSingle()

  return ownerSub ?? null
}

export async function listTeamMembers(_supabase: Client, ownerId: string): Promise<{ email: string; created_at: string }[]> {
  const { data } = await adminClient()
    .from('team_members')
    .select('email, created_at')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: true })
  return data ?? []
}

export async function addTeamMember(_supabase: Client, ownerId: string, email: string) {
  return adminClient()
    .from('team_members')
    .insert({ owner_id: ownerId, email: email.toLowerCase() })
}

export async function removeTeamMember(_supabase: Client, ownerId: string, email: string) {
  return adminClient()
    .from('team_members')
    .delete()
    .eq('owner_id', ownerId)
    .eq('email', email.toLowerCase())
}

export async function getSubscriptionCustomer(_supabase: Client, userId: string): Promise<{ stripe_customer_id: string } | null> {
  const { data } = await adminClient()
    .from('subscriptions')
    .select('stripe_customer_id')
    .eq('user_id', userId)
    .single()
  return data
}

export async function getFreeAnalysesUsed(_supabase: Client, userId: string): Promise<number> {
  const { data } = await adminClient()
    .from('profiles')
    .select('free_analyses_used')
    .eq('id', userId)
    .single()
  return data?.free_analyses_used ?? 0
}

export async function incrementFreeAnalysesUsed(_supabase: Client, userId: string, current: number) {
  return adminClient()
    .from('profiles')
    .update({ free_analyses_used: current + 1 })
    .eq('id', userId)
}

export async function getRecentAnalyses(_supabase: Client, userId: string, limit = 3): Promise<Pick<Analysis, 'id' | 'title' | 'created_at' | 'result' | 'is_unlocked'>[] | null> {
  const { data } = await adminClient()
    .from('analyses')
    .select('id, title, created_at, result, is_unlocked')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit)
  return data
}

export const PURGED_TEXT = '[Avtalstexten raderades automatiskt efter 90 dagar]'

// Låter en användare radera sin egen analys
export async function deleteAnalysis(_supabase: Client, userId: string, analysisId: string) {
  return adminClient()
    .from('analyses')
    .delete()
    .eq('id', analysisId)
    .eq('user_id', userId)
}

// Gallrar bort själva avtalstexten (behåller analysresultatet) för gamla analyser
export async function purgeOldContractText(_supabase: Client, cutoffIso: string) {
  return adminClient()
    .from('analyses')
    .update({ original_text: PURGED_TEXT })
    .lt('created_at', cutoffIso)
    .neq('original_text', PURGED_TEXT)
}

export async function updateAnalysisResult(_supabase: Client, analysisId: string, userId: string, result: unknown) {
  return adminClient()
    .from('analyses')
    .update({ result })
    .eq('id', analysisId)
    .eq('user_id', userId)
}

export async function getAnalysisById(_supabase: Client, userId: string, analysisId: string): Promise<Analysis | null> {
  const { data } = await adminClient()
    .from('analyses')
    .select('*')
    .eq('id', analysisId)
    .eq('user_id', userId)
    .single()
  return data
}

export async function unlockAnalysis(_supabase: Client, analysisId: string, userId: string) {
  return adminClient()
    .from('analyses')
    .update({ is_unlocked: true })
    .eq('id', analysisId)
    .eq('user_id', userId)
}

// Låser upp alla användarens teaser-analyser (anropas efter ett lyckat köp)
export async function unlockAllAnalysesForUser(_supabase: Client, userId: string) {
  return adminClient()
    .from('analyses')
    .update({ is_unlocked: true })
    .eq('user_id', userId)
    .eq('is_unlocked', false)
}

export async function upsertSubscription(
  _supabase: Client,
  subscription: Omit<Subscription, 'id' | 'created_at' | 'updated_at' | 'usage_reset_at'>
) {
  return adminClient()
    .from('subscriptions')
    .upsert({ ...subscription, usage_reset_at: new Date().toISOString() }, { onConflict: 'user_id' })
}

export async function updateSubscriptionByStripeId(
  _supabase: Client,
  stripeSubscriptionId: string,
  updates: Partial<Omit<Subscription, 'id' | 'user_id' | 'created_at'>>
) {
  return adminClient()
    .from('subscriptions')
    .update(updates)
    .eq('stripe_subscription_id', stripeSubscriptionId)
}

export async function insertAnalysis(
  _supabase: Client,
  analysis: Omit<Analysis, 'id' | 'created_at'>
) {
  return adminClient()
    .from('analyses')
    .insert(analysis)
    .select()
    .single()
}

export async function incrementAnalysisCount(
  _supabase: Client,
  subscriptionId: string,
  currentCount: number
) {
  return adminClient()
    .from('subscriptions')
    .update({ analyses_used_this_month: currentCount + 1 })
    .eq('id', subscriptionId)
}

/* ---------- Avtalsbenchmarken ----------
 * Avidentifierad klausullagring för att på sikt kunna svara på "är det här
 * villkoret normalt?". Lagras BARA vid uttryckligt opt-in, aldrig kopplat till
 * användare, aldrig hela dokument, och med belopp/PII strippat innan skrivning.
 */

const BENCH_EMAIL_RE = /\b[^\s@]+@[^\s@]+\.[^\s@]+\b/gi
const BENCH_PNR_RE = /\b\d{6,8}[-+ ]?\d{4}\b/g
const BENCH_PHONE_RE = /\b(?:\+46|0)\s?\d[\d ]{6,}\d\b/g
// Kronbelopp (t.ex. "45 000 kr", "1 200 000 SEK", "500:-") – behåller procent och tidsangivelser.
const BENCH_CURRENCY_RE = /\b\d{1,3}(?:[ .]\d{3})+(?:[.,]\d+)?\s?(?:kr|kronor|sek|:-)?\b|\b\d+(?:[.,]\d+)?\s?(?:kr|kronor|sek|:-)\b/gi

function benchScrub(text: string): string {
  return (text || '')
    .replace(BENCH_EMAIL_RE, '[epost]')
    .replace(BENCH_PNR_RE, '[personnr]')
    .replace(BENCH_PHONE_RE, '[tel]')
    .replace(BENCH_CURRENCY_RE, '[belopp]')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 2000)
}

// Normaliserar den fritt inmatade titeln till en kategori-slug. Sparar ALDRIG
// råtiteln (kan innehålla parters namn) – bara den grova kategorin, annars null.
export function classifyContractType(title: string): string | null {
  const t = (title || '').toLowerCase()
  const map: [string, string][] = [
    ['hyres', 'hyreskontrakt'],
    ['anställ', 'anstallningsavtal'], ['anstall', 'anstallningsavtal'],
    ['konsult', 'konsultavtal'],
    ['köpe', 'kopeavtal'], ['kope', 'kopeavtal'],
    ['sekretess', 'nda-sekretessavtal'], ['nda', 'nda-sekretessavtal'],
    ['sambo', 'samboavtal'],
    ['leverantör', 'leverantorsavtal'], ['leverantor', 'leverantorsavtal'],
    ['franchise', 'franchiseavtal'],
    ['bolån', 'bolanehandlingar'], ['bolan', 'bolanehandlingar'],
  ]
  for (const [kw, slug] of map) if (t.includes(kw)) return slug
  return null
}

type BenchClause = { title?: string; original_text?: string; risk_level?: string }

// Skriver avidentifierade klausuler till benchmark-underlaget. Fel här får aldrig
// påverka användarens analys – anropas i try/catch och sväljer sina egna fel.
export async function storeBenchmarkClauses(clauses: BenchClause[] | undefined, contractType: string | null) {
  if (!clauses || clauses.length === 0) return
  const rows = clauses.map(c => ({
    contract_type: contractType,
    clause_type: (c.title ?? '').slice(0, 200) || null,
    clause_text: benchScrub(c.original_text ?? ''),
    risk_level: c.risk_level ?? null,
    normalized_value: null,
  }))
  try {
    await adminClient().from('benchmark_clauses').insert(rows)
  } catch (e) {
    console.error('Benchmark-lagring misslyckades (ignoreras):', e)
  }
}
