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
    "Yiwu to Australia",
    "Australia import duty apparel",
    "Australia GST apparel",
    "Australian apparel manufacturer",
    "Australian clothing supplier",
    "China to Australia bulk shipping",
    "Australia e-commerce apparel",
    "Australia private label apparel",
    "Australia apparel wholesale",
    "Australia apparel dropshipping",
    "Australia clothing import",
    "Yiwu to Australia delivery",
    "Australia apparel factory direct",
    "Australia B2B apparel",
    "Australia clothing manufacturer",
    "Australia sublimation factory",
    "Australia team apparel supplier",
    "Australia sportswear manufacturer",
    "Australia workwear supplier",
    "Australia custom apparel",
    "Sydney Melbourne apparel",
  ],
  canonical: "https://sublimapparel.com/shipping/au/",
});

export default function AuShippingPage() {
  return <CountryShippingPage slug="au" />;
}
