import type { Metadata } from "next";
import { Navbar } from "@/components/v8/navbar";
import { Footer } from "@/components/v8/footer";
import { Switcher } from "@/components/v8/switcher";

export const metadata: Metadata = {
  title: "VIVID/PRINT — Sublimation Factory",
  description: "Full-color sublimation. Cotton or polyester. DDP delivery worldwide.",
};

export default function V8Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white font-sans text-black antialiased">
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Switcher />
    </div>
  );
}
