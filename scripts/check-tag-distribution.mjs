import { products } from "../src/lib/products-data.ts";

const dist = { sports: {}, scenarios: {} };
for (const p of products) {
  dist.sports[p.sports.length] = (dist.sports[p.sports.length] || 0) + 1;
  dist.scenarios[p.scenarios.length] = (dist.scenarios[p.scenarios.length] || 0) + 1;
}
console.log("===SPORTS LENGTH DIST===");
for (const k of Object.keys(dist.sports).sort((a,b)=>a-b)) {
  console.log(`${k} sports: ${dist.sports[k]} products`);
}
console.log("===SCENARIOS LENGTH DIST===");
for (const k of Object.keys(dist.scenarios).sort((a,b)=>a-b)) {
  console.log(`${k} scenarios: ${dist.scenarios[k]} products`);
}
