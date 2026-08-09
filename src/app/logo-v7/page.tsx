import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Logo V7 — A4.3 Only Pattern Scaled — SublimApparel",
  description: "A4.3 with print pattern only scaled up to all-over",
  robots: { index: false, follow: false },
};

export default function LogoV7Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page title */}
          <div className="mb-12">
            <div className="text-xs tracking-[0.3em] text-[#ff4d00] mb-4">
              V7 · A4.3 · ONLY PATTERN SCALED
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              A4.3 原版<br />
              <span className="text-[#ff4d00]">只放大印花</span>
            </h1>
            <p className="text-[#a0a0a0] text-lg max-w-3xl mb-4">
              T 恤样式、车缝线、字标、Slogan、角度、位置 <span className="text-white">全部不变</span>。
              唯一变化：<span className="text-[#ff4d00]">中间的印花图案放大到覆盖整件 T 恤</span>。
            </p>
            <p className="text-sm text-[#6b6b6b]">
              参考原版：
              <a href="/logo-concepts-v4/" className="text-[#00c2ff] underline">V4 (A4.3)</a>
            </p>
          </div>

          {/* A4.3 original for reference */}
          <section className="mb-12 p-6 bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="text-xs tracking-[0.2em] text-[#a0a0a0] mb-4">
              ↑ A4.3 原版 (图案只占中间)
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 flex items-center justify-center min-h-[200px]">
                <img
                  src="/logo-concepts/v4-A4-stitching.jpg"
                  alt="A4.3 original"
                  className="max-w-full max-h-[180px] object-contain"
                />
              </div>
              <div className="bg-[#0a0a0a] p-6 flex items-center justify-center min-h-[200px] border border-[#2a2a2a]">
                <img
                  src="/logo-concepts/v4-A4-stitching.jpg"
                  alt="A4.3 original dark"
                  className="max-w-full max-h-[180px] object-contain"
                />
              </div>
            </div>
          </section>

          {/* V7 variants - 2 close attempts */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[#a0a0a0]">↓ 全身印版 (2 个)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="text-xs tracking-[0.2em] text-[#ff4d00] mb-3">
                  VERSION 1
                </div>
                <div className="bg-white p-4 mb-2">
                  <img
                    src="/logo-concepts/v7-a43-scaled-1.jpg"
                    alt="V7 version 1"
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-[#1a1a1a] p-4 border border-[#2a2a2a]">
                  <img
                    src="/logo-concepts/v7-a43-scaled-1.jpg"
                    alt="V7 version 1 dark"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div>
                <div className="text-xs tracking-[0.2em] text-[#ff4d00] mb-3">
                  VERSION 2
                </div>
                <div className="bg-white p-4 mb-2">
                  <img
                    src="/logo-concepts/v7-a43-scaled-2.jpg"
                    alt="V7 version 2"
                    className="w-full h-auto"
                  />
                </div>
                <div className="bg-[#1a1a1a] p-4 border border-[#2a2a2a]">
                  <img
                    src="/logo-concepts/v7-a43-scaled-2.jpg"
                    alt="V7 version 2 dark"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Recommendation */}
          <section className="mt-16 p-8 md:p-12 bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm">
            <div className="text-xs tracking-[0.3em] text-[#ff4d00] mb-4">
              QUICK PICK
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              2 个差异很小 · 选最接近你心里的
            </h3>
            <p className="text-[#a0a0a0] text-base">
              如果都觉得差不多，<strong className="text-white">告诉我用哪个数字</strong>，我直接集成到网站。
              如果还有"差一点"，告诉我具体差在哪里（图案太密/太稀/颜色不对/边界太硬...），我继续微调。
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
