import { Suspense } from "react";
import PayClient from "./PayClient";

export const metadata = {
  title: "Proforma Invoice Payment | SublimApparel",
  description: "Pay your SublimApparel proforma invoice securely by card or bank transfer.",
  robots: { index: false, follow: false },
};

export default function PayPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#faf9f6]">
          <div className="text-base font-black uppercase tracking-widest text-[#0a0a0a]">
            Loading…
          </div>
        </div>
      }
    >
      <PayClient />
    </Suspense>
  );
}
