import Anthropic from '@anthropic-ai/sdk'
import type { AnalysisResult } from '@/types'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Kort, billig prompt – bara det som visas i teasern
function teaserPrompt(contractText: string): string {
  return `Du är en expert på svenska juridiska avtal. Ge en SNABB översikt av avtalet nedan.

Svara ENDAST med ett JSON-objekt i exakt detta format (inga förklaringar utanför JSON):

{
  "summary": "2-3 meningar som sammanfattar vad avtalet handlar om",
  "risk_level": "low|medium|high",
  "key_facts": [
    { "label": "Lön/ersättning", "value": "45 000 kr/mån" }
  ]
}

Regler:
- Skriv allt på svenska
- key_facts: 4-8 konkreta faktapunkter relevanta för detta avtal (lön, hyra, tid, deposition, uppsägning, etc.), var och en med label och value (ingen emoji)
- risk_level: "high" om avtalet kan kosta mycket pengar eller förlust av rättigheter, annars "medium"/"low"
- Svara med enbart JSON-objektet, utan inledande text eller markdown.

AVTAL ATT ANALYSERA:
${contractText}`
}

// Full prompt – hela analysen
function fullPrompt(contractText: string): string {
  return `Du är en expert på svenska juridiska avtal. Analysera avtalet nedan som om du förklarar för en intelligent person utan juridisk utbildning – tydligt, konkret och ärligt.

Svara ENDAST med ett JSON-objekt i exakt detta format (inga förklaringar utanför JSON):

{
  "summary": "2-3 meningar som sammanfattar vad avtalet handlar om",
  "risk_level": "low|medium|high",
  "key_facts": [
    { "label": "Lön/ersättning", "value": "45 000 kr/mån" }
  ],
  "quick_summary": {
    "what_is_it_about": "Vad handlar avtalet om? (1-2 meningar)",
    "what_do_i_commit_to": "Vad förbinder du dig till? (1-2 meningar)",
    "what_do_i_get": "Vad får du tillbaka? (1-2 meningar)",
    "biggest_risk": "Vad är den största risken för dig? (1-2 meningar)"
  },
  "clauses": [
    {
      "title": "Klausulens namn",
      "original_text": "Citera texten från avtalet",
      "plain_explanation": "Förklara på vanlig svenska vad detta innebär i praktiken",
      "risk_level": "low|medium|high",
      "is_important": true
    }
  ],
  "common_traps": [
    "Fälla #1 som folk ofta missar i just detta avtal, t.ex. automatisk förlängning"
  ],
  "consequences": [
    "Om du bryter mot X kan Y hända – beskriv konsekvenser konkret och i kronor om möjligt"
  ],
  "unusual_terms": [
    "Denna klausul är ovanlig jämfört med normala svenska avtal – förklara varför"
  ],
  "negotiation_tips": [
    {
      "item": "Vad som kan förhandlas",
      "suggestion": "Varför och hur du bör förhandla",
      "example_wording": "Konkret formulering du kan använda: 'Jag vill lägga till att...'"
    }
  ],
  "economic_risk": {
    "max_amount": 420000,
    "currency": "SEK",
    "breakdown": [
      "Vite vid avtalsbrott: 270 000 kr (6 mån × 45 000 kr)"
    ]
  },
  "timeline": [
    { "event": "Avtalsteckning", "date": "16 juni 2024", "note": "Bindande från detta datum" }
  ],
  "pre_signing_checklist": [
    "Fråga motparten: Kan bindningstiden kortas ned?"
  ],
  "standard_comparison": {
    "percentage_standard": 78,
    "deviations": [
      "24 månaders uppsägningstid är ovanligt lång – standard är 3 månader"
    ]
  },
  "recommendations": [
    "Konkret råd #1"
  ]
}

Regler:
- Skriv allt på svenska
- Förklara som till en smart vän – inte som jurist
- risk_level "high" = kan kosta mycket pengar eller förlust av rättigheter
- key_facts: 4-8 faktapunkter relevanta för detta specifika avtal
- clauses: inkludera 6-12 viktiga klausuler
- common_traps: 3-5 saker folk typiskt missar i just denna typ av avtal
- consequences: beskriv konkreta följder om man bryter avtalet
- unusual_terms: markera det som INTE är standard i Sverige
- negotiation_tips: 3-6 saker som faktiskt går att förhandla
- economic_risk.max_amount: beräkna worst-case i SEK (0 om ej tillämpligt)
- timeline: plocka ut alla viktiga datum/deadlines från avtalet
- pre_signing_checklist: 4-6 konkreta frågor att ställa motparten
- standard_comparison.percentage_standard: uppskatta hur standardenligt avtalet är (0-100)

Svara med enbart JSON-objektet, utan inledande text, förklaringar eller markdown-formatering.

AVTAL ATT ANALYSERA:
${contractText}`
}

/**
 * Analyserar ett avtal. 'teaser' genererar bara en smakbit (billigt),
 * 'full' genererar hela analysen. Kastar Error('MAX_TOKENS') om svaret klipptes,
 * och låter Anthropic-fel bubbla upp för hantering i route.
 */
export async function analyzeContract(contractText: string, mode: 'teaser' | 'full'): Promise<AnalysisResult> {
  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: mode === 'teaser' ? 1500 : 8000,
    messages: [
      {
        role: 'user',
        content: mode === 'teaser' ? teaserPrompt(contractText) : fullPrompt(contractText),
      },
    ],
  })

  if (message.stop_reason === 'max_tokens') {
    throw new Error('MAX_TOKENS')
  }

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Oväntat svar från AI')
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Kunde inte tolka AI-svaret')
  }
  return JSON.parse(jsonMatch[0]) as AnalysisResult
}

export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

/**
 * Svarar på en följdfråga om ett redan analyserat avtal. Grundar svaret i
 * avtalstexten (om den finns kvar) och den sparade analysen. Låter
 * Anthropic-fel bubbla upp för hantering i route.
 */
export async function answerContractQuestion(
  contractText: string | null,
  analysis: AnalysisResult,
  question: string,
  history: ChatTurn[] = []
): Promise<string> {
  const contractBlock = contractText
    ? `AVTALSTEXT:\n${contractText}`
    : `AVTALSTEXTEN HAR RADERATS (av integritetsskäl efter 90 dagar). Grunda svaret på sammanfattningen och klausulerna nedan.`

  const analysisSummary = JSON.stringify({
    summary: analysis.summary,
    risk_level: analysis.risk_level,
    key_facts: analysis.key_facts,
    clauses: analysis.clauses,
    economic_risk: analysis.economic_risk,
    common_traps: analysis.common_traps,
    unusual_terms: analysis.unusual_terms,
  })

  const system = `Du är en hjälpsam expert på svenska avtal. Användaren har redan fått en analys av ETT specifikt avtal och ställer nu följdfrågor om det.

Regler:
- Svara ALLTID på svenska, tydligt och konkret, som till en smart vän utan juridisk utbildning.
- Grunda svaret i avtalet och analysen nedan. Om svaret inte framgår av materialet, säg det ärligt istället för att gissa.
- Håll svaret kort och fokuserat (oftast under 150 ord) om inte frågan kräver mer.
- Håll dig till detta avtal. Om användaren frågar om något helt orelaterat, be dem vänligt hålla sig till avtalet.
- Upprepa INTE i varje svar att du inte är jurist – det står redan tydligt i gränssnittet.

${contractBlock}

ANALYS (JSON):
${analysisSummary}`

  const messages = [
    ...history.map(t => ({ role: t.role, content: t.content })),
    { role: 'user' as const, content: question },
  ]

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1000,
    system,
    messages,
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Oväntat svar från AI')
  }
  return content.text
}
