import type { Metadata } from "next";
import { V11Navbar } from "@/components/v11/navbar";
import { V11Footer } from "@/components/v11/footer";
import { Switcher as V11Switcher } from "@/components/v11/switcher";

export const metadata: Metadata = {
  title: "VividPrint — Full-Color Sublimation Apparel | DDP Worldwide",
  description:
    "Sublimation apparel factory in Yiwu, China. Full-color all-over print on polyester & 100% cotton. DDP shipping to your door, worldwide.",
};

export default function V11Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans text-black antialiased">
      <V11Navbar />
      {children}
      <V11Footer />
      <V11Switcher />
    </div>
  );
}
