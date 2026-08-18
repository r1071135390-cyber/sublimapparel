export function UtilityBar() {
  return (
    <div className="border-b border-black/10 bg-[#0a0a0a] text-[11px] text-white/80">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-1 px-6 py-2 md:flex-row md:items-center">
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <li className="flex items-center gap-1.5">
            <span className="text-[#cc3d00]">●</span>
            <span className="font-bold uppercase tracking-wider text-white">
              Global DDP shipping
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-[#0078a8]">●</span>
            <span className="font-bold uppercase tracking-wider text-white">
              US stock in Fontana, CA
            </span>
          </li>
          <li className="flex items-center gap-1.5">
            <span className="text-[#cc3d00]">●</span>
            <span className="font-bold uppercase tracking-wider text-white">
              MOQ from 50 pcs
            </span>
          </li>
        </ul>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <li>
            <a
              href="https://wa.me/8619817930190"
              className="hover:text-[#cc3d00]"
            >
              <span className="font-bold uppercase tracking-wider text-white/60">
                WhatsApp
              </span>
            </a>
          </li>
          <li>
            <a
              href="mailto:info@sublimapparel.com"
              className="font-bold uppercase tracking-wider text-white/60 hover:text-white"
            >
              info@sublimapparel.com
            </a>
          </li>
          <li>
            <span className="font-bold uppercase tracking-wider text-white">
              Replies within 1 business day
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
