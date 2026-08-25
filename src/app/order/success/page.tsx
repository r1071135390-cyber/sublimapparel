import type { Metadata } from "next";
import { Suspense } from "react";
import { buildPageMetadata } from "@/lib/page-metadata";
import OrderSuccessClient from "./OrderSuccessClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Order Confirmed | SublimApparel",
  description: "Your payment was successful.",
  canonical: "/order/success/",
  robots: { index: false, follow: false },
});

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center">Loading...</div>}>
      <OrderSuccessClient />
    </Suspense>
  );
}
