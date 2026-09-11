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
  ],
  canonical: "https://sublimapparel.com/shipping/eu/",
});

export default function EuShippingPage() {
  return <CountryShippingPage slug="eu" />;
}
