// 2026-09-11 (R21-A): Canada DDP shipping landing page.
// Targets "DDP shipping to Canada" / "GST/HST on Chinese apparel" PAA queries.

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { COUNTRY_SHIPPING } from "@/lib/shipping-countries";
import { CountryShippingPage } from "@/components/country-shipping-page";

const data = COUNTRY_SHIPPING.canada;

export const metadata: Metadata = buildPageMetadata({
  title: "DDP Shipping to Canada — GST/HST Pre-Paid, 10–20 Day Delivery",
  description: data.metaDescription,
  keywords: [
    "DDP shipping to Canada",
    "China to Canada shipping",
    "Canadian import duty apparel",
    "GST HST on imports",
    "Yiwu to Toronto",
    "sublimation Canada",
    "Vancouver customs",
  ],
  canonical: "https://sublimapparel.com/shipping/canada/",
});

export default function CanadaShippingPage() {
  return <CountryShippingPage slug="canada" />;
}
