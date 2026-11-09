import { cache } from 'react'
import { createClient } from '@/lib/supabase/server'
import { getAnalysisById } from '@/lib/supabase/queries'
import { buildViewAnalysis, type ViewAnalysis } from './viewmodel'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/* Hämtar en analys åt den inloggade användaren och gör om den till det vyerna behöver.
 * Bara härledda fält lämnar servern. Avtalstexten och rådatan skickas aldrig till webbläsaren,
 * och en låst analys får aldrig med sig mer än sammanfattning, risknivå och nyckeluppgifter.
 * cache() gör att layout och sida delar ett enda anrop per förfrågan. */
export const loadViewAnalysis = cache(async (id: string): Promise<ViewAnalysis | null> => {
  if (!UUID.test(id)) return null
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const row = await getAnalysisById(supabase, user.id, id)
  return row ? buildViewAnalysis(row) : null
})
