import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
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
  // 2026-09-11 (R15-P3): /shop/ is the Stripe-powered self-serve sample/fabric
  // shop. Up to now it had no structured data at all, so Google only saw a
  // generic WebPage. Adding a CollectionPage + BreadcrumbList @graph so Google
  // can identify the page as a product catalog and surface the breadcrumb
  // trail in SERPs. WebPage is the underlying type; CollectionPage signals
  // "this is a shoppable listing" which can unlock product carousel rich
  // results when paired with a Product entity per SKU.
  const shopSchema = {
    "@context": "https://schema.org",
    "@graph": [
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
    ],
  };

  return (
    <>
      <JsonLd
        data={buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Shop", path: "/shop" },
        ])}
      />
      <JsonLd data={shopSchema} />
      <ShopClient />
    </>
  );
}
