# 🚀 Launch-checklista – Kolla Kontraktet

Koden är förberedd för lansering. Det här är stegen som bara du kan göra (nycklar, domän, deployment).
Bocka av uppifrån och ner.

---

## 1. Säkerhet – rotera nycklar som läckt
Under utvecklingen klistrades riktiga nycklar in i chatten. **Byt ut dem innan launch:**
- [ ] **Anthropic** – [console.anthropic.com](https://console.anthropic.com) → radera gammal nyckel, skapa ny
- [ ] **Stripe** – Dashboard → Developers → API keys → "Roll key"
- [ ] **Supabase** – Settings → API → rotera `service_role`-nyckeln vid behov

## 2. Fyll i de juridiska sidorna
Öppna och ersätt platshållarna `[DITT FÖRETAG]`, `[ORG.NR]`, `[ADRESS]`, `[din@epost.se]`:
- [ ] `app/privacy/page.tsx` (integritetspolicy)
- [ ] `app/terms/page.tsx` (användarvillkor)
- [ ] Låt gärna en jurist läsa igenom dem innan du tar betalt av riktiga kunder

## 3. Supabase (produktion)
- [ ] Överväg **betald plan** så projektet inte pausas (annars slås databasen av vid inaktivitet)
- [ ] Bekräfta att RLS är på för alla tabeller (det är det i `schema.sql`)
- [ ] Lägg till din produktionsdomän i **Authentication → URL Configuration**

## 4. Google-inloggning (produktion)
- [ ] I [Google Cloud Console](https://console.cloud.google.com) → Credentials → lägg till redirect-URL:
      `https://sipenvdaitssosqbfjoy.supabase.co/auth/v1/callback` (finns redan) samt din produktionsdomän om det behövs
- [ ] Publicera OAuth-medgivandeskärmen (annars kan bara testanvändare logga in)

## 5. Stripe – gå från test till skarpt läge
- [ ] Slå av testläge (skarpt läge) i Stripe
- [ ] Skapa de tre produkterna i **skarpt** läge → kopiera nya `price_...`-id:n
- [ ] Skapa en **webhook-endpoint** i Stripe Dashboard (inte Stripe CLI):
      URL: `https://DIN-DOMÄN/api/stripe/webhook`
      Events: `checkout.session.completed`, `customer.subscription.updated`,
      `customer.subscription.deleted`, `invoice.payment_failed`
- [ ] Kopiera webhookens `whsec_...` till produktionsmiljön

## 6. E-post (Resend)
- [ ] Skapa konto på [resend.com](https://resend.com) och lägg `RESEND_API_KEY` i miljövariablerna
- [ ] Verifiera en **avsändardomän** (t.ex. `kollakontraktet.se`) för att kunna maila riktiga kunder
- [ ] Uppdatera `EMAIL_FROM` till din verifierade adress

## 7. Deploya till Vercel
- [ ] Koppla repot till [Vercel](https://vercel.com)
- [ ] Lägg in **alla** miljövariabler (se `.env.local.example`) i Vercel-projektet:
      Supabase (3 st), Anthropic, Stripe (skarpa nycklar + whsec + 3 price-id), Resend, och
      `NEXT_PUBLIC_SITE_URL=https://DIN-DOMÄN`
- [ ] Deploya och koppla din domän

## 8. Rök-test i produktion
- [ ] Logga in med Google
- [ ] Gör en gratis teaser-analys
- [ ] Gör ett skarpt köp (ev. med eget kort, återbetala sen) och verifiera att kontot låses upp
- [ ] Testa PDF-uppladdning, PDF-export och maila-knappen

---

## Bra att veta
- **Gratis teaser kostar dig pengar** – varje teaser kör en full AI-analys. Håll koll på Anthropic-kostnaden när trafiken ökar.
- **`stripe.exe`** i projektmappen är bara för lokal test – den följer inte med till produktion.
- Rekommenderade nästa förbättringar efter launch: följdfrågor om avtalet (chatt), avtalstyp-anpassad analys, automatisk radering av avtal efter X dagar.
