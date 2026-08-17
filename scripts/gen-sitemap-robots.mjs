// One-off generator: runs src/app/sitemap.ts logic and writes out/sitemap.xml + out/robots.txt
// Bypasses `next build` so we don't hit the 178/355 Turbopack deadlock.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "out");

// Force-coerce @/lib/* imports to relative paths by patching import specifiers
async function importFresh(spec) {
  return import(spec);
}

// We can't easily import @/lib/* without tsconfig path mapping. Instead,
// read the source of src/app/sitemap.ts and re-evaluate manually using
// dynamic import of the data sources (which use relative imports inside src/lib).

// Strategy: use a tiny inline tsx-style loader via Node's --experimental-strip-types
// (Node 22.6+) — but pnpm env may not have it enabled. Easier: replicate the
// function and import the data files directly via their relative path.

const { techniques } = await import(pathToFileURL(path.join(ROOT, "src/lib/techniques.ts")).href);
const { blogPosts } = await import(pathToFileURL(path.join(ROOT, "src/lib/blog.ts")).href);
const { getAllTagSlugs } = await import(pathToFileURL(path.join(ROOT, "src/lib/tag-archive.ts")).href);
const { products } = await import(pathToFileURL(path.join(ROOT, "src/lib/products-data.ts")).href);

const SITE_URL = (process.env.SITE_URL || "https://sublimapparel.com").replace(/\/+$/, "");
const withSlash = (p) => (p.endsWith("/") ? p : `${p}/`);
const LAST_MOD = new Date();

const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  { path: "/products/t-shirts", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/hoodies", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/jerseys", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/racing", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/cycling", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/golf", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/bowling", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/esports", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/all", priority: 0.9, changeFrequency: "weekly" },
  { path: "/get-a-quote", priority: 0.95, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/fabric", priority: 0.85, changeFrequency: "monthly" },
  { path: "/fabric/cotton", priority: 0.9, changeFrequency: "monthly" },
  { path: "/technique", priority: 0.85, changeFrequency: "monthly" },
  { path: "/shipping", priority: 0.8, changeFrequency: "monthly" },
  { path: "/shipping/ddp", priority: 0.9, changeFrequency: "monthly" },
  { path: "/shipping/us-warehouse", priority: 0.1, changeFrequency: "yearly" },
  { path: "/shipping/global", priority: 0.9, changeFrequency: "monthly" },
  { path: "/all-over-print", priority: 0.95, changeFrequency: "monthly" },
  { path: "/login", priority: 0.3, changeFrequency: "yearly" },
  { path: "/register", priority: 0.3, changeFrequency: "yearly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/factory", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/production", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/quality", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/cases", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cases", priority: 0.7, changeFrequency: "weekly" },
  { path: "/cases/endurance-race-events", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cases/music-tour-festival", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cases/sports-teams", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cases/endurance-race-events/lakeshore-marathon-2025", priority: 0.65, changeFrequency: "yearly" },
  { path: "/cases/endurance-race-events/alpine-ultra-50k-2024", priority: 0.65, changeFrequency: "yearly" },
  { path: "/cases/music-tour-festival/harbor-sound-festival-2025", priority: 0.65, changeFrequency: "yearly" },
  { path: "/cases/sports-teams/nova-racing-academy-2025", priority: 0.65, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/shipping-policy", priority: 0.3, changeFrequency: "yearly" },
];

const staticEntries = ROUTES.map((r) => {
  const entry = {
    url: `${SITE_URL}${withSlash(r.path)}`,
    lastModified: LAST_MOD,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  };
  if (r.path === "/products") entry.images = [`${SITE_URL}/og-default.jpg`];
  else if (r.path.startsWith("/products/") && r.path !== "/products") {
    const slug = r.path.replace("/products/", "");
    entry.images = [`${SITE_URL}/og-default.jpg`, `${SITE_URL}/products/${slug}.webp`];
  } else if (r.path === "/fabric" || r.path === "/fabric/cotton") {
    entry.images = [`${SITE_URL}/fabric-hero.webp`, `${SITE_URL}/og-default.jpg`];
  } else if (r.path === "/") entry.images = [`${SITE_URL}/og-default.jpg`];
  else if (r.path === "/technique") entry.images = [`${SITE_URL}/og-default.jpg`];
  return entry;
});

const techniqueEntries = techniques.map((t) => ({
  url: `${SITE_URL}${withSlash(`/technique/${t.slug}`)}`,
  lastModified: LAST_MOD,
  changeFrequency: "monthly",
  priority: 0.8,
  images: [`${SITE_URL}/og-default.jpg`],
}));

const blogEntries = blogPosts.map((p) => ({
  url: `${SITE_URL}${withSlash(`/blog/${p.slug}`)}`,
  lastModified: new Date(p.date),
  changeFrequency: "monthly",
  priority: 0.7,
  images: [`${SITE_URL}/og-default.jpg`],
}));

const tagEntries = ["category", "sport", "scenario"].flatMap((dim) =>
  getAllTagSlugs(dim).map(({ slug }) => ({
    url: `${SITE_URL}${withSlash(`/tag/${dim}/${slug}`)}`,
    lastModified: LAST_MOD,
    changeFrequency: "monthly",
    priority: 0.7,
    images: [`${SITE_URL}/og-default.jpg`],
  })),
);

const productEntries = products.map((p) => ({
  url: `${SITE_URL}${withSlash(`/products/all/${p.slug}`)}`,
  lastModified: LAST_MOD,
  changeFrequency: "weekly",
  priority: 0.8,
  images: [`${SITE_URL}/og-default.jpg`],
}));

const allEntries = [
  ...staticEntries,
  ...techniqueEntries,
  ...blogEntries,
  ...tagEntries,
  ...productEntries,
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const xmlBody = allEntries
  .map((e) => {
    const lastmod = e.lastModified instanceof Date ? e.lastModified.toISOString() : new Date(e.lastModified).toISOString();
    let url = `  <url>\n    <loc>${esc(e.url)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changeFrequency}</changefreq>\n    <priority>${e.priority.toFixed(1)}</priority>`;
    if (e.images && e.images.length) {
      const imgs = e.images
        .map((img) => `\n      <image:image>\n        <image:loc>${esc(img)}</image:loc>\n      </image:image>`)
        .join("");
      url += `\n    ${imgs.trim()}`;
    }
    return url + "\n  </url>";
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlBody}
</urlset>
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "sitemap.xml"), sitemap);

const robots = `# sublimapparel.com robots.txt
# Generated to override Cloudflare managed robots (which would otherwise
# disallow GPTBot / ClaudeBot / Google-Extended).

User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

# AI crawlers — explicitly allowed so site can be cited by AI search
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

# Aggressive scrapers — blocked
User-agent: Bytespider
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: meta-externalagent
Disallow: /

User-agent: ImagesiftBot
Disallow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

fs.writeFileSync(path.join(OUT_DIR, "robots.txt"), robots);

console.log(`✓ sitemap.xml: ${allEntries.length} URLs`);
console.log(`  - static:     ${staticEntries.length}`);
console.log(`  - technique:  ${techniqueEntries.length}`);
console.log(`  - blog:       ${blogEntries.length}`);
console.log(`  - tag:        ${tagEntries.length}`);
console.log(`  - product:    ${productEntries.length}`);
console.log(`✓ robots.txt written`);
