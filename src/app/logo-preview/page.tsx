import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Logo Preview ",
  description: "Compare current A4.3 logo vs new full-body print version",
  robots: { index: false, follow: false },
};

export default function LogoPreviewPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <div className="text-xs tracking-[0.3em] text-[#ff4d00] mb-4">
              PREVIEW · 等待你确认
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              新 logo 预览
            </h1>
            <p className="text-[#a0a0a0] text-lg">
              A4.3 框架，印花只放大到全身+袖子，其他文字、衣服、角度都未改。
            </p>
            <p className="text-sm text-[#6b6b6b] mt-2">
              ⏸ 还没部署到网站。告诉我"用 1"或"用 2"，我才替换 logo-main.jpg。
            </p>
          </div>

          {/* 当前线上版本 (Header 里正在用的) */}
          <section className="mb-10">
            <div className="text-xs tracking-[0.2em] text-[#a0a0a0] mb-3">
              ↑ 现在网站 Header 用的 (A4.3 局部印花)
            </div>
            <div className="bg-white p-6">
              <img
                src="/logo-main.jpg"
                alt="Current logo"
                className="w-full max-w-2xl h-auto"
              />
            </div>
          </section>

          {/* 新版本 1 */}
          <section className="mb-10">
            <div className="text-xs tracking-[0.2em] text-[#ff4d00] mb-3">
              ↓ 新版 1
            </div>
            <div className="bg-white p-6">
              <img
                src="/logo-concepts/preview-new-logo.jpg"
                alt="New logo 1"
                className="w-full max-w-2xl h-auto"
              />
            </div>
          </section>

          {/* 新版本 2 */}
          <section className="mb-10">
            <div className="text-xs tracking-[0.2em] text-[#ff4d00] mb-3">
              ↓ 新版 2
            </div>
            <div className="bg-white p-6">
              <img
                src="/logo-concepts/preview-new-logo-alt.jpg"
                alt="New logo 2"
                className="w-full max-w-2xl h-auto"
              />
            </div>
          </section>

          {/* 决策区 */}
          <section className="mt-12 p-8 bg-[#1a1a1a] border border-[#2a2a2a]">
            <h3 className="text-xl font-bold mb-4">选哪个？</h3>
            <ul className="space-y-2 text-[#a0a0a0] text-sm">
              <li>→ 回复 <span className="text-white font-bold">"用 1"</span> 我立即替换并部署</li>
              <li>→ 回复 <span className="text-white font-bold">"用 2"</span> 我立即替换并部署</li>
              <li>→ 回复 <span className="text-white font-bold">"都不行"</span> 告诉我差在哪里</li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
