import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

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
    <html lang="sv" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="bg-slate-50 text-slate-900 antialiased font-sans">{children}</body>
    </html>
  )
}
