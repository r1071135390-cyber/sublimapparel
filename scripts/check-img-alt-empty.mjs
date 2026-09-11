#!/usr/bin/env node
// scripts/check-img-alt-empty.mjs
// Find <Image> tags with empty alt="" (decorative, OK) or alt={""} (also OK)
// vs alt={undefined} or hard-coded short alts.
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
let total = 0, empty = 0, short = 0;
for (const f of files) {
  const src = fs.readFileSync(f, "utf8");
  const re = /<Image\b([\s\S]*?)\/?>/g;
  let m;
  while ((m = re.exec(src))) {
    total++;
    const block = m[1];
    const am = block.match(/\balt\s*=\s*(\{([^}]*)\}|"([^"]*)")/);
    if (!am) continue; // missing alt checked elsewhere
    const val = (am[2] ?? am[3] ?? "").trim();
    if (val === "" || val === '""' || val === "''") empty++;
    else if (val.length < 10) short++;
  }
}
console.log(`Total <Image> tags: ${total}`);
console.log(`Empty alt (decorative): ${empty}`);
console.log(`Alt < 10 chars: ${short}`);
