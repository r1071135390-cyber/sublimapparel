import { ALL_TAGS, getAllTagSlugs, getTagInfo } from "../src/lib/tag-archive.ts";

console.log("ALL_TAGS.category keys:", Object.keys(ALL_TAGS.category));
console.log("getAllTagSlugs('category'):");
for (const x of getAllTagSlugs("category")) {
  console.log(`  ${x.value} → /${x.slug}/`);
}
console.log("getTagInfo('category', 'Vest'):", JSON.stringify(getTagInfo("category", "Vest"), null, 2));
