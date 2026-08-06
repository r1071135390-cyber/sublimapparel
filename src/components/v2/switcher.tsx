"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const versions = [
  { id: "v1", label: "V1", color: "bg-stone-900", path: "" },
  { id: "v2", label: "V2", color: "bg-stone-900", path: "/v2" },
  { id: "v3", label: "V3", color: "bg-stone-900", path: "/v3" },
  { id: "v4", label: "V4", color: "bg-stone-900", path: "/v4" },
  { id: "v5", label: "V5", color: "bg-stone-900", path: "/v5" },
  { id: "v6", label: "V6", color: "bg-stone-900", path: "/v6" },
  { id: "v7", label: "V7", color: "bg-stone-900", path: "/v7" },
  { id: "v8", label: "V8", color: "bg-stone-900", path: "/v8" },
  { id: "v9", label: "V9", color: "bg-stone-900", path: "/v9" },
  { id: "v10", label: "V10", color: "bg-stone-900", path: "/v10" },
  { id: "v11", label: "V11", color: "bg-stone-900", path: "/v11" },
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
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex items-center gap-1 rounded-full border border-black/10 bg-white/90 p-1 shadow-2xl backdrop-blur-md">
        {versions.map((v) => {
          const isActive = current?.id === v.id;
          return (
            <Link
              key={v.id}
              href={getHref(v)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                isActive
                  ? "bg-stone-900 text-white"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {v.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
