import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import {
  getEffectiveSubscription,
  insertAnalysis,
  incrementAnalysisCount,
  getFreeAnalysesUsed,
  incrementFreeAnalysesUsed,
} from '@/lib/supabase/queries'
import { checkRateLimit } from '@/lib/rate-limit'
import type { AnalysisResult } from '@/types'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const MONTHLY_LIMIT: Record<string, number> = {
  personal: 5,
  business: Infinity,
  onetime: 1,
}

// Antal gratis teaser-analyser en användare utan paket får göra
const FREE_TEASER_LIMIT = 1

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Ej autentiserad' }, { status: 401 })
    }

    // Spärr mot spam: max 20 analyser per timme oavsett paket
    // (skyddar mot att ett kapat/obegränsat konto bränner AI-kostnader)
    const rate = await checkRateLimit(user.id, 'analyze', 20, 60)
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'För många analyser på kort tid. Vänta en stund och försök igen.' },
        { status: 429 }
      )
    }

    const { contractText, title } = await request.json()

    if (!contractText || contractText.trim().length < 50) {
      return NextResponse.json(
        { error: 'Avtalet är för kort för att analyseras' },
        { status: 400 }
      )
    }

    if (contractText.length > 100_000) {
      return NextResponse.json(
        { error: 'Avtalet är för långt (max ~100 000 tecken)' },
        { status: 400 }
      )
    }

    // Avgör om användaren har kvot kvar i sitt paket, annars kör vi en
    // gratis teaser (sammanfattning gratis, resten låst bakom betalning).
    const subscription = await getEffectiveSubscription(supabase, user.id, user.email)
    const limit = subscription?.plan ? MONTHLY_LIMIT[subscription.plan] ?? 0 : 0
    const hasQuota = !!subscription && subscription.analyses_used_this_month < limit

    let isTeaser = false
    if (!hasQuota) {
      const freeUsed = await getFreeAnalysesUsed(supabase, user.id)
      if (freeUsed >= FREE_TEASER_LIMIT) {
        return NextResponse.json(
          {
            error: subscription
              ? `Du har nått din månadsgräns på ${limit} analyser. Uppgradera för fler.`
              : 'Du har redan använt din gratis testanalys. Välj ett paket för att fortsätta.',
            needPlan: true,
          },
          { status: 403 }
        )
      }
      isTeaser = true
    }

    // Analysera med Claude
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8000,
      messages: [
        {
          role: 'user',
          content: `Du är en expert på svenska juridiska avtal. Analysera avtalet nedan som om du förklarar för en intelligent person utan juridisk utbildning – tydligt, konkret och ärligt.

Svara ENDAST med ett JSON-objekt i exakt detta format (inga förklaringar utanför JSON):

{
  "summary": "2-3 meningar som sammanfattar vad avtalet handlar om",
  "risk_level": "low|medium|high",

  "key_facts": [
    { "icon": "💰", "label": "Lön/ersättning", "value": "45 000 kr/mån" }
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
      "Vite vid avtalsbrott: 270 000 kr (6 mån × 45 000 kr)",
      "Bindningstid kvar: 150 000 kr"
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
- key_facts: 4-8 faktapunkter relevanta för detta specifika avtal (lön, hyra, tid, deposition, etc.)
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
${contractText}`,
        },
      ],
    })

    const content = message.content[0]
    if (content.type !== 'text') {
      throw new Error('Oväntat svar från AI')
    }

    if (message.stop_reason === 'max_tokens') {
      return NextResponse.json(
        { error: 'Avtalet var för komplext för att analyseras i sin helhet. Prova att dela upp det.' },
        { status: 422 }
      )
    }

    let result
    try {
      // Plocka ut JSON-objektet ur svaret (tål ev. inledande/avslutande text)
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('Inget JSON hittades')
      result = JSON.parse(jsonMatch[0])
    } catch {
      throw new Error('Kunde inte tolka AI-svaret')
    }

    // Spara hela analysen (även teaser sparas fullt – den låses bara upp vid köp)
    const { data: analysis, error: analysisError } = await insertAnalysis(supabase, {
      user_id: user.id,
      title: title || 'Namnlös analys',
      original_text: contractText,
      result,
      is_unlocked: !isTeaser,
    })

    if (analysisError) throw analysisError

    // Räkna upp rätt räknare beroende på om det var en teaser eller betald analys
    if (isTeaser) {
      const freeUsed = await getFreeAnalysesUsed(supabase, user.id)
      await incrementFreeAnalysesUsed(supabase, user.id, freeUsed)
    } else {
      await incrementAnalysisCount(supabase, subscription!.id, subscription!.analyses_used_this_month)
    }

    // För en teaser skickar vi bara en smakbit till klienten – resten är låst
    const fullResult = result as AnalysisResult
    const responseResult = isTeaser
      ? {
          summary: fullResult.summary,
          risk_level: fullResult.risk_level,
          key_facts: fullResult.key_facts,
        }
      : fullResult

    return NextResponse.json({
      analysis: { ...analysis, result: responseResult },
      locked: isTeaser,
    })
  } catch (error) {
    console.error('Analysfel:', error)

    // Tydligare felmeddelanden för kända fall
    if (error instanceof Anthropic.APIError) {
      if (error.status === 400 && error.message.includes('credit balance')) {
        return NextResponse.json(
          { error: 'Tjänsten är tillfälligt otillgänglig. Vi jobbar på det – försök igen om en stund.' },
          { status: 503 }
        )
      }
      if (error.status === 529 || error.status === 429) {
        return NextResponse.json(
          { error: 'AI:n är överbelastad just nu. Vänta en stund och försök igen.' },
          { status: 503 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Något gick fel vid analysen. Försök igen.' },
      { status: 500 }
    )
  }
}
