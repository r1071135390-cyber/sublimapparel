import type { MetadataRoute } from "next";

/**
 * Cloudflare Pages auto-injects "Managed Content" rules (Disallow: /) for
 * ClaudeBot, GPTBot, Google-Extended, Applebot-Extended, CCBot, meta-externalagent
 * at the TOP of this file when the Content-Signal directive is detected.
 *
 * Because the most-specific user-agent group with the LOWEST line number wins,
 * Cloudflare's injected Disallow blocks these AI bots despite our explicit
 * Allow rules below.
 *
 * To truly unblock AI crawlers, the site owner must disable Cloudflare's
 * "Block AI Bots" / AI Content Protection feature in the Cloudflare dashboard:
 *   Security → Bots → AI Bots → Set to "Allow" or "Monitor"
 *
 * The Content-Signal below signals intent to all compliant crawlers
 * (Anthropic, OpenAI, Perplexity, Google, etc. that respect the spec).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicit content-signal for compliant crawlers (overrides any default-block heuristic)
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
        crawlDelay: 0,
      },
      // Generative AI training crawlers - EXPLICITLY ALLOWED
      { userAgent: "GPTBot", allow: "/", crawlDelay: 0 },
      { userAgent: "ChatGPT-User", allow: "/", crawlDelay: 0 },
      { userAgent: "OAI-SearchBot", allow: "/", crawlDelay: 0 },
      { userAgent: "ClaudeBot", allow: "/", crawlDelay: 0 },
      { userAgent: "Claude-Web", allow: "/", crawlDelay: 0 },
      { userAgent: "Claude-User", allow: "/", crawlDelay: 0 },
      { userAgent: "anthropic-ai", allow: "/", crawlDelay: 0 },
      { userAgent: "PerplexityBot", allow: "/", crawlDelay: 0 },
      { userAgent: "Perplexity-User", allow: "/", crawlDelay: 0 },
      { userAgent: "Google-Extended", allow: "/", crawlDelay: 0 },
      { userAgent: "Applebot-Extended", allow: "/", crawlDelay: 0 },
      { userAgent: "CCBot", allow: "/", crawlDelay: 0 },
      { userAgent: "meta-externalagent", allow: "/", crawlDelay: 0 },
      { userAgent: "meta-externalfetcher", allow: "/", crawlDelay: 0 },
      { userAgent: "Bytespider", allow: "/", crawlDelay: 0 },
      { userAgent: "cohere-ai", allow: "/", crawlDelay: 0 },
      { userAgent: "cohere-training-data-crawler", allow: "/", crawlDelay: 0 },
      { userAgent: "DeepSeekBot", allow: "/", crawlDelay: 0 },
      { userAgent: "MistralAI-User", allow: "/", crawlDelay: 0 },
      { userAgent: "GoogleOther", allow: "/", crawlDelay: 0 },
      { userAgent: "Googlebot", allow: "/", crawlDelay: 0 },
      { userAgent: "Googlebot-Image", allow: "/", crawlDelay: 0 },
      { userAgent: "Googlebot-News", allow: "/", crawlDelay: 0 },
      { userAgent: "Googlebot-Video", allow: "/", crawlDelay: 0 },
      { userAgent: "Mediapartners-Google", allow: "/", crawlDelay: 0 },
      { userAgent: "AdsBot-Google", allow: "/", crawlDelay: 0 },
      { userAgent: "Bingbot", allow: "/", crawlDelay: 0 },
      { userAgent: "BingPreview", allow: "/", crawlDelay: 0 },
      { userAgent: "MSNBot-Media", allow: "/", crawlDelay: 0 },
      { userAgent: "Baiduspider", allow: "/", crawlDelay: 0 },
      { userAgent: "YandexBot", allow: "/", crawlDelay: 0 },
      { userAgent: "DuckDuckBot", allow: "/", crawlDelay: 0 },
      { userAgent: "Applebot", allow: "/", crawlDelay: 0 },
      { userAgent: "Twitterbot", allow: "/", crawlDelay: 0 },
      { userAgent: "facebookexternalhit", allow: "/", crawlDelay: 0 },
      { userAgent: "LinkedInBot", allow: "/", crawlDelay: 0 },
      { userAgent: "Slackbot", allow: "/", crawlDelay: 0 },
      { userAgent: "WhatsApp", allow: "/", crawlDelay: 0 },
      { userAgent: "TelegramBot", allow: "/", crawlDelay: 0 },
      { userAgent: "Discordbot", allow: "/", crawlDelay: 0 },
      { userAgent: "PetalBot", allow: "/", crawlDelay: 0 },
      { userAgent: "SemrushBot", disallow: "/" },
      { userAgent: "SemrushBot-SA", disallow: "/" },
      { userAgent: "SemrushBot-SI", disallow: "/" },
      { userAgent: "SemrushBot-CT", disallow: "/" },
      { userAgent: "SemrushBot-BM", disallow: "/" },
      { userAgent: "AhrefsBot", disallow: "/" },
      { userAgent: "AhrefsSiteAudit", disallow: "/" },
      { userAgent: "DotBot", disallow: "/" },
      { userAgent: "MJ12bot", disallow: "/" },
      { userAgent: "Rogerbot", disallow: "/" },
      { userAgent: "BLEXBot", disallow: "/" },
    ],
    sitemap: [
      "https://sublimapparel.com/sitemap.xml",
      "https://sublimapparel.com/llms.txt",
    ],
    host: "https://sublimapparel.com",
  };
}
