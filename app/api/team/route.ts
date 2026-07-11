import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  getActiveSubscription,
  listTeamMembers,
  addTeamMember,
  removeTeamMember,
  MAX_TEAM_TOTAL,
} from '@/lib/supabase/queries'
import { getResend, EMAIL_FROM, buildTeamInviteEmailHtml } from '@/lib/email'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

async function requireBusinessOwner() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Ej autentiserad', status: 401 as const }
  const sub = await getActiveSubscription(supabase, user.id)
  if (sub?.plan !== 'business') {
    return { error: 'Team ingår i Företag-paketet', status: 403 as const }
  }
  return { supabase, user }
}

export async function GET() {
  const ctx = await requireBusinessOwner()
  if ('error' in ctx) {
    // Icke-ägare får ett tomt svar (sidan visar erbjudande istället)
    return NextResponse.json({ isOwner: false, members: [], max: MAX_TEAM_TOTAL })
  }
  const members = await listTeamMembers(ctx.supabase, ctx.user.id)
  return NextResponse.json({ isOwner: true, members, max: MAX_TEAM_TOTAL, ownerEmail: ctx.user.email })
}

export async function POST(request: NextRequest) {
  const ctx = await requireBusinessOwner()
  if ('error' in ctx) return NextResponse.json({ error: ctx.error }, { status: ctx.status })

  const { email } = await request.json()
  const clean = (email ?? '').trim().toLowerCase()

  if (!EMAIL_RE.test(clean)) {
    return NextResponse.json({ error: 'Ogiltig e-postadress' }, { status: 400 })
  }
  if (clean === ctx.user.email?.toLowerCase()) {
    return NextResponse.json({ error: 'Du är redan med (som ägare)' }, { status: 400 })
  }

  const members = await listTeamMembers(ctx.supabase, ctx.user.id)
  if (members.some(m => m.email === clean)) {
    return NextResponse.json({ error: 'Den här personen är redan inbjuden' }, { status: 400 })
  }
  // +1 för ägaren
  if (members.length + 1 >= MAX_TEAM_TOTAL) {
    return NextResponse.json({ error: `Max ${MAX_TEAM_TOTAL} användare (inklusive dig)` }, { status: 400 })
  }

  const { error } = await addTeamMember(ctx.supabase, ctx.user.id, clean)
  if (error) {
    return NextResponse.json({ error: 'Kunde inte lägga till medlemmen' }, { status: 500 })
  }

  // Skicka inbjudningsmejl (om e-post är konfigurerat via RESEND_API_KEY)
  const resend = getResend()
  if (resend) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.kollakontraktet.se'
    try {
      await resend.emails.send({
        from: EMAIL_FROM,
        to: clean,
        subject: 'Du har bjudits in till ett team på Kolla Kontraktet',
        html: buildTeamInviteEmailHtml(ctx.user.email ?? '', siteUrl),
      })
    } catch (err) {
      console.error('Kunde inte skicka teaminbjudan:', err)
    }
  }

  const updated = await listTeamMembers(ctx.supabase, ctx.user.id)
  return NextResponse.json({ members: updated })
}

export async function DELETE(request: NextRequest) {
  const ctx = await requireBusinessOwner()
  if ('error' in ctx) return NextResponse.json({ error: ctx.error }, { status: ctx.status })

  const { email } = await request.json()
  const clean = (email ?? '').trim().toLowerCase()

  const { error } = await removeTeamMember(ctx.supabase, ctx.user.id, clean)
  if (error) {
    return NextResponse.json({ error: 'Kunde inte ta bort medlemmen' }, { status: 500 })
  }

  const updated = await listTeamMembers(ctx.supabase, ctx.user.id)
  return NextResponse.json({ members: updated })
}
