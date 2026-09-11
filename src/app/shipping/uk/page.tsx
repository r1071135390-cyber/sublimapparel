// 2026-09-11 (R21-A): UK DDP shipping landing page.
// Targets "DDP shipping to UK" / "UK import duty on Chinese apparel" PAA queries.

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { COUNTRY_SHIPPING } from "@/lib/shipping-countries";
import { CountryShippingPage } from "@/components/country-shipping-page";

const data = COUNTRY_SHIPPING.uk;

export const metadata: Metadata = buildPageMetadata({
  title: "DDP Shipping to UK — Post-Brexit Ready, VAT + Duty Pre-Paid",
  description: data.metaDescription,
  keywords: [
    "DDP shipping to UK",
    "China to UK shipping",
    "UK import duty apparel",
    "post-Brexit EORI",
    "UK VAT on Chinese imports",
    "sublimation UK",
    "Yiwu to UK",
  ],
  canonical: "https://sublimapparel.com/shipping/uk/",
});

export default function UkShippingPage() {
  return <CountryShippingPage slug="uk" />;
}
