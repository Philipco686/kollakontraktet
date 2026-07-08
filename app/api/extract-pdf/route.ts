import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { extractText, getDocumentProxy } from 'unpdf'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Ej autentiserad' }, { status: 401 })
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
