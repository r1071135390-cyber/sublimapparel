import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Logo Concepts ",
  description: "Logo design options for SublimApparel — internal preview",
  robots: { index: false, follow: false },
};

const CONCEPTS = [
  {
    id: "A",
    name: "S/A Monogram",
    file: "/logo-concepts/concept-A-monogram.jpg",
    desc: "几何化 S/A 字母组合，工业感最强。负空间运用，A 的横杠用品牌橙红点缀。",
    pros: ["简洁有力 / 商务感", "黑白通用 / favicon 友好", "中大型 logo 表现最佳"],
    use: "主 logo、印名片、合同、PPT",
  },
  {
    id: "B",
    name: "Ink Drop",
    file: "/logo-concepts/concept-B-inkdrop.jpg",
    desc: "抽象墨滴 + 热浪渐变。最有动感，象征\"墨水转化为色彩\"的瞬间。",
    pros: ["视觉记忆点最强", "暗示\"升华\"过程", "彩色和单色都好认"],
    use: "营销物料、社媒头像、App icon",
  },
  {
    id: "C",
    name: "Heat Wave",
    file: "/logo-concepts/concept-C-heatwave.jpg",
    desc: "热浪堆叠成 S 形，CMYK 配色。最有\"工业 + 鲜艳\"反差感。",
    pros: ["工艺感最强", "色彩最丰富", "和工厂调性最贴"],
    use: "工厂背景墙、展会主视觉",
  },
  {
    id: "D",
    name: "CMYK Quad",
    file: "/logo-concepts/concept-D-cmyk.jpg",
    desc: "CMYK 四色方块拼图。最直接表达\"四色印刷\"的行业符号。",
    pros: ["行业识别度最高", "几何感 / 现代", "logo + 包装都能用"],
    use: "产品包装、行业认证、Slogan 配图",
  },
  {
    id: "E",
    name: "Full Wordmark",
    file: "/logo-concepts/concept-E-fullwordmark.jpg",
    desc: "图标 + 完整字标 + Slogan。最完整品牌方案，直接能上线。",
    pros: ["开箱即用", "Slogan 一起呈现", "横版适配所有场景"],
    use: "Header / 商务合作 / 名片抬头",
  },
];

export default function LogoConceptsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page title */}
          <div className="mb-16">
            <div className="text-xs tracking-[0.3em] text-[#ff4d00] mb-4">
              INTERNAL PREVIEW · LOGO CONCEPTS
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              5 Logo Directions
            </h1>
            <p className="text-[#a0a0a0] text-lg max-w-3xl">
              基于品牌定位（BOLD / INDUSTRIAL / VIBRANT / TRUSTWORTHY）生成的 5 个 logo 方向。
              每个都聚焦不同的"品牌记忆点"。建议在浅色和深色背景下都看一遍，
              再选出最符合"SublimApparel 是一家怎样的工厂"的那个。
            </p>
          </div>

          {/* Each concept in 2x layout: light bg + dark bg */}
          {CONCEPTS.map((c, i) => (
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
                {/* Light background */}
                <div className="bg-white p-8 flex items-center justify-center min-h-[280px]">
                  <img
                    src={c.file}
                    alt={`${c.name} on light`}
                    className="max-w-full max-h-[240px] object-contain"
                  />
                </div>
                {/* Dark background */}
                <div className="bg-[#1a1a1a] p-8 flex items-center justify-center min-h-[280px] border border-[#2a2a2a]">
                  <img
                    src={c.file}
                    alt={`${c.name} on dark`}
                    className="max-w-full max-h-[240px] object-contain"
                  />
                </div>
              </div>

              {/* Pros + use */}
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
              工厂网站 + 展会物料 → 选 <span className="text-[#ff4d00]">A (Monogram)</span> +{" "}
              <span className="text-[#ff4d00]">C (Heat Wave)</span> 双 logo 体系
            </h3>
            <ul className="space-y-3 text-[#a0a0a0] text-base">
              <li>
                <strong className="text-white">A 作为主 logo</strong>：黑白通用，最商务，印名片/合同/PPT 永远不出错
              </li>
              <li>
                <strong className="text-white">C 作为品牌色 logo</strong>：工厂背景墙、展会主视觉、营销物料上用，色彩冲击力最强
              </li>
              <li>
                <strong className="text-white">favicon 用 A</strong>：浏览器 16×16 像素下，几何 monogram 比任何彩色版都清晰
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
