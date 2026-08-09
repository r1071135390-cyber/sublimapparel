import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Logo Concepts V2 — SublimApparel",
  description: "Logo design options with clothing silhouette — internal preview",
  robots: { index: false, follow: false },
};

const CONCEPTS = [
  {
    id: "A",
    name: "T-Shirt + 印花图案",
    file: "/logo-concepts/v2-A-tshirt-print.jpg",
    desc: "T恤轮廓 + CMYK 渐变印花图样。衣服本身就是印花展示位，象征\"我们印什么上去都行\"。",
    pros: ["最直接表达\"服装+印花\"", "彩色和黑白都好看", "favicon 也清晰可辨"],
    use: "主 logo / 商务合作 / 工厂外景墙",
  },
  {
    id: "B",
    name: "Jersey (球衣) + 字标",
    file: "/logo-concepts/v2-B-jersey.jpg",
    desc: "球衣剪影 + V 领细节 + 全身点状印花。强化\"运动赛事类客户\"的核心业务。",
    pros: ["明确指向运动品类", "B2B 客户群最相关", "V 领细节提升专业感"],
    use: "运动赛事客户 / 球队合作 / 展会主视觉",
  },
  {
    id: "C",
    name: "Hoodie (卫衣) + 字标",
    file: "/logo-concepts/v2-C-hoodie.jpg",
    desc: "卫衣剪影 + 抽绳细节 + CMYK 渐变填充。最有\"街头潮流\"感，年轻化品牌。",
    pros: ["潮牌 / 班服 / 团队服适配", "年轻化、有记忆点", "抽绳细节加分"],
    use: "POD 平台 / 班服团队 / 街头品牌客户",
  },
  {
    id: "D",
    name: "Hanger (衣架) + 字标",
    file: "/logo-concepts/v2-D-hanger.jpg",
    desc: "金属衣架挂着 T 恤。\"挂着待售\" 的工厂感，暗示\"factory direct\"。",
    pros: ["工业/工厂感最强", "一眼看出是服装", "简洁、辨识度高"],
    use: "工厂导视 / 名片 / 报价单抬头",
  },
  {
    id: "E",
    name: "T-Shirt = S 字母",
    file: "/logo-concepts/v2-E-tshirt-S.jpg",
    desc: "T恤形状 = 字母 S。负空间艺术，单色极简，垂直堆叠布局。",
    pros: ["品牌名首字母 + 服装合一", "favicon 极简强力", "黑白完美、彩色也好"],
    use: "favicon / App icon / 极简场景",
  },
];

export default function LogoConceptsV2Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page title */}
          <div className="mb-16">
            <div className="text-xs tracking-[0.3em] text-[#ff4d00] mb-4">
              V2 · CLOTHING + WORDMARK
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              5 Logo Directions<br />
              <span className="text-[#ff4d00]">服装剪影</span> 方向
            </h1>
            <p className="text-[#a0a0a0] text-lg max-w-3xl mb-4">
              基于你的反馈"logo 一定要和服装相关"，重做了 5 个新方向。
              每个都包含一个明确的服装剪影（T恤/球衣/卫衣/衣架/字母 S 化的 T 恤），
              加上完整字标 <span className="text-white">"SublimApparel"</span> 和 Slogan。
            </p>
            <p className="text-sm text-[#6b6b6b]">
              V1 概念（无服装）已归档：<a href="/logo-concepts/" className="text-[#00c2ff] underline">/logo-concepts/</a>
            </p>
          </div>

          {/* Each concept in 2x layout: light bg + dark bg */}
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
              建议：<span className="text-[#ff4d00]">B (Jersey)</span> 作主 logo +{" "}
              <span className="text-[#ff4d00]">E (T-shirt = S)</span> 作 favicon
            </h3>
            <ul className="space-y-3 text-[#a0a0a0] text-base">
              <li>
                <strong className="text-white">B (Jersey 球衣) 作主 logo</strong>：
                球衣是外贸印花工厂订单量最大的品类（Jersey / 球队服 / 赛事服），
                一眼能识别"我们是做什么的"。
              </li>
              <li>
                <strong className="text-white">E (T-shirt = S) 作 favicon</strong>：
                浏览器 16×16 像素下，几何负空间 + 字母 S 最清晰，
                比任何彩色版 favicon 都强。
              </li>
              <li>
                <strong className="text-white">C (Hoodie) 作备用</strong>：
                如果未来想往潮牌/班服/团队服方向拓展，可以切到 C。
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
