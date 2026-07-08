import Link from 'next/link'

export const metadata = {
  title: 'Användarvillkor – Kolla Kontraktet',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-brand-700 text-lg">Kolla Kontraktet</Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">← Till startsidan</Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Användarvillkor</h1>
        <p className="text-slate-400 text-sm mb-8">Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}</p>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">1. Om tjänsten</h2>
            <p>
              Kolla Kontraktet är ett verktyg som med hjälp av artificiell intelligens analyserar
              juridiska avtal och förklarar dem på vardaglig svenska. Genom att använda tjänsten godkänner
              du dessa villkor.
            </p>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">2. Inte juridisk rådgivning</h2>
            <p>
              Kolla Kontraktet tillhandahåller en <strong>automatiserad, AI-genererad tolkning</strong> av
              avtal i informationssyfte. Tjänsten är <strong>inte juridisk rådgivning</strong> och ersätter
              inte en kvalificerad jurist eller advokat. Analyser kan innehålla fel eller ofullständigheter.
              Fatta aldrig viktiga beslut enbart baserat på analysen – rådgör med en jurist vid osäkerhet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">3. Ansvarsbegränsning</h2>
            <p>
              Tjänsten tillhandahålls ”i befintligt skick”. Vi ansvarar inte för beslut du fattar eller
              skador som uppstår till följd av att du förlitat dig på en analys. Vårt sammanlagda ansvar är,
              i den mån lag tillåter, begränsat till det belopp du betalat för tjänsten de senaste tre
              månaderna.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">4. Konto och betalning</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Du ansvarar för att uppgifterna i ditt konto är korrekta och för aktivitet på kontot.</li>
              <li>Prenumerationer (Personlig och Företag) förnyas löpande tills du säger upp dem.</li>
              <li>Engångsanalys är en engångsbetalning utan prenumeration.</li>
              <li>Du kan säga upp din prenumeration när som helst; den gäller då ut innevarande period.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">5. Ångerrätt och återbetalning</h2>
            <p>
              Eftersom tjänsten är en digital tjänst som levereras omedelbart samtycker du till att
              leveransen påbörjas direkt. Kontakta oss på kontakt@kollakontraktet.se vid frågor om återbetalning, så
              hittar vi en rimlig lösning.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">6. Tillåten användning</h2>
            <p>
              Du får endast ladda upp avtal som du har rätt att behandla. Du får inte använda tjänsten för
              olagliga ändamål eller på ett sätt som skadar tjänsten eller andra användare.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">7. Personuppgifter</h2>
            <p>
              Hur vi behandlar dina personuppgifter beskrivs i vår{' '}
              <Link href="/privacy" className="text-brand-600 hover:underline">integritetspolicy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">8. Ändringar och tillämplig lag</h2>
            <p>
              Vi kan uppdatera dessa villkor. Väsentliga ändringar meddelas via tjänsten. Svensk lag är
              tillämplig och tvister avgörs av svensk domstol.
            </p>
          </section>
        </div>
      </article>

      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-3xl mx-auto px-4 text-sm text-slate-400 flex gap-6">
          <Link href="/" className="hover:text-slate-600">Startsida</Link>
          <Link href="/privacy" className="hover:text-slate-600">Integritetspolicy</Link>
        </div>
      </footer>
    </div>
  )
}
