import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-display font-semibold text-brand-800 text-xl tracking-tight">Kolla Kontraktet</span>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900">Logga in</Link>
            <Link href="/login" className="btn-accent text-sm py-2 px-4">Prova gratis</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 to-white" />
        <div className="relative max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-brand-100 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-accent-500" />
            AI-driven avtalsanalys på svenska
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-semibold text-slate-900 leading-[1.1] tracking-tight mb-6">
            Förstå ditt avtal –{' '}
            <span className="text-brand-700">innan du skriver under</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Klistra in ditt hyreskontrakt, anställningsavtal eller konsultavtal. Du får en tydlig
            analys med risker, dolda fällor och förhandlingstips – på vanlig svenska.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login" className="btn-accent text-base px-8">Prova gratis – analysera ditt avtal</Link>
            <Link href="#exempel" className="btn-secondary text-base">Se ett exempel</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><CheckIcon /> Första analysen gratis</span>
            <span className="flex items-center gap-1.5"><CheckIcon /> Inget kort krävs</span>
            <span className="flex items-center gap-1.5"><CheckIcon /> Klar på under en minut</span>
          </div>
        </div>
      </section>

      {/* Exempel på analys */}
      <section id="exempel" className="bg-slate-50 border-y border-slate-100 py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent-600 uppercase tracking-wide mb-2">Så ser analysen ut</p>
            <h2 className="font-display text-3xl font-semibold text-slate-900">Riktigt exempel från ett hyreskontrakt</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Originaltext i avtalet</p>
              <p className="text-slate-700 font-mono text-sm leading-relaxed">
                &quot;Hyresvärden äger rätt att höja hyran en gång per år i enlighet med förändringen i
                konsumentprisindex (KPI), dock med lägst 4 % per år oavsett indexutveckling.&quot;
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-amber-200 border-l-4 border-l-accent-500 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-500" />
                <span className="font-semibold text-slate-900">Indexreglering av hyra</span>
                <span className="ml-auto text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-medium">Varning</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-3">
                Din hyra höjs automatiskt varje år – du behöver inte godkänna det. Med ett golv på 4 %
                betalar du mer även år då index knappt rör sig.
              </p>
              <div className="bg-brand-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-brand-700 mb-1">Det här kan du förhandla</p>
                <p className="text-sm text-brand-900 italic">&quot;Jag vill ta bort golvet så att höjningen enbart följer KPI.&quot;</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-red-200 border-l-4 border-l-red-400 p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">Ekonomisk risk – worst case</span>
                <span className="font-display text-2xl font-semibold text-red-600">+12 960 kr/år</span>
              </div>
              <p className="text-sm text-slate-500 mt-1">Baserat på KPI 10 % på 12 månaders hyra à 10 800 kr</p>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-slate-400 mb-4">+ 9 fler klausuler, förhandlingstips, viktiga datum och checklista</p>
              <Link href="/login" className="btn-accent">Analysera ditt avtal gratis</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hur det fungerar */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="font-display text-3xl font-semibold text-slate-900 text-center mb-14">Tre enkla steg</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            { n: '1', title: 'Klistra in avtalet', desc: 'Kopiera texten eller ladda upp din PDF direkt i editorn.' },
            { n: '2', title: 'AI analyserar', desc: 'Varje klausul granskas, risker flaggas och ovanliga villkor identifieras.' },
            { n: '3', title: 'Förstå och förhandla', desc: 'Du får klara förklaringar, worst-case i kronor och konkreta förhandlingstips.' },
          ].map(({ n, title, desc }) => (
            <div key={n} className="text-center">
              <div className="w-12 h-12 rounded-full bg-brand-700 text-white font-display font-semibold text-lg flex items-center justify-center mx-auto mb-5">
                {n}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trygghet */}
      <section className="bg-brand-900 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold text-white mb-3">Dina dokument är säkra</h2>
            <p className="text-brand-200">Juridiska dokument är känsliga. Så hanterar vi dem.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Krypterad överföring', desc: 'All data skickas krypterat via HTTPS.' },
              { title: 'Ingen människa läser ditt avtal', desc: 'Texten analyseras automatiskt – aldrig manuellt av personal.' },
              { title: 'GDPR-anpassat', desc: 'Du kan radera dina uppgifter när som helst.' },
              { title: 'Inte juridisk rådgivning', desc: 'Ett verktyg som hjälper dig förstå – rådgör med jurist vid tvivel.' },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-brand-800/60 rounded-2xl p-5 flex gap-4">
                <span className="text-accent-400 shrink-0 mt-0.5"><ShieldIcon /></span>
                <div>
                  <h3 className="font-semibold text-white mb-1">{title}</h3>
                  <p className="text-sm text-brand-200 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avtalstyper */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="font-display text-2xl font-semibold text-slate-900 text-center mb-10">Fungerar för alla typer av avtal</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'Hyreskontrakt', 'Anställningsavtal', 'Köpeavtal',
            'Konsultavtal', 'Samboavtal', 'Leverantörsavtal',
            'Sekretessavtal (NDA)', 'Franchiseavtal', 'Bolånehandlingar',
          ].map(type => (
            <div key={type} className="bg-slate-50 rounded-xl p-4 text-center text-sm text-slate-700 font-medium border border-slate-100 hover:border-brand-200 transition-colors">
              {type}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="bg-brand-700 rounded-3xl px-6 py-16 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white mb-4">Vad döljer sig i ditt avtal?</h2>
          <p className="text-brand-200 mb-8 max-w-lg mx-auto">
            Testa gratis – din första analys kostar inget och tar under en minut. Inget kort krävs.
          </p>
          <Link href="/login" className="btn-accent text-lg px-8">Prova gratis nu</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
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

function CheckIcon() {
  return (
    <svg className="w-4 h-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 4.4-3 8.2-7 9-4-.8-7-4.6-7-9V7l7-4z" />
    </svg>
  )
}
