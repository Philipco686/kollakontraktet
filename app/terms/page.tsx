import Link from 'next/link'

export const metadata = {
  title: 'Användarvillkor – Kolla Kontraktet',
  description: 'Villkor för användning av Kolla Kontraktet, inklusive ångerrätt, betalning och ansvarsbegränsning.',
}

const LAST_UPDATED = '8 september 2026'

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
        <p className="text-slate-400 text-sm mb-8">Senast uppdaterad: {LAST_UPDATED}</p>

        <div className="space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">1. Inledning och avtalsparter</h2>
            <p>
              Dessa användarvillkor (”villkoren”) gäller mellan dig som användare (”du”, ”kunden”) och
              Philip Eriksson, som i egenskap av näringsidkare tillhandahåller tjänsten Kolla Kontraktet
              (”vi”, ”oss”, ”tjänsten”). Du når oss på{' '}
              <a href="mailto:kontakt@kollakontraktet.se" className="text-brand-600 hover:underline">kontakt@kollakontraktet.se</a>.
            </p>
            <p className="mt-2">
              Genom att skapa ett konto, genomföra ett köp eller på annat sätt använda tjänsten godkänner du
              villkoren. Accepterar du inte villkoren ska du inte använda tjänsten.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">2. Beskrivning av tjänsten</h2>
            <p>
              Kolla Kontraktet är ett digitalt verktyg som med hjälp av artificiell intelligens (AI)
              analyserar juridiska avtal och sammanfattar samt förklarar innehållet på vardaglig svenska. Du
              tillhandahåller avtalstext, och tjänsten genererar en automatiserad analys med bland annat
              sammanfattning, riskbedömning, genomgång av klausuler och förhandlingstips.
            </p>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">3. Tjänsten utgör inte juridisk rådgivning</h2>
            <p>
              Tjänsten tillhandahåller en <strong>automatiserad, AI-genererad tolkning</strong> av avtal
              enbart i informationssyfte. Tjänsten utgör <strong>inte juridisk rådgivning</strong> och
              ersätter inte konsultation med en kvalificerad jurist eller advokat. Analyser kan innehålla fel,
              förenklingar eller ofullständigheter, och något klientförhållande uppstår inte genom att du
              använder tjänsten. Du bör inte fatta rättsliga eller ekonomiska beslut enbart utifrån en analys,
              utan rådgöra med en jurist vid osäkerhet. Du ansvarar själv för hur du använder analysen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">4. Konto</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>För att använda tjänsten behöver du registrera ett konto med en giltig e-postadress.</li>
              <li>Du ansvarar för att uppgifterna på kontot är korrekta och för all aktivitet som sker via kontot.</li>
              <li>Du ansvarar för att skydda dina inloggningsuppgifter och ska omgående meddela oss vid misstanke om obehörig åtkomst.</li>
              <li>Är du under 18 år får du endast ingå avtal och genomföra köp med målsmans samtycke.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">5. Priser och betalning</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Gällande priser anges på tjänstens prissida. Priser anges i svenska kronor och inklusive eventuell tillämplig moms.</li>
              <li>Betalning sker via vår betalningsleverantör Stripe. Vi lagrar aldrig dina fullständiga kortuppgifter.</li>
              <li><strong>Engångsanalys</strong> är en enskild betalning utan löpande prenumeration.</li>
              <li><strong>Prenumerationer</strong> (Personlig och Företag) löper tills vidare och förnyas automatiskt vid varje periodslut till dess att de sägs upp.</li>
              <li>Vi kan komma att ändra priser. Ändringar som påverkar en befintlig prenumeration meddelas i förväg och gäller först från nästa förnyelseperiod. Du kan alltid säga upp innan en höjning träder i kraft.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">6. Uppsägning av prenumeration</h2>
            <p>
              Du kan när som helst säga upp en löpande prenumeration via kundportalen (nås från din
              översiktssida) eller genom att kontakta oss. Uppsägningen träder i kraft vid slutet av den redan
              betalda perioden, och du behåller åtkomsten fram till dess. Redan betalda avgifter återbetalas
              inte vid uppsägning, med förbehåll för tvingande konsumenträttsliga regler.
            </p>
          </section>

          <section className="border border-slate-200 rounded-xl p-5">
            <h2 className="text-xl font-semibold text-slate-900 mb-2">7. Ångerrätt</h2>
            <p>
              Som konsument har du enligt lagen (2005:59) om distansavtal och avtal utanför affärslokaler
              som utgångspunkt rätt att ångra ett köp inom <strong>14 dagar</strong> från det att avtalet
              ingicks, utan att ange något skäl.
            </p>
            <p className="mt-2">
              Kolla Kontraktet är en digital tjänst som levereras omedelbart. Innan köpet genomförs ombeds du
              därför att <strong>uttryckligen begära att leveransen påbörjas direkt</strong> och att
              <strong> samtycka till att din ångerrätt upphör</strong> när tjänsten har fullgjorts. När du
              lämnat detta samtycke och tjänsten därefter utförts i sin helhet – det vill säga när analysen
              har genererats och gjorts tillgänglig för dig – har du inte längre någon ångerrätt för den
              tjänsten.
            </p>
            <p className="mt-2">
              Ångrar du dig efter att samtycket lämnats men innan tjänsten hunnit utföras, har du rätt att
              ångra köpet. För löpande prenumerationer gäller ångerrätten själva ingåendet av
              prenumerationsavtalet; har du under perioden redan tagit del av utförda analyser kan vi göra
              avdrag i proportion till vad som levererats. Kontakta oss på{' '}
              <a href="mailto:kontakt@kollakontraktet.se" className="text-brand-600 hover:underline">kontakt@kollakontraktet.se</a>{' '}
              för att utöva ångerrätten eller vid frågor om återbetalning.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">8. Reklamation</h2>
            <p>
              Om tjänsten är felaktig har du rätt att reklamera enligt gällande konsumentlagstiftning.
              Reklamation görs till{' '}
              <a href="mailto:kontakt@kollakontraktet.se" className="text-brand-600 hover:underline">kontakt@kollakontraktet.se</a>{' '}
              inom skälig tid efter att du upptäckt eller borde ha upptäckt felet. Vi strävar efter att lösa
              alla ärenden skyndsamt och rättvist.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">9. Tillåten användning</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>Du får endast ladda upp avtal och texter som du har rätt att behandla och dela med oss.</li>
              <li>Du får inte använda tjänsten för olagliga ändamål eller för att kränka andras rättigheter.</li>
              <li>Du får inte försöka kringgå säkerhets- eller användningsspärrar, störa driften, eller på automatiserad väg hämta ut information ur tjänsten i strid med dessa villkor.</li>
              <li>Obegränsade analyser i Företag-paketet avser normal, personlig affärsanvändning inom teamet och får inte vidareförsäljas eller missbrukas.</li>
            </ul>
            <p className="mt-2">
              Vid väsentligt eller upprepat brott mot villkoren har vi rätt att stänga av eller avsluta ditt
              konto.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">10. Immateriella rättigheter</h2>
            <p>
              Vi innehar samtliga rättigheter till tjänsten, dess programvara, design och innehåll. Du behåller
              rättigheterna till den avtalstext du laddar upp. Du får använda de analyser du genererar fritt
              för dina egna, privata eller interna affärsmässiga ändamål.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">11. Ansvarsbegränsning</h2>
            <p>
              Tjänsten tillhandahålls ”i befintligt skick”. I den utsträckning tvingande lag tillåter ansvarar
              vi inte för indirekta skador, utebliven vinst eller följdskador, och inte heller för beslut du
              fattar eller skador som uppstår till följd av att du förlitat dig på en analys. Vårt sammanlagda
              ansvar är begränsat till det belopp du betalat till oss under de tre (3) månader som föregick den
              omständighet som gav upphov till kravet.
            </p>
            <p className="mt-2">
              Inget i dessa villkor inskränker de rättigheter du har enligt tvingande konsumentskyddslagstiftning.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">12. Behandling av personuppgifter</h2>
            <p>
              Hur vi behandlar dina personuppgifter, inklusive att avtalstext bearbetas av en extern
              AI-leverantör, beskrivs i vår{' '}
              <Link href="/privacy" className="text-brand-600 hover:underline">integritetspolicy</Link>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">13. Ändringar av villkoren</h2>
            <p>
              Vi kan komma att uppdatera dessa villkor. Väsentliga ändringar meddelas via tjänsten eller
              e-post i skälig tid innan de träder i kraft. Fortsatt användning efter att en ändring trätt i
              kraft innebär att du accepterar de uppdaterade villkoren.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">14. Tillämplig lag och tvistlösning</h2>
            <p>
              Svensk lag är tillämplig på dessa villkor. Vid en tvist som vi inte kan lösa tillsammans kan du
              som konsument vända dig till{' '}
              <strong>Allmänna reklamationsnämnden (ARN)</strong>, Box 174, 101 23 Stockholm,{' '}
              <a href="https://www.arn.se" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">www.arn.se</a>,
              vars rekommendationer vi följer. Du kan även använda EU-kommissionens plattform för
              tvistlösning online:{' '}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">ec.europa.eu/consumers/odr</a>.
              Tvist kan också prövas av svensk allmän domstol.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">15. Kontakt</h2>
            <p>
              Frågor om villkoren eller tjänsten besvaras på{' '}
              <a href="mailto:kontakt@kollakontraktet.se" className="text-brand-600 hover:underline">kontakt@kollakontraktet.se</a>.
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
