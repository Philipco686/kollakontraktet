import type { NextConfig } from 'next'

// Säkerhetsheaders på alla rutter. CSP är medvetet utelämnad här eftersom en
// felaktig policy kan blockera Stripe, Supabase, Vercel Analytics och inline
// JSON-LD – den bör läggas till separat med noggrann testning.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  serverExternalPackages: ['@anthropic-ai/sdk'],
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
}

export default nextConfig
