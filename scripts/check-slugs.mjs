import { ALL_TAGS, getAllTagSlugs } from "../src/lib/tag-archive.ts";

console.log("===ALL SPORTS===");
for (const slug of getAllTagSlugs("sport")) {
  console.log(`/tag/sport/${slug.slug}/ - ${slug.value}`);
}
console.log("===ALL SCENARIOS===");
for (const slug of getAllTagSlugs("scenario")) {
  console.log(`/tag/scenario/${slug.slug}/ - ${slug.value}`);
}
