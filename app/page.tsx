import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-brand-700 text-lg">Kolla Kontraktet</span>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-600 hover:text-slate-900">Logga in</Link>
            <Link href="/login" className="btn-primary text-sm py-2 px-4">Prova gratis</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <div className="inline-block bg-brand-50 text-brand-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          AI-driven avtalsanalys på svenska
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
          Förstå ditt avtal –{' '}
          <span className="text-brand-600">innan du skriver under</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10">
          Klistra in ditt hyreskontrakt, anställningsavtal eller konsultavtal.
          Du får en tydlig analys med risker, fällor och förhandlingstips – på vanlig svenska.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="btn-primary text-base">Prova gratis – analysera ditt avtal →</Link>
          <Link href="#exempel" className="btn-secondary text-base">Se ett exempel</Link>
        </div>
        <p className="text-sm text-slate-400 mt-4">Första analysen är gratis · inget kort krävs</p>
      </section>

      {/* Exempel på analys */}
      <section id="exempel" className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 text-center mb-2">Så här ser analysen ut</h2>
          <p className="text-slate-500 text-center mb-10">Riktigt exempel från ett hyreskontrakt</p>

          <div className="space-y-4">
            {/* Originalklausul */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Originaltext i avtalet</p>
              <p className="text-slate-700 font-mono text-sm leading-relaxed">
                "Hyresvärden äger rätt att höja hyran en gång per år i enlighet med
                förändringen i konsumentprisindex (KPI). Hyresgästen underrättas skriftligen
                senast tre månader innan höjningen träder i kraft."
              </p>
            </div>

            {/* AI-förklaring */}
            <div className="bg-white rounded-2xl border border-amber-200 border-l-4 border-l-amber-400 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">🟡</span>
                <span className="font-semibold text-slate-900">Indexreglering av hyra</span>
                <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Varning</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed mb-3">
                Din hyra kommer att höjas varje år automatiskt – du behöver inte godkänna det.
                KPI låg på ca 10% under 2023, vilket innebär att en hyra på 8 000 kr
                kan bli 8 800 kr utan att du kan säga nej.
              </p>
              <div className="bg-amber-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-amber-700 mb-1">💡 Vad du kan förhandla</p>
                <p className="text-sm text-amber-800">"Jag vill lägga till ett tak på max 3% höjning per år oavsett KPI."</p>
              </div>
            </div>

            {/* Ekonomisk risk */}
            <div className="bg-white rounded-2xl border border-red-200 border-l-4 border-l-red-400 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span>💸</span>
                <span className="font-semibold text-slate-900">Ekonomisk risk – worst case</span>
                <span className="ml-auto text-xl font-bold text-red-600">+12 960 kr/år</span>
              </div>
              <p className="text-sm text-slate-500">Baserat på KPI 10% på 12 månaders hyra à 10 800 kr</p>
            </div>

            <div className="text-center pt-2">
              <p className="text-sm text-slate-400 mb-4">+ 9 fler klausuler analyserade, förhandlingstips, viktiga datum och checklista</p>
              <Link href="/login" className="btn-primary">Analysera ditt avtal gratis</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hur det fungerar */}
      <section id="how-it-works" className="max-w-5xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Tre enkla steg</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { icon: '📋', title: 'Klistra in avtalet', desc: 'Kopiera texten från ditt PDF-avtal och klistra in den i vår editor.' },
            { icon: '🤖', title: 'AI analyserar', desc: 'Varje klausul granskas, risker flaggas och ovanliga villkor identifieras.' },
            { icon: '✅', title: 'Förstå och förhandla', desc: 'Du får klara förklaringar, worst-case i kronor och konkreta förhandlingstips.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">{icon}</div>
              <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Säkerhet & förtroende */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Dina dokument är säkra</h2>
          <p className="text-slate-500 mb-10">Juridiska dokument är känsliga. Så här hanterar vi dem.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {[
              { icon: '🔒', title: 'Krypterad överföring', desc: 'All data skickas krypterat via HTTPS. Ingen kan läsa din text under transporten.' },
              { icon: '🚫', title: 'Ingen människa läser ditt avtal', desc: 'Texten analyseras automatiskt av AI och hanteras aldrig manuellt av personal.' },
              { icon: '🇸🇪', title: 'GDPR-anpassat', desc: 'Vi följer EU:s dataskyddsförordning. Du har rätt att radera dina data när som helst.' },
              { icon: '⚠️', title: 'Inte juridisk rådgivning', desc: 'Kolla Kontraktet ersätter inte en jurist. Vid komplexa avtal rekommenderar vi alltid att du konsulterar en expert.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-5 flex gap-4">
                <span className="text-2xl shrink-0">{icon}</span>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Avtalstyper */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Fungerar för alla typer av avtal</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            'Hyreskontrakt', 'Anställningsavtal', 'Köpeavtal',
            'Konsultavtal', 'Samboavtal', 'Leverantörsavtal',
            'Sekretessavtal (NDA)', 'Franchiseavtal', 'Bolånehandlingar',
          ].map(type => (
            <div key={type} className="bg-slate-50 rounded-xl p-3 text-center text-sm text-slate-700 font-medium border border-slate-100">
              {type}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-700 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Vad döljer sig i ditt avtal?</h2>
          <p className="text-brand-200 mb-8">
            Testa gratis – din första analys kostar inget och tar under en minut.
            Inget kort krävs.
          </p>
          <Link href="/login" className="bg-white text-brand-700 font-semibold py-3 px-8 rounded-xl hover:bg-brand-50 transition-colors inline-block">
            Prova gratis nu
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <span>© 2025 Kolla Kontraktet</span>
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
