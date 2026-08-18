import { products } from "../src/lib/products-data.ts";

const sw = products.filter(p => p.category === "Sportswear");
console.log(`Sportswear products: ${sw.length}\n`);
for (const p of sw) {
  console.log(`${p.number}  ${p.name}`);
}
