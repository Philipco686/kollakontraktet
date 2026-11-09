'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ClipboardList, Lock, Trash2 } from 'lucide-react'
import type { Analysis, AnalysisResult } from '@/types'

type HistoryItem = Pick<Analysis, 'id' | 'title' | 'created_at' | 'result' | 'is_unlocked'>

// Listan över kundens analyser. Varje rad öppnar analysen på sin egen adress, /analys/<id>.
export default function AnalysisHistory({ analyses }: { analyses: HistoryItem[] }) {
  const [items, setItems] = useState<HistoryItem[]>(analyses)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(item: HistoryItem) {
    if (!confirm('Radera den här analysen permanent? Det går inte att ångra.')) return
    setDeletingId(item.id)
    try {
      const res = await fetch('/api/analyses', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id }),
      })
      if (res.ok) setItems(prev => prev.filter(a => a.id !== item.id))
    } finally {
      setDeletingId(null)
    }
  }

  if (items.length === 0) {
    return (
      <div className="card text-center py-12">
        <ClipboardList className="w-10 h-10 mx-auto mb-3 text-slate-400" />
        <h2 className="text-lg font-semibold text-slate-900">Inga analyser ännu</h2>
        <p className="text-slate-500 mt-2 mb-6">Din historik visas här efter din första analys</p>
        <Link href="/analyze" className="btn-primary inline-block">
          Analysera ditt första avtal
        </Link>
      </div>
    )
  }

  return (
    <ul className="space-y-3">
      {items.map(a => {
        const result = a.result as AnalysisResult
        const clauseCount = result.clauses?.length ?? 0
        return (
          <li key={a.id} className="hover-lift card flex items-center gap-2 p-0">
            <Link
              href={`/analys/${a.id}`}
              className="flex min-w-0 flex-1 items-center justify-between gap-3 rounded-2xl p-6 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <div className="min-w-0">
                <h3 className="truncate font-medium text-slate-900">{a.title}</h3>
                <p className="mt-0.5 text-sm text-slate-500">
                  {new Date(a.created_at).toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })}
                  {!a.is_unlocked ? (
                    <span className="inline-flex items-center gap-1 align-middle"> · <Lock className="h-3 w-3" aria-hidden="true" /> Lås upp</span>
                  ) : clauseCount > 0 ? (
                    ` · ${clauseCount} klausuler`
                  ) : (
                    ' · Redo att generera'
                  )}
                </p>
              </div>
              <RiskBadge level={result.risk_level} />
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(a)}
              disabled={deletingId === a.id}
              aria-label={`Ta bort analysen ${a.title}`}
              className="mr-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-red-50 hover:text-red-700 disabled:opacity-50 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <Trash2 className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          </li>
        )
      })}
    </ul>
  )
}

function RiskBadge({ level }: { level: string }) {
  const config = {
    low: { label: 'Låg risk', class: 'bg-green-100 text-green-900' },
    medium: { label: 'Medelrisk', class: 'bg-amber-100 text-amber-900' },
    high: { label: 'Hög risk', class: 'bg-red-100 text-red-900' },
  }[level] ?? { label: level, class: 'bg-slate-100 text-slate-700' }

  return (
    <span className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-bold ${config.class}`}>
      {config.label}
    </span>
  )
}
