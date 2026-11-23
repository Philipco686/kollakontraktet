import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getActiveSubscription } from '@/lib/supabase/queries'
import { getResend, EMAIL_FROM } from '@/lib/email'
import { checkRateLimit } from '@/lib/rate-limit'
import { stripe, PLANS } from '@/lib/stripe'
import { COMPANY, companyLine } from '@/lib/site'

// Ångerfunktionen (distansavtalslagen, EU-direktiv 2023/2673). Kunden lämnar sin ångring här,
// får en kvittens per e-post direkt och en löpande prenumeration avslutas. Återbetalningen
// hanteras manuellt inom 14 dagar, med avdrag enligt villkoren om tjänsten redan har använts.
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Ej autentiserad' }, { status: 401 })
    }

    const rate = await checkRateLimit(user.id, 'withdrawal', 5, 60)
    if (!rate.allowed) {
      return NextResponse.json({ error: 'För många försök. Vänta en stund och försök igen.' }, { status: 429 })
    }

    const body = await request.json().catch(() => ({}))
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : ''
    const purchase = typeof body.purchase === 'string' ? body.purchase.trim().slice(0, 300) : ''
    const message = typeof body.message === 'string' ? body.message.trim().slice(0, 2000) : ''
    if (!name || !purchase) {
      return NextResponse.json({ error: 'Fyll i ditt namn och vilket köp du vill ångra.' }, { status: 400 })
    }

    const resend = getResend()
    if (!resend) {
      console.error('Ångring kunde inte skickas (e-post saknas):', { user: user.id, name, purchase })
      return NextResponse.json(
        { error: `Ångringen kunde inte skickas automatiskt. Mejla ${COMPANY.email} med ditt namn och vilket köp du vill ångra.` },
        { status: 503 }
      )
    }

    // En löpande prenumeration avslutas direkt, så att inga fler dragningar görs
    const sub = await getActiveSubscription(supabase, user.id)
    let subscriptionNote = ''
    if (sub?.stripe_subscription_id && (sub.plan === 'personal' || sub.plan === 'business')) {
      try {
        await stripe.subscriptions.cancel(sub.stripe_subscription_id)
        subscriptionNote = `Din prenumeration ${PLANS[sub.plan].name} är avslutad och inga fler dragningar görs.`
      } catch (e) {
        console.error('Kunde inte avsluta prenumeration vid ångring:', e)
        subscriptionNote = 'Vi avslutar din prenumeration manuellt och bekräftar när det är gjort.'
      }
    }

    const receivedAt = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })
    const details = `
      <p style="margin:0 0 4px"><strong>Namn:</strong> ${esc(name)}</p>
      <p style="margin:0 0 4px"><strong>E-post:</strong> ${esc(user.email ?? '')}</p>
      <p style="margin:0 0 4px"><strong>Köp som ångras:</strong> ${esc(purchase)}</p>
      ${message ? `<p style="margin:0 0 4px"><strong>Meddelande:</strong> ${esc(message)}</p>` : ''}
      <p style="margin:0 0 4px"><strong>Mottagen:</strong> ${esc(receivedAt)}</p>`

    const receipt = await resend.emails.send({
      from: EMAIL_FROM,
      to: user.email!,
      subject: 'Vi har tagit emot din ångring',
      html: `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;color:#0f172a;font-size:14px;line-height:1.6">
        <p>Hej ${esc(name)},</p>
        <p>Vi har tagit emot att du vill ångra ditt köp hos Kolla Kontraktet. Det här är din kvittens.</p>
        ${details}
        ${subscriptionNote ? `<p>${esc(subscriptionNote)}</p>` : ''}
        <p>Vi återbetalar senast inom 14 dagar till samma betalsätt som du använde. Har du redan tagit del av
        analyser kan vi göra avdrag för det som levererats, enligt våra användarvillkor.</p>
        <p>Frågor? Svara på det här mejlet eller skriv till ${esc(COMPANY.email)}.</p>
        <p style="color:#64748b;font-size:12px">${esc(companyLine())}</p>
      </div>`,
    })
    if (receipt.error) {
      console.error('Resend-fel vid ångring:', receipt.error, { user: user.id, name, purchase })
      return NextResponse.json(
        { error: `Ångringen kunde inte skickas. Mejla ${COMPANY.email} med ditt namn och vilket köp du vill ångra.` },
        { status: 502 }
      )
    }

    await resend.emails.send({
      from: EMAIL_FROM,
      to: COMPANY.email,
      replyTo: user.email!,
      subject: `Ångring: ${name}`,
      html: `<div style="font-family:sans-serif;font-size:14px">${details}<p>${esc(subscriptionNote || 'Ingen löpande prenumeration avslutades.')}</p><p>Återbetala senast 14 dagar från mottagandet.</p></div>`,
    }).catch(e => console.error('Kunde inte avisera om ångring:', e))

    return NextResponse.json({ ok: true, receivedAt, subscriptionNote })
  } catch (error) {
    console.error('Ångringsfel:', error)
    return NextResponse.json(
      { error: `Något gick fel. Mejla ${COMPANY.email} med ditt namn och vilket köp du vill ångra.` },
      { status: 500 }
    )
  }
}
