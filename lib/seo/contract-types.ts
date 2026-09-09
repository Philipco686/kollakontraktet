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
    metaTitle: 'Hyreskontrakt: fällor, uppsägning och dina rättigheter | Kolla Kontraktet',
    metaDescription:
      'Vad gäller för hyra, höjningar, uppsägningstid och besittningsskydd? En komplett guide till hyreskontrakt på vanlig svenska – med checklista och vad hyreslagen säger.',
    h1: 'Hyreskontrakt: den kompletta guiden till dina rättigheter',
    updated: '2026-09-09',
    intro:
      'Ett hyreskontrakt ser standardiserat ut, men detaljerna avgör vad boendet kostar och hur trygg du är. En viktig sak många missar: dina rättigheter beror på vilken typ av uthyrning det är. Den här guiden går igenom hyra, höjningar, uppsägning, besittningsskydd och avflyttning – och vad hyreslagen faktiskt säger.',
    sections: [
      {
        heading: 'Vilken typ av hyra är det? (det avgör dina rättigheter)',
        body: [
          'Innan du läser detaljerna: ta reda på vilken sorts uthyrning kontraktet gäller, för det styr vilken lag som skyddar dig. Ett förstahandskontrakt direkt med en hyresvärd eller ett bostadsbolag omfattas av hyreslagen (12 kap. jordabalken) med starkt besittningsskydd.',
          'Hyr du en hyresrätt i andra hand gäller också hyreslagen, men med särskilda regler – bland annat att du kan begära tillbaka överhyra hos hyresnämnden. Hyr du däremot någons egen bostadsrätt eller villa gäller i stället lagen om uthyrning av egen bostad (2012:978), som ger hyresvärden mer frihet: kostnadsbaserad hyra, kortare uppsägningstid och inget besittningsskydd.',
          'Kort sagt: samma ord i kontraktet kan betyda olika saker beroende på upplägget. Kontrollera därför först om det är förstahand, andrahand av hyresrätt, eller uthyrning av egen bostad.',
        ],
      },
      {
        heading: 'Hyran: nivå, höjningar och indexklausuler',
        body: [
          'För en vanlig bostadslägenhet ska hyran enligt hyreslagen vara bestämd till beloppet. Klausuler som trappar upp hyran eller kopplar den till index (KPI) är bara tillåtna om avtalet är tidsbestämt och löper i minst tre år. En årlig indexhöjning i ett vanligt tillsvidareavtal är alltså ofta inte giltig – även om den står i kontraktet.',
          'Hyresnivån för en hyresrätt bygger på bruksvärdet, alltså vad likvärdiga lägenheter kostar. Tycker du att hyran är oskälig kan du få den prövad hos hyresnämnden. Vid andrahandsuthyrning av en hyresrätt kan du dessutom begära tillbaka överhyra i efterhand.',
          'Hyr du någons egen bostad gäller andra regler: då får hyresvärden ta ut en kostnadsbaserad hyra (rimlig kapitalkostnad plus driftskostnader), och den kan inte prövas mot bruksvärdet på samma sätt. Läs alltid klausulen om hyresjustering noga – särskilt om det finns ett "golv" som höjer oavsett index.',
        ],
      },
      {
        heading: 'Bindningstid och uppsägning',
        body: [
          'För en bostad har du som hyresgäst alltid rätt att säga upp avtalet med tre månaders uppsägningstid till ett månadsskifte – oavsett vad kontraktet säger. Ett villkor som binder dig längre än så är inte giltigt till din nackdel. (Vid uthyrning av egen bostad enligt privatuthyrningslagen är din uppsägningstid i stället kortare, en månad.)',
          'Kolla om avtalet löper tillsvidare eller på bestämd tid, och om det förlängs automatiskt om ingen säger upp det. Ett tidsbestämt avtal som "förlängs med tolv månader i taget" kan låsa dig om du missar uppsägningsfönstret.',
        ],
      },
      {
        heading: 'Besittningsskydd – får du bo kvar?',
        body: [
          'Besittningsskydd betyder att du har rätt att bo kvar och få kontraktet förlängt även om hyresvärden vill säga upp dig, så länge du skött dig. Vid ett förstahandskontrakt på en bostad har du normalt ett starkt besittningsskydd.',
          'Vid andrahandsuthyrning uppstår besittningsskydd först efter två år – men det avtalas mycket ofta bort med hyresnämndens godkännande, vilket är helt lagligt. Vid uthyrning av egen bostad finns inget besittningsskydd alls. Kontrollera därför om kontraktet innehåller ett avstående från besittningsskydd, så att du vet hur trygg din rätt att bo kvar faktiskt är.',
        ],
      },
      {
        heading: 'Deposition, avgifter och vad som ingår',
        body: [
          'Deposition är vanligt men inte särskilt reglerat i lag. Om du betalar en, se till att det står skriftligt hur stor den är, vad den får användas till och när du får tillbaka den. En deposition ska återbetalas när du flyttar ut, med avdrag bara för sådant du faktiskt är ansvarig för.',
          'Ta reda på exakt vad som ingår i hyran och vad som tillkommer: värme, varmvatten, el, bredband, tv och eventuella andra avgifter. Poster utöver hyran kan lägga på tusenlappar per år, så det ska framgå tydligt.',
        ],
      },
      {
        heading: 'Skick, reparationer och avflyttning',
        body: [
          'Enligt hyreslagen är det hyresvärden som ska hålla bostaden i brukbart skick och sköta reparationer med skäliga tidsmellanrum. Var därför skeptisk mot klausuler som vältrar över allt underhåll på dig som hyresgäst – de kan vara ogiltiga.',
          'Du ansvarar för skador du själv orsakar, men inte för normalt slitage (som att en matta nöts eller väggar mattas med tiden). Vid utflytt är det vanligt med en besiktning; se till att dokumentera bostadens skick när du flyttar in, gärna med foton, så att du inte får betala för slitage som redan fanns.',
        ],
      },
      {
        heading: 'Andrahandsuthyrning och inneboende',
        body: [
          'Vill du själv hyra ut i andra hand eller ta in en inneboende krävs oftast hyresvärdens samtycke, eller tillstånd från hyresnämnden om du har giltiga skäl. Att hyra ut i andra hand utan lov är en av de vanligaste orsakerna till att någon förlorar sitt förstahandskontrakt.',
          'Kolla vad ditt kontrakt säger om detta innan du planerar att vara borta en period – reglerna är strikta och konsekvensen av att bryta mot dem kan bli att du blir av med bostaden.',
        ],
      },
    ],
    lawRefs: [
      { law: 'Jordabalken (1970:994), 12 kap. ("hyreslagen")', note: 'Grunden för bostadshyra: din rätt att säga upp med tre månaders uppsägningstid, hyresvärdens underhållsansvar, besittningsskydd och skälig hyra.' },
      { law: 'Lagen om uthyrning av egen bostad (2012:978)', note: 'Gäller när någon hyr ut sin egen bostadsrätt eller villa – kostnadsbaserad hyra, kortare uppsägningstid för hyresgästen och inget besittningsskydd.' },
      { law: 'Hyresförhandlingslagen (1978:304)', note: 'Reglerar kollektivt förhandlade hyror, t.ex. i allmännyttan, där hyran sätts genom förhandling mellan hyresvärd och hyresgästförening.' },
    ],
    traps: [
      { title: 'Indexhöjning som inte är tillåten', body: 'För en vanlig bostad får hyran bara trappas eller indexeras om avtalet är tidsbestämt i minst tre år. En årlig KPI-höjning i ett tillsvidareavtal är ofta ogiltig – även om den står i kontraktet.' },
      { title: 'Överhyra i andra hand', body: 'Hyr du en hyresrätt i andra hand och betalar mer än förstahandshyran (plus ev. tillägg för möbler) kan du begära tillbaka mellanskillnaden hos hyresnämnden.' },
      { title: 'Bindningstid som låser dig', body: 'För en bostad har du alltid rätt att säga upp med tre månaders uppsägningstid, oavsett vad kontraktet säger. Ett villkor som binder dig längre är inte giltigt till din nackdel.' },
      { title: 'Underhåll som vältras över på dig', body: 'Hyresvärden ansvarar enligt lag för att hålla bostaden i brukbart skick. Var skeptisk mot klausuler som lägger allt reparationsansvar på hyresgästen.' },
      { title: 'Avstående från besittningsskydd', body: 'I andrahands- och korttidskontrakt förekommer klausuler där du avstår rätten att bo kvar. Det kan vara helt lagligt – men se till att du förstår att din rätt att bo kvar då är svag.' },
      { title: 'Dolda kostnader', body: 'Värme, vatten, el, bredband och andra avgifter utöver hyran kan lägga på tusenlappar per år. Kontrollera exakt vad som ingår och vad som tillkommer.' },
    ],
    checklist: [
      'Är det förstahand, andrahand av hyresrätt, eller uthyrning av egen bostad?',
      'Är hyran skälig – och kan jag pröva den hos hyresnämnden?',
      'Får hyran höjas, hur och med hur mycket? (Är index/trappning ens tillåtet här?)',
      'Hur lång är bindnings- och uppsägningstiden? (Minst tre månader för mig?)',
      'Förlängs avtalet automatiskt om jag inte säger upp det?',
      'Har jag besittningsskydd – eller avstår jag från rätten att bo kvar?',
      'Vad ingår i hyran (värme, vatten, el, bredband)?',
      'Vilka kostnader tillkommer utöver hyran?',
      'Betalar jag deposition – hur stor, och hur/när får jag tillbaka den?',
      'Vad ansvarar jag för vid skador – och räknas normalt slitage bort?',
      'Vad gäller vid besiktning och städning när jag flyttar ut?',
      'Får jag hyra ut i andra hand eller ha inneboende?',
    ],
    faq: [
      { q: 'Kan hyresvärden höja hyran hur mycket som helst?', a: 'Nej. För en hyresrätt bygger hyran på bruksvärdet och kan prövas hos hyresnämnden om den är oskälig. Index- eller trappningsklausuler för en bostad är bara tillåtna om avtalet är tidsbestämt i minst tre år.' },
      { q: 'Hur lång uppsägningstid har jag på ett hyreskontrakt?', a: 'För en bostad har du alltid rätt att säga upp med tre månaders uppsägningstid till ett månadsskifte, oavsett vad kontraktet säger. Vid uthyrning av egen bostad enligt privatuthyrningslagen är din uppsägningstid i stället en månad.' },
      { q: 'Vad är besittningsskydd?', a: 'Rätten att bo kvar och få kontraktet förlängt även om hyresvärden vill säga upp dig, så länge du skött dig. Starkt vid förstahandskontrakt, uppstår efter två år i andra hand (men avtalas ofta bort), och saknas helt vid uthyrning av egen bostad.' },
      { q: 'Kan jag få tillbaka överhyra i andra hand?', a: 'Ja. Hyr du en hyresrätt i andra hand och betalar mer än förstahandshyran kan du ansöka hos hyresnämnden om att få tillbaka mellanskillnaden. Ansök i tid efter att hyresförhållandet upphört.' },
      { q: 'Vad räknas som normalt slitage?', a: 'Sådant som uppstår vid vanligt boende över tid – till exempel att mattor nöts eller ytor mattas. Det ska du inte behöva betala för. Du ansvarar däremot för skador du själv orsakar utöver normalt slitage.' },
      { q: 'Måste jag ha tillstånd för att hyra ut i andra hand?', a: 'Ja, oftast krävs hyresvärdens samtycke eller tillstånd från hyresnämnden. Att hyra ut utan lov är en vanlig orsak till att man förlorar sitt förstahandskontrakt.' },
    ],
  },
  {
    slug: 'anstallningsavtal',
    name: 'Anställningsavtal',
    metaTitle: 'Anställningsavtal: vad du bör granska innan du skriver på | Kolla Kontraktet',
    metaDescription:
      'Provanställning, konkurrensklausul, övertid och vem som äger det du skapar. De vanligaste fällorna i anställningsavtal – förklarat enkelt.',
    h1: 'Anställningsavtal: det här bör du granska innan du skriver på',
    updated: '2026-09-09',
    intro:
      'Ett anställningsavtal styr mer än lönen – anställningsform, uppsägningstid, övertid, konkurrensklausuler och vem som äger det du skapar. Den här guiden går igenom villkoren som ofta smyger sig in, vad lagen ger dig oavsett vad kontraktet säger, och en checklista du kan skriva ut.',
    sections: [
      {
        heading: 'Anställningsform och provanställning',
        body: [
          'Kolla först vilken anställningsform det är. En tillsvidareanställning ("fast tjänst") är huvudregeln och ger starkast skydd. En särskild visstidsanställning är tidsbegränsad och övergår till tillsvidare först efter en viss sammanlagd tid.',
          'En provanställning får enligt lagen om anställningsskydd (LAS) vara i högst sex månader. Avbryts den inte övergår den automatiskt i en tillsvidareanställning. Under prövotiden kan båda parter avsluta utan att ange skäl, men arbetsgivaren måste ge besked i förväg. Se till att avtalet anger längden och vad som händer när prövotiden löper ut.',
        ],
      },
      {
        heading: 'Lön, förmåner och bonus',
        body: [
          'Kontrollera att lönen anges som bruttobelopp och när den betalas. Titta också på förmåner: tjänstepension ingår inte i lagen för privatanställda utan förutsätter kollektivavtal eller ett uttryckligt avtal – saknas det kan du gå miste om en stor del av din framtida ersättning.',
          'Bonus är ofta villkorad och ibland helt diskretionär ("kan komma att betalas ut"). Läs exakt vad som krävs för att den ska falla ut, om den betalas om du slutar under året, och om den är garanterad eller helt upp till arbetsgivaren.',
        ],
      },
      {
        heading: 'Arbetstid och övertid',
        body: [
          'Arbetstidslagen sätter ramar för ordinarie arbetstid och övertid, men mycket regleras i kollektivavtal eller det egna avtalet. Formuleringar som "övertid ingår i lönen" är vanliga för tjänstemän och betyder att du kan förväntas jobba extra utan extra betalt – ofta i utbyte mot något, till exempel fler semesterdagar.',
          'Kolla vad som faktiskt gäller: får du övertidsersättning eller har du "förtroendearbetstid"? Och står det något om hur mycket övertid som kan krävas? Semesterlagen ger dig minst 25 semesterdagar oavsett vad som står i avtalet.',
        ],
      },
      {
        heading: 'Uppsägning och anställningsskydd',
        body: [
          'Vid en tillsvidareanställning krävs sakliga skäl för att arbetsgivaren ska kunna säga upp dig (till exempel arbetsbrist eller personliga skäl). Uppsägningstiden beror enligt LAS på hur länge du varit anställd – från en månad upp till sex månader – och gäller åt båda håll om inget bättre avtalats.',
          'Ett kontrakt kan ge dig längre uppsägningstid än lagen, men inte kortare till din nackdel. Var uppmärksam på avtal som försöker kringgå anställningsskyddet, till exempel genom att kalla en anställning för uppdrag.',
        ],
      },
      {
        heading: 'Konkurrens- och kundklausuler',
        body: [
          'En konkurrensklausul hindrar dig från att jobba hos konkurrenter eller starta konkurrerande verksamhet en tid efter att du slutat. För tjänstemän följer man ofta ett kollektivavtal som säger att sådana klausuler ska vara skäliga, tidsbegränsade (ofta upp till nio månader) och kompenseras ekonomiskt under bindningstiden.',
          'En kundklausul förbjuder dig i stället att ta med dig kunder. Oskäligt långtgående klausuler kan jämkas enligt 36 § avtalslagen, men det är bättre att förhandla ned tid, omfattning och ersättning från början än att lita på en framtida prövning.',
        ],
      },
      {
        heading: 'Immaterialrätt – vem äger det du skapar?',
        body: [
          'Som anställd är utgångspunkten en annan än för en konsult. Datorprogram som du skapar i tjänsten övergår enligt upphovsrättslagen automatiskt till arbetsgivaren, om inget annat avtalats. För andra verk avgör anställningens syfte och praxis vad arbetsgivaren får använda.',
          'Uppfinningar du gör inom ditt arbetsområde omfattas av lagen om arbetstagares uppfinningar, som ger arbetsgivaren rätt att ta över dem mot skälig ersättning. Var särskilt uppmärksam på klausuler som försöker ta rättigheter till allt du skapar även på din fritid – de är omtvistade och kan vara oskäliga.',
        ],
      },
      {
        heading: 'Finns det kollektivavtal?',
        body: [
          'Om arbetsgivaren har kollektivavtal styr det ofta lön, tjänstepension, försäkringar, övertidsersättning och uppsägningsregler – till din fördel. Saknas kollektivavtal måste allt detta i stället regleras i ditt eget avtal, annars gäller bara lagens miniminivå.',
          'Fråga därför om det finns kollektivavtal, och om inte: kontrollera extra noga att pension, försäkringar och övertid faktiskt står med i ditt personliga avtal.',
        ],
      },
    ],
    lawRefs: [
      { law: 'Lagen om anställningsskydd (LAS) (1982:80)', note: 'Anställningsformer, provanställning (max 6 mån), krav på sakliga skäl vid uppsägning och uppsägningstider från en till sex månader.' },
      { law: 'Semesterlagen (1977:480)', note: 'Rätt till minst 25 semesterdagar och semesterlön – gäller oavsett vad som står i avtalet.' },
      { law: 'Arbetstidslagen (1982:673)', note: 'Ramar för ordinarie arbetstid och övertid; kan i stor utsträckning ersättas av kollektivavtal.' },
      { law: 'Lagen om arbetstagares uppfinningar (1949:345)', note: 'Arbetsgivarens rätt att ta över uppfinningar du gör inom ditt arbetsområde, mot skälig ersättning.' },
    ],
    traps: [
      { title: 'Villkorad eller diskretionär bonus', body: 'Bonus som "kan komma att betalas ut" är helt upp till arbetsgivaren. Läs exakt vad som krävs och om den betalas om du slutar under året.' },
      { title: 'Konkurrensklausul utan ersättning', body: 'En klausul som hindrar dig från att jobba vidare i branschen bör vara tidsbegränsad och kompenseras ekonomiskt. Saknas ersättning eller är den orimligt lång kan den jämkas.' },
      { title: '"Övertid ingår i lönen"', body: 'Formuleringen betyder att du kan förväntas jobba extra utan extra betalt. Kolla om du får övertidsersättning eller något annat i utbyte, som fler semesterdagar.' },
      { title: 'Breda IP-klausuler', body: 'Klausuler som tar rättigheter till allt du skapar, även på fritiden, är omtvistade. Se till att de är avgränsade till det du gör i tjänsten.' },
      { title: 'Saknat kollektivavtal och pension', body: 'Utan kollektivavtal ingår ingen tjänstepension automatiskt. Kontrollera att pension och försäkringar står med i ditt eget avtal.' },
      { title: 'Anställning förklädd till uppdrag', body: 'Ett upplägg som kallas "konsult" men i praktiken är en anställning kan beröva dig anställningsskyddet. Kolla vad som verkligen gäller.' },
    ],
    checklist: [
      'Vilken anställningsform är det – tillsvidare, visstid eller provanställning?',
      'Hur lång är provanställningen (max sex månader) och vad händer efter?',
      'Hur lång är uppsägningstiden, åt båda håll?',
      'Finns det kollektivavtal hos arbetsgivaren?',
      'Ingår tjänstepension – och vilka försäkringar?',
      'Anges lönen som bruttobelopp och när betalas den?',
      'Får jag övertidsersättning, eller ingår övertid i lönen?',
      'Finns en konkurrensklausul – hur lång, och kompenseras den?',
      'Finns en kundklausul som hindrar mig från att ta med kunder?',
      'Vad övergår till arbetsgivaren av det jag skapar?',
      'Är bonusvillkoren tydliga och betalas bonus om jag slutar?',
      'Har jag minst 25 semesterdagar?',
    ],
    faq: [
      { q: 'Är en konkurrensklausul alltid giltig?', a: 'Nej. Oskäligt långtgående konkurrensklausuler kan jämkas enligt 36 § avtalslagen, och för tjänstemän ska de ofta vara tidsbegränsade och kompenseras ekonomiskt. Förhandla ned tid och omfattning från början.' },
      { q: 'Hur lång får en provanställning vara?', a: 'Högst sex månader enligt LAS. Avbryts den inte övergår den automatiskt i en tillsvidareanställning.' },
      { q: 'Har jag rätt till tjänstepension?', a: 'Inte enligt lag för privatanställda. Tjänstepension förutsätter kollektivavtal eller ett uttryckligt avtal – saknas det kan du gå miste om en stor framtida ersättning, så kontrollera det noga.' },
      { q: 'Får jag alltid betalt för övertid?', a: 'Inte nödvändigtvis. Många tjänstemannaavtal säger att övertid ingår i lönen, ofta mot något annat i utbyte. Läs vad som gäller och om du har förtroendearbetstid.' },
      { q: 'Vem äger det jag skapar på jobbet?', a: 'Som anställd övergår datorprogram du skapar i tjänsten automatiskt till arbetsgivaren enligt upphovsrättslagen. Uppfinningar inom ditt arbetsområde kan arbetsgivaren ta över mot skälig ersättning. Fritidsskapande är en gråzon – se att klausulen är avgränsad.' },
      { q: 'Kan arbetsgivaren säga upp mig hur som helst?', a: 'Nej. Vid en tillsvidareanställning krävs sakliga skäl, till exempel arbetsbrist eller personliga skäl, och du har en uppsägningstid som beror på hur länge du varit anställd.' },
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
    updated: '2026-09-09',
    intro:
      'Ett köpeavtal avgör vem som står risken om något går fel – och vilken lag som gäller beror på vad du köper och av vem. Den här guiden går igenom felansvar, dolda fel, garantier, leverans och betalning, med de skillnader som avgör hur skyddad du är.',
    sections: [
      {
        heading: 'Vilken typ av köp – och vilken lag gäller?',
        body: [
          'Börja med att avgöra vad affären rör, för det styr vilken lag som fyller ut avtalet. Köper du en vara (lös egendom) mellan företag eller mellan privatpersoner gäller köplagen. Köper du som privatperson av ett företag gäller i stället konsumentköplagen, som ger dig ett betydligt starkare skydd.',
          'Rör affären fast egendom – en fastighet – gäller jordabalkens fjärde kapitel med egna regler om undersökningsplikt och ansvar för dolda fel. Kontrollera alltså först om det är en vara eller en fastighet, och om du agerar som konsument eller näringsidkare, innan du bedömer villkoren.',
        ],
      },
      {
        heading: 'Fel och felansvar',
        body: [
          'Kärnfrågan är vad som räknas som ett fel och vem som ansvarar. Utgångspunkten är att varan ska stämma med vad ni avtalat och med vad köparen med fog kunde förvänta sig. Är den felaktig kan påföljderna vara avhjälpande, omleverans, prisavdrag, hävning eller skadestånd.',
          'Som konsument har du enligt konsumentköplagen rätt att reklamera i upp till tre år, och ett fel som visar sig inom två år antas ha funnits redan vid leveransen om inte säljaren visar annat. Mellan företag är fristerna kortare och styrs mer av avtalet – reklamera "inom skälig tid" och kontrollera vilka tidsgränser avtalet sätter.',
        ],
      },
      {
        heading: 'Befintligt skick och dolda fel',
        body: [
          'Klausuler om att varan säljs "i befintligt skick" begränsar säljarens ansvar, men friskriver inte helt. Varan kan ändå anses felaktig om den är i väsentligt sämre skick än du med fog kunde förvänta dig, eller om säljaren undanhållit väsentlig information.',
          'Vid fastighetsköp har du som köpare en långtgående undersökningsplikt – fel du borde ha upptäckt vid en noggrann undersökning kan du inte klaga på i efterhand. Säljaren ansvarar däremot för dolda fel som du inte kunde upptäcka, och det ansvaret kan sträcka sig upp till tio år.',
        ],
      },
      {
        heading: 'Garantier',
        body: [
          'En garanti är ett frivilligt löfte utöver det ansvar lagen redan ger dig – inte en ersättning för det. Läs vad garantin faktiskt täcker, hur länge den gäller och vilka villkor som krävs för att den ska hålla (till exempel service hos viss verkstad).',
          'Var uppmärksam på att en kort garanti inte tar bort din reklamationsrätt enligt lag. En säljare som säger att "garantin gått ut" har inte nödvändigtvis rätt om felet omfattas av lagens felansvar.',
        ],
      },
      {
        heading: 'Leverans, risk och dröjsmål',
        body: [
          'Kolla när risken för varan går över på dig – alltså från vilken tidpunkt du står risken om varan skadas eller försvinner. Vid transport regleras det ofta genom leveransvillkor. En oklar riskövergång kan lämna dig med notan för något du inte rådde över.',
          'Se också vad som gäller vid dröjsmål. Vite vid försenad leverans kan vara bra för dig som köpare, men om du är säljare kan ett högt vite bli kostsamt. Kontrollera att förseningspåföljderna är balanserade.',
        ],
      },
      {
        heading: 'Betalning, äganderättsförbehåll och tvist',
        body: [
          'Granska betalningsvillkoren: förskott, delbetalningar och slutbetalning. Ett stort förskott innebär en risk om motparten inte levererar. Ett äganderättsförbehåll (att säljaren äger varan tills den är betald) skyddar säljaren men kan begränsa dig som köpare.',
          'Slutligen, kolla hur tvister ska lösas och vilket lands lag som gäller – särskilt vid köp över gränserna. Ett villkor om skiljeförfarande kan bli dyrt jämfört med allmän domstol.',
        ],
      },
    ],
    lawRefs: [
      { law: 'Köplagen (1990:931)', note: 'Köp av vara (lös egendom) mellan företag eller mellan privatpersoner – felansvar, påföljder och reklamation när avtalet är tyst.' },
      { law: 'Konsumentköplagen (2022:260)', note: 'När du som konsument köper av ett företag: reklamationsrätt i upp till tre år och antagande om att fel inom två år fanns vid leveransen.' },
      { law: 'Jordabalken (1970:994), 4 kap.', note: 'Köp av fast egendom: köparens undersökningsplikt och säljarens ansvar för dolda fel, som kan sträcka sig upp till tio år.' },
    ],
    traps: [
      { title: 'Otydligt felansvar och korta frister', body: 'Vaga formuleringar om fel och snäva reklamationsfrister kan lämna dig utan möjlighet att klaga. Kontrollera exakt vad som räknas som fel och hur lång tid du har på dig.' },
      { title: '"Befintligt skick"', body: 'Klausulen begränsar säljarens ansvar men friskriver inte helt. Varan kan ändå vara felaktig om den är väsentligt sämre än du kunde förvänta dig.' },
      { title: 'Garanti som täcker mindre än man tror', body: 'En garanti är ett frivilligt löfte med egna villkor. Läs vad den faktiskt täcker – och kom ihåg att den inte ersätter din lagstadgade reklamationsrätt.' },
      { title: 'Oklar riskövergång', body: 'Om det inte framgår när risken går över på dig kan du få stå för skador under transport som du inte rådde över.' },
      { title: 'Obalanserat vite och stort förskott', body: 'Höga viten och stora förskott lägger risken på ena parten. Se till att förseningspåföljder och betalningsplan är rimliga åt båda håll.' },
      { title: 'Äganderättsförbehåll', body: 'Att säljaren äger varan tills full betalning skett skyddar säljaren men begränsar din rätt att förfoga över den. Kolla vad som gäller.' },
    ],
    checklist: [
      'Är det en vara eller en fastighet – och köper jag som konsument eller företag?',
      'Vad räknas som fel, och vilka påföljder kan jag kräva?',
      'Hur länge har jag på mig att reklamera?',
      'Säljs varan "i befintligt skick" – och vad innebär det här?',
      'Vad täcker en eventuell garanti, hur länge och på vilka villkor?',
      'När går risken för varan över på mig?',
      'Vad gäller vid försenad leverans – finns vite?',
      'Vilka betalningsvillkor gäller, och hur stort är förskottet?',
      'Finns ett äganderättsförbehåll?',
      'Hur ska tvister lösas och vilket lands lag gäller?',
    ],
    faq: [
      { q: 'Vad är skillnaden mellan köplagen och konsumentköplagen?', a: 'Köplagen gäller köp mellan företag eller mellan privatpersoner. Konsumentköplagen gäller när du som privatperson köper av ett företag och ger ett starkare skydd, bland annat reklamationsrätt i upp till tre år.' },
      { q: 'Kan säljaren friskriva sig med "i befintligt skick"?', a: 'Delvis, men inte helt. Varan kan ändå anses felaktig om den är i väsentligt sämre skick än du med fog kunde förvänta dig, eller om säljaren undanhållit viktig information.' },
      { q: 'Hur länge kan jag reklamera ett fel?', a: 'Som konsument upp till tre år enligt konsumentköplagen. Mellan företag är fristerna kortare och styrs av köplagen och avtalet – reklamera inom skälig tid.' },
      { q: 'Vad gäller för dolda fel när jag köper en fastighet?', a: 'Du har en undersökningsplikt och kan inte klaga på fel du borde ha upptäckt. Säljaren ansvarar däremot för dolda fel du inte kunde upptäcka, och det ansvaret kan sträcka sig upp till tio år.' },
      { q: 'Ersätter en garanti mina rättigheter enligt lag?', a: 'Nej. En garanti är ett frivilligt löfte utöver lagens felansvar. Att en garanti gått ut betyder inte att du förlorat din lagstadgade reklamationsrätt.' },
    ],
  },
  {
    slug: 'nda-sekretessavtal',
    name: 'Sekretessavtal (NDA)',
    metaTitle: 'Sekretessavtal (NDA): vad du bör kolla innan du skriver på | Kolla Kontraktet',
    metaDescription:
      'Hur länge gäller sekretessen, vad räknas som konfidentiellt och vilka böter finns? Vanliga fällor i NDA – förklarat på vanlig svenska.',
    h1: 'Sekretessavtal (NDA): det här bör du förstå innan du signerar',
    updated: '2026-09-09',
    intro:
      'Ett NDA (Non-Disclosure Agreement) kan verka rutinmässigt men binda dig hårt. Den här guiden går igenom vad avtalet faktiskt gör, vad som redan skyddas av lag, och de klausuler som avgör hur stort ditt åtagande blir – med en checklista du kan skriva ut.',
    sections: [
      {
        heading: 'Vad ett NDA gör – och vad lagen redan skyddar',
        body: [
          'Ett sekretessavtal reglerar att den som får ta del av känslig information inte får sprida eller utnyttja den. Bra att veta är att företagshemligheter redan skyddas av lagen om företagshemligheter, även utan ett avtal – att obehörigt utnyttja eller röja en företagshemlighet kan ge skadeståndsansvar oavsett.',
          'Ett NDA breddar och tydliggör det skyddet: det kan omfatta mer än rena företagshemligheter, sätta en bestämd tidsgräns och koppla på ett vite. Just därför är det viktigt att läsa hur brett och hur länge du binds – det är där avtalet går utöver vad lagen redan kräver.',
        ],
      },
      {
        heading: 'Vad räknas som konfidentiellt?',
        body: [
          'Definitionen av "konfidentiell information" avgör hur stort ditt åtagande är. Alltför breda formuleringar ("all information som utbyts") kan i praktiken omfatta nästan allt du hör, vilket blir svårt att leva upp till och lätt att bryta mot av misstag.',
          'Se till att det finns rimliga undantag: information som redan är allmänt känd, som du kände till sedan tidigare, som du tar fram självständigt utan att använda den skyddade informationen, eller som du är skyldig att lämna ut enligt lag eller myndighetsbeslut. Utan dessa undantag blir åtagandet orimligt hårt.',
        ],
      },
      {
        heading: 'Hur länge gäller sekretessen?',
        body: [
          'En sekretess "utan tidsbegränsning" binder dig i praktiken för alltid och är svår att överblicka. En bestämd tid – ofta två till fem år efter att samarbetet upphört – är rimligare och vanligare.',
          'Kolla också vad som gäller när avtalet löper ut: ska information förstöras eller återlämnas? Och gäller sekretessen bara under samarbetet, eller lever den vidare efteråt?',
        ],
      },
      {
        heading: 'Ensidigt eller ömsesidigt?',
        body: [
          'Ett NDA kan vara ensidigt (bara du åtar dig sekretess) eller ömsesidigt (båda parter). Om ni utbyter känslig information åt båda håll bör avtalet vara ömsesidigt, så att du får samma skydd som du ger.',
          'Är avtalet ensidigt trots att båda delar information är det en obalans värd att förhandla om.',
        ],
      },
      {
        heading: 'Vite och skadestånd',
        body: [
          'Många NDA kopplar på ett fast vite vid brott – ett förutbestämt belopp du ska betala oavsett den faktiska skadan. Ett högt vite kan bli mycket dyrt vid ett litet, oavsiktligt misstag.',
          'Oskäligt höga viten kan jämkas av domstol enligt 36 § avtalslagen, men det är bättre att förhandla ned beloppet, eller att koppla ersättningen till den verkliga skadan, redan från början.',
        ],
      },
      {
        heading: 'Fällor som smyger med: konkurrens, IP och värvningsförbud',
        body: [
          'Läs hela avtalet – ibland gömmer sig mer än sekretess i ett NDA. Det kan smygas in en konkurrensklausul (att du inte får arbeta i branschen), en överlåtelse av immateriella rättigheter, eller ett värvningsförbud (att du inte får anställa motpartens personal eller kontakta deras kunder).',
          'Dessa klausuler har inget med ren sekretess att göra och bör bedömas för sig. Ett "vanligt NDA" som samtidigt binder upp din karriär är inte längre rutinmässigt.',
        ],
      },
    ],
    lawRefs: [
      { law: 'Lagen om företagshemligheter (2018:558)', note: 'Skyddar företagshemligheter mot obehörigt utnyttjande och röjande – även utan ett sekretessavtal. Ett NDA breddar och tydliggör skyddet.' },
      { law: 'Avtalslagen (1915:218)', note: 'Avtalsfrihet ger NDA:t dess kraft, men 36 § låter domstol jämka oskäliga villkor, till exempel orimligt höga viten.' },
    ],
    traps: [
      { title: 'Sekretess utan tidsgräns', body: 'Ett åtagande "utan tidsbegränsning" binder dig i praktiken för alltid. Sätt en bestämd tid, ofta två till fem år efter samarbetet.' },
      { title: 'För bred definition av konfidentiellt', body: 'Formuleringar som "all information" gör det lätt att bryta mot avtalet av misstag. Kräv rimliga undantag för allmänt känt och egen kunskap.' },
      { title: 'Högt fast vite', body: 'Ett förutbestämt vite kan bli dyrt vid ett litet misstag. Förhandla ned beloppet eller koppla ersättningen till den verkliga skadan.' },
      { title: 'Ensidigt åtagande', body: 'Om ni delar information åt båda håll bör avtalet vara ömsesidigt. Ett ensidigt NDA ger dig sämre skydd än du ger motparten.' },
      { title: 'Insmugna konkurrens- eller värvningsförbud', body: 'Ett NDA kan innehålla klausuler som binder din karriär eller förbjuder dig att kontakta kunder. Läs hela avtalet – de hör inte hemma i ren sekretess.' },
    ],
    checklist: [
      'Är definitionen av "konfidentiellt" rimligt avgränsad?',
      'Finns undantag för allmänt känt, egen kunskap och det jag måste lämna ut enligt lag?',
      'Hur länge gäller sekretessen efter samarbetet?',
      'Vad ska hända med informationen när avtalet upphör?',
      'Är åtagandet ömsesidigt eller bara ensidigt?',
      'Vilket vite eller skadestånd utgår vid brott – och är det rimligt?',
      'Går vitet att jämka eller är det kopplat till verklig skada?',
      'Finns det insmugna konkurrens-, IP- eller värvningsklausuler?',
      'Vilket lands lag gäller och hur löses tvister?',
    ],
    faq: [
      { q: 'Behöver jag ett NDA om företagshemligheter redan skyddas av lag?', a: 'Lagen om företagshemligheter ger ett grundskydd även utan avtal, men ett NDA breddar skyddet, sätter en tydlig tidsgräns och kan koppla på vite. Det är därför vanligt att komplettera lagen med ett avtal.' },
      { q: 'Hur länge bör sekretessen gälla?', a: 'En bestämd tid är rimligare än "utan tidsbegränsning". Två till fem år efter att samarbetet upphört är vanligt och överblickbart.' },
      { q: 'Är ett högt vite i ett NDA giltigt?', a: 'Det kan vara det, men oskäligt höga viten kan jämkas av domstol enligt 36 § avtalslagen. Bättre är att förhandla ned beloppet eller koppla ersättningen till den faktiska skadan från början.' },
      { q: 'Vad är skillnaden mellan ensidigt och ömsesidigt NDA?', a: 'I ett ensidigt NDA åtar sig bara den ena parten sekretess; i ett ömsesidigt gäller det båda. Delar ni information åt båda håll bör avtalet vara ömsesidigt.' },
      { q: 'Kan ett NDA innehålla mer än sekretess?', a: 'Ja, och det är en vanlig fälla. Ibland smygs en konkurrensklausul, en överlåtelse av rättigheter eller ett värvningsförbud in. Läs hela avtalet och bedöm sådana klausuler för sig.' },
    ],
  },
  {
    slug: 'samboavtal',
    name: 'Samboavtal',
    metaTitle: 'Samboavtal: vad delas och vad händer vid separation | Kolla Kontraktet',
    metaDescription:
      'Vad delas inte, vad händer vid separation, vad gäller för bostaden och skydd vid dödsfall. Vanliga fällor i samboavtal – förklarat enkelt.',
    h1: 'Samboavtal: det här bör du ha koll på',
    updated: '2026-09-09',
    intro:
      'Ett samboavtal styr ekonomin om ni går skilda vägar – men bara en del av det man tror delas omfattas egentligen av lagen. Den här guiden går igenom vad som räknas som samboegendom, vad ett samboavtal kan göra, vad som händer med bostaden och varför sambor inte ärver varandra.',
    sections: [
      {
        heading: 'Vad räknas som samboegendom?',
        body: [
          'En vanlig missuppfattning är att sambor delar allt. Enligt sambolagen omfattar en bodelning bara samboegendom, vilket är den gemensamma bostaden och det bohag (möbler, husgeråd) som ni skaffat för gemensam användning.',
          'Mycket annat ingår alltså inte: bankmedel och sparande, bil, aktier, fritidshus, och egendom var och en ägde redan innan ni blev sambor. Inte heller sådant en av er fått i arv eller gåva med villkor om att det ska vara personligt. Det är därför viktigt att veta vad som faktiskt skulle delas innan man skriver ett avtal.',
        ],
      },
      {
        heading: 'Vad ett samboavtal kan göra',
        body: [
          'Med ett samboavtal kan ni komma överens om att sambolagens bodelningsregler inte ska gälla alls, eller bara delvis. Ni kan till exempel undanta bostaden, eller bestämma att var och en behåller det den betalat för.',
          'Avtalet ska vara skriftligt och undertecknat av er båda. Tänk på att det som undantas från delning tillfaller den som äger egendomen – så avtalet kan slå olika beroende på vem som stått för vad. Gå igenom konsekvenserna innan ni skriver under.',
        ],
      },
      {
        heading: 'Bodelning vid separation',
        body: [
          'Om ni separerar och någon vill dela samboegendomen måste en begäran om bodelning göras inom ett år från att samboförhållandet upphörde. Missar ni den fristen förlorar ni rätten till bodelning.',
          'Vid bodelningen läggs värdet av samboegendomen ihop (efter avdrag för skulder kopplade till den) och delas lika. Har ni ett samboavtal som undantar egendom påverkar det förstås utfallet.',
        ],
      },
      {
        heading: 'Bostaden – vem får bo kvar och vem står för lånen?',
        body: [
          'Bostaden är oftast det mest värdefulla och det som ger flest tvister. Den som bäst behöver bostaden kan under vissa förutsättningar ha rätt att ta över den vid en separation, även om den andra äger den – särskilt om ni har barn – mot att den andra kompenseras ekonomiskt.',
          'Ansvaret för bostadslånen ligger däremot hos den som står på lånet gentemot banken, oavsett vad ni kommer överens om sinsemellan. Reglera därför tydligt vem som ska bo kvar, hur den andra löses ut och vad som händer med lånen.',
        ],
      },
      {
        heading: 'Sambor ärver inte varandra',
        body: [
          'Det här förvånar många: sambor ärver inte varandra enligt lag. Om den ena går bort ärver i stället barn eller andra släktingar. Vill ni skydda varandra ekonomiskt behöver ni skriva testamente – ett samboavtal räcker inte.',
          'Vid dödsfall finns dock en skyddsregel: den efterlevande sambon kan vid en bodelning begära att få behålla samboegendom upp till ett visst minimibelopp. Men det ger inget fullt skydd – testamente och ibland livförsäkring är det som gör verklig skillnad.',
        ],
      },
    ],
    lawRefs: [
      { law: 'Sambolagen (2003:376)', note: 'Definierar samboegendom (gemensam bostad och bohag), reglerna för bodelning inom ett år, samboavtal och rätten att i vissa fall ta över bostaden.' },
      { law: 'Ärvdabalken (1958:637)', note: 'Sambor ärver inte varandra – vill ni ärva varandra krävs testamente.' },
    ],
    traps: [
      { title: 'Tron att allt delas', body: 'Bara samboegendom (gemensam bostad och bohag för gemensam användning) delas. Sparande, bil, fritidshus och det ni ägde innan ingår normalt inte.' },
      { title: 'Tron att ni ärver varandra', body: 'Sambor ärver inte varandra enligt lag. Utan testamente går arvet till barn eller släktingar – ett samboavtal ändrar inte det.' },
      { title: 'Oklart om bostad och lån', body: 'Vem får bo kvar, hur löses den andra ut, och vem ansvarar för lånen? Otydlighet här skapar de dyraste tvisterna.' },
      { title: 'Missad ettårsfrist', body: 'En begäran om bodelning måste göras inom ett år från separationen. Därefter är rätten borta.' },
      { title: 'Avtal som slår snett', body: 'Undantagen egendom tillfaller ägaren. Ett avtal som "var och en behåller sitt" kan bli mycket ojämnt beroende på vem som stått för vad – räkna igenom det.' },
    ],
    checklist: [
      'Vet vi vad som faktiskt räknas som samboegendom?',
      'Vilken egendom vill vi undanta från delning?',
      'Är avtalet skriftligt och undertecknat av oss båda?',
      'Hur fördelas bohag och bostad vid en separation?',
      'Vem får bo kvar i bostaden – och hur löses den andra ut?',
      'Vem ansvarar för bostadslånen gentemot banken?',
      'Har vi skrivit testamente om vi vill ärva varandra?',
      'Finns livförsäkring som skydd vid dödsfall?',
      'Har vi koll på ettårsfristen för bodelning?',
      'Blir avtalet rimligt balanserat med hänsyn till vem som betalat vad?',
    ],
    faq: [
      { q: 'Delar sambor allt vid en separation?', a: 'Nej. Bara samboegendom delas, alltså den gemensamma bostaden och bohag ni skaffat för gemensam användning. Sparande, bil, fritidshus och det ni ägde innan ingår normalt inte.' },
      { q: 'Ärver sambor varandra?', a: 'Nej, inte enligt lag. Om den ena avlider ärver barn eller släktingar. Vill ni ärva varandra måste ni skriva testamente – ett samboavtal räcker inte.' },
      { q: 'Vad kan ett samboavtal göra?', a: 'Ni kan avtala om att sambolagens bodelningsregler inte ska gälla alls eller delvis, till exempel undanta bostaden. Avtalet ska vara skriftligt och undertecknat av er båda.' },
      { q: 'Vem får bo kvar i bostaden vid en separation?', a: 'Den som bäst behöver bostaden kan under vissa förutsättningar ha rätt att ta över den, särskilt om ni har barn, mot ekonomisk kompensation. Ansvaret för lånen ligger dock hos den som står på dem gentemot banken.' },
      { q: 'Hur lång tid har vi på oss att begära bodelning?', a: 'En begäran måste göras inom ett år från att samboförhållandet upphörde, annars förlorar man rätten till bodelning.' },
    ],
  },
  {
    slug: 'leverantorsavtal',
    name: 'Leverantörsavtal',
    metaTitle: 'Leverantörsavtal: prisändringar, exklusivitet och ansvar | Kolla Kontraktet',
    metaDescription:
      'Ensidiga prisändringar, minimiorder, exklusivitet och leveransansvar. Vanliga fällor i leverantörsavtal – förklarat på vanlig svenska.',
    h1: 'Leverantörsavtal: fällorna för dig som köper eller säljer',
    updated: '2026-09-09',
    intro:
      'Leverantörsavtal innehåller ofta villkor som gynnar den ena parten – kring pris, volym, leverans, ansvar och hur man tar sig ur avtalet. Den här guiden går igenom de vanligaste fällorna och vad som gäller när avtalet är tyst, med en checklista du kan skriva ut.',
    sections: [
      {
        heading: 'Pris och prisändringar',
        body: [
          'Kontrollera om priset är fast under avtalstiden eller kan ändras. Klausuler som låter leverantören höja priset ensidigt gör din kostnad oförutsägbar. Be om ett tak för hur mycket priset får höjas per år, ett rimligt varsel innan en höjning träder i kraft, och en rätt att säga upp avtalet om höjningen blir för stor.',
          'Är priset kopplat till index, valuta eller råvarupriser bör mekanismen vara tydlig och gälla åt båda håll – alltså sänka priset när underlaget sjunker, inte bara höja det.',
        ],
      },
      {
        heading: 'Volym, minimiåtaganden och exklusivitet',
        body: [
          'Krav på att köpa en viss minsta volym (minimiorder eller "take-or-pay") kan binda dig att betala även om ditt behov minskar. Se till att åtagandet matchar en realistisk efterfrågan och att det finns utrymme att justera.',
          'Exklusivitetsklausuler – att du bara får köpa av en leverantör, eller att leverantören bara får sälja till dig – kan vara värdefulla men också inlåsande. Långtgående exklusivitet kan dessutom strida mot konkurrenslagen och i värsta fall vara ogiltig. Kontrollera omfattning och längd.',
        ],
      },
      {
        heading: 'Leverans, risk och ledtider',
        body: [
          'Reglera tydligt vad som ska levereras, när, och med vilka ledtider. Kolla när risken för varan går över på köparen – vid transport regleras det ofta genom leveransvillkor (till exempel Incoterms). En oklar riskövergång kan lämna någon med notan för skador under transport.',
          'Se också vad som gäller vid delleveranser och om leverantören får ändra specifikationen. Otydlighet här skapar tvister när något väl går fel.',
        ],
      },
      {
        heading: 'Fel, reklamation och ansvar',
        body: [
          'När avtalet är tyst fyller köplagen ut vad som gäller vid fel och försening mellan företag, men avtalet går före. Kontrollera reklamationsfrister, vilka påföljder som gäller (avhjälpande, prisavdrag, hävning, skadestånd) och om ansvaret är beloppsbegränsat.',
          'Vite vid försenad leverans kan vara bra för dig som köpare, men om du är leverantör kan ett högt vite bli kostsamt. Se att förseningspåföljder och ansvarstak är balanserade och att indirekta skador hanteras uttryckligt.',
        ],
      },
      {
        heading: 'Betalning och dröjsmål',
        body: [
          'Granska betalningsvillkoren: betalningstid, förskott och eventuella säkerheter. Enligt räntelagen är utgångspunkten 30 dagars betalningstid om inget annat avtalats, och den part som betalar för sent kan bli skyldig dröjsmålsränta.',
          'Långa betalningstider pressar leverantörens likviditet; stora förskott lägger risken på köparen. Se till att villkoren är rimliga för båda.',
        ],
      },
      {
        heading: 'Avtalstid, uppsägning och force majeure',
        body: [
          'Kolla hur länge avtalet binder, om det förlängs automatiskt och hur lång uppsägningstiden är. Ett avtal som "förlängs med tolv månader i taget" kan låsa dig om du missar uppsägningsfönstret.',
          'Se också att det finns en force majeure-klausul som befriar parterna vid händelser utanför deras kontroll, och att den är rimligt formulerad åt båda håll.',
        ],
      },
    ],
    lawRefs: [
      { law: 'Köplagen (1990:931)', note: 'Fyller ut vad som gäller vid fel och försening vid köp av varor mellan företag – men era egna villkor gäller före lagen.' },
      { law: 'Räntelagen (1975:635)', note: '30 dagars betalningstid som utgångspunkt om inget annat avtalats, och rätt till dröjsmålsränta vid sen betalning.' },
      { law: 'Avtalslagen (1915:218)', note: 'Avtalsfrihet ger avtalet dess kraft; 36 § låter domstol jämka oskäliga villkor.' },
      { law: 'Konkurrenslagen (2008:579)', note: 'Långtgående exklusivitet och andra konkurrensbegränsande villkor kan vara ogiltiga.' },
    ],
    traps: [
      { title: 'Ensidiga prisändringar', body: 'Klausuler som låter leverantören höja priset ensidigt gör din kostnad oförutsägbar. Kräv tak, varsel och en rätt att säga upp vid för stora höjningar.' },
      { title: 'Minimiorder och take-or-pay', body: 'Krav på att köpa en viss volym kan binda dig att betala även när behovet minskar. Se till att åtagandet är realistiskt och justerbart.' },
      { title: 'Inlåsande exklusivitet', body: 'Exklusivitet kan hindra dig från att byta leverantör och kan i vissa fall strida mot konkurrenslagen. Kolla omfattning och längd.' },
      { title: 'Oklar leverans och riskövergång', body: 'Om det inte framgår när risken går över kan någon få stå för skador under transport. Reglera leveransvillkor och ledtider tydligt.' },
      { title: 'Obalanserat vite och ansvar', body: 'Höga viten och obegränsat ansvar lägger risken på ena parten. Se att förseningspåföljder och ansvarstak är balanserade och att indirekta skador regleras.' },
      { title: 'Automatisk förlängning', body: 'Ett avtal som förlängs automatiskt i långa perioder kan låsa dig om du missar uppsägningsfönstret. Kolla bindningstid och uppsägningstid.' },
    ],
    checklist: [
      'Är priset fast, eller kan det ändras – och finns tak och varsel?',
      'Gäller prisjusteringen åt båda håll (både upp och ner)?',
      'Finns krav på minimiorder eller take-or-pay?',
      'Binder exklusivitet mig – och är den förenlig med konkurrensreglerna?',
      'Vad ska levereras, när, och med vilka ledtider?',
      'När går risken för varan över på köparen?',
      'Vilka reklamationsfrister och påföljder gäller vid fel?',
      'Är ansvaret beloppsbegränsat och är indirekta skador reglerade?',
      'Vilken betalningstid gäller, och utgår dröjsmålsränta?',
      'Hur lång är bindnings- och uppsägningstiden – och förlängs avtalet automatiskt?',
      'Finns en rimlig force majeure-klausul?',
      'Hur löses tvister och vilket lands lag gäller?',
    ],
    faq: [
      { q: 'Kan en leverantör höja priset ensidigt?', a: 'Om avtalet tillåter det, ja. Skydda dig genom att kräva ett tak för höjningar, ett rimligt varsel och en rätt att säga upp avtalet om höjningen blir för stor. Prisjustering bör gälla åt båda håll.' },
      { q: 'Är exklusivitetsklausuler tillåtna?', a: 'Ofta, men långtgående exklusivitet kan strida mot konkurrenslagen och i värsta fall vara ogiltig. Kontrollera omfattning och längd innan du binder dig.' },
      { q: 'Vilken betalningstid gäller om inget avtalats?', a: 'Enligt räntelagen är utgångspunkten 30 dagar mellan företag, och den som betalar för sent kan bli skyldig dröjsmålsränta.' },
      { q: 'Vem bär risken vid en leverans?', a: 'Det beror på leveransvillkoren. Risken går över på köparen vid en viss tidpunkt, ofta reglerad genom Incoterms. Är det oklart kan du få stå för skador under transport.' },
      { q: 'Vad händer om avtalet förlängs automatiskt?', a: 'Då fortsätter det gälla om ingen säger upp det i tid. Kontrollera bindningstid och uppsägningsfönster så att du inte låses in oavsiktligt.' },
    ],
  },
  {
    slug: 'franchiseavtal',
    name: 'Franchiseavtal',
    metaTitle: 'Franchiseavtal: avgifter, exklusivt område och att lämna | Kolla Kontraktet',
    metaDescription:
      'Avgifter, exklusivt område, hur svårt det är att lämna och begränsningar efter avslut. Vanliga fällor i franchiseavtal – förklarat enkelt.',
    h1: 'Franchiseavtal: det här bör du förstå innan du skriver på',
    updated: '2026-09-09',
    intro:
      'Ett franchiseavtal är ett långt åtagande med många villkor som påverkar både din ekonomi och din frihet. Den här guiden går igenom informationen du har rätt att få innan, avgifterna, det exklusiva området, styrningen och vad som gäller när du vill lämna.',
    sections: [
      {
        heading: 'Informationsplikten – vad du har rätt att få veta',
        body: [
          'Innan du skriver på har du ett lagstadgat skydd: enligt lagen om franchisegivares informationsskyldighet måste franchisegivaren i god tid innan avtalet ingås lämna dig skriftlig information om det du behöver för att bedöma affären. Det handlar bland annat om avtalets innebörd, avgifterna, villkoren för att säga upp och förlänga, samt tvistlösning.',
          'Använd den informationen. Be också att få prata med befintliga franchisetagare och att se siffror – en seriös givare har inget att dölja. Känns det stressat att skriva på snabbt är det i sig en varningssignal.',
        ],
      },
      {
        heading: 'Avgifter och total kostnad',
        body: [
          'Titta på helheten, inte bara ingångsavgiften. Löpande royalty (ofta en procent av omsättningen), marknadsföringsavgifter och krav på att köpa varor eller tjänster av franchisegivaren till bestämda priser kan tillsammans bli en stor del av din marginal.',
          'Räkna igenom vad avgifterna innebär vid olika omsättningsnivåer, och kontrollera om de kan ändras under avtalstiden. En affär som går ihop på papperet kan bli tuff när alla löpande kostnader räknas in.',
        ],
      },
      {
        heading: 'Exklusivt område och konkurrens från givaren',
        body: [
          'Ett skyddat geografiskt område är ofta hela poängen med en franchise. Kontrollera om du faktiskt har ensamrätt i ett område, eller om franchisegivaren kan öppna en ny enhet nära dig eller sälja direkt till kunder i ditt område – till exempel via e-handel.',
          'Utan ett tydligt exklusivt område riskerar du att konkurrera med ditt eget varumärke. Reglera detta uttryckligt.',
        ],
      },
      {
        heading: 'Styrning och frihet',
        body: [
          'En franchise bygger på ett enhetligt koncept, vilket innebär att din frihet begränsas. Kolla hur mycket du får bestämma själv: priser, sortiment, öppettider, val av leverantörer och lokal. Kontrollera också om franchisegivaren ensidigt kan ändra konceptet – och vad det då kan kosta dig i form av ombyggnad eller nya inköp.',
          'Ju mer ensidig ändringsrätt givaren har, desto större är risken att förutsättningarna för din affär ändras under resans gång.',
        ],
      },
      {
        heading: 'Bindningstid och att lämna',
        body: [
          'Franchiseavtal löper ofta över flera år. Kontrollera bindningstiden, vad som händer vid förtida avslut och vilka avgifter det utlöser. Kolla också om och hur du får sälja eller överlåta verksamheten – ofta krävs franchisegivarens godkännande, och givaren kan ha förköpsrätt.',
          'Ett avtal som är svårt och dyrt att ta sig ur minskar ditt förhandlingsutrymme rejält om samarbetet inte fungerar.',
        ],
      },
      {
        heading: 'Begränsningar efter avslut',
        body: [
          'Många franchiseavtal innehåller ett konkurrensförbud som gäller efter att avtalet upphört – du får då inte driva liknande verksamhet under en viss tid och inom ett visst område. Sådana klausuler kan begränsa din försörjning hårt.',
          'Oskäligt långtgående konkurrensförbud kan jämkas enligt 36 § avtalslagen och kan även begränsas av konkurrenslagen, men det är bättre att förhandla ned tid och omfattning från början än att lita på en framtida prövning.',
        ],
      },
    ],
    lawRefs: [
      { law: 'Lagen om franchisegivares informationsskyldighet (2006:484)', note: 'Franchisegivaren måste i god tid innan avtalet ingås lämna skriftlig information om avgifter, uppsägning, förlängning och tvistlösning.' },
      { law: 'Avtalslagen (1915:218)', note: '36 § låter domstol jämka oskäliga villkor, till exempel orimliga konkurrensförbud efter avtalets slut.' },
      { law: 'Konkurrenslagen (2008:579)', note: 'Kan begränsa konkurrensförbud, exklusivitet och andra konkurrensbegränsande villkor.' },
    ],
    traps: [
      { title: 'Dolda löpande avgifter', body: 'Ingångsavgiften är bara början. Royalty, marknadsföringsavgifter och krav på inköp från givaren kan äta upp marginalen. Räkna på helheten vid olika omsättningsnivåer.' },
      { title: 'Inget exklusivt område', body: 'Utan ensamrätt kan franchisegivaren öppna nära dig eller sälja direkt i ditt område, till exempel via e-handel. Se till att området är tydligt skyddat.' },
      { title: 'Ensidig ändring av konceptet', body: 'Om givaren ensidigt kan ändra konceptet kan du tvingas till dyra ombyggnader eller nya inköp. Kolla vilken ändringsrätt givaren har.' },
      { title: 'Svårt och dyrt att lämna', body: 'Lång bindningstid och höga avgifter vid förtida avslut minskar ditt förhandlingsutrymme om samarbetet inte fungerar.' },
      { title: 'Konkurrensförbud efter avslut', body: 'Ett efterföljande konkurrensförbud kan hindra dig från att försörja dig i branschen. Förhandla ned tid och område, och kom ihåg att oskäliga klausuler kan jämkas.' },
    ],
    checklist: [
      'Har jag fått skriftlig information i god tid innan, enligt lagen?',
      'Har jag pratat med befintliga franchisetagare och sett siffror?',
      'Vilka avgifter tillkommer utöver ingångsavgiften?',
      'Hur ser totalkostnaden ut vid olika omsättningsnivåer?',
      'Har jag ett exklusivt geografiskt område – och kan givaren sälja online i det?',
      'Hur mycket får jag bestämma själv (priser, sortiment, leverantörer)?',
      'Kan franchisegivaren ensidigt ändra konceptet – och vad kostar det mig?',
      'Hur lång är bindningstiden?',
      'Vad kostar det att lämna i förtid, och får jag sälja verksamheten?',
      'Vilket konkurrensförbud gäller efter att avtalet upphört?',
    ],
    faq: [
      { q: 'Vad har jag rätt att få veta innan jag skriver på ett franchiseavtal?', a: 'Enligt lagen om franchisegivares informationsskyldighet ska du i god tid innan få skriftlig information om bland annat avgifter, villkor för uppsägning och förlängning samt tvistlösning. Använd den för att bedöma affären.' },
      { q: 'Vilka avgifter tillkommer i en franchise?', a: 'Utöver ingångsavgiften ofta löpande royalty, marknadsföringsavgifter och krav på att köpa varor eller tjänster av franchisegivaren. Räkna på helheten, inte bara startkostnaden.' },
      { q: 'Får franchisegivaren öppna nära mig?', a: 'Det beror på om du har ett exklusivt område. Utan ensamrätt kan givaren öppna en ny enhet nära dig eller sälja direkt i ditt område, till exempel via e-handel. Reglera detta uttryckligt.' },
      { q: 'Kan ett konkurrensförbud hindra mig efter att jag lämnat?', a: 'Ja, om det accepterats. Oskäligt långtgående konkurrensförbud kan jämkas enligt 36 § avtalslagen och begränsas av konkurrenslagen, men förhandla ned tid och omfattning från början.' },
      { q: 'Hur svårt är det att lämna ett franchiseavtal?', a: 'Det beror på bindningstiden och avgifterna vid förtida avslut. Kontrollera också om du får sälja eller överlåta verksamheten – ofta krävs franchisegivarens godkännande.' },
    ],
  },
  {
    slug: 'bolanehandlingar',
    name: 'Bolånehandlingar',
    metaTitle: 'Bolånehandlingar: ränta, bindningstid och personligt ansvar | Kolla Kontraktet',
    metaDescription:
      'Ränta, bindningstid, avgifter, villkor vid sen betalning och personligt ansvar. Vanliga fällor i bolånehandlingar – förklarat på vanlig svenska.',
    h1: 'Bolånehandlingar: villkoren du bör granska',
    updated: '2026-09-09',
    intro:
      'Ett bolån är ett av livets största åtaganden, och små skillnader i villkoren blir stora belopp över tid. Den här guiden går igenom ränta, bindningstid, amorteringskrav, avgifter och personligt ansvar – och vad konsumentkreditlagen ger dig.',
    sections: [
      {
        heading: 'Ränta: bunden eller rörlig – och effektiv ränta',
        body: [
          'Kolla om räntan är rörlig (ändras löpande) eller bunden (fast under en period). Rörlig ränta är flexibel men oförutsägbar; bunden ger trygghet men kan bli dyr att bryta i förtid. Jämför alltid den effektiva räntan, som banken enligt konsumentkreditlagen måste ange – den räknar in avgifter och ger en mer rättvis bild än den nominella räntan.',
          'Den ränta du erbjuds är sällan bankens listränta. Rabatten (din "snittränta" jämfört med listräntan) är ofta förhandlingsbar, och det kan löna sig att jämföra flera banker.',
        ],
      },
      {
        heading: 'Bindningstid och ränteskillnadsersättning',
        body: [
          'Du har alltid rätt att lösa ditt bolån i förtid. Men har du bunden ränta kan banken ta ut en ränteskillnadsersättning – en kompensation för att den går miste om ränta när du löser lånet innan bindningstiden är slut. Beloppet beräknas enligt regler i konsumentkreditlagen och kan bli betydande om räntorna sjunkit sedan du band.',
          'Innan du binder räntan, tänk igenom sannolikheten att du behöver lösa lånet i förtid – till exempel om du kan komma att sälja bostaden eller flytta lånet.',
        ],
      },
      {
        heading: 'Amorteringskrav',
        body: [
          'Nya bolån omfattas normalt av ett amorteringskrav som beror på hur stort lånet är i förhållande till bostadens värde (belåningsgraden). Grovt: lån över 70 procent av värdet ska amorteras med minst 2 procent per år, och lån mellan 50 och 70 procent med minst 1 procent per år.',
          'Är ditt totala bolån dessutom stort i förhållande till din inkomst tillkommer ofta ytterligare amortering. Kolla vilket amorteringskrav som gäller för dig, eftersom det påverkar din månadskostnad lika mycket som räntan.',
        ],
      },
      {
        heading: 'Avgifter och kostnader',
        body: [
          'Utöver räntan tillkommer ofta kostnader: uppläggningsavgift, aviavgifter och kostnad för pantbrev och lagfart vid köp. Enskilt små, men de bör räknas in i den totala kostnaden – och det är därför den effektiva räntan är ett bättre jämförelsemått än den nominella.',
          'Kontrollera också om banken kräver att du samlar andra tjänster hos dem för att få rabatt på räntan, och vad det i så fall kostar dig totalt.',
        ],
      },
      {
        heading: 'Vid sen eller missad betalning',
        body: [
          'Se vad som händer om en betalning missas. Dröjsmålsränta och påminnelseavgifter tillkommer, och vid upprepade eller allvarliga dröjsmål kan banken säga upp hela lånet till omedelbar betalning. Eftersom bostaden är pant kan det i värsta fall leda till att den tvingas säljas.',
          'Kontrollera villkoren för uppsägning från bankens sida och vilka marginaler du har om ekonomin blir tuff en period.',
        ],
      },
      {
        heading: 'Personligt ansvar, medlåntagare och borgen',
        body: [
          'Kolla vem som är betalningsansvarig. Tar ni lånet tillsammans är ni normalt solidariskt ansvariga – det betyder att banken kan kräva hela beloppet av var och en, inte bara halva. Går ni skilda vägar kvarstår ansvaret tills lånet skrivits om.',
          'Går någon i borgen för lånet tar den personen på sig ett stort ekonomiskt ansvar om låntagaren inte betalar. Se till att alla inblandade förstår vidden av åtagandet innan ni skriver under.',
        ],
      },
    ],
    lawRefs: [
      { law: 'Konsumentkreditlagen (2010:1846)', note: 'Kräver kreditprövning och tydlig information om bland annat effektiv ränta, och reglerar hur ränteskillnadsersättning vid förtida lösen får beräknas.' },
      { law: 'Finansinspektionens amorteringskrav', note: 'Obligatorisk amortering utifrån belåningsgrad och skuldkvot – påverkar månadskostnaden lika mycket som räntan.' },
    ],
    traps: [
      { title: 'Fokus på nominell istället för effektiv ränta', body: 'Den nominella räntan döljer avgifter. Jämför den effektiva räntan, som banken måste ange, för en rättvis bild av kostnaden.' },
      { title: 'Ränteskillnadsersättning vid bunden ränta', body: 'Löser du ett bundet lån i förtid kan banken ta ut en ersättning som kan bli betydande om räntorna sjunkit. Väg in sannolikheten att du behöver lösa lånet innan du binder.' },
      { title: 'Underskattat amorteringskrav', body: 'Amorteringen kan påverka månadskostnaden lika mycket som räntan. Kolla vilket krav som gäller utifrån din belåningsgrad och skuldkvot.' },
      { title: 'Dolda avgifter och villkorade rabatter', body: 'Uppläggnings- och aviavgifter tillkommer, och ränterabatten kan kräva att du samlar andra tjänster hos banken. Räkna på totalen.' },
      { title: 'Solidariskt ansvar', body: 'Tar ni lånet ihop kan banken kräva hela beloppet av var och en. Ansvaret kvarstår tills lånet skrivits om, även om ni går skilda vägar.' },
      { title: 'Borgensåtagande', body: 'Att gå i borgen innebär ett stort personligt ansvar om låntagaren inte betalar. Se till att alla förstår vidden innan ni skriver under.' },
    ],
    checklist: [
      'Är räntan bunden eller rörlig?',
      'Vilken är den effektiva räntan (inklusive avgifter)?',
      'Är ränterabatten förhandlad – och har jag jämfört flera banker?',
      'Vad kostar det att lösa lånet i förtid (ränteskillnadsersättning)?',
      'Vilket amorteringskrav gäller för mig?',
      'Vilka avgifter tillkommer utöver räntan?',
      'Kräver rabatten att jag samlar andra tjänster hos banken?',
      'Vad händer vid sen eller missad betalning?',
      'När kan banken säga upp lånet till betalning?',
      'Vem är personligt betalningsansvarig – och är vi solidariskt ansvariga?',
      'Vad innebär ett eventuellt borgensåtagande?',
    ],
    faq: [
      { q: 'Vad är skillnaden mellan bunden och rörlig ränta?', a: 'Rörlig ränta ändras löpande och är flexibel men oförutsägbar. Bunden ränta är fast under en period och ger trygghet, men kan kosta ränteskillnadsersättning om du löser lånet i förtid.' },
      { q: 'Vad är ränteskillnadsersättning?', a: 'En kompensation banken kan ta ut när du löser ett bundet lån innan bindningstiden är slut. Den beräknas enligt konsumentkreditlagen och kan bli betydande om räntorna sjunkit sedan du band.' },
      { q: 'Varför ska jag jämföra den effektiva räntan?', a: 'Den effektiva räntan räknar in avgifter och ger en mer rättvis bild av vad lånet faktiskt kostar än den nominella räntan. Banken är skyldig att ange den.' },
      { q: 'Hur mycket måste jag amortera?', a: 'Det beror på belåningsgraden: grovt minst 2 procent per år över 70 procent av bostadens värde, och minst 1 procent mellan 50 och 70 procent. Är lånet stort i förhållande till inkomsten tillkommer ofta mer.' },
      { q: 'Vad betyder solidariskt ansvar på ett gemensamt bolån?', a: 'Att banken kan kräva hela skulden av var och en av er, inte bara er andel. Ansvaret kvarstår tills lånet skrivits om, även om ni separerar.' },
    ],
  },
]

export function getGuide(slug: string): ContractGuide | undefined {
  return contractGuides.find(g => g.slug === slug)
}
