#!/usr/bin/env node
// inject-json-ld.mjs
//
// Post-build page-level JSON-LD injector for Next.js `output: 'export'`
// static sites.
//
// What this does:
//   The site-wide @graph (Organization, WebSite, LocalBusiness, Person,
//   FAQPage, Article) is already rendered into every page by the layout's
//   <JsonLd> component. This script's job is just to add PAGE-LEVEL
//   schemas that are NOT rendered by React (notably BreadcrumbList for
//   pages that don't have a dedicated page-level JsonLd component).
//
// Why a separate script:
//   Next.js 16 App Router does not reliably render arbitrary
//   <script type="application/ld+json"> from React <script> components
//   into static-exported HTML. To guarantee every page has the right
//   page-level schema (BreadcrumbList, etc.), we inject it at build time
//   directly into the HTML before </head>. Cloudflare Pages runs this
//   via `scripts/build.sh` → `node scripts/inject-json-ld.mjs`.
//
// Idempotency:
//   Uses a content-based fingerprint of the registry's @id so re-runs
//   don't double-inject, even if data-* attributes get stripped by
//   intermediate HTML re-processors (e.g. cheerio in
//   auto-external-links.mjs).
//
// Source of truth: scripts/json-ld-registry.mjs

import fs from "node:fs";
import path from "node:path";
import { getPageSchemas, getRegistryFingerprint } from "./json-ld-registry.mjs";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "out");

if (!fs.existsSync(OUT)) {
  console.error(`[inject-json-ld] out/ not found at ${OUT} — did next build run?`);
  process.exit(0); // non-fatal: don't break the build
}

/**
 * Recursively collect all .html files under `dir`. Cross-platform
 * alternative to `find ... -name "*.html"`.
 */
function collectHtmlFiles(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length > 0) {
    const current = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch (e) {
      console.warn(`[inject-json-ld] cannot read ${current}: ${e.message}`);
      continue;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(full);
      } else if (entry.isFile() && entry.name.endsWith(".html")) {
        out.push(full);
      }
    }
  }
  return out;
}

console.log("[inject-json-ld] Scanning out/ for HTML files...");
const htmlFiles = collectHtmlFiles(OUT);
console.log(`[inject-json-ld] ${htmlFiles.length} HTML files found`);

// Content-level fingerprint used to detect pages that this script
// has already injected on a previous run. We embed a unique marker
// in the JSON content of the page-level schema so the fingerprint
// is robust against data-* attribute stripping.
const FINGERPRINT = getRegistryFingerprint();

let injectedCount = 0;
let skippedCount = 0;
let noSchemaCount = 0;
let failedCount = 0;

for (const htmlPath of htmlFiles) {
  const relPath = path.relative(OUT, htmlPath);
  try {
    let html = fs.readFileSync(htmlPath, "utf-8");

    // Idempotency: skip pages we've already injected.
    // Three redundant checks so the script stays correct even if
    // some HTML re-processor strips data-* attributes.
    const alreadyInjected =
      html.includes(`data-jsonld-fp="${FINGERPRINT}"`) ||
      html.includes('data-jsonld-source="page-injected"') ||
      html.includes(`"@id":"${FINGERPRINT}-`);
    if (alreadyInjected) {
      skippedCount++;
      continue;
    }

    // Page-level schemas from the registry.
    const pageSchemas = getPageSchemas(relPath);
    if (pageSchemas.length === 0) {
      noSchemaCount++;
      continue;
    }

    // Build the script tag. The data-jsonld-source attribute is
    // used for idempotency. We also embed the registry fingerprint
    // in a custom @id on the graph wrapper so even if data attributes
    // get stripped, re-runs can still detect prior injection via
    // content matching. The custom @id is at the wrapper level (not
    // inside any @type), so Google ignores it; it's a valid property
    // for the @graph's @id field per schema.org.
    const payload = {
      "@context": "https://schema.org",
      "@id": `${FINGERPRINT}-${relPath.replace(/[^a-z0-9]/gi, "-")}`,
      "@graph": pageSchemas,
    };
    const injection = `<script type="application/ld+json" data-jsonld-source="page-injected" data-jsonld-fp="${FINGERPRINT}">${JSON.stringify(payload)}</script>`;

    if (!html.includes("</head>")) {
      console.warn(`[inject-json-ld] no </head> in ${relPath}, skipping`);
      failedCount++;
      continue;
    }

    html = html.replace("</head>", `${injection}</head>`);
    fs.writeFileSync(htmlPath, html);
    injectedCount++;
    console.log(
      `[inject-json-ld] + ${relPath} (${pageSchemas.length} schema${pageSchemas.length === 1 ? "" : "s"})`
    );
  } catch (e) {
    console.warn(`[inject-json-ld] FAILED for ${relPath}: ${e.message}`);
    failedCount++;
  }
}

console.log(
  `[inject-json-ld] Done. injected=${injectedCount} skipped=${skippedCount} no-schema=${noSchemaCount} failed=${failedCount}`
);
if (failedCount > 0) {
  // Non-zero exit so build.sh's `||` warning fires and we know
  // something went wrong in the Cloudflare build log.
  process.exit(1);
}
