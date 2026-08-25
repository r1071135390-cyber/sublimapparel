import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import UploadPIClient from "./UploadPIClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Upload PI for instant customer page",
  description:
    "Paste text or upload a screenshot of your Proforma Invoice. AI extracts the details and generates a payment page your customer can view and pay.",
  noindex: true, // Internal tool, don't index
});

export default function UploadPIPage() {
  return <UploadPIClient />;
}
