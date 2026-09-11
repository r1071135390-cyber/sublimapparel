#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

echo "Installing dependencies..."
pnpm install --prefer-frozen-lockfile --prefer-offline --loglevel debug --reporter=append-only

echo "Building the Next.js project (static export)..."
pnpm next build

echo "Inlining CSS into HTML (eliminates render-blocking CSS)..."
node scripts/inline-css.mjs

# 2026-09-11 (Round 4 follow-up): ensure every HTML page has the site-wide
# JSON-LD @graph + page-level schemas. Next.js 16's <JsonLd> component
# does not always render in static export, so we inject directly into the
# HTML before </head> as a guarantee. Idempotent.
# Wrap in `|| true` so a failure here does NOT abort the rest of the
# build (e.g. tsup bundle) — the worst case is the same as before this
# step existed (no injected JSON-LD), which is strictly better than a
# failed deploy.
echo "Injecting JSON-LD structured data into HTML..."
node scripts/inject-json-ld.mjs || { echo "[build.sh] WARN: inject-json-ld.mjs failed — continuing without injected JSON-LD"; true; }

echo "Injecting authoritative outbound links for SEO..."
node scripts/auto-external-links.mjs

# Only bundle the custom server when not on Vercel/Cloudflare (where static export is served directly)
if [ -z "${VERCEL:-}" ] && [ -z "${CF_PAGES:-}" ]; then
  echo "Bundling custom server with tsup..."
  pnpm tsup src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify
else
  echo "Skipping tsup bundle (static deployment detected)"
fi

echo "Build completed successfully!"
