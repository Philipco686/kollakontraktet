'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Download, Mail, Scale } from 'lucide-react'
import { buildNegotiationEmail } from '@/lib/analysis/email-draft'
import { overviewChips } from '@/lib/analysis/suggestions'
import { RISK_LABEL } from '@/lib/analysis/viewmodel'
import { useAnalysis } from './AnalysisProvider'
import { useCopied, useFocusHeading, useGoAsk } from './hooks'
import { FINDING_ICON, FOCUS, RiskLabel, RiskSquare } from './risk'
import ScoreRing from './ScoreRing'
import ExtraCards from './ExtraCards'
import { GenerateFullPanel, PaywallPanel } from './UnlockPanels'

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Stockholm' })

const CHIP = `inline-flex min-h-[44px] items-center rounded-xl border border-slate-200 bg-white px-4 text-left text-sm font-semibold text-slate-700 transition-colors hover:border-brand-500 hover:text-brand-700 ${FOCUS}`

export default function Overview() {
  const { analysis: a } = useAnalysis()
  const h1 = useFocusHeading()
  const full = a.state === 'full'
  const hasSuggestions = a.findings.some(f => f.suggestion)

  return (
    <div className="space-y-6">
      <HeadRow />

      <div className="flex flex-wrap gap-6">
        <section className="card flex min-w-0 flex-[2_1_520px] flex-wrap items-center gap-7 p-5 sm:p-7" aria-label="Sammanfattning">
          {a.score !== null && <ScoreRing score={a.score} />}
          <div className="min-w-0 flex-[1_1_280px]">
            <RiskLabel risk={a.verdict.tone} text={a.verdict.label} />
            <h1
              ref={h1}
              tabIndex={-1}
              className="mb-2.5 mt-3.5 font-display text-2xl font-medium leading-tight tracking-tight text-slate-900 outline-none sm:text-[30px]"
            >
              {a.verdict.headline}
            </h1>
            <p className="mb-5 text-base leading-relaxed text-slate-600">{a.verdict.summary}</p>
            {full && <HeroActions hasSuggestions={hasSuggestions} />}
          </div>
        </section>

        {a.keyTerms.length > 0 && (
          <section className="card min-w-0 flex-[1_1_300px] p-5 sm:p-7" aria-labelledby="facts-h">
            <h2 id="facts-h" className="mb-3 text-[17px] font-bold text-slate-900">Det här binder du dig till</h2>
            <dl>
              {a.keyTerms.map((k, i) => (
                <div key={i} className="flex justify-between gap-3 border-t border-slate-100 py-3 text-[15px]">
                  <dt className="font-semibold text-slate-600">{k.label}</dt>
                  <dd className="m-0 text-right font-bold text-slate-900">{k.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
      </div>

      {a.state === 'locked' && <PaywallPanel />}
      {a.state === 'needs-generation' && <GenerateFullPanel />}

      {full && (
        <>
          <Tiles />
          <div className="flex flex-wrap gap-6">
            {a.missing.length > 0 && <MissingCard />}
            <AskCard />
          </div>
          <ExtraCards extras={a.extras} />
        </>
      )}

      <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs leading-relaxed text-slate-600">
        <Scale className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>
          <strong>Inte juridisk rådgivning.</strong> Detta är en AI-genererad tolkning i informationssyfte och kan
          innehålla fel. Fatta inte viktiga beslut enbart baserat på analysen. Rådgör med en jurist vid osäkerhet.
        </span>
      </div>

      <Link href="/analyze" className="btn-secondary no-print block w-full text-center">Analysera nytt avtal</Link>
    </div>
  )
}

/* Rubrikrad: namn och datum till vänster, åtgärder till höger */
function HeadRow() {
  const { analysis: a } = useAnalysis()
  const full = a.state === 'full'
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm font-semibold text-slate-600">
        {a.title}
        <span aria-hidden="true"> · </span>
        <span>Analyserad {fmtDate(a.createdAt)}</span>
      </p>
      {full && (
        <div className="no-print flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className={`btn-secondary inline-flex min-h-[44px] items-center gap-2 px-4 py-2 text-sm ${FOCUS}`}
          >
            <Download className="h-4 w-4" aria-hidden="true" /> Ladda ner PDF
          </button>
          <EmailAnalysisButton analysisId={a.id} />
        </div>
      )}
    </div>
  )
}

function EmailAnalysisButton({ analysisId }: { analysisId: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [msg, setMsg] = useState('')

  async function send() {
    setState('sending')
    try {
      const res = await fetch('/api/email-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisId }),
      })
      const data = await res.json()
      if (!res.ok) { setState('error'); setMsg(data.error ?? 'Kunde inte skicka'); return }
      setState('sent')
    } catch {
      setState('error'); setMsg('Nätverksfel. Försök igen')
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={send}
        disabled={state === 'sending' || state === 'sent'}
        className={`btn-secondary inline-flex min-h-[44px] items-center gap-2 px-4 py-2 text-sm ${FOCUS}`}
      >
        {state === 'sending' ? 'Skickar...' : state === 'sent'
          ? <><Check className="h-4 w-4" aria-hidden="true" /> Skickad</>
          : <><Mail className="h-4 w-4" aria-hidden="true" /> Maila analysen</>}
      </button>
      {state === 'error' && <span role="alert" className="text-sm text-red-700">{msg}</span>}
    </>
  )
}

/* Sidans viktigaste knapp, direkt under rubriken */
function HeroActions({ hasSuggestions }: { hasSuggestions: boolean }) {
  const { analysis: a, base, emailIncludeMissing } = useAnalysis()
  const [copied, copy] = useCopied()
  const draft = useMemo(() => buildNegotiationEmail(a, emailIncludeMissing), [a, emailIncludeMissing])

  return (
    <>
      <div className="no-print flex flex-wrap items-center gap-2.5">
        <Link
          href={`${base}/detaljer`}
          className={`btn-accent inline-flex min-h-14 items-center justify-center gap-2 px-5 text-[15px] font-bold shadow-lg shadow-slate-900/15 ${FOCUS}`}
        >
          Se detaljerad genomgång <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
        {draft && (
          <button
            type="button"
            onClick={() => void copy(draft)}
            className={`btn-secondary inline-flex min-h-14 items-center justify-center gap-2 px-5 text-[15px] ${FOCUS}`}
          >
            {copied ? <><Check className="h-5 w-5" aria-hidden="true" /> Kopierat</> : 'Skapa förhandlingsmejl'}
          </button>
        )}
      </div>
      <p className="mt-2.5 text-sm text-slate-600">
        {hasSuggestions
          ? 'Varje klausul markerad i avtalet, med förslag på nya formuleringar.'
          : 'Varje klausul genomgången och förklarad på vanlig svenska.'}
        {draft && ' Mejlutkastet kopieras till urklipp, inget skickas.'}
      </p>
      <span className="sr-only" role="status">{copied ? 'Förhandlingsmejlet kopierades till urklipp' : ''}</span>
    </>
  )
}

function Tiles() {
  const { analysis: a, base } = useAnalysis()
  const clauseOf = (id: string) => a.clauses.find(c => c.id === id)
  if (a.findings.length === 0) return null

  return (
    <section aria-labelledby="tiles-h">
      <div className="mb-3.5 flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="tiles-h" className="font-display text-[22px] font-medium tracking-tight text-slate-900">Genomgång per område</h2>
        <div className="flex flex-wrap gap-3.5 text-[13px] font-semibold text-slate-600">
          {(['high', 'medium', 'low'] as const).map(r => (
            <span key={r} className="flex items-center gap-1.5"><RiskSquare risk={r} />{RISK_LABEL[r]}</span>
          ))}
        </div>
      </div>
      <div className="grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
        {a.findings.map(f => {
          const c = clauseOf(f.clauseId)
          const Icon = FINDING_ICON[f.icon]
          return (
            <article key={f.id} className="card flex flex-col gap-2.5 p-5">
              <div className="flex items-center justify-between gap-2">
                <div aria-hidden="true" className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-[22px] w-[22px]" />
                </div>
                <RiskLabel risk={f.risk} />
              </div>
              <h3 className="mt-1 text-[17px] font-bold text-slate-900">{f.area}</h3>
              <p className="flex-1 text-[15px] leading-relaxed text-slate-600">{f.short}</p>
              <Link
                href={`${base}/detaljer?anmarkning=${f.id}`}
                className={`inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-700 hover:underline ${FOCUS}`}
              >
                {c?.number ? `${c.number} · ` : ''}Visa i avtalet
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function MissingCard() {
  const { analysis: a, emailIncludeMissing, toggleEmailMissing } = useAnalysis()
  return (
    <section className="min-w-0 flex-[1_1_320px] rounded-2xl bg-slate-900 p-6 text-white sm:p-7" aria-labelledby="missing-h">
      <h2 id="missing-h" className="mb-2.5 text-xl font-bold">Det här saknas</h2>
      {a.missing.map((m, i) => (
        <p key={i} className="mb-4 text-[15px] leading-relaxed text-slate-300">
          {m.title && <strong className="text-white">{m.title}: </strong>}{m.body}
        </p>
      ))}
      <button
        type="button"
        aria-pressed={emailIncludeMissing}
        onClick={toggleEmailMissing}
        className="no-print inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-slate-500 px-5 text-[15px] font-bold text-white transition-colors hover:bg-slate-800 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {emailIncludeMissing
          ? <><Check className="h-4 w-4" aria-hidden="true" /> Tillagd i förhandlingsmejlet</>
          : 'Lägg till i förhandlingsmejlet'}
      </button>
    </section>
  )
}

function AskCard() {
  const { analysis: a } = useAnalysis()
  const goAsk = useGoAsk()
  const [value, setValue] = useState('')

  return (
    <section className="card no-print min-w-0 flex-[2_1_420px] p-5 sm:p-7" aria-labelledby="ask-h">
      <h2 id="ask-h" className="mb-1 text-xl font-bold text-slate-900">Fråga om avtalet</h2>
      <p className="mb-3.5 text-sm text-slate-600">Svaret öppnas i chatten, med hänvisning till rätt paragraf.</p>
      <form onSubmit={e => { e.preventDefault(); goAsk(value) }} className="flex flex-wrap gap-2.5">
        <label htmlFor="ask-input" className="sr-only">Din fråga</label>
        <input
          id="ask-input"
          type="text"
          autoComplete="off"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Till exempel: Kan jag säga upp avtalet i förtid?"
          className="input h-[50px] min-w-0 flex-[1_1_280px] py-0"
        />
        <button type="submit" className={`btn-primary inline-flex min-h-[50px] items-center gap-2 ${FOCUS}`}>
          Fråga <ArrowRight className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
      </form>
      <div className="mt-3.5 flex flex-wrap gap-2">
        {overviewChips(a).map(c => (
          <button key={c} type="button" onClick={() => goAsk(c)} className={CHIP}>{c}</button>
        ))}
      </div>
      <p className="mt-4 text-[13px] text-slate-600">Analysen är vägledande och ersätter inte juridisk rådgivning.</p>
    </section>
  )
}
