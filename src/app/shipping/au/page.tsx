// 2026-09-11 (R21-A): Australia DDP shipping landing page.
// Targets "DDP shipping to Australia" / "GST on Chinese apparel" PAA queries.

import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { COUNTRY_SHIPPING } from "@/lib/shipping-countries";
import { CountryShippingPage } from "@/components/country-shipping-page";

const data = COUNTRY_SHIPPING.au;

export const metadata: Metadata = buildPageMetadata({
  title: "DDP Shipping to Australia — GST Pre-Paid, 12–22 Day Delivery",
  description: data.metaDescription,
  keywords: [
    "DDP shipping to Australia",
    "China to Australia shipping",
    "GST import apparel",
    "Yiwu to Sydney",
    "sublimation Australia",
    "AU 5% import duty",
    "New Zealand DDP",
  ],
  canonical: "https://sublimapparel.com/shipping/au/",
});

export default function AuShippingPage() {
  return <CountryShippingPage slug="au" />;
}
