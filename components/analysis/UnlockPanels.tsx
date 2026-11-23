'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  AlertTriangle, CalendarDays, Coins, Gift, Handshake, ListChecks, LockOpen, Lock, Search, Zap,
} from 'lucide-react'
import WithdrawalConsent from '@/components/WithdrawalConsent'
import { useAnalysis } from './AnalysisProvider'
import { useCopied } from './hooks'
import { FINDING_ICON, FOCUS, RiskLabel } from './risk'

/* Gratisanalysens smakprov: en enda risk, visad precis som i hela analysen, så att kunden ser
 * vad den får innan den betalar. Resten av klausulerna ligger bakom betalningen. */
export function FreeRiskCard() {
  const { analysis: a } = useAnalysis()
  const [copied, copy] = useCopied()
  if (!a.freeRisk) return null
  const { finding: f, clause: c } = a.freeRisk
  const Icon = FINDING_ICON[f.icon]

  return (
    <section className="card p-5 sm:p-7" aria-labelledby="free-risk-h">
      <div className="text-xs font-bold uppercase tracking-[0.08em] text-brand-700">Gratis smakprov</div>
      <h2 id="free-risk-h" className="mb-4 mt-1.5 font-display text-[22px] font-medium tracking-tight text-slate-900">
        {f.risk === 'low' ? 'Det viktigaste villkoret i ditt avtal' : 'Den största risken i ditt avtal'}
      </h2>

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div aria-hidden="true" className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Icon className="h-[22px] w-[22px]" />
        </div>
        <h3 className="min-w-0 flex-1 text-[17px] font-bold text-slate-900">{f.title}</h3>
        <RiskLabel risk={f.risk} />
      </div>

      {c.text && (
        <figure className="mb-4 rounded-xl bg-slate-50 px-4 py-3">
          {c.number && <figcaption className="mb-1 text-xs font-bold text-slate-600">{c.number} i avtalet</figcaption>}
          <blockquote className="font-doc text-[14.5px] leading-relaxed text-slate-900">{c.text}</blockquote>
        </figure>
      )}

      <p className="mb-4 text-[15px] leading-relaxed text-slate-700">{f.body}</p>

      {f.suggestion && (
        <>
          <div className="rounded-xl bg-brand-50 px-3.5 py-3">
            <div className="mb-1 text-xs font-bold text-brand-700">Förslag på formulering</div>
            <div className="font-doc text-[14.5px] leading-relaxed text-slate-900">{f.suggestion}</div>
          </div>
          <button
            type="button"
            onClick={() => void copy(f.suggestion as string)}
            className={`btn-secondary no-print mt-2.5 min-h-[44px] px-3.5 py-2 text-[13.5px] ${FOCUS}`}
          >
            {copied ? 'Kopierat' : 'Kopiera förslag'}
          </button>
          <span className="sr-only" role="status">{copied ? 'Förslaget kopierades till urklipp' : ''}</span>
        </>
      )}

      <p className="mt-4 text-sm text-slate-600">Hela analysen går igenom avtalets viktiga klausuler på samma sätt.</p>
    </section>
  )
}

/* Gratisanalysen (teaser): sammanfattning och en risk syns, resten ligger bakom betalning. */
export function PaywallPanel() {
  const { analysis: a } = useAnalysis()
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

  const preview = [
    { Icon: Search, text: 'Genomgång av avtalets viktiga klausuler' },
    { Icon: AlertTriangle, text: 'Vanliga fällor i just detta avtal' },
    { Icon: Zap, text: 'Konsekvenser om du bryter avtalet' },
    { Icon: Coins, text: 'Din ekonomiska risk i kronor (worst case)' },
    { Icon: Handshake, text: 'Förslag på nya formuleringar för varje villkor' },
    { Icon: CalendarDays, text: 'Viktiga datum och deadlines' },
    { Icon: ListChecks, text: 'Checklista att gå igenom innan du signerar' },
  ]

  return (
    <section className="card border-brand-200 bg-brand-50/40 text-center" aria-labelledby="paywall-h">
      <Lock className="mx-auto mb-3 h-9 w-9 text-brand-700" aria-hidden="true" />
      <h2 id="paywall-h" className="mb-1 text-xl font-bold text-slate-900">Det här är bara början</h2>
      <p className="mx-auto mb-5 max-w-md text-slate-600">
        {a.freeRisk
          ? 'Du har sett sammanfattningen och en risk gratis. Lås upp hela analysen för att se de viktiga klausulerna, vad de kan kosta och hur du förhandlar.'
          : 'Du har sett sammanfattningen gratis. Lås upp hela analysen för att se exakt vad som gömmer sig i avtalet.'}
      </p>
      <ul className="mx-auto mb-6 max-w-sm space-y-2 text-left">
        {preview.map(({ Icon, text }) => (
          <li key={text} className="flex items-center gap-2.5 text-sm text-slate-700">
            <Icon className="h-4 w-4 shrink-0 text-brand-700" aria-hidden="true" />{text}
          </li>
        ))}
      </ul>
      <div className="mx-auto mb-6 flex max-w-md items-start gap-2 rounded-xl border border-accent-200 bg-accent-50 px-4 py-3 text-left text-sm text-accent-800">
        <Gift className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span><strong>Nykundsbonus:</strong> köp engångsanalysen (49 kr) så låser vi upp den här analysen <em>och</em> lägger till en till analys att använda direkt.</span>
      </div>
      <div className="mx-auto mb-4 max-w-md">
        <WithdrawalConsent checked={consent} onChange={setConsent} />
      </div>
      <button type="button" onClick={unlock} disabled={loading || !consent} className="btn-primary min-h-12 disabled:opacity-60">
        {loading ? 'Öppnar betalning...' : 'Lås upp för 49 kr'}
      </button>
      <p className="mt-3 text-xs text-slate-500">Engångsköp, ingen bindningstid.</p>
      <Link href="/pricing" className="inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-700 underline hover:text-brand-800">
        Se prenumerationer
      </Link>
    </section>
  )
}

/* Betald men ännu inte genererad: skapar hela analysen och laddar om sidan med resultatet. */
export function GenerateFullPanel() {
  const { analysis } = useAnalysis()
  const router = useRouter()
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  async function generate() {
    setGenerating(true)
    setError('')
    try {
      const res = await fetch('/api/analyze/full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: analysis.id }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Något gick fel'); return }
      router.refresh()
    } catch {
      setError('Nätverksfel. Försök igen')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <section className="card border-brand-200 bg-brand-50/40 text-center" aria-labelledby="generate-h">
      <LockOpen className="mx-auto mb-3 h-9 w-9 text-brand-700" aria-hidden="true" />
      <h2 id="generate-h" className="mb-1 text-xl font-bold text-slate-900">Upplåst: generera hela analysen</h2>
      <p className="mx-auto mb-5 max-w-md text-slate-600">
        Din betalning är klar. Klicka för att skapa den fullständiga analysen med de viktiga klausulerna, fällor,
        ekonomisk risk och förslag på nya formuleringar.
      </p>
      <button type="button" onClick={generate} disabled={generating} className="btn-primary min-h-12 disabled:opacity-60">
        {generating ? 'Genererar... (kan ta upp till två minuter)' : 'Generera fullständig analys'}
      </button>
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
    </section>
  )
}
