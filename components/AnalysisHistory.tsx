'use client'

import { useState } from 'react'
import type { Analysis, AnalysisResult } from '@/types'
import Link from 'next/link'

type HistoryItem = Pick<Analysis, 'id' | 'title' | 'created_at' | 'result' | 'is_unlocked'>

interface Props {
  analyses: HistoryItem[]
}

export default function AnalysisHistory({ analyses }: Props) {
  const [items, setItems] = useState<HistoryItem[]>(analyses)
  const [selected, setSelected] = useState<HistoryItem | null>(null)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete(id: string) {
    if (!confirm('Radera den här analysen permanent? Det går inte att ångra.')) return
    setDeleting(true)
    try {
      const res = await fetch('/api/analyses', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (res.ok) {
        setItems(prev => prev.filter(a => a.id !== id))
        setSelected(null)
      }
    } finally {
      setDeleting(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-4xl mb-3">📋</p>
        <h2 className="text-lg font-semibold text-slate-900">Inga analyser ännu</h2>
        <p className="text-slate-500 mt-2 mb-6">Din historik visas här efter din första analys</p>
        <Link href="/analyze" className="btn-primary inline-block">
          Analysera ditt första avtal
        </Link>
      </div>
    )
  }

  if (selected) {
    const result = selected.result as AnalysisResult
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelected(null)}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-700 text-sm"
          >
            ← Tillbaka till historik
          </button>
          <button
            onClick={() => handleDelete(selected.id)}
            disabled={deleting}
            className="text-sm text-slate-400 hover:text-red-600 transition-colors disabled:opacity-50"
          >
            {deleting ? 'Raderar...' : 'Ta bort analys'}
          </button>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-slate-900 mb-1">{selected.title}</h2>
          <p className="text-sm text-slate-400 mb-4">
            {new Date(selected.created_at).toLocaleDateString('sv-SE', {
              year: 'numeric', month: 'long', day: 'numeric',
            })}
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-slate-700 mb-2">Sammanfattning</h3>
              <p className="text-slate-600 leading-relaxed">{result.summary}</p>
            </div>

            {result.key_facts && result.key_facts.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {result.key_facts.map((f, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-3 flex flex-col items-center text-center">
                    <span className="text-2xl mb-1">{f.icon}</span>
                    <span className="text-xs text-slate-500 mb-0.5">{f.label}</span>
                    <span className="font-semibold text-slate-900 text-sm">{f.value}</span>
                  </div>
                ))}
              </div>
            )}

            {!selected.is_unlocked ? (
              <div className="card border-2 border-brand-200 bg-gradient-to-b from-brand-50 to-white text-center">
                <div className="text-4xl mb-3">🔒</div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Resten är låst</h3>
                <p className="text-slate-600 mb-5 max-w-md mx-auto">
                  Lås upp för att se alla klausuler, fällor, din ekonomiska risk och
                  förhandlingstips för det här avtalet.
                </p>
                <div className="bg-accent-50 border border-accent-200 rounded-xl px-4 py-3 mb-5 max-w-md mx-auto text-sm text-accent-800">
                  🎁 <strong>Nykundsbonus:</strong> köp engångsanalysen (49 kr) så låser vi upp den här analysen <em>och</em> ger dig en till analys att använda direkt.
                </div>
                <Link href="/pricing" className="btn-primary inline-block">
                  Lås upp hela analysen →
                </Link>
                <p className="text-xs text-slate-400 mt-3">Från 49 kr · ingen bindningstid</p>
              </div>
            ) : (
              <>
                {result.recommendations && result.recommendations.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-2">Rekommendationer</h3>
                    <ul className="space-y-1">
                      {result.recommendations.map((r, i) => (
                        <li key={i} className="text-slate-600 text-sm flex gap-2">
                          <span className="text-brand-500">→</span>{r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-slate-700 mb-2">
                    Klausuler ({result.clauses?.length ?? 0})
                  </h3>
                  <div className="flex flex-wrap gap-3 mb-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">🟢 Låg risk – standardvillkor</span>
                    <span className="flex items-center gap-1">🟡 Varning – ovanligt eller potentiellt dyrt</span>
                    <span className="flex items-center gap-1">🔴 Hög risk – kan kosta dig pengar eller rättigheter</span>
                  </div>
                  <div className="space-y-2">
                    {result.clauses?.map((c, i) => (
                      <div key={i} className="bg-slate-50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-slate-900 text-sm">{c.title}</span>
                          <RiskDot level={c.risk_level} />
                        </div>
                        <p className="text-slate-600 text-sm">{c.plain_explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-500 leading-relaxed">
              ⚖️ <strong>Inte juridisk rådgivning.</strong> Detta är en AI-genererad tolkning i
              informationssyfte och kan innehålla fel. Rådgör med en jurist vid osäkerhet.
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {items.map(a => {
        const result = a.result as AnalysisResult
        return (
          <button
            key={a.id}
            onClick={() => setSelected(a)}
            className="hover-lift card w-full text-left flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium text-slate-900">{a.title}</h3>
              <p className="text-sm text-slate-500 mt-0.5">
                {new Date(a.created_at).toLocaleDateString('sv-SE')}
                {a.is_unlocked
                  ? ` · ${result.clauses?.length ?? 0} klausuler`
                  : ' · 🔒 Lås upp'}
              </p>
            </div>
            <RiskBadge level={result.risk_level} />
          </button>
        )
      })}
    </div>
  )
}

function RiskDot({ level }: { level: string }) {
  const colors = { low: 'bg-green-400', medium: 'bg-yellow-400', high: 'bg-red-400' }
  return <span className={`w-2 h-2 rounded-full ${colors[level as keyof typeof colors] ?? 'bg-slate-300'}`} />
}

function RiskBadge({ level }: { level: string }) {
  const config = {
    low: { label: 'Låg risk', class: 'bg-green-100 text-green-700' },
    medium: { label: 'Medel risk', class: 'bg-yellow-100 text-yellow-700' },
    high: { label: 'Hög risk', class: 'bg-red-100 text-red-700' },
  }[level] ?? { label: level, class: 'bg-slate-100 text-slate-600' }

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap ${config.class}`}>
      {config.label}
    </span>
  )
}
