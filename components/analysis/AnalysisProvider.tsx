'use client'

import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ViewAnalysis } from '@/lib/analysis/viewmodel'

export interface ChatMessage {
  role: 'user' | 'assistant'
  text?: string          // användarens fråga
  paragraphs?: string[]  // assistentens svar
  list?: string[]
  citations?: string[]   // klausul-id:n svaret bygger på
}

interface AnalysisContextValue {
  analysis: ViewAnalysis
  /** Adressen som vyerna ligger under, t.ex. /analys/<id>. Länkar och navigering byggs av den. */
  base: string
  chat: ChatMessage[]
  busy: boolean
  error: string
  sourceClauseId: string | null
  setSourceClauseId: (id: string) => void
  ask: (question: string) => Promise<void>
  retry: () => void
  /** Sparar en fråga som skickas automatiskt när chattvyn öppnas. Ligger kvar bara i minnet, aldrig i adressen. */
  queueQuestion: (question: string) => void
  /** Hämtar och rensar den väntande frågan i ett enda steg, så att den aldrig skickas två gånger. */
  consumeQuestion: () => string | null
  emailIncludeMissing: boolean
  toggleEmailMissing: () => void
}

const AnalysisContext = createContext<AnalysisContextValue | null>(null)

export function useAnalysis(): AnalysisContextValue {
  const ctx = useContext(AnalysisContext)
  if (!ctx) throw new Error('useAnalysis måste användas inom AnalysisProvider')
  return ctx
}

const toTurn = (m: ChatMessage) => ({
  role: m.role,
  content: m.role === 'user' ? m.text ?? '' : [...(m.paragraphs ?? []), ...(m.list ?? [])].join('\n\n'),
})

/* Ligger i layouten för alla tre vyerna. Layouter återmonteras inte när man byter vy, så
 * konversationen ligger kvar under hela besöket. All hämtning av data sker här (askQuestion)
 * och i lib/analysis/load.ts (getAnalysis), så att båda är lätta att byta ut. */
export default function AnalysisProvider({ analysis, base: baseProp, children }: { analysis: ViewAnalysis; base?: string; children: React.ReactNode }) {
  const [chat, setChat] = useState<ChatMessage[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [sourceClauseId, setSource] = useState<string | null>(null)
  const [emailIncludeMissing, setEmailIncludeMissing] = useState(false)

  const chatRef = useRef<ChatMessage[]>([])
  const busyRef = useRef(false)
  const pendingRef = useRef<string | null>(null)
  const lastQuestionRef = useRef('')
  const id = analysis.id
  const base = baseProp ?? `/analys/${id}`

  const ask = useCallback(async (question: string) => {
    const q = question.trim()
    if (!q || busyRef.current) return
    busyRef.current = true
    lastQuestionRef.current = q
    setBusy(true)
    setError('')
    const history = chatRef.current.slice(-10).map(toTurn)
    const next: ChatMessage[] = [...chatRef.current, { role: 'user', text: q }]
    chatRef.current = next
    setChat(next)
    try {
      const res = await fetch('/api/analyze/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, question: q, history }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Något gick fel. Försök igen.')
        return
      }
      const reply: ChatMessage = {
        role: 'assistant',
        paragraphs: Array.isArray(data.paragraphs) && data.paragraphs.length > 0 ? data.paragraphs : [String(data.answer ?? '')],
        list: Array.isArray(data.list) ? data.list : undefined,
        citations: Array.isArray(data.citations) ? data.citations : [],
      }
      const done = [...chatRef.current, reply]
      chatRef.current = done
      setChat(done)
      if (reply.citations && reply.citations.length > 0) setSource(reply.citations[0])
    } catch {
      setError('Nätverksfel. Försök igen.')
    } finally {
      busyRef.current = false
      setBusy(false)
    }
  }, [id])

  // Skickar om frågan som misslyckades. Det obesvarade meddelandet tas bort först så att frågan inte visas två gånger.
  const retry = useCallback(() => {
    const q = lastQuestionRef.current
    if (!q || busyRef.current) return
    const trimmed = chatRef.current.at(-1)?.role === 'user' ? chatRef.current.slice(0, -1) : chatRef.current
    chatRef.current = trimmed
    setChat(trimmed)
    void ask(q)
  }, [ask])

  const queueQuestion = useCallback((q: string) => {
    const t = q.trim()
    if (t) pendingRef.current = t
  }, [])

  const consumeQuestion = useCallback(() => {
    const q = pendingRef.current
    pendingRef.current = null
    return q
  }, [])

  const value = useMemo<AnalysisContextValue>(() => ({
    analysis, base, chat, busy, error, sourceClauseId,
    setSourceClauseId: setSource,
    ask, retry, queueQuestion, consumeQuestion,
    emailIncludeMissing,
    toggleEmailMissing: () => setEmailIncludeMissing(v => !v),
  }), [analysis, base, chat, busy, error, sourceClauseId, ask, retry, queueQuestion, consumeQuestion, emailIncludeMissing])

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>
}
