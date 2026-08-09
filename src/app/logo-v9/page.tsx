"use client";

import Image from "next/image";

export default function LogoV9Page() {
  const variants = [
    { id: 1, file: "v9-equal-1.jpg", desc: "Sublim 在上, Apparel 在下, 字号=衣服高度" },
    { id: 2, file: "v9-equal-2.jpg", desc: "稍微紧凑版, 文字和衣服等高" },
    { id: 3, file: "v9-equal-3.jpg", desc: "宽松版, 文字填满右侧" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-orange-500 font-mono text-sm mb-2">V9 · 衣服 = 文字高度</p>
          <h1 className="text-4xl font-bold mb-2">A4.3 等高版</h1>
          <p className="text-white/60 text-sm">
            文字 cap height 严格 = T 恤高度
          </p>
        </div>

        <div className="space-y-8">
          {variants.map((v) => (
            <div
              key={v.id}
              className="bg-white rounded-lg overflow-hidden shadow-2xl"
            >
              <div className="p-4 bg-neutral-100 text-neutral-900 text-sm font-mono">
                V9.{v.id} — {v.desc}
              </div>
              <div className="relative w-full bg-white" style={{ aspectRatio: "2/1" }}>
                <Image
                  src={`/logo-concepts/${v.file}`}
                  alt={`V9 variant ${v.id}`}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/30 rounded text-sm text-orange-300">
          看完告诉我用 1/2/3，我立即替换线上 logo
        </div>
      </div>
    </div>
  );
}
