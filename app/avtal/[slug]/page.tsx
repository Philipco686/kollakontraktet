import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { contractGuides, getGuide } from '@/lib/seo/contract-types'

export function generateStaticParams() {
  return contractGuides.map(g => ({ slug: g.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) return {}
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: { canonical: `/avtal/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      type: 'article',
      locale: 'sv_SE',
    },
  }
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuide(slug)
  if (!guide) notFound()

  const others = contractGuides.filter(g => g.slug !== guide.slug)

  const faqJsonLd = guide.faq && guide.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  return (
    <div className="min-h-screen bg-white">
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <header className="border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-semibold text-brand-800 text-lg">Kolla Kontraktet</Link>
          <Link href="/login" className="btn-accent text-sm py-2 px-4">Prova gratis</Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-14">
        <p className="text-sm font-semibold text-accent-600 uppercase tracking-wide mb-3">{guide.name}</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight tracking-tight mb-5">
          {guide.h1}
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed mb-8">{guide.intro}</p>
        <Link href="/login" className="btn-accent">Analysera ditt {guide.name.toLowerCase()} gratis →</Link>

        {/* Fällor */}
        <section className="mt-14">
          <h2 className="font-display text-2xl font-semibold text-slate-900 mb-6">Det här missar folk ofta</h2>
          <div className="space-y-4">
            {guide.traps.map(t => (
              <div key={t.title} className="rounded-2xl border border-slate-200 border-l-4 border-l-accent-500 p-5">
                <h3 className="font-semibold text-slate-900 mb-1">{t.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Checklista */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-slate-900 mb-6">Fråga detta innan du signerar</h2>
          <ul className="space-y-2">
            {guide.checklist.map(q => (
              <li key={q} className="flex items-start gap-3 text-slate-700">
                <span className="w-5 h-5 rounded border-2 border-slate-300 shrink-0 mt-0.5" />
                {q}
              </li>
            ))}
          </ul>
        </section>

        {/* Så hjälper verktyget */}
        <section className="mt-12 bg-brand-900 rounded-3xl px-6 py-12 text-center">
          <h2 className="font-display text-2xl font-semibold text-white mb-3">Slipp gissa – låt AI gå igenom avtalet</h2>
          <p className="text-brand-200 mb-6 max-w-lg mx-auto">
            Klistra in ditt {guide.name.toLowerCase()} så förklarar Kolla Kontraktet varje klausul på vanlig
            svenska, flaggar riskerna och ger dig förhandlingstips. Första analysen är gratis.
          </p>
          <Link href="/login" className="btn-accent">Prova gratis nu</Link>
        </section>

        {/* FAQ */}
        {guide.faq && guide.faq.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-6">Vanliga frågor</h2>
            <div className="space-y-5">
              {guide.faq.map(f => (
                <div key={f.q}>
                  <h3 className="font-semibold text-slate-900 mb-1">{f.q}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Andra avtalstyper (intern länkning) */}
        <section className="mt-14 pt-8 border-t border-slate-100">
          <h2 className="font-semibold text-slate-900 mb-4">Andra avtalstyper</h2>
          <div className="flex flex-wrap gap-2">
            {others.map(o => (
              <Link key={o.slug} href={`/avtal/${o.slug}`} className="text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full px-3 py-1.5 text-slate-700">
                {o.name}
              </Link>
            ))}
          </div>
        </section>
      </article>

      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
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
