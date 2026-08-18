// Export 2-dim model: category + scenarios (sports merged into scenarios)
// Scenarios stored as label (e.g. "Corporate & Branding"), not slug
import { products } from '../src/lib/products-data.ts';
import { CATEGORY_TAGS, SPORT_TAGS, SCENARIO_TAGS } from '../src/lib/tag-archive.ts';
import * as fs from 'fs';

const outDir = '/tmp/product-review-2dim';
fs.mkdirSync(outDir, { recursive: true });

// Build scenario pool: labels from both
const scenarioPool = [
  ...Object.keys(SCENARIO_TAGS).map(k => ({ key: k, source: 'scenario' })),
  ...Object.keys(SPORT_TAGS).map(k => ({ key: k, source: 'sport' })),
];

// TABLE 1: Products (2-dim)
const header = '# Columns: number | id | slug | name | category | scenarios(merged w/ sports) | n_scenarios | moq';
const lines = [header];

for (const p of products) {
  const allScenarios = [...new Set([...p.scenarios, ...p.sports])];
  lines.push([
    p.number,
    p.id,
    p.slug,
    p.name,
    p.category,
    allScenarios.join(','),
    allScenarios.length,
    p.moq || '',
  ].join('\t'));
}

fs.writeFileSync(`${outDir}/10-products-2dim.tsv`, lines.join('\n'));
console.log(`✓ Wrote ${products.length} products (2-dim) to 10-products-2dim.tsv`);

// TABLE 2: Scenario pool
const poolHeader = '# Columns: label | source | n_products';
const poolLines = [poolHeader];
const scenarioCounts = new Map();
for (const p of products) {
  for (const s of [...p.scenarios, ...p.sports]) {
    scenarioCounts.set(s, (scenarioCounts.get(s) || 0) + 1);
  }
}
for (const s of scenarioPool) {
  poolLines.push([s.key, s.source, scenarioCounts.get(s.key) || 0].join('\t'));
}
fs.writeFileSync(`${outDir}/11-scenario-pool.tsv`, poolLines.join('\n'));
console.log(`✓ Wrote ${scenarioPool.length} scenarios to 11-scenario-pool.tsv`);

// TABLE 3: Category
const catHeader = '# Columns: category | n_products';
const catLines = [catHeader];
const catCounts = new Map();
for (const p of products) {
  catCounts.set(p.category, (catCounts.get(p.category) || 0) + 1);
}
for (const [cat, n] of Array.from(catCounts.entries()).sort((a, b) => b[1] - a[1])) {
  catLines.push([cat, n].join('\t'));
}
fs.writeFileSync(`${outDir}/12-category-distribution.tsv`, catLines.join('\n'));
console.log(`✓ Wrote ${catCounts.size} categories to 12-category-distribution.tsv`);

// TABLE 4: ALL_SPORTS products to re-tag
const retagHeader = '# Columns: number | name | category | current_scenarios | action';
const retagLines = [retagHeader];
let allSportsCount = 0;
for (const p of products) {
  if (p.sports.length >= 41) {
    allSportsCount++;
    const scn = p.scenarios.length >= 25 ? 'ALL_SCENARIOS' : p.scenarios.join(',');
    retagLines.push([
      p.number,
      p.name,
      p.category,
      scn,
      'remove ALL_SPORTS, keep specific scenarios',
    ].join('\t'));
  }
}
fs.writeFileSync(`${outDir}/13-all-sports-need-retag.tsv`, retagLines.join('\n'));
console.log(`✓ Wrote ${allSportsCount} ALL_SPORTS products to 13-all-sports-need-retag.tsv`);

console.log(`\nAll files in: ${outDir}`);
