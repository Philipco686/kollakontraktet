'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowUp, FileText } from 'lucide-react'
import { clauseLabel, RISK_SHORT } from '@/lib/analysis/viewmodel'
import { CHAT_CHIPS } from '@/lib/analysis/suggestions'
import { useAnalysis } from './AnalysisProvider'
import { prefersReducedMotion, useFocusHeading } from './hooks'
import { FOCUS, RISK_STYLE } from './risk'

const CHIP = `inline-flex min-h-[44px] items-center rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-brand-500 hover:text-brand-700 disabled:opacity-50 ${FOCUS}`

export default function Chat() {
  const { analysis: a, base, chat, busy, error, retry, ask, consumeQuestion, sourceClauseId, setSourceClauseId } = useAnalysis()
  const h1 = useFocusHeading()
  const [draft, setDraft] = useState('')
  const log = useRef<HTMLDivElement>(null)
  const seen = useRef({ length: chat.length, busy })

  // En fråga som skickats från Översikt eller Detaljer skickas automatiskt, och bara en gång
  useEffect(() => {
    const q = consumeQuestion()
    if (q) void ask(q)
  }, [consumeQuestion, ask])

  // Scrolla ned till nytt innehåll, men inte bara för att man öppnar vyn igen
  useEffect(() => {
    const changed = chat.length !== seen.current.length || busy !== seen.current.busy
    seen.current = { length: chat.length, busy }
    if (changed) log.current?.lastElementChild?.scrollIntoView({ block: 'nearest', behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }, [chat.length, busy])

  const activeId = sourceClauseId ?? a.findings[0]?.clauseId ?? a.clauses[0]?.id ?? null
  const source = a.clauses.find(c => c.id === activeId) ?? null
  const clauseById = (id: string) => a.clauses.find(c => c.id === id)

  function submit() {
    const q = draft.trim()
    if (!q || busy) return
    setDraft('')
    void ask(q)
  }

  return (
    <div className="flex flex-wrap items-start gap-6">
      <section aria-label="Fråga om avtalet" className="flex min-h-[680px] min-w-0 flex-[999_1_520px] flex-col rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-3.5">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <Link href={base} className={`btn-secondary inline-flex min-h-[44px] items-center gap-1.5 px-3.5 py-2 text-sm ${FOCUS}`}>
              <ArrowLeft className="h-[18px] w-[18px]" aria-hidden="true" /> Översikt
            </Link>
            <h1 ref={h1} tabIndex={-1} className="min-w-0 text-[17px] font-bold text-slate-900 outline-none">{a.title}</h1>
            <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">Analyserat · {a.clauses.length} klausuler</span>
          </div>
          <Link href={`${base}/detaljer`} className={`btn-secondary inline-flex min-h-[44px] items-center px-4 py-2 text-sm ${FOCUS}`}>
            Detaljerad genomgång
          </Link>
        </div>

        <div ref={log} role="log" aria-live="polite" aria-label="Konversation" className="mx-auto flex w-full max-w-[800px] flex-1 flex-col gap-5 p-5 sm:p-6">
          {chat.length === 0 && !busy ? (
            <div className="px-4 py-12 text-center text-slate-600">
              <h2 className="mb-1.5 text-xl font-bold text-slate-900">Ställ en fråga om avtalet</h2>
              <p>Varje svar hänvisar till paragrafen det bygger på.</p>
            </div>
          ) : (
            chat.map((m, i) =>
              m.role === 'user' ? (
                <div key={i} className="max-w-[80%] self-end whitespace-pre-wrap rounded-[18px_18px_4px_18px] bg-brand-700 px-4 py-3 text-[15px] leading-relaxed text-white">
                  {m.text}
                </div>
              ) : (
                <div key={i} className="flex gap-3.5">
                  <Avatar />
                  <div className="min-w-0 flex-1 text-[15px] leading-relaxed text-slate-800">
                    {m.paragraphs?.map((p, j) => <p key={j} className="mb-2.5">{p}</p>)}
                    {m.list && m.list.length > 0 && (
                      <ul className="mb-3 list-disc space-y-1 pl-5">{m.list.map((li, j) => <li key={j}>{li}</li>)}</ul>
                    )}
                    {m.citations && m.citations.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {m.citations.map(id => {
                          const c = clauseById(id)
                          if (!c) return null
                          return (
                            <button
                              key={id}
                              type="button"
                              aria-pressed={id === activeId}
                              onClick={() => setSourceClauseId(id)}
                              className={`inline-flex min-h-[44px] items-center gap-2 rounded-lg border px-3 text-[13px] font-bold text-brand-700 transition-colors ${
                                id === activeId ? 'border-brand-600 bg-brand-50' : 'border-slate-200 bg-slate-50 hover:border-brand-400'
                              } ${FOCUS}`}
                            >
                              <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />{clauseLabel(c)}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )
            )
          )}
          {busy && (
            <div className="flex gap-3.5">
              <Avatar />
              <div className="pt-1.5 text-sm text-slate-600">Läser avtalet…</div>
            </div>
          )}
          {error && (
            <div role="alert" className="flex flex-wrap items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <span>{error}</span>
              <button type="button" onClick={retry} className={`min-h-[44px] rounded-lg px-3 font-bold underline ${FOCUS}`}>Försök igen</button>
            </div>
          )}
        </div>

        <div className="no-print mx-auto w-full max-w-[800px] px-5 pb-4">
          <div className="mb-2.5 flex flex-wrap gap-2">
            {CHAT_CHIPS.map(c => (
              <button key={c} type="button" disabled={busy} onClick={() => void ask(c)} className={CHIP}>{c}</button>
            ))}
          </div>
          <form
            onSubmit={e => { e.preventDefault(); submit() }}
            className="flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 py-2 pl-4 pr-2 focus-within:outline focus-within:outline-[3px] focus-within:outline-offset-2 focus-within:outline-brand-600"
          >
            <label htmlFor="chat-q" className="sr-only">Fråga om avtalet</label>
            <textarea
              id="chat-q"
              rows={2}
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); submit() }
              }}
              placeholder="Fråga något om avtalet…"
              className="min-w-0 flex-1 resize-none border-0 bg-transparent py-2 text-[15px] leading-normal text-slate-900 placeholder:text-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={busy || !draft.trim()}
              aria-label="Skicka"
              className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-white transition-colors hover:bg-brand-800 disabled:opacity-50 ${FOCUS}`}
            >
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
          <p className="mt-2.5 text-center text-[13px] text-slate-600">Svaren är vägledande och ersätter inte juridisk rådgivning.</p>
        </div>
      </section>

      <aside aria-label="Källa i avtalet" className="flex min-w-0 flex-[1_1_320px] flex-col gap-4">
        <section className="card p-5" aria-labelledby="source-h">
          <h2 id="source-h" className="mb-2.5 text-[15px] font-bold text-slate-900">Källa i avtalet</h2>
          <div className="rounded-xl border border-slate-100 bg-[#fbfaf7] p-[18px] font-doc text-[14.5px] leading-relaxed text-slate-800">
            {source ? (
              <>
                <div className="mb-1.5 font-semibold">{clauseLabel(source)}</div>
                <p><mark className="bg-[#ffe07a] px-0.5 text-slate-900">{source.text}</mark></p>
              </>
            ) : (
              <p className="font-sans text-sm text-slate-600">Välj en anmärkning för att se klausulen.</p>
            )}
          </div>
        </section>

        <section className="card p-5" aria-labelledby="flags-h">
          <h2 id="flags-h" className="text-[15px] font-bold text-slate-900">Alla anmärkningar</h2>
          <ul className="mt-2">
            {a.findings.map(f => {
              const c = clauseById(f.clauseId)
              return (
                <li key={f.id}>
                  <button
                    type="button"
                    aria-pressed={f.clauseId === activeId}
                    onClick={() => setSourceClauseId(f.clauseId)}
                    className={`flex min-h-[44px] w-full items-center gap-2.5 border-t border-slate-100 py-2 text-left text-sm text-slate-900 ${FOCUS}`}
                  >
                    <span className={`inline-block w-[52px] shrink-0 rounded-md py-1 text-center text-[11px] font-bold tracking-wide ${RISK_STYLE[f.risk].label}`}>{RISK_SHORT[f.risk]}</span>
                    <span className={`min-w-0 flex-1 ${f.clauseId === activeId ? 'font-bold' : ''}`}>{f.title}</span>
                    {c?.number && <span className="text-[13px] text-slate-600">{c.number}</span>}
                  </button>
                </li>
              )
            })}
          </ul>
        </section>
      </aside>
    </div>
  )
}

function Avatar() {
  return (
    <div aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-700">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M6.5 12.5l3.5 3.5 7.5-8" stroke="#FBBF24" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}
