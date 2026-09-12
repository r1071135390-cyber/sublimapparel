import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import ShopClient from "./ShopClient";

export const metadata = buildPageMetadata({
  title: "Shop Stock Sublimated Apparel & Sample Packs | SublimApparel",
  description:
    "Stock sublimated t-shirts, fabric swatch packs, and rush sample runs. Pay securely via Stripe. Ships in 3-7 days. For custom orders 100+ pcs, request a quote.",
  ogTitle: "Stock Apparel & Sample Packs — Buy Online",
  ogDescription:
    "Off-the-shelf sublimated apparel and sample packs. Pay securely online. Ships in 3-7 days.",
  ogImage: "/og/og-products.webp",
  keywords: [
    "sublimated apparel samples",
    "fabric swatch pack",
    "sublimation samples",
    "rush sample apparel",
    "stock sublimated t-shirts",
    "small batch sublimation",
    "buy custom apparel online",
  ],
});

export default function ShopPage() {
  // 2026-09-12 (R45): merge 2 separate JsonLd calls into a single @graph.
// Adds a Service node with areaServed for 8 core export countries to
// reinforce regional DDP shipping intent for the self-serve shop.
const shopGraph = {
  "@context": "https://schema.org",
  "@graph": [
    // 1 · BreadcrumbList
    {
      "@type": "BreadcrumbList",
      "@id": "https://sublimapparel.com/shop/#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://sublimapparel.com/" },
        { "@type": "ListItem", position: 2, name: "Shop", item: "https://sublimapparel.com/shop/" },
      ],
    },
    // 2 · CollectionPage + WebPage (Shop as both — CollectionPage signals
    // a shoppable listing; WebPage anchors the brand entity graph.)
    {
      "@type": "CollectionPage",
      "@id": "https://sublimapparel.com/shop/#collection",
      url: "https://sublimapparel.com/shop/",
      name: "Shop Stock Sublimated Apparel & Sample Packs",
      description:
        "Stock sublimated t-shirts, fabric swatch packs, and rush sample runs. Pay securely via Stripe. Ships in 3-7 days. For custom orders 100+ pcs, request a quote.",
      inLanguage: "en",
      isPartOf: { "@id": "https://sublimapparel.com/#website" },
      about: { "@id": "https://sublimapparel.com/#organization" },
      provider: { "@id": "https://sublimapparel.com/#organization" },
    },
    {
      "@type": "WebPage",
      "@id": "https://sublimapparel.com/shop/#webpage",
      url: "https://sublimapparel.com/shop/",
      name: "Shop Stock Sublimated Apparel & Sample Packs | SublimApparel",
      description:
        "Off-the-shelf sublimated apparel and sample packs. Pay securely online via Stripe. Ships in 3-7 days.",
      inLanguage: "en",
      isPartOf: { "@id": "https://sublimapparel.com/#website" },
      about: { "@id": "https://sublimapparel.com/#organization" },
      provider: { "@id": "https://sublimapparel.com/#organization" },
    },
    // 3 · Service — commercial / self-serve shop product
    {
      "@type": "Service",
      "@id": "https://sublimapparel.com/shop/#service",
      name: "SublimApparel Stock Shop — Samples & Small-Batch Apparel",
      description:
        "Purchase stock sublimated apparel, fabric swatch packs, and rush sample runs online via Stripe. Ships worldwide in 3-7 days. For custom orders 100+ pcs, use the quote form.",
      url: "https://sublimapparel.com/shop/",
      provider: { "@id": "https://sublimapparel.com/#organization" },
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

  return (
    <>
      {/* 2026-09-12 (R45): single @graph — BreadcrumbList + CollectionPage + WebPage + Service */}
      <JsonLd data={shopGraph} />
      <ShopClient />
    </>
  );
}
