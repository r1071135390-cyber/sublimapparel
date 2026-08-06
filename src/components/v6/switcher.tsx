"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const VERSIONS = [
  { label: "V1", href: "/", desc: "Dark" },
  { label: "V2", href: "/v2", desc: "Premium" },
  { label: "V4", href: "/v4", desc: "Tech" },
  { label: "V5", href: "/v5", desc: "E-com" },
  { label: "V6", href: "/v6", desc: "Sports" },
  { label: "V7", href: "/v7", desc: "Editorial" },
  { label: "V8", href: "/v8", desc: "Brutalist" },
  { label: "V9", href: "/v9", desc: "Zen" },
  { label: "V10", href: "/v10", desc: "Neon" },
  { label: "V12", href: "/v12", desc: "Catalog" },
];

export function V6Switcher() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col gap-1 border-2 border-[#00ff88] bg-black/95 p-2 shadow-2xl backdrop-blur-md">
        <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#00ff88]">
          Versions
        </div>
        {VERSIONS.map((v) => {
          const isActive =
            v.href === "/"
              ? pathname === "/"
              : pathname === v.href || pathname.startsWith(`${v.href}/`);

          const baseSegment = v.href === "/" ? "" : v.href;
          const targetPath = baseSegment + pathname.replace(/^\/v\d/, "").replace(/^\/$/, "") || v.href;

          return (
            <Link
              key={v.href}
              href={v.href === "/" ? "/" : targetPath}
              className={`flex items-center gap-3 px-3 py-2 text-xs transition-colors ${
                isActive
                  ? "bg-[#00ff88] text-black"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <span className="w-8 font-black">{v.label}</span>
              <span className={isActive ? "text-black/70" : "text-white/60"}>{v.desc}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
