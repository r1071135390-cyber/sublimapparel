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
];

export function V10Switcher() {
  const pathname = usePathname();
  const getTargetPath = (targetPath: string) => {
    if (pathname.startsWith("/v10/") && targetPath !== "/v10") {
      return `${targetPath}${pathname.replace("/v10", "")}`;
    }
    return targetPath;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-black/90 backdrop-blur border border-cyan-500/40 rounded-none px-3 py-2 flex items-center gap-1 shadow-[0_0_20px_rgba(0,255,255,0.3)]">
      <span className="text-cyan-400 font-mono text-[10px] tracking-widest px-1">/VERSIONS</span>
      {VERSIONS.map((v) => {
        const isActive = pathname.startsWith(v.path === "/" ? "/" : v.path);
        return (
          <Link
            key={v.id}
            href={getTargetPath(v.path)}
            className={`font-mono text-[10px] px-2 py-1 transition ${
              isActive
                ? "bg-cyan-400 text-black"
                : "text-cyan-300 hover:text-cyan-400"
            }`}
          >
            {v.label}
          </Link>
        );
      })}
    </div>
  );
}
