import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { extractText, getDocumentProxy } from 'unpdf'
import { checkRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Ej autentiserad' }, { status: 401 })
    }

    // Spärr mot spam: max 30 PDF-uppladdningar per timme
    const rate = await checkRateLimit(user.id, 'extract-pdf', 30, 60)
    if (!rate.allowed) {
      return NextResponse.json(
        { error: 'För många uppladdningar på kort tid. Vänta en stund och försök igen.' },
        { status: 429 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Ingen fil bifogad' }, { status: 400 })
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Endast PDF-filer stöds' }, { status: 400 })
    }

    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json({ error: 'Filen är för stor (max 15 MB)' }, { status: 400 })
    }

    const buffer = await file.arrayBuffer()
    const pdf = await getDocumentProxy(new Uint8Array(buffer))
    const { text } = await extractText(pdf, { mergePages: true })

    const cleaned = (text ?? '').trim()

    if (cleaned.length < 50) {
      return NextResponse.json(
        {
          error:
            'Vi kunde inte läsa text ur PDF:en. Den kan vara inskannad som bild – prova att kopiera in texten manuellt.',
        },
        { status: 422 }
      )
    }

    return NextResponse.json({ text: cleaned })
  } catch (error) {
    console.error('PDF-extraktionsfel:', error)
    return NextResponse.json({ error: 'Kunde inte läsa PDF-filen' }, { status: 500 })
  }
}
