import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getEffectiveSubscription } from '@/lib/supabase/queries'

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Ej autentiserad' }, { status: 401 })
  }

  const subscription = await getEffectiveSubscription(supabase, user.id, user.email)

  return NextResponse.json({ subscription })
}
