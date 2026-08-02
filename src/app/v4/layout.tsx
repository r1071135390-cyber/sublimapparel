import type { Metadata } from "next";
import { Navbar } from "@/components/v4/navbar";
import { Footer } from "@/components/v4/footer";
import { Switcher } from "@/components/v4/switcher";

export const metadata: Metadata = {
  title: "VividPrint | Full-Color Sublimation Apparel · DDP Worldwide",
  description: "V4 — Tech-forward design. Full-color sublimation apparel, DDP shipping, manufactured in Yiwu, China.",
};

export default function V4Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white antialiased">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Switcher />
    </div>
  );
}
