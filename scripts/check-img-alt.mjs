#!/usr/bin/env node
// scripts/check-img-alt.mjs
// Scan Next.js page.tsx and component .tsx files for <Image> tags missing alt.
import fs from "node:fs";
import path from "node:path";

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name.endsWith(".tsx") || e.name.endsWith(".ts")) out.push(full);
  }
  return out;
}

const files = walk(path.resolve("src"));
let bad = 0;
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  // Find <Image ... /> blocks
  const re = /<Image\b([\s\S]*?)\/?>/g;
  let m;
  while ((m = re.exec(src))) {
    const block = m[1];
    // Check for alt={...} or alt="..."
    if (!/\balt\s*=\s*(\{|"|')/.test(block)) {
      const line = src.substring(0, m.index).split("\n").length;
      const snippet = block.replace(/\s+/g, " ").trim().slice(0, 100);
      console.log(`  ${path.relative(".", f)}:${line}  MISSING alt — ${snippet}`);
      bad++;
    }
  }
}
console.log(`\n${bad} <Image> tags missing alt in src/`);
