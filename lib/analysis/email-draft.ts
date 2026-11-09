import { clauseLabel, RISK_ORDER, type ViewAnalysis } from './viewmodel'

/* Bygger ett utkast till förhandlingsmejl av förslagen på ny formulering.
 * Inget skickas. Utkastet kopieras till urklipp så att kunden kan klistra in det själv. */
export function buildNegotiationEmail(a: ViewAnalysis, includeMissing: boolean): string | null {
  const byClause = new Map(a.clauses.map(c => [c.id, c]))
  const items: { heading: string; why: string; wording: string }[] = a.findings
    .filter(f => f.suggestion && f.risk !== 'low')
    .sort((x, y) => RISK_ORDER[x.risk] - RISK_ORDER[y.risk])
    .map(f => {
      const c = byClause.get(f.clauseId)
      return { heading: c ? clauseLabel(c) : f.title, why: f.short, wording: f.suggestion as string }
    })

  // Äldre analyser har inga förslag per klausul, men har förhandlingstips
  const fromTips = items.length === 0
    ? a.extras.tips.filter(t => t.example_wording).map(t => ({ heading: t.item, why: t.suggestion, wording: t.example_wording }))
    : []
  const all = [...items, ...fromTips]
  const missing = includeMissing ? a.missing : []
  if (all.length === 0 && missing.length === 0) return null

  const lines: string[] = [
    'Hej,',
    '',
    `Tack för avtalet${a.title ? ` (${a.title})` : ''}. Jag har gått igenom det och vill gärna diskutera några villkor innan jag skriver under.`,
    '',
  ]
  all.forEach((it, i) => {
    lines.push(`${i + 1}. ${it.heading}`)
    if (it.why) lines.push(it.why)
    lines.push(`Mitt förslag: "${it.wording}"`)
    lines.push('')
  })
  if (missing.length > 0) {
    lines.push('Jag saknar också följande i avtalet:')
    missing.forEach(m => lines.push(`- ${m.title ? `${m.title}: ` : ''}${m.body}`))
    lines.push('')
  }
  lines.push('Hör gärna av dig så går vi igenom det tillsammans.', '', 'Vänliga hälsningar')
  return lines.join('\n')
}
