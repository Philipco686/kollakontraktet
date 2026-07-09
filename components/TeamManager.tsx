'use client'

import { useEffect, useState } from 'react'

interface Member {
  email: string
  created_at: string
}

export default function TeamManager({ ownerEmail, max }: { ownerEmail: string; max: number }) {
  const [members, setMembers] = useState<Member[]>([])
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/team')
      .then(r => r.json())
      .then(d => setMembers(d.members ?? []))
      .finally(() => setLoading(false))
  }, [])

  async function addMember(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Något gick fel'); return }
      setMembers(data.members)
      setEmail('')
    } finally {
      setBusy(false)
    }
  }

  async function removeMember(memberEmail: string) {
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/team', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: memberEmail }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? 'Kunde inte ta bort'); return }
      setMembers(data.members)
    } finally {
      setBusy(false)
    }
  }

  const totalUsers = members.length + 1 // + ägaren
  const full = totalUsers >= max

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-900">Medlemmar</h2>
          <span className="text-sm text-slate-500">{totalUsers} / {max} användare</span>
        </div>

        {/* Ägaren */}
        <div className="flex items-center justify-between py-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-semibold text-sm">
              {ownerEmail.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">{ownerEmail}</p>
              <p className="text-xs text-slate-400">Ägare (du)</p>
            </div>
          </div>
        </div>

        {/* Medlemmar */}
        {loading ? (
          <p className="text-sm text-slate-400 py-4">Laddar...</p>
        ) : (
          members.map(m => (
            <div key={m.email} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-semibold text-sm">
                  {m.email.charAt(0).toUpperCase()}
                </div>
                <p className="text-sm font-medium text-slate-700">{m.email}</p>
              </div>
              <button
                onClick={() => removeMember(m.email)}
                disabled={busy}
                className="text-sm text-slate-400 hover:text-red-600 transition-colors"
              >
                Ta bort
              </button>
            </div>
          ))
        )}

        {!loading && members.length === 0 && (
          <p className="text-sm text-slate-400 py-4">Inga medlemmar än – bjud in ditt team nedan.</p>
        )}
      </div>

      {/* Lägg till */}
      <div className="card">
        <h3 className="font-semibold text-slate-900 mb-1">Bjud in en medlem</h3>
        <p className="text-sm text-slate-500 mb-4">
          Skriv deras e-post. När de loggar in med den adressen delar de din prenumeration automatiskt.
        </p>
        <form onSubmit={addMember} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            className="input flex-1"
            placeholder="kollega@företag.se"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={full}
            required
          />
          <button type="submit" className="btn-primary whitespace-nowrap" disabled={busy || full}>
            {busy ? 'Lägger till...' : 'Bjud in'}
          </button>
        </form>
        {full && <p className="text-sm text-amber-600 mt-2">Du har nått max antal användare ({max}).</p>}
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  )
}
