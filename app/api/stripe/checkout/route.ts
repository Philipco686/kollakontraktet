import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getSubscriptionCustomer } from '@/lib/supabase/queries'
import { stripe, PLANS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Ej autentiserad' }, { status: 401 })
    }

    const { plan } = await request.json() as { plan: keyof typeof PLANS }

    if (!PLANS[plan]) {
      return NextResponse.json({ error: 'Ogiltigt paket' }, { status: 400 })
    }

    const planConfig = PLANS[plan]
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

    // Hämta eller skapa Stripe-kund
    const existingSubscription = await getSubscriptionCustomer(supabase, user.id)
    let customerId = existingSubscription?.stripe_customer_id

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { supabase_user_id: user.id },
      })
      customerId = customer.id
    }

    const isRecurring = plan !== 'onetime'

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: isRecurring ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      locale: 'sv',
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/dashboard?success=true&plan=${plan}`,
      cancel_url: `${siteUrl}/pricing?canceled=true`,
      // Information om omedelbar leverans och bortfallen ångerrätt visas på
      // betalsidan (det aktiva samtycket sker redan innan checkout öppnas).
      custom_text: {
        submit: {
          message:
            'Genom att slutföra köpet begär du att den digitala tjänsten levereras direkt och samtycker till att din ångerrätt upphör när tjänsten har utförts.',
        },
      },
      metadata: {
        user_id: user.id,
        plan,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout-fel:', error)
    return NextResponse.json({ error: 'Kunde inte starta betalning' }, { status: 500 })
  }
}
