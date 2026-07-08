# Kolla Kontraktet – Kom igång

## 1. Installera beroenden

```bash
cd kollakontraktet
npm install
```

## 2. Miljövariabler

```bash
cp .env.local.example .env.local
```

Fyll i värdena (se respektive dashboard nedan).

## 3. Supabase

1. Skapa projekt på [supabase.com](https://supabase.com)
2. Kopiera `NEXT_PUBLIC_SUPABASE_URL` och `NEXT_PUBLIC_SUPABASE_ANON_KEY` från **Settings → API**
3. Gå till **SQL Editor** och kör hela innehållet i `supabase/schema.sql`
4. Aktivera Google OAuth: **Authentication → Providers → Google**
   - Skapa OAuth-app på [console.cloud.google.com](https://console.cloud.google.com)
   - Redirect URL: `https://ditt-projekt.supabase.co/auth/v1/callback`

## 4. Stripe

1. Skapa konto på [stripe.com](https://stripe.com)
2. Kopiera API-nycklar från **Developers → API keys**
3. Skapa tre produkter i **Products**:

| Produkt | Pris | Typ |
|---------|------|-----|
| Personlig | 149 kr/mån | Recurring |
| Företag | 499 kr/mån | Recurring |
| Engångsanalys | 49 kr | One-time |

4. Kopiera `price_...` ID:n till `.env.local`
5. Sätt upp webhook: **Developers → Webhooks → Add endpoint**
   - URL: `https://din-domän.vercel.app/api/stripe/webhook`
   - Händelser att lyssna på:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_failed`
   - Kopiera webhook-signeringshemligheten till `STRIPE_WEBHOOK_SECRET`

### Testa webhooks lokalt
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## 5. Claude API

1. Hämta nyckel från [console.anthropic.com](https://console.anthropic.com)
2. Klistra in i `ANTHROPIC_API_KEY`

## 6. Starta dev-servern

```bash
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000)

## 7. Deploya till Vercel

```bash
npx vercel
```

Lägg till alla miljövariabler i Vercel-dashboarden.
Uppdatera `NEXT_PUBLIC_SITE_URL` till din Vercel-domän.
Uppdatera Stripe webhook-URL:en.

## Månadsvis återställning av analyskvot

Lägg till ett cron-jobb i Supabase (Dashboard → Edge Functions) eller använd
Vercel Cron som anropar en `/api/cron/reset-usage` route första dagen varje månad.
