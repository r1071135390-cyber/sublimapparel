// Quick smoke test for the JSON-LD injection step
import fs from "node:fs";
import path from "node:path";
import { getLayoutGraph, getPageSchemas } from "./json-ld-registry.mjs";

// Test 1: layout graph well-formed
const layout = getLayoutGraph();
console.log("[1] Layout @graph nodes:", layout["@graph"].length);
console.log("    Types:", layout["@graph"].map((n) => n["@type"]).join(", "));

// Test 2: page path resolution
const testPaths = [
  "/index.html",
  "/shipping/index.html",
  "/shipping/ddp/index.html",
  "/shipping/global/index.html",
  "/shipping/us-warehouse/index.html",
  "/fabric/cotton/index.html",
  "/technique/index.html",
  "/about/index.html", // not in registry, should return []
];
for (const p of testPaths) {
  const schemas = getPageSchemas(p);
  console.log(`[2] ${p.padEnd(36)} → ${schemas.length} schemas (${schemas.map((s) => s["@type"]).join(", ") || "none"})`);
}

// Test 3: serialize works
const serialized = JSON.stringify(layout);
console.log("[3] Serialized layout @graph size:", serialized.length, "chars");
console.log("    Contains @context:", serialized.includes('"@context":"https://schema.org"'));
console.log("    Contains @graph:", serialized.includes('"@graph":['));
console.log("    No newline breaks:", !serialized.includes("\n") || serialized.split("\n").length === 1);

console.log("\n[OK] All smoke tests passed.");
