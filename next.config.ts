import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages (loses API routes, but site is marketing-focused)
  output: 'export',
  // The /api/inquiry route is excluded from static export via dynamic = 'force-static' below
  trailingSlash: true,
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
};

export default nextConfig;
