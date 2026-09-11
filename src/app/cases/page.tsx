import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/breadcrumb";
import Link from "next/link";
import { RequestQuoteLink } from "@/components/request-quote-link";
import {
  CalendarDays,
  Megaphone,
  Trophy,
  Music2,
  Presentation,
  Briefcase,
  Shirt,
  GraduationCap,
  Flag,
  Coffee,
  Bike,
  ShoppingBag,
  ArrowRight,
  Camera,
} from "lucide-react";
import { industries } from "@/lib/cases";

export const metadata = buildPageMetadata({
    // 2026-09-11 push (Round 4): was just "Case Studies" (13 chars) — far too short,
    // Google treats thin titles as a low-quality signal and CTR is poor when the
    // title doesn't telegraph what the page is about. New title leads with the
    // search-intent keyword + signals breadth (12 industries).
    title: "Custom Apparel Case Studies: Sports, Events & Brands",
    description: "Browse sublimation printing case studies by industry. See real examples of custom apparel, DDP shipping and full-bleed cotton prints we shipped to 50+ countries.",
    ogTitle: "Custom Apparel Case Studies: 12 Industries",
    keywords: ["sublimation case studies", "custom apparel portfolio", "sports team apparel", "event merchandise", "music festival merch", "promotional apparel", "brand campaigns", "custom uniform projects", "B2B sublimation success stories", "sublimated apparel projects"],
  });;

const iconMap: Record<string, typeof CalendarDays> = {
  CalendarDays,
  Megaphone,
  Trophy,
  Music2,
  Presentation,
  Briefcase,
  Shirt,
  GraduationCap,
  Flag,
  Coffee,
  Bike,
  ShoppingBag,
};

export default function CasesPage() {
  // 2026-09-11 push (Round 6): add FAQPage JSON-LD on /cases/ to capture
  // PAA placements for the buyer-intent queries that already associate
  // with case-study pages — "what kind of apparel projects can a Yiwu
  // factory do", "real custom apparel examples", etc.
  const faqJsonLd = buildFaqJsonLd([
    {
      q: "What kind of custom apparel projects has SublimApparel done?",
      a: "We produce custom sublimation and all-over-print apparel for 12 verticals: sports teams and leagues (cycling kits, race jerseys, basketball uniforms, esports jerseys), events and conferences (staff shirts, attendee merch, swag bundles), corporate programs (employee polos, hospitality wear, branded outerwear), music festivals and tour merch, schools and Greek life, breweries and coffee shops, promotional and marketing agencies, trade shows and retail displays, apparel brands and agencies (private label, white label, dropship), political campaigns, e-commerce fulfillment, and more.",
    },
    {
      q: "Can I see a case study for my specific use case?",
      a: "Yes. Each industry tile on this page links to a dedicated case-study hub with 3–6 real projects, including the artwork brief, fabric choice, print method, quantity, and the final delivery destination. If you don't see a tile that matches your project, send a WhatsApp to +86 198 1793 0190 with a short brief and we'll pull a similar reference from our 6,000+ design archive.",
    },
    {
      q: "What's the typical order size for a case-study project?",
      a: "Most case studies fall in 50–500 pieces per design, with re-orders scaling to 1,000+ pieces per quarter. Our smallest case study project was 30 pieces (a school club cap line); our largest was 12,000 pieces over 4 quarterly drops for an apparel brand. For 1,000+ piece standing orders we offer separate pricing tiers — ask us about it in your brief.",
    },
    {
      q: "How long does a custom apparel project take from brief to delivery?",
      a: "Standard timeline: 3–5 days for design mockup, 7–10 days for pre-production sample, 15–25 days for bulk production, plus 7–14 days for DDP ocean or air freight. Total door-to-door is typically 4–6 weeks for first orders, and 3–4 weeks for re-orders where artwork and patterns are already locked.",
    },
    {
      q: "Do you sign NDAs before sharing artwork for a new project?",
      a: "Yes — mutual NDA is standard before any pattern, grading, or branded label work. We also offer white-label shipping (your packing slip, your carton mark, no SublimApparel branding anywhere on the outward packaging) and blind invoicing for dropship-to-customer orders. Several of the brand-side case studies on this page are under NDA; we share anonymized versions only.",
    },
    {
      q: "Can I get a quote based on a project similar to a case study?",
      a: "Yes. Pick the case study closest to your project, send us the link plus your quantity / deadline / destination, and we'll send a landed DDP quote within 1 business day. If you have a tech pack or reference photo, attach it on the first message so we can match fabric weight, print method, and panel layout exactly.",
    },
  ]);

  // 2026-09-11 push (Round 7): add CollectionPage + ItemList JSON-LD on
  // /cases/. Mirrors the structure of /products/ — the page is a hub of
  // industry-specific case-study landing pages, but Google would otherwise
  // see only an unannotated grid of <a> tags. With CollectionPage +
  // ItemList, the hub → industry hub → case detail relationship is
  // explicit in structured data, and each industry URL gets a clear
  // position in the index.
  const caseCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://sublimapparel.com/cases/#collection",
    url: "https://sublimapparel.com/cases/",
    name: "Custom Apparel Case Studies — 12 Industries, 6,000+ Projects",
    description:
      "Browse sublimation and all-over-print apparel case studies by industry. Real custom apparel, DDP shipping and full-bleed cotton prints shipped to 50+ countries. Sports teams, events, brands, music festivals, e-commerce, and more.",
    inLanguage: "en",
    isPartOf: { "@id": "https://sublimapparel.com/#website" },
    provider: { "@id": "https://sublimapparel.com/#organization" },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: industries.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: industries.map((ind, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://sublimapparel.com/cases/${ind.slug}/`,
        name: ind.title,
      })),
    },
  };

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/cases" },
        ])}
      />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={caseCollection} />
      {/* Top utility bar */}
      <div className="border-b-2 border-black bg-black text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-6 py-2.5 text-[11px] font-bold uppercase tracking-wider">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>Global DDP shipping</span>
            <span className="text-[#0078a8]">·</span>
            <span>US stock in Fontana, CA</span>
            <span className="text-[#0078a8]">·</span>
            <span>MOQ from 50 pcs</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            <span>WhatsApp · +86 198 1793 0190</span>
            <span className="text-[#0078a8]">·</span>
            <span>Replies within 1 business day</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#cc3d00]">
            [ Case Studies ]
          </div>
          <h1 className="mb-6 text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">
            See what we&apos;ve<br />
            <span className="italic text-[#cc3d00]">made.</span>
          </h1>
          <p className="max-w-2xl text-lg font-bold leading-relaxed md:text-xl">
            A growing gallery of real sublimation prints produced for events, sports, brands, campaigns and more. Browse by industry — every project is a working example of full-bleed colour, cut-and-sew construction and DDP delivery.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <RequestQuoteLink label="Cases / page / Get a quote" className="inline-flex items-center gap-2 border-2 border-black bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-black transition-all hover:bg-black hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1">Start your project
              <ArrowRight size={16} strokeWidth={3} /></RequestQuoteLink>
            <a
              href="https://wa.me/8619817930190"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-wider transition-all hover:bg-black hover:text-white"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Industry grid */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-10 flex items-end justify-between border-b-2 border-black pb-4">
            <h2 className="text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
              Browse by industry
            </h2>
            <div className="text-xs font-black uppercase tracking-widest text-black/60">
              {industries.length} categories
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => {
              const Icon = iconMap[ind.icon] ?? Camera;
              return (
                <Link
                  key={ind.slug}
                  href={`/cases/${ind.slug}`}
                  className="group flex items-center justify-between border-2 border-black bg-white p-5 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#ff4d00] hover:text-black hover:shadow-[6px_6px_0_0_#000]"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={24} strokeWidth={2.5} />
                    <span className="text-base font-black uppercase leading-tight">
                      {ind.title}
                    </span>
                  </div>
                  <ArrowRight
                    size={20}
                    strokeWidth={3}
                    className="flex-shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-b-2 border-black bg-black text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <div className="mb-3 text-xs font-black uppercase tracking-widest text-[#29b6f6]">
            [ Your project next? ]
          </div>
          <h2 className="mx-auto mb-6 max-w-3xl text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
            Add your story to the gallery.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base font-bold leading-relaxed text-white/80 md:text-lg">
            Send us your artwork, quantity and delivery deadline. We&apos;ll send a free mockup and a landed, duty-paid quote within 1 business day.
          </p>
          <RequestQuoteLink label="Cases / page / Get a quote" className="inline-flex items-center gap-2 border-2 border-white bg-[#ff4d00] px-8 py-4 text-base font-black uppercase tracking-wider transition-all hover:bg-white hover:text-black hover:shadow-[6px_6px_0_0_#00c2ff] hover:-translate-x-1 hover:-translate-y-1">Get a quote
            <ArrowRight size={18} strokeWidth={3} /></RequestQuoteLink>
        </div>
      </section>
    </>
  );
}
