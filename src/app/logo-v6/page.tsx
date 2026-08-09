import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Logo V6 — A4.3 Pattern Scaled Up — SublimApparel",
  description: "A4.3 with same explosion pattern scaled to cover full t-shirt",
  robots: { index: false, follow: false },
};

const CONCEPTS = [
  {
    id: "1",
    file: "/logo-concepts/v6-A4.3-big-1.jpg",
    note: "扩散到边缘，留少量黑底",
  },
  {
    id: "2",
    file: "/logo-concepts/v6-A4.3-big-2.jpg",
    note: "完全填满，无黑底残留",
  },
  {
    id: "3",
    file: "/logo-concepts/v6-A4.3-big-3.jpg",
    note: "爆炸感最强，墨水更密集",
  },
];

export default function LogoV6Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page title */}
          <div className="mb-12">
            <div className="text-xs tracking-[0.3em] text-[#ff4d00] mb-4">
              V6 · A4.3 + 图案放大
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              A4.3 版式 · 同一个图案<br />
              <span className="text-[#ff4d00]">只是变大</span> 覆盖全身
            </h1>
            <p className="text-[#a0a0a0] text-lg max-w-3xl mb-4">
              保持 A4.3 的版式（黑 T 恤 + 车缝线 + 精致字标），
              把中间那个墨水爆炸图案 <span className="text-white">放大到覆盖整件 T 恤</span>。
            </p>
            <p className="text-sm text-[#6b6b6b]">
              参考：
              <a href="/logo-concepts-v4/" className="text-[#00c2ff] underline">V4 (A4.3 局部版)</a>
            </p>
          </div>

          {/* A4.3 original for reference */}
          <section className="mb-16 p-6 bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="text-xs tracking-[0.2em] text-[#a0a0a0] mb-4">
              ↑ 原版 A4.3 (图案只占中间)
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

          {/* 3 scaled-up variants */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-[#a0a0a0]">↓ 全身印版 (3 个微调)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CONCEPTS.map((c) => (
                <div key={c.id}>
                  <div className="text-xs tracking-[0.2em] text-[#ff4d00] mb-3">
                    VARIANT {c.id}
                  </div>
                  <div className="bg-white p-4 mb-2">
                    <img
                      src={c.file}
                      alt={`V6 variant ${c.id}`}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="bg-[#1a1a1a] p-4 border border-[#2a2a2a]">
                    <img
                      src={c.file}
                      alt={`V6 variant ${c.id} dark`}
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-[#a0a0a0] mt-3">{c.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recommendation */}
          <section className="mt-16 p-8 md:p-12 bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm">
            <div className="text-xs tracking-[0.3em] text-[#ff4d00] mb-4">
              QUICK PICK
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              3 个差异很小 · 选最对味的那个
            </h3>
            <ul className="space-y-3 text-[#a0a0a0] text-base">
              <li>
                <strong className="text-white">1 号</strong>：扩散感最自然，黑底和图案过渡柔和
              </li>
              <li>
                <strong className="text-white">2 号</strong>：填得最满，颜色最炸
              </li>
              <li>
                <strong className="text-white">3 号</strong>：爆炸感最强，最有冲击力
              </li>
            </ul>
            <p className="mt-6 text-sm text-[#6b6b6b]">
              选好后告诉我编号，1-2 分钟集成到网站 Header + favicon。
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
