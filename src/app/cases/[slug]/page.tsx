import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RequestQuoteLink } from "@/components/request-quote-link";
import Image from "next/image";
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
  ArrowLeft,
  Camera,
  ImageOff,
  Star,
  Quote,
} from "lucide-react";
import { industries, getIndustryBySlug } from "@/lib/cases";
import { products, type Product } from "@/lib/products-data";
import { tagArchiveLink } from "@/lib/tag-utils";
import { getProductImages } from "@/lib/product-images";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqPageNode } from "@/lib/breadcrumb";
import {
  filterReviewsForIndustry,
  hasAggregateableReviews,
  computeAggregateRating,
  toSchemaReview,
} from "@/lib/reviews";

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

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);
  if (!ind) return { title: "Case Studies " };
  return {
    title: `${ind.title} Case Studies — SublimApparel`,
    description: ind.blurb,
    keywords: ["case studies", ind.title.toLowerCase(), "sublimation apparel", "custom clothing"],
    alternates: { canonical: `/cases/${slug}/` },
    openGraph: {
      title: `${ind.title} Case Studies — SublimApparel`,
      description: ind.blurb,
      type: "website",
      url: `/cases/${slug}/`,
      images: ["/og/og-home.webp"],
    },
    twitter: {
      card: "summary_large_image",
      title: `${ind.title} Case Studies — SublimApparel`,
      description: ind.blurb,
    },
    robots: { index: true, follow: true },
  };
}

export default async function CaseCategoryPage({ params }: Props) {
  const { slug } = await params;
  const ind = getIndustryBySlug(slug);
  if (!ind) notFound();

  const Icon = iconMap[ind.icon] ?? Camera;
  const hasCases = ind.cases.length > 0;

  // 2026-09-11 (Round 10): this page had zero JSON-LD schema despite being
  // indexed in sitemap. Add WebPage + breadcrumb + ItemList so the page joins
  // the brand entity graph and Google can enumerate the case study links.
  // The ItemList mirrors the /industries/ and /technique/ hub pattern.
  const slugCanonical = `/cases/${slug}/`;
  const caseListItems = ind.cases.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.title,
    url: `https://sublimapparel.com/cases/${ind.slug}/${c.id}/`,
  }));

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Case Studies", path: "/cases/" },
    { name: ind.title, path: slugCanonical },
  ]);
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://sublimapparel.com${slugCanonical}#webpage`,
    url: `https://sublimapparel.com${slugCanonical}`,
    name: `${ind.title} Case Studies — SublimApparel`,
    description: ind.blurb,
    inLanguage: "en",
    isPartOf: { "@id": "https://sublimapparel.com/#website" },
    about: { "@id": "https://sublimapparel.com/#organization" },
    speakable: {
      "@type": "SpeakableSpecification",
      xpath: ["/html/body//h1", "/html/body//section[1]//p"],
    },
  };
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: ind.cases.length,
    itemListElement: caseListItems,
  };

  // 2026-09-11 (R19): add FAQPage JSON-LD on every /cases/[slug]/ industry
  // hub. These pages get ~9500 words of case study content but had zero
  // FAQPage, which means Google has no structured hint that the page also
  // answers common pre-purchase questions — the same questions that earn
  // "People Also Ask" (PAA) rich results. Adding 5 Q&A entries covers the
  // informational query space ("how long does production take for [industry]
  // custom apparel", "what MOQ for team uniforms", "can I get samples") that
  // buyers ask before they reach the inquiry form.
  //
  // 2026-09-12 (R47): the items are now kept as a raw array so they can be
  // inlined into the page @graph block via buildFaqPageNode — the previous
  // buildFaqJsonLd wrapper emitted a separate JSON-LD document (missing the
  // inLanguage + isPartOf + about cross-link fields the rest of the site
  // @graph now uses).
  const casesFaqItems = [
    {
      q: `How long does it take to produce custom ${ind.title.toLowerCase()} apparel?`,
      a: `Standard bulk production for ${ind.title.toLowerCase()} custom apparel is 15–25 business days after you approve the pre-production sample. Sample lead time is 5–7 days. Rush bulk production (7–10 days) is available for select product types at an additional 20% surcharge.`,
    },
    {
      q: "What is the minimum order quantity for custom team or event apparel?",
      a: "MOQ is 50 pieces per design across every product type we offer. For repeat orders of an existing design, we can sometimes drop to 30 pieces per colorway. The full order total must meet the 50-piece minimum — we can't combine two unrelated designs into one run to hit MOQ.",
    },
    {
      q: "Can I get a pre-production sample before committing to bulk?",
      a: "Yes. Pre-production samples cost $25–60 per piece depending on the product and print process, plus express shipping. We credit the sample cost back to you when you place a bulk order of 100+ pieces. Free material swatches and printed color cards are available on request so you can check hand-feel and color accuracy before paying for samples.",
    },
    {
      q: "Do you handle DDP shipping to our country?",
      a: "We ship DDP (Delivered Duty Paid) to 100+ countries — that means we cover freight, customs clearance, import duties, taxes, and last-mile delivery. You receive the goods at your door with no surprise costs. For the US we also hold buffer stock at our Fontana, CA warehouse for 2–5 day domestic shipping.",
    },
    {
      q: `Can you match our existing design style or replicate a competitor's ${ind.title.toLowerCase()} look?`,
      a: `Yes. Send us your existing artwork or a reference photo and we can either match the style directly or use it as a starting point for something better. We free-check every design for printability and will flag any artwork issues — such as low resolution, color space mismatches, or bleed problems — before we commit to production.`,
    },
  ];
  const casesFaqId = `https://sublimapparel.com/cases/${ind.slug}/#faq`;
  const casesWebpageId = `https://sublimapparel.com/cases/${ind.slug}/#webpage`;

  // 2026-09-11 (R28): per-industry review aggregation. We pull the
  // subset of verifiedReviews that are linked to this industry
  // (either via relatedIndustrySlug or via relatedCaseId matching one
  // of the case studies in this industry). When the subset is non-empty
  // we emit a separate JSON-LD block carrying review + aggregateRating
  // for the industry service. This gives Google another path into the
  // site entity graph: /cases/[slug]/ becomes a reviewable Surface, not
  // just an informational page. When the subset is empty, the block is
  // a no-op minimal Organization node — same pattern as /about/.
  //
  // Mirrors the R27 contract exactly so that the day a real public
  // review feed (Trustpilot, Google Business Profile, Alibaba) is
  // wired up, the schema on this page lights up automatically with
  // no additional code change.
  const caseIdsInIndustry = ind.cases.map((c) => c.id);
  const industryReviews = filterReviewsForIndustry(
    ind.slug,
    caseIdsInIndustry
  );
  const industryAggregate = hasAggregateableReviews(industryReviews)
    ? computeAggregateRating(industryReviews)
    : null;
  const industryReviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://sublimapparel.com/cases/${ind.slug}/#service-reviews`,
    url: `https://sublimapparel.com/cases/${ind.slug}/`,
    name: `${ind.title} — buyer review surface`,
    serviceType: `Custom apparel manufacturing review aggregation for the ${ind.title} vertical`,
    provider: { "@id": "https://sublimapparel.com/#organization" },
    ...(industryReviews.length > 0
      ? { review: industryReviews.map(toSchemaReview) }
      : {}),
    ...(industryAggregate
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: industryAggregate.ratingValue,
            reviewCount: industryAggregate.reviewCount,
            bestRating: industryAggregate.bestRating,
            worstRating: industryAggregate.worstRating,
          },
        }
      : {}),
  };

  // 2026-09-12 (R47): consolidate all JSON-LD into a single @graph block
  // (this page was the last one still emitting 5 separate JSON-LD scripts
  // — one each for breadcrumb, WebPage, ItemList, FAQPage, Service). All
  // inner @context keys are stripped so only the outer @graph carries it,
  // matching the R46 pattern used on every other page.
  //
  // We also point the WebPage node at the FAQ via mainEntity so the FAQ
  // is the primary content surface of the page (PAA intent), and the
  // buildFaqPageNode helper adds inLanguage + isPartOf → #webpage +
  // about → #organization so the FAQ joins the brand entity graph.
  const stripContext = <T extends Record<string, unknown>>(node: T) => {
    const { "@context": _c, ...rest } = node as Record<string, unknown>;
    return rest as T;
  };
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      stripContext(breadcrumbJsonLd),
      {
        ...webPageJsonLd,
        mainEntity: { "@id": casesFaqId },
      },
      stripContext(itemListJsonLd),
      buildFaqPageNode(casesFaqId, casesWebpageId, casesFaqItems),
      stripContext(industryReviewJsonLd),
    ],
  };

  return (
    <>
      <JsonLd data={pageGraph} />
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
            <span>Replies within 1 business day</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <Link
            href="/cases/"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black/70 transition-colors hover:text-[#cc3d00]"
          >
            <ArrowLeft size={14} strokeWidth={3} />
            All case studies
          </Link>

          <div className="flex items-start gap-4">
            <div className="hidden h-16 w-16 flex-shrink-0 items-center justify-center border-2 border-black bg-[#ff4d00] text-black md:flex">
              <Icon size={32} strokeWidth={2.5} />
            </div>
            <div>
              <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#cc3d00]">
                [ Industry / {String(industries.findIndex((i) => i.slug === ind.slug) + 1).padStart(3, "0")} ]
              </div>
              <h1 className="mb-4 text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
                {ind.title}
              </h1>
              <p className="max-w-2xl text-base font-bold leading-relaxed md:text-lg">
                {ind.blurb}
              </p>
            </div>
          </div>

          {/* The value pitch (orange highlight) */}
          <div className="mt-8 border-l-4 border-[#ff4d00] bg-[#fff7f0] px-4 py-3 text-sm font-bold leading-relaxed text-black md:text-base">
            {ind.pitch}
          </div>

          {/* 2026-09-11 (Round 14): cross-link to the matching /industries/[slug]/
              industry profile page. /cases/[slug]/ and /industries/[slug]/ use
              different slugs (cases = case-study angle; industries = full
              profile) — without this link, Google sees them as unrelated and
              PageRank doesn't flow between them. The industry profile page is
              higher-priority in the sitemap (0.9 vs 0.6), so passing link
              equity to it lifts the more important page. */}
          {ind.relatedIndustrySlug && (
            <div className="mt-6">
              <Link
                href={`/industries/${ind.relatedIndustrySlug}/`}
                className="inline-flex items-center gap-2 border-2 border-black bg-white px-4 py-2 text-xs font-black uppercase tracking-wider text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#ff4d00] hover:shadow-[3px_3px_0_0_#000]"
              >
                Full industry profile
                <ArrowRight size={14} strokeWidth={3} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Related products — pulled from /products/all matching the industry's scenario tag */}
      {(() => {
        const related: Product[] = products
          .filter(
            (p) =>
              p.scenarios.includes(ind.relatedScenario) &&
              (!ind.relatedCategory || p.category === ind.relatedCategory) &&
              (!ind.relatedSport || p.sports.includes(ind.relatedSport)),
          )
          .slice(0, 8);
        if (related.length === 0) return null;
        return (
          <section className="border-b-2 border-black bg-[#faf9f6]">
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b-2 border-black pb-4">
                <div>
                  <div className="mb-2 text-xs font-black uppercase tracking-widest text-[#cc3d00]">
                    [ Related products ]
                  </div>
                  <h2 className="text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
                    Built for {ind.title.toLowerCase()}
                  </h2>
                </div>
                <Link
                  href={tagArchiveLink("scenario", ind.relatedScenario)}
                  className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black transition-colors hover:text-[#cc3d00]"
                >
                  See all {ind.relatedScenario} products
                  <ArrowRight size={14} strokeWidth={3} />
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    href={`/products/all/${p.slug}/`}
                    className="group flex flex-col border-2 border-black bg-white p-4 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#ff4d00]"
                  >
                  {(() => {
                    const imgs = getProductImages(p.number);
                    const first = imgs[0];
                    if (first) {
                      return (
                        <div className="relative mb-3 aspect-square overflow-hidden border-2 border-black bg-[#F5F5F5]">
                          <Image
                            src={first}
                            alt={`${p.name} - custom ${p.category.toLowerCase()} from SublimApparel`}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-contain"
                            loading="lazy"
                          />
                        </div>
                      );
                    }
                    return (
                      <div className="mb-3 flex aspect-square items-center justify-center border-2 border-black bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] text-5xl font-black text-white">
                        {p.category.charAt(0)}
                      </div>
                    );
                  })()}
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#cc3d00]">
                      {p.category}
                    </div>
                    <h3 className="mt-0.5 text-sm font-black uppercase leading-tight tracking-tight line-clamp-2">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[11px] font-medium leading-snug text-black/65 line-clamp-2">
                      {p.description}
                    </p>
                    <p className="mt-2 text-[11px] font-black uppercase tracking-wider text-black/55">
                      MOQ {p.moq}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Gallery */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          {hasCases ? (
            <>
              <div className="mb-8 flex items-end justify-between border-b-2 border-black pb-4">
                <h2 className="text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
                  {ind.cases.length} case stud{ind.cases.length === 1 ? "y" : "ies"}
                </h2>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {ind.cases.map((c) => (
                  <Link
                    key={c.id}
                    href={`/cases/${ind.slug}/${c.id}`}
                    className="group flex flex-col border-2 border-black bg-white p-5 transition-all hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1"
                  >
                    <div className="mb-4 aspect-[4/3] overflow-hidden border-2 border-black bg-[#faf9f6]">
                      {c.images[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={c.images[0]}
                          alt={c.title}
                          width={800}
                          height={600}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-black/30">
                          <ImageOff size={36} />
                        </div>
                      )}
                    </div>
                    <h3 className="mb-1 text-lg font-black uppercase leading-tight">
                      {c.title}
                    </h3>
                    {c.client && (
                      <div className="mb-3 text-xs font-bold uppercase tracking-wider text-black/60">
                        {c.client}
                        {c.year ? ` · ${c.year}` : ""}
                      </div>
                    )}
                    <p className="text-sm font-medium leading-relaxed text-black/75">
                      {c.summary}
                    </p>
                    <div className="mt-auto pt-4 text-xs font-black uppercase tracking-wider text-[#cc3d00]">
                      Read case study →
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            /* Empty state — gallery under construction */
            <div className="border-2 border-dashed border-black/30 bg-[#faf9f6] px-6 py-20 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center border-2 border-black bg-white text-[#cc3d00]">
                <ImageOff size={36} strokeWidth={2.5} />
              </div>
              <h2 className="mb-3 text-2xl font-black uppercase leading-tight md:text-3xl">
                Gallery under construction
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-base font-bold leading-relaxed text-black/70">
                We&apos;re putting together real examples for this category. In the meantime, send us your artwork and we&apos;ll come back with a free mockup and a landed, duty-paid quote within 1 business day.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <RequestQuoteLink label="[slug] / page / Get a quote" className="inline-flex items-center gap-2 border-2 border-black bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-wider text-black transition-all hover:bg-black hover:shadow-[4px_4px_0_0_#000] hover:-translate-x-1 hover:-translate-y-1">Get a quote
                  <ArrowRight size={16} strokeWidth={3} /></RequestQuoteLink>
                <Link
                  href="/cases/"
                  className="inline-flex items-center gap-2 border-2 border-black bg-white px-6 py-3 text-sm font-black uppercase tracking-wider transition-all hover:bg-black hover:text-white"
                >
                  Browse other categories
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Buyer feedback — per-industry review surface.
          2026-09-11 (R28): mirrors the /about/ "Trusted by buyers"
          section but scoped to the current industry. Same data source
          (`verifiedReviews` via `filterReviewsForIndustry`), same
          gating, same star-render. Renders only when at least one
          review is attached to this industry — when empty (today's
          state), the entire section is omitted to keep the page
          focused on the case-study content. The /about/ page already
          shows the global "Reviews coming soon" placeholder; repeating
          it on every /cases/[slug]/ page would be visual noise. */}
      {industryReviews.length > 0 && (
        <section className="border-b-2 border-black bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                  Buyer feedback
                </div>
                <h2 className="text-3xl font-black leading-tight text-black md:text-5xl">
                  What {ind.title.toLowerCase()} buyers say.
                </h2>
              </div>
              {industryAggregate ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#cc3d00]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={
                          "h-5 w-5 " +
                          (i <= Math.round(industryAggregate.ratingValue)
                            ? "fill-[#cc3d00]"
                            : "opacity-30")
                        }
                      />
                    ))}
                  </div>
                  <div className="text-sm font-black uppercase tracking-widest text-black">
                    {industryAggregate.ratingValue.toFixed(1)} / 5
                    <span className="ml-1 text-black/60">
                      · {industryAggregate.reviewCount} review
                      {industryAggregate.reviewCount === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {industryReviews.map((r) => (
                <article
                  key={r.id}
                  className="flex flex-col border-2 border-black bg-[#faf9f6] p-6"
                >
                  <div className="mb-3 flex items-center gap-1 text-[#cc3d00]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={
                          "h-4 w-4 " +
                          (typeof r.ratingValue === "number" &&
                          i <= Math.round(r.ratingValue)
                            ? "fill-[#cc3d00]"
                            : "opacity-30")
                        }
                      />
                    ))}
                    {typeof r.ratingValue === "number" ? (
                      <span className="ml-1 text-xs font-black uppercase tracking-widest text-black/70">
                        {r.ratingValue.toFixed(1)} / 5
                      </span>
                    ) : null}
                  </div>
                  <Quote className="mb-2 h-5 w-5 text-[#00c2ff]" />
                  <p className="flex-1 text-base leading-relaxed text-black">
                    {r.reviewBody}
                  </p>
                  <div className="mt-4 border-t-2 border-black/10 pt-3 text-xs font-black uppercase tracking-widest text-black/70">
                    {r.author}
                    {r.authorRole ? ` · ${r.authorRole}` : ""}
                    <span className="ml-2 text-black/40">
                      {r.datePublished}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related industries */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
            12 industries · serving 50+ countries · since 2018
          </p>
          <h2 className="mb-6 text-xs font-black uppercase tracking-widest text-[#cc3d00]">
            [ Other industries — {industries.length - 1} more ]
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {industries
              .filter((i) => i.slug !== ind.slug)
              .map((i) => {
                const OtherIcon = iconMap[i.icon] ?? Camera;
                const otherIdx = industries.findIndex((x) => x.slug === i.slug) + 1;
                return (
                  <Link
                    key={i.slug}
                    href={`/cases/${i.slug}`}
                    className="group relative flex items-center gap-3 border-2 border-black bg-white px-4 py-3 transition-all hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-black"
                  >
                    <OtherIcon size={18} strokeWidth={2.5} className="shrink-0" />
                    <span className="flex-1 text-sm font-black uppercase">
                      {i.title}
                    </span>
                    <span className="font-mono text-[10px] font-bold opacity-40 group-hover:opacity-100">
                      {String(otherIdx).padStart(3, "0")}
                    </span>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
}
