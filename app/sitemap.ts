import type { MetadataRoute } from 'next'
import { contractGuides } from '@/lib/seo/contract-types'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kollakontraktet.se'

  const staticPages = ['', '/pricing', '/avtal', '/login', '/privacy', '/terms'].map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.7,
  }))

  const guidePages = contractGuides.map(g => ({
    url: `${base}/avtal/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...guidePages]
}
