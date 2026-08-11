import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Logo Concepts V4 — A4 Enhanced ",
  description: "A4 enhanced logo variants for SublimApparel",
  robots: { index: false, follow: false },
};

const CONCEPTS = [
  {
    id: "A4.1",
    name: "A4 + 升级字标",
    file: "/logo-concepts/v4-A4-refined-type.jpg",
    added: "更粗更精致的字标 + 商标 ® 符号 + 细横线",
    desc: "保留 A4 全身印花的视觉，但字标更粗更有品牌感，加上 ® 商标符号和一条细横线，质感更专业。",
    pros: ["字标更有品牌权威感", "® 符号暗示正规工厂", "细横线提升精致度"],
    use: "主 logo 升级版 / 名片 / 商务",
  },
  {
    id: "A4.2",
    name: "A4 + 圆形品牌印章",
    file: "/logo-concepts/v4-A4-badge.jpg",
    added: "右下角加一个 EST 2014 / MOQ 50 圆形印章",
    desc: "在字标右下角加一个橙红圆形印章，写 EST 2014 / MOQ 50 PCS。给品牌增加历史感和可信度。",
    pros: ['暗示工厂有 10+ 年历史', "MOQ 50 直接告诉客户起订量", '印章感最"老牌工厂"'],
    use: "工厂导视 / 报价单 / 包装",
  },
  {
    id: "A4.3",
    name: "A4 + 车缝线工艺细节",
    file: "/logo-concepts/v4-A4-stitching.jpg",
    added: "领口、袖口、下摆加白色车缝线",
    desc: "T 恤上增加可见的车缝线（领口、袖口、下摆），暗示真实成衣工艺，让 logo 看起来像真衣服。",
    pros: ['最"成衣感"', "暗示自家有车缝车间", "工艺细节提升可信度"],
    use: "产品页 / 工厂能力展示",
  },
  {
    id: "A4.4",
    name: "A4 + 高对比黑底",
    file: "/logo-concepts/v4-A4-high-contrast.jpg",
    added: "黑 T 恤 + 加肩膀热浪线条 + 白色字标",
    desc: "T 恤改为深黑底，印花颜色更鲜艳发光；肩膀加两条热浪线；字标用白色——整体更有戏剧张力。",
    pros: ['最"夜店/潮流"感', "黑底对比度最高", '热浪线强化"升华"工艺'],
    use: "夜间营销 / 潮流品牌客户",
  },
];

export default function LogoConceptsV4Page() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Page title */}
          <div className="mb-16">
            <div className="text-xs tracking-[0.3em] text-[#ff4d00] mb-4">
              V4 · A4 ENHANCED
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              A4 方向 · 4 个<br />
              <span className="text-[#ff4d00]">加强</span> 变体
            </h1>
            <p className="text-[#a0a0a0] text-lg max-w-3xl mb-4">
              保留 A4 的"全身墨水爆炸"核心视觉，但每个变体加一个不同的"东西"，
              让 logo 更完整、更有品牌感。
            </p>
            <p className="text-sm text-[#6b6b6b]">
              历史版本：
              <a href="/logo-concepts/" className="text-[#00c2ff] underline">V1</a>
              {" · "}
              <a href="/logo-concepts-v2/" className="text-[#00c2ff] underline">V2</a>
              {" · "}
              <a href="/logo-concepts-v3/" className="text-[#00c2ff] underline">V3 (A4 原版)</a>
            </p>
          </div>

          {/* Side-by-side: A4 original + 4 enhanced */}
          <section className="mb-20 p-6 bg-[#1a1a1a] border border-[#2a2a2a]">
            <div className="text-xs tracking-[0.2em] text-[#a0a0a0] mb-3">
              FOR REFERENCE — A4 ORIGINAL
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 flex items-center justify-center min-h-[200px]">
                <img
                  src="/logo-concepts/v3-A4-tshirt-explosion.jpg"
                  alt="A4 original"
                  className="max-w-full max-h-[180px] object-contain"
                />
              </div>
              <div className="bg-[#0a0a0a] p-6 flex items-center justify-center min-h-[200px] border border-[#2a2a2a]">
                <img
                  src="/logo-concepts/v3-A4-tshirt-explosion.jpg"
                  alt="A4 original dark"
                  className="max-w-full max-h-[180px] object-contain"
                />
              </div>
            </div>
          </section>

          {/* Each enhanced concept */}
          {CONCEPTS.map((c) => (
            <section key={c.id} className="mb-20">
              <div className="flex items-baseline gap-6 mb-6">
                <div className="text-6xl md:text-7xl font-bold text-[#ff4d00] leading-none">
                  {c.id}
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-2">{c.name}</h2>
                  <div className="text-[#00c2ff] text-sm mb-2">+ {c.added}</div>
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
              4 个加强 · 看你最在意哪个"东西"
            </h3>
            <ul className="space-y-3 text-[#a0a0a0] text-base">
              <li>
                <strong className="text-white">A4.1 升级字标</strong>：如果你觉得"字标太普通 / 不够专业"——选这个
              </li>
              <li>
                <strong className="text-white">A4.2 圆形印章</strong>：如果你觉得"需要历史感 / 信任感"——选这个
              </li>
              <li>
                <strong className="text-white">A4.3 车缝线</strong>：如果你觉得"还不够像真衣服"——选这个
              </li>
              <li>
                <strong className="text-white">A4.4 高对比黑底</strong>：如果你觉得"颜色不够炸"——选这个
              </li>
            </ul>
            <p className="mt-6 text-sm text-[#6b6b6b]">
              也可以告诉我"想要 X + Y 的组合"——比如"A4.1 的字标 + A4.3 的车缝线"，
              我可以再融合出一版。
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
