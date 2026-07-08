import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAnalysisById } from '@/lib/supabase/queries'
import { getResend, EMAIL_FROM, buildAnalysisEmailHtml } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Ej autentiserad' }, { status: 401 })
    }

    const resend = getResend()
    if (!resend) {
      return NextResponse.json(
        { error: 'E-postutskick är inte aktiverat ännu.' },
        { status: 503 }
      )
    }

    const { analysisId } = await request.json()
    if (!analysisId) {
      return NextResponse.json({ error: 'Analys saknas' }, { status: 400 })
    }

    const analysis = await getAnalysisById(supabase, user.id, analysisId)
    if (!analysis) {
      return NextResponse.json({ error: 'Analysen hittades inte' }, { status: 404 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
    const html = buildAnalysisEmailHtml(analysis, siteUrl)

    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: user.email!,
      subject: `Din avtalsanalys: ${analysis.title}`,
      html,
    })

    if (error) {
      console.error('Resend-fel:', error)
      return NextResponse.json({ error: 'Kunde inte skicka e-posten' }, { status: 502 })
    }

    return NextResponse.json({ sent: true })
  } catch (error) {
    console.error('E-postfel:', error)
    return NextResponse.json({ error: 'Något gick fel' }, { status: 500 })
  }
}
