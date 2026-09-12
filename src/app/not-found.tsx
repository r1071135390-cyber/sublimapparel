import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import { ArrowRight, Search, FileQuestion, Home, Mail } from "lucide-react";

// 2026-09-11 (R24): 404 page is the catch-all for broken external links,
// mistyped URLs, and old product pages. Previously Next.js fell back to
// its default 404 screen which has zero SEO value and pushes users away.
// A custom 404 lets us:
//   1. Return the right HTTP status (404) for search engines
//   2. Show the brand, top categories, and a search-friendly FAQ block
//   3. Keep users on the site via 6 contextual deep links
//   4. Earn "noindex, follow" by emitting the matching <meta robots>
//   5. Emit WebPage + BreadcrumbList JSON-LD so the page is parseable
//      if Google does crawl it (defensive: prevents "soft 404" penalty)
export const metadata: Metadata = {
  title: "Page Not Found (404) — SublimApparel",
  description:
    "The page you were looking for has moved or no longer exists. Browse our custom sublimation apparel catalog, fabric library, or contact our Yiwu factory directly.",
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true, "max-snippet": -1 },
  },
  alternates: { canonical: "https://sublimapparel.com/404" },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Page Not Found", path: "/404" },
]);

// 2026-09-12 (R46): merge 3 separate JsonLd nodes (array of 3
// was producing 3 scripts) into a single @graph. WebPage anchors
// the brand entity graph and mainEntity → FAQPage. The 404 page
// is noindex, follow but emits complete structured data as a
// defensive measure (prevents Google soft-404 penalty if it crawls
// here).
const notFoundUrl = "https://sublimapparel.com/404/";
const notFoundFaqId = `${notFoundUrl}#faq`;

const notFoundGraph = {
  "@context": "https://schema.org",
  "@graph": [
    // 1 · BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": `${notFoundUrl}#breadcrumb`,
      itemListElement: breadcrumbJsonLd.itemListElement,
    },
    // 2 · WebPage — anchors the page to the brand entity graph
    {
      "@type": "WebPage",
      "@id": `${notFoundUrl}#webpage`,
      url: notFoundUrl,
      name: "Page Not Found — SublimApparel",
      description:
        "The page you were looking for has moved or no longer exists. Browse our catalog, fabric library, or contact us.",
      inLanguage: "en",
      isPartOf: { "@id": "https://sublimapparel.com/#website" },
      about: { "@id": "https://sublimapparel.com/#organization" },
      mainEntity: { "@id": notFoundFaqId },
      speakable: {
        "@type": "SpeakableSpecification",
        xpath: ["/html/body//h1", "/html/body//section[1]//p"],
      },
    },
    // 3 · FAQPage
    {
      "@type": "FAQPage",
      "@id": notFoundFaqId,
      mainEntity: [
        {
          "@type": "Question",
          name: "What happened to the page I was looking for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The page may have been moved, renamed, or is no longer in our catalog. Our most-visited sections are below — try one of those, or contact us if you need a specific product or quote.",
          },
        },
        {
          "@type": "Question",
          name: "How do I find a specific product on SublimApparel?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use the Products menu in the top navigation to browse 100+ all-over-print apparel items by garment, sport, or scenario. The Fabric menu has 60+ fabric types with detailed specs. For a custom quote, the Get a Quote page collects everything we need in 2 minutes.",
          },
        },
        {
          "@type": "Question",
          name: "Can I still contact the factory about an old order or quote?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Email sales@sublimapparel.com or use the WhatsApp button (US/UK/EU/AU/CA numbers on /contact/) with your PO number, inquiry date, or design file. We respond within 1 business day.",
          },
        },
      ],
    },
  ],
};

export default function NotFound() {
  return (
    <>
      <JsonLd data={notFoundGraph} />
      <main className="min-h-screen bg-[#faf9f6] text-[#0a0a0a]">
        {/* HERO */}
        <section className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] text-[#faf9f6]">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <div className="mb-6 text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
              [ error / 404 / page-not-found ]
            </div>
            <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight md:text-8xl">
              <span className="block text-[#ff4d00]">404.</span>
              <span className="block">Page not found.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-[#a0a0a0] md:text-xl">
              The page you were looking for has moved, was renamed, or never
              existed. The good news: our Yiwu factory, fabric library, and
              100+ product catalog are one click away.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#e64400] hover:border-[#e64400]"
              >
                <Home className="h-5 w-5" strokeWidth={2.5} />
                Back to home
              </Link>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]"
              >
                <Mail className="h-5 w-5" strokeWidth={2.5} />
                Contact factory
              </Link>
            </div>
          </div>
        </section>

        {/* POPULAR SECTIONS */}
        <section className="border-b-2 border-[#0a0a0a]">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
            <div className="mb-12 max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-widest text-[#cc3d00]">
                [ Where to go next ]
              </div>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
                Six popular destinations.
              </h2>
              <p className="mt-4 text-lg text-[#3a3a3a]">
                Most visitors who land here end up in one of these sections.
                Pick the one closest to what you came for.
              </p>
            </div>
            <div className="grid gap-px bg-[#0a0a0a] md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  href: "/products/all/",
                  title: "All products",
                  blurb: "100 all-over-print apparel items cross-filtered by garment, sport, scenario.",
                  cta: "Browse catalog",
                },
                {
                  href: "/fabric/",
                  title: "Fabric library",
                  blurb: "60+ stock fabrics: polyester, cotton, blends, performance, with full specs.",
                  cta: "Open fabric library",
                },
                {
                  href: "/get-a-quote/",
                  title: "Get a quote",
                  blurb: "Tell us your design, quantity, deadline. Get a DDP landed price in 24 hours.",
                  cta: "Start a quote",
                },
                {
                  href: "/industries/",
                  title: "Industries we serve",
                  blurb: "12 B2B verticals: race teams, festivals, schools, corporate, agencies.",
                  cta: "See verticals",
                },
                {
                  href: "/about/factory/",
                  title: "Inside our factory",
                  blurb: "2,000 sqm Yiwu plant, 12 lines, 6 inline printers, full vertical integration.",
                  cta: "Tour the factory",
                },
                {
                  href: "/blog/",
                  title: "Blog & guides",
                  blurb: "Sublimation vs DTG, DDP vs FOB, fabric care, sourcing guides, MOQ tips.",
                  cta: "Read the blog",
                },
              ].map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group bg-[#faf9f6] p-8 transition-colors hover:bg-[#ff4d00]"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center border-2 border-[#ff4d00] text-[#cc3d00] group-hover:border-black group-hover:text-black">
                    <FileQuestion className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-xl font-extrabold leading-tight">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3a3a3a] group-hover:text-black">
                    {card.blurb}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#cc3d00] group-hover:text-black">
                    {card.cta}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* QUICK ANSWERS */}
        <section className="border-b-2 border-[#0a0a0a] bg-[#1a1a1a] text-[#faf9f6]">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#29b6f6]">
              <Search className="h-4 w-4" strokeWidth={2.5} />
              [ Quick answers ]
            </div>
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
              Why you might be here.
            </h2>
            <div className="mt-10 space-y-6">
              {[
                {
                  q: "What happened to the page I was looking for?",
                  a: "It may have been moved, renamed, or is no longer in our catalog. The most-visited sections are above — try one of those, or contact us if you need a specific product or quote.",
                },
                {
                  q: "How do I find a specific product?",
                  a: "Use the Products menu in the top navigation to browse 100+ all-over-print apparel items by garment, sport, or scenario. The Fabric menu has 60+ fabric types with detailed specs. For a custom quote, the Get a Quote page collects everything we need in 2 minutes.",
                },
                {
                  q: "Can I still contact the factory about an old order?",
                  a: "Yes. Email sales@sublimapparel.com or use the WhatsApp numbers on /contact/ with your PO number or inquiry date. We respond within 1 business day, in English or Chinese.",
                },
              ].map((item) => (
                <div key={item.q} className="border-l-4 border-[#ff4d00] bg-[#0a0a0a] p-6">
                  <h3 className="text-lg font-bold leading-snug md:text-xl">
                    {item.q}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#a0a0a0] md:text-base">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#ff4d00] bg-[#ff4d00] px-8 py-4 text-base font-bold uppercase tracking-wide text-black transition-colors hover:bg-[#e64400] hover:border-[#e64400]"
              >
                <Home className="h-5 w-5" strokeWidth={2.5} />
                Take me home
              </Link>
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center gap-2 border-2 border-[#faf9f6] px-8 py-4 text-base font-bold uppercase tracking-wide text-[#faf9f6] transition-colors hover:bg-[#faf9f6] hover:text-[#0a0a0a]"
              >
                <Mail className="h-5 w-5" strokeWidth={2.5} />
                Email the factory
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
