#!/usr/bin/env node
/**
 * Auto External Link Injection
 *
 * Scans every HTML file in `out/`, finds first-occurrence matches of authoritative
 * third-party keywords (Wikipedia, Pantone, OEKO-TEX, ISO, Incoterms, etc.) in
 * body text, and wraps them in <a target="_blank" rel="noopener noreferrer">.
 *
 * Idempotent: re-running won't double-link. Capped at MAX_LINKS_PER_PAGE so we
 * never over-link (which would hurt SEO readability).
 *
 * Run order: pnpm next build → inline CSS → THIS SCRIPT.
 */

import { readFile, writeFile } from "node:fs/promises";
import { glob } from "node:fs/promises";
import { join } from "node:path";
import * as cheerio from "cheerio";

const ROOT = process.cwd();
const TARGETS_FILE = join(ROOT, "scripts/external-link-targets.json");
const OUT_DIR = join(ROOT, "out");
const EXTERNAL_CSS_MARKER = "extlink-styles";
const MAX_LINKS_PER_PAGE = 8;
const SKIP_TAGS = new Set([
  "a",
  "script",
  "style",
  "title",
  "meta",
  "link",
  "noscript",
  "svg",
  "path",
  "img",
  "video",
  "source",
  "iframe",
  "button",
  "input",
  "textarea",
  "select",
  "option",
  "code",
  "pre",
  "kbd",
  "samp",
]);

// === Step 1: Load targets and flatten into a sorted list (longest first) ===
async function loadTargets() {
  const raw = JSON.parse(await readFile(TARGETS_FILE, "utf-8"));
  const flat = [];
  for (const [cat, items] of Object.entries(raw)) {
    if (cat.startsWith("_")) continue; // skip _comment / _source_priority
    if (typeof items !== "object" || items === null) continue;
    for (const [keyword, url] of Object.entries(items)) {
      flat.push({
        keyword,
        keywordLower: keyword.toLowerCase(),
        url,
        category: cat,
      });
    }
  }
  // Longest first so multi-word matches win (e.g. "OEKO-TEX Standard 100" before "OEKO-TEX")
  flat.sort((a, b) => b.keyword.length - a.keyword.length);
  return flat;
}

// === Step 2: Build a CSS block to inject once per site ===
const CSS_BLOCK = `
<style data-${EXTERNAL_CSS_MARKER}>
.extlink{color:inherit;text-decoration:underline;text-decoration-color:rgba(0,194,255,0.5);text-underline-offset:2px;transition:color 0.15s ease,text-decoration-color 0.15s ease}
.extlink:hover{color:#00c2ff;text-decoration-color:#00c2ff}
.extlink-icon{width:0.7em;height:0.7em;margin-left:0.15em;vertical-align:-0.1em;display:inline-block;opacity:0.6;transition:opacity 0.15s ease}
.extlink:hover .extlink-icon{opacity:1}
</style>
`.trim();

const ICON_SVG = `<svg class="extlink-icon" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 8l6-6M5 2h5v5"/></svg>`;

function escapeAttr(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// === Step 3: Process a single HTML file ===
function processHtml(html, targets) {
  const $ = cheerio.load(html, { decodeEntities: false });
  let pageLinkCount = 0;
  const usedKeywords = new Set();

  // Walk through every text node in <body>, find first matching keyword
  const $body = $("body");
  if ($body.length === 0) return { html: $.html(), count: 0 };

  // Idempotency: collect keywords already linked on this page so re-runs
  // pick the SAME keywords (deterministic) instead of new ones.
  const $existing = $body.find("a.extlink[data-extlink-keyword]");
  $existing.each((_, el) => {
    const kw = $(el).attr("data-extlink-keyword");
    if (kw) usedKeywords.add(kw);
  });
  const existingCount = $existing.length;

  const allTextNodes = $body
    .find("*")
    .contents()
    .filter((_, n) => n.type === "text")
    .toArray();

  for (const node of allTextNodes) {
    if (pageLinkCount + existingCount >= MAX_LINKS_PER_PAGE) break;

    const $node = $(node);
    const $parent = $node.parent();
    const parentTag = $parent.prop("tagName")?.toLowerCase();

    // Skip text nodes inside forbidden tags
    if (!parentTag || SKIP_TAGS.has(parentTag)) continue;
    if (/^h[1-6]$/.test(parentTag)) continue; // skip headings
    if (parentTag === "a") continue; // skip any <a> (incl. our own extlinks)
    if ($parent.attr("data-no-extlink") !== undefined) continue;
    // Don't link inside existing <a> (belt-and-suspenders)
    if ($parent.parents("a").length > 0) continue;

    const text = node.data;
    if (!text || text.length < 3) continue;

    // Find first matching keyword (longest-first by target order)
    for (const target of targets) {
      if (usedKeywords.has(target.keywordLower)) continue;

      const lower = text.toLowerCase();
      const idx = lower.indexOf(target.keywordLower);
      if (idx === -1) continue;

      // Don't link at the very start of a sentence if the keyword is super short
      // (avoids linking "is" or "or" in normal prose — already filtered by length)
      const before = text.slice(0, idx);
      const match = text.slice(idx, idx + target.keyword.length);
      const after = text.slice(idx + target.keyword.length);

      const linkHtml = `<a href="${target.url}" target="_blank" rel="noopener noreferrer" class="extlink" data-extlink="1" data-extlink-keyword="${escapeAttr(target.keyword)}">${match}${ICON_SVG}</a>`;

      // cheerio's $node.replaceWith(...nodes) silently drops all but the first
      // replacement when given multiple nodes. Workaround: mutate the text node
      // in place, then insert the link and trailing text as siblings via cheerio
      // wrappers (which go through insertAfter and work correctly).
      node.data = before;
      const $link = $(linkHtml);
      $link.insertAfter($node);
      if (after) {
        // $() interprets strings as CSS selectors. Build a text node directly
        // via cheerio's parser to avoid selector interpretation.
        const tail = $.parseHTML(after, undefined, false)[0];
        if (tail) $(tail).insertAfter($link[0]);
      }

      usedKeywords.add(target.keywordLower);
      pageLinkCount++;
      break; // one link per text node
    }
  }

  // Inject CSS once per page (idempotent: check marker)
  if (pageLinkCount > 0 && $(`[data-${EXTERNAL_CSS_MARKER}]`).length === 0) {
    $("head").append(CSS_BLOCK);
  }

  return { html: $.html(), count: pageLinkCount };
}

// === Step 4: Walk all HTML files ===
async function main() {
  const targets = await loadTargets();
  console.log(
    `Loaded ${targets.length} keyword targets across ${
      new Set(targets.map((t) => t.category)).size
    } categories.`
  );

  let totalScanned = 0;
  let totalModified = 0;
  let totalLinks = 0;
  const categoryCount = new Map();
  const pageSample = [];

  // Use a manual walker (fs.glob is available in Node 22+)
  const files = [];
  async function walk(dir) {
    const { readdir, stat } = await import("node:fs/promises");
    const entries = await readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = join(dir, e.name);
      if (e.isDirectory()) await walk(full);
      else if (e.isFile() && full.endsWith(".html")) files.push(full);
    }
  }
  await walk(OUT_DIR);

  for (const file of files) {
    totalScanned++;
    const html = await readFile(file, "utf-8");
    const { html: out, count } = processHtml(html, targets);
    if (count > 0) {
      totalModified++;
      totalLinks += count;
      await writeFile(file, out);
      // Sample first 5 modified pages
      if (pageSample.length < 5) {
        const rel = file.replace(ROOT + "/", "");
        pageSample.push(`  ${rel}  (+${count} links)`);
      }
    }
  }

  console.log("");
  console.log("=== Auto External Link Injection ===");
  console.log(`Scanned:  ${totalScanned} HTML files`);
  console.log(`Modified: ${totalModified} files`);
  console.log(`Links:    ${totalLinks} total`);
  if (pageSample.length) {
    console.log("");
    console.log("Sample modified pages:");
    pageSample.forEach((s) => console.log(s));
  }
  console.log("");
}

main().catch((err) => {
  console.error("Auto external link injection failed:", err);
  process.exit(1);
});
