import Link from 'next/link'
import type { Metadata } from 'next'
import { SITE_URL } from '@/lib/site'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const softwareAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Kolla Kontraktet',
  url: SITE_URL,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description:
    'AI-driven analys av juridiska avtal på svenska. Klistra in eller ladda upp ett hyreskontrakt, anställningsavtal eller konsultavtal och få klausulgenomgång, riskbedömning och förhandlingstips.',
  offers: [
    { '@type': 'Offer', name: 'Engångsanalys', price: '49', priceCurrency: 'SEK', url: `${SITE_URL}/pricing` },
    { '@type': 'Offer', name: 'Personlig', price: '149', priceCurrency: 'SEK', url: `${SITE_URL}/pricing` },
    { '@type': 'Offer', name: 'Företag', price: '499', priceCurrency: 'SEK', url: `${SITE_URL}/pricing` },
  ],
}

const contractTypes = [
  'Hyreskontrakt', 'Anställningsavtal', 'Konsultavtal',
  'Köpeavtal', 'Samboavtal', 'Bolånehandlingar',
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />

      {/* Hero – djup navy-botten med svävande kontroller */}
      <div className="hero-depth">
        <header className="relative z-10 border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-brand-700 grid place-items-center shrink-0">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12.5 9 16.5 19 7" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-display font-semibold text-white text-lg tracking-tight">Kolla Kontraktet</span>
            </div>
            <div className="hidden sm:flex items-center gap-7 text-sm text-[#c4cee4]">
              <Link href="/avtal" className="hover:text-white transition-colors">Avtalsguider</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Priser</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-[#c4cee4] hover:text-white transition-colors">Logga in</Link>
              <Link href="/login" className="btn-accent btn-float text-sm py-2 px-4">Prova gratis</Link>
            </div>
          </div>
        </header>

        <section className="relative z-10 max-w-6xl mx-auto px-4 pt-16 pb-20 sm:pt-20 sm:pb-28 grid lg:grid-cols-2 gap-12 lg:gap-14 items-center">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#e7c892]">Avtalsanalys på svenska</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.3rem] font-medium leading-[1.06] tracking-tight text-[#f6f8fc] mt-5">
              Förstå ditt avtal <span className="text-[#f1c577]">innan</span> du skriver under.
            </h1>
            <p className="text-lg text-[#c4cee4] leading-relaxed mt-6 max-w-lg">
              Klistra in ditt hyreskontrakt, anställningsavtal eller konsultavtal. AI:n flaggar riskerna,
              förklarar varje klausul på vanlig svenska och visar vad de kan kosta dig.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <Link href="/login" className="btn-accent btn-float text-base px-7 py-3.5">Analysera ditt avtal</Link>
              <Link href="#exempel" className="btn-glass rounded-xl px-6 py-3.5 text-base font-medium inline-flex items-center">Se ett exempel</Link>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-7 text-sm text-[#93a1c2]">
              <span className="flex items-center gap-1.5"><Tick /> Första analysen gratis</span>
              <span className="flex items-center gap-1.5"><Tick /> Inget kort krävs</span>
              <span className="flex items-center gap-1.5"><Tick /> Klart på under en minut</span>
            </div>
          </div>

          {/* Svävande produktpanel – den riktiga analysen */}
          <div className="panel-float bg-white rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
              <div>
                <div className="font-display font-semibold text-slate-900 text-[15px]">Hyreskontrakt, lägenhet</div>
                <div className="text-xs text-slate-400 mt-0.5">11 klausuler analyserade</div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 whitespace-nowrap">Medel risk</span>
            </div>
            <div className="p-5 flex flex-col gap-3.5">
              <Clause level="warn" title="Indexreglering av hyra"
                body="Hyran höjs automatiskt varje år. Med ett golv på 4 % betalar du mer även år då index knappt rör sig." />
              <div className="h-px bg-slate-100" />
              <Clause level="good" title="Uppsägningstid"
                body="Tre månader — standard för en bostad, och gäller oavsett vad kontraktet säger." />
              <div className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5">
                <div>
                  <div className="text-xs text-slate-500">Ekonomisk risk, worst case</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Vid KPI 10 % på 12 mån hyra à 10 800 kr</div>
                </div>
                <div className="font-display text-2xl font-semibold text-red-700 tabular-nums">+12 960 kr</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Fungerar för */}
      <div className="border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Fungerar för</span>
          {contractTypes.map((t, i) => (
            <span key={t} className="flex items-center gap-4">
              {i > 0 && <span className="text-slate-300" aria-hidden="true">·</span>}
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Så ser analysen ut */}
      <section id="exempel" className="max-w-6xl mx-auto px-4 py-20 sm:py-24">
        <div className="max-w-xl mb-10">
          <span className="text-xs font-semibold tracking-[0.14em] uppercase text-accent-600">Så ser analysen ut</span>
          <h2 className="font-display text-3xl sm:text-4xl font-medium text-slate-900 tracking-tight leading-tight mt-3.5">
            Inte en sammanfattning. Ett råd.
          </h2>
          <p className="text-slate-500 text-base leading-relaxed mt-3.5">
            En sammanfattning får du gratis av vilken AI som helst. Det värdefulla är att veta vilken klausul som
            avviker, vad den kan kosta, och exakt vad du ska säga för att förhandla bort den.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-5 items-stretch">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100">
              <div>
                <div className="font-display font-semibold text-slate-900 text-[15px]">Konsultavtal</div>
                <div className="text-xs text-slate-400 mt-0.5">Genomgång av klausuler</div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 whitespace-nowrap">Medel risk</span>
            </div>
            <div className="p-5 flex flex-col gap-3.5">
              <Clause level="bad" title="Obegränsat ansvar"
                body="Inget tak på ditt skadeståndsansvar. Ett enda fel kan kosta dig långt mer än hela arvodet." />
              <div className="h-px bg-slate-100" />
              <Clause level="warn" title="Betalningstid 90 dagar"
                body="Pressar din likviditet. Enligt räntelagen är 30 dagar utgångspunkten — det här går att förhandla." />
              <div className="h-px bg-slate-100" />
              <Clause level="good" title="Uppsägningstid"
                body="Symmetrisk åt båda håll. Rimligt och standardenligt." />
              <div className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5">
                <div>
                  <div className="text-xs text-slate-500">Ekonomisk risk, worst case</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Vid vite om 6 månadsarvoden</div>
                </div>
                <div className="font-display text-2xl font-semibold text-red-700 tabular-nums">270 000 kr</div>
              </div>
            </div>
          </div>

          <div className="bg-brand-900 text-white rounded-2xl p-6 flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#e7c892]">Det här kan du förhandla</span>
            <h3 className="font-display text-xl font-medium leading-snug">Be om ett tak på ansvaret.</h3>
            <p className="font-display italic text-[15px] leading-relaxed text-brand-100 border-l-2 border-white/25 pl-3.5">
              ”Jag vill begränsa mitt ansvar till arvodet för uppdraget, och att indirekta skador undantas.”
            </p>
            <div className="text-xs text-brand-200/90 mt-auto pt-2">
              Färdig formulering · en av 6 förhandlingspunkter i den fulla analysen
            </div>
          </div>
        </div>
      </section>

      {/* Trygghet */}
      <section className="bg-brand-900">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 md:gap-12">
          <div>
            <h2 className="font-display text-3xl font-medium text-white tracking-tight">Dina dokument är säkra</h2>
            <p className="text-brand-200 mt-3 max-w-sm leading-relaxed">
              Juridiska dokument är känsliga. Så hanterar vi dem.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-7 gap-y-6">
            {[
              { title: 'Krypterad överföring', desc: 'All data skickas krypterat via HTTPS.' },
              { title: 'Ingen människa läser avtalet', desc: 'Texten analyseras automatiskt av AI, aldrig manuellt av personal.' },
              { title: 'GDPR-anpassat', desc: 'Du kan radera dina uppgifter när som helst.' },
              { title: 'Avtalstexten gallras', desc: 'Originaltexten raderas automatiskt efter 90 dagar.' },
            ].map(({ title, desc }) => (
              <div key={title}>
                <div className="flex items-center gap-2.5">
                  <span className="text-[#e7c892] shrink-0"><ShieldIcon /></span>
                  <h3 className="font-semibold text-white text-[15px]">{title}</h3>
                </div>
                <p className="text-sm text-brand-200 leading-relaxed mt-1.5 pl-[26px]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avslutande CTA */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="hero-depth rounded-3xl px-6 py-16 text-center">
          <div className="relative z-10">
            <h2 className="font-display text-3xl sm:text-4xl font-medium text-white tracking-tight">Vad döljer sig i ditt avtal?</h2>
            <p className="text-[#c4cee4] mt-4 max-w-lg mx-auto leading-relaxed">
              Testa gratis — din första analys kostar inget och tar under en minut. Inget kort krävs.
            </p>
            <div className="mt-8">
              <Link href="/login" className="btn-accent btn-float text-base px-8 py-3.5">Prova gratis nu</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <span className="font-display font-medium text-slate-500">© 2026 Kolla Kontraktet</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            <Link href="/avtal" className="hover:text-slate-600">Avtalsguider</Link>
            <Link href="/pricing" className="hover:text-slate-600">Priser</Link>
            <Link href="/privacy" className="hover:text-slate-600">Integritetspolicy</Link>
            <Link href="/terms" className="hover:text-slate-600">Villkor</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Clause({ level, title, body }: { level: 'good' | 'warn' | 'bad'; title: string; body: string }) {
  const dot = { good: 'bg-green-500', warn: 'bg-amber-500', bad: 'bg-red-500' }[level]
  return (
    <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
      <span className={`w-2.5 h-2.5 rounded-full mt-[7px] shrink-0 ${dot}`} />
      <div>
        <div className="text-sm font-semibold text-slate-900">{title}</div>
        <div className="text-[13px] text-slate-500 leading-snug mt-0.5">{body}</div>
      </div>
    </div>
  )
}

function Tick() {
  return (
    <svg className="w-3.5 h-3.5 text-[#e7c892]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 4.4-3 8.2-7 9-4-.8-7-4.6-7-9V7l7-4z" />
    </svg>
  )
}
