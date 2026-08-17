import type { MetadataRoute } from "next";
import { techniques } from "@/lib/techniques";
import { blogPosts } from "@/lib/blog";
import { getAllTagSlugs } from "@/lib/tag-archive";
import { products } from "@/lib/products-data";

export const dynamic = 'force-static';

// Sitemap config
// Add new static routes here + bump `priority` if it's a key conversion page.
// Dynamic routes (cases, future products, future solutions) are appended below.

// COZE_PROJECT_DOMAIN_DEFAULT is already prefixed with https://, so use it directly.
const rawDomain = process.env.COZE_PROJECT_DOMAIN_DEFAULT ?? "https://sublimapparel.com";
const SITE_URL = rawDomain.replace(/\/+$/, ""); // strip trailing slash if any
const LAST_MOD = new Date(); // bump when meaningful content changes ship

// Trailing-slash helper — site uses trailingSlash: true, so sitemap URLs must too.
const withSlash = (p: string) => (p.endsWith("/") ? p : `${p}/`);

type SitemapRoute = {
  path: string;
  priority: number;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
};

const ROUTES: SitemapRoute[] = [
  // ── L1 （）──────────────────────────────────
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
  { path: "/products/all", priority: 0.9, changeFrequency: "weekly" }, // all-over-print catalog
  { path: "/get-a-quote", priority: 0.95, changeFrequency: "monthly" }, // 询盘主入口
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },

  // ── L2  SEO （， 0 ）──────────────
  { path: "/fabric", priority: 0.85, changeFrequency: "monthly" },
  { path: "/fabric/cotton", priority: 0.9, changeFrequency: "monthly" }, // 王炸
  { path: "/technique", priority: 0.85, changeFrequency: "monthly" },
  { path: "/shipping", priority: 0.8, changeFrequency: "monthly" },
  { path: "/shipping/ddp", priority: 0.9, changeFrequency: "monthly" }, // 王炸
  { path: "/shipping/us-warehouse", priority: 0.1, changeFrequency: "yearly" }, // placeholder — not actively promoted
  { path: "/shipping/global", priority: 0.9, changeFrequency: "monthly" }, // 王炸

  // ── （）──────────
  { path: "/all-over-print", priority: 0.95, changeFrequency: "monthly" }, // P1 — all over print 流量入口

  // ── （）──────────────────────────
  { path: "/login", priority: 0.3, changeFrequency: "yearly" },
  { path: "/register", priority: 0.3, changeFrequency: "yearly" },

  // ── L2  /  ────────────────────────────────────
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/factory", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/production", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/quality", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/cases", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cases", priority: 0.7, changeFrequency: "weekly" },

  // ── L2 （ / ）─────────────────
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },

  // ── L3 （）────────────────────────
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/shipping-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = LAST_MOD;

  // Static pages — normalize all URLs to trailing-slash form to match trailingSlash: true
  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((r) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${SITE_URL}${withSlash(r.path)}`,
      lastModified: now,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    };
    // Attach relevant images for product & fabric pages to feed Google Images.
    if (r.path === "/products") {
      entry.images = [`${SITE_URL}/og-default.jpg`];
    } else if (r.path.startsWith("/products/")) {
      const slug = r.path.replace("/products/", "");
      entry.images = [`${SITE_URL}/og-default.jpg`, `${SITE_URL}/products/${slug}.webp`];
    } else if (r.path === "/fabric" || r.path === "/fabric/cotton") {
      entry.images = [`${SITE_URL}/fabric-hero.webp`, `${SITE_URL}/og-default.jpg`];
    } else if (r.path === "/") {
      entry.images = [`${SITE_URL}/og-default.jpg`];
    } else if (r.path === "/technique") {
      entry.images = [`${SITE_URL}/og-default.jpg`];
    }
    return entry;
  });

  // Case-study slugs are currently thin/empty and have been marked noindex.
  // Excluding them from sitemap so Google doesn't waste crawl budget on them.
  // Re-add here once their content is rewritten to ≥ 600 words.

  // ── 20 （SEO ）────────────────
  const techniqueEntries: MetadataRoute.Sitemap = techniques.map((t) => ({
    url: `${SITE_URL}${withSlash(`/technique/${t.slug}`)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [`${SITE_URL}/og-default.jpg`],
  }));

  // ── （）────────────────────
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}${withSlash(`/blog/${p.slug}`)}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [`${SITE_URL}/og-default.jpg`],
  }));

  // ── 98  tag archive （29  + 42  + 27 ）────
  const tagEntries: MetadataRoute.Sitemap = (["category", "sport", "scenario"] as const).flatMap(
    (dim) =>
      getAllTagSlugs(dim).map(({ slug }) => ({
        url: `${SITE_URL}${withSlash(`/tag/${dim}/${slug}`)}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        images: [`${SITE_URL}/og-default.jpg`],
      }))
  );

  // ── 120 （all-over-print ）────
  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}${withSlash(`/products/all/${p.slug}`)}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: [`${SITE_URL}/og-default.jpg`],
  }));

  return [...staticEntries, ...techniqueEntries, ...blogEntries, ...tagEntries, ...productEntries];
}