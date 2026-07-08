import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const PLANS = {
  personal: {
    name: 'Personlig',
    price: 149,
    priceId: process.env.STRIPE_PRICE_PERSONAL!,
    analyses: 5,
    description: '5 analyser per månad',
    features: [
      '5 avtalsanalyser per månad',
      'Fullständig klausulgenomgång',
      'Riskbedömning',
      'PDF-export',
    ],
  },
  business: {
    name: 'Företag',
    price: 499,
    priceId: process.env.STRIPE_PRICE_BUSINESS!,
    analyses: Infinity,
    description: 'Obegränsade analyser, upp till 5 användare',
    features: [
      'Obegränsade avtalsanalyser',
      'Upp till 5 teammedlemmar',
      'Prioriterad support',
      'API-åtkomst (snart)',
      'Anpassad rapportering',
    ],
  },
  onetime: {
    name: 'Engångsanalys',
    price: 49,
    priceId: process.env.STRIPE_PRICE_ONETIME!,
    analyses: 1,
    description: 'En analys utan prenumeration',
    features: [
      '1 fullständig avtalsanalys',
      'Klausulgenomgång',
      'Riskbedömning',
      'Giltig i 30 dagar',
    ],
  },
} as const
