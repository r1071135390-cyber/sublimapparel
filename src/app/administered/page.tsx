import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/page-metadata";
import { AdminGate } from "@/components/admin/AdminGate";
import AdminLandingClient from "./AdminLandingClient";

export const metadata: Metadata = buildPageMetadata({
  title: "Sales Tools — SublimApparel",
  description: "Create proforma invoices, upload existing PIs, and manage customer payments.",
  // Noindex this from search engines - it's an internal tool
  robots: { index: false, follow: false },
  other: {
    "robots": "noindex, nofollow",
  },
});

export default function AdminLandingPage() {
  return (
    <AdminGate title="Sales Tools" backHref="/" backLabel="← Back to site">
      <AdminLandingClient />
    </AdminGate>
  );
}
