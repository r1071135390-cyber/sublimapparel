import { products } from "../src/lib/products-data.ts";
import { writeFileSync } from "fs";

function categorizeByName(name) {
  const n = name.toLowerCase();
  if (n.includes("shorts") || n.includes("legging") || n.includes("tights") || (n.includes("swimwear") && n.includes("trunks"))) return "Pants";
  if (n.includes("vest") && n.includes("tank") && n.includes("dress")) return "Tank Top & Camis";
  if (n.includes("vest")) return "Vest";
  if (n.includes("rash guard") || n.includes("lycra top") || n.includes("lycra suit")) return "Tank Top & Camis";
  if (n.includes("singlet")) return "T-Shirt";
  if (n.includes("leotard")) return "Skirt";
  if (n.includes("dress") && !n.includes("tank vest")) return "Skirt";
  if (n.includes("uniform") && (n.includes("skirt") || n.includes("top + skirt"))) return "Skirt";
  if (n.includes("jersey") || n.includes("outfit") || n.includes("wear") || n.includes("set") || n.includes("suit") || n.includes("gi") || n.includes("fishing shirt")) return "T-Shirt";
  return "T-Shirt";
}

// 4 个 all-sports 的产品，按名字确定 sport
function determineSport(name) {
  const n = name.toLowerCase();
  if (n.includes("baseball")) return ["Baseball", "Softball"];
  if (n.includes("tank vest") || n.includes("tank bodysuit")) return ["Dance", "Gym", "Athletics"];
  if (n.includes("long-sleeve t-shirt")) return ["Running", "Gym", "Soccer", "Basketball"]; // 通用训练衫
  return [];
}

const sw = products.filter(p => p.category === "Sportswear");
let csv = "number\tname\told_category\tnew_category\tsports_check\tsuggested_sports\n";
for (const p of sw) {
  const newCat = categorizeByName(p.name);
  const isAllSports = p.sports.length >= 41;
  const suggestedSports = isAllSports ? determineSport(p.name) : [];
  const sportsCheck = isAllSports ? "ALL 41 (BROAD)" : `OK (${p.sports.length})`;
  csv += `${p.number}\t${p.name}\tSportswear\t${newCat}\t${sportsCheck}\t${suggestedSports.join(',')}\n`;
}

writeFileSync("/tmp/product-review-v2/08-sportswear-reclassification-v2.tsv", csv);
console.log(`Wrote ${sw.length} products to 08-sportswear-reclassification-v2.tsv`);

// 统计需要修的
const needFix = sw.filter(p => p.sports.length >= 41);
console.log(`\nNeed sports tag fix: ${needFix.length} products`);
for (const p of needFix) {
  console.log(`  ${p.number}  ${p.name}  →  ${determineSport(p.name).join(',')}`);
}
