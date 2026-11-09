import type { Metadata } from 'next'
import { Inter, Fraunces, Source_Serif_4 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})
// Avtalstext och förslag på formuleringar. Neutral serif som går att läsa i små storlekar.
const sourceSerif = Source_Serif_4({ subsets: ['latin'], variable: '--font-doc', display: 'swap', preload: false })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Kolla Kontraktet: Förstå dina avtal på vanlig svenska',
  description:
    'Analysera juridiska avtal med AI och få klara förklaringar på vanlig svenska. För privatpersoner och småföretagare.',
  keywords: ['avtal', 'juridik', 'AI', 'kontraktsanalys', 'Sverige'],
  openGraph: {
    title: 'Kolla Kontraktet',
    description: 'Förstå dina avtal, utan juridisk utbildning',
    url: SITE_URL,
    siteName: 'Kolla Kontraktet',
    locale: 'sv_SE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kolla Kontraktet',
    description: 'Förstå dina avtal, utan juridisk utbildning',
  },
}

const orgWebsiteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Kolla Kontraktet',
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      email: 'kontakt@kollakontraktet.se',
      description:
        'Kolla Kontraktet analyserar juridiska avtal med AI och ger tydliga förklaringar på vanlig svenska, för privatpersoner och småföretagare.',
      founder: { '@type': 'Person', name: 'Philip Eriksson' },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Kolla Kontraktet',
      inLanguage: 'sv-SE',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${inter.variable} ${fraunces.variable} ${sourceSerif.variable}`}>
      <body className="bg-slate-50 text-slate-900 antialiased font-sans">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgWebsiteJsonLd) }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
