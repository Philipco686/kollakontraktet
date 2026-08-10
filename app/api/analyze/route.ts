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
import { analyzeContract } from '@/lib/analyze'
import type { AnalysisResult } from '@/types'

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

    // Teaser genererar bara sammanfattningen (billigt). Den fulla analysen
    // görs först när kunden betalat (via /api/analyze/full).
    let result: AnalysisResult
    try {
      result = await analyzeContract(contractText, isTeaser ? 'teaser' : 'full')
    } catch (e) {
      if (e instanceof Error && e.message === 'MAX_TOKENS') {
        return NextResponse.json(
          { error: 'Avtalet var för komplext för att analyseras i sin helhet. Prova att dela upp det.' },
          { status: 422 }
        )
      }
      throw e
    }

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

    return NextResponse.json({
      analysis: { ...analysis, result },
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
