export interface ContractGuide {
  slug: string
  name: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
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
    metaTitle: 'Konsultavtal: fällor kring ansvar, betalning och ägande | Kolla Kontraktet',
    metaDescription:
      'Uppsägningstid, ansvarsbegränsning, betalningstid och vem som äger arbetet. Vanliga fällor i konsultavtal – förklarat på vanlig svenska.',
    h1: 'Konsultavtal: det här bör du kolla innan du signerar',
    intro:
      'Som konsult sitter du ofta i en svagare förhandlingsposition. Här är villkoren som kan kosta dig mest – och hur du analyserar ditt avtal snabbt.',
    traps: [
      { title: 'Uppsägningstid', body: 'Lång uppsägningstid kan låsa dig, eller så kan uppdragsgivaren avsluta med kort varsel. Kolla att den är rimlig åt båda håll.' },
      { title: 'Ansvarsbegränsning', body: 'Utan tak på ditt ansvar kan du bli skyldig stora belopp vid fel. Se till att ansvaret är beloppsbegränsat.' },
      { title: 'Betalningstid', body: 'Betalningsvillkor på 60–90 dagar pressar din likviditet. Kortare betalningstid är ofta förhandlingsbart.' },
      { title: 'Ägande av arbete och material', body: 'Vissa avtal tar även rättigheter till det du skapat innan uppdraget. Läs IP-klausulen noga.' },
      { title: 'Sekretess utan tidsgräns', body: 'Sekretess "utan tidsbegränsning" kan binda dig för evigt. Kolla omfattning och längd.' },
    ],
    checklist: [
      'Är uppsägningstiden rimlig för båda parter?',
      'Är mitt ansvar beloppsbegränsat?',
      'Hur lång är betalningstiden?',
      'Vem äger det jag skapar – och gäller det även tidigare material?',
      'Hur länge gäller sekretessen?',
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
