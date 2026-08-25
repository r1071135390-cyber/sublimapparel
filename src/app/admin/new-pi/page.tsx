import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import NewPIClient from "./NewPIClient";

export const metadata: Metadata = buildPageMetadata({
  title: "New PI — manual entry | SublimApparel Sales Portal",
  description: "Create a new Proforma Invoice manually with the same layout as our Excel template.",
  path: "/admin/new-pi/",
  noindex: true,
});

export default function NewPI() {
  return <NewPIClient />;
}
