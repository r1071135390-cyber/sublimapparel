import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import CustomerDetailClient from "./CustomerDetailClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Customer — SublimApparel Sales Portal",
  description: "Customer profile and PI history.",
  noindex: true,
});

export default function CustomerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <CustomerDetailClient id={params.id} />;
}