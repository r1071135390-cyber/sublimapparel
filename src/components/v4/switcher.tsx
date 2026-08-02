"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const versions = [
  { id: "v1", label: "V1", color: "bg-orange-500", path: "" },
  { id: "v2", label: "V2", color: "bg-stone-900", path: "/v2" },
  { id: "v3", label: "V3", color: "bg-yellow-400", path: "/v3" },
  { id: "v4", label: "V4", color: "bg-cyan-400", path: "/v4" },
  { id: "v5", label: "V5", color: "bg-emerald-500", path: "/v5" },
  { id: "v6", label: "V6", color: "bg-lime-400", path: "/v6" },
  { id: "v7", label: "V7", color: "bg-stone-700", path: "/v7" },
  { id: "v8", label: "V8", color: "bg-yellow-300", path: "/v8" },
  { id: "v9", label: "V9", color: "bg-stone-400", path: "/v9" },
  { id: "v10", label: "V10", color: "bg-fuchsia-500", path: "/v10" },
];

export function Switcher() {
  const pathname = usePathname() || "/";
  const current = versions.find((v) => {
    if (v.id === "v1") return pathname === "/" || (!pathname.startsWith("/v"));
    return pathname.startsWith(v.path);
  });

  const getHref = (version: typeof versions[number]) => {
    if (version.id === "v1") return "/";
    return `${version.path}${pathname.replace(/^\/v\d/, "") || ""}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1 rounded-full border border-white/10 bg-[#0a0e1a]/90 p-1 shadow-2xl backdrop-blur-xl">
      {versions.map((v) => {
        const isActive = current?.id === v.id;
        return (
          <Link
            key={v.id}
            href={getHref(v)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
              isActive
                ? `${v.color} text-black`
                : "text-white/60 hover:text-white"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${v.color}`} />
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}
