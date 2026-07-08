import Link from 'next/link'

export const metadata = {
  title: 'Integritetspolicy – Kolla Kontraktet',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-brand-700 text-lg">Kolla Kontraktet</Link>
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900">← Till startsidan</Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-12 prose-slate">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Integritetspolicy</h1>
        <p className="text-slate-400 text-sm mb-8">Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}</p>

        <div className="space-y-6 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">1. Personuppgiftsansvarig</h2>
            <p>
              Kolla Kontraktet (”vi”, ”oss”) drivs som en enskild tjänst av Philip Eriksson
              (privatperson). Vid frågor om hur vi behandlar dina personuppgifter, kontakta oss på{' '}
              <a href="mailto:kontakt@kollakontraktet.se" className="text-brand-600 hover:underline">kontakt@kollakontraktet.se</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">2. Vilka uppgifter vi samlar in</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Kontouppgifter:</strong> din e-postadress och (om du loggar in med Google) ditt namn.</li>
              <li><strong>Avtalstext:</strong> den text eller de PDF-filer du laddar upp för analys.</li>
              <li><strong>Betalningsuppgifter:</strong> hanteras av vår betalningsleverantör Stripe. Vi lagrar aldrig dina kortuppgifter.</li>
              <li><strong>Användningsdata:</strong> t.ex. antal analyser och tidpunkter, för att kunna leverera tjänsten.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">3. Hur vi använder uppgifterna</h2>
            <p>
              Vi behandlar dina uppgifter för att leverera tjänsten: analysera dina avtal med hjälp av AI,
              spara din analyshistorik, hantera ditt konto och din prenumeration samt ge support. Den
              rättsliga grunden är fullgörande av avtal med dig (art. 6.1 b GDPR).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">4. Tredjepartstjänster</h2>
            <p>För att leverera tjänsten delar vi vissa uppgifter med:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Supabase</strong> – databas och autentisering (lagring av konto, analyser).</li>
              <li><strong>Anthropic</strong> – den avtalstext du skickar in bearbetas av Anthropics AI-modell för att skapa analysen.</li>
              <li><strong>Stripe</strong> – betalningshantering.</li>
              <li><strong>Resend</strong> – utskick av e-post (om du väljer att maila en analys).</li>
              <li><strong>Vercel</strong> – drift och hosting.</li>
            </ul>
            <p className="mt-2">
              Vi säljer aldrig dina uppgifter. Leverantörer utanför EU/EES behandlar uppgifter under
              lämpliga skyddsåtgärder (t.ex. standardavtalsklausuler).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">5. Lagring och gallring</h2>
            <p>
              Vi sparar din avtalstext och analyshistorik så länge du har ett konto hos oss. Du kan när som
              helst radera enskilda analyser eller be oss radera hela ditt konto, varpå tillhörande
              uppgifter tas bort. Bokföringsunderlag för betalningar sparas så länge lag kräver.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">6. Dina rättigheter</h2>
            <p>Enligt GDPR har du rätt att:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>få tillgång till de uppgifter vi har om dig,</li>
              <li>få felaktiga uppgifter rättade,</li>
              <li>få dina uppgifter raderade,</li>
              <li>begära ut dina uppgifter (dataportabilitet),</li>
              <li>invända mot eller begränsa behandlingen.</li>
            </ul>
            <p className="mt-2">
              Kontakta oss på kontakt@kollakontraktet.se för att utöva dina rättigheter. Du har även rätt att lämna
              klagomål till Integritetsskyddsmyndigheten (IMY).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">7. Cookies</h2>
            <p>
              Vi använder nödvändiga cookies för att hålla dig inloggad. Dessa krävs för att tjänsten ska
              fungera och lagrar ingen marknadsföringsinformation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">8. Ändringar</h2>
            <p>
              Vi kan uppdatera denna policy. Vid väsentliga ändringar informerar vi dig via tjänsten eller
              e-post.
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
