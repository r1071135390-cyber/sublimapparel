import Link from "next/link";
import { ArrowRight, MapPin, ShieldCheck, Truck, Plane, Ship, Warehouse, Package, DollarSign, Clock } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd, buildFaqPageNode } from "@/lib/breadcrumb";
import { COUNTRY_SHIPPING, type CountryShipping } from "@/lib/shipping-countries";
import { RequestQuoteLink } from "@/components/request-quote-link";

// 2026-09-11 (R21-A): single server template reused by 5 country landing
// pages (/shipping/{usa,uk,eu,au,canada}). All page-specific data lives in
// @/lib/shipping-countries.ts, so this file is the only rendering layer
// and is identical across the 5 routes.

const ICONS = {
  sea: Ship,
  air: Plane,
  express: Truck,
  rail: Warehouse,
  hybrid: Package,
  customs: ShieldCheck,
};

function iconFor(mode: string) {
  const m = mode.toLowerCase();
  if (m.includes("sea") && m.includes("hybrid")) return ICONS.hybrid;
  if (m.includes("rail")) return ICONS.rail;
  if (m.includes("sea")) return ICONS.sea;
  if (m.includes("air")) return ICONS.air;
  if (m.includes("express") || m.includes("dhl") || m.includes("fedex")) return ICONS.express;
  if (m.includes("warehouse") || m.includes("us warehouse")) return ICONS.rail;
  return ICONS.express;
}

export function CountryShippingPage({ slug }: { slug: CountryShipping["slug"] }) {
  const data = COUNTRY_SHIPPING[slug];

  // JSON-LD
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Shipping", path: "/shipping/" },
    { name: data.countryName, path: `/shipping/${slug}/` },
  ]);
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `https://sublimapparel.com/shipping/${slug}/#webpage`,
    url: `https://sublimapparel.com/shipping/${slug}/`,
    name: data.h1,
    description: data.metaDescription,
    inLanguage: "en",
    isPartOf: { "@id": "https://sublimapparel.com/#website" },
    about: { "@id": "https://sublimapparel.com/#organization" },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://sublimapparel.com/og/og-home.webp",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      xpath: ["/html/body//h1", "/html/body//section[1]//p"],
    },
  };
  // 2026-09-12 (R47): FAQ inlined into the page @graph via buildFaqPageNode
  // (was previously emitted as a standalone buildFaqJsonLd wrapper that
  // sat in a separate JSON-LD script tag — the helper now produces the
  // same shape with inLanguage + isPartOf → #webpage + about → #organization
  // cross-link fields, so the FAQ joins the brand entity graph alongside
  // every other @graph node on the page).
  const faqId = `https://sublimapparel.com/shipping/${slug}/#faq`;
  const faqWebpageId = `https://sublimapparel.com/shipping/${slug}/#webpage`;

  // 2026-09-12 (R33-A2): country + Service schema nodes so each
  // /shipping/{slug}/ page joins the brand entity graph with a
  // proper areaServed and a Country anchor for the destination.
  //
  // We emit three extra nodes that all share an @id with the page
  // (so Google parses them in the same JSON.parse pass and joins
  // them via the URL fragment):
  //
  //   1. Country  — anchors the destination country. Holds the
  //                 ISO 3166-1 alpha-2 code in `identifier` and
  //                 the capital city in `address`, with verifiable
  //                 `geo` coordinates so Google trusts the Country
  //                 as canonical. EU is the only exception (no
  //                 alpha-2 code; we use "EU" + Brussels as
  //                 administrative anchor).
  //   2. Service  — a sibling Service node that ties the
  //                 international shipping offering to the
  //                 Organization via `provider`, declares the
  //                 service surface via `areaServed → Country`,
  //                 and lists a single Offer for the DDP shipping
  //                 product so it can match against
  //                 "DDP shipping to <country>" intent queries.
  //   3. ServiceArea — explicit geographic service boundary
  //                 (Schema.org's recommended shape for
  //                 `areaServed` when a service targets a whole
  //                 country, not just a city). We attach it as a
  //                 secondary `areaServed` so the Country +
  //                 ServiceArea combination matches both Google
  //                 documentation patterns.
  //
  // The Service node also references the page-level #webpage
  // node so the schema graph stays self-contained.
  const countryNode = {
    "@context": "https://schema.org",
    "@type": "Country",
    "@id": `https://sublimapparel.com/shipping/${slug}/#country`,
    name: data.regionFacts.regionLabel,
    identifier: data.regionFacts.isoCountryCode,
    url: `https://sublimapparel.com/shipping/${slug}/`,
    address: {
      "@type": "PostalAddress",
      addressCountry: data.regionFacts.isoCountryCode,
      addressLocality: data.regionFacts.capital,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: data.regionFacts.latitude,
      longitude: data.regionFacts.longitude,
    },
    sameAs: [
      // ISO Online Browsing Platform URL pattern (verifiable
      // authority for the country code, helps Google validate
      // the identifier).
      `https://www.iso.org/obp/ui/#iso:code:3166:${data.regionFacts.isoCountryCode}`,
    ],
  };
  const serviceAreaNode = {
    "@context": "https://schema.org",
    "@type": "ServiceArea",
    "@id": `https://sublimapparel.com/shipping/${slug}/#service-area`,
    name: `${data.regionFacts.regionLabel} — door-to-door service zone`,
    addressCountry: data.regionFacts.isoCountryCode,
    geo: {
      "@type": "GeoCoordinates",
      latitude: data.regionFacts.latitude,
      longitude: data.regionFacts.longitude,
    },
  };
  const serviceNode = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://sublimapparel.com/shipping/${slug}/#service`,
    url: `https://sublimapparel.com/shipping/${slug}/`,
    name: `DDP shipping to ${data.countryName}`,
    serviceType: "International door-to-door apparel shipping (DDP)",
    description: `DDP (delivered duty paid) custom apparel shipping from Yiwu, China to ${data.countryName}. Includes customs clearance, import duty, ${data.regionFacts.currency === "EUR" ? "VAT" : data.regionFacts.currency === "GBP" ? "VAT + import duty" : data.regionFacts.currency === "AUD" ? "GST + import duty" : data.regionFacts.currency === "CAD" ? "GST/HST + import duty" : "Section 301 tariffs + import duty"}, and last-mile delivery.`,
    provider: { "@id": "https://sublimapparel.com/#organization" },
    areaServed: [
      { "@id": `https://sublimapparel.com/shipping/${slug}/#country` },
      { "@id": `https://sublimapparel.com/shipping/${slug}/#service-area` },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `https://sublimapparel.com/shipping/${slug}/`,
      availableLanguage: ["en"],
      serviceLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressCountry: data.regionFacts.isoCountryCode,
        },
      },
    },
    offers: {
      "@type": "Offer",
      "@id": `https://sublimapparel.com/shipping/${slug}/#offer`,
      url: `https://sublimapparel.com/shipping/${slug}/`,
      priceCurrency: data.regionFacts.currency,
      price: "0",
      // price=0 because DDP rates are quote-based (per kg, per
      // destination, per mode). Google accepts 0 + availability
      // "PreOrder" as a valid quote-requested Offer surface.
      availability: "https://schema.org/PreOrder",
      availabilityStarts: "2026-01-01",
      priceValidUntil: "2027-12-31",
      inventoryLevel: {
        "@type": "QuantitativeValue",
        value: 0,
        unitText: "quote-based",
      },
      seller: { "@id": "https://sublimapparel.com/#organization" },
      areaServed: { "@id": `https://sublimapparel.com/shipping/${slug}/#country` },
      eligibleRegion: { "@id": `https://sublimapparel.com/shipping/${slug}/#country` },
    },
    mainEntityOfPage: { "@id": `https://sublimapparel.com/shipping/${slug}/#webpage` },
  };

  // "Quick answer" block — direct answer to "DDP shipping to <country>".
  // This is the first thing Google indexes for PAA + featured snippets.
  const quickAnswer =
    slug === "usa"
      ? "Most sublimated apparel ships duty-free to the USA under current Section 301 exclusions. DDP from Yiwu to your US door is 7–14 days by air, 15–28 days by sea, with all duties and Section 301 tariffs pre-paid. We hold buffer stock at our Fontana, CA warehouse for 2–5 day domestic re-orders."
      : slug === "uk"
      ? "Post-Brexit, we ship DDP to the UK with 12% import duty + 20% VAT pre-paid, customs cleared under our EORI number, door-to-door in 10–18 days. You don't need a UK EORI or a customs broker — one invoice, one tracking number, no surprise bills on delivery."
      : slug === "eu"
      ? "We ship DDP to every EU country with IOSS VAT pre-paid and customs cleared under our EORI. Door-to-door in 12–20 days, with VAT 19–25% (country-specific) and 12% import duty all bundled into one landed price. Multi-country distribution under one PO is supported."
      : slug === "au"
      ? "DDP shipping from Yiwu to Australia: 10% GST + 5% import duty pre-paid, customs cleared at the port of entry, delivered to your door in 12–22 days. We also ship to New Zealand (GST 15%) on the same DDP lane with no importer-of-record requirement on your end."
      : "DDP shipping from China to Canada: customs cleared, GST (5%) + HST/QST/PST + 17–18% import duty all pre-paid. Delivered to your door in 10–20 days from Yiwu. We file customs under our own Business Number — you don't need a Canadian BN to import.";

  // 2026-09-12 (R47): consolidate all JSON-LD into a single @graph block
  // (this template was emitting 6 separate JSON-LD scripts — one each
  // for breadcrumb, WebPage, Country, ServiceArea, Service, FAQ). All
  // inner @context keys are stripped so only the outer @graph carries it,
  // matching the R46 pattern used on every other page.
  const stripContext = <T extends Record<string, unknown>>(node: T) => {
    const { "@context": _c, ...rest } = node as Record<string, unknown>;
    return rest as T;
  };
  const pageGraph = {
    "@context": "https://schema.org",
    "@graph": [
      stripContext(breadcrumbJsonLd),
      stripContext(webPageJsonLd),
      stripContext(countryNode),
      stripContext(serviceAreaNode),
      stripContext(serviceNode),
      buildFaqPageNode(faqId, faqWebpageId, data.faqs),
    ],
  };

  return (
    <main>
      <JsonLd data={pageGraph} />

      {/* HERO */}
      <section className="border-b-2 border-black bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
          <div className="mb-3 inline-flex items-center gap-2 bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            <span>{data.flag}</span>
            <span>{data.countryName}</span>
          </div>
          <h1 className="text-4xl font-black leading-[0.95] tracking-tight md:text-7xl">
            {data.keyword}
            <br />
            <span className="text-[#0078a8]">done right.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">{data.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <RequestQuoteLink
              label={`${slug} / page / Get a DDP quote`}
              className="group inline-flex items-center gap-2 bg-[#ff4d00] px-6 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
            >
              Get DDP Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </RequestQuoteLink>
            <Link
              href="/shipping/ddp/"
              className="group inline-flex items-center gap-2 border-2 border-white bg-transparent px-6 py-3 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black"
            >
              What is DDP?
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED SNIPPET — direct answer to PAA query */}
      <section id="quick-answer" className="border-b-2 border-black bg-[#e6f7ff]">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <div className="mb-3 inline-block border-2 border-black bg-[#00c2ff] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            Quick answer
          </div>
          <h2 className="mb-4 text-3xl font-black leading-[0.95] tracking-tight md:text-4xl">
            {data.keyword} from China — what you actually pay
          </h2>
          <p className="text-lg leading-relaxed text-black">{quickAnswer}</p>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            What&apos;s included
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Everything in the
            <br />
            <span className="text-[#cc3d00]">one price.</span>
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {data.includes.map((item, i) => (
              <div key={i} className="flex items-start gap-3 border-2 border-black bg-[#faf9f6] p-5">
                <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-[#cc3d00]" strokeWidth={2.5} />
                <p className="text-sm font-bold leading-relaxed md:text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DUTIES + TAX */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Duties &amp; tax
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            What gets paid at
            <br />
            <span className="text-[#cc3d00]">the border.</span>
          </h2>
          <div className="overflow-x-auto border-2 border-black bg-white">
            <table
              itemScope
              itemType="https://schema.org/Table"
              className="w-full min-w-[480px]"
            >
              <thead>
                <tr className="border-b-2 border-black bg-black text-left text-xs font-black uppercase tracking-widest text-white">
                  <th className="px-4 py-3">Item</th>
                  <th className="px-4 py-3">Rate / amount</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {data.dutiesAndTax.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? "bg-white" : "bg-neutral-50"}
                  >
                    <td className="px-4 py-3 font-bold">{row.label}</td>
                    <td className="px-4 py-3 text-black/80">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs font-medium text-black/60">
            Rates shown are standard for sublimated apparel under HS 6109/6110. Actual rates may vary by
            specific fabric composition, country of origin declaration, and applicable trade agreements.
            We confirm the exact rate in your DDP quote.
          </p>
        </div>
      </section>

      {/* TRANSIT + PRICE BY MODE */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            Transit &amp; cost
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            How long, how much
            <br />
            <span className="text-[#cc3d00]">to your door.</span>
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.transit.map((t, i) => {
              const Icon = iconFor(t.mode);
              return (
                <div key={i} className="border-2 border-black bg-white p-6">
                  <Icon className="mb-4 h-7 w-7 text-[#cc3d00]" strokeWidth={1.5} />
                  <h3 className="mb-2 text-lg font-black leading-tight">{t.mode}</h3>
                  <div className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/60">
                    <Clock className="h-3 w-3" />
                    <span>{t.time}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/60">
                    <DollarSign className="h-3 w-3" />
                    <span>{t.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-xs font-medium text-black/60">
            Transit times are door-to-door estimates for production-ready orders. Customs clearance, last-mile
            delivery, and remote destinations may add 1–3 days.
          </p>
        </div>
      </section>

      {/* FAQ — visible on page (also drives FAQPage JSON-LD) */}
      <section className="border-b-2 border-black bg-[#faf9f6]">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20">
          <div className="mb-3 inline-block border-2 border-black bg-white px-3 py-1 text-xs font-black uppercase tracking-widest">
            FAQ
          </div>
          <h2 className="mb-10 text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Common questions
            <br />
            <span className="text-[#cc3d00]">from {data.countryName} buyers.</span>
          </h2>
          <div className="space-y-6">
            {data.faqs.map((f, i) => (
              <div key={i} className="border-l-4 border-[#ff4d00] bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-lg font-black leading-snug md:text-xl">{f.q}</h3>
                <p className="text-sm leading-relaxed text-black/80 md:text-base">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER COUNTRIES — internal cross-link */}
      <section className="border-b-2 border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <h2 className="mb-6 text-2xl font-black uppercase tracking-tight md:text-3xl">
            Shipping to other countries?
          </h2>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(COUNTRY_SHIPPING) as CountryShipping["slug"][])
              .filter((s) => s !== slug)
              .map((s) => (
                <Link
                  key={s}
                  href={`/shipping/${s}/`}
                  className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#ff4d00] hover:shadow-[3px_3px_0_0_#000]"
                >
                  <MapPin size={14} strokeWidth={3} />
                  {COUNTRY_SHIPPING[s].countryName}
                  <ArrowRight size={14} strokeWidth={3} />
                </Link>
              ))}
            <Link
              href="/shipping/global/"
              className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#ff4d00] hover:shadow-[3px_3px_0_0_#000]"
            >
              Global shipping (100+ countries)
              <ArrowRight size={14} strokeWidth={3} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#ff4d00] text-black">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center md:py-20">
          <h2 className="text-4xl font-black leading-[0.95] tracking-tight md:text-6xl">
            Get a {data.countryName} DDP quote
            <br />
            within 1 business day.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/95 md:text-lg">
            Send us your destination address and order quantity. We&apos;ll come back with one
            landed price — customs, duties, and last-mile included.
          </p>
          <RequestQuoteLink
            label={`${slug} / page bottom / Get a DDP quote`}
            className="mt-8 inline-flex items-center gap-2 bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
          >
            Get DDP Quote
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </RequestQuoteLink>
        </div>
      </section>
    </main>
  );
}
