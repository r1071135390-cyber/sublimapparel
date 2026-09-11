#!/usr/bin/env node
// scripts/check-meta.mjs
// Check title/description length for a list of pages
import fs from "node:fs";
import path from "node:path";

const targets = [
  ["src/app/cases/page.tsx", "buildPageMetadata"],
  ["src/app/terms/page.tsx", "buildPageMetadata"],
  ["src/app/privacy/page.tsx", "buildPageMetadata"],
  ["src/app/shipping-policy/page.tsx", "buildPageMetadata"],
  ["src/app/compare/sublimation-vs-dtg/page.tsx", "buildPageMetadata"],
  ["src/app/compare/ddp-vs-fob/page.tsx", "buildPageMetadata"],
  ["src/app/production/page.tsx", "buildPageMetadata"],
  ["src/app/samples/page.tsx", "buildPageMetadata"],
  ["src/app/shipping/us-warehouse/page.tsx", "buildPageMetadata"],
  ["src/app/site-map/page.tsx", "buildPageMetadata"],
  ["src/app/compare/ddp-vs-fob/page.tsx", "buildPageMetadata"],
  ["src/app/pricing/page.tsx", "buildPageMetadata"],
];

for (const [file, _] of targets) {
  if (!fs.existsSync(file)) { console.log(`  ${file} — NOT FOUND`); continue; }
  const src = fs.readFileSync(file, "utf8");
  const tm = src.match(/title:\s*"([^"]+)"/);
  const dm = src.match(/description:\s*"([^"]+)"/);
  const title = tm ? tm[1] : "(none)";
  const desc = dm ? dm[1] : "(none)";
  const tflag = title.length > 60 ? "⚠ >60" : (title.length < 20 ? "⚠ <20" : "✓");
  const dflag = desc.length > 160 ? "⚠ >160" : (desc.length < 70 ? "⚠ <70" : "✓");
  console.log(`  ${path.basename(file).padEnd(15)} title=${title.length.toString().padStart(3)}ch ${tflag}  desc=${desc.length.toString().padStart(3)}ch ${dflag}`);
  if (title.length > 60 || title.length < 20) console.log(`    title: ${title}`);
  if (desc.length > 160 || (desc.length > 0 && desc.length < 70)) console.log(`    desc:  ${desc}`);
}
