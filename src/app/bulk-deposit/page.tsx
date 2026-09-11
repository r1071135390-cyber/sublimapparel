import type { Metadata } from "next";
import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";
import BulkDepositClient from "./BulkDepositClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Pay Bulk Order Deposit (30%) | SublimApparel",
  description:
    "Pay 30% deposit to start production on your custom apparel bulk order. Production starts within 24 hours. Refundable if we can't match the quote.",
  canonical: "/bulk-deposit/",
  ogImage: "/og/og-quote.webp",
  // 2026-09-11 (R15-P0-4): /bulk-deposit/ is a payment processing page — it
  // collects card details through Stripe and should NEVER appear in Google's
  // search results. It was previously indexable by default. Adding noindex
  // + nofollow so Google drops it from the index. Also: bulk-deposit is NOT
  // in the sitemap (verified), so this change closes the only path for
  // Google to discover the page.
  robots: { index: false, follow: false },
});

export default function BulkDepositPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
      <BulkDepositClient />
    </Suspense>
  );
}
