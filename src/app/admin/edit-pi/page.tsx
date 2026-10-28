import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import EditPIClient from "./EditPIClient";
import { AdminGate } from "@/components/admin/AdminGate";

export const metadata: Metadata = buildPageMetadata({
  title: "Edit PI | SublimApparel Sales Portal",
  description:
    "Edit a proforma invoice (draft or sent only). Pre-edit snapshots are saved to the revisions table.",
  noindex: true,
});

export default function EditPI() {
  return (
    <AdminGate title="Edit PI">
      <EditPIClient />
    </AdminGate>
  );
}