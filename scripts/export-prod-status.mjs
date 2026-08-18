#!/usr/bin/env node
// 抓取生产环境真实数据 - 修正版
import { products, productCategories, allSports, allScenarios } from "../src/lib/products-data.ts";
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("/tmp/product-review-v2", { recursive: true });

// 1) Products full
const productLines = ["number\tid\tname\tslug\tcategory\tsports_count\tscenarios_count\tsports\tscenarios\tmoq"];
for (const p of products) {
  productLines.push([
    p.number,
    p.id,
    p.name,
    p.slug,
    p.category,
    p.sports.length,
    p.scenarios.length,
    p.sports.join(','),
    p.scenarios.join(','),
    p.moq,
  ].join('\t'));
}
writeFileSync("/tmp/product-review-v2/01-products.tsv", productLines.join('\n'));

// 2) Categories usage
const catCount = {};
for (const p of products) catCount[p.category] = (catCount[p.category] || 0) + 1;
const catLines = ["category\tproduct_count\thas_archive_page"];
for (const c of productCategories) {
  const n = catCount[c] || 0;
  // check archive page exists
  const r = await fetch(`https://sublimapparel.com/tag/category/${c.toLowerCase().replace(/& /g,'-and-').replace(/ /g,'-')}/`).catch(()=>null);
  // fallback sync: we'll mark later
  catLines.push([c, n, 'check'].join('\t'));
}
writeFileSync("/tmp/product-review-v2/02-categories.tsv", catLines.join('\n'));

// 3) Sports usage
const sportCount = {};
for (const p of products) for (const s of p.sports) sportCount[s] = (sportCount[s] || 0) + 1;
const sportLines = ["sport\tproduct_count"];
for (const s of allSports) sportLines.push([s, sportCount[s] || 0].join('\t'));
writeFileSync("/tmp/product-review-v2/03-sports.tsv", sportLines.join('\n'));

// 4) Scenarios usage
const scenCount = {};
for (const p of products) for (const s of p.scenarios) scenCount[s] = (scenCount[s] || 0) + 1;
const scenLines = ["scenario\tproduct_count"];
for (const s of allScenarios) scenLines.push([s, scenCount[s] || 0].join('\t'));
writeFileSync("/tmp/product-review-v2/04-scenarios.tsv", scenLines.join('\n'));

// 5) Tag archives - PRODUCTION sitemap reality (only show real ones)
import { readFileSync } from "node:fs";
const prodUrls = readFileSync("/tmp/urls.txt", "utf8").split('\n').filter(Boolean);

const tagArchives = [];
for (const u of prodUrls) {
  let m;
  if (m = u.match(/\/tag\/(category|sport|scenario)\/([a-z0-9-]+)\/?$/)) {
    tagArchives.push({ dim: m[1], slug: m[2] });
  }
}
const taLines = ["dimension\tslug\tlabel"];
const dimToLabel = {};
for (const c of productCategories) dimToLabel[`category/${c.toLowerCase().replace(/& /g,'-and-').replace(/ /g,'-')}`] = c;
for (const s of allSports) dimToLabel[`sport/${s.toLowerCase().replace(/& /g,'-and-').replace(/ /g,'-')}`] = s;
for (const s of allScenarios) dimToLabel[`scenario/${s.toLowerCase().replace(/& /g,'-and-').replace(/ /g,'-')}`] = s;
for (const t of tagArchives) {
  const label = dimToLabel[`${t.dim}/${t.slug}`] || `??? ${t.slug}`;
  taLines.push([t.dim, t.slug, label].join('\t'));
}
writeFileSync("/tmp/product-review-v2/05-tag-archives-on-production.tsv", taLines.join('\n'));

// 6) Product counts per archive page (real production)
console.log("TSV files generated. Now fetching real product counts from each archive page...");

const fetchPromises = tagArchives.map(async (t) => {
  const url = `https://sublimapparel.com/tag/${t.dim}/${t.slug}/`;
  try {
    const res = await fetch(url);
    const html = await res.text();
    // 查找产品卡片数量
    const m = html.match(/(\d+)\s*items?/i) || html.match(/(\d+)\s*products?/i);
    let count = 0;
    if (m) count = parseInt(m[1]);
    // 备用: 数 /products/all/ 链接数
    if (!count) {
      const links = html.match(/\/products\/all\/[a-z0-9-]+\//g);
      if (links) count = new Set(links).size;
    }
    return { ...t, count, label: dimToLabel[`${t.dim}/${t.slug}`] || `??? ${t.slug}` };
  } catch(e) {
    return { ...t, count: -1, label: dimToLabel[`${t.dim}/${t.slug}`] || `??? ${t.slug}` };
  }
});

const pcLines = ["dimension\tslug\tlabel\treal_product_count"];
const results = await Promise.all(fetchPromises);
for (const r of results) {
  pcLines.push([r.dim, r.slug, r.label, r.count].join('\t'));
}
writeFileSync("/tmp/product-review-v2/06-real-product-counts.tsv", pcLines.join('\n'));

console.log("Done. 6 files in /tmp/product-review-v2/");
console.log("PRODUCTS:", products.length, "CATEGORIES(used):", Object.keys(catCount).length, "SPORTS(used):", Object.keys(sportCount).length, "SCENARIOS(used):", Object.keys(scenCount).length);
console.log("TAG ARCHIVES ON PROD:", tagArchives.length);
