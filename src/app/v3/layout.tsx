import type { Metadata } from "next";
import { V3Navbar } from "@/components/v3/navbar";
import { V3Footer } from "@/components/v3/footer";
import { V3Switcher } from "@/components/v3/switcher";

export const metadata: Metadata = {
  title: "VividPrint — Full-Color Sublimation Apparel | DDP Worldwide",
  description:
    "Sublimation apparel factory in Yiwu, China. Full-color all-over print on polyester & 100% cotton. DDP shipping to your door, worldwide.",
};

export default function V3Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans text-black antialiased">
      <V3Navbar />
      {children}
      <V3Footer />
      <V3Switcher />
    </div>
  );
}
