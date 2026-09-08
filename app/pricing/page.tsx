'use client'

import { useState } from 'react'
import { PLANS } from '@/lib/stripe'
import Link from 'next/link'
import WithdrawalConsent from '@/components/WithdrawalConsent'

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null)
  const [consent, setConsent] = useState(false)
  const [consentError, setConsentError] = useState(false)

  async function handleCheckout(plan: keyof typeof PLANS) {
    if (!consent) {
      setConsentError(true)
      return
    }
    setLoading(plan)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()

      if (data.error === 'Ej autentiserad') {
        window.location.href = '/login'
        return
      }

      if (data.url) {
        window.location.href = data.url
      }
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-brand-700 text-lg">
            Kolla Kontraktet
          </Link>
          <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900">
            Logga in
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Enkla, transparenta priser</h1>
          <p className="text-slate-500 text-lg">Inga dolda avgifter. Avsluta när du vill.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Engångsanalys */}
          <PricingCard
            name={PLANS.onetime.name}
            price={PLANS.onetime.price}
            interval="engångsbetalning"
            description={PLANS.onetime.description}
            features={PLANS.onetime.features}
            ctaLabel="Köp analys"
            loading={loading === 'onetime'}
            onClick={() => handleCheckout('onetime')}
            highlight={false}
          />

          {/* Personlig – markerad */}
          <PricingCard
            name={PLANS.personal.name}
            price={PLANS.personal.price}
            interval="per månad"
            description={PLANS.personal.description}
            features={PLANS.personal.features}
            ctaLabel="Välj Personlig"
            loading={loading === 'personal'}
            onClick={() => handleCheckout('personal')}
            highlight
            badge="Populärast"
          />

          {/* Företag */}
          <PricingCard
            name={PLANS.business.name}
            price={PLANS.business.price}
            interval="per månad"
            description={PLANS.business.description}
            features={PLANS.business.features}
            ctaLabel="Välj Företag"
            loading={loading === 'business'}
            onClick={() => handleCheckout('business')}
            highlight={false}
          />
        </div>

        <div className="max-w-md mx-auto mt-10">
          <WithdrawalConsent
            checked={consent}
            onChange={v => { setConsent(v); if (v) setConsentError(false) }}
            error={consentError}
          />
          {consentError && (
            <p className="text-xs text-red-600 mt-2 text-center">
              Bocka i rutan ovan för att fortsätta till betalning.
            </p>
          )}
        </div>

        <p className="text-center text-sm text-slate-400 mt-6">
          Betalning sker säkert via Stripe. Avbryt prenumeration när som helst.
        </p>
      </div>
    </div>
  )
}

interface PricingCardProps {
  name: string
  price: number
  interval: string
  description: string
  features: readonly string[]
  ctaLabel: string
  loading: boolean
  onClick: () => void
  highlight: boolean
  badge?: string
}

function PricingCard({
  name, price, interval, description, features,
  ctaLabel, loading, onClick, highlight, badge,
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-6 flex flex-col ${
        highlight
          ? 'bg-brand-700 text-white shadow-xl ring-2 ring-brand-500'
          : 'bg-white border border-slate-200'
      }`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
          {badge}
        </div>
      )}

      <div className="mb-6">
        <h3 className={`font-bold text-xl mb-1 ${highlight ? 'text-white' : 'text-slate-900'}`}>
          {name}
        </h3>
        <p className={`text-sm mb-4 ${highlight ? 'text-brand-200' : 'text-slate-500'}`}>
          {description}
        </p>
        <div className="flex items-end gap-1">
          <span className={`text-4xl font-extrabold ${highlight ? 'text-white' : 'text-slate-900'}`}>
            {price} kr
          </span>
          <span className={`text-sm mb-1 ${highlight ? 'text-brand-200' : 'text-slate-400'}`}>
            /{interval}
          </span>
        </div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map(f => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <svg className={`w-4 h-4 shrink-0 mt-0.5 ${highlight ? 'text-brand-300' : 'text-brand-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className={highlight ? 'text-brand-100' : 'text-slate-600'}>{f}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        disabled={loading}
        className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors ${
          highlight
            ? 'bg-white text-brand-700 hover:bg-brand-50'
            : 'bg-brand-600 text-white hover:bg-brand-700'
        } disabled:opacity-50`}
      >
        {loading ? 'Laddar...' : ctaLabel}
      </button>
    </div>
  )
}
