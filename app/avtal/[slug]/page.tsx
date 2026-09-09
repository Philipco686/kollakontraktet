import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Scale } from 'lucide-react'
import { contractGuides, getGuide } from '@/lib/seo/contract-types'
import { SITE_URL } from '@/lib/site'
import GuideHero from '@/components/GuideHero'
import GuideChecklist from '@/components/GuideChecklist'

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
  const updatedDate = guide.updated
    ? new Date(guide.updated).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  const faqJsonLd = guide.faq && guide.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Avtalsguider', item: `${SITE_URL}/avtal` },
      { '@type': 'ListItem', position: 3, name: guide.name, item: `${SITE_URL}/avtal/${guide.slug}` },
    ],
  }

  // Ärlig författare/utgivare: organisationen (aldrig en påhittad jurist).
  const articleDate = guide.updated ?? '2026-09-09'
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1,
    description: guide.metaDescription,
    inLanguage: 'sv-SE',
    datePublished: articleDate,
    dateModified: articleDate,
    author: { '@type': 'Organization', name: 'Kolla Kontraktet', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Kolla Kontraktet',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: `${SITE_URL}/avtal/${guide.slug}`,
  }

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
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
        {/* Brödsmula */}
        <nav className="text-sm text-slate-400 mb-6" aria-label="Brödsmula">
          <Link href="/" className="hover:text-slate-600">Hem</Link>
          <span className="mx-2">/</span>
          <Link href="/avtal" className="hover:text-slate-600">Avtalsguider</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-500">{guide.name}</span>
        </nav>

        <GuideHero name={guide.name} />

        <p className="text-sm font-semibold text-accent-600 uppercase tracking-wide mb-3">{guide.name}</p>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight tracking-tight mb-4">
          {guide.h1}
        </h1>
        {updatedDate && (
          <p className="text-sm text-slate-400 mb-6">Senast uppdaterad {updatedDate} · Sammanställt av Kolla Kontraktet</p>
        )}
        <p className="text-lg text-slate-500 leading-relaxed">{guide.intro}</p>

        {/* Långform-innehåll */}
        {guide.sections?.map(s => (
          <section key={s.heading} className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-4">{s.heading}</h2>
            <div className="space-y-4">
              {s.body.map((p, i) => (
                <p key={i} className="text-slate-600 leading-relaxed">{p}</p>
              ))}
            </div>
          </section>
        ))}

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

        {/* Det här säger lagen */}
        {guide.lawRefs && guide.lawRefs.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-slate-900 mb-6">Det här säger lagen</h2>
            <div className="space-y-3">
              {guide.lawRefs.map(l => (
                <div key={l.law} className="rounded-2xl border border-slate-200 border-l-4 border-l-brand-500 p-5">
                  <h3 className="font-semibold text-slate-900 mb-1">{l.law}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{l.note}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-3">Lagtexterna finns i sin helhet på riksdagen.se.</p>
          </section>
        )}

        {/* Checklista (interaktiv + utskrivbar) */}
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-slate-900 mb-2">Checklista: fråga detta innan du signerar</h2>
          <p className="text-slate-500 text-sm mb-6">Kryssa av på skärmen (sparas i din webbläsare) eller skriv ut den som PDF.</p>
          <GuideChecklist items={guide.checklist} storageKey={guide.slug} title={guide.name} />
        </section>

        {/* CTA – nedanför innehållet */}
        <section className="mt-14 bg-brand-900 rounded-3xl px-6 py-12 text-center">
          <h2 className="font-display text-2xl font-semibold text-white mb-3">Slipp gissa – låt AI gå igenom avtalet</h2>
          <p className="text-brand-200 mb-6 max-w-lg mx-auto">
            Klistra in ditt {guide.name.toLowerCase()} så förklarar Kolla Kontraktet varje klausul på vanlig
            svenska, flaggar riskerna och ger dig förhandlingstips. Första analysen är gratis.
          </p>
          <Link href="/login" className="btn-accent">Analysera ditt {guide.name.toLowerCase()} gratis</Link>
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

        {/* Disclaimer */}
        <div className="mt-12 rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs text-slate-500 leading-relaxed flex items-start gap-2">
          <Scale className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            <strong>Inte juridisk rådgivning.</strong> Guiden är allmän information i utbildningssyfte och tar inte
            hänsyn till ditt specifika avtal. Rådgör med en jurist vid osäkerhet.
          </span>
        </div>

        {/* Andra avtalstyper (intern länkning) */}
        <section className="mt-14 pt-8 border-t border-slate-100">
          <h2 className="font-semibold text-slate-900 mb-4">Andra avtalstyper</h2>
          <div className="flex flex-wrap gap-2">
            {others.map(o => (
              <Link key={o.slug} href={`/avtal/${o.slug}`} className="text-sm bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700">
                {o.name}
              </Link>
            ))}
          </div>
        </section>
      </article>

      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <span className="font-display font-medium text-slate-500">© 2026 Kolla Kontraktet</span>
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
