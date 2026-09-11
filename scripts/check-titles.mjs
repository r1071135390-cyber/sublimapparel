#!/usr/bin/env node
// Quick check: title/description lengths on key pages.
import https from "node:https";
const HOST = "sublimapparel.com";
const PAGES = [
  "/", "/about/", "/contact/", "/shipping/", "/fabric/", "/technique/",
  "/products/", "/solutions/", "/yiwu-factory-whatsapp/", "/get-a-quote/",
  "/cases/", "/industries/",
  "/industries/sports-teams-leagues/", "/industries/endurance-race-events/",
  "/industries/events-conferences/", "/industries/music-festival-tour-merchandise/",
  "/industries/corporate-employee-programs/", "/industries/schools-universities-greek-life/",
  "/industries/breweries-coffee-hospitality/", "/industries/promotional-marketing-agencies/",
  "/industries/trade-shows-display/", "/industries/apparel-brands-agencies/",
  "/industries/political-campaigns/", "/industries/e-commerce-fulfillment/",
  "/compare/sublimation-vs-dtg/", "/compare/ddp-vs-fob/",
  "/production/", "/samples/", "/pricing/", "/quality-control/",
  "/terms/", "/privacy/", "/shipping-policy/", "/shipping/us-warehouse/",
  "/site-map/",
];
function fetch(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve({ status: res.statusCode, body: data }));
    });
    req.on("error", (e) => resolve({ status: 0, error: e.message }));
    req.setTimeout(15000, () => req.destroy(new Error("timeout")));
  });
}
for (const p of PAGES) {
  const r = await fetch(`https://${HOST}${p}`);
  if (r.status !== 200) { console.log(p.padEnd(50), r.status); continue; }
  const m1 = r.body.match(/<title[^>]*>([^<]+)<\/title>/i);
  const m2 = r.body.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
  const t = m1 ? m1[1] : "";
  const d = m2 ? m2[1] : "";
  const flag = (t.length > 60 ? "T!" : t.length < 20 ? "t!" : "") + (d.length > 160 ? "D!" : d.length < 70 ? "d!" : "");
  console.log(p.padEnd(50), t.length.toString().padStart(3), d.length.toString().padStart(3), flag.padEnd(4), t.substring(0, 70));
}
