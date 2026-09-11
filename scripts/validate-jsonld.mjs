// scripts/validate-jsonld.mjs
// Validates the static JSON-LD <script> blocks in src/ parse correctly.
// Catches unbalanced braces, missing quotes, trailing commas, etc. that
// would silently break the page when the browser tries to JSON.parse it.
// Skips <JsonLd data={...}> blocks (template literals are valid JS, not JSON).

import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "..", "src");

function walk(dir, out = []) {
  for (const ent of readdirSync(dir)) {
    const p = join(dir, ent);
    if (statSync(p).isDirectory()) {
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
let total = 0;
let errors = 0;
const errorDetails = [];

for (const file of files) {
  const txt = readFileSync(file, "utf8");

  // Capture <script type="application/ld+json">...</script> blocks
  const blockRe = /<script\s+type=["']application\/ld\+json["']\s*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = blockRe.exec(txt)) !== null) {
    total++;
    const body = m[1];
    try {
      const cleaned = body
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^\s*\/\/.*$/gm, "");
      JSON.parse(cleaned);
    } catch (e) {
      errors++;
      errorDetails.push({
        file: file.replace(SRC, "src/"),
        err: e.message,
        snippet: body.slice(0, 200),
      });
    }
  }
}

console.log(`Total static <script type="application/ld+json"> blocks: ${total}`);
console.log(`Errors:               ${errors}`);
if (errors) {
  for (const d of errorDetails) {
    console.log(`  [${d.file}] ${d.err}`);
    console.log(`    > ${d.snippet.replace(/\n/g, " ")}`);
  }
}
process.exit(errors ? 1 : 0);
