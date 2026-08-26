import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import SummaryClient from "./SummaryClient";

export const metadata: Metadata = buildPageMetadata({
  title: "PI Summary — SublimApparel Sales Portal",
  description: "Overview of all proforma invoices: count, value, and recent activity.",
  noindex: true,
});

export default function SummaryPage() {
  return <SummaryClient />;
}
