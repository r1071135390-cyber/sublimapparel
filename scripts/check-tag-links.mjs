// scripts/check-tag-links.mjs
//
// Static consistency check between the tag archive registry and the tag
// link helpers. Runs without a dev server, so a broken tag link is caught
// in CI instead of on the live site.
//
// R130 fixed two homepage dead links (/tag/scenario/education-and-school/
// and /tag/scenario/e-commerce-and-pod/) that were caused by hand-written
// scenario strings drifting away from the archive registry. This script
// makes that class of drift detectable.
//
// It checks:
//   1. every registry key equals its own label (the slug comes from the label)
//   2. every lookup table value points at an existing archive
//   3. every scenario string used by the homepage industries grid resolves
//      to an existing archive (same lookup order as resolveArchiveLink)
//   4. every category / sport / scenario on a product has a matching archive
//
// Usage: node scripts/check-tag-links.mjs

import fs from "node:fs";
import path from "node:path";

const REPO = path.resolve(import.meta.dirname, "..");
const read = (rel) => fs.readFileSync(path.join(REPO, rel), "utf8");

const archiveSrc = read("src/lib/tag-archive.ts");
const utilsSrc = read("src/lib/tag-utils.ts");
const industriesSrc = read("src/components/industries.tsx");
const productsSrc = read("src/lib/products-data.ts");

function section(src, decl) {
  const start = src.indexOf(decl);
  if (start < 0) throw new Error(`declaration not found: ${decl}`);
  const rest = src.slice(start + decl.length);
  const next = rest.search(/\n(?:export )?(?:const|function|type|interface) /);
  return next < 0 ? rest : rest.slice(0, next);
}

// Object keys are quoted only when they are not valid identifiers.
const KEY = '(?:"([^"]+)"|([A-Za-z][A-Za-z0-9_]*))';

/** Registry entries: key -> label */
function registry(src, name) {
  const sec = section(src, `export const ${name}`);
  const map = new Map();
  const re = new RegExp(`^ {2}${KEY}: \\{\\s*\\n\\s*label: "([^"]*)",`, "gm");
  for (const m of sec.matchAll(re)) map.set(m[1] ?? m[2], m[3]);
  return map;
}

/** Lookup table entries: label -> canonical value */
function lookup(src, name) {
  const sec = section(src, `const ${name}`);
  const map = new Map();
  const re = new RegExp(`^ {2}${KEY}: "([^"]*)",`, "gm");
  for (const m of sec.matchAll(re)) map.set(m[1] ?? m[2], m[3]);
  return map;
}

const TAGS = {
  category: registry(archiveSrc, "CATEGORY_TAGS"),
  sport: registry(archiveSrc, "SPORT_TAGS"),
  scenario: registry(archiveSrc, "SCENARIO_TAGS"),
};
const MAPS = {
  category: lookup(utilsSrc, "CATEGORY_MAP"),
  sport: lookup(utilsSrc, "SPORT_MAP"),
  scenario: lookup(utilsSrc, "SCENARIO_MAP"),
};

const problems = [];
const notes = [];

// 1 — registry key must equal its label (the slug comes from the label)
for (const [dim, map] of Object.entries(TAGS)) {
  for (const [key, label] of map) {
    if (key !== label) problems.push(`${dim}: key "${key}" !== label "${label}"`);
  }
}

// 2 — every lookup value must point at an existing archive
for (const dim of ["category", "sport", "scenario"]) {
  for (const [from, to] of MAPS[dim]) {
    if (!TAGS[dim].has(to)) {
      const line = `${dim} map "${from}" -> "${to}" has no archive`;
      if (dim === "scenario") problems.push(line);
      else notes.push(line);
    }
  }
}

// 3 — resolveArchiveLink lookup order, with the archive-existence check
function resolveArchiveLink(label) {
  const trimmed = label.trim();
  for (const dim of ["category", "sport", "scenario"]) {
    const value = MAPS[dim].get(trimmed);
    if (value && TAGS[dim].has(value)) return `/tag/${dim}/${value}/`;
  }
  for (const dim of ["category", "sport", "scenario"]) {
    if (TAGS[dim].has(trimmed)) return `/tag/${dim}/${trimmed}/`;
  }
  return null;
}

const homeScenarios = [...industriesSrc.matchAll(/scenario: "([^"]+)"/g)].map(
  (m) => m[1],
);
for (const scenario of homeScenarios) {
  const link = resolveArchiveLink(scenario);
  if (!link) problems.push(`homepage scenario "${scenario}" resolves to no archive`);
}

// 4 — product tags must have archives, product pages link to them
function productArray(field) {
  const values = new Set();
  const re = new RegExp(`${field}: \\[([^\\]]*)\\]`, "gs");
  for (const m of productsSrc.matchAll(re)) {
    for (const s of m[1].matchAll(/"([^"]+)"/g)) values.add(s[1]);
  }
  return values;
}

for (const [field, dim] of [
  ["scenarios", "scenario"],
  ["sports", "sport"],
]) {
  for (const value of productArray(field)) {
    if (!TAGS[dim].has(value)) {
      problems.push(`product ${field} "${value}" has no ${dim} archive`);
    }
  }
}

for (const m of productsSrc.matchAll(/category: "([^"]+)"/g)) {
  if (!TAGS.category.has(m[1])) {
    problems.push(`product category "${m[1]}" has no category archive`);
  }
}

console.log(
  `registry sizes: ${Object.entries(TAGS)
    .map(([d, m]) => `${d}=${m.size}`)
    .join(" ")}`,
);
console.log(
  `lookup sizes:  ${Object.entries(MAPS)
    .map(([d, m]) => `${d}=${m.size}`)
    .join(" ")}`,
);
console.log(`homepage scenarios checked: ${homeScenarios.length}`);
for (const s of homeScenarios) {
  console.log(`  "${s}" -> ${resolveArchiveLink(s) ?? "NO ARCHIVE"}`);
}

if (notes.length) {
  console.log(
    `\nnotes (${notes.length}) — stale values that resolveArchiveLink now rejects:`,
  );
  for (const n of notes) console.log(`  ${n}`);
}

if (problems.length) {
  console.log(`\nPROBLEMS (${problems.length}):`);
  for (const p of problems) console.log(`  ${p}`);
  console.log("\nFAIL-CHECK-TAG-LINKS");
  process.exit(1);
}

console.log("\nOK-CHECK-TAG-LINKS");
