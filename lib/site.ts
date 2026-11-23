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
  name: 'Signe Partners AB',
  tradeName: 'Kolla Kontraktet',
  orgNr: '559607-1869' as string | null,
  address: 'Saltmätargatan 3 b 1, 111 60 Stockholm' as string | null,
  email: 'kontakt@kollakontraktet.se',
}

// "Signe Partners AB (Kolla Kontraktet), org.nr 559607-1869, Saltmätargatan ..., kontakt@..."
export function companyLine(): string {
  return [
    `${COMPANY.name} (${COMPANY.tradeName})`,
    COMPANY.orgNr ? `org.nr ${COMPANY.orgNr}` : null,
    COMPANY.address,
    COMPANY.email,
  ].filter(Boolean).join(', ')
}
