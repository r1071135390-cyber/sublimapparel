import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import InquiryExpressClient from "./InquiryExpressClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Express Quote Service | 30-Minute Response | SublimApparel",
  description:
    "Skip the inquiry queue. Pay a $99 refundable deposit and get a landed-cost quote in 30 minutes. Priority support and free mockup included.",
  canonical: "/get-a-quote-express/",
  ogImage: "/og/og-quote.webp",
});

export default function InquiryExpressPage() {
  return <InquiryExpressClient />;
}
