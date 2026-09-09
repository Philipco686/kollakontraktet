export interface ContractGuide {
  slug: string
  name: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  updated?: string // synligt "senast uppdaterad"-datum (ISO), sätts när guiden fått full behandling
  sections?: { heading: string; body: string[] }[] // långform-innehåll
  lawRefs?: { law: string; note: string }[] // riktiga lagcitat (E-E-A-T)
  traps: { title: string; body: string }[]
  checklist: string[]
  faq?: { q: string; a: string }[]
}

export const contractGuides: ContractGuide[] = [
  {
    slug: 'hyreskontrakt',
    name: 'Hyreskontrakt',
    metaTitle: 'Hyreskontrakt: fällor och vad du bör kolla | Kolla Kontraktet',
    metaDescription:
      'Vad ska man kolla i ett hyreskontrakt? Vanliga fällor kring bindningstid, indexhöjning, reparationer och dolda kostnader – förklarat på vanlig svenska.',
    h1: 'Hyreskontrakt: fällorna att känna till innan du skriver under',
    intro:
      'Ett hyreskontrakt ser standardiserat ut, men detaljerna avgör vad det kostar dig. Här är de vanligaste fällorna – och hur du kan analysera ditt eget kontrakt på minuter.',
    traps: [
      { title: 'Bindningstid och uppsägning', body: 'Bunden hyrestid kan låsa dig i månader efter att du vill flytta. Kolla uppsägningstiden och om avtalet förlängs automatiskt.' },
      { title: 'Indexhöjning av hyran', body: 'Klausuler som höjer hyran med KPI – ibland med ett golv på flera procent – gör att hyran stiger varje år oavsett vad du tycker.' },
      { title: 'Vem står för skador och reparationer?', body: 'Vissa kontrakt lägger allt underhåll på hyresgästen. Kolla vad du ansvarar för vid avflyttning och om "normalt slitage" räknas.' },
      { title: 'Dolda kostnader', body: 'Värme, vatten, drift och andra avgifter utöver hyran kan lägga tusenlappar per år. Se till att veta vad som ingår.' },
    ],
    checklist: [
      'Hur lång är bindnings- och uppsägningstiden?',
      'Kan hyran höjas – och med hur mycket per år?',
      'Vad ansvarar jag för vid skador och avflyttning?',
      'Vilka kostnader tillkommer utöver hyran?',
      'Förlängs avtalet automatiskt om jag inte säger upp det?',
    ],
    faq: [
      { q: 'Vad är viktigast att kolla i ett hyreskontrakt?', a: 'Bindningstid, hur hyran kan höjas, vem som ansvarar för skador, och vilka kostnader som tillkommer utöver hyran.' },
      { q: 'Kan hyresvärden höja hyran hur som helst?', a: 'Nej, men indexklausuler kan tillåta årliga höjningar. Läs klausulen om hyresjustering noga – ibland finns ett golv oavsett index.' },
    ],
  },
  {
    slug: 'anstallningsavtal',
    name: 'Anställningsavtal',
    metaTitle: 'Anställningsavtal: vad du bör granska innan du skriver på | Kolla Kontraktet',
    metaDescription:
      'Provanställning, konkurrensklausul, övertid och vem som äger det du skapar. De vanligaste fällorna i anställningsavtal – förklarat enkelt.',
    h1: 'Anställningsavtal: det här bör du granska innan du skriver på',
    intro:
      'Ett anställningsavtal styr mer än lönen. Här är villkoren som ofta smyger sig in och kan kosta dig framåt – och hur du snabbt kan analysera ditt eget.',
    traps: [
      { title: 'Provanställning', body: 'En provanställning kan sägas upp utan skäl. Kolla längden och vad som händer när den övergår i tillsvidare.' },
      { title: 'Konkurrensklausul', body: 'Förbud mot att jobba hos konkurrenter efter att du slutat kan begränsa din karriär – ibland med vite på flera månadslöner.' },
      { title: 'Övertid och ersättning', body: 'Formuleringar som "övertid ingår i lönen" betyder att du kan jobba extra utan extra betalt. Kolla vad som faktiskt gäller.' },
      { title: 'IP-rättigheter – vem äger det du skapar?', body: 'Många avtal ger arbetsgivaren allt du skapar, ibland även på fritiden. Viktigt om du kodar, skriver eller designar.' },
      { title: 'Bonus och villkor', body: 'Bonusar är ofta villkorade och kan strykas. Läs exakt vad som krävs för att den ska betalas ut.' },
    ],
    checklist: [
      'Hur lång är provanställningen och vad händer efter?',
      'Finns en konkurrensklausul – och vad kostar det att bryta mot den?',
      'Får jag betalt för övertid?',
      'Vem äger det jag skapar i tjänsten?',
      'Vilka villkor gäller för bonus?',
    ],
    faq: [
      { q: 'Är en konkurrensklausul alltid giltig?', a: 'Inte alltid – oskäliga konkurrensklausuler kan jämkas. Men de kan ändå skapa problem, så det är värt att förstå och förhandla dem.' },
    ],
  },
  {
    slug: 'konsultavtal',
    name: 'Konsultavtal',
    metaTitle: 'Konsultavtal: komplett guide till ansvar, betalning och ägande | Kolla Kontraktet',
    metaDescription:
      'Uppsägningstid, ansvarsbegränsning, betalningstid, immaterialrätt och F-skatt. En komplett guide till konsultavtal på vanlig svenska – med checklista och vad lagen säger.',
    h1: 'Konsultavtal: den kompletta guiden innan du signerar',
    updated: '2026-09-09',
    intro:
      'Som konsult sitter du ofta i en svagare förhandlingsposition än den stora uppdragsgivaren – och det är i finstilta detaljer som ansvar, betalning och ägande avgörs. Den här guiden går igenom allt du bör kolla i ett konsultavtal, punkt för punkt, med konkreta exempel, vad lagen faktiskt säger, och en checklista du kan skriva ut.',
    sections: [
      {
        heading: 'Vad är ett konsultavtal – och varför spelar orden roll?',
        body: [
          'Ett konsultavtal är ett uppdragsavtal mellan två näringsidkare: du (uppdragstagaren) utför en tjänst åt en uppdragsgivare mot ersättning. Till skillnad från ett anställningsavtal finns ingen särskild skyddslagstiftning som LAS – i stället gäller avtalsfrihet. Det betyder att det som står i avtalet är det som gäller, och att du själv måste bevaka dina intressen.',
          'Eftersom det saknas en särskild "konsultlag" fylls luckor ut av allmänna regler i avtalslagen (1915:218) och, för många frågor, av köplagen (1990:931) som tillämpas analogt mellan företag. Men huvudregeln är enkel: har ni avtalat om något, gäller avtalet före lagens utfyllnad. Därför är varje klausul värd att läsa.',
          'Kontrollera först grunderna: att rätt bolag och organisationsnummer står som parter, att uppdraget är tydligt avgränsat, när det börjar och slutar, och vad som händer om omfattningen ändras under resans gång.',
        ],
      },
      {
        heading: 'Ersättning och betalningsvillkor',
        body: [
          'Bestäm om du får betalt löpande (per timme) eller till fast pris. Vid fast pris bär du risken om uppdraget tar längre tid än beräknat – specificera då exakt vad som ingår, och hur ändrings- och tilläggsarbete ("ÄTA") prissätts.',
          'Betalningstiden är en klassisk likviditetsfälla. Stora uppdragsgivare skjuter gärna in 60–90 dagars betalningstid. Enligt räntelagen (1975:635) är utgångspunkten 30 dagar om inget annat avtalats, och du har rätt till dröjsmålsränta (referensräntan plus åtta procentenheter) om betalning uteblir. Kortare betalningstid är nästan alltid förhandlingsbart – be om 15–30 dagar.',
          'Reglera också faktureringen: hur ofta du fakturerar, om utlägg och resor ersätts, om du har rätt till a conto-betalning för långa uppdrag, och att priser anges exklusive moms. Ett förskott eller delbetalningar för ett stort uppdrag skyddar dig om samarbetet skulle brytas.',
        ],
      },
      {
        heading: 'Ansvar och ansvarsbegränsning',
        body: [
          'Det här är den enskilt viktigaste klausulen för din ekonomiska trygghet. Utan en ansvarsbegränsning kan du i teorin bli skadeståndsskyldig för hela den skada ett fel orsakar – belopp som vida kan överstiga vad du tjänat på uppdraget.',
          'Standard i branschen är att ansvaret begränsas till ett belopp, ofta motsvarande arvodet för uppdraget (eller de senaste tolv månadernas arvode). Se också till att indirekta skador – till exempel uppdragsgivarens uteblivna vinst – uttryckligen undantas, och att det finns en tidsgräns för när krav måste framställas.',
          'Kolla vad avtalet kräver i fråga om försäkring. Om du åläggs att hålla en ansvarsförsäkring, kontrollera att försäkringsbeloppet faktiskt täcker det avtalade ansvarstaket.',
        ],
      },
      {
        heading: 'Vem äger det du skapar? (immaterialrätt)',
        body: [
          'Detta är den vanligaste och dyraste tvistefrågan för konsulter. Enligt upphovsrättslagen (1960:729) uppstår upphovsrätten hos den fysiska person som skapar ett verk – alltså hos dig. Till skillnad från en anställning övergår rättigheterna inte automatiskt till uppdragsgivaren bara för att de betalar; det som gäller är det ni avtalat.',
          'Skilj på att ge uppdragsgivaren en nyttjanderätt (licens) att använda resultatet, och att överlåta hela rätten. En full överlåtelse betyder att du inte längre får återanvända lösningen – inte ens komponenter, metoder eller kod du byggt upp genom åren. Många avtal formulerar detta brett ("allt material som tas fram") och sveper då oavsiktligt in även ditt tidigare, egna material.',
          'Skriv in ett undantag för din bakgrundskunskap – generella metoder, mallar, kodbibliotek och verktyg du hade sedan innan – så att du behåller rätten att använda dem i framtida uppdrag. Reglera också rätten att få referera till uppdraget i din portfölj.',
        ],
      },
      {
        heading: 'Uppsägning, bindningstid och hävning',
        body: [
          'Kontrollera att uppsägningstiden är rimlig åt båda håll. En obalans där uppdragsgivaren kan avsluta med några dagars varsel medan du binds i månader är vanlig – och orimlig. Reglera vad som gäller för redan utfört och beställt arbete vid uppsägning, så att du får betalt för det du gjort.',
          'Skilj på uppsägning (att avsluta enligt avtalets villkor) och hävning (att bryta avtalet i förtid på grund av avtalsbrott). Se att hävning kräver ett väsentligt avtalsbrott, och gärna en möjlighet att rätta felet inom skälig tid innan motparten får häva.',
        ],
      },
      {
        heading: 'Sekretess och konkurrens',
        body: [
          'Sekretessklausuler är rimliga, men kolla omfattning och längd. "Sekretess utan tidsbegränsning" binder dig i praktiken för alltid – 2–5 år efter uppdragets slut är vanligt och mer rimligt. Åtagandet bör dessutom vara ömsesidigt.',
          'En konkurrensklausul som hindrar dig från att ta liknande uppdrag kan begränsa din försörjning. Oskäligt långtgående klausuler kan jämkas enligt 36 § avtalslagen, men det är bättre att förhandla ned dem från början än att lita på en framtida domstolsprövning. Kontrollera geografisk räckvidd, tidslängd och vad som faktiskt förbjuds.',
        ],
      },
      {
        heading: 'Konsult eller anställd? F-skatt och gränsdragning',
        body: [
          'Som konsult ansvarar du själv för dina skatter och sociala avgifter, vilket förutsätter godkännande för F-skatt. Se till att avtalet anger att du är en självständig uppdragstagare med F-skatt och att ersättningen är exklusive sociala avgifter.',
          'Var uppmärksam på att om uppdraget i praktiken ser ut som en anställning – du jobbar heltid hos en enda uppdragsgivare, under deras arbetsledning, under lång tid – kan Skatteverket eller en domstol omvärdera relationen. Det kan få skatte- och avtalsrättsliga konsekvenser för båda parter. Ett tydligt avgränsat uppdrag med eget ansvar minskar den risken.',
        ],
      },
    ],
    lawRefs: [
      { law: 'Avtalslagen (1915:218)', note: 'Grunden för att avtalet gäller – och 36 § som låter domstol jämka oskäliga villkor, t.ex. orimliga konkurrens- eller viteklausuler.' },
      { law: 'Upphovsrättslagen (1960:729)', note: 'Upphovsrätten uppstår hos dig som skapar verket och övergår inte automatiskt till uppdragsgivaren utan avtal.' },
      { law: 'Räntelagen (1975:635)', note: 'Betalning inom 30 dagar om inget annat avtalats, och rätt till dröjsmålsränta (referensränta + 8 procentenheter) vid sen betalning.' },
      { law: 'Köplagen (1990:931)', note: 'Tillämpas analogt mellan företag där avtalet är tyst – men era egna villkor gäller före lagens utfyllnad.' },
    ],
    traps: [
      { title: 'Obegränsat ansvar', body: 'Utan ett tak på ditt skadeståndsansvar kan ett enda misstag kosta dig långt mer än hela arvodet. Kräv att ansvaret beloppsbegränsas (ofta till arvodet) och att indirekta skador undantas.' },
      { title: 'Bred överlåtelse av immateriella rättigheter', body: 'Formuleringar som "allt material som tas fram tillhör uppdragsgivaren" kan svepa in även din tidigare kod, dina mallar och metoder. Undanta din bakgrundskunskap uttryckligen.' },
      { title: 'Lång betalningstid', body: 'Betalningsvillkor på 60–90 dagar pressar din likviditet. Enligt räntelagen är 30 dagar utgångspunkten – förhandla ned och skriv in dröjsmålsränta.' },
      { title: 'Obalanserad uppsägning', body: 'Att uppdragsgivaren kan avsluta med kort varsel medan du binds i månader är en vanlig snedfördelning. Kräv symmetriska villkor och betalt för utfört arbete.' },
      { title: 'Sekretess utan tidsgräns', body: 'Sekretess "utan tidsbegränsning" binder dig i praktiken för evigt. Sätt en rimlig gräns (2–5 år) och gör åtagandet ömsesidigt.' },
      { title: 'Dold anställning', body: 'Ett uppdrag som i praktiken fungerar som en anställning kan omvärderas av Skatteverket. Håll uppdraget avgränsat och ditt oberoende tydligt.' },
    ],
    checklist: [
      'Är rätt bolag och organisationsnummer angivna som parter?',
      'Är uppdraget tydligt avgränsat – och hur prissätts tilläggsarbete?',
      'Är det löpande räkning eller fast pris, och vad ingår i priset?',
      'Hur lång är betalningstiden, och finns dröjsmålsränta vid sen betalning?',
      'Är mitt skadeståndsansvar beloppsbegränsat?',
      'Är indirekta skador (t.ex. utebliven vinst) undantagna?',
      'Ger jag en nyttjanderätt eller överlåter jag hela rätten till det jag skapar?',
      'Är min bakgrundskunskap (tidigare kod, mallar, metoder) undantagen?',
      'Är uppsägningstiden rimlig och symmetrisk för båda parter?',
      'Hur länge gäller sekretessen – och är den ömsesidig?',
      'Är en eventuell konkurrensklausul rimlig i tid och omfattning?',
      'Framgår det att jag är självständig uppdragstagare med F-skatt?',
    ],
    faq: [
      { q: 'Vem äger det jag skapar i ett konsultuppdrag?', a: 'Enligt upphovsrättslagen uppstår rätten hos dig som skapar verket. Uppdragsgivaren får bara de rättigheter ni avtalar om – därför är IP-klausulen avgörande. Skilj på att ge en nyttjanderätt och att överlåta hela rätten.' },
      { q: 'Vad är en rimlig betalningstid i ett konsultavtal?', a: 'Utgångspunkten enligt räntelagen är 30 dagar om inget annat avtalats. 15–30 dagar är rimligt; 60–90 dagar bör du förhandla ned. Se också till att dröjsmålsränta gäller vid sen betalning.' },
      { q: 'Måste jag gå med på obegränsat ansvar?', a: 'Nej – och du bör inte. Standard är att ansvaret begränsas till ett belopp, ofta motsvarande arvodet, med indirekta skador undantagna. Utan tak riskerar du belopp som vida överstiger vad du tjänat.' },
      { q: 'Kan en konkurrensklausul hindra mig från framtida uppdrag?', a: 'Ja, om den accepteras. Oskäligt långtgående klausuler kan jämkas enligt 36 § avtalslagen, men det är bättre att förhandla ned tid, geografi och omfattning från början.' },
      { q: 'Vad betyder ansvarsbegränsning i praktiken?', a: 'Att det finns ett tak för hur mycket du kan bli skyldig att betala om något går fel. Ett vanligt tak är arvodet för uppdraget. Det skyddar dig från att ett litet fel leder till ett orimligt stort skadestånd.' },
      { q: 'Hur vet jag om jag är konsult eller egentligen anställd?', a: 'Ju mer självständigt och avgränsat uppdraget är – eget ansvar, flera kunder, egna verktyg, F-skatt – desto tydligare är konsultrollen. Ett uppdrag som i praktiken fungerar som en heltidsanställning kan omvärderas av Skatteverket.' },
    ],
  },
  {
    slug: 'kopeavtal',
    name: 'Köpeavtal',
    metaTitle: 'Köpeavtal: felansvar, garantier och betalningsvillkor | Kolla Kontraktet',
    metaDescription:
      'Felansvar, dolda fel, garantier, betalningsvillkor och vite vid försening. De vanligaste fällorna i köpeavtal – förklarat enkelt.',
    h1: 'Köpeavtal: vad du bör granska innan affären',
    intro:
      'Ett köpeavtal avgör vem som står risken om något går fel. Här är de villkor som oftast ställer till det – och hur du analyserar avtalet snabbt.',
    traps: [
      { title: 'Felansvar', body: 'Vem ansvarar om varan är felaktig – och hur länge? Otydligt felansvar kan lämna dig utan rätt att reklamera.' },
      { title: 'Dolda fel', body: 'Klausuler om "befintligt skick" kan begränsa ditt skydd mot fel du inte kunde upptäcka.' },
      { title: 'Garantier', body: 'Kolla vad garantin faktiskt täcker, hur länge, och vad som krävs för att den ska gälla.' },
      { title: 'Betalningsvillkor och vite', body: 'Förskott, delbetalningar och vite vid försening kan bli dyra. Se till att villkoren är balanserade.' },
    ],
    checklist: [
      'Vem ansvarar för fel och hur länge?',
      'Hur skyddas jag mot dolda fel?',
      'Vad täcker garantin – och hur länge?',
      'Vilka betalningsvillkor gäller?',
      'Finns vite vid försenad leverans eller betalning?',
    ],
  },
  {
    slug: 'nda-sekretessavtal',
    name: 'Sekretessavtal (NDA)',
    metaTitle: 'Sekretessavtal (NDA): vad du bör kolla innan du skriver på | Kolla Kontraktet',
    metaDescription:
      'Hur länge gäller sekretessen, vad räknas som konfidentiellt och vilka böter finns? Vanliga fällor i NDA – förklarat på vanlig svenska.',
    h1: 'Sekretessavtal (NDA): det här bör du förstå innan du signerar',
    intro:
      'Ett NDA kan verka rutinmässigt men binda dig hårt. Här är de tre sakerna som avgör hur stort åtagandet faktiskt är – och hur du analyserar avtalet.',
    traps: [
      { title: 'Hur länge gäller sekretessen?', body: 'Sekretess "utan tidsgräns" binder dig i praktiken för alltid. Rimligt är ofta 2–5 år efter samarbetet.' },
      { title: 'Vad räknas som konfidentiellt?', body: 'Alltför breda definitioner kan omfatta nästan allt du hör. Kolla att det är avgränsat och tydligt.' },
      { title: 'Böter och skadestånd', body: 'Fasta viten vid brott kan bli mycket dyra. Se vad ett misstag faktiskt kan kosta dig.' },
    ],
    checklist: [
      'Hur länge gäller sekretessen efter samarbetet?',
      'Är definitionen av "konfidentiellt" rimligt avgränsad?',
      'Vilket vite eller skadestånd utgår vid brott?',
      'Är åtagandet ömsesidigt eller bara ensidigt?',
    ],
  },
  {
    slug: 'samboavtal',
    name: 'Samboavtal',
    metaTitle: 'Samboavtal: vad delas och vad händer vid separation | Kolla Kontraktet',
    metaDescription:
      'Vad delas inte, vad händer vid separation, vad gäller för bostaden och skydd vid dödsfall. Vanliga fällor i samboavtal – förklarat enkelt.',
    h1: 'Samboavtal: det här bör du ha koll på',
    intro:
      'Ett samboavtal styr ekonomin om ni går skilda vägar. Här är frågorna som ofta glöms bort – och hur du analyserar ert avtal.',
    traps: [
      { title: 'Vad delas INTE?', body: 'Samboavtal används ofta för att undanta viss egendom från delning. Kolla vad som faktiskt är undantaget.' },
      { title: 'Vad händer vid separation?', body: 'Se hur bohag och bostad fördelas om ni flyttar isär – det är där de flesta tvister uppstår.' },
      { title: 'Vad gäller för bostaden?', body: 'Vem får bo kvar och vem står för lånen? Otydlighet här kan bli dyrt.' },
      { title: 'Skydd vid dödsfall', body: 'Sambor ärver inte varandra automatiskt. Kolla om avtalet (och testamente) ger det skydd du tror.' },
    ],
    checklist: [
      'Vilken egendom är undantagen från delning?',
      'Hur fördelas bohag och bostad vid separation?',
      'Vem ansvarar för bostadslånen?',
      'Vilket skydd finns vid dödsfall?',
    ],
  },
  {
    slug: 'leverantorsavtal',
    name: 'Leverantörsavtal',
    metaTitle: 'Leverantörsavtal: prisändringar, exklusivitet och ansvar | Kolla Kontraktet',
    metaDescription:
      'Ensidiga prisändringar, minimiorder, exklusivitet och leveransansvar. Vanliga fällor i leverantörsavtal – förklarat på vanlig svenska.',
    h1: 'Leverantörsavtal: fällorna för dig som köper eller säljer',
    intro:
      'Leverantörsavtal innehåller ofta villkor som gynnar den ena parten. Här är de vanligaste – och hur du analyserar avtalet innan du binder upp dig.',
    traps: [
      { title: 'Ensidiga prisändringar', body: 'Klausuler som låter leverantören höja priset ensidigt gör din kostnad oförutsägbar. Kolla om det finns tak eller varsel.' },
      { title: 'Minimiorder', body: 'Krav på att köpa en viss volym kan binda dig även om behovet minskar.' },
      { title: 'Exklusivitet', body: 'Exklusivitetsklausuler kan hindra dig från att använda andra leverantörer – kolla omfattning och längd.' },
      { title: 'Leveransansvar', body: 'Vem bär risken vid försenad eller felaktig leverans? Otydligt ansvar kan kosta dig i slutändan.' },
    ],
    checklist: [
      'Kan priset ändras ensidigt – och med vilket varsel?',
      'Finns krav på minimiorder?',
      'Binder exklusivitet dig till en leverantör?',
      'Vem ansvarar vid försenad eller felaktig leverans?',
    ],
  },
  {
    slug: 'franchiseavtal',
    name: 'Franchiseavtal',
    metaTitle: 'Franchiseavtal: avgifter, exklusivt område och att lämna | Kolla Kontraktet',
    metaDescription:
      'Avgifter, exklusivt område, hur svårt det är att lämna och begränsningar efter avslut. Vanliga fällor i franchiseavtal – förklarat enkelt.',
    h1: 'Franchiseavtal: det här bör du förstå innan du skriver på',
    intro:
      'Ett franchiseavtal är ett långt åtagande med många villkor. Här är de som påverkar din ekonomi och frihet mest – och hur du analyserar avtalet.',
    traps: [
      { title: 'Avgifter', body: 'Ingångsavgift, löpande royalty och marknadsföringsavgifter kan summera högt. Se helheten, inte bara startkostnaden.' },
      { title: 'Exklusivt område?', body: 'Kolla om du har ett skyddat område eller om franchisegivaren kan öppna nära dig.' },
      { title: 'Hur svårt är det att lämna?', body: 'Bindningstid och avgifter vid förtida avslut kan göra det dyrt att kliva ur.' },
      { title: 'Begränsningar efter avslut', body: 'Konkurrensförbud efter avtalets slut kan hindra dig från att driva liknande verksamhet.' },
    ],
    checklist: [
      'Vilka avgifter tillkommer utöver ingångsavgiften?',
      'Har jag ett exklusivt geografiskt område?',
      'Vad kostar det att lämna i förtid?',
      'Vilka begränsningar gäller efter att avtalet upphört?',
    ],
  },
  {
    slug: 'bolanehandlingar',
    name: 'Bolånehandlingar',
    metaTitle: 'Bolånehandlingar: ränta, bindningstid och personligt ansvar | Kolla Kontraktet',
    metaDescription:
      'Ränta, bindningstid, avgifter, villkor vid sen betalning och personligt ansvar. Vanliga fällor i bolånehandlingar – förklarat på vanlig svenska.',
    h1: 'Bolånehandlingar: villkoren du bör granska',
    intro:
      'Ett bolån är ett av livets största åtaganden. Här är villkoren som avgör vad det verkligen kostar – och hur du analyserar handlingarna.',
    traps: [
      { title: 'Ränta', body: 'Kolla om räntan är bunden eller rörlig, och vad som gäller vid ändring. Små skillnader blir stora belopp över tid.' },
      { title: 'Bindningstid', body: 'Bunden ränta kan ge ränteskillnadsersättning om du löser lånet i förtid – det kan bli dyrt.' },
      { title: 'Avgifter', body: 'Uppläggnings- och aviavgifter samt andra kostnader tillkommer utöver räntan.' },
      { title: 'Villkor vid sen betalning', body: 'Se vad som händer vid missad betalning – dröjsmålsränta och avgifter kan trappas upp snabbt.' },
      { title: 'Personligt ansvar', body: 'Kolla vem som är betalningsansvarig, särskilt vid gemensamma lån eller borgen.' },
    ],
    checklist: [
      'Är räntan bunden eller rörlig?',
      'Vad kostar det att lösa lånet i förtid?',
      'Vilka avgifter tillkommer utöver räntan?',
      'Vad händer vid sen eller missad betalning?',
      'Vem är personligt betalningsansvarig?',
    ],
  },
]

export function getGuide(slug: string): ContractGuide | undefined {
  return contractGuides.find(g => g.slug === slug)
}
