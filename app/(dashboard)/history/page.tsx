import { createClient } from '@/lib/supabase/server'
import { getRecentAnalyses } from '@/lib/supabase/queries'
import AnalysisHistory from '@/components/AnalysisHistory'
import type { AnalysisResult } from '@/types'

export default async function HistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const raw = await getRecentAnalyses(supabase, user!.id, 100) ?? []

  // Strippa låsta teaser-analyser så att den fulla datan aldrig når webbläsaren
  const analyses = raw.map(a => {
    if (a.is_unlocked) return a
    const full = a.result as AnalysisResult
    return {
      ...a,
      result: {
        summary: full.summary,
        risk_level: full.risk_level,
        key_facts: full.key_facts,
      } as AnalysisResult,
    }
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Analyshistorik</h1>
        <p className="text-slate-500 mt-1">{analyses.length} analyser totalt</p>
      </div>
      <AnalysisHistory analyses={analyses} />
    </div>
  )
}
