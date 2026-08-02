import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function V1Switcher() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-[#0a0a0a] border border-white/20 rounded-full shadow-2xl p-1 flex items-center text-sm font-medium">
        <span className="px-4 py-2 rounded-full bg-white text-[#0a0a0a]">
          V1
        </span>
        <Link
          href="/v2"
          className="px-4 py-2 rounded-full text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <Sparkles size={12} />
          V2
        </Link>
        <Link
          href="/v3"
          className="px-4 py-2 rounded-full text-white/70 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <Sparkles size={12} />
          V3
        </Link>
      </div>
    </div>
  );
}
