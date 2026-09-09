import type { Metadata } from 'next'

// Prissidan är en klientkomponent och kan inte exportera metadata själv,
// så canonical sätts här i en server-layout för rutten.
export const metadata: Metadata = {
  title: 'Priser – Kolla Kontraktet',
  description: 'Enkla, transparenta priser. Engångsanalys 49 kr, Personlig 149 kr/mån, Företag 499 kr/mån. Avsluta när du vill.',
  alternates: { canonical: '/pricing' },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
