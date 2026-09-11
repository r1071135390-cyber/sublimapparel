#!/usr/bin/env node
// verify-breadcrumb-online.mjs
// Online verification: fetch each Round 4 target page and confirm the
// post-build injector actually wrote the page-level BreadcrumbList into
// the live HTML.

import https from "node:https";

const PAGES = [
  { path: "/", expectBreadcrumb: true, expectSubstr: "Home" },
  { path: "/shipping/", expectBreadcrumb: true, expectSubstr: "Shipping" },
  { path: "/shipping/ddp/", expectBreadcrumb: true, expectSubstr: "DDP" },
  { path: "/shipping/global/", expectBreadcrumb: true, expectSubstr: "Global" },
  { path: "/shipping/us-warehouse/", expectBreadcrumb: true, expectSubstr: "US Warehouse" },
  { path: "/fabric/cotton/", expectBreadcrumb: true, expectSubstr: "Cotton" },
  { path: "/technique/", expectBreadcrumb: true, expectSubstr: "Technique" },
  // A page we DID NOT add breadcrumb to (control — should not have page-injected marker)
  { path: "/contact/", expectBreadcrumb: false, expectSubstr: null },
];

const HOST = "sublimapparel.com";

function fetch(path) {
  return new Promise((resolve, reject) => {
    const req = https.get(
      { host: HOST, path, headers: { "User-Agent": "Mozilla/5.0 (verify-breadcrumb)" } },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on("error", reject);
    req.setTimeout(20000, () => req.destroy(new Error("timeout")));
  });
}

const FINGERPRINT_RX = /data-jsonld-fp="([a-z0-9-]+)"/g;
const BREADCRUMB_RX = /"@type"\s*:\s*"BreadcrumbList"/;

(async () => {
  let ok = 0;
  let fail = 0;
  for (const p of PAGES) {
    const { status, body } = await fetch(p.path);
    if (status !== 200) {
      console.log(`✗ ${p.path}  HTTP ${status}`);
      fail++;
      continue;
    }

    const hasInjectedScript = body.includes('data-jsonld-source="page-injected"');
    const fingerprints = [...body.matchAll(FINGERPRINT_RX)].map((m) => m[1]);
    const hasBreadcrumb = BREADCRUMB_RX.test(body);

    // Find any BreadcrumbList position
    const breadcrumbPos = body.search(BREADCRUMB_RX);
    let breadcrumbContext = "";
    if (breadcrumbPos !== -1) {
      const start = Math.max(0, breadcrumbPos - 30);
      const end = Math.min(body.length, breadcrumbPos + 200);
      breadcrumbContext = body.slice(start, end).replace(/\s+/g, " ");
    }

    if (p.expectBreadcrumb) {
      const expectName = p.expectSubstr;
      const hasName = expectName ? body.includes(`"name":"${expectName}"`) : true;
      if (hasInjectedScript && hasBreadcrumb && hasName) {
        console.log(`✓ ${p.path}  breadcrumb OK (fp: ${fingerprints[0] || "n/a"})`);
        ok++;
      } else {
        console.log(
          `✗ ${p.path}  injected=${hasInjectedScript} breadcrumb=${hasBreadcrumb} name(${expectName})=${hasName}`
        );
        if (breadcrumbContext) console.log(`    ctx: ${breadcrumbContext}`);
        fail++;
      }
    } else {
      // Control page
      if (!hasInjectedScript) {
        console.log(`✓ ${p.path}  control — no page-injected script (expected)`);
        ok++;
      } else {
        console.log(`✗ ${p.path}  control — unexpected injected script present`);
        fail++;
      }
    }
  }
  console.log(`\n=== ${ok} pass, ${fail} fail ===`);
  process.exit(fail > 0 ? 1 : 0);
})();
