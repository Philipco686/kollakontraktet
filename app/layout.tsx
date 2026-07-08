import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Kolla Kontraktet – Förstå dina avtal på vanlig svenska',
  description:
    'Analysera juridiska avtal med AI och få klara förklaringar på vanlig svenska. För privatpersoner och småföretagare.',
  keywords: ['avtal', 'juridik', 'AI', 'kontraktsanalys', 'Sverige'],
  openGraph: {
    title: 'Kolla Kontraktet',
    description: 'Förstå dina avtal – utan juridisk utbildning',
    locale: 'sv_SE',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  )
}
