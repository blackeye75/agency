import type { NextConfig } from 'next'

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : '*.supabase.co'

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Styles ship inside the HTML, so first-time visitors (most search traffic) skip three render-blocking requests.
  experimental: { inlineCss: true },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: supabaseHost, pathname: '/storage/v1/object/public/**' }],
  },
  // One canonical host: nexusbee.in → www.nexusbee.in (Vercel already forces https; Next strips trailing slashes).
  async redirects() {
    return [
      { source: '/:path*', has: [{ type: 'host', value: 'nexusbee.in' }], destination: 'https://www.nexusbee.in/:path*', permanent: true },
      // Nine services became five in October 2026; old service URLs keep their rankings via permanent redirects.
      ...['corporate-web-design', 'web-software-apps', 'e-commerce', 'mobile-apps'].map((slug) => ({ source: `/services/${slug}`, destination: '/services/website-app-development', permanent: true })),
      { source: '/services/business-automation', destination: '/services/ai-agents-automation', permanent: true },
    ]
  },
}

export default nextConfig
