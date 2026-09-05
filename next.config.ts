import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages (loses API routes, but site is marketing-focused)
  output: 'export',
  // The /api/inquiry route is excluded from static export via dynamic = 'force-static' below
  trailingSlash: true,
  // SEO: 301-redirect deprecated /for-* slugs to the 6-solution IA URLs.
  // Both /<old> and /<old>/ forms are covered; trailingSlash: true keeps the canonical with slash.
  async redirects() {
    return [
      { source: '/for-events', destination: '/event-festivals-conferences', permanent: true },
      { source: '/for-events/', destination: '/event-festivals-conferences/', permanent: true },
      { source: '/for-corporate', destination: '/corporate-organization-apparel', permanent: true },
      { source: '/for-corporate/', destination: '/corporate-organization-apparel/', permanent: true },
      // /for-camp/ — original /summer-camp-shirts/ is deleted; fall back to Events.
      { source: '/for-camp', destination: '/event-festivals-conferences', permanent: true },
      { source: '/for-camp/', destination: '/event-festivals-conferences/', permanent: true },
      { source: '/for-communities', destination: '/e-commerce-fulfillment', permanent: true },
      { source: '/for-communities/', destination: '/e-commerce-fulfillment/', permanent: true },
      { source: '/for-brands', destination: '/apparel-brands-agencies', permanent: true },
      { source: '/for-brands/', destination: '/apparel-brands-agencies/', permanent: true },
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
    optimizePackageImports: ['lucide-react'],
  },
  // Note: Next.js 16 hardcodes `require("../build/polyfills/polyfill-module")`
  // in client/app-globals.js — Turbopack's resolveAlias can't redirect it.
  // We patch the file directly in scripts/patch-next-polyfill.mjs
  // (run automatically via pnpm postinstall). The polyfills it provides
  // (Array.prototype.at, Object.fromEntries, Object.hasOwn, etc.) are
  // all Baseline — already supported by every browser in our browserslist.
  // This drops ~13.5 KiB from the initial client bundle on every page.
  // Edge cache & security headers are configured in `public/_headers`
  // (Next.js output:export does not support headers() — must be a static file)
};

export default nextConfig;
