import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import SamplesClient from "./SamplesClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Order Custom Sublimation Samples | SublimApparel",
  description:
    "Order a custom sublimation apparel sample to see and feel the quality before committing to a bulk order. $50 sample fee + shipping.",
  canonical: "/samples/",
  ogImage: "/og/og-products.webp",
});

export default function SamplesPage() {
  return <SamplesClient />;
}
