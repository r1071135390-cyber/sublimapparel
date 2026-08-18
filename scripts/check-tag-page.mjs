import { ALL_TAGS, getAllTagSlugs, getTagInfo } from "../src/lib/tag-archive.ts";
import { products,  } from "../src/lib/products-data.ts";

for (const dim of ["category", "sport", "scenario"]) {
  for (const slug of getAllTagSlugs(dim)) {
    try {
      const info = getTagInfo(dim, slug.slug);
      let ps = [];
      if (dim === "sport") ps = getProductsBySport(slug.value);
      else if (dim === "scenario") ps = getProductsByScenario(slug.value);
      else ps = products.filter(p => p.category === slug.value);
      if (ps.length === 0) {
        console.log(`EMPTY: ${dim}/${slug.slug} (label=${slug.value})`);
      }
    } catch (e) {
      console.log(`ERROR: ${dim}/${slug.slug}: ${e.message}`);
    }
  }
}
console.log("DONE");
