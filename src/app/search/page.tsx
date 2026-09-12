import type { Metadata } from "next";
import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";
import { SearchClient } from "@/components/search-client";
import { Search, FileText } from "lucide-react";

// 2026-09-11 (R25-C): dedicated /search/ landing page. The root
// WebSite schema has a SearchAction that points here, so:
//   1. Google's sitelinks searchbox can route queries to a real page
//      that actually filters against a query (previously the
//      SearchAction target was /products/?q= which is a flat category
//      hub, not a search results page).
//   2. Buyers typing a query in the address bar land on a real
//      full-text search page, not a category list.
//   3. The page itself is indexable, so it can rank for queries like
//      "SublimApparel search", "SublimApparel product lookup" and
//      the brand-level "site search" intent. We also emit a
//      FAQPage schema so the page can win People Also Ask slots for
//      "how to search SublimApparel" style queries.
//
// The actual filtering runs in the client component so the page
// stays a static export and the index is small. When a user appends
// ?q=... the client component also updates the URL, but the page
// metadata switches to noindex, follow so Google doesn't index an
// unbounded set of search-result pages (only the canonical /search/
// stays in the index).

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams;
  const q = (sp?.q || "").trim();
  if (q) {
    // When ?q= is present, this is a dynamic search-results page and
    // we don't want Google indexing every variant. The /search/
    // landing page (no ?q=) is the only one we want indexed.
    return buildPageMetadata({
      title: `Search results for "${q}" | SublimApparel`,
      description: `Live results across products, fabric, techniques and the SublimApparel blog for the query "${q}".`,
      robots: {
        index: false,
        follow: true,
        googleBot: { index: false, follow: true, "max-snippet": -1 },
      },
      alternates: { canonical: "https://sublimapparel.com/search/" },
    });
  }
  return buildPageMetadata({
    title: "Site Search | SublimApparel Products, Fabric, Blog",
    description: "Search the full SublimApparel site — 100+ products, 60+ fabrics, 20 techniques, blog & guides. Live full-text results, instant filter, no signup needed.",
    keywords: [
      "SublimApparel search",
      "site search",
      "product lookup",
      "fabric search",
      "apparel search",
      "search sublimation factory",
    ],
    alternates: { canonical: "https://sublimapparel.com/search/" },
    ogTitle: "SublimApparel Site Search — Products, Fabric, Blog",
    ogDescription:
      "Search the full SublimApparel site. Live full-text search across 100+ products, 60+ fabrics, 20 techniques, and our blog.",
    ogImage: "/og/og-default.jpg",
  });
}

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Search", path: "/search/" },
]);

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://sublimapparel.com/search/#webpage",
  url: "https://sublimapparel.com/search/",
  name: "SublimApparel Site Search",
  description:
    "Live full-text search across 100+ products, 60+ fabrics, 20 techniques, the SublimApparel blog, industry case studies, and top-level pages.",
  inLanguage: "en",
  isPartOf: { "@id": "https://sublimapparel.com/#website" },
  about: { "@id": "https://sublimapparel.com/#organization" },
  // Speakable: name + first 2 paragraphs (Google Assistant / screen
  // readers can read the page intro out loud).
  speakable: {
    "@type": "SpeakableSpecification",
    xpath: ["/html/body//h1", "/html/body//section[1]//p"],
  },
  // The SearchAction lives on the WebSite node, not the page, so we
  // don't duplicate it here. We do however point the canonical at
  // the same URL the WebSite SearchAction targets so Google can
  // resolve the round trip.
};

const searchFaqJsonLd = buildFaqJsonLd([
  {
    q: "How do I search the SublimApparel site?",
    a: "Type any word (e.g. 'sublimation', 'cotton', 'cycling jersey', 'DDP', 'polyester 220gsm') in the search bar at the top of /search/. Results filter live as you type across products, fabric types, print techniques, blog posts, and the 12 industry verticals we serve. No signup is required.",
  },
  {
    q: "Can I search by fabric weight (GSM) or material?",
    a: "Yes. The search index covers composition (100% polyester, 100% cotton, blends), weight (110gsm, 160gsm, 220gsm, etc.), spec/width, and every fabric's primary use. Try queries like '220gsm polyester', 'cotton jersey', 'fleece', or 'recycled rPET'.",
  },
  {
    q: "Can I search for a specific print technique?",
    a: "Yes. All 20 print and decoration techniques in our /technique/ encyclopedia are indexed, including sublimation, DTG, DTF, screen printing, embroidery, 3D puff, rhinestone, appliqué, and discharge. Try 'sublimation', 'DTF cotton', or 'embroidery polo'.",
  },
  {
    q: "Does the search include the SublimApparel blog?",
    a: "Yes. Every post in our /blog/ is indexed with title, excerpt, body content, and tags. Long-tail queries like 'how to wash sublimated shirts', 'sublimation vs DTG', 'DDP vs FOB', and 'esports jersey fabric' all return matching blog posts.",
  },
  {
    q: "What if my search returns no results?",
    a: "The page shows a no-results state with shortcuts to the inquiry form, WhatsApp chat, and the popular searches buyers ask. You can also browse by section (All products, Fabric library, Techniques, Blog) using the empty-state cards below the search bar.",
  },
  {
    q: "Do I need an account to search the site?",
    a: "No. The /search/ page is fully public. There is no login, no signup, and no paywall — we want buyers to find the right product, fabric, or technique as fast as possible. To request a quote you can move directly from a result card to /get-a-quote/.",
  },
]);

export default async function SearchPage({ searchParams }: Props) {
  const sp = await searchParams;
  const initialQuery = (sp?.q || "").trim();
  const faqId = "https://sublimapparel.com/search/#faq";
  const webPageId = "https://sublimapparel.com/search/#webpage";

  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      (() => {
        const { "@context": _c, ...rest } = breadcrumbJsonLd;
        return rest;
      })(),
      (() => {
        return {
          ...webPageJsonLd,
          "@id": webPageId,
          mainEntity: { "@id": faqId },
        };
      })(),
      (() => {
        const { "@context": _c, ...rest } = searchFaqJsonLd;
        return { ...rest, "@id": faqId };
      })(),
    ],
  };

  return (
    <>
      <JsonLd data={pageGraph} />

      <main className="min-h-screen bg-white text-[#0a0a0a]">
        {/* HERO */}
        <section className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-[#faf9f6]">
          <div className="mx-auto max-w-5xl px-4 py-12 md:px-8 md:py-20">
            <div className="mb-4 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#29b6f6]">
              <Search className="h-4 w-4" strokeWidth={2.5} />
              [ site search ]
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
              Search the SublimApparel site.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#a0a0a0] md:text-lg">
              Live full-text search across 100+ products, 60+ fabric types,
              20 print techniques, our blog, and 12 industry verticals.
              Type any word — results filter instantly.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#a0a0a0]">
              <span className="inline-flex items-center gap-1.5">
                <FileText className="h-3 w-3" strokeWidth={2.5} />
                250+ indexed pages
              </span>
              <span aria-hidden="true">·</span>
              <span>No login</span>
              <span aria-hidden="true">·</span>
              <span>Live filter</span>
              <span aria-hidden="true">·</span>
              <span>Mobile-friendly</span>
            </div>
          </div>
        </section>

        {/* Search box + results */}
        <section className="py-10 md:py-14">
          {/* useSearchParams in SearchClient requires a Suspense
              boundary at the page level so Next.js can statically
              pre-render the page shell. */}
          <Suspense
            fallback={
              <div className="mx-auto max-w-5xl px-4 py-12 text-center text-sm text-[#6b6b6b]">
                Loading search…
              </div>
            }
          >
            <SearchClient initialQuery={initialQuery} />
          </Suspense>
        </section>
      </main>
    </>
  );
}
