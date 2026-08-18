import { products } from "../src/lib/products-data.ts";

function categorizeByName(name) {
  const n = name.toLowerCase();
  
  // Shorts / Pants 类
  if (n.includes("shorts")) return "Pants";
  if (n.includes("legging")) return "Pants";
  if (n.includes("swimwear") && n.includes("trunks")) return "Pants";
  if (n.includes("tights")) return "Pants";
  
  // Vest 类
  if (n.includes("vest")) return "Vest";
  if (n.includes("singlet")) return "T-Shirt"; // 像 tank top，归 T-Shirt
  if (n.includes("rash guard")) return "Tank Top & Camis";
  if (n.includes("lycra top")) return "Tank Top & Camis";
  
  // 套装 / Wear
  if (n.includes("suit") && !n.includes("tracksuit")) return "T-Shirt";
  if (n.includes("uniform") && n.includes("top + skirt")) return "Skirt";
  if (n.includes("wear") || n.includes("outfit") || n.includes("set")) {
    // 球衣 Wear 归 T-Shirt
    return "T-Shirt";
  }
  
  // Dress / Leotard
  if (n.includes("dress") || n.includes("leotard")) return "Skirt";
  
  // Jersey
  if (n.includes("jersey")) return "T-Shirt";
  
  // 兜底 - 球衣/运动衫都归 T-Shirt
  return "T-Shirt";
}

const sw = products.filter(p => p.category === "Sportswear");
const dist = {};
const mapping = [];

for (const p of sw) {
  const newCat = categorizeByName(p.name);
  dist[newCat] = (dist[newCat] || 0) + 1;
  mapping.push({ number: p.number, name: p.name, old: "Sportswear", new: newCat });
}

console.log("===Distribution===");
for (const [cat, count] of Object.entries(dist).sort((a,b)=>b[1]-a[1])) {
  console.log(`  ${cat}: ${count}`);
}

console.log("\n===Mapping===");
for (const m of mapping) {
  console.log(`  ${m.number}  ${m.name.padEnd(70)}  →  ${m.new}`);
}
