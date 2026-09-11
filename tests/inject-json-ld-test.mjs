#!/usr/bin/env node
// tests/inject-json-ld-test.mjs
// Standalone dry-run test for scripts/inject-json-ld.mjs.
// Builds a small fake "out/" tree, runs the injector, and asserts
// that the page-level schema lands in the right place with the right
// idempotency markers.

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const HERE = path.dirname(new URL(import.meta.url).pathname.replace(/^\//, ""));
const ROOT = path.resolve(HERE, "..");
const TMP = path.join(ROOT, ".tmp-inject-test");

if (fs.existsSync(TMP)) fs.rmSync(TMP, { recursive: true, force: true });
fs.mkdirSync(TMP, { recursive: true });

// Fake the out/ dir at the repo root so inject-json-ld.mjs finds it.
const OUT = path.join(ROOT, "out");
if (fs.existsSync(OUT)) fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const SHIP = path.join(OUT, "shipping");
fs.mkdirSync(SHIP, { recursive: true });
fs.writeFileSync(
  path.join(SHIP, "index.html"),
  `<!doctype html><html><head><title>test</title></head><body><h1>Test</h1></body></html>`
);
fs.writeFileSync(path.join(OUT, "index.html"), `<!doctype html><html><head><title>root</title></head><body></body></html>`);

// Run the injector
console.log("Running inject-json-ld.mjs on fake out/ ...");
execSync("node scripts/inject-json-ld.mjs", { cwd: ROOT, stdio: "inherit" });

// Read the result and check
const out = fs.readFileSync(path.join(SHIP, "index.html"), "utf-8");
console.log("\n=== RESULT for /shipping/ ===");
console.log(out);

const checks = [
  { name: "page-injected marker", pass: out.includes('data-jsonld-source="page-injected"') },
  { name: "BreadcrumbList in script", pass: out.includes('"@type":"BreadcrumbList"') },
  { name: "Home name", pass: out.includes('"name":"Home"') },
  { name: "Shipping name", pass: out.includes('"name":"Shipping"') },
  { name: "Inserted before </head>", pass: out.includes("</script></head>") },
];

console.log("\n=== ASSERTIONS ===");
let allPass = true;
for (const c of checks) {
  console.log(`${c.pass ? "✓" : "✗"} ${c.name}`);
  if (!c.pass) allPass = false;
}

// Idempotency test: run again, expect zero new injections
console.log("\nRunning inject-json-ld.mjs again (idempotency) ...");
execSync("node scripts/inject-json-ld.mjs", { cwd: ROOT, stdio: "inherit" });
const out2 = fs.readFileSync(path.join(SHIP, "index.html"), "utf-8");
const same = out === out2;
console.log(`${same ? "✓" : "✗"} idempotent (file unchanged on 2nd run)`);

// Cleanup
fs.rmSync(OUT, { recursive: true, force: true });
fs.rmSync(TMP, { recursive: true, force: true });

if (!allPass || !same) {
  console.log("\n=== TEST FAILED ===");
  process.exit(1);
}
console.log("\n=== ALL PASS ===");
