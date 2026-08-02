"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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

export function Switcher() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const getVersionPath = (targetPath: string, currentPath: string) => {
    const currentFile = currentPath.split("/").pop() || "";
    if (!currentFile || currentFile === "v7") return targetPath;
    if (currentFile === "products" || currentFile === "about" || currentFile === "contact") {
      return `${targetPath}/${currentFile}`;
    }
    return targetPath;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 border border-stone-900 bg-[#f5f1e8] p-3 shadow-lg">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-stone-500">
            Compare versions
          </p>
          <div className="grid grid-cols-4 gap-1.5">
            {VERSIONS.map((v) => {
              const isActive = pathname.startsWith(v.path) && v.path !== "/" || pathname === v.path;
              return (
                <Link
                  key={v.id}
                  href={getVersionPath(v.path, pathname)}
                  onClick={() => setOpen(false)}
                  className={`border px-2.5 py-1.5 text-center font-mono text-[11px] uppercase tracking-wider transition-colors ${
                    isActive
                      ? "border-stone-900 bg-stone-900 text-[#f5f1e8]"
                      : "border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900"
                  }`}
                >
                  {v.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="border border-stone-900 bg-[#f5f1e8] px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-stone-900 shadow-md transition-colors hover:bg-stone-900 hover:text-[#f5f1e8]"
      >
        {open ? "Close ×" : "Versions"}
      </button>
    </div>
  );
}
