'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import FollowUpChat from '@/components/FollowUpChat'
import WithdrawalConsent from '@/components/WithdrawalConsent'
import {
  FileText, Download, Mail, Check, PenLine, Gift, AlertTriangle, Coins,
  BarChart3, AlertOctagon, Zap, Handshake, CalendarDays, CheckCircle2,
  ListChecks, Scale, Lock, Search,
} from 'lucide-react'
import type { Analysis, AnalysisResult, Clause, KeyFact, NegotiationTip, TimelineEvent } from '@/types'

const LOADING_MESSAGES = [
  'Läser igenom avtalet...',
  'Identifierar klausuler...',
  'Bedömer risker...',
  'Letar efter dolda fällor...',
  'Beräknar ekonomisk risk...',
  'Jämför med svenska standardavtal...',
  'Sammanställer förhandlingstips...',
  'Snart klart...',
]

export default function ContractAnalyzer() {
  const [contractText, setContractText] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<Analysis | null>(null)
  const [locked, setLocked] = useState(false)
  const [statusIdx, setStatusIdx] = useState(0)
  const [uploading, setUploading] = useState(false)

  async function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/extract-pdf', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Kunde inte läsa PDF:en'); return }
      setContractText(data.text)
      if (!title) setTitle(file.name.replace(/\.pdf$/i, ''))
    } catch {
      setError('Kunde inte läsa PDF:en – försök igen')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  useEffect(() => {
    if (!loading) { setStatusIdx(0); return }
    const id = setInterval(() => {
      setStatusIdx(i => Math.min(i + 1, LOADING_MESSAGES.length - 1))
    }, 5000)
    return () => clearInterval(id)
  }, [loading])

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault()
    if (!contractText.trim()) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contractText, title: title || 'Min analys' }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Något gick fel'); return }
      setResult(data.analysis)
      setLocked(!!data.locked)
    } catch {
      setError('Nätverksfel – försök igen')
    } finally {
      setLoading(false)
    }
  }

  if (result) return <AnalysisResultView analysis={result} locked={locked} onReset={() => { setResult(null); setLocked(false) }} />

  return (
    <form onSubmit={handleAnalyze} className="space-y-4">
      <div className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Namn på avtalet (valfritt)</label>
          <input type="text" className="input" placeholder="T.ex. Hyreskontrakt lägenhet" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Ladda upp PDF</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:border-brand-300 hover:bg-brand-50/40 transition-colors">
            <input type="file" accept="application/pdf" className="hidden" onChange={handlePdfUpload} disabled={uploading} />
            {uploading ? (
              <span className="flex items-center gap-2 text-sm text-slate-500"><Spinner />Läser PDF...</span>
            ) : (
              <>
                <FileText className="w-6 h-6 mb-1 text-slate-400" />
                <span className="text-sm font-medium text-slate-700">Klicka för att ladda upp ett PDF-avtal</span>
                <span className="text-xs text-slate-400 mt-0.5">Texten fylls i automatiskt nedan</span>
              </>
            )}
          </label>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-slate-400">eller klistra in text</span></div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Avtalstext</label>
          <textarea className="input min-h-[300px] resize-y font-mono text-sm" placeholder="Klistra in hela avtalstexten här..." value={contractText} onChange={e => setContractText(e.target.value)} required />
          <p className="text-xs text-slate-400 mt-1">{contractText.length.toLocaleString('sv-SE')} tecken</p>
        </div>
        {error && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">{error}</div>}
        <button type="submit" className="btn-primary w-full" disabled={loading || contractText.trim().length < 50}>
          {loading ? <span className="flex items-center justify-center gap-2"><Spinner />{LOADING_MESSAGES[statusIdx]}</span> : 'Analysera avtal'}
        </button>
      </div>
    </form>
  )
}

function AnalysisResultView({ analysis, locked, onReset }: { analysis: Analysis; locked: boolean; onReset: () => void }) {
  const r = analysis.result as AnalysisResult
  const [openClause, setOpenClause] = useState<number | null>(null)
  const [printAll, setPrintAll] = useState(false)
  const [emailState, setEmailState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [emailMsg, setEmailMsg] = useState('')

  useEffect(() => {
    if (!printAll) return
    const id = setTimeout(() => { window.print(); setPrintAll(false) }, 100)
    return () => clearTimeout(id)
  }, [printAll])

  async function handleEmail() {
    setEmailState('sending')
    try {
      const res = await fetch('/api/email-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysisId: analysis.id }),
      })
      const data = await res.json()
      if (!res.ok) { setEmailState('error'); setEmailMsg(data.error ?? 'Kunde inte skicka'); return }
      setEmailState('sent')
    } catch {
      setEmailState('error'); setEmailMsg('Nätverksfel – försök igen')
    }
  }

  const riskLabel = { low: 'Låg risk', medium: 'Medel risk', high: 'Hög risk' }[r.risk_level]
  const riskColor = { low: 'bg-green-100 text-green-800 border-green-200', medium: 'bg-yellow-100 text-yellow-800 border-yellow-200', high: 'bg-red-100 text-red-800 border-red-200' }[r.risk_level]

  return (
    <div className="space-y-5 animate-fade-up">

      {/* Åtgärder – döljs vid utskrift */}
      {!locked && (
        <div className="no-print flex flex-wrap gap-3">
          <button onClick={() => setPrintAll(true)} className="btn-secondary text-sm py-2 px-4 inline-flex items-center gap-2">
            <Download className="w-4 h-4" /> Ladda ner PDF
          </button>
          <button onClick={handleEmail} disabled={emailState === 'sending' || emailState === 'sent'} className="btn-secondary text-sm py-2 px-4 inline-flex items-center gap-2">
            {emailState === 'sending' ? 'Skickar...' : emailState === 'sent'
              ? <><Check className="w-4 h-4" /> Skickad</>
              : <><Mail className="w-4 h-4" /> Maila analysen</>}
          </button>
          {emailState === 'error' && <span className="text-sm text-red-600 self-center">{emailMsg}</span>}
        </div>
      )}

      {/* Header */}
      <div className="card">
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-xl font-bold text-slate-900">{analysis.title}</h2>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full border ${riskColor}`}>{riskLabel}</span>
        </div>
        <p className="text-slate-600 leading-relaxed">{r.summary}</p>
      </div>

      {/* Nyckeluppgifter */}
      {r.key_facts?.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-slate-900 mb-3">Nyckeluppgifter</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {r.key_facts.map((f: KeyFact, i: number) => (
              <div key={i} className="bg-slate-50 rounded-xl p-3 flex flex-col items-center text-center">
                <span className="text-xs text-slate-500 mb-1">{f.label}</span>
                <span className="font-semibold text-slate-900 text-sm">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Paywall för teaser */}
      {locked && <PaywallCard />}

      {/* 1-minutssammanfattning */}
      {r.quick_summary && (
        <div className="card border-l-4 border-brand-500">
          <h3 className="font-semibold text-slate-900 mb-4">Kort version – 1 minut</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Vad handlar det om?', value: r.quick_summary.what_is_it_about, Icon: FileText },
              { label: 'Vad förbinder jag mig till?', value: r.quick_summary.what_do_i_commit_to, Icon: PenLine },
              { label: 'Vad får jag tillbaka?', value: r.quick_summary.what_do_i_get, Icon: Gift },
              { label: 'Största risken?', value: r.quick_summary.biggest_risk, Icon: AlertTriangle },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="bg-slate-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-4 h-4 text-brand-600 shrink-0" />
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</span>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ekonomisk risk */}
      {r.economic_risk && r.economic_risk.max_amount > 0 && (
        <div className="card border-l-4 border-red-400">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><Coins className="w-5 h-5 text-accent-600" /> Ekonomisk risk – worst case</h3>
            <span className="text-2xl font-bold text-red-600">
              {r.economic_risk.max_amount.toLocaleString('sv-SE')} {r.economic_risk.currency}
            </span>
          </div>
          <ul className="space-y-1">
            {r.economic_risk.breakdown.map((b: string, i: number) => (
              <li key={i} className="text-sm text-slate-600 flex gap-2">
                <span className="text-red-400 shrink-0">→</span>{b}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Standardjämförelse */}
      {r.standard_comparison && (
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-brand-600" /> Jämförelse med svenska standardavtal</h3>
            <span className="text-2xl font-bold text-brand-700">{r.standard_comparison.percentage_standard}% standard</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 mb-4">
            <div className="h-3 rounded-full bg-brand-500 transition-all" style={{ width: `${r.standard_comparison.percentage_standard}%` }} />
          </div>
          {r.standard_comparison.deviations.length > 0 && (
            <ul className="space-y-1">
              {r.standard_comparison.deviations.map((d: string, i: number) => (
                <li key={i} className="text-sm text-amber-700 flex gap-2.5 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />{d}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Det här missar folk */}
      {r.common_traps?.length > 0 && (
        <div className="card border-l-4 border-amber-400">
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-amber-500" /> Det här missar folk ofta</h3>
          <ul className="space-y-2">
            {r.common_traps.map((t: string, i: number) => (
              <li key={i} className="text-sm text-slate-700 flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />{t}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Konsekvenser */}
      {r.consequences?.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><Zap className="w-5 h-5 text-red-500" /> Vad händer om du bryter avtalet?</h3>
          <ul className="space-y-2">
            {r.consequences.map((c: string, i: number) => (
              <li key={i} className="text-sm text-slate-700 flex gap-2.5 items-start bg-red-50 rounded-lg p-3">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />{c}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ovanliga villkor */}
      {r.unusual_terms?.length > 0 && (
        <div className="card border-l-4 border-red-400">
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><AlertOctagon className="w-5 h-5 text-red-500" /> Ovanliga eller oskäliga villkor</h3>
          <ul className="space-y-2">
            {r.unusual_terms.map((u: string, i: number) => (
              <li key={i} className="text-sm text-slate-700 flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />{u}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Klausuler */}
      {r.clauses?.length > 0 && (
        <div>
          <h3 className="font-semibold text-slate-900 mb-2">Klausuler ({r.clauses.length})</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4 text-sm">
            <span className="flex items-center gap-1.5 text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" /> Låg risk – standardvillkor</span>
            <span className="flex items-center gap-1.5 text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shrink-0" /> Varning – ovanligt eller potentiellt dyrt</span>
            <span className="flex items-center gap-1.5 text-slate-500"><span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" /> Hög risk – kan kosta dig pengar eller rättigheter</span>
          </div>
          <div className="space-y-2">
            {r.clauses.map((c: Clause, i: number) => (
              <ClauseCard key={i} clause={c} expanded={openClause === i || printAll} onToggle={() => setOpenClause(openClause === i ? null : i)} />
            ))}
          </div>
        </div>
      )}

      {/* Förhandlingstips */}
      {r.negotiation_tips?.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2"><Handshake className="w-5 h-5 text-brand-600" /> Det här kan du förhandla</h3>
          <div className="space-y-4">
            {r.negotiation_tips.map((tip: NegotiationTip, i: number) => (
              <div key={i} className="border border-slate-100 rounded-xl p-4">
                <p className="font-medium text-slate-900 text-sm mb-1">{tip.item}</p>
                <p className="text-slate-600 text-sm mb-2">{tip.suggestion}</p>
                <div className="bg-brand-50 rounded-lg p-3">
                  <p className="text-xs text-brand-600 font-medium mb-1">Förslag på formulering:</p>
                  <p className="text-sm text-brand-900 italic">"{tip.example_wording}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tidslinje */}
      {r.timeline?.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><CalendarDays className="w-5 h-5 text-brand-600" /> Viktiga datum</h3>
          <div className="space-y-2">
            {r.timeline.map((t: TimelineEvent, i: number) => (
              <div key={i} className="flex items-start gap-4 py-2 border-b border-slate-50 last:border-0">
                <div className="text-sm font-semibold text-brand-700 whitespace-nowrap min-w-[100px]">{t.date}</div>
                <div>
                  <div className="text-sm font-medium text-slate-900">{t.event}</div>
                  {t.note && <div className="text-xs text-slate-500">{t.note}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rekommendationer */}
      {r.recommendations?.length > 0 && (
        <div className="card border-l-4 border-brand-500">
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-brand-600" /> Rekommendationer</h3>
          <ul className="space-y-2">
            {r.recommendations.map((rec: string, i: number) => (
              <li key={i} className="flex items-start gap-2 text-slate-700 text-sm">
                <span className="text-brand-500 mt-0.5 shrink-0">→</span>{rec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Checklista */}
      {r.pre_signing_checklist?.length > 0 && (
        <div className="card">
          <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2"><ListChecks className="w-5 h-5 text-brand-600" /> Fråga detta innan du signerar</h3>
          <ul className="space-y-2">
            {r.pre_signing_checklist.map((q: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-5 h-5 rounded border-2 border-slate-300 shrink-0 mt-0.5" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Följdfrågor – bara för upplåsta analyser */}
      {!locked && <FollowUpChat analysisId={analysis.id} />}

      {/* Disclaimer – syns även i utskrift */}
      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-500 leading-relaxed flex items-start gap-2">
        <Scale className="w-4 h-4 shrink-0 mt-0.5" />
        <span><strong>Inte juridisk rådgivning.</strong> Detta är en AI-genererad tolkning i informationssyfte
        och kan innehålla fel. Fatta inte viktiga beslut enbart baserat på analysen – rådgör med en jurist
        vid osäkerhet.</span>
      </div>

      <button onClick={onReset} className="btn-secondary w-full no-print">Analysera nytt avtal</button>
    </div>
  )
}

function ClauseCard({ clause, expanded, onToggle }: { clause: Clause; expanded: boolean; onToggle: () => void }) {
  const riskColor = { low: 'bg-green-500', medium: 'bg-yellow-500', high: 'bg-red-500' }[clause.risk_level]
  const borderColor = { low: 'border-l-green-400', medium: 'border-l-yellow-400', high: 'border-l-red-400' }[clause.risk_level]

  return (
    <div className={`card border-l-4 hover-lift ${borderColor}`}>
      <button onClick={onToggle} className="w-full flex items-center justify-between text-left gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${riskColor}`} />
          {clause.is_important && <span className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full font-medium shrink-0">Viktig</span>}
          <span className="font-medium text-slate-900 truncate">{clause.title}</span>
        </div>
        <svg className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="mt-3 space-y-3">
          <p className="text-slate-700 text-sm leading-relaxed">{clause.plain_explanation}</p>
          <details>
            <summary className="text-xs text-slate-400 cursor-pointer hover:text-slate-600">Visa originaltext</summary>
            <blockquote className="mt-2 pl-3 border-l-2 border-slate-200 text-slate-500 text-xs italic">{clause.original_text}</blockquote>
          </details>
        </div>
      )}
    </div>
  )
}

function PaywallCard() {
  const [loading, setLoading] = useState(false)
  const [consent, setConsent] = useState(false)

  async function unlock() {
    if (!consent) return
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: 'onetime' }),
      })
      const data = await res.json()
      if (data.url) { window.location.href = data.url; return }
      if (data.error === 'Ej autentiserad') { window.location.href = '/login'; return }
      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  const lockedPreview = [
    { Icon: Search, text: 'Fullständig genomgång av alla klausuler' },
    { Icon: AlertTriangle, text: 'Vanliga fällor i just detta avtal' },
    { Icon: Zap, text: 'Konsekvenser om du bryter avtalet' },
    { Icon: Coins, text: 'Din ekonomiska risk i kronor (worst case)' },
    { Icon: Handshake, text: 'Förhandlingstips med färdiga formuleringar' },
    { Icon: CalendarDays, text: 'Viktiga datum och deadlines' },
    { Icon: ListChecks, text: 'Checklista att gå igenom innan du signerar' },
  ]
  return (
    <div className="card border-2 border-brand-200 bg-gradient-to-b from-brand-50 to-white text-center">
      <Lock className="w-9 h-9 mx-auto mb-3 text-brand-600" />
      <h3 className="text-xl font-bold text-slate-900 mb-1">Det här är bara början</h3>
      <p className="text-slate-600 mb-5 max-w-md mx-auto">
        Du har sett sammanfattningen gratis. Lås upp hela analysen för att se exakt
        vad som gömmer sig i avtalet.
      </p>
      <ul className="text-left max-w-sm mx-auto space-y-2 mb-6">
        {lockedPreview.map(({ Icon, text }) => (
          <li key={text} className="flex items-center gap-2.5 text-sm text-slate-700">
            <Icon className="w-4 h-4 text-brand-400 shrink-0" />{text}
          </li>
        ))}
      </ul>
      <div className="bg-accent-50 border border-accent-200 rounded-xl px-4 py-3 mb-6 max-w-md mx-auto text-sm text-accent-800 flex items-start gap-2 text-left">
        <Gift className="w-4 h-4 shrink-0 mt-0.5" />
        <span><strong>Nykundsbonus:</strong> köp engångsanalysen (49 kr) så låser vi upp den här analysen <em>och</em> lägger till en till analys att använda direkt.</span>
      </div>
      <div className="max-w-md mx-auto mb-4">
        <WithdrawalConsent checked={consent} onChange={setConsent} />
      </div>
      <button onClick={unlock} disabled={loading || !consent} className="btn-primary inline-block disabled:opacity-60">
        {loading ? 'Öppnar betalning...' : 'Lås upp för 49 kr →'}
      </button>
      <p className="text-xs text-slate-400 mt-3">
        Engångsköp · ingen bindningstid ·{' '}
        <Link href="/pricing" className="underline hover:text-slate-600">se prenumerationer</Link>
      </p>
    </div>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}
