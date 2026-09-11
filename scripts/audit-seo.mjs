#!/usr/bin/env node
// scripts/audit-seo.mjs
// Comprehensive on-page SEO audit. Fetches a list of important pages from
// production, extracts title/description/H1/H2/canonical/og:image/JSON-LD
// using cheerio (correct HTML parsing), and reports problems by category.

import https from "node:https";
import fs from "node:fs";
import path from "node:path";
import * as cheerio from "cheerio";

const HOST = "sublimapparel.com";
const PAGES = [
  "/",
  "/about/",
  "/contact/",
  "/shipping/",
  "/shipping/ddp/",
  "/shipping/global/",
  "/shipping/us-warehouse/",
  "/fabric/",
  "/fabric/cotton/",
  "/technique/",
  "/products/",
  "/solutions/",
  "/yiwu-factory-whatsapp/",
  "/get-a-quote/",
  "/cases/",
  "/industries/",
  "/industries/sports-teams-leagues/",
  "/industries/endurance-race-events/",
  "/industries/events-conferences/",
  "/industries/music-festival-tour-merchandise/",
  "/industries/corporate-employee-programs/",
  "/industries/schools-universities-greek-life/",
  "/industries/breweries-coffee-hospitality/",
  "/industries/promotional-marketing-agencies/",
  "/industries/trade-shows-display/",
  "/industries/apparel-brands-agencies/",
  "/industries/political-campaigns/",
  "/industries/e-commerce-fulfillment/",
  "/compare/sublimation-vs-dtg/",
  "/compare/ddp-vs-fob/",
  "/production/",
  "/samples/",
  "/pricing/",
  "/quality-control/",
  "/resources/",
  "/event-timeline/",
  "/us-size-guide/",
  "/how-to-source/",
  "/90-day-program/",
  "/all-over-print/",
  "/teams-sports-apparel/",
  "/event-festivals-conferences/",
  "/corporate-organization-apparel/",
  "/promotional-marketing-apparel/",
  "/apparel-brands-agencies/",
  "/e-commerce-fulfillment/",
  "/terms/",
  "/privacy/",
  "/shipping-policy/",
  "/site-map/",
  "/sitemap.xml",
  "/robots.txt",
  "/llms.txt",
  "/manifest.webmanifest",
  "/icon.png",
  "/favicon.ico",
  "/og/og-home.webp",
  "/og-default.jpg",
];

function fetch(url) {
  return new Promise((resolve) => {
    const req = https.get(
      url,
      { headers: { "User-Agent": "Mozilla/5.0 (audit-seo)" } },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
      }
    );
    req.on("error", (e) => resolve({ status: 0, error: e.message }));
    req.setTimeout(20000, () => req.destroy(new Error("timeout")));
  });
}

const report = [];
let totalProblems = 0;
const byCategory = {
  missingTitle: 0,
  titleTooLong: 0,
  titleTooShort: 0,
  missingDesc: 0,
  descTooLong: 0,
  descTooShort: 0,
  missingCanonical: 0,
  canonicalMismatch: 0,
  missingH1: 0,
  multipleH1: 0,
  missingOgImage: 0,
  brokenOgImage: 0,
  missingJsonLd: 0,
  multipleJsonLd: 0,
  noHtmlLang: 0,
  noindex: 0,
  statusError: 0,
  other: 0,
};

const log = (...args) => process.stdout.write(args.join(" "));
const logln = (...args) => console.log(args.join(" "));

for (const p of PAGES) {
  const r = await fetch(`https://${HOST}${p}`);
  if (r.status === 0) {
    logln(`  ${p.padEnd(48)} FETCH ERROR: ${r.error}`);
    continue;
  }

  // Skip non-HTML responses for SEO analysis
  const ct = (r.headers["content-type"] || "").toLowerCase();
  if (p === "/robots.txt" || p === "/llms.txt" || p === "/sitemap.xml" || !ct.includes("html")) {
    logln(`  ${p.padEnd(48)} ${r.status} (${r.body.length}b, ${ct})`);
    report.push({ path: p, status: r.status, type: "non-html" });
    continue;
  }

  const $ = cheerio.load(r.body, { decodeEntities: false });
  const title = $("title").first().text().trim();
  const desc = $('meta[name="description"]').attr("content") || "";
  const canonical = $('link[rel="canonical"]').attr("href") || "";
  const ogImage = $('meta[property="og:image"]').attr("content") || $('meta[name="twitter:image"]').attr("content") || "";
  const h1s = $("h1").map((_, e) => $(e).text().replace(/\s+/g, " ").trim()).get().filter((t) => t);
  const h2s = $("h2").map((_, e) => $(e).text().replace(/\s+/g, " ").trim()).get().filter((t) => t);
  const lang = $("html").attr("lang") || "";
  const robots = $('meta[name="robots"]').attr("content") || "";
  const jsonLdScripts = $('script[type="application/ld+json"]');
  const jsonLdCount = jsonLdScripts.length;
  const is404 = r.body.includes("Page not found") || /<title>[^<]*404[^<]*<\/title>/i.test(r.body);

  const problems = [];
  if (r.status !== 200) { problems.push(`status=${r.status}`); byCategory.statusError++; }
  if (is404 && r.status === 200) problems.push("404 page");
  if (!title) { problems.push("no title"); byCategory.missingTitle++; }
  if (title && title.length > 70) { problems.push(`title too long (${title.length}ch)`); byCategory.titleTooLong++; }
  if (title && title.length > 0 && title.length < 20 && !p.endsWith("/admin/")) { problems.push(`title very short (${title.length}ch)`); byCategory.titleTooShort++; }
  if (!desc) { problems.push("no description"); byCategory.missingDesc++; }
  if (desc && desc.length > 160) { problems.push(`desc too long (${desc.length}ch)`); byCategory.descTooLong++; }
  if (desc && desc.length > 0 && desc.length < 70) { problems.push(`desc short (${desc.length}ch)`); byCategory.descTooShort++; }
  if (!canonical) { problems.push("no canonical"); byCategory.missingCanonical++; }
  if (canonical && !canonical.startsWith("https://sublimapparel.com/")) { problems.push(`canonical external: ${canonical}`); byCategory.canonicalMismatch++; }
  if (h1s.length === 0) { problems.push("no H1"); byCategory.missingH1++; }
  if (h1s.length > 1) { problems.push(`multiple H1s (${h1s.length})`); byCategory.multipleH1++; }
  if (!ogImage) { problems.push("no og:image"); byCategory.missingOgImage++; }
  if (ogImage && !ogImage.startsWith("https://sublimapparel.com/")) problems.push(`og:image external: ${ogImage}`);
  if (jsonLdCount === 0) { problems.push("no JSON-LD"); byCategory.missingJsonLd++; }
  if (!lang) { problems.push("no html lang"); byCategory.noHtmlLang++; }
  if (robots && /noindex/i.test(robots)) { problems.push(`noindex (${robots})`); byCategory.noindex++; }

  if (problems.length > 0) totalProblems += problems.length;
  const status = problems.length === 0 ? "✓" : `✗ ${problems.length}`;
  logln(
    `  ${p.padEnd(48)} ${r.status.toString().padStart(3)} ${status.padEnd(4)} title=${(title.length).toString().padStart(3)}ch desc=${(desc.length).toString().padStart(3)}ch h1=${h1s.length} jsonld=${jsonLdCount} og=${ogImage ? "y" : "n"} can=${canonical ? "y" : "n"}`
  );
  if (problems.length > 0) logln(`       ${problems.join(" | ")}`);

  report.push({
    path: p,
    status: r.status,
    title,
    titleLen: title.length,
    desc,
    descLen: desc.length,
    canonical,
    ogImage,
    h1s,
    h2Count: h2s.length,
    lang,
    jsonLdCount,
    robots,
    problems,
  });
}

logln(`\n=== ${totalProblems} total problems across ${PAGES.length} URLs ===`);
logln(`\nBy category:`);
for (const [k, v] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
  if (v > 0) logln(`  ${k}: ${v}`);
}

const outPath = path.join(process.cwd(), ".audit-seo-report.json");
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));
logln(`\nFull report: ${outPath}`);
