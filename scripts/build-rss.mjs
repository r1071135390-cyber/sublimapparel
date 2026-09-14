#!/usr/bin/env node
// 2026-09-14 (R64 follow-up): pre-generate the SublimApparel blog RSS
// 2.0 feed as a static XML file at public/blog/feed.xml/index.xml.
//
// Why this script exists:
//   Next.js `output: "export"` does NOT generate static files for
//   `route.ts` handlers whose URL path contains a dot extension like
//   `.xml`. The App Router treats the route as a "non-page" segment
//   and silently skips it — the build "succeeds" (no error) but the
//   file never lands in out/. We confirmed this empirically: with
//   src/app/blog/feed.xml/route.ts exporting dynamic = "force-static"
//   and GET(), `next build` produced no out/blog/feed.xml/index.html,
//   and Cloudflare Pages served /blog/feed.xml/ as a 404 even though
//   the surrounding /blog/ tree was deployed.
//
// Fix:
//   Drop the route.ts approach entirely and pre-render the RSS body
//   into a real static file under public/blog/feed.xml/index.xml.
//   Next.js copies any file under public/ verbatim into out/, so
//   /blog/feed.xml/ resolves on Cloudflare Pages as a real file.
//   The bare /blog/feed.xml (no trailing slash) is served by a 301
//   in public/_redirects, so no second sibling file is needed.
//
// This script reads the same blogPosts source that /blog/[slug] uses
// (src/lib/blog.ts) and emits the same XML the route.ts handler used
// to emit — byte-equivalent so existing RSS subscribers see no diff
// at the new deploy.
//
// Idempotency:
//   Re-running overwrites the same file. Errors fail loud (exit 1).

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com";

const RSS_OUT_DIR = path.join(PROJECT_ROOT, "public", "blog", "feed.xml");
const RSS_OUT_FILE = path.join(RSS_OUT_DIR, "index.xml");
const RSS_OUT_FILE_NO_SLASH = path.join(
  PROJECT_ROOT,
  "public",
  "blog",
  "feed.xml.bak.xml",
);

// ----------------------------------------------------------------------------
// Extract blogPosts from src/lib/blog.ts.
//
// We can't import the TS file directly (Node ESM with .mjs can't
// load .ts). Instead, we parse the file with a small regex extractor
// that pulls the `blogPosts` array literal — sufficient because
// blogPosts is a single top-level `export const blogPosts: BlogPost[]`
// declaration with no computed values, just object literals. Any
// future change that introduces a getter / dynamic value into the
// array will need a real TS->JS build step instead of this regex
// pass.
// ----------------------------------------------------------------------------

async function loadBlogPosts() {
  const blogTsPath = path.join(PROJECT_ROOT, "src", "lib", "blog.ts");
  const src = await readFile(blogTsPath, "utf8");

  // Find the start of the array literal — the `[` immediately
  // following the `=` in `export const blogPosts: BlogPost[] = [`.
  // We can't just take src.indexOf("[", "export const blogPosts")
  // because that lands on the `[` inside `BlogPost[]` (the type
  // annotation, 5 chars BEFORE the actual array-literal `[`).
  const anchor = src.indexOf("export const blogPosts");
  if (anchor === -1) {
    throw new Error(
      `[build-rss] could not find 'export const blogPosts' in ${blogTsPath}`,
    );
  }
  const literalStart = src.indexOf("= [", anchor);
  if (literalStart === -1) {
    throw new Error(
      `[build-rss] could not find '= [' after 'export const blogPosts' in ${blogTsPath}`,
    );
  }
  // Skip the `= [` (3 chars) — literalStart now points AT the `[`.
  const arrayLiteralOpen = literalStart + 2;

  // Find the matching closing `];` by scanning bracket depth. Start
  // with depth=1 (the array-literal `[` at arrayLiteralOpen is
  // already open) and scan FORWARD from arrayLiteralOpen+1.
  let depth = 1;
  let end = -1;
  for (let i = arrayLiteralOpen + 1; i < src.length; i++) {
    const c = src[i];
    if (c === "[") depth++;
    else if (c === "]") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  if (end === -1) {
    throw new Error(`[build-rss] could not find closing ']' for blogPosts`);
  }

  const literal = src.slice(arrayLiteralOpen, end + 1);

  // Each post is `{ ... }` with string/number/array literal values.
  // We convert it to a JS-evaluable form by:
  //   1. Replacing TS-only `as Foo` casts (we strip them, no-op)
  //   2. Stripping `optional?: boolean;` style type annotations
  //   3. Converting template literals to plain strings (none used in
  //      blogPosts today)
  // Then we eval in an isolated Function scope.
  const cleaned = literal
    // Drop TS interface casts inside the array (none expected in
    // blogPosts, but be safe): ` as Foo`
    .replace(/\s+as\s+[A-Z][A-Za-z0-9_<>|&\[\]]+/g, "")
    // Drop `satisfies X` (none expected, but be safe)
    .replace(/\s+satisfies\s+[A-Z][A-Za-z0-9_<>|&\[\]]+/g, "")
    // Drop trailing type annotations on object literal keys:
    //   `foo: string` -> `foo` (we can't blindly do this — the value
    //   would be lost). Instead, we keep object literal shape and
    //   rely on the fact that no `?:` keys appear in blogPosts and
    //   that no `key: TypeName` style type annotations appear inline
    //   (all typing lives at the interface declaration, not at each
    //   literal site).
    .trim();

  // Evaluate the array literal in an isolated scope. We use
  // `new Function` instead of direct eval to keep the lexical scope
  // empty and prevent access to the script's own bindings.
  // eslint-disable-next-line no-new-func
  const posts = new Function(`return (${cleaned});`)();
  if (!Array.isArray(posts)) {
    throw new Error(`[build-rss] extracted posts is not an array`);
  }
  return posts;
}

// ----------------------------------------------------------------------------
// XML helpers (byte-equivalent to what the route.ts handler used to
// emit, so existing RSS subscribers see no diff).
// ----------------------------------------------------------------------------

const escapeXml = (raw) =>
  String(raw)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const cdata = (raw) =>
  String(raw)
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim();

const abs = (p) => {
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  if (p.startsWith("/")) return `${SITE_URL}${p}`;
  return `${SITE_URL}/${p}`;
};

const rfc822 = (iso) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
};

function buildRss(posts) {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const lastBuild = sorted.length
    ? rfc822(sorted[0].date)
    : new Date().toUTCString();

  const items = sorted
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}/`;
      const description = escapeXml(p.excerpt);
      const title = escapeXml(p.title);
      const content = escapeXml((p.intro || []).join("\n\n"));
      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <author>info@sublimapparel.com (${escapeXml(p.author)})</author>
      <category>${escapeXml(p.category)}</category>
      <description>${description}</description>
      <content:encoded><![CDATA[${cdata(content)}]]></content:encoded>
      <enclosure url="${abs(p.coverImage)}" type="image/webp" length="0" />
    </item>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>SublimApparel Blog — Apparel Manufacturing Insights</title>
    <link>${SITE_URL}/blog/</link>
    <description>Industry guides, factory stories, and B2B apparel manufacturing insights from a 2,000 m² Yiwu sublimation factory. Sublimation vs DTG, DDP shipping, fabric guides, esports jersey fabric, and more.</description>
    <language>en-US</language>
    <copyright>Copyright © ${new Date().getFullYear()} SublimApparel (Yiwu HomeDorm Commodity Manufacturing Co., Ltd.)</copyright>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <ttl>60</ttl>
    <image>
      <url>${SITE_URL}/sublimapparel-logo-v2.webp</url>
      <title>SublimApparel</title>
      <link>${SITE_URL}/</link>
      <width>880</width>
      <height>352</height>
    </image>
    <atom:link href="${SITE_URL}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <managingEditor>info@sublimapparel.com (Ramon Wang, SublimApparel)</managingEditor>
    <webMaster>info@sublimapparel.com (SublimApparel Web Team)</webMaster>
${items}
  </channel>
</rss>
`;
}

async function main() {
  const posts = await loadBlogPosts();
  const xml = buildRss(posts);

  await mkdir(RSS_OUT_DIR, { recursive: true });
  await writeFile(RSS_OUT_FILE, xml, "utf8");

  // The bare /blog/feed.xml (no trailing slash) is served via the
  // 301 redirect in public/_redirects (/blog/feed.xml -> /blog/feed.xml/),
  // so we do NOT emit a second "no-slash" sibling file. Emitting a
  // `public/blog/feed.xml.bak.xml` (or any sibling with a different
  // extension) would only pollute the served tree and confuse
  // aggregators that index /blog/feed.xml/* by glob.

  console.log(
    `[build-rss] wrote ${posts.length} posts to public/blog/feed.xml/index.xml`,
  );
}

main().catch((err) => {
  console.error("[build-rss] FAILED:", err);
  process.exit(1);
});
