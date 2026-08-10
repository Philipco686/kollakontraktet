import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { deleteAnalysis } from '@/lib/supabase/queries'

export async function DELETE(request: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Ej autentiserad' }, { status: 401 })
  }

  const { id } = await request.json()
  if (!id) {
    return NextResponse.json({ error: 'Analys saknas' }, { status: 400 })
  }

  const { error } = await deleteAnalysis(supabase, user.id, id)
  if (error) {
    return NextResponse.json({ error: 'Kunde inte radera analysen' }, { status: 500 })
  }

  return NextResponse.json({ deleted: true })
}
