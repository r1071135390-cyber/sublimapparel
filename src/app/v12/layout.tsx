import type { Metadata } from "next";
import { V12Navbar } from "@/components/v12/navbar";
import { V12Footer } from "@/components/v12/footer";
import { Switcher as V12Switcher } from "@/components/v12/switcher";

export const metadata: Metadata = {
  title: "VividPrint — Full-Color Sublimation Apparel | DDP Worldwide",
  description:
    "Sublimation apparel factory in Yiwu, China. Full-color all-over print on polyester & 100% cotton. DDP shipping to your door, worldwide.",
};

export default function V12Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans text-black antialiased">
      <V12Navbar />
      {children}
      <V12Footer />
      <V12Switcher />
    </div>
  );
}
