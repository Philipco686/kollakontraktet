// Kanonisk produktions-URL. Normaliseras till www-värden så att canonical,
// sitemap, robots och strukturerad data ALDRIG pekar på apex-domänen
// (kollakontraktet.se) som 308-redirectar till www och splittrar auktoritet.
// Gör att SEO blir korrekt i koden även om NEXT_PUBLIC_SITE_URL i Vercel
// fortfarande saknar www.
const raw = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kollakontraktet.se'

export const SITE_URL = raw.replace('https://kollakontraktet.se', 'https://www.kollakontraktet.se')

// Uppgifter om näringsidkaren. E-handelslagen (8 §) och distansavtalslagen (2 kap. 2 §) kräver namn,
// organisationsnummer, postadress och e-post. Fält som är null visas inte, så fyll i dem.
export const COMPANY = {
  name: 'Philip Eriksson',
  tradeName: 'Kolla Kontraktet',
  orgNr: null as string | null,
  address: null as string | null,
  email: 'kontakt@kollakontraktet.se',
}

// "Philip Eriksson (Kolla Kontraktet), org.nr X, Gatan 1, 123 45 Ort, kontakt@..."
export function companyLine(): string {
  return [
    `${COMPANY.name} (${COMPANY.tradeName})`,
    COMPANY.orgNr ? `org.nr ${COMPANY.orgNr}` : null,
    COMPANY.address,
    COMPANY.email,
  ].filter(Boolean).join(', ')
}
