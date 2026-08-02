import Link from 'next/link';

export default function V2Switcher() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-white border border-stone-200 rounded-full shadow-lg p-1 flex items-center text-sm font-medium">
        <Link
          href="/"
          className="px-4 py-2 rounded-full text-stone-500 hover:text-stone-900 transition-colors"
        >
          V1
        </Link>
        <span className="px-4 py-2 rounded-full bg-[#0a0a0a] text-white">
          V2
        </span>
        <Link
          href="/v3"
          className="px-4 py-2 rounded-full text-stone-500 hover:text-stone-900 transition-colors"
        >
          V3
        </Link>
      </div>
    </div>
  );
}
