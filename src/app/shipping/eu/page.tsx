// 2026-09-11 (R21-A): EU DDP shipping landing page.
// Targets "DDP shipping to EU" / "IOSS VAT on Chinese apparel" PAA queries.

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { COUNTRY_SHIPPING } from "@/lib/shipping-countries";
import { CountryShippingPage } from "@/components/country-shipping-page";

const data = COUNTRY_SHIPPING.eu;

export const metadata: Metadata = buildPageMetadata({
  title: "DDP Shipping to EU — IOSS VAT Pre-Paid, 12–20 Day Door-to-Door",
  description: data.metaDescription,
  keywords: [
    "DDP shipping to EU",
    "China to Germany shipping",
    "IOSS VAT apparel",
    "EU import duty 12%",
    "Yiwu to Hamburg",
    "China Railway Express Duisburg",
    "sublimation EU",
    "China to EU shipping",
    "Yiwu to EU",
    "EU import duty apparel",
    "EU VAT apparel import",
    "sublimation Europe",
    "European apparel manufacturer",
    "European clothing supplier",
    "China to EU bulk shipping",
    "EU e-commerce apparel",
    "EU private label apparel",
    "EU apparel wholesale",
    "EU apparel dropshipping",
    "EU clothing import",
    "Yiwu to EU delivery",
    "EU apparel factory direct",
    "EU B2B apparel",
    "EU clothing manufacturer",
    "EU sublimation factory",
    "EU team apparel supplier",
    "EU sportswear manufacturer",
    "EU workwear supplier",
    "Rotterdam EU apparel hub",
    "Germany France Italy Spain apparel",
  ],
  canonical: "https://sublimapparel.com/shipping/eu/",
});

export default function EuShippingPage() {
  return <CountryShippingPage slug="eu" />;
}
