import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Logo Concepts V5 — A4.3 All-Over — SublimApparel",
  description: "A4.3 framework with all-over print patterns",
  robots: { index: false, follow: false },
};

const CONCEPTS = [
  {
    id: "A4.3.1",
    name: "黑 T 恤 + 全身彩虹渐变",
    file: "/logo-concepts/v5-A4.3.1-rainbow.jpg",
    pattern: "青→品红→黄→橙红 渐变 100% 覆盖",
    desc: "保留 A4.3 框架（黑 T 恤 + 车缝线 + 精致字标），但图案从中间爆炸改成全身渐变，色彩覆盖每一寸布料。",
    pros: ["最干净现代", "favicon 仍清晰", "色彩覆盖最完整"],
    use: "主 logo 推荐",
  },
  {
    id: "A4.3.2",
    name: "黑 T 恤 + 全身 CMYK 几何",
    file: "/logo-concepts/v5-A4.3.2-cmyk.jpg",
    pattern: "CMYK 四色几何图案 100% 覆盖",
    desc: '几何图案铺满整件 T 恤（青三角、品红圆、黄方块、橙红点），B2B 客户一眼看出"四色印刷 + 全身印"。',
    pros: ["行业符号最强", "B2B 客户秒懂", "几何感最现代"],
    use: "工厂 / 展会 / 行业物料",
  },
  {
    id: "A4.3.3",
    name: "黑 T 恤 + 全身热带写真",
    file: "/logo-concepts/v5-A4.3.3-tropical.jpg",
    pattern: "热带植物写真 100% 覆盖",
    desc: '棕榈叶、花朵、日落写真印花铺满整件 T 恤，展示"复杂图案也能全身印"的能力。',
    pros: ["成衣感最强", "POD 客户最爱", "图案复杂证明工艺"],
    use: "POD / 设计师客户",
  },
  {
    id: "A4.3.4",
    name: "黑 T 恤 + 全身墨水爆炸",
    file: "/logo-concepts/v5-A4.3.4-explosion.jpg",
    pattern: "四色墨水爆炸 100% 覆盖",
    desc: "把 A4 原版的中心墨水爆炸，扩展到覆盖整件 T 恤，工艺冲击感最强。",
    pros: ["最有动态感", "暗色对比最强烈", "原版升级"],
    use: "营销主视觉 / 工厂外景",
  },
];

export default function LogoConceptsV5Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page title */}
          <div className="mb-16">
            <div className="text-xs tracking-[0.3em] text-[#ff4d00] mb-4">
              V5 · A4.3 × ALL-OVER PRINT
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              A4.3 版式 · 4 个<br />
              <span className="text-[#ff4d00]">全身印</span> 图案
            </h1>
            <p className="text-[#a0a0a0] text-lg max-w-3xl mb-4">
              保留 A4.3 的版式（黑 T 恤 + 车缝线 + 精致字标 + 细横线），
              把中间局部图案换成 <span className="text-white">100% 覆盖的全身印</span>。
              4 种图案风格，你挑一个最对味的。
            </p>
            <p className="text-sm text-[#6b6b6b]">
              参考：
              <a href="/logo-concepts-v3/" className="text-[#00c2ff] underline">V3 (A4 原版)</a>
              {" · "}
              <a href="/logo-concepts-v4/" className="text-[#00c2ff] underline">V4 (A4.3 框架原版)</a>
            </p>
          </div>

          {/* Side-by-side: A4.3 original for reference */}
          <section className="mb-20 p-6 bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="text-xs tracking-[0.2em] text-[#a0a0a0] mb-3">
              FOR REFERENCE — A4.3 ORIGINAL (局部图案)
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

          {/* Each all-over variant */}
          {CONCEPTS.map((c) => (
            <section key={c.id} className="mb-20">
              <div className="flex items-baseline gap-6 mb-6">
                <div className="text-5xl md:text-6xl font-bold text-[#ff4d00] leading-none">
                  {c.id}
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{c.name}</h2>
                  <div className="text-[#00c2ff] text-sm mb-2">图案: {c.pattern}</div>
                  <p className="text-[#a0a0a0] max-w-3xl">{c.desc}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-8 flex items-center justify-center min-h-[280px]">
                  <img
                    src={c.file}
                    alt={`${c.name} on light`}
                    className="max-w-full max-h-[240px] object-contain"
                  />
                </div>
                <div className="bg-[#1a1a1a] p-8 flex items-center justify-center min-h-[280px] border border-[#2a2a2a]">
                  <img
                    src={c.file}
                    alt={`${c.name} on dark`}
                    className="max-w-full max-h-[240px] object-contain"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-5">
                  <div className="text-xs tracking-[0.2em] text-[#00c2ff] mb-3">
                    WHY IT WORKS
                  </div>
                  <ul className="space-y-2 text-sm text-white/90">
                    {c.pros.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="text-[#ff4d00]">+</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] p-5">
                  <div className="text-xs tracking-[0.2em] text-[#00c2ff] mb-3">
                    BEST USED FOR
                  </div>
                  <p className="text-sm text-white/90">{c.use}</p>
                </div>
              </div>
            </section>
          ))}

          {/* Recommendation footer */}
          <section className="mt-24 p-8 md:p-12 bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm">
            <div className="text-xs tracking-[0.3em] text-[#ff4d00] mb-4">
              MY RECOMMENDATION
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              4 种全身印图案 · 一句话选
            </h3>
            <ul className="space-y-3 text-[#a0a0a0] text-base">
              <li>
                <strong className="text-white">A4.3.1 彩虹渐变</strong>：现代、干净、年轻化 → 主 logo ⭐
              </li>
              <li>
                <strong className="text-white">A4.3.2 CMYK 几何</strong>：行业感、B2B 客户最懂 → 工厂宣传
              </li>
              <li>
                <strong className="text-white">A4.3.3 热带写真</strong>：成衣感、真实案例 → POD 客户
              </li>
              <li>
                <strong className="text-white">A4.3.4 墨水爆炸</strong>：动态冲击最强 → 营销主视觉
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
