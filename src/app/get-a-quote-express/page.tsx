import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { JsonLd } from "@/components/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/breadcrumb";
import InquiryExpressClient from "./InquiryExpressClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Express Quote Service | 30-Minute Response | SublimApparel",
  description:
    "Skip the inquiry queue. Pay a $99 refundable deposit and get a landed-cost quote in 30 minutes. Priority support, free mockup, and express sample processing included. Sublimation on polyester, DTG on cotton, DDP worldwide.",
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
