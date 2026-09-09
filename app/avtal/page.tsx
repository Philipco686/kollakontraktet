import Link from 'next/link'
import type { Metadata } from 'next'
import { contractGuides } from '@/lib/seo/contract-types'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Avtalsguider: fällor och råd per avtalstyp | Kolla Kontraktet',
  description:
    'Guider för de vanligaste svenska avtalen – hyreskontrakt, anställningsavtal, konsultavtal, NDA med flera. Se fällorna och analysera ditt eget avtal med AI.',
  alternates: { canonical: '/avtal' },
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hem', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Avtalsguider', item: `${SITE_URL}/avtal` },
  ],
}

export default function AvtalIndex() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <header className="border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-semibold text-brand-800 text-lg">Kolla Kontraktet</Link>
          <Link href="/login" className="btn-accent text-sm py-2 px-4">Prova gratis</Link>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-14">
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight mb-4">
          Avtalsguider
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mb-10">
          Vad ska man tänka på i olika avtal? Här är fällorna per avtalstyp – och du kan analysera ditt
          eget avtal med AI på under en minut.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contractGuides.map(g => (
            <Link
              key={g.slug}
              href={`/avtal/${g.slug}`}
              className="rounded-2xl border border-slate-200 p-5 hover:border-brand-200 hover:shadow-sm transition-all"
            >
              <h2 className="font-semibold text-slate-900 mb-1">{g.name}</h2>
              <p className="text-sm text-slate-500 leading-relaxed">{g.intro}</p>
              <span className="text-sm text-brand-700 font-medium mt-2 inline-block">Läs guiden →</span>
            </Link>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <span className="font-display font-medium text-slate-500">© 2025 Kolla Kontraktet</span>
          <div className="flex gap-6">
            <Link href="/pricing" className="hover:text-slate-600">Priser</Link>
            <Link href="/privacy" className="hover:text-slate-600">Integritetspolicy</Link>
            <Link href="/terms" className="hover:text-slate-600">Villkor</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
