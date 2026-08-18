import { products } from "../src/lib/products-data.ts";
const full = products.filter(p => p.sports.length >= 41);
const halfScen = products.filter(p => p.scenarios.length >= 13);

console.log("===PRODUCTS WITH 41 SPORTS (all selected) ===");
for (const p of full) {
  console.log(`${p.number}  ${p.name.padEnd(60)} cat=${p.category}  scn=${p.scenarios.length}`);
}
console.log("\n===PRODUCTS WITH 13 SCENARIOS (heavy) ===");
for (const p of halfScen) {
  console.log(`${p.number}  ${p.name.padEnd(60)} cat=${p.category}  sport=${p.sports.length}`);
}
