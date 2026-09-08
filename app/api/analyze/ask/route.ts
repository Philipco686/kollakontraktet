import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@/lib/supabase/server'
import { getAnalysisById, PURGED_TEXT } from '@/lib/supabase/queries'
import { answerContractQuestion, type ChatTurn } from '@/lib/analyze'
import { checkRateLimit } from '@/lib/rate-limit'
import type { AnalysisResult } from '@/types'

// Svarar på en följdfråga om en redan upplåst (betald) analys.
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Ej autentiserad' }, { status: 401 })
    }

    const rate = await checkRateLimit(user.id, 'ask', 30, 60)
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'För många frågor på kort tid. Vänta en stund och försök igen.' },
        { status: 429 }
      )
    }

    const { id, question, history } = await request.json() as {
      id?: string
      question?: string
      history?: ChatTurn[]
    }

    if (!id || !question?.trim()) {
      return NextResponse.json({ error: 'Fråga saknas' }, { status: 400 })
    }
    if (question.length > 1000) {
      return NextResponse.json({ error: 'Frågan är för lång – korta ner den.' }, { status: 400 })
    }

    const analysis = await getAnalysisById(supabase, user.id, id)
    if (!analysis) {
      return NextResponse.json({ error: 'Analysen hittades inte' }, { status: 404 })
    }
    if (!analysis.is_unlocked) {
      return NextResponse.json({ error: 'Lås upp analysen för att ställa följdfrågor.' }, { status: 403 })
    }

    const result = analysis.result as AnalysisResult
    const contractText =
      analysis.original_text && analysis.original_text !== PURGED_TEXT
        ? analysis.original_text
        : null

    // Trimma historiken till de senaste turerna (kostnad + säkerhet)
    const safeHistory: ChatTurn[] = Array.isArray(history)
      ? history
          .filter(t => (t?.role === 'user' || t?.role === 'assistant') && typeof t?.content === 'string')
          .slice(-10)
      : []

    const answer = await answerContractQuestion(contractText, result, question.trim(), safeHistory)
    return NextResponse.json({ answer })
  } catch (error) {
    console.error('Följdfråge-fel:', error)
    if (error instanceof Anthropic.APIError && (error.status === 529 || error.status === 429)) {
      return NextResponse.json(
        { error: 'AI:n är överbelastad just nu. Försök igen om en stund.' },
        { status: 503 }
      )
    }
    return NextResponse.json({ error: 'Kunde inte svara på frågan. Försök igen.' }, { status: 500 })
  }
}
