"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const versions = [
  { id: "v1", label: "V1", path: "" },
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
      <div className="border-2 border-black bg-white p-1 shadow-[4px_4px_0_0_#000]">
        <div className="flex items-center gap-0.5">
          {versions.map((v) => {
            const isActive = current?.id === v.id;
            return (
              <Link
                key={v.id}
                href={getHref(v)}
                className={`rounded-sm px-3 py-1.5 text-xs font-black uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-black text-white"
                    : "text-black hover:bg-yellow-200"
                }`}
              >
                {v.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
