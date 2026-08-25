#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

echo "Installing dependencies..."
pnpm install --prefer-frozen-lockfile --prefer-offline --loglevel debug --reporter=append-only

echo "Building the Next.js project (static export)..."
pnpm next build

# Only bundle the custom server when not on Vercel/Cloudflare (where static export is served directly)
if [ -z "${VERCEL:-}" ] && [ -z "${CF_PAGES:-}" ]; then
  echo "Bundling custom server with tsup..."
  pnpm tsup src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify
else
  echo "Skipping tsup bundle (static deployment detected)"
fi

echo "Build completed successfully!"
