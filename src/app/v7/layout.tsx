import type { Metadata } from "next";
import { Navbar } from "@/components/v7/navbar";
import { Footer } from "@/components/v7/footer";
import { Switcher } from "@/components/v7/switcher";

export const metadata: Metadata = {
  title: "VividPrint — Sublimation Atelier",
  description: "Full-colour dye-sublimation printing on cotton and polyester. DDP shipping worldwide.",
};

export default function V7Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f1e8] font-sans text-stone-900 antialiased">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Switcher />
    </div>
  );
}
