import type { MetadataRoute } from 'next'
import { contractGuides } from '@/lib/seo/contract-types'
import { SITE_URL } from '@/lib/site'

// Fast datum – uppdatera när sidornas innehåll faktiskt ändras. (Att sätta
// new Date() gav "senast ändrad = nu" på varje sida, en meningslös signal.)
const LAST_UPDATED = new Date('2026-09-09')

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_URL

  // /login utelämnad medvetet – transaktionell inloggningssida utan indexvärde.
  const staticPages = ['', '/pricing', '/avtal', '/privacy', '/terms'].map(path => ({
    url: `${base}${path || '/'}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }))

  const guidePages = contractGuides.map(g => ({
    url: `${base}/avtal/${g.slug}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...guidePages]
}
