import { products } from "../src/lib/products-data.ts";

const tagSet = { sports: new Set(), scenarios: new Set() };
const productTags = [];

for (const p of products) {
  tagSet.sports = new Set([...tagSet.sports, ...p.sports]);
  tagSet.scenarios = new Set([...tagSet.scenarios, ...p.scenarios]);
  productTags.push({
    number: p.number,
    name: p.name,
    category: p.category,
    sports: p.sports.join(','),
    scenarios: p.scenarios.join(','),
  });
}

console.log("UNIQUE_SPORTS=" + tagSet.sports.size);
console.log("UNIQUE_SCENARIOS=" + tagSet.scenarios.size);
console.log("PRODUCTS=" + products.length);
console.log("---SPORTS---");
console.log([...tagSet.sports].sort().join(','));
console.log("---SCENARIOS---");
console.log([...tagSet.scenarios].sort().join(','));
