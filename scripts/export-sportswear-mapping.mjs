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

const sw = products.filter(p => p.category === "Sportswear");
let csv = "number\tname\told_category\tnew_category\n";
for (const p of sw) {
  const newCat = categorizeByName(p.name);
  csv += `${p.number}\t${p.name}\tSportswear\t${newCat}\n`;
}

writeFileSync("/tmp/product-review-v2/07-sportswear-reclassification.tsv", csv);
console.log(`Wrote ${sw.length} products`);
