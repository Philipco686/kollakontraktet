import type {
  Analysis, AnalysisResult, Clause, EconomicRisk, FindingIcon, KeyFact,
  MissingItem, NegotiationTip, QuickSummary, StandardComparison, TimelineEvent,
} from '@/types'
import { stripDashes } from '@/lib/text'

/* Gör om en sparad analys till det som de tre vyerna behöver. Ren logik, inga databasanrop.
 * Äldre analyser saknar de nya fälten och får rimliga reservvärden, så alla analyser fungerar.
 * Låsta analyser (teaser) får aldrig med sig mer än sammanfattning, risknivå och nyckeluppgifter. */

export type Risk = 'high' | 'medium' | 'low'
export type AnalysisState = 'locked' | 'needs-generation' | 'full'

export interface ViewClause {
  id: string
  number: string | null   // exakt som i avtalet, null om avtalet inte numrerar
  title: string
  text: string            // citerad avtalstext, återges ordagrant
}

export interface ViewFinding {
  id: string
  clauseId: string
  risk: Risk
  area: string
  icon: FindingIcon
  title: string
  short: string
  body: string
  suggestion: string | null
  noChangeNeeded: boolean // sant bara när vi vet att ingen ändring behövs
}

export interface ViewExtras {
  quick: QuickSummary | null // finns bara i analyser gjorda före resultatflödet
  economicRisk: EconomicRisk | null
  commonTraps: string[]
  consequences: string[]
  unusualTerms: string[]
  tips: NegotiationTip[]
  timeline: TimelineEvent[]
  checklist: string[]
  standard: StandardComparison | null
  recommendations: string[]
}

export interface ViewAnalysis {
  id: string
  title: string
  createdAt: string
  contractType: string | null
  state: AnalysisState
  risk: Risk
  score: number | null
  verdict: { tone: Risk; label: string; headline: string; summary: string }
  keyTerms: KeyFact[]
  clauses: ViewClause[]
  findings: ViewFinding[]
  missing: MissingItem[]
  extras: ViewExtras
}

export const RISK_ORDER: Record<Risk, number> = { high: 0, medium: 1, low: 2 }
export const RISK_LABEL: Record<Risk, string> = { high: 'Hög risk', medium: 'Medelrisk', low: 'Låg risk' }
export const RISK_SHORT: Record<Risk, string> = { high: 'HÖG', medium: 'MEDEL', low: 'LÅG' }

const VERDICT: Record<Risk, { label: string; headline: string }> = {
  low: { label: 'Rimligt avtal', headline: 'Avtalet ser rimligt ut.' },
  medium: { label: 'Förhandla först', headline: 'Några villkor bör ses över innan du skriver under.' },
  high: { label: 'Ändra innan du skriver under', headline: 'Avtalet har villkor som kan bli dyra för dig.' },
}

export const clauseIdAt = (i: number) => `c${i + 1}`
export const findingIdAt = (i: number) => `f${i + 1}`

// "§ 9 Konkurrensklausul" om avtalet numrerar sina klausuler, annars bara titeln
export const clauseLabel = (c: { number: string | null; title: string }) =>
  c.number ? `${c.number} ${c.title}` : c.title

// Visar klausulerna i avtalets egen ordning när alla har ett paragrafnummer. AI:n kan ha listat
// dem i viktighetsordning (och äldre analyser gjorde det), och id:n ändras inte av sorteringen.
function orderByNumber(clauses: ViewClause[]): ViewClause[] {
  const nums = clauses.map(c => {
    const m = c.number?.match(/\d+(?:[.,]\d+)?/)
    return m ? parseFloat(m[0].replace(',', '.')) : NaN
  })
  if (clauses.length < 2 || nums.some(n => Number.isNaN(n))) return clauses
  return clauses
    .map((c, i) => ({ c, n: nums[i], i }))
    .sort((a, b) => a.n - b.n || a.i - b.i)
    .map(x => x.c)
}

const asRisk = (r: unknown): Risk => (r === 'high' || r === 'medium' || r === 'low' ? r : 'medium')
const clean = (s: unknown) => (typeof s === 'string' ? stripDashes(s).trim() : '')
const list = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : [])

function firstSentence(text: string, max = 150): string {
  const t = text.trim()
  const m = t.match(/^.*?[.!?](\s|$)/)
  const s = (m ? m[0] : t).trim()
  if (s.length <= max) return s
  return s.slice(0, max - 1).replace(/\s+\S*$/, '') + '...'
}

const ICON_HINTS: [RegExp, FindingIcon][] = [
  [/konkurr|sekretess|hemlig|tystnad|lojalitet/i, 'lock'],
  [/uppsäg|avslut|upphör|hävning|bindning|förtida/i, 'exit'],
  [/lön|ersättning|betal|avgift|hyra|pris|kostnad|skadestånd|vite|ränta|deposition|arvode|fakturer/i, 'coin'],
  [/ändring|ändra|ensidig|tillägg|justering/i, 'pencil'],
  [/tid|period|datum|prov|längd|förläng|semester|frist/i, 'calendar'],
]
const ICONS: FindingIcon[] = ['shield', 'pencil', 'exit', 'coin', 'calendar', 'lock']

function iconFor(c: Clause): FindingIcon {
  if (c.icon && ICONS.includes(c.icon)) return c.icon
  const hit = ICON_HINTS.find(([re]) => re.test(c.title))
  return hit ? hit[1] : 'shield'
}

/* Poängen är vägledande och bygger på antal och allvar av flaggade villkor. Den hålls inom
 * intervallet för den samlade bedömningen, så att ring, färg och rubrik aldrig säger emot varandra. */
export function computeScore(findings: { risk: Risk }[], overall: Risk): number {
  const high = findings.filter(f => f.risk === 'high').length
  const medium = findings.filter(f => f.risk === 'medium').length
  const raw = 100 - 14 * high - 6 * medium
  const [lo, hi] = { low: [75, 100], medium: [50, 74], high: [5, 49] }[overall]
  return Math.round(Math.min(hi, Math.max(lo, raw)))
}

type Row = Pick<Analysis, 'id' | 'title' | 'created_at' | 'result' | 'is_unlocked'>

export function buildViewAnalysis(row: Row): ViewAnalysis {
  const r = (row.result ?? {}) as Partial<AnalysisResult>
  const risk = asRisk(r.risk_level)
  const rawClauses = list<Clause>(r.clauses)
  const unlocked = !!row.is_unlocked
  const state: AnalysisState = !unlocked ? 'locked' : rawClauses.length > 0 ? 'full' : 'needs-generation'
  const full = state === 'full'

  const clauses: ViewClause[] = full
    ? orderByNumber(
        rawClauses.map((c, i) => ({
          id: clauseIdAt(i),
          number: clean(c.number) || null,
          title: clean(c.title) || `Klausul ${i + 1}`,
          text: typeof c.original_text === 'string' ? c.original_text : '', // ordagrant, rensas inte
        }))
      )
    : []

  const findings: ViewFinding[] = full
    ? rawClauses
        .map((c, i): ViewFinding => {
          const crisk = asRisk(c.risk_level)
          const body = clean(c.plain_explanation)
          const suggestion = typeof c.suggestion === 'string' && c.suggestion.trim() ? clean(c.suggestion) : null
          return {
            id: findingIdAt(i),
            clauseId: clauseIdAt(i),
            risk: crisk,
            area: clean(c.area) || clean(c.title),
            icon: iconFor(c),
            title: clean(c.title),
            short: clean(c.short) || firstSentence(body),
            body,
            suggestion,
            noChangeNeeded: suggestion === null && (c.suggestion === null || (c.suggestion === undefined && crisk === 'low')),
          }
        })
        .sort((a, b) => RISK_ORDER[a.risk] - RISK_ORDER[b.risk]) // sorteringen är stabil, dokumentordning inom varje nivå
    : []

  // Äldre analyser har förhandlingstips från AI:n. Nya analyser bygger dem av förslagen per klausul.
  const storedTips = list<NegotiationTip>(r.negotiation_tips)
    .map(t => ({ item: clean(t.item), suggestion: clean(t.suggestion), example_wording: clean(t.example_wording) }))
    .filter(t => t.item && t.example_wording)
  const tips: NegotiationTip[] = storedTips.length > 0
    ? storedTips
    : findings
        .filter(f => f.suggestion && f.risk !== 'low')
        .map(f => ({ item: f.area, suggestion: f.short, example_wording: f.suggestion as string }))

  const fallback = VERDICT[risk]
  const headline = clean(r.verdict?.headline) || fallback.headline

  const economic = r.economic_risk && typeof r.economic_risk.max_amount === 'number' && r.economic_risk.max_amount > 0
    ? { ...r.economic_risk, breakdown: list<string>(r.economic_risk.breakdown).map(clean) }
    : null

  return {
    id: row.id,
    title: clean(row.title) || 'Namnlös analys',
    createdAt: row.created_at,
    contractType: clean(r.contract_type) || null,
    state,
    risk,
    score: full ? computeScore(findings, risk) : null,
    verdict: { tone: risk, label: fallback.label, headline, summary: clean(r.summary) },
    keyTerms: list<KeyFact>(r.key_facts).slice(0, 8).map(k => ({ label: clean(k.label), value: clean(k.value) })),
    clauses,
    findings,
    missing: full ? list<MissingItem>(r.missing).map(m => ({ title: clean(m.title), body: clean(m.body) })).filter(m => m.body) : [],
    extras: {
      quick: full && r.quick_summary
        ? {
            what_is_it_about: clean(r.quick_summary.what_is_it_about),
            what_do_i_commit_to: clean(r.quick_summary.what_do_i_commit_to),
            what_do_i_get: clean(r.quick_summary.what_do_i_get),
            biggest_risk: clean(r.quick_summary.biggest_risk),
          }
        : null,
      economicRisk: full ? economic : null,
      commonTraps: full ? list<string>(r.common_traps).map(clean) : [],
      consequences: full ? list<string>(r.consequences).map(clean) : [],
      unusualTerms: full ? list<string>(r.unusual_terms).map(clean) : [],
      tips: full ? tips : [],
      timeline: full ? list<TimelineEvent>(r.timeline).map(t => ({ event: clean(t.event), date: clean(t.date), note: clean(t.note) })) : [],
      checklist: full ? list<string>(r.pre_signing_checklist).map(clean) : [],
      standard: full && r.standard_comparison && typeof r.standard_comparison.percentage_standard === 'number'
        ? { percentage_standard: Math.max(0, Math.min(100, Math.round(r.standard_comparison.percentage_standard))), deviations: list<string>(r.standard_comparison.deviations).map(clean) }
        : null,
      recommendations: full ? list<string>(r.recommendations).map(clean) : [],
    },
  }
}
