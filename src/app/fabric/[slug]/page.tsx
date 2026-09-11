import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Star, Quote } from "lucide-react";
import { fabricTypes, fabricBySlug } from "@/lib/fabric-data";
import { JsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  filterReviewsForFabric,
  hasAggregateableReviews,
  computeAggregateRating,
  toSchemaReview,
} from "@/lib/reviews";

export function generateStaticParams() {
  return fabricTypes.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const fabric = fabricBySlug(slug);
  if (!fabric) return { title: "Fabric not found" };
  return {
    title: fabric.h1,
    description: fabric.metaDescription,
    keywords: [
      fabric.name,
      fabric.comp,
      fabric.use,
      `${fabric.name} supplier`,
      `${fabric.name} China factory`,
      `${fabric.name} for sublimation`,
      `${fabric.name} for ${fabric.tags.slice(0, 3).join(", ")}`,
      "SublimApparel fabric",
      "China fabric factory",
      "Yiwu fabric supplier",
      "DDP fabric shipping",
      "B2B apparel fabric",
    ].join(", "),
    openGraph: {
      title: fabric.h1,
      description: fabric.metaDescription,
      type: "article",    images: ["/og/og-home.webp"],
  
    },
  };
}

const printMethodLabels: Record<string, string> = {
  sublimation: "Dye-sublimation",
  dtg: "DTG (direct-to-garment)",
  dtf: "DTF (direct-to-film)",
  "screen-print": "Screen printing",
  embroidery: "Embroidery",
};

const printMethodColors: Record<string, string> = {
  sublimation: "bg-[#ff4d00] text-black",
  dtg: "bg-[#00c2ff] text-black",
  dtf: "bg-black text-white",
  "screen-print": "bg-[#1a1a1a] text-white",
  embroidery: "bg-[#6b6b6b] text-white",
};

export default async function FabricDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const fabric = fabricBySlug(slug);
  if (!fabric) notFound();

  const relatedFabrics = fabric.relatedSlugs
    .map((s) => fabricBySlug(s))
    .filter(Boolean)
    .slice(0, 4);

  // Build JSON-LD structured data for SEO
  // 2026-09-11 (R25): enrich the Product schema so each of the 64 fabric
  // detail pages can qualify for Product rich results + Google Images
  // search. We add:
  //   - image: full swatch URL (so Google can index the actual swatch)
  //   - sku/mpn: derived from slug for stable SKU-style identifier
  //   - material: composition string ("100% Polyester" etc.) so Google
  //     can match long-tail material queries
  //   - category: from fabric.tags[] (sportswear / cotton / performance)
  //   - manufacturer: @id reference to the global Organization so the
  //     fabric joins the brand entity graph
  //   - additionalProperty: GSM, spec/width, primary use, supported
  //     print methods, fit rating (5 properties) so Google can match
  //     "160gsm polyester jersey sublimation" style long-tail queries
  //   - offers: full Offer with priceSpecification, shipping details
  //     and merchant return policy mirroring the products/all/[slug]
  //     template
  const swatchUrl = `https://sublimapparel.com/fabric-sw-${fabric.swatch}.webp`;
  const additionalProps: { "@type": string; name: string; value: string }[] = [
    { "@type": "PropertyValue", name: "Composition", value: fabric.comp },
    { "@type": "PropertyValue", name: "Weight (GSM)", value: fabric.gsm },
    { "@type": "PropertyValue", name: "Width / Spec", value: fabric.spec },
    { "@type": "PropertyValue", name: "Primary use", value: fabric.use },
    { "@type": "PropertyValue", name: "Fit rating (1-5)", value: String(fabric.fit) },
  ];
  if (fabric.printMethods.length) {
    additionalProps.push({
      "@type": "PropertyValue",
      name: "Supported print methods",
      value: fabric.printMethods.join(", "),
    });
  }
  if (fabric.sublimationSuitability) {
    additionalProps.push({
      "@type": "PropertyValue",
      name: "Sublimation suitability",
      value: fabric.sublimationSuitability,
    });
  }

  // 2026-09-11 (R31): per-fabric review aggregation. Pull the subset
  // of verifiedReviews that are linked to this fabric
  // (relatedFabricSlug === fabric.slug). A fabric-level review ("The
  // 220gsm polyester survived 40 wash cycles with no fade") is the
  // highest-intent surface for a buyer choosing between fabric
  // options before they even open a product detail page. Gated by
  // the same contract as R27/R28/R29/R30 — verifiedReviews empty
  // today, so the spread strips both fields at JSON-LD build time.
  const fabricReviews = filterReviewsForFabric(fabric.slug);
  const fabricAggregate = hasAggregateableReviews(fabricReviews)
    ? computeAggregateRating(fabricReviews)
    : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `https://sublimapparel.com/fabric/${fabric.slug}/#product`,
        name: fabric.name,
        description: fabric.metaDescription,
        image: [swatchUrl],
        sku: `FAB-${fabric.slug.toUpperCase()}`,
        mpn: fabric.slug,
        category: fabric.tags.slice(0, 3).join(", "),
        material: fabric.comp,
        brand: { "@type": "Brand", name: "SublimApparel" },
        manufacturer: { "@id": "https://sublimapparel.com/#organization" },
        additionalProperty: additionalProps,
        // 2026-09-11 (R31): embed review + aggregateRating INSIDE the
        // Product node (same shape as R30 /products/all/[slug]/).
        // Google reads this for the product star-rating rich result.
        // Mirrors the R30 contract exactly — verifiedReviews empty
        // today, both fields stripped at spread-time, JSON-LD is
        // byte-equivalent to R25. A real review with
        // `relatedFabricSlug: "${fabric.slug}"` lights up the schema
        // and the on-page Buyer feedback section automatically.
        ...(fabricReviews.length > 0
          ? { review: fabricReviews.map(toSchemaReview) }
          : {}),
        ...(fabricAggregate
          ? {
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: fabricAggregate.ratingValue,
                reviewCount: fabricAggregate.reviewCount,
                bestRating: fabricAggregate.bestRating,
                worstRating: fabricAggregate.worstRating,
              },
            }
          : {}),
        offers: {
          "@type": "Offer",
          "@id": `https://sublimapparel.com/fabric/${fabric.slug}/#offer`,
          url: `https://sublimapparel.com/fabric/${fabric.slug}/`,
          availability: "https://schema.org/InStock",
          priceCurrency: "USD",
          priceValidUntil: "2027-12-31",
          inventoryLevel: { "@type": "QuantitativeValue", value: 1500, unitCode: "MTR" },
          seller: { "@id": "https://sublimapparel.com/#organization" },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "US",
            },
            deliveryTime: {
              "@type": "ShippingDeliveryTime",
              handlingTime: { "@type": "QuantitativeValue", minValue: 15, maxValue: 25, unitCode: "DAY" },
              transitTime: { "@type": "QuantitativeValue", minValue: 7, maxValue: 14, unitCode: "DAY" },
            },
          },
          hasMerchantReturnPolicy: {
            "@type": "MerchantReturnPolicy",
            returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
            merchantReturnDays: 0,
            description: "Cut-to-order fabric is non-returnable. Defective bolts replaced 1:1 within 30 days of receipt.",
          },
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: fabric.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://sublimapparel.com" },
          { "@type": "ListItem", position: 2, name: "Fabric", item: "https://sublimapparel.com/fabric" },
          { "@type": "ListItem", position: 3, name: fabric.name, item: `https://sublimapparel.com/fabric/${fabric.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <Navbar />
      <JsonLd data={jsonLd} />

      <main className="min-h-screen bg-white">
        {/* HERO */}
        <section className="relative bg-[#0a0a0a] text-white">
          <div className="container mx-auto px-4 md:px-8 py-20 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#cc3d00] mb-4">
                  {fabric.tags[0]} / {fabric.tags[1] || fabric.tags[0]}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                  {fabric.name}
                </h1>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-6">
                  {fabric.intro}
                </p>
                <p className="text-sm text-white/80">
                  Composition: <span className="text-white font-bold">{fabric.comp}</span>
                </p>
              </div>
              <div className="relative aspect-square w-full bg-white">
                <Image
                  src={`/fabric-sw-${fabric.swatch}.webp`}
                  alt={`${fabric.name} fabric swatch - ${fabric.comp}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* KEY SPECS BAR */}
        <section className="border-y-2 border-black bg-[#fafafa]">
          <div className="container mx-auto px-4 md:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] mb-1">
                  Composition
                </p>
                <p className="text-sm md:text-base font-black text-black">
                  {fabric.comp}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] mb-1">
                  Weight
                </p>
                <p className="text-sm md:text-base font-black text-black">
                  {fabric.gsm} gsm
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] mb-1">
                  Width / Spec
                </p>
                <p className="text-sm md:text-base font-black text-black">
                  {fabric.spec}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#6b6b6b] mb-1">
                  Min Order
                </p>
                <p className="text-sm md:text-base font-black text-black">
                  50 pcs / 50 m
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO + KEY FEATURES */}
        <section className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-black text-black mb-6">
                What is {fabric.name.toLowerCase()}?
              </h2>
              <p className="text-base md:text-lg text-[#1a1a1a] leading-relaxed mb-4">
                {fabric.intro}
              </p>
              <p className="text-base md:text-lg text-[#1a1a1a] leading-relaxed">
                {fabric.description} We work with {fabric.name.toLowerCase()} daily in our Yiwu factory, producing for brands, teams, and event organizers worldwide. Whether you need {fabric.tags.slice(0, 3).join(", ")} applications or are sourcing {fabric.name.toLowerCase()} for the first time, we can help with sample yardage, bulk production, and DDP shipping to your door.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#cc3d00] mb-4">
                Key characteristics
              </p>
              <ul className="space-y-3">
                {fabric.characteristics || [].map((c, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[#1a1a1a]">
                    <span className="text-[#cc3d00] font-black flex-shrink-0">→</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PRINT METHODS */}
        <section className="bg-[#0a0a0a] text-white">
          <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
            <p className="text-xs font-bold uppercase tracking-widest text-[#29b6f6] mb-4">
              Compatible print methods
            </p>
            <h2 className="text-3xl md:text-4xl font-black mb-8">
              How we print on {fabric.name.toLowerCase()}.
            </h2>
            <div className="flex flex-wrap gap-3 mb-8">
              {fabric.printMethods.map((m) => (
                <span
                  key={m}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wide ${
                    printMethodColors[m]
                  }`}
                >
                  {printMethodLabels[m]}
                </span>
              ))}
            </div>
            <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-3xl">
              {fabric.printMethods.includes("sublimation")
                ? `${fabric.name} is dye-sublimation-friendly, meaning we can print photo-quality all-over graphics edge-to-edge. The print becomes part of the fiber — it won't crack, peel, or fade. For other substrates in your project, we offer DTF and screen-print as fallback options.`
                : `${fabric.name} takes DTF (direct-to-film) and screen-print cleanly for full-color graphics. We also offer embroidery for premium logos. For other substrates in your project, we can combine ${fabric.name} with sublimation-friendly poly panels in the same garment.`}
            </p>
          </div>
        </section>

        {/* BEST FOR */}
        <section className="container mx-auto px-4 md:px-8 py-16 md:py-24">
          <p className="text-xs font-bold uppercase tracking-widest text-[#cc3d00] mb-4">
            Best for
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-black mb-8">
            What we make with {fabric.name.toLowerCase()}.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fabric.bestForList || [].map((item, i) => (
              <div
                key={i}
                className="border-2 border-black p-6 hover:bg-[#0a0a0a] hover:text-white transition-colors group"
              >
                <p className="text-xs font-bold uppercase tracking-widest text-[#6b6b6b] group-hover:text-[#29b6f6] mb-2">
                  Application {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-base font-bold text-black group-hover:text-white">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CARE + SPECS DETAIL */}
        <section className="bg-[#fafafa] border-y-2 border-black">
          <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#cc3d00] mb-4">
                  Care instructions
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-black mb-6">
                  How to care for {fabric.name.toLowerCase()}.
                </h2>
                <ul className="space-y-3">
                  {fabric.careNotes.map((c, i) => (
                    <li key={i} className="flex gap-3 text-sm md:text-base text-[#1a1a1a]">
                      <span className="text-[#cc3d00] font-black flex-shrink-0">✓</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#cc3d00] mb-4">
                  Tags & categories
                </p>
                <h2 className="text-2xl md:text-3xl font-black text-black mb-6">
                  Where this fabric fits.
                </h2>
                <div className="flex flex-wrap gap-2">
                  {fabric.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide bg-white border-2 border-black text-black"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-[#6b6b6b] mt-6 leading-relaxed">
                  Filter our full fabric catalogue by these tags to find related materials for your project.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {fabric.faq.length > 0 && (
          <section className="container mx-auto px-4 md:px-8 py-16 md:py-24">
            <p className="text-xs font-bold uppercase tracking-widest text-[#cc3d00] mb-4">
              FAQ
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-black mb-8">
              Common questions about {fabric.name.toLowerCase()}.
            </h2>
            <div className="space-y-6">
              {fabric.faq.map((item, i) => (
                <div key={i} className="border-b-2 border-black pb-6">
                  <h3 className="text-lg md:text-xl font-black text-black mb-3">
                    {item.q}
                  </h3>
                  <p className="text-base text-[#1a1a1a] leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Buyer feedback — per-fabric review surface.
            2026-09-11 (R31): mirrors the /about/, /cases/*,
            /products/all/*, and /blog/* review blocks, but scoped
            to this fabric (filtered by relatedFabricSlug ===
            fabric.slug). Renders only when at least one review is
            attached to this fabric — when empty (today's state),
            the entire section is omitted to keep the page focused
            on the fabric content. The /about/ page already shows
            the global "Reviews coming soon" placeholder; repeating
            it on every one of the 64 fabric detail pages would be
            visual noise. The embedded schema fields (Product.review
            + Product.aggregateRating, R30 shape) and the UI section
            light up simultaneously the day a real review with
            relatedFabricSlug === fabric.slug is added to
            verifiedReviews. */}
        {fabricReviews.length > 0 && (
          <section className="border-b-2 border-black bg-white">
            <div className="container mx-auto px-4 md:px-8 py-16 md:py-20">
              <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-3 inline-block bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
                    Buyer feedback
                  </div>
                  <h2 className="text-3xl font-black leading-tight text-black md:text-5xl">
                    What buyers say
                    <br />
                    <span className="text-[#cc3d00]">about {fabric.name.toLowerCase()}.</span>
                  </h2>
                </div>
                {fabricAggregate ? (
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[#cc3d00]">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={
                            "h-5 w-5 " +
                            (i <= Math.round(fabricAggregate.ratingValue)
                              ? "fill-[#cc3d00]"
                              : "opacity-30")
                          }
                        />
                      ))}
                    </div>
                    <div className="text-sm font-black uppercase tracking-widest text-black">
                      {fabricAggregate.ratingValue.toFixed(1)} / 5
                      <span className="ml-1 text-black/60">
                        · {fabricAggregate.reviewCount} review
                        {fabricAggregate.reviewCount === 1 ? "" : "s"}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {fabricReviews.map((r) => (
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

        {/* RELATED FABRICS */}
        {relatedFabrics.length > 0 && (
          <section className="bg-[#1a1a1a] text-white">
            <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
              <p className="text-xs font-bold uppercase tracking-widest text-[#29b6f6] mb-4">
                Related fabrics
              </p>
              <h2 className="text-3xl md:text-4xl font-black mb-8">
                You might also consider.
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatedFabrics.map((related) => (
                  <Link
                    key={related!.slug}
                    href={`/fabric/${related!.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-square w-full bg-white border-2 border-white/20 group-hover:border-[#ff4d00] transition-colors">
                      <Image
                        src={`/fabric-sw-${related!.swatch}.webp`}
                        alt={`${related!.name} swatch`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm font-bold uppercase mt-3 group-hover:text-[#cc3d00]">
                      {related!.name}
                    </p>
                    <p className="text-xs text-white/80 mt-1">
                      {related!.comp}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="container mx-auto px-4 md:px-8 py-16 md:py-24 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-black mb-4">
            Ready to order {fabric.name.toLowerCase()}?
          </h2>
          <p className="text-base md:text-lg text-[#6b6b6b] mb-8 max-w-2xl mx-auto">
            Send us your spec — quantity, sizes, print design — and we'll quote you FOB Yiwu or DDP to your door. Sample yardage available on request.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 bg-[#ff4d00] text-black px-8 py-4 text-sm font-black uppercase tracking-wider hover:bg-[#e64500] transition-colors"
            >
              Request a quote →
            </Link>
            <Link
              href="/fabric/"
              className="inline-flex items-center justify-center gap-2 border-2 border-black text-black px-8 py-4 text-sm font-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              See all fabrics
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
