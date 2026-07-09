import { createClient } from '@/lib/supabase/server'
import { getActiveSubscription, MAX_TEAM_TOTAL } from '@/lib/supabase/queries'
import TeamManager from '@/components/TeamManager'
import Link from 'next/link'

export default async function TeamPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const sub = await getActiveSubscription(supabase, user!.id)
  const isBusiness = sub?.plan === 'business'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Team</h1>
        <p className="text-slate-500 mt-1">Dela din Företag-prenumeration med kollegor.</p>
      </div>

      {isBusiness ? (
        <TeamManager ownerEmail={user!.email ?? ''} max={MAX_TEAM_TOTAL} />
      ) : (
        <div className="card text-center py-12">
          <div className="text-4xl mb-3">👥</div>
          <h2 className="text-lg font-semibold text-slate-900">Team ingår i Företag-paketet</h2>
          <p className="text-slate-500 mt-2 mb-6 max-w-md mx-auto">
            Med Företag delar du prenumerationen med upp till {MAX_TEAM_TOTAL} användare och får
            obegränsade analyser.
          </p>
          <Link href="/pricing" className="btn-primary inline-block">
            Uppgradera till Företag
          </Link>
        </div>
      )}
    </div>
  )
}
