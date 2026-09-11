import type { MetadataRoute } from "next";
import { techniques } from "@/lib/techniques";
import { blogPosts } from "@/lib/blog";
import {
  getAllTagSlugs,
  ALL_TAGS,
  type TagDimension,
} from "@/lib/tag-archive";
import { products } from "@/lib/products-data";
import { fabricTypes } from "@/lib/fabric-data";
import { extraFabricTypes } from "@/lib/fabric-extra";

export const dynamic = 'force-static';

// Sitemap config
// Add new static routes here + bump `priority` if it's a key conversion page.
// Dynamic routes (cases, future products, future solutions) are appended below.

// COZE_PROJECT_DOMAIN_DEFAULT is already prefixed with https://, so use it directly.
const rawDomain = process.env.COZE_PROJECT_DOMAIN_DEFAULT ?? "https://sublimapparel.com";
const SITE_URL = rawDomain.replace(/\/+$/, ""); // strip trailing slash if any

// Trailing-slash helper — site uses trailingSlash: true, so sitemap URLs must too.
const withSlash = (p: string) => (p.endsWith("/") ? p : `${p}/`);

// IMPORTANT: lastmod stability
// If every build rewrites every URL's `lastmod` to build time, Googlebot
// re-evaluates every page on every deploy — that destabilizes rankings for
// pages whose content didn't actually change. We only bump a route's lastmod
// when its content actually changes.
//
// Strategy:
//   • STATIC_LAST_MOD  — single fixed anchor for hub/category pages whose
//                        content is "stable + manually edited". When you ship
//                        a meaningful content edit on one of those pages,
//                        override it via the route's `lastModified` field.
//   • TODAY            — used for the small handful of pages whose copy was
//                        touched in this SEO traffic-fix push.
//   • p.date           — used for blog posts (their real publish date).
//   • dynamic routes (techniques / tags / products / fabrics) keep the
//     STATIC_LAST_MOD anchor too: their data is regenerated from TS files
//     on each build, but the *content* rarely changes day-to-day. If a
//     single product is rewritten, we add a per-route override later.
const STATIC_LAST_MOD = new Date("2025-08-18T00:00:00.000Z"); // last big SEO/content refresh
const TODAY = new Date("2026-09-11T00:00:00.000Z"); // this push: /contact copy + /fabric & /about FAQPage JSON-LD

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
  /** Override lastmod for this route. Defaults to STATIC_LAST_MOD. */
  lastModified?: Date;
};

const ROUTES: SitemapRoute[] = [
  // ── L1 （）──────────────────────────────────
  { path: "/", priority: 1.0, changeFrequency: "weekly", lastModified: TODAY }, // 2026-09-11 push: refreshed contact copy + FAQPage on /fabric & /about
  { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  { path: "/products/t-shirts", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/hoodies", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/jerseys", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/running-shirts", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/training-apparel", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/racing", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/cycling", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/golf", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/bowling", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/esports", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/all", priority: 0.9, changeFrequency: "weekly" }, // all-over-print catalog
  { path: "/get-a-quote", priority: 0.95, changeFrequency: "monthly" }, // 询盘主入口
  { path: "/contact", priority: 0.7, changeFrequency: "monthly", lastModified: TODAY }, // 2026-09-11 push: rewritten title/H1/description
  { path: "/yiwu-factory-whatsapp", priority: 0.9, changeFrequency: "monthly" }, // 2026-09-11 push: dedicated WhatsApp landing page for high-exposure "Yiwu factory WhatsApp" queries

  // ── L2  SEO （， 0 ）──────────────
  { path: "/fabric", priority: 0.85, changeFrequency: "monthly", lastModified: TODAY }, // 2026-09-11 push: added FAQPage JSON-LD
  { path: "/fabric/cotton", priority: 0.9, changeFrequency: "monthly" }, // 王炸
  { path: "/technique", priority: 0.85, changeFrequency: "monthly" },
  { path: "/shipping", priority: 0.8, changeFrequency: "monthly" },
  { path: "/shipping/ddp", priority: 0.9, changeFrequency: "monthly" }, // 王炸
  { path: "/shipping/us-warehouse", priority: 0.1, changeFrequency: "yearly" }, // placeholder — not actively promoted
  { path: "/shipping/global", priority: 0.9, changeFrequency: "monthly" }, // 王炸

  // ── （）──────────
  { path: "/all-over-print", priority: 0.95, changeFrequency: "monthly" }, // P1 — all over print 流量入口

  // ── L2 Hub pages (created in SEO round 2) ───────────────
  { path: "/industries", priority: 0.85, changeFrequency: "monthly" }, // 12 industries hub
  { path: "/tag", priority: 0.5, changeFrequency: "monthly" }, // tag archive hub

  // ── L3 Comparison pages (B2B decision-funnel SEO) ──────
  { path: "/compare/polyester-vs-cotton-sublima", priority: 0.85, changeFrequency: "monthly" },
  { path: "/compare/sublimation-vs-dtg", priority: 0.85, changeFrequency: "monthly" },
  { path: "/compare/ddp-vs-fob", priority: 0.8, changeFrequency: "monthly" },

  // ── L3 Policy / guide pages (B2B trust + long-tail) ────
  { path: "/pricing", priority: 0.85, changeFrequency: "monthly" },
  { path: "/production", priority: 0.8, changeFrequency: "monthly" },
  { path: "/samples", priority: 0.75, changeFrequency: "monthly" },

  // ── （）──────────────────────────
  { path: "/login", priority: 0.3, changeFrequency: "yearly" },
  { path: "/register", priority: 0.3, changeFrequency: "yearly" },

  // ── L2  /  ────────────────────────────────────
  { path: "/about", priority: 0.7, changeFrequency: "monthly", lastModified: TODAY }, // 2026-09-11 push: added FAQPage JSON-LD
  { path: "/about/factory", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/production", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/quality", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/cases", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cases", priority: 0.7, changeFrequency: "weekly" },

  // ── Case study detail pages ──
  { path: "/cases/endurance-race-events", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cases/music-tour-festival", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cases/sports-teams", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cases/endurance-race-events/lakeshore-marathon-2025", priority: 0.65, changeFrequency: "yearly" },
  { path: "/cases/endurance-race-events/alpine-ultra-50k-2024", priority: 0.65, changeFrequency: "yearly" },
  { path: "/cases/music-tour-festival/harbor-sound-festival-2025", priority: 0.65, changeFrequency: "yearly" },
  { path: "/cases/sports-teams/nova-racing-academy-2025", priority: 0.65, changeFrequency: "yearly" },


  // ── L2  Solution pages (6) — Phase 1 SEO focus ────────────────
  { path: "/teams-sports-apparel", priority: 0.95, changeFrequency: "weekly" },
  { path: "/event-festivals-conferences", priority: 0.95, changeFrequency: "weekly" },
  { path: "/corporate-organization-apparel", priority: 0.95, changeFrequency: "weekly" },
  { path: "/promotional-marketing-apparel", priority: 0.95, changeFrequency: "weekly" },
  { path: "/apparel-brands-agencies", priority: 0.95, changeFrequency: "weekly" },
  { path: "/e-commerce-fulfillment", priority: 0.95, changeFrequency: "weekly" },

  // ── L2  Industry profile pages (12) — Phase 1 SEO focus ────────
  { path: "/industries/sports-teams-leagues", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries/endurance-race-events", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries/events-conferences", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries/music-festival-tour-merchandise", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries/corporate-employee-programs", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries/schools-universities-greek-life", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries/breweries-coffee-hospitality", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries/promotional-marketing-agencies", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries/trade-shows-display", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries/apparel-brands-agencies", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries/political-campaigns", priority: 0.9, changeFrequency: "weekly" },
  { path: "/industries/e-commerce-fulfillment", priority: 0.9, changeFrequency: "weekly" },

  // ── L2  Tools & Resources hub ─────────────────
  { path: "/resources", priority: 0.85, changeFrequency: "weekly" },

  // ── L2 （ / ）─────────────────
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },

  // ── L3 （）────────────────────────
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/shipping-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages — use each route's own lastModified override, or fall back
  // to the stable STATIC_LAST_MOD anchor. We deliberately do NOT use
  // `new Date()` here: see the comment on STATIC_LAST_MOD above.
  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((r) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${SITE_URL}${withSlash(r.path)}`,
      lastModified: r.lastModified ?? STATIC_LAST_MOD,
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
  // Techniques are data-driven and rarely change day-to-day. Pin to
  // STATIC_LAST_MOD to avoid sitemap churn.
  const techniqueEntries: MetadataRoute.Sitemap = techniques.map((t) => ({
    url: `${SITE_URL}${withSlash(`/technique/${t.slug}`)}`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    images: [`${SITE_URL}/og-default.jpg`],
  }));

  // ── （）────────────────────
  // Blog posts: use the real publish date so freshly-edited posts surface
  // their bump to Googlebot.
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${SITE_URL}${withSlash(`/blog/${p.slug}`)}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [`${SITE_URL}/og-default.jpg`],
  }));

  // ── 98  tag archive （29  + 42  + 27 ）────
  // Tag pages are aggregated from product data; their content changes only
  // when we add/remove tag definitions. Pin to STATIC_LAST_MOD to avoid churn.
  //
  // SEO round 2 (2026-09-11): only the 10 B2B-winner tags are indexable; the
  // other 35 emit <meta name="robots" content="noindex, follow"> from the page
  // template. Excluding them from the sitemap here stops Google from crawling
  // a URL we have told it not to index (avoids mixed signals + crawl budget
  // waste). Internal PageRank still flows through the `follow` attribute.
  const isIndexable = (dim: TagDimension, label: string) =>
    ALL_TAGS[dim]?.[label]?.indexable === true;
  const tagEntries: MetadataRoute.Sitemap = (["category", "sport", "scenario"] as const).flatMap(
    (dim) =>
      getAllTagSlugs(dim)
        .filter(({ value }) => isIndexable(dim, value))
        .map(({ slug }) => ({
          url: `${SITE_URL}${withSlash(`/tag/${dim}/${slug}`)}`,
          lastModified: STATIC_LAST_MOD,
          changeFrequency: "monthly" as const,
          priority: 0.7,
          images: [`${SITE_URL}/og-default.jpg`],
        }))
  );

  // ── 120 （all-over-print ）────
  // Product detail pages in the all-over-print catalog. Same logic as tags:
  // data-driven, content rarely changes day-to-day — pin to STATIC_LAST_MOD.
  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}${withSlash(`/products/all/${p.slug}`)}`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: [`${SITE_URL}/og-default.jpg`],
  }));

  // ── Fabric detail pages (65 slugs from fabric-data.ts + fabric-extra.ts) ──
  // These were previously discoverable only via the /fabric/ hub cross-links
  // and were absent from the sitemap. Add them so Google indexes them directly
  // and passes the full weight signal. Pin to STATIC_LAST_MOD — fabric slugs
  // are stable, and rewriting every fabric URL on every build destabilizes
  // rankings without any real content change.
  const allFabricSlugs = Array.from(
    new Set([...fabricTypes, ...extraFabricTypes].map((f) => f.slug))
  );
  const fabricEntries: MetadataRoute.Sitemap = allFabricSlugs.map((slug) => ({
    url: `${SITE_URL}${withSlash(`/fabric/${slug}`)}`,
    lastModified: STATIC_LAST_MOD,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: [`${SITE_URL}/og-default.jpg`],
  }));

  return [
    ...staticEntries,
    ...techniqueEntries,
    ...blogEntries,
    ...tagEntries,
    ...productEntries,
    ...fabricEntries,
  ];
}