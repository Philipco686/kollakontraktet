import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getSubscriptionCustomer } from '@/lib/supabase/queries'
import { stripe } from '@/lib/stripe'

// Öppnar Stripes kundportal där kunden kan se kvitton, uppdatera kort
// och avsluta sin prenumeration själv.
export async function POST() {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Ej autentiserad' }, { status: 401 })
    }

    const customer = await getSubscriptionCustomer(supabase, user.id)
    if (!customer?.stripe_customer_id) {
      return NextResponse.json({ error: 'Ingen prenumeration att hantera' }, { status: 404 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
    const session = await stripe.billingPortal.sessions.create({
      customer: customer.stripe_customer_id,
      return_url: `${siteUrl}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe portal-fel:', error)
    return NextResponse.json({ error: 'Kunde inte öppna prenumerationsportalen' }, { status: 500 })
  }
}
