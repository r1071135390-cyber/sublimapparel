// scripts/check-raw-img.mjs
// Audit raw <img> tags in src/ for missing alt or lazy loading hints.
// Next.js <Image> handles these for us, but raw <img> tags do not.

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "..", "src");

function walk(dir, out = []) {
  for (const ent of readdirSync(dir)) {
    const p = join(dir, ent);
    const s = statSync(p);
    if (s.isDirectory()) {
      // skip node_modules and .next if present
      if (ent === "node_modules" || ent === ".next") continue;
      walk(p, out);
    } else {
      const ext = extname(p);
      if ([".tsx", ".ts", ".jsx", ".js"].includes(ext)) out.push(p);
    }
  }
  return out;
}

const files = walk(SRC);
let totalRaw = 0;
let missingAlt = 0;
let emptyAlt = 0;
let missingLoadingLazy = 0;
let missingWidthOrHeight = 0;
const issues = [];

for (const file of files) {
  const txt = readFileSync(file, "utf8");
  // Match only <img ... > opening tags (not <Image>)
  const re = /<img\b([^>]*?)\/?>/g;
  let m;
  while ((m = re.exec(txt)) !== null) {
    totalRaw++;
    const attrs = m[1];

    // pull alt="..." or alt='...' or alt={...}
    const altMatch = attrs.match(/\balt\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\})/);
    const hasAlt = !!altMatch;
    const altVal = altMatch ? (altMatch[1] ?? altMatch[2] ?? altMatch[3] ?? "") : null;
    if (!hasAlt) {
      missingAlt++;
      issues.push({ file, kind: "missing-alt", snippet: m[0].slice(0, 120) });
    } else if (altVal === "" || (typeof altVal === "string" && altVal.trim() === "")) {
      emptyAlt++;
    }

    // loading attribute
    const hasLoading = /\bloading\s*=/.test(attrs);
    if (!hasLoading) {
      missingLoadingLazy++;
      issues.push({ file, kind: "no-loading", snippet: m[0].slice(0, 120) });
    }

    // width/height (CLS)
    const hasWidth = /\bwidth\s*=/.test(attrs);
    const hasHeight = /\bheight\s*=/.test(attrs);
    if (!hasWidth && !hasHeight) {
      missingWidthOrHeight++;
      issues.push({ file, kind: "no-wh", snippet: m[0].slice(0, 120) });
    }
  }
}

console.log("Total raw <img> tags in src/:", totalRaw);
console.log("  missing alt:        ", missingAlt);
console.log("  empty alt (decorative):", emptyAlt);
console.log("  no loading attr:    ", missingLoadingLazy);
console.log("  no width/height:    ", missingWidthOrHeight);
if (issues.length) {
  console.log("\nIssues:");
  for (const i of issues) {
    console.log(`  [${i.kind}] ${i.file.replace(SRC, "src/")}`);
    console.log(`    > ${i.snippet}`);
  }
}
