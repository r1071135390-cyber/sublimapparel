import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import CustomersShell from "./CustomersShell";
import { AdminGate } from "@/components/admin/AdminGate";

export const metadata: Metadata = buildPageMetadata({
  title: "Customers — SublimApparel Sales Portal",
  description: "Customer archive: every customer who has ever received a PI.",
  noindex: true,
});

export default function CustomersPage() {
  return (
    <AdminGate title="Customers">
      <CustomersShell />
    </AdminGate>
  );
}
