import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import InquiryExpressClient from "./InquiryExpressClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Express Quote Service | 30-Minute Response | SublimApparel",
  // 2026-09-11 (R15-P0-2): was 222 chars — Google meta description limit is ~160. Rewrote to 154 chars, kept the value prop + service terms.
  description:
    "Skip the inquiry queue. Pay a $99 refundable deposit, get a landed-cost quote in 30 minutes. Priority support, free mockup, express sample processing.",
  canonical: "/get-a-quote-express/",
  ogImage: "/og/og-quote.webp",
  keywords: [
    "express apparel quote",
    "fast custom apparel quote",
    "instant apparel quote",
    "rapid quote custom clothing",
    "24-hour apparel quote",
    "rush quote apparel",
    "express clothing quote",
    "quick quote sublimation",
    "same day apparel quote",
    "fast quote all-over print",
    "instant B2B quote apparel",
    "express factory quote",
    "rapid clothing quote",
    "1-day apparel quote",
    "speed quote apparel",
    "urgent apparel quote",
    "express B2B quote",
    "instant sublimation quote",
    "rush order quote apparel",
    "fast track apparel quote",
    "express custom clothing quote",
    "rapid factory quote",
    "immediate apparel quote",
    "on-demand apparel quote",
    "30-minute quote",
    "fast apparel quote",
    "rapid quote custom apparel",
    "urgent quote custom clothing",
    "same-day quote apparel",
    "express quote request",
    "rush quote sublimation",
    "1-hour quote apparel",
    "express RFQ apparel",
    "speed quote custom clothing",
    "express MOQ quote",
    "express DDP quote",
    "quick custom quote",
    "rapid B2B apparel quote",
    "rush custom apparel quote",
    "quick team apparel quote",
    "quick event apparel quote",
    "quick corporate apparel quote",
    "quick private label quote",
  ]
});

// 2026-09-12 (R46): complete the @graph — was a lone BreadcrumbList
// with no WebPage and no Service. Express quote is a high-intent paid
// service ($99 deposit, 30-min response) so the Service node carries
// areaServed 8 core DDP countries + serviceType for Google.
const expressGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "@id": "https://sublimapparel.com/get-a-quote-express/#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://sublimapparel.com/" },
        { "@type": "ListItem", position: 2, name: "Get a Quote", item: "https://sublimapparel.com/get-a-quote/" },
        { "@type": "ListItem", position: 3, name: "Express Quote", item: "https://sublimapparel.com/get-a-quote-express/" },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://sublimapparel.com/get-a-quote-express/#webpage",
      url: "https://sublimapparel.com/get-a-quote-express/",
      name: "Express Quote Service | 30-Minute Response | SublimApparel",
      description:
        "Skip the inquiry queue. Pay a $99 refundable deposit, get a landed-cost quote in 30 minutes. Priority support, free mockup, express sample processing.",
      inLanguage: "en",
      isPartOf: { "@id": "https://sublimapparel.com/#website" },
      about: { "@id": "https://sublimapparel.com/#organization" },
      mainEntity: { "@id": "https://sublimapparel.com/get-a-quote-express/#service" },
      speakable: {
        "@type": "SpeakableSpecification",
        xpath: ["/html/body//h1", "/html/body//section[1]//p"],
      },
    },
    {
      "@type": "Service",
      "@id": "https://sublimapparel.com/get-a-quote-express/#service",
      name: "SublimApparel Express Quote Service",
      description:
        "Premium express quote service for custom apparel projects. $99 refundable deposit gets you a landed-cost quote within 30 minutes, free mockup, and priority sample processing. Deposit credited toward any subsequent bulk order of 100+ pieces.",
      serviceType: "Express custom apparel quoting service",
      url: "https://sublimapparel.com/get-a-quote-express/",
      provider: { "@id": "https://sublimapparel.com/#organization" },
      offers: {
        "@type": "Offer",
        price: "99.00",
        priceCurrency: "USD",
        category: "Express quote service",
        eligibleRegion: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Canada" },
          { "@type": "Country", name: "United Kingdom" },
          { "@type": "Country", name: "Australia" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "France" },
          { "@type": "Country", name: "Spain" },
          { "@type": "Country", name: "Japan" },
        ],
      },
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Australia" },
        { "@type": "Country", name: "Germany" },
        { "@type": "Country", name: "France" },
        { "@type": "Country", name: "Spain" },
        { "@type": "Country", name: "Japan" },
      ],
    },
  ],
};

export default function InquiryExpressPage() {
  return (
    <>
      {/* 2026-09-12 (R46): single @graph — BreadcrumbList + WebPage + Service with Offer */}
      <JsonLd data={expressGraph} />
      <InquiryExpressClient />
    </>
  );
}
