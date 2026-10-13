import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import CustomersClient from "./CustomersClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Customers — SublimApparel Sales Portal",
  description: "Customer archive: every customer who has ever received a PI.",
  noindex: true,
});

export default function CustomersPage() {
  return <CustomersClient />;
}
