import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import EditPIClient from "./EditPIClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Edit PI | SublimApparel Sales Portal",
  description:
    "Edit a proforma invoice (draft or sent only). Pre-edit snapshots are saved to the revisions table.",
  noindex: true,
});

export default function EditPI() {
  return <EditPIClient />;
}