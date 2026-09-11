import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import InquiryExpressClient from "./InquiryExpressClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Express Quote Service | 30-Minute Response | SublimApparel",
  // 2026-09-11 (R15-P0-2): was 222 chars — Google meta description limit is ~160. Rewrote to 154 chars, kept the value prop + service terms.
  description:
    "Skip the inquiry queue. Pay a $99 refundable deposit, get a landed-cost quote in 30 minutes. Priority support, free mockup, express sample processing.",
  canonical: "/get-a-quote-express/",
  ogImage: "/og/og-quote.webp",
});

// 2026-09-11 (Round 13): /get-a-quote-express/ was the only high-priority
// page (0.95) missing breadcrumb JSON-LD. All other sitemap pages had at
// least BreadcrumbList. Adding it here so Google can display the SERP
// breadcrumb trail "Home > Get a Quote > Express Quote".
const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: "Home", path: "/" },
  { name: "Get a Quote", path: "/get-a-quote" },
  { name: "Express Quote", path: "/get-a-quote-express" },
]);

export default function InquiryExpressPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <InquiryExpressClient />
    </>
  );
}
