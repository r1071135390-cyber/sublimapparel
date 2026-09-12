import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Package, MapPin, Star, Quote } from "lucide-react";
import { industries, getIndustryBySlug } from "@/lib/cases";
import { RequestQuoteLink } from "@/components/request-quote-link";
import { products } from "@/lib/products-data";
import { getProductImages } from "@/lib/product-images";
import { JsonLd } from "@/components/json-ld";
import {
  filterReviewsForCase,
  hasAggregateableReviews,
  computeAggregateRating,
  toSchemaReview,
} from "@/lib/reviews";

type Props = {
  params: Promise<{ slug: string; caseId: string }>;
};

export async function generateStaticParams() {
  const params: { slug: string; caseId: string }[] = [];
  for (const ind of industries) {
    for (const c of ind.cases) {
      params.push({ slug: ind.slug, caseId: c.id });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, caseId } = await params;
  const ind = getIndustryBySlug(slug);
  const c = ind?.cases.find((x) => x.id === caseId);
  if (!c) return { title: "Case Study — SublimApparel" };
  // 2026-09-11 push (Round 5): use { absolute: title } so the layout's
  // "%s | SublimApparel" template doesn't append a duplicate brand suffix.
  // Brand signal is already provided by canonical + og:site_name.
  // Also: budget the case-study title so the final `<title> | Case Study`
  // string stays within Google's 60-char SERP cap (suffix = 12 chars,
  // so case title itself must be ≤ 48 chars).
  const SUFFIX = " | Case Study"; // 12 chars
  const TITLE_BUDGET = 60 - SUFFIX.length; // 48 chars
  const rawTitle = c.title.length > TITLE_BUDGET
    ? c.title.slice(0, TITLE_BUDGET - 1).trimEnd() + "…"
    : c.title;
  return {
    title: { absolute: `${rawTitle}${SUFFIX}` },
    description: c.summary.slice(0, 160),
    keywords: [
      "case study",
      "sublimation case study",
      "custom apparel case",
      "B2B sublimation project",
      "full-coverage print",
      "DDP shipping case",
      ind?.title.toLowerCase(),
      ...c.products.map((p) => p.toLowerCase()),
    ].filter((k): k is string => typeof k === "string" && k.length > 0),
    robots: { index: true, follow: true },
    openGraph: {
      images: ["/og/og-case-detail.webp"],
    },
  };
}

function getRelatedProduct(nameHint: string) {
  return products.find((p) =>
    p.name.toLowerCase().includes(nameHint.toLowerCase().split(" ")[0])
  );
}

export default async function CaseDetailPage({ params }: Props) {
  const { slug, caseId } = await params;
  const ind = getIndustryBySlug(slug);
  const c = ind?.cases.find((x) => x.id === caseId);
  if (!ind || !c) notFound();

  // Collect related products
  const related = c.products
    .map((pName) => getRelatedProduct(pName))
    .filter((p): p is (typeof products)[number] => Boolean(p))
    .slice(0, 4);

  // Pick 3 related industries (same scenario, exclude current)
  const relatedIndustries = industries
    .filter((x) => x.slug !== ind.slug && x.relatedScenario === ind.relatedScenario)
    .slice(0, 3);
  const fallbackIndustries = relatedIndustries.length < 3
    ? industries
        .filter((x) => x.slug !== ind.slug && !relatedIndustries.find((r) => r.slug === x.slug))
        .slice(0, 3 - relatedIndustries.length)
    : [];
  const showRelatedIndustries = [...relatedIndustries, ...fallbackIndustries].slice(0, 3);

  // 2026-09-11 (R29): per-case study review aggregation. We pull the
  // subset of verifiedReviews that are linked to this exact case study
  // (relatedCaseId === c.id). When the subset is non-empty we emit a
  // separate JSON-LD block carrying review + aggregateRating for the
  // specific project described on this page. This is the most
  // decision-critical surface for a buyer comparing vendors — Google
  // now sees each case study detail as a reviewable Service node in
  // addition to the Article node. The gating is identical to R27/R28
  // (verifiedReviews empty today → no fabricated data, just a clean
  // Service shell).
  const caseReviews = filterReviewsForCase(c.id);
  const caseAggregate = hasAggregateableReviews(caseReviews)
    ? computeAggregateRating(caseReviews)
    : null;
  const caseReviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://sublimapparel.com/cases/${ind.slug}/${c.id}/#service-reviews`,
    url: `https://sublimapparel.com/cases/${ind.slug}/${c.id}/`,
    name: `${c.title} — buyer review surface`,
    description: `Aggregated buyer feedback for the "${c.title}" case study (${c.client}, ${c.year}).`,
    serviceType: "Custom apparel manufacturing case study review aggregation",
    provider: { "@id": "https://sublimapparel.com/#organization" },
    ...(caseReviews.length > 0
      ? { review: caseReviews.map(toSchemaReview) }
      : {}),
    ...(caseAggregate
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: caseAggregate.ratingValue,
            reviewCount: caseAggregate.reviewCount,
            bestRating: caseAggregate.bestRating,
            worstRating: caseAggregate.worstRating,
          },
        }
      : {}),
  };

  const caseUrl = `https://sublimapparel.com/cases/${ind.slug}/${c.id}/`;
  const breadcrumbId = `${caseUrl}#breadcrumb`;
  const serviceId = `${caseUrl}#service-reviews`;
  const articleId = `${caseUrl}#article`;

  // 2026-09-12 (R45): merge 3 separate JsonLd calls into a single @graph.
  // BreadcrumbList + Service (review surface) + Article — all cross-linked
  // via @id to the global #website + #organization entity graph.
  const caseGraph = {
    "@context": "https://schema.org",
    "@graph": [
      // 1 · BreadcrumbList (4-item path)
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://sublimapparel.com/" },
          { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://sublimapparel.com/cases/" },
          { "@type": "ListItem", position: 3, name: ind.title, item: `https://sublimapparel.com/cases/${ind.slug}/` },
          { "@type": "ListItem", position: 4, name: c.title, item: caseUrl },
        ],
      },
      // 2 · Service (review surface for this case study) — gated: review +
      // aggregateRating only emitted when verifiedReviews contain entries with
      // relatedCaseId matching this case, matching R27/R28/R42/R33 pattern.
      {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": serviceId,
        url: caseUrl,
        name: `${c.title} — buyer review surface`,
        description: `Aggregated buyer feedback for the "${c.title}" case study (${c.client}, ${c.year}).`,
        serviceType: "Custom apparel manufacturing case study review aggregation",
        provider: { "@id": "https://sublimapparel.com/#organization" },
        ...(caseReviews.length > 0
          ? { review: caseReviews.map(toSchemaReview) }
          : {}),
        ...(caseAggregate
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: caseAggregate.ratingValue,
                reviewCount: caseAggregate.reviewCount,
                bestRating: caseAggregate.bestRating,
                worstRating: caseAggregate.worstRating,
              },
            }
          : {}),
      },
      // 3 · Article (case study content node)
      {
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": articleId,
        headline: c.title,
        description: c.summary,
        datePublished: `${c.year}-01-01`,
        dateModified: `${c.year}-01-01`,
        inLanguage: "en",
        author: { "@id": "https://sublimapparel.com/#person" },
        publisher: { "@id": "https://sublimapparel.com/#organization" },
        isPartOf: { "@id": `https://sublimapparel.com/cases/${ind.slug}/#collection` },
        about: { "@id": "https://sublimapparel.com/#organization" },
        keywords: [
          "case study",
          "sublimation case study",
          "custom apparel case",
          "B2B sublimation project",
          "full-coverage print",
          "DDP shipping case",
          ind.title.toLowerCase(),
          ...c.products.map((p) => p.toLowerCase()),
        ].join(", "),
        articleSection: ind.title,
        url: caseUrl,
      },
    ],
  };

  return (
    <main>
      {/* 2026-09-12 (R45): single @graph — BreadcrumbList + Service + Article */}
      <JsonLd data={caseGraph} />
      {/* Hero */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <Link
            href={`/cases/${ind.slug}/`}
            className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            {ind.title}
          </Link>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#cc3d00]">
            Case Study · {c.year} · {ind.title}
          </p>
          <h1 className="mb-6 max-w-4xl text-4xl font-black uppercase leading-[0.95] tracking-tight md:text-6xl">
            {c.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <CalendarDays size={14} className="text-[#cc3d00]" />
              {c.year}
            </span>
            <span className="flex items-center gap-2">
              <Package size={14} className="text-[#cc3d00]" />
              {c.products.length} product type{c.products.length === 1 ? "" : "s"}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-[#cc3d00]" />
              {c.client}
            </span>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3 md:py-20">
          <div className="md:col-span-2">
            <h2 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-[#cc3d00]">
              The Project
            </h2>
            <p className="text-lg leading-relaxed text-[#0a0a0a] md:text-xl">
              {c.summary}
            </p>
          </div>
          <aside className="space-y-4 border-l-2 border-black pl-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/70">
                Client
              </p>
              <p className="mt-1 text-sm font-semibold text-black">{c.client}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/70">
                Year
              </p>
              <p className="mt-1 text-sm font-semibold text-black">{c.year}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/70">
                Industry
              </p>
              <p className="mt-1 text-sm font-semibold text-black">{ind.title}</p>
            </div>
            <RequestQuoteLink
              label={`Case / ${c.id} / Get a quote like this`}
              className="inline-flex w-full items-center justify-center bg-[#ff4d00] px-4 py-3 text-xs font-black uppercase tracking-widest text-black transition-colors hover:bg-[#e64500]"
            >
              Get a quote like this
            </RequestQuoteLink>
          </aside>
        </div>
      </section>

      {/* Products made */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <h2 className="mb-8 text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
            What we made
          </h2>
          <ul className="mb-12 grid gap-3 md:grid-cols-2">
            {c.products.map((p, i) => (
              <li
                key={i}
                className="flex items-center gap-3 border-2 border-black bg-white p-4"
              >
                <Package size={18} className="shrink-0 text-[#cc3d00]" />
                <span className="text-sm font-semibold text-black">{p}</span>
              </li>
            ))}
          </ul>

          {related.length > 0 && (
            <div>
              <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-black/70">
                Related products you can order
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((p) => {
                  const imgs = getProductImages(p.number);
                  return (
                    <Link
                      key={p.id}
                      href={`/products/all/${p.slug}/`}
                      className="group block border-2 border-black bg-white p-3 transition-colors hover:border-[#ff4d00]"
                    >
                      <div className="relative mb-3 aspect-square overflow-hidden border border-black/10 bg-[#f5f5f5]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={imgs[0]}
                          alt={p.name}
                          width={600}
                          height={600}
                          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-black/70">
                        {p.category}
                      </p>
                      <p className="text-sm font-semibold leading-snug text-black">
                        {p.name}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Buyer feedback — per-case study review surface.
          2026-09-11 (R29): mirrors the /about/ "Trusted by buyers" block
          and the /cases/[slug]/ "Buyer feedback" block, but scoped to
          this specific case study (filtered by relatedCaseId === c.id).
          Renders only when at least one review is attached to this
          case — when empty (today's state), the entire section is
          omitted to keep the page focused on the project itself. The
          /about/ page already shows the global "Reviews coming soon"
          placeholder; repeating it on every case detail page would be
          visual noise. Schema and UI light up simultaneously the day a
          real review with relatedCaseId === c.id is added to
          verifiedReviews. */}
      {caseReviews.length > 0 && (
        <section className="border-b-2 border-black bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                  Buyer feedback
                </div>
                <h2 className="text-3xl font-black leading-tight text-black md:text-5xl">
                  What {c.client} said
                  <br />
                  <span className="text-[#cc3d00]">about this project.</span>
                </h2>
              </div>
              {caseAggregate ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[#cc3d00]">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={
                          "h-5 w-5 " +
                          (i <= Math.round(caseAggregate.ratingValue)
                            ? "fill-[#cc3d00]"
                            : "opacity-30")
                        }
                      />
                    ))}
                  </div>
                  <div className="text-sm font-black uppercase tracking-widest text-black">
                    {caseAggregate.ratingValue.toFixed(1)} / 5
                    <span className="ml-1 text-black/60">
                      · {caseAggregate.reviewCount} review
                      {caseAggregate.reviewCount === 1 ? "" : "s"}
                    </span>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {caseReviews.map((r) => (
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
                    {r.url ? (
                      <a
                        href={r.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="ml-2 text-[#00c2ff] underline"
                      >
                        Source ↗
                      </a>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related industries (cross-link for SEO) */}
      {showRelatedIndustries.length > 0 && (
        <section className="border-b-2 border-black bg-white">
          <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-black/70">
              Related industries we serve
            </p>
            <h2 className="mb-6 text-2xl font-black uppercase leading-none tracking-tight md:text-3xl">
              More {ind.title.toLowerCase()} neighbors
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {showRelatedIndustries.map((ri) => (
                <Link
                  key={ri.slug}
                  href={`/industries/${ri.slug}/`}
                  className="group flex flex-col gap-2 border-2 border-black bg-white p-5 transition-colors hover:border-[#ff4d00] hover:bg-[#fff5f0]"
                >
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/70">
                    Industry
                  </p>
                  <p className="text-lg font-black leading-tight text-black group-hover:text-[#ff4d00]">
                    {ri.title}
                  </p>
                  <p className="text-sm text-black/70 line-clamp-2">{ri.blurb}</p>
                  <span className="mt-auto inline-flex items-center gap-1 pt-2 text-xs font-bold uppercase tracking-widest text-[#ff4d00]">
                    View {ri.title} <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center md:py-20">
          <h2 className="mb-4 text-3xl font-black uppercase leading-none tracking-tight md:text-5xl">
            Your project
            <br />
            <span className="text-[#cc3d00]">could be next.</span>
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-base text-white/70 md:text-lg">
            Send us your design, quantity and deadline. We reply with a quote in 12 hours and
            ship samples in 5 days.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <RequestQuoteLink
              label={`Case / ${c.id} / Bottom CTA / Start your project`}
              className="inline-flex items-center justify-center bg-[#ff4d00] px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-colors hover:bg-[#e64500]"
            >
              Start your project
            </RequestQuoteLink>
            <Link
              href={`/cases/${ind.slug}/`}
              className="inline-flex items-center justify-center border-2 border-white/30 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-colors hover:border-white"
            >
              See more {ind.title} work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
