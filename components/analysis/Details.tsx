'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { clauseLabel, RISK_LABEL, type ViewAnalysis, type ViewFinding } from '@/lib/analysis/viewmodel'
import { whyFlaggedQuestion } from '@/lib/analysis/suggestions'
import { useAnalysis } from './AnalysisProvider'
import { prefersReducedMotion, useCopied, useFocusHeading, useGoAsk } from './hooks'
import { FOCUS, RISK_STYLE, RiskLabel, RiskSquare } from './risk'

const scrollToClause = (clauseId: string) =>
  document.getElementById(`clause-${clauseId}`)?.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'center',
  })

export default function Details({ initialFinding }: { initialFinding?: string }) {
  const { analysis: a, base } = useAnalysis()
  const h1 = useFocusHeading()
  const valid = a.findings.some(f => f.id === initialFinding) ? initialFinding : undefined
  const [selected, setSelected] = useState<string | null>(valid ?? a.findings[0]?.id ?? null)
  const findingByClause = Object.fromEntries(a.findings.map(f => [f.clauseId, f]))

  // Kommer man från ett riskkort i Översikt scrollas klausulen in i vyn
  useEffect(() => {
    const f = a.findings.find(x => x.id === valid)
    if (f) scrollToClause(f.clauseId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function toggle(f: ViewFinding) {
    const opening = selected !== f.id
    setSelected(opening ? f.id : null)
    if (opening) scrollToClause(f.clauseId)
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-4">
          <Link href={base} className={`btn-secondary inline-flex min-h-[44px] items-center gap-1.5 px-3.5 py-2 text-sm ${FOCUS}`}>
            <ArrowLeft className="h-[18px] w-[18px]" aria-hidden="true" /> Översikt
          </Link>
          <nav aria-label="Brödsmulor" className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-600">
            <Link href="/history" className={`inline-flex min-h-[44px] items-center hover:underline ${FOCUS}`}>Historik</Link>
            <span aria-hidden="true">/</span>
            <Link href={base} className={`inline-flex min-h-[44px] items-center hover:underline ${FOCUS}`}>{a.title}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-slate-900">Detaljerad genomgång</span>
          </nav>
        </div>
        <div className="no-print flex flex-wrap gap-2">
          <button type="button" onClick={() => window.print()} className={`btn-secondary min-h-[44px] px-4 py-2 text-sm ${FOCUS}`}>
            Ladda ner rapport
          </button>
          <Link href={`${base}/fraga`} className={`btn-primary inline-flex min-h-[44px] items-center px-5 py-2 text-sm ${FOCUS}`}>
            Fråga om avtalet
          </Link>
        </div>
      </div>
      <h1 ref={h1} tabIndex={-1} className="sr-only">Detaljerad genomgång av {a.title}</h1>

      <div className="flex flex-wrap items-start gap-6">
        <section
          aria-label="Avtalstext"
          className="min-w-0 flex-[999_1_560px] rounded-2xl border border-slate-100 bg-white px-5 py-10 shadow-sm sm:px-12 lg:px-16"
        >
          <h2 className="mb-1.5 text-center font-display text-[26px] font-medium text-slate-900">{a.contractType ?? a.title}</h2>
          <p className="mb-9 text-center text-sm text-slate-600">
            {a.clauses.length} klausuler, citerade ordagrant ur avtalet. Markerade stycken har anmärkningar.
          </p>
          <div className="flex flex-col gap-2">
            {a.clauses.map(c => {
              const f = findingByClause[c.id]
              return (
                <div
                  key={c.id}
                  id={`clause-${c.id}`}
                  className={`scroll-mt-24 rounded-xl p-4 transition-shadow ${f ? RISK_STYLE[f.risk].tint : ''} ${f && f.id === selected ? 'ring-2 ring-brand-600' : ''}`}
                >
                  <div className="mb-1.5 flex items-baseline justify-between gap-3">
                    <h3 className="font-doc text-base font-semibold text-slate-900">{clauseLabel(c)}</h3>
                    {f && <RiskLabel risk={f.risk} />}
                  </div>
                  <p className="font-doc text-[15.5px] leading-relaxed text-slate-800">{c.text}</p>
                </div>
              )
            })}
          </div>
        </section>

        <aside aria-label="Analys" className="flex min-w-0 flex-[1_1_360px] flex-col gap-4">
          <Verdict a={a} />

          <section className="card p-5 pb-2" aria-labelledby="findings-h">
            <h2 id="findings-h" className="mb-2 text-base font-bold text-slate-900">Anmärkningar</h2>
            <ul>
              {a.findings.map(f => (
                <FindingItem key={f.id} a={a} f={f} open={f.id === selected} onToggle={() => toggle(f)} />
              ))}
            </ul>
          </section>

          {a.missing.length > 0 && (
            <section className="rounded-2xl border border-dashed border-slate-400 bg-white p-5 print-block">
              <h2 className="text-[15px] font-bold text-slate-900">Saknas i avtalet</h2>
              {a.missing.map((m, i) => (
                <p key={i} className="mt-2 text-sm leading-relaxed text-slate-700">
                  {m.title && <strong>{m.title}: </strong>}{m.body} Fråga motparten vad som gäller innan du skriver under.
                </p>
              ))}
            </section>
          )}

          <p className="text-[13px] text-slate-600">Analysen är vägledande och ersätter inte juridisk rådgivning.</p>
        </aside>
      </div>
    </div>
  )
}

function Verdict({ a }: { a: ViewAnalysis }) {
  const n = (r: 'high' | 'medium' | 'low') => a.findings.filter(f => f.risk === r).length
  const boxes = [
    { count: n('high'), label: 'Hög risk', cls: 'bg-red-100 text-red-900' },
    { count: n('medium'), label: 'Medel', cls: 'bg-amber-100 text-amber-900' },
    { count: n('low'), label: 'Låg', cls: 'bg-green-100 text-green-900' },
    { count: a.missing.length, label: 'Saknas', cls: 'bg-slate-100 text-slate-800' },
  ]
  return (
    <section className="card p-5" aria-labelledby="verdict-h">
      <div className="text-xs font-bold uppercase tracking-[0.08em] text-slate-600">Bedömning</div>
      <h2 id="verdict-h" className="my-1.5 text-[22px] font-bold leading-tight text-slate-900">{a.verdict.label}</h2>
      <p className="mb-4 text-sm leading-relaxed text-slate-600">{a.verdict.summary}</p>
      <div className="grid grid-cols-4 gap-2">
        {boxes.map(b => (
          <div key={b.label} className={`rounded-xl px-1.5 py-2.5 text-center ${b.cls}`}>
            <b className="block text-[22px] font-bold">{b.count}</b>
            <span className="text-xs font-bold">{b.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function FindingItem({ a, f, open, onToggle }: { a: ViewAnalysis; f: ViewFinding; open: boolean; onToggle: () => void }) {
  const goAsk = useGoAsk()
  const [copied, copy] = useCopied()
  const clause = a.clauses.find(c => c.id === f.clauseId)
  const meta = `${clause?.number ? `${clause.number} · ` : ''}${RISK_LABEL[f.risk]}`

  return (
    <li className="border-t border-slate-100 first:border-t-0 print-block">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`fb-${f.id}`}
        className={`flex min-h-[58px] w-full items-center gap-3 px-1 py-2.5 text-left ${FOCUS}`}
      >
        <RiskSquare risk={f.risk} />
        <span className="min-w-0 flex-1">
          <span className="block text-[14.5px] font-bold text-slate-900">{f.title}</span>
          <span className="mt-0.5 block text-[13px] text-slate-600">{meta}</span>
        </span>
        <ChevronRight className={`h-[18px] w-[18px] shrink-0 text-slate-500 transition-transform ${open ? 'rotate-90' : ''}`} aria-hidden="true" />
      </button>
      <div id={`fb-${f.id}`} hidden={!open} className="print-expand pb-4 pl-6 pr-1">
        <p className="mb-3 text-sm leading-relaxed text-slate-700">{f.body}</p>
        {f.suggestion ? (
          <>
            <div className="rounded-xl bg-brand-50 px-3.5 py-3">
              <div className="mb-1 text-xs font-bold text-brand-700">Förslag på formulering</div>
              <div className="font-doc text-[14.5px] leading-relaxed text-slate-900">{f.suggestion}</div>
            </div>
            <div className="no-print mt-2.5 flex flex-wrap gap-1">
              <button
                type="button"
                onClick={() => void copy(f.suggestion as string)}
                className={`btn-secondary min-h-[44px] px-3.5 py-2 text-[13.5px] ${FOCUS}`}
              >
                {copied ? 'Kopierat' : 'Kopiera förslag'}
              </button>
              <button
                type="button"
                onClick={() => clause && goAsk(whyFlaggedQuestion(clause))}
                className={`min-h-[44px] rounded-xl px-3.5 py-2 text-[13.5px] font-bold text-brand-700 transition-colors hover:bg-brand-50 ${FOCUS}`}
              >
                Varför flaggas detta?
              </button>
            </div>
          </>
        ) : f.noChangeNeeded ? (
          <p className="text-[13px] text-slate-600">Ingen ändring behövs.</p>
        ) : (
          <div className="no-print">
            <button
              type="button"
              onClick={() => clause && goAsk(whyFlaggedQuestion(clause))}
              className={`min-h-[44px] rounded-xl px-3.5 py-2 text-[13.5px] font-bold text-brand-700 transition-colors hover:bg-brand-50 ${FOCUS}`}
            >
              Varför flaggas detta?
            </button>
          </div>
        )}
        <span className="sr-only" role="status">{copied ? 'Förslaget kopierades till urklipp' : ''}</span>
      </div>
    </li>
  )
}
