"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const VERSIONS = [
  { id: "v1", label: "V1", path: "/" },
  { id: "v2", label: "V2", path: "/v2" },
  { id: "v3", label: "V3", path: "/v3" },
  { id: "v4", label: "V4", path: "/v4" },
  { id: "v5", label: "V5", path: "/v5" },
  { id: "v6", label: "V6", path: "/v6" },
  { id: "v7", label: "V7", path: "/v7" },
  { id: "v8", label: "V8", path: "/v8" },
  { id: "v9", label: "V9", path: "/v9" },
  { id: "v10", label: "V10", path: "/v10" },
  { id: "v11", label: "V11", path: "/v11" },
];

export function V9Switcher() {
  const pathname = usePathname();
  const getTargetPath = (targetPath: string) => {
    if (pathname.startsWith("/v9/products") && targetPath === "/v9") return "/v9";
    if (pathname.startsWith("/v9/about") && targetPath === "/v9") return "/v9";
    if (pathname.startsWith("/v9/contact") && targetPath === "/v9") return "/v9";
    if (pathname.startsWith("/v9/") && targetPath !== "/v9") {
      return `${targetPath}${pathname.replace("/v9", "")}`;
    }
    return targetPath;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white/90 backdrop-blur border border-stone-200 rounded-full px-3 py-2 flex items-center gap-1 shadow-sm">
      <span className="text-stone-400 text-[10px] tracking-widest px-1">DESIGN</span>
      {VERSIONS.map((v) => {
        const isActive = pathname.startsWith(v.path === "/" ? "/" : v.path);
        return (
          <Link
            key={v.id}
            href={getTargetPath(v.path)}
            className={`text-[10px] font-light px-2 py-1 rounded-full transition ${
              isActive
                ? "bg-stone-900 text-white"
                : "text-stone-500 hover:text-stone-900"
            }`}
          >
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}
