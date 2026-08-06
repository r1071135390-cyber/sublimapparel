import type { Metadata } from "next";
import { V12Navbar } from "@/components/v12/navbar";
import { V12Footer } from "@/components/v12/footer";
import { Switcher as V12Switcher } from "@/components/v12/switcher";
import { V12Hero } from "@/components/v12/hero";
import { V12Features } from "@/components/v12/features";
import { V12Products } from "@/components/v12/products";
import { V12Process } from "@/components/v12/process";
import { V12DDP } from "@/components/v12/ddp";
import { V12Industries } from "@/components/v12/industries";
import { V12Contact } from "@/components/v12/contact";

export const metadata: Metadata = {
  title: "VividPrint — Custom Print. Any Material. Any Product.",
  description:
    "Sublimation printing factory in Yiwu, China. Custom print on apparel, mugs, mousepads, banners, home textiles and more. Polyester & 100% cotton. DDP shipping worldwide, US warehouse in Los Angeles.",
};

export default function V12Home() {
  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans text-black antialiased">
      <V12Navbar />
      <main>
        <V12Hero />
        <V12Features />
        <V12Products />
        <V12Process />
        <V12DDP />
        <V12Industries />
        <V12Contact />
      </main>
      <V12Footer />
      <V12Switcher />
    </div>
  );
}
