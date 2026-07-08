import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getActiveSubscription } from '@/lib/supabase/queries'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Ej autentiserad' }, { status: 401 })
  }

  const subscription = await getActiveSubscription(supabase, user.id)

  return NextResponse.json({ subscription })
}
