#!/usr/bin/env node
// Build assembler — copies generated HTML from .next/server/app to out/
// Bypasses Turbopack build deadlock by using the .next artifacts that did generate
// Also copies static assets, public/, and the latest TSV docs.

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const ROOT = process.cwd();
const NEXT_APP = path.join(ROOT, ".next/server/app");
const OUT = path.join(ROOT, "out");
const PUBLIC_DIR = path.join(ROOT, "public");

console.log("🔧 Assembling out/ directory from .next artifacts...");
console.log(`   src = ${NEXT_APP}`);
console.log(`   dst = ${OUT}`);

// 1. clean out/ but preserve _headers and key public files
console.log("\n[1/5] Cleaning out/ (preserving public files)...");
if (fs.existsSync(OUT)) {
  execSync(`rm -rf "${OUT}"`);
}
fs.mkdirSync(OUT, { recursive: true });

// 2. Copy .next/server/app HTML + .meta + .rsc + .segments to out/
console.log("[2/5] Copying app HTML files...");
function copyDir(src, dst) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else if (
      entry.name.endsWith(".html") ||
      entry.name.endsWith(".meta") ||
      entry.name.endsWith(".rsc") ||
      entry.name.endsWith(".txt") ||
      entry.name.endsWith(".body")
    ) {
      fs.copyFileSync(s, d);
    }
  }
}
copyDir(NEXT_APP, OUT);

// Copy full static assets (JS, CSS, fonts) — for app HTML pages only
function copyStaticDir(src, dst) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      copyStaticDir(s, d);
    } else {
      // Copy ALL static files (js, css, woff, woff2, etc.)
      fs.copyFileSync(s, d);
    }
  }
}

// 3. Apply trailing slash convention: app/page.tsx → out/page.html
// Cloudflare Pages with trailingSlash:true serves out/page.html at /
// We need to create the right structure: out/blog.html (not out/blog/index.html)
// Actually for static export with trailingSlash, Next generates app/blog/page.tsx → out/blog.html
// Cloudflare Pages will serve /blog/ → blog.html automatically when trailingSlash is on

// 4. Copy static assets (all .js, .css, .woff, etc.)
console.log("[3/5] Copying .next/static/ to out/_next/static/...");
const nextStatic = path.join(ROOT, ".next/static");
const outStatic = path.join(OUT, "_next/static");
if (fs.existsSync(nextStatic)) {
  copyStaticDir(nextStatic, outStatic);
}

// 5. Copy public/ (all files including subdirs)
console.log("[4/5] Copying public/ to out/...");
if (fs.existsSync(PUBLIC_DIR)) {
  for (const entry of fs.readdirSync(PUBLIC_DIR, { withFileTypes: true })) {
    const s = path.join(PUBLIC_DIR, entry.name);
    const d = path.join(OUT, entry.name);
    if (entry.name.startsWith(".")) continue; // skip hidden
    if (entry.isDirectory()) {
      copyStaticDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

// 6. Inline critical CSS via critters (reduces render-blocking CSS)
console.log("[5/6] Inlining critical CSS via critters...");
try {
  const Critters = (await import("critters")).default;
  const critters = new Critters({
    path: OUT,
    publicPath: "/",
    preload: "swap",
    fonts: false, // don't preload woff
    pruneSource: true, // remove unused selectors
    logLevel: "warn",
  });
  const htmlFiles = execSync(`find ${OUT} -name "*.html"`).toString().trim().split("\n").filter(Boolean);
  let inlinedCount = 0;
  for (const htmlPath of htmlFiles) {
    const html = fs.readFileSync(htmlPath, "utf-8");
    const result = await critters.process(html);
    if (result !== html) {
      fs.writeFileSync(htmlPath, result);
      inlinedCount++;
    }
  }
  console.log(`   ${inlinedCount} HTML files processed`);
} catch (e) {
  console.warn("   critters failed (non-fatal):", e.message);
}

// 7. Generate sitemap.xml + robots.txt
console.log("[6/6] Generating sitemap.xml + robots.txt...");
try {
  execSync("node scripts/gen-sitemap-robots.mjs", { stdio: "inherit" });
} catch (e) {
  console.warn("   sitemap gen failed (non-fatal):", e.message);
}

// 8. Add fetchpriority="high" to LCP image preloads (Next.js 16 doesn't always emit it)
console.log("[7/7] Adding fetchpriority=\"high\" to LCP image preloads...");
try {
  const lcpImages = ["/hero-jersey.webp"];
  const htmlFiles7 = execSync(`find ${OUT} -name "*.html"`).toString().trim().split("\n").filter(Boolean);
  let fixCount = 0;
  for (const htmlPath of htmlFiles7) {
    let html = fs.readFileSync(htmlPath, "utf-8");
    let changed = false;
    for (const lcp of lcpImages) {
      // Add fetchpriority="high" to preload link if missing
      const re1 = new RegExp(`<link rel="preload"([^>]*href="${lcp.replace(/\./g, "\\.")}"[^>]*)>`, "g");
      if (re1.test(html) && !html.match(re1)?.[0]?.includes("fetchpriority")) {
        html = html.replace(re1, (m) => m.replace(">", ' fetchpriority="high">'));
        changed = true;
      }
      // Add fetchpriority="high" to img tag if missing
      const re2 = new RegExp(`<img([^>]*src="${lcp.replace(/\./g, "\\.")}"[^>]*)>`, "g");
      if (re2.test(html) && !html.match(re2)?.[0]?.includes("fetchpriority")) {
        html = html.replace(re2, (m) => m.replace(/<img/, '<img fetchpriority="high"'));
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(htmlPath, html);
      fixCount++;
    }
  }
  console.log(`   ${fixCount} HTML files updated with fetchpriority="high"`);
} catch (e) {
  console.warn("   fetchpriority fix failed (non-fatal):", e.message);
}

console.log("\n✅ out/ assembled");
console.log(`   HTML files: ${execSync(`find ${OUT} -name "*.html" | wc -l`).toString().trim()}`);
console.log(`   Total entries: ${fs.readdirSync(OUT).length}`);
