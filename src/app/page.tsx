import type { Metadata } from "next";
import { V11Navbar } from "@/components/v11/navbar";
import { V11Footer } from "@/components/v11/footer";
import { Switcher as V11Switcher } from "@/components/v11/switcher";
import { V11Hero } from "@/components/v11/hero";
import { V11Features } from "@/components/v11/features";
import { V11Products } from "@/components/v11/products";
import { V11Process } from "@/components/v11/process";
import { V11DDP } from "@/components/v11/ddp";
import { V11Industries } from "@/components/v11/industries";
import { V11Contact } from "@/components/v11/contact";

export const metadata: Metadata = {
  title: "VividPrint — Custom Print. Any Material. Any Product.",
  description:
    "Sublimation printing factory in Yiwu, China. Custom print on apparel, mugs, mousepads, banners, home textiles and more. Polyester & 100% cotton. DDP shipping worldwide, US warehouse in Los Angeles.",
};

export default function V11Home() {
  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans text-black antialiased">
      <V11Navbar />
      <main>
        <V11Hero />
        <V11Features />
        <V11Products />
        <V11Process />
        <V11DDP />
        <V11Industries />
        <V11Contact />
      </main>
      <V11Footer />
      <V11Switcher />
    </div>
  );
}
