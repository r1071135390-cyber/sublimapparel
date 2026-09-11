#!/usr/bin/env node
// inject-json-ld.mjs
//
// Post-build JSON-LD injector for Next.js `output: 'export'` static sites.
//
// Problem: Next.js 16 renders most <JsonLd> components to <script> tags inside
// <body>, but page-level schemas that use the *non-@graph* (legacy) JsonLd path
// sometimes get dropped during static export, AND we want a single guarantee
// that every page has the site-wide @graph (Organization, WebSite, etc.) so
// Google Rich Results and other crawlers can always read them.
//
// This script:
//   1. Walks the out/ directory
//   2. For every *.html file, ensures exactly two JSON-LD blocks are present
//      right before </head>:
//        a) the site-wide layout @graph (Organization + WebSite + LocalBusiness
//           + Person + FAQPage + Article), with data-jsonld-source="layout"
//        b) a per-page @graph (BreadcrumbList, Service, FAQ, etc.),
//           with data-jsonld-source="page" — only if there's a registered
//           schema for that file path
//   3. Idempotent: re-running won't double-inject (the data-jsonld-injected
//      marker prevents it).
//
// Source of truth: scripts/json-ld-registry.mjs
//
// Why a separate script: assemble-out.mjs is a full local-dev pipeline that
// copies .next/server/app → out/ and runs critters etc. Cloudflare Pages
// builds with `pnpm next build` directly, which already populates out/ via
// output:export. We just need the JSON-LD injection step, so a tiny
// standalone script is the cleanest integration point for build.sh.

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { getLayoutGraph, getPageSchemas } from "./json-ld-registry.mjs";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "out");

if (!fs.existsSync(OUT)) {
  console.error(`[inject-json-ld] out/ not found at ${OUT} — did next build run?`);
  process.exit(0); // non-fatal: don't break the build
}

console.log("[inject-json-ld] Scanning out/ for HTML files...");
const htmlFiles = execSync(`find "${OUT}" -name "*.html" -type f`, {
  stdio: ["pipe", "pipe", "ignore"],
})
  .toString()
  .trim()
  .split("\n")
  .filter(Boolean);

console.log(`[inject-json-ld] ${htmlFiles.length} HTML files found`);

const layoutGraph = getLayoutGraph();
let injectedCount = 0;
let skippedCount = 0;
let failedCount = 0;

for (const htmlPath of htmlFiles) {
  try {
    let html = fs.readFileSync(htmlPath, "utf-8");

    // Idempotency guard: skip pages we've already injected on a previous run
    if (html.includes("data-jsonld-injected=\"1\"")) {
      skippedCount++;
      continue;
    }

    // Both blocks share a single @graph wrapper in the layout case for cleaner
    // Google parsing, and we use a separate @graph wrapper for page-level
    // schemas so each can be validated independently.
    const scripts = [];

    // 1) Layout @graph — every page gets this (organization, website, etc.)
    scripts.push(
      `<script type="application/ld+json" data-jsonld-injected="1" data-jsonld-source="layout">${JSON.stringify(layoutGraph)}</script>`
    );

    // 2) Page-level schemas (BreadcrumbList, Service, FAQ, etc.)
    const relPath = path.relative(OUT, htmlPath);
    const pageSchemas = getPageSchemas(relPath);
    if (pageSchemas.length > 0) {
      scripts.push(
        `<script type="application/ld+json" data-jsonld-injected="1" data-jsonld-source="page">${JSON.stringify({
          "@context": "https://schema.org",
          "@graph": pageSchemas,
        })}</script>`
      );
    }

    const injection = scripts.join("");

    if (!html.includes("</head>")) {
      console.warn(`[inject-json-ld] no </head> in ${relPath}, skipping`);
      failedCount++;
      continue;
    }

    html = html.replace("</head>", `${injection}</head>`);
    fs.writeFileSync(htmlPath, html);
    injectedCount++;
  } catch (e) {
    console.warn(`[inject-json-ld] failed for ${htmlPath}: ${e.message}`);
    failedCount++;
  }
}

console.log(
  `[inject-json-ld] Done. injected=${injectedCount} skipped=${skippedCount} failed=${failedCount}`
);
