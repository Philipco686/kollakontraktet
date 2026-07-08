import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import { upsertSubscription, updateSubscriptionByStripeId, unlockAllAnalysesForUser, getActiveSubscription } from '@/lib/supabase/queries'
import type Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    return NextResponse.json({ error: 'Ogiltig webhook-signatur' }, { status: 400 })
  }

  const supabase = await createClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.user_id
      const plan = session.metadata?.plan as string

      if (!userId || !plan) break

      const isRecurring = plan !== 'onetime'

      // Ett engångsköp får aldrig nedgradera en aktiv prenumeration.
      const existing = await getActiveSubscription(supabase, userId)
      const hasRecurring = existing?.plan === 'personal' || existing?.plan === 'business'
      const skipDowngrade = !isRecurring && hasRecurring

      if (!skipDowngrade) {
        const { error } = await upsertSubscription(supabase, {
          user_id: userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: isRecurring ? session.subscription as string : null,
          plan: plan as 'personal' | 'business' | 'onetime',
          status: 'active',
          analyses_used_this_month: 0,
          current_period_end: isRecurring
            ? null
            : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })
        // Vid DB-fel: svara med fel så att Stripe skickar eventet igen (kunden blir inte låst ute)
        if (error) {
          console.error('Kunde inte spara prenumeration:', error)
          return NextResponse.json({ error: 'Databasfel' }, { status: 500 })
        }
      }

      // Lås upp eventuella teaser-analyser nu när kunden har betalat
      const { error: unlockError } = await unlockAllAnalysesForUser(supabase, userId)
      if (unlockError) {
        console.error('Kunde inte låsa upp analyser:', unlockError)
        return NextResponse.json({ error: 'Databasfel' }, { status: 500 })
      }
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      await updateSubscriptionByStripeId(supabase, sub.id, {
        status: sub.status as 'active' | 'canceled' | 'past_due' | 'trialing',
        current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
      })
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await updateSubscriptionByStripeId(supabase, sub.id, { status: 'canceled' })
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      await updateSubscriptionByStripeId(supabase, invoice.subscription as string, { status: 'past_due' })
      break
    }
  }

  return NextResponse.json({ received: true })
}
