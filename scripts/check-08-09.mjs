import { products } from "../src/lib/products-data.ts";

const sw = products.filter(p => p.category === "Sportswear");
const withSports = sw.filter(p => p.sports.length > 0 && p.sports.length < 41);
const allSports = sw.filter(p => p.sports.length >= 41);
const noSports = sw.filter(p => p.sports.length === 0);

console.log(`Total Sportswear products: ${sw.length}`);
console.log(`  With 1-40 sports tags (has specific sport): ${withSports.length}`);
console.log(`  With all 41 sports tags (broadly tagged): ${allSports.length}`);
console.log(`  With 0 sports tags: ${noSports.length}`);

console.log("\n===Sample 8 with sports tags (1-40)===");
for (const p of withSports.slice(0, 8)) {
  console.log(`${p.number}  ${p.name.padEnd(60)}  sports=${p.sports.join(',')}`);
}

console.log("\n===Sample 8 with all 41 sports===");
for (const p of allSports.slice(0, 8)) {
  console.log(`${p.number}  ${p.name.padEnd(60)}  all-sports`);
}
