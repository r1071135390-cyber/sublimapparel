"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CustomersClient from "./CustomersClient";
import CustomerDetailClient from "./CustomerDetailClient";

// 2026-10-13 (Phase C): single client-side router for the
// /admin/customers/ page. When the URL has no `?id=` we render the
// list (CustomersClient). When it has `?id=<n>` we render the
// detail view (CustomerDetailClient).
//
// Why one page instead of two routes:
//   - The site uses Next.js `output: "export"` for Cloudflare Pages.
//     Dynamic [id] routes would require `generateStaticParams()`
//     returning all customer ids at build time, which we don't know.
//   - Pushing the id into a query param keeps everything inside the
//     single statically-generated /admin/customers/ page.
export default function CustomersShell() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
          <div className="text-sm text-[#6b6b6b]">Loading…</div>
        </main>
      }
    >
      <ShellInner />
    </Suspense>
  );
}

function ShellInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (id) {
    return <CustomerDetailClient />;
  }
  return <CustomersClient />;
}