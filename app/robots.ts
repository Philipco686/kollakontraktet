import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.kollakontraktet.se'
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/analyze', '/history', '/team', '/api/'],
    },
    sitemap: `${base}/sitemap.xml`,
  }
}
