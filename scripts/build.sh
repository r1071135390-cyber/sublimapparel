#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

echo "Installing dependencies..."
pnpm install --prefer-frozen-lockfile --prefer-offline --loglevel debug --reporter=append-only

# 2026-09-14 (R64 follow-up): pre-generate the SublimApparel blog
# RSS feed as a static XML file under public/blog/feed.xml/index.xml.
# We can NOT use a Next.js `route.ts` handler for this — `output: export`
# silently skips generating files for any URL path that contains a dot
# extension like `.xml`, so /blog/feed.xml/ stays a 404 even after a
# clean build. The script reads the same `blogPosts` source the route
# handler used and emits a byte-equivalent body to public/blog/feed.xml/
# which `next build` then copies verbatim into out/blog/feed.xml/index.xml
# (Next.js copies everything under public/ to out/ at the start of every
# build). Run this BEFORE next build so the file is in place when the
# export step copies public/ → out/.
echo "Generating static RSS feed..."
node scripts/build-rss.mjs

echo "Building the Next.js project (static export)..."
pnpm next build

echo "Inlining CSS into HTML (eliminates render-blocking CSS)..."
node scripts/inline-css.mjs

echo "Injecting authoritative outbound links for SEO..."
node scripts/auto-external-links.mjs

# 2026-09-11 (Round 4 follow-up): ensure every HTML page has the site-wide
# JSON-LD @graph + page-level schemas. Next.js 16's <JsonLd> component
# does not always render in static export, so we inject directly into the
# HTML before </head> as a guarantee. Idempotent.
# IMPORTANT: must run AFTER auto-external-links.mjs, because that script
# re-parses the HTML with cheerio (which can strip data-* attributes from
# script tags). Running inject last means our markers + content survive
# intact and can be detected on re-runs.
# Wrap in `|| true` so a failure here does NOT abort the rest of the
# build (e.g. tsup bundle) — the worst case is the same as before this
# step existed (no injected JSON-LD), which is strictly better than a
# failed deploy.
echo "Injecting JSON-LD structured data into HTML..."
node scripts/inject-json-ld.mjs || { echo "[build.sh] WARN: inject-json-ld.mjs failed — continuing without injected JSON-LD"; true; }

# Only bundle the custom server when not on Vercel/Cloudflare (where static export is served directly)
if [ -z "${VERCEL:-}" ] && [ -z "${CF_PAGES:-}" ]; then
  echo "Bundling custom server with tsup..."
  pnpm tsup src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify
else
  echo "Skipping tsup bundle (static deployment detected)"
fi

echo "Build completed successfully!"
