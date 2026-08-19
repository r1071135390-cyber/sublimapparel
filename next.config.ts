import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages (loses API routes, but site is marketing-focused)
  output: 'export',
  // The /api/inquiry route is excluded from static export via dynamic = 'force-static' below
  trailingSlash: true,
  // SEO: 301-redirect deprecated /for-* slugs to the strategic /solutions/* URLs.
  // Both /<old> and /<old>/ forms are covered; trailingSlash: true keeps the canonical with slash.
  async redirects() {
    return [
      { source: '/for-events', destination: '/event-apparel', permanent: true },
      { source: '/for-events/', destination: '/event-apparel/', permanent: true },
      { source: '/for-corporate', destination: '/corporate-event-apparel', permanent: true },
      { source: '/for-corporate/', destination: '/corporate-event-apparel/', permanent: true },
      { source: '/for-camp', destination: '/summer-camp-shirts', permanent: true },
      { source: '/for-camp/', destination: '/summer-camp-shirts/', permanent: true },
      { source: '/for-communities', destination: '/organization-apparel', permanent: true },
      { source: '/for-communities/', destination: '/organization-apparel/', permanent: true },
      { source: '/for-brands', destination: '/private-label-sportswear', permanent: true },
      { source: '/for-brands/', destination: '/private-label-sportswear/', permanent: true },
    ];
  },
  images: {
    unoptimized: true, // Required for static export (no Next.js image optimization server)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        pathname: '/**',
      },
    ],
  },
  // Allow Coze dev origin (sandbox only)
  allowedDevOrigins: ['*.dev.coze.site'],
  // P0-1 fix: strip data-inspector-* debug attributes and source-path leaks from production HTML
  compiler: {
    reactRemoveProperties: { properties: ['^data-inspector-'] },
    removeConsole: { exclude: ['error'] },
  },
  // Performance: enable modern image format hints + experimental CSS optimization
  experimental: {
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },
  // Edge cache & security headers are configured in `public/_headers`
  // (Next.js output:export does not support headers() — must be a static file)
};

export default nextConfig;
