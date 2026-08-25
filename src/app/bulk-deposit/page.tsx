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
});

export default function BulkDepositPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
      <BulkDepositClient />
    </Suspense>
  );
}
