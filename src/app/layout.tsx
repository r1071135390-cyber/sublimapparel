import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "VividPrint — Full-Color Sublimation Apparel | DDP Worldwide",
  description:
    "Sublimation apparel factory in Yiwu, China. Full-color all-over print on polyester & 100% cotton. DDP shipping to your door, worldwide.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf9f6] font-sans text-black antialiased">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
