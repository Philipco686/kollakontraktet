// Kanonisk produktions-URL. Normaliseras till www-värden så att canonical,
// sitemap, robots och strukturerad data ALDRIG pekar på apex-domänen
// (kollakontraktet.se) som 308-redirectar till www och splittrar auktoritet.
// Gör att SEO blir korrekt i koden även om NEXT_PUBLIC_SITE_URL i Vercel
// fortfarande saknar www.
const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kollakontraktet.se'

export const SITE_URL = raw.replace('https://kollakontraktet.se', 'https://www.kollakontraktet.se')
