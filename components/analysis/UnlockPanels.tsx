'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  AlertTriangle, CalendarDays, Coins, Gift, Handshake, ListChecks, LockOpen, Lock, Search, Zap,
} from 'lucide-react'
import WithdrawalConsent from '@/components/WithdrawalConsent'
import { useAnalysis } from './AnalysisProvider'

/* Gratisanalysen (teaser): sammanfattning syns, resten ligger bakom betalning. */
export function PaywallPanel() {
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
    { Icon: Search, text: 'Fullständig genomgång av alla klausuler' },
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
        Du har sett sammanfattningen gratis. Lås upp hela analysen för att se exakt vad som gömmer sig i avtalet.
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
        Din betalning är klar. Klicka för att skapa den fullständiga analysen med alla klausuler, fällor,
        ekonomisk risk och förslag på nya formuleringar.
      </p>
      <button type="button" onClick={generate} disabled={generating} className="btn-primary min-h-12 disabled:opacity-60">
        {generating ? 'Genererar... (kan ta upp till två minuter)' : 'Generera fullständig analys'}
      </button>
      {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
    </section>
  )
}
