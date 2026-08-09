import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Logo Concepts V3 — All-Over Print — SublimApparel",
  description: "All-over print logo variants for SublimApparel",
  robots: { index: false, follow: false },
};

const CONCEPTS = [
  {
    id: "A1",
    name: "T-Shirt + 全身彩虹渐变",
    file: "/logo-concepts/v3-A1-tshirt-rainbow.jpg",
    desc: 'T恤全身覆盖从青到品红到橙红的彩虹渐变。每一寸布料都有颜色——最直观表达"全幅印花"。',
    pros: ["色彩覆盖最完整", "现代、年轻化", "favicon 仍可辨"],
    use: "主 logo / 商务合作封面",
  },
  {
    id: "A2",
    name: "T-Shirt + CMYK 几何图案",
    file: "/logo-concepts/v3-A2-tshirt-geometric.jpg",
    desc: 'T恤全身填满 CMYK 四色几何图案（青三角、品红圆、黄方块、黑色）。直接展示"四色印刷"行业符号。',
    pros: ["CMYK 行业符号", "几何感强、规律美", "B2B 客户秒懂"],
    use: "工厂宣传 / 行业展会",
  },
  {
    id: "A3",
    name: "T-Shirt + 热带写真印花",
    file: "/logo-concepts/v3-A3-tshirt-tropical.jpg",
    desc: 'T恤全身贴满热带植物写真印花（棕榈叶、花朵、日落）。展示"复杂图案也能印"的能力。',
    pros: ["真实客户案例感", "POD 平台最爱", "图案最复杂、难度感最强"],
    use: "POD 客户 / 设计型客户",
  },
  {
    id: "A4",
    name: "T-Shirt + 墨水爆炸",
    file: "/logo-concepts/v3-A4-tshirt-explosion.jpg",
    desc: 'T恤全身被四色墨水爆炸式覆盖，象征"热升华瞬间把墨水转印到布料"的能量感。',
    pros: ['最有"工艺瞬间"感', "动态 / 视觉冲击", "暗色底对比较强"],
    use: "营销主视觉 / 工厂外景墙",
  },
];

export default function LogoConceptsV3Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page title */}
          <div className="mb-16">
            <div className="text-xs tracking-[0.3em] text-[#ff4d00] mb-4">
              V3 · ALL-OVER PRINT
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              A 方向 · 4 个<br />
              <span className="text-[#ff4d00]">全身印</span> 变体
            </h1>
            <p className="text-[#a0a0a0] text-lg max-w-3xl mb-4">
              基于 A 方向（图标+字标）+ 你的核心卖点"全身印"，做了 4 个变体。
              共同点：<span className="text-white">每一寸 T 恤都有印花</span>，没有留白区域，
              直接传达"我们做全幅印花"的能力。
            </p>
            <p className="text-sm text-[#6b6b6b]">
              历史版本：<a href="/logo-concepts/" className="text-[#00c2ff] underline">V1（无服装）</a>
              {" · "}
              <a href="/logo-concepts-v2/" className="text-[#00c2ff] underline">V2（5 服装方向）</a>
            </p>
          </div>

          {/* Each concept */}
          {CONCEPTS.map((c) => (
            <section key={c.id} className="mb-20">
              <div className="flex items-baseline gap-6 mb-6">
                <div className="text-7xl md:text-8xl font-bold text-[#ff4d00] leading-none">
                  {c.id}
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{c.name}</h2>
                  <p className="text-[#a0a0a0] max-w-3xl">{c.desc}</p>
                </div>
              </div>

              {/* Two backgrounds */}
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
              建议：<span className="text-[#ff4d00]">A1 (彩虹渐变)</span> 作主 logo
            </h3>
            <ul className="space-y-3 text-[#a0a0a0] text-base">
              <li>
                <strong className="text-white">A1 彩虹渐变</strong>：渐变最干净、最现代、最有"色彩转印"感，
                配合黑/灰字标对比强烈，Header 上识别度最高。
              </li>
              <li>
                <strong className="text-white">A2 CMYK 几何</strong>：最"行业"，如果你的客户大多懂印刷，
                这个会让他们一眼觉得"这家是专业的"。
              </li>
              <li>
                <strong className="text-white">A3 热带写真</strong>：如果你的客户群偏 POD 卖家/品牌方，
                这个最有"成衣感"。
              </li>
              <li>
                <strong className="text-white">A4 墨水爆炸</strong>：最有"工艺瞬间"冲击力，
                适合做广告主视觉，但 logo 略复杂。
              </li>
            </ul>
            <p className="mt-6 text-sm text-[#6b6b6b]">
              选好后告诉我，我立即把 logo 集成到网站 Header + favicon，1-2 分钟上线。
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
