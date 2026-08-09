import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Final Logo — SublimApparel",
  description: "A4.3 with print pattern scaled to all-over",
  robots: { index: false, follow: false },
};

export default function FinalLogoPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <div className="text-xs tracking-[0.3em] text-[#ff4d00] mb-4">
              FINAL · A4.3 + 印花放大到全身
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              最终 logo
            </h1>
            <p className="text-[#a0a0a0] text-lg">
              A4.3 框架，印花放大到覆盖全身。挑一个，我直接集成。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs tracking-[0.2em] text-[#ff4d00] mb-3">版本 1</div>
              <div className="bg-white p-6 mb-2">
                <img src="/logo-concepts/final-logo-A43-1.jpg" alt="Final 1" className="w-full h-auto" />
              </div>
              <div className="bg-[#1a1a1a] p-6 border border-[#2a2a2a]">
                <img src="/logo-concepts/final-logo-A43-1.jpg" alt="Final 1 dark" className="w-full h-auto" />
              </div>
            </div>
            <div>
              <div className="text-xs tracking-[0.2em] text-[#ff4d00] mb-3">版本 2</div>
              <div className="bg-white p-6 mb-2">
                <img src="/logo-concepts/final-logo-A43-2.jpg" alt="Final 2" className="w-full h-auto" />
              </div>
              <div className="bg-[#1a1a1a] p-6 border border-[#2a2a2a]">
                <img src="/logo-concepts/final-logo-A43-2.jpg" alt="Final 2 dark" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
