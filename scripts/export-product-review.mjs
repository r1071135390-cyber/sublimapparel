// Export product catalog + tag archives as TSV for review
import { products } from '../src/lib/products-data.ts';
import { CATEGORY_TAGS, SPORT_TAGS, SCENARIO_TAGS } from '../src/lib/tag-archive.ts';
import * as fs from 'fs';
import * as path from 'path';

const outDir = '/tmp/product-review';
fs.mkdirSync(outDir, { recursive: true });

// Build full tag list (label + key + dimension + description)
const allFullTags = [];
for (const dim of ['category', 'sport', 'scenario']) {
  const source = dim === 'category' ? CATEGORY_TAGS : dim === 'sport' ? SPORT_TAGS : SCENARIO_TAGS;
  for (const [key, info] of Object.entries(source)) {
    allFullTags.push({
      key,
      label: info.label,
      slug: key,
      dimension: dim,
      description: info.description || '',
    });
  }
}

const categories = allFullTags.filter(t => t.dimension === 'category').map(t => t.label);
const sports = allFullTags.filter(t => t.dimension === 'sport').map(t => t.label);
const scenarios = allFullTags.filter(t => t.dimension === 'scenario').map(t => t.label);

// ============================================================
// TABLE 1: Product list (number | id | slug | name | category | sports | scenarios | moq)
// ============================================================
const header = '# Columns: number | id | slug | name | category | sports | scenarios | moq';
const lines = [header];
for (const p of products) {
  const sportsStr = p.sports.length === 42 ? 'ALL(42)' : p.sports.join(',');
  const scnStr = p.scenarios.length === 13 ? 'ALL(13)' : p.scenarios.join(',');
  lines.push([
    p.number,
    p.id,
    p.slug,
    p.name.replace(/\t/g, ' '),
    p.category,
    sportsStr,
    scnStr,
    p.moq,
  ].join('\t'));
}
fs.writeFileSync(path.join(outDir, '01-products.tsv'), lines.join('\n') + '\n', 'utf-8');
console.log(`✓ Wrote ${lines.length - 1} products to 01-products.tsv`);

// ============================================================
// TABLE 2: Categories (29)
// ============================================================
const writeTagFile = (filename, title, dim, list) => {
  const out = [
    `# ${title}`,
    `# Total: ${list.length}`,
    '',
    'index\tkey\tdimension\tlabel\tslug',
  ];
  list.forEach((label, i) => {
    const tag = allFullTags.find(t => t.label === label && t.dimension === dim);
    out.push(`${i + 1}\t${tag?.key || ''}\t${dim}\t${label}\t${tag?.slug || ''}`);
  });
  fs.writeFileSync(path.join(outDir, filename), out.join('\n') + '\n', 'utf-8');
  console.log(`✓ Wrote ${list.length} ${title} to ${filename}`);
};
writeTagFile('02-categories.tsv', 'Categories (29)', 'category', categories);
writeTagFile('03-sports.tsv', 'Sports (42)', 'sport', sports);
writeTagFile('04-scenarios.tsv', 'Scenarios (27)', 'scenario', scenarios);

// ============================================================
// TABLE 3: All tag archives (98 tags)
// ============================================================
const allTags = [
  '# All tag archives (98): dimension | key | label | slug | description',
  'dimension\tkey\tlabel\tslug\tdescription',
];
for (const tag of allFullTags) {
  allTags.push([
    tag.dimension,
    tag.key,
    tag.label,
    tag.slug,
    (tag.description || '').slice(0, 60).replace(/\t/g, ' '),
  ].join('\t'));
}
fs.writeFileSync(path.join(outDir, '05-all-tag-archives.tsv'), allTags.join('\n') + '\n', 'utf-8');
console.log(`✓ Wrote ${allFullTags.length} tags to 05-all-tag-archives.tsv`);

// ============================================================
// TABLE 4: Tag → product count
// ============================================================
function countProductsByTag(dim, tagLabel) {
  return products.filter(p => {
    if (dim === 'category') return p.category === tagLabel;
    if (dim === 'sport') return p.sports.length === 42 || p.sports.includes(tagLabel);
    return p.scenarios.length === 13 || p.scenarios.includes(tagLabel);
  }).length;
}
const summary = ['# Tag → product count summary', 'dimension\tlabel\tproduct_count'];
for (const c of categories) summary.push(`category\t${c}\t${countProductsByTag('category', c)}`);
for (const s of sports) summary.push(`sport\t${s}\t${countProductsByTag('sport', s)}`);
for (const sc of scenarios) summary.push(`scenario\t${sc}\t${countProductsByTag('scenario', sc)}`);
fs.writeFileSync(path.join(outDir, '06-tag-product-counts.tsv'), summary.join('\n') + '\n', 'utf-8');
console.log('✓ Wrote tag product count summary to 06-tag-product-counts.tsv');

console.log('\nAll files in:', outDir);
