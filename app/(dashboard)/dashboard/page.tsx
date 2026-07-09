import { createClient } from '@/lib/supabase/server'
import { getEffectiveSubscription, getRecentAnalyses } from '@/lib/supabase/queries'
import Link from 'next/link'
import { PLANS } from '@/lib/stripe'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const subscription = await getEffectiveSubscription(supabase, user!.id, user!.email)
  const recentAnalyses = await getRecentAnalyses(supabase, user!.id)

  const plan = subscription?.plan ? PLANS[subscription.plan] : null
  const usedAnalyses = subscription?.analyses_used_this_month ?? 0
  const totalAnalyses = plan?.analyses === Infinity ? '∞' : plan?.analyses ?? 0
  const usagePercent = plan?.analyses === Infinity ? 0 : Math.round((usedAnalyses / (plan?.analyses ?? 1)) * 100)

  return (
    <div className="space-y-6">
      <div className="reveal">
        <h1 className="text-2xl font-bold text-slate-900">Välkommen tillbaka</h1>
        <p className="text-slate-500 mt-1">Vad vill du analysera idag?</p>
      </div>

      {/* Kvot-widget */}
      <div className="reveal card">
        {subscription ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-sm font-medium text-slate-500">Ditt paket</span>
                <h2 className="text-lg font-bold text-slate-900">{plan?.name}</h2>
              </div>
              <span className="text-sm text-slate-500">
                {usedAnalyses} / {totalAnalyses} analyser denna månad
              </span>
            </div>
            {plan?.analyses !== Infinity && (
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${usagePercent >= 80 ? 'bg-red-500' : 'bg-brand-500'}`}
                  style={{ width: `${Math.min(usagePercent, 100)}%` }}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-medium text-slate-900">Din första analys är gratis 🎉</p>
              <p className="text-sm text-slate-500">Testa direkt – inget kort krävs.</p>
            </div>
            <Link href="/analyze" className="btn-primary text-sm whitespace-nowrap">
              Analysera avtal
            </Link>
          </div>
        )}
      </div>

      {/* Snabbåtgärder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/analyze"
          className="reveal reveal-d1 hover-lift card group flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center text-2xl group-hover:bg-brand-200 transition-colors">
            📄
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Analysera nytt avtal</h3>
            <p className="text-sm text-slate-500">Klistra in eller ladda upp text</p>
          </div>
        </Link>

        <Link
          href="/history"
          className="reveal reveal-d2 hover-lift card group flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-2xl group-hover:bg-slate-200 transition-colors">
            🕐
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Analyshistorik</h3>
            <p className="text-sm text-slate-500">Se tidigare analyser</p>
          </div>
        </Link>
      </div>

      {/* Senaste analyser */}
      {recentAnalyses && recentAnalyses.length > 0 && (
        <div className="reveal">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Senaste analyser</h2>
          <div className="space-y-3">
            {recentAnalyses.map(a => (
              <Link
                key={a.id}
                href="/history"
                className="hover-lift card flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-slate-900">{a.title}</h3>
                  <p className="text-sm text-slate-500">
                    {new Date(a.created_at).toLocaleDateString('sv-SE')}
                  </p>
                </div>
                <RiskBadge level={(a.result as { risk_level: string }).risk_level} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function RiskBadge({ level }: { level: string }) {
  const config = {
    low: { label: 'Låg risk', class: 'bg-green-100 text-green-700' },
    medium: { label: 'Medel risk', class: 'bg-yellow-100 text-yellow-700' },
    high: { label: 'Hög risk', class: 'bg-red-100 text-red-700' },
  }[level] ?? { label: level, class: 'bg-slate-100 text-slate-600' }

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full ${config.class}`}>
      {config.label}
    </span>
  )
}
