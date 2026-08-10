import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { getAnalysisById, updateAnalysisResult, PURGED_TEXT } from '@/lib/supabase/queries'
import { analyzeContract } from '@/lib/analyze'
import { checkRateLimit } from '@/lib/rate-limit'
import type { AnalysisResult } from '@/types'

// Genererar hela analysen för en redan upplåst (betald) analys som bara har en teaser.
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Ej autentiserad' }, { status: 401 })
    }

    const rate = await checkRateLimit(user.id, 'analyze', 20, 60)
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'För många analyser på kort tid. Vänta en stund och försök igen.' },
        { status: 429 }
      )
    }

    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: 'Analys saknas' }, { status: 400 })
    }

    const analysis = await getAnalysisById(supabase, user.id, id)
    if (!analysis) {
      return NextResponse.json({ error: 'Analysen hittades inte' }, { status: 404 })
    }
    if (!analysis.is_unlocked) {
      return NextResponse.json({ error: 'Analysen är inte upplåst. Betala för att låsa upp.' }, { status: 403 })
    }

    // Redan full? Returnera den som den är (idempotent)
    const existing = analysis.result as AnalysisResult
    if (existing?.clauses && existing.clauses.length > 0) {
      return NextResponse.json({ result: existing })
    }

    if (!analysis.original_text || analysis.original_text === PURGED_TEXT) {
      return NextResponse.json(
        { error: 'Avtalstexten har raderats och analysen kan inte genereras på nytt.' },
        { status: 410 }
      )
    }

    const full = await analyzeContract(analysis.original_text, 'full')
    await updateAnalysisResult(supabase, id, user.id, full)

    return NextResponse.json({ result: full })
  } catch (error) {
    console.error('Full-analysfel:', error)
    if (error instanceof Anthropic.APIError && (error.status === 529 || error.status === 429)) {
      return NextResponse.json({ error: 'AI:n är överbelastad just nu. Försök igen om en stund.' }, { status: 503 })
    }
    return NextResponse.json({ error: 'Kunde inte generera analysen. Försök igen.' }, { status: 500 })
  }
}
