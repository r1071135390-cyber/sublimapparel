#!/usr/bin/env node
// scripts/check-industries-desc.mjs
// Read every /industries/*/page.tsx file, report the metaDescription length.
import fs from "node:fs";
import path from "node:path";

const root = path.resolve("src/app/industries");
const files = fs.readdirSync(root)
  .filter((d) => fs.statSync(path.join(root, d)).isDirectory())
  .map((d) => path.join(root, d, "page.tsx"))
  .filter((f) => fs.existsSync(f));

let bad = 0;
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  // match: metaDescription:\n    "..."
  const m = src.match(/metaDescription:\s*\n?\s*"([^"]+)"/);
  if (!m) { console.log(`  ${path.basename(path.dirname(f)).padEnd(45)} NO metaDescription`); continue; }
  const desc = m[1].replace(/\\"/g, '"');
  const flag = desc.length > 160 ? "⚠ >160" : (desc.length < 70 ? "⚠ <70" : "✓");
  if (desc.length > 160) bad++;
  console.log(`  ${path.basename(path.dirname(f)).padEnd(45)} ${desc.length.toString().padStart(3)}ch ${flag}`);
  if (desc.length > 160) {
    console.log(`    → ${desc}`);
  }
}
console.log(`\n${bad} descriptions over 160 chars`);
