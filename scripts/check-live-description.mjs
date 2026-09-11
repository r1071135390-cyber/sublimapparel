#!/usr/bin/env node
// scripts/check-live-description.mjs
// Quick check: fetch a live URL and report its meta description + length.
const url = process.argv[2];
if (!url) { console.error("usage: node check-live-description.mjs <url>"); process.exit(1); }
const r = await fetch(url, { cache: "no-store" });
const html = await r.text();
const m = html.match(/<meta\s+name="description"\s+content="([^"]+)"/i);
const desc = m ? m[1] : "(not found)";
console.log("URL:", url);
console.log("HTTP:", r.status);
console.log("Description (raw):", desc);
console.log("Length:", desc.length);
if (desc.length > 160) console.log("⚠ OVER 160 CHARS");
if (desc.length < 70) console.log("⚠ UNDER 70 CHARS");
