import Link from 'next/link'

export const metadata = {
  title: 'Integritetspolicy – Kolla Kontraktet',
  description: 'Så behandlar Kolla Kontraktet dina personuppgifter enligt GDPR, inklusive AI-behandling och överföring till tredjeland.',
}

const LAST_UPDATED = '8 september 2026'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-brand-700 text-lg">Kolla Kontraktet</Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">← Till startsidan</Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Integritetspolicy</h1>
        <p className="text-slate-400 text-sm mb-8">Senast uppdaterad: {LAST_UPDATED}</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <p>
              Denna integritetspolicy beskriver hur Kolla Kontraktet behandlar dina personuppgifter när du
              använder tjänsten, och vilka rättigheter du har enligt EU:s dataskyddsförordning (GDPR). Vi
              värnar om din integritet och behandlar aldrig fler uppgifter än vad som behövs för att leverera
              tjänsten på ett säkert sätt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">1. Personuppgiftsansvarig</h2>
            <p>
              Personuppgiftsansvarig för behandlingen är Philip Eriksson, som tillhandahåller tjänsten Kolla
              Kontraktet. Vid frågor om denna policy eller om hur vi behandlar dina uppgifter når du oss på{' '}
              <a href="mailto:kontakt@kollakontraktet.se" className="text-brand-600 hover:underline">kontakt@kollakontraktet.se</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">2. Vilka uppgifter vi behandlar</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Kontouppgifter:</strong> din e-postadress och, om du loggar in med Google, ditt namn.</li>
              <li><strong>Avtalstext och analyser:</strong> den text eller de PDF-filer du laddar upp för analys samt de analysresultat som genereras.</li>
              <li><strong>Betalningsuppgifter:</strong> transaktionsinformation som hanteras av Stripe. Vi lagrar aldrig dina fullständiga kortuppgifter.</li>
              <li><strong>Användnings- och teknisk data:</strong> t.ex. antal analyser, tidpunkter och begränsad loggning som behövs för drift, säkerhet och missbruksskydd.</li>
            </ul>
          </section>

          <section className="bg-brand-50 border border-brand-100 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">3. Behandling med AI (viktigt)</h2>
            <p>
              För att skapa analysen skickas den avtalstext du laddar upp till vår AI-leverantör{' '}
              <strong>Anthropic PBC (USA)</strong>, som driver språkmodellen Claude. Texten behandlas där
              enbart för att generera din analys. Enligt Anthropics villkor för deras API används inte
              inskickat innehåll för att träna deras modeller.
            </p>
            <p className="mt-2">
              Ett avtal kan innehålla personuppgifter om dig eller om andra personer (t.ex. namn, adresser
              eller personnummer). Ladda därför inte upp fler personuppgifter än nödvändigt, och undvik
              känsliga uppgifter som inte behövs för analysen. Du ansvarar för att du har rätt att behandla
              det innehåll du laddar upp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">4. Ändamål och rättslig grund</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50 text-slate-600 text-left">
                  <tr>
                    <th className="p-3 font-semibold">Ändamål</th>
                    <th className="p-3 font-semibold">Rättslig grund</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3">Leverera tjänsten: analysera avtal, spara historik, hantera konto och prenumeration</td>
                    <td className="p-3">Fullgörande av avtal (art. 6.1 b)</td>
                  </tr>
                  <tr>
                    <td className="p-3">Hantera betalningar och bokföring</td>
                    <td className="p-3">Rättslig förpliktelse (art. 6.1 c)</td>
                  </tr>
                  <tr>
                    <td className="p-3">Säkerhet, missbruksskydd (t.ex. spärrar) och att förbättra tjänsten</td>
                    <td className="p-3">Berättigat intresse (art. 6.1 f)</td>
                  </tr>
                  <tr>
                    <td className="p-3">Utskick av e-post som du själv begär (t.ex. maila en analys)</td>
                    <td className="p-3">Fullgörande av avtal / samtycke (art. 6.1 b/a)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">5. Personuppgiftsbiträden och mottagare</h2>
            <p>För att leverera tjänsten anlitar vi följande leverantörer, som behandlar uppgifter för vår räkning:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Supabase</strong> – databas och inloggning (lagring av konto, analyser och avtalstext).</li>
              <li><strong>Anthropic (USA)</strong> – AI-behandling av den avtalstext du skickar in, för att generera analysen.</li>
              <li><strong>Vercel (USA)</strong> – drift och hosting av webbtjänsten.</li>
              <li><strong>Stripe</strong> – hantering av betalningar.</li>
              <li><strong>Resend (USA)</strong> – utskick av e-post när du begär det.</li>
              <li><strong>Google</strong> – endast om du väljer att logga in med Google (autentisering).</li>
            </ul>
            <p className="mt-2">
              Vi säljer aldrig dina personuppgifter och delar dem inte för marknadsföringsändamål.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">6. Överföring till tredjeland</h2>
            <p>
              Vissa av våra leverantörer (bland annat Anthropic, Vercel, Stripe och Resend) behandlar
              uppgifter i USA eller i andra länder utanför EU/EES. När uppgifter överförs dit sker det med
              stöd av lämpliga skyddsåtgärder enligt GDPR, i första hand EU-kommissionens
              standardavtalsklausuler (SCC) och, i förekommande fall, certifiering under EU–US Data Privacy
              Framework. Du kan kontakta oss för mer information om skyddsåtgärderna.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">7. Lagring och gallring</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Avtalstext:</strong> den uppladdade originaltexten raderas automatiskt efter 90 dagar. Själva analysresultatet kan finnas kvar i din historik.</li>
              <li><strong>Analyser och kontouppgifter:</strong> sparas så länge du har ett aktivt konto. Du kan när som helst radera enskilda analyser eller begära att hela ditt konto raderas.</li>
              <li><strong>Bokföringsunderlag:</strong> uppgifter som krävs enligt bokföringslagen sparas i upp till sju (7) år.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">8. Dina rättigheter</h2>
            <p>Enligt GDPR har du rätt att:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>få information om och tillgång till de uppgifter vi behandlar om dig,</li>
              <li>få felaktiga uppgifter rättade,</li>
              <li>få dina uppgifter raderade (”rätten att bli bortglömd”),</li>
              <li>begära begränsning av behandlingen,</li>
              <li>invända mot behandling som sker med stöd av berättigat intresse,</li>
              <li>få ut och flytta dina uppgifter (dataportabilitet),</li>
              <li>återkalla ett lämnat samtycke, utan att det påverkar behandling som redan skett.</li>
            </ul>
            <p className="mt-2">
              Kontakta oss på{' '}
              <a href="mailto:kontakt@kollakontraktet.se" className="text-brand-600 hover:underline">kontakt@kollakontraktet.se</a>{' '}
              för att utöva dina rättigheter. Om du anser att vi behandlar dina uppgifter felaktigt har du
              rätt att lämna klagomål till <strong>Integritetsskyddsmyndigheten (IMY)</strong>,{' '}
              <a href="https://www.imy.se" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">www.imy.se</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">9. Säkerhet</h2>
            <p>
              Vi vidtar lämpliga tekniska och organisatoriska åtgärder för att skydda dina uppgifter, bland
              annat krypterad överföring (HTTPS), åtkomstkontroll på databasnivå och principen om att endast
              behandla nödvändiga uppgifter. Ingen överföring över internet kan dock garanteras vara helt
              säker.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">10. Cookies</h2>
            <p>
              Vi använder nödvändiga cookies för att hålla dig inloggad och för att tjänsten ska fungera.
              För enkel, anonymiserad besöksstatistik använder vi ett integritetsvänligt verktyg som inte
              sätter spårningscookies. Vi använder inga cookies för marknadsföring.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">11. Ändringar av policyn</h2>
            <p>
              Vi kan uppdatera denna policy. Vid väsentliga ändringar informerar vi dig via tjänsten eller
              e-post. Den senaste versionen finns alltid tillgänglig på den här sidan.
            </p>
          </section>
        </div>
      </article>

      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-3xl mx-auto px-4 text-sm text-slate-400 flex gap-6">
          <Link href="/" className="hover:text-slate-600">Startsida</Link>
          <Link href="/terms" className="hover:text-slate-600">Användarvillkor</Link>
        </div>
      </footer>
    </div>
  )
}
