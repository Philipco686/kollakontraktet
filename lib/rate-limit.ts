import { createClient } from '@supabase/supabase-js'

function adminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

/**
 * Databas-baserad rate limiting (fungerar även på serverless/Vercel där
 * minnesbaserade räknare inte delas mellan instanser).
 *
 * Returnerar { allowed: true } om anropet får fortsätta, annars
 * { allowed: false, retryAfterMinutes } för ett begripligt felmeddelande.
 */
export async function checkRateLimit(
  userId: string,
  action: 'analyze' | 'extract-pdf' | 'email' | 'ask',
  maxPerWindow: number,
  windowMinutes: number
): Promise<{ allowed: boolean; retryAfterMinutes?: number }> {
  const admin = adminClient()
  const windowStart = new Date(Date.now() - windowMinutes * 60_000).toISOString()

  const { count, error } = await admin
    .from('rate_limits')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('action', action)
    .gte('created_at', windowStart)

  // Om själva kontrollen fallerar: släpp igenom hellre än att blockera betalande
  // kunder på grund av ett internt fel (fail open), men logga det.
  if (error) {
    console.error('Rate limit-kontroll misslyckades:', error)
    return { allowed: true }
  }

  if ((count ?? 0) >= maxPerWindow) {
    return { allowed: false, retryAfterMinutes: windowMinutes }
  }

  await admin.from('rate_limits').insert({ user_id: userId, action })

  // Opportunistisk städning: rensa gamla rader då och då (1 gång på ~20 anrop)
  if (Math.random() < 0.05) {
    const cutoff = new Date(Date.now() - 24 * 60 * 60_000).toISOString()
    await admin.from('rate_limits').delete().lt('created_at', cutoff)
  }

  return { allowed: true }
}
