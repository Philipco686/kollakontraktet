import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { purgeOldContractText } from '@/lib/supabase/queries'

// Schemalagt via vercel.json. Gallrar avtalstext äldre än 90 dagar.
export async function GET(request: NextRequest) {
  // Verifiera att anropet kommer från Vercels cron (om CRON_SECRET är satt)
  const secret = process.env.CRON_SECRET
  if (secret) {
    const auth = request.headers.get('authorization')
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  const supabase = await createClient()
  const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
  const { error } = await purgeOldContractText(supabase, cutoff)

  if (error) {
    console.error('Gallringsfel:', error)
    return NextResponse.json({ error: 'Gallring misslyckades' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, purgedBefore: cutoff })
}
