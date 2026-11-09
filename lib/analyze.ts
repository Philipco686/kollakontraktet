import Anthropic from '@anthropic-ai/sdk'
import type { AnalysisResult } from '@/types'
import { stripDashesDeep } from '@/lib/text'
import { clauseIdAt } from '@/lib/analysis/viewmodel'

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

// Prompten ber AI:n att undvika tankstreck, och stripDashesDeep tar bort de som ändå slinker igenom.
// Avtalscitat (original_text) lämnas orörda eftersom de ska återges ordagrant.

// Kort, billig prompt, bara det som visas i teasern
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
- Använd aldrig tankstreck eller långa streck i texten. Skriv med punkt, komma eller kolon i stället.
- Svara med enbart JSON-objektet, utan inledande text eller markdown.

AVTAL ATT ANALYSERA:
${contractText}`
}

// Full prompt, hela analysen
function fullPrompt(contractText: string): string {
  return `Du är en expert på svenska juridiska avtal. Analysera avtalet nedan som om du förklarar för en intelligent person utan juridisk utbildning: tydligt, konkret och ärligt.

Svara ENDAST med ett JSON-objekt i exakt detta format (inga förklaringar utanför JSON):

{
  "summary": "2-3 meningar som sammanfattar vad avtalet handlar om",
  "risk_level": "low|medium|high",
  "contract_type": "Typ av avtal i en eller två ord, t.ex. Anställningsavtal, Hyreskontrakt, Konsultavtal",
  "verdict": {
    "headline": "En mening, max 110 tecken, som säger vad helheten betyder för användaren"
  },
  "key_facts": [
    { "label": "Lön/ersättning", "value": "45 000 kr/mån" }
  ],
  "clauses": [
    {
      "title": "Klausulens namn",
      "number": "Klausulens nummer exakt som i avtalet, t.ex. \"§ 9\" eller \"9.\", eller null om avtalet inte numrerar sina klausuler",
      "original_text": "Citera texten från avtalet",
      "plain_explanation": "Förklara på vanlig svenska vad detta innebär i praktiken",
      "area": "Området i 1-3 ord, t.ex. Konkurrens, Uppsägning, Lön",
      "icon": "shield|pencil|exit|coin|calendar|lock",
      "short": "En mening, max 140 tecken, om vad klausulen betyder för användaren",
      "suggestion": "Förslag på ny avtalstext som användaren kan föreslå, eller null om ingen ändring behövs",
      "risk_level": "low|medium|high",
      "is_important": true
    }
  ],
  "common_traps": [
    "Fälla #1 som folk ofta missar i just detta avtal, t.ex. automatisk förlängning"
  ],
  "consequences": [
    "Om du bryter mot X kan Y hända, beskriv konsekvenser konkret och i kronor om möjligt"
  ],
  "unusual_terms": [
    "Denna klausul är ovanlig jämfört med normala svenska avtal, förklara varför"
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
      "24 månaders uppsägningstid är ovanligt lång, standard är 3 månader"
    ]
  },
  "recommendations": [
    "Konkret råd #1"
  ],
  "missing": [
    { "title": "Kort rubrik", "body": "Vad som normalt ingår i den här typen av avtal men saknas här, och varför det spelar roll" }
  ]
}

Regler:
- Skriv allt på svenska
- Förklara som till en smart vän, inte som jurist
- verdict.headline: max 110 tecken, tilltala användaren med "du" och aldrig med namn. Den ska passa risk_level. Säg aldrig att avtalet är bra om risk_level är "high"
- clauses[].number: skriv exakt så som klausulen är numrerad i avtalet. Hitta ALDRIG på ett nummer, använd null om avtalet saknar numrering
- clauses[].icon: shield = skydd, konkurrens eller ansvar. pencil = ändring av villkor. exit = uppsägning eller avslut. coin = pengar eller betalning. calendar = tid, datum eller perioder. lock = sekretess
- clauses[].suggestion: bara för klausuler med risk_level "medium" eller "high". Skriv det som färdig avtalstext. Alltid null när risk_level är "low"
- missing: 0-3 saker som normalt finns i den här typen av avtal men saknas här. Tom lista om inget saknas
- risk_level "high" = kan kosta mycket pengar eller förlust av rättigheter
- key_facts: 4-8 faktapunkter relevanta för detta specifika avtal
- clauses: inkludera 6-12 viktiga klausuler, i den ordning de förekommer i avtalet (inte i viktighetsordning)
- common_traps: 3-5 saker folk typiskt missar i just denna typ av avtal
- consequences: beskriv konkreta följder om man bryter avtalet
- unusual_terms: markera det som INTE är standard i Sverige
- economic_risk.max_amount: beräkna worst-case i SEK (0 om ej tillämpligt)
- timeline: plocka ut alla viktiga datum/deadlines från avtalet
- pre_signing_checklist: 4-6 konkreta frågor att ställa motparten
- standard_comparison.percentage_standard: uppskatta hur standardenligt avtalet är (0-100)
- Använd aldrig tankstreck eller långa streck i texten (utom i citat ur avtalet). Skriv med punkt, komma eller kolon i stället.

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
    max_tokens: mode === 'teaser' ? 1500 : 10000,
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
  return stripDashesDeep(JSON.parse(jsonMatch[0]) as AnalysisResult, ['original_text'])
}

export interface ChatTurn {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatReply {
  paragraphs: string[]
  list?: string[]
  citations: string[] // id på klausuler (c1, c2, ...) som svaret bygger på
}

const isText = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0

/**
 * Gör om AI:ns svar till ett ChatReply. Svaret ska vara ett JSON-objekt, men om AI:n svarar med
 * vanlig text använder vi den som den är i stället för att visa ett fel. Hänvisningar som inte
 * pekar på en riktig klausul tas bort, så att en källknapp alltid leder till rätt paragraf.
 */
export function parseChatReply(raw: string, validIds: Set<string>): ChatReply {
  const text = raw.trim()
  const m = text.match(/\{[\s\S]*\}/)
  if (m) {
    try {
      const j = JSON.parse(m[0]) as { paragraphs?: unknown; list?: unknown; citations?: unknown }
      const paragraphs = Array.isArray(j.paragraphs) ? j.paragraphs.filter(isText).map(p => p.trim()) : []
      if (paragraphs.length > 0) {
        const list = Array.isArray(j.list) ? j.list.filter(isText).map(p => p.trim()) : []
        const citations = Array.isArray(j.citations)
          ? [...new Set(j.citations.filter((c): c is string => typeof c === 'string' && validIds.has(c)))].slice(0, 3)
          : []
        return stripDashesDeep({ paragraphs, ...(list.length > 0 ? { list } : {}), citations })
      }
    } catch {
      // faller igenom till vanlig text nedan
    }
  }
  if (text.startsWith('{')) {
    return { paragraphs: ['Jag kunde inte formulera ett svar just nu. Försök igen.'], citations: [] }
  }
  const paragraphs = text.replace(/^```\w*\s*|\s*```$/g, '').split(/\n{2,}/).map(s => s.trim()).filter(Boolean)
  return stripDashesDeep({
    paragraphs: paragraphs.length > 0 ? paragraphs : ['Jag kunde inte formulera ett svar just nu. Försök igen.'],
    citations: [],
  })
}

/**
 * Svarar på en följdfråga om ett redan analyserat avtal. Grundar svaret i avtalstexten
 * (om den finns kvar) och den sparade analysen, och anger vilka klausuler svaret bygger på.
 * Låter Anthropic-fel bubbla upp för hantering i route.
 */
export async function answerWithCitations(
  contractText: string | null,
  analysis: AnalysisResult,
  question: string,
  history: ChatTurn[] = []
): Promise<ChatReply> {
  const clauses = analysis.clauses ?? []
  const validIds = new Set(clauses.map((_, i) => clauseIdAt(i)))

  const contractBlock = contractText
    ? `AVTALSTEXT:\n${contractText}`
    : `AVTALSTEXTEN HAR RADERATS (av integritetsskäl efter 90 dagar). Grunda svaret på sammanfattningen och klausulerna nedan.`

  const clauseBlock = clauses
    .map((c, i) => `${clauseIdAt(i)}: ${c.number ? `${c.number} ` : ''}${c.title} (risk: ${c.risk_level})\nCitat: ${c.original_text}\nFörklaring: ${c.plain_explanation}`)
    .join('\n\n')

  const analysisSummary = JSON.stringify({
    summary: analysis.summary,
    risk_level: analysis.risk_level,
    key_facts: analysis.key_facts,
    economic_risk: analysis.economic_risk,
    common_traps: analysis.common_traps,
    unusual_terms: analysis.unusual_terms,
  })

  const system = `Du är en hjälpsam expert på svenska avtal. Användaren har redan fått en analys av ETT specifikt avtal och ställer nu följdfrågor om det.

Svara ENDAST med ett JSON-objekt i exakt detta format, utan text före eller efter och utan markdown:

{
  "paragraphs": ["1-3 korta stycken"],
  "list": ["valfri punktlista, utelämna fältet om den inte behövs"],
  "citations": ["id på de klausuler svaret bygger på, t.ex. c5"]
}

Regler:
- Svara ALLTID på svenska, tydligt och konkret, som till en smart vän utan juridisk utbildning.
- Grunda svaret i avtalet och analysen nedan. Om svaret inte framgår av materialet, säg det ärligt i stället för att gissa, och låt citations vara tom.
- citations: 0-3 id, ENDAST id ur listan KLAUSULER nedan. Hitta aldrig på id. Ta bara med klausuler som svaret faktiskt bygger på.
- Håll svaret kort och fokuserat (oftast under 150 ord) om inte frågan kräver mer.
- Håll dig till detta avtal. Om användaren frågar om något helt orelaterat, be dem vänligt hålla sig till avtalet.
- Upprepa INTE i varje svar att du inte är jurist. Det står redan tydligt i gränssnittet.
- Använd aldrig tankstreck eller långa streck i texten. Skriv med punkt, komma eller kolon i stället.
- Skriv ingen markdown (inga asterisker, rubriker eller numrering) i texterna.

${contractBlock}

KLAUSULER:
${clauseBlock}

ANALYS (JSON):
${analysisSummary}`

  const messages = [
    ...history.map(t => ({ role: t.role, content: t.content })),
    { role: 'user' as const, content: question },
  ]

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1200,
    system,
    messages,
  })

  const content = message.content[0]
  if (content.type !== 'text') {
    throw new Error('Oväntat svar från AI')
  }
  return parseChatReply(content.text, validIds)
}
