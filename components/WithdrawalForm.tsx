'use client'

import { useState } from 'react'

export default function WithdrawalForm({ email, suggestedPurchase }: { email: string; suggestedPurchase: string }) {
  const [name, setName] = useState('')
  const [purchase, setPurchase] = useState(suggestedPurchase)
  const [message, setMessage] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [error, setError] = useState('')
  const [receipt, setReceipt] = useState<{ receivedAt: string; subscriptionNote: string } | null>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    setError('')
    try {
      const res = await fetch('/api/withdrawal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, purchase, message }),
      })
      const data = await res.json()
      if (!res.ok) { setState('error'); setError(data.error ?? 'Något gick fel'); return }
      setReceipt({ receivedAt: data.receivedAt, subscriptionNote: data.subscriptionNote })
      setState('done')
    } catch {
      setState('error'); setError('Nätverksfel. Försök igen.')
    }
  }

  if (state === 'done' && receipt) {
    return (
      <div role="status" className="card border-green-200 bg-green-50">
        <h2 className="text-lg font-bold text-slate-900">Din ångring är mottagen</h2>
        <p className="mt-2 text-sm text-slate-700">
          Mottagen {receipt.receivedAt}. En kvittens har skickats till {email}.
          {receipt.subscriptionNote && ` ${receipt.subscriptionNote}`}
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="card space-y-4">
      <div>
        <label htmlFor="w-name" className="block text-sm font-semibold text-slate-700">Ditt namn</label>
        <input id="w-name" required value={name} onChange={e => setName(e.target.value)} autoComplete="name" className="input mt-1 w-full" />
      </div>
      <div>
        <label htmlFor="w-email" className="block text-sm font-semibold text-slate-700">E-post</label>
        <input id="w-email" value={email} readOnly className="input mt-1 w-full bg-slate-50 text-slate-500" />
        <p className="mt-1 text-xs text-slate-500">Kvittensen skickas hit.</p>
      </div>
      <div>
        <label htmlFor="w-purchase" className="block text-sm font-semibold text-slate-700">Köp som du vill ångra</label>
        <input
          id="w-purchase"
          required
          value={purchase}
          onChange={e => setPurchase(e.target.value)}
          placeholder="Till exempel: Engångsanalys, köpt 23 november 2026"
          className="input mt-1 w-full"
        />
      </div>
      <div>
        <label htmlFor="w-msg" className="block text-sm font-semibold text-slate-700">Meddelande (valfritt)</label>
        <textarea id="w-msg" rows={3} value={message} onChange={e => setMessage(e.target.value)} className="input mt-1 w-full" />
      </div>
      {state === 'error' && <p role="alert" className="text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={state === 'sending'} className="btn-primary min-h-12 w-full disabled:opacity-60">
        {state === 'sending' ? 'Skickar...' : 'Bekräfta ångring'}
      </button>
    </form>
  )
}
