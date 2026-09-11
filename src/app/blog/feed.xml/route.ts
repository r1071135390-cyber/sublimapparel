// 2026-09-11 (R26-A): RSS 2.0 feed for the SublimApparel blog.
//
// Why: Google's discovery of new blog posts currently relies entirely
// on sitemaps + internal links. A live RSS feed (1) gives a
// server-to-server push signal whenever a post is published, (2) lets
// us submit the feed URL to RSS aggregator services (Feedly, Inoreader,
// etc.) for off-site discovery, (3) gives Apple Podcasts / Pocket /
// Flipboard users a one-click follow path, and (4) lets us self-link
// from the blog index page via <link rel="alternate"> so Google's
// headless crawlers can find the feed on the first request.
//
// We hand-render the XML (no extra dependency) so the feed file
// works even if `rss` libs are not present in the bundle. The
// response is cached at the edge for 1 hour; the next request after
// publish automatically picks up new content because Cloudflare
// invalidates the URL when the build re-deploys.

import { blogPosts } from "@/lib/blog";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sublimapparel.com";

const escapeXml = (raw: string): string =>
  raw
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

const cdata = (raw: string): string =>
  // Strip control chars that would break XML; keep newlines + tabs.
  raw
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .trim();

// Build an absolute URL for an image. Blog coverImage values are
// already root-relative ("/techniques/...webp") so we just prepend the
// site origin.
const abs = (path: string): string => {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return `${SITE_URL}${path}`;
  return `${SITE_URL}/${path}`;
};

const rfc822 = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
};

export function GET() {
  // Sort posts newest-first so the feed is a true reverse-chronological
  // log. blogPosts in /lib/blog is already published in chronological
  // order, so reverse() is enough.
  const posts = [...blogPosts].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  const lastBuild = posts.length
    ? rfc822(posts[0].date)
    : new Date().toUTCString();

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}/`;
      const description = escapeXml(p.excerpt);
      const title = escapeXml(p.title);
      const content = escapeXml(p.intro.join("\n\n"));
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

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
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

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
