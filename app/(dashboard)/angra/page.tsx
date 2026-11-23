import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getActiveSubscription } from '@/lib/supabase/queries'
import { PLANS } from '@/lib/stripe'
import WithdrawalForm from '@/components/WithdrawalForm'

export const metadata: Metadata = { title: 'Ångra köp | Kolla Kontraktet', robots: { index: false, follow: false } }

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Europe/Stockholm' })

// Ångerfunktionen. Kunden ska kunna ångra ett köp direkt på sajten under hela ångerfristen.
export default async function WithdrawalPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const sub = await getActiveSubscription(supabase, user!.id)

  const suggested = sub?.plan
    ? `${PLANS[sub.plan].name}${sub.plan === 'onetime' ? '' : ' (prenumeration)'}, köpt ${fmtDate(sub.created_at)}`
    : ''

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Ångra köp</h1>
        <p className="mt-2 text-slate-600 leading-relaxed">
          Du har rätt att ångra ett köp inom 14 dagar. Fyll i formuläret och tryck på Bekräfta ångring, så får du en
          kvittens per e-post direkt. Har du en prenumeration avslutas den samtidigt.
        </p>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          Vi återbetalar senast inom 14 dagar till samma betalsätt. Har du redan tagit del av analyser kan vi göra avdrag
          för det som levererats, enligt <Link href="/terms" className="text-brand-700 underline">användarvillkoren</Link>.
        </p>
      </div>
      <WithdrawalForm email={user!.email ?? ''} suggestedPurchase={suggested} />
    </div>
  )
}
