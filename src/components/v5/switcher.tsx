"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const VERSIONS = [
  { label: "V1", href: "/", desc: "Dark Industrial" },
  { label: "V2", href: "/v2", desc: "Light Premium" },
  { label: "V3", href: "/v3", desc: "Bold Creative" },
  { label: "V4", href: "/v4", desc: "Tech Glass" },
  { label: "V5", href: "/v5", desc: "E-commerce" },
  { label: "V6", href: "/v6", desc: "Sports Perf." },
  { label: "V7", href: "/v7", desc: "Editorial" },
  { label: "V8", href: "/v8", desc: "Brutalist" },
  { label: "V9", href: "/v9", desc: "Zen" },
  { label: "V10", href: "/v10", desc: "Neon" },
  { label: "V11", href: "/v11", desc: "Catalog" },
];

export function V5Switcher() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col gap-1 rounded-2xl border border-neutral-200 bg-white/95 p-2 shadow-2xl backdrop-blur-md">
        <div className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          Compare Versions
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
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs transition-colors ${
                isActive
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              <span className="w-8 font-bold">{v.label}</span>
              <span className={isActive ? "text-neutral-300" : "text-neutral-500"}>{v.desc}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
