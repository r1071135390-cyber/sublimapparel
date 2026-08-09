import type { MetadataRoute } from "next";
import { industries } from "@/lib/cases";

// Sitemap config
// Add new static routes here + bump `priority` if it's a key conversion page.
// Dynamic routes (cases, future products, future solutions) are appended below.

// COZE_PROJECT_DOMAIN_DEFAULT is already prefixed with https://, so use it directly.
const rawDomain = process.env.COZE_PROJECT_DOMAIN_DEFAULT ?? "https://sublimapparel.com";
const SITE_URL = rawDomain.replace(/\/+$/, ""); // strip trailing slash if any
const LAST_MOD = new Date(); // bump when meaningful content changes ship

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
  // ── L1 顶层（最高权重）──────────────────────────────────
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/products", priority: 0.9, changeFrequency: "weekly" },
  { path: "/products/t-shirts", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/hoodies", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/jerseys", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/racing", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/cycling", priority: 0.85, changeFrequency: "monthly" },
  { path: "/products/golf-bowling", priority: 0.85, changeFrequency: "monthly" },
  { path: "/get-a-quote", priority: 0.95, changeFrequency: "monthly" }, // 询盘主入口
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },

  // ── L2 蓝海 SEO 王炸（新加的，吃 0 竞争词）──────────────
  { path: "/fabric", priority: 0.85, changeFrequency: "monthly" },
  { path: "/fabric/cotton", priority: 0.9, changeFrequency: "monthly" }, // 王炸
  { path: "/shipping", priority: 0.8, changeFrequency: "monthly" },
  { path: "/shipping/ddp", priority: 0.9, changeFrequency: "monthly" }, // 王炸
  { path: "/shipping/us-warehouse", priority: 0.9, changeFrequency: "monthly" }, // 王炸
  { path: "/shipping/global", priority: 0.9, changeFrequency: "monthly" }, // 王炸

  // ── L2 信任 / 案例 ────────────────────────────────────
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/factory", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/production", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/quality", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/cases", priority: 0.75, changeFrequency: "monthly" },
  { path: "/about/faq", priority: 0.7, changeFrequency: "monthly" },
  { path: "/cases", priority: 0.7, changeFrequency: "weekly" },

  // ── L3 法务（必要但不指望流量）────────────────────────
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/shipping-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = LAST_MOD;

  // Static pages
  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  // Dynamic: 12 case-study slugs
  const caseEntries: MetadataRoute.Sitemap = industries.map((ind) => ({
    url: `${SITE_URL}/cases/${ind.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...caseEntries];
}
