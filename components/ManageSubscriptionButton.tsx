'use client'

import { useState } from 'react'

export default function ManageSubscriptionButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function openPortal() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
        return
      }
      setError(data.error ?? 'Kunde inte öppna portalen')
      setLoading(false)
    } catch {
      setError('Nätverksfel – försök igen')
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={openPortal}
        disabled={loading}
        className={className ?? 'text-sm font-medium text-brand-700 hover:text-brand-800 underline underline-offset-2 disabled:opacity-60'}
      >
        {loading ? 'Öppnar...' : 'Hantera prenumeration'}
      </button>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  )
}
