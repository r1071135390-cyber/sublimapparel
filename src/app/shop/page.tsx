import { buildPageMetadata } from "@/lib/page-metadata";
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
  return <ShopClient />;
}
