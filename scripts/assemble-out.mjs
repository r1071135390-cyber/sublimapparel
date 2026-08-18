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
    } else if (entry.name.endsWith(".html") || entry.name.endsWith(".meta") || entry.name.endsWith(".rsc")) {
      fs.copyFileSync(s, d);
    }
  }
}
copyDir(NEXT_APP, OUT);

// 3. Apply trailing slash convention: app/page.tsx → out/page.html
// Cloudflare Pages with trailingSlash:true serves out/page.html at /
// We need to create the right structure: out/blog.html (not out/blog/index.html)
// Actually for static export with trailingSlash, Next generates app/blog/page.tsx → out/blog.html
// Cloudflare Pages will serve /blog/ → blog.html automatically when trailingSlash is on

// 4. Copy static assets
console.log("[3/5] Copying .next/static/ to out/_next/static/...");
const nextStatic = path.join(ROOT, ".next/static");
const outStatic = path.join(OUT, "_next/static");
if (fs.existsSync(nextStatic)) {
  copyDir(nextStatic, outStatic);
}

// 5. Copy public/
console.log("[4/5] Copying public/ to out/...");
if (fs.existsSync(PUBLIC_DIR)) {
  for (const entry of fs.readdirSync(PUBLIC_DIR, { withFileTypes: true })) {
    const s = path.join(PUBLIC_DIR, entry.name);
    const d = path.join(OUT, entry.name);
    if (entry.name.startsWith(".")) continue; // skip hidden
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

// 6. Generate sitemap.xml + robots.txt
console.log("[5/5] Generating sitemap.xml + robots.txt...");
try {
  execSync("node scripts/gen-sitemap-robots.mjs", { stdio: "inherit" });
} catch (e) {
  console.warn("   sitemap gen failed (non-fatal):", e.message);
}

console.log("\n✅ out/ assembled");
console.log(`   HTML files: ${execSync(`find ${OUT} -name "*.html" | wc -l`).toString().trim()}`);
console.log(`   Total entries: ${fs.readdirSync(OUT).length}`);
