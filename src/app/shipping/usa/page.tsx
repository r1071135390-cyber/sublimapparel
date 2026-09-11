// 2026-09-11 (R21-A): USA DDP shipping landing page.
// Targets "DDP shipping to USA" / "China to USA customs duty" PAA queries.
// Renders from the shared template + data; no country-specific code here.

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { COUNTRY_SHIPPING } from "@/lib/shipping-countries";
import { CountryShippingPage } from "@/components/country-shipping-page";

const data = COUNTRY_SHIPPING.usa;

export const metadata: Metadata = buildPageMetadata({
  title: "DDP Shipping to USA — China to US in 7–14 Days, All Duties Pre-Paid",
  description: data.metaDescription,
  keywords: [
    "DDP shipping to USA",
    "China to USA shipping",
    "Yiwu to USA",
    "US import duty apparel",
    "sublimation USA",
    "Fontana CA warehouse",
    "Section 301 tariff apparel",
    "DDP from China USA",
  ],
  canonical: "https://sublimapparel.com/shipping/usa/",
});

export default function UsaShippingPage() {
  return <CountryShippingPage slug="usa" />;
}
