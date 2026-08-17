"use client";

import { useState } from "react";
import Link from "next/link";
import { MessageCircle, X, Mail, Phone } from "lucide-react";

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const whatsappNumber = "8619817930190";
  const email = "info@sublimapparel.com";

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Expanded panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Contact options"
          className="w-[300px] overflow-hidden rounded-lg border border-[#1A1A1A] bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#0a0a0a] px-4 py-3 text-white">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ff4d00]">
                Live &middot; 24h reply
              </div>
              <div className="text-sm font-black">How can we help?</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat panel"
              className="rounded-full p-1 transition-colors hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body — 3 contact options */}
          <div className="divide-y divide-neutral-100">
            {/* WhatsApp — primary */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi%20SublimApparel!%20I%27d%20like%20to%20talk%20about%20a%20custom%20apparel%20order.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-[#25D366]/5"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <div className="flex-1 leading-tight">
                <div className="text-sm font-black text-[#0a0a0a]">WhatsApp</div>
                <div className="text-xs text-neutral-600">
                  +86 198 1793 0190 &middot; usually replies in 30 min
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}?subject=Inquiry%20from%20sublimapparel.com`}
              className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-[#ff4d00]/5"
            >
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#ff4d00] text-white">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex-1 leading-tight">
                <div className="text-sm font-black text-[#0a0a0a]">Email us</div>
                <div className="text-xs text-neutral-600">
                  {email} &middot; replies within 24h
                </div>
              </div>
            </a>

            {/* WeChat */}
            <div className="px-4 py-3.5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#07C160] text-white">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="flex-1 leading-tight">
                  <div className="text-sm font-black text-[#0a0a0a]">WeChat</div>
                  <div className="text-xs text-neutral-600">
                    ID: sublimapparel &middot; scan to chat
                  </div>
                </div>
              </div>
              {/* WeChat QR placeholder — user to add actual QR */}
              <div className="mt-3 flex items-center justify-center rounded border-2 border-dashed border-neutral-200 bg-neutral-50 p-3">
                <div className="text-center">
                  <div className="text-2xl">📱</div>
                  <div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                    WeChat QR &middot; pending
                  </div>
                </div>
              </div>
              <p className="mt-2 text-[10px] text-neutral-400">
                Note: most overseas clients use WhatsApp. WeChat is best for China &amp; SEA.
              </p>
            </div>

            {/* Request a quote link */}
            <Link
              href="/get-a-quote/"
              onClick={() => setOpen(false)}
              className="block bg-[#0a0a0a] px-4 py-3 text-center text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-[#ff4d00]"
            >
              Or open a full request form &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Main floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className={
          "group relative flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all md:h-16 md:w-16 " +
          (open
            ? "bg-[#0a0a0a] text-white"
            : "bg-[#ff4d00] text-white hover:scale-105 hover:bg-[#e64500]")
        }
      >
        {open ? (
          <X className="h-6 w-6 md:h-7 md:w-7" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
            {/* Red notification dot */}
            <span className="absolute right-1 top-1 flex h-3 w-3 md:h-3.5 md:w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff4d00] opacity-75" />
              <span className="relative inline-flex h-3 w-3 md:h-3.5 md:w-3.5 rounded-full border-2 border-white bg-[#ff4d00]" />
            </span>
          </>
        )}
      </button>
    </div>
  );
}
