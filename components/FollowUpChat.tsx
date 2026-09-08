'use client'

import { useState } from 'react'

type Turn = { role: 'user' | 'assistant'; content: string }

const SUGGESTIONS = [
  'Vad är den största risken för mig?',
  'Vad bör jag försöka förhandla om?',
  'Är något ovanligt i det här avtalet?',
  'Vad gäller om jag vill säga upp avtalet?',
]

export default function FollowUpChat({ analysisId }: { analysisId: string }) {
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function ask(question: string) {
    const q = question.trim()
    if (!q || loading) return
    setError('')
    setInput('')
    const history = turns
    setTurns([...turns, { role: 'user', content: q }])
    setLoading(true)
    try {
      const res = await fetch('/api/analyze/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: analysisId, question: q, history }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Något gick fel')
        return
      }
      setTurns(prev => [...prev, { role: 'assistant', content: data.answer }])
    } catch {
      setError('Nätverksfel – försök igen')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card no-print">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xl">💬</span>
        <h3 className="font-semibold text-slate-900">Fråga om avtalet</h3>
      </div>
      <p className="text-sm text-slate-500 mb-4">
        Undrar du vad en specifik klausul betyder för just dig? Ställ en följdfråga så förklarar vi.
      </p>

      {turns.length > 0 && (
        <div className="space-y-3 mb-4">
          {turns.map((t, i) => (
            <div key={i} className={t.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
              <div
                className={
                  t.role === 'user'
                    ? 'bg-brand-600 text-white rounded-2xl rounded-br-sm px-4 py-2.5 text-sm max-w-[85%]'
                    : 'bg-slate-100 text-slate-800 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm max-w-[85%] whitespace-pre-wrap leading-relaxed'
                }
              >
                {t.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 text-slate-500 rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse-dot" />
                Tänker...
              </div>
            </div>
          )}
        </div>
      )}

      {turns.length === 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => ask(s)}
              disabled={loading}
              className="text-xs bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-200 text-slate-600 rounded-full px-3 py-1.5 transition-colors disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <form onSubmit={e => { e.preventDefault(); ask(input) }} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Skriv din fråga..."
          disabled={loading}
          maxLength={1000}
          className="input flex-1"
        />
        <button type="submit" disabled={loading || !input.trim()} className="btn-primary px-5 disabled:opacity-50">
          Fråga
        </button>
      </form>

      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

      <p className="text-xs text-slate-400 mt-3">
        ⚖️ AI-genererade svar i informationssyfte – inte juridisk rådgivning.
      </p>
    </div>
  )
}
