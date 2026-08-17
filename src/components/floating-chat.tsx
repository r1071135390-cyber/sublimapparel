"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Mail } from "lucide-react";

type Preset = {
  label: string;
  body: string;
};

const PRESETS: Preset[] = [
  {
    label: "Get a quote",
    body:
      "Hi SublimApparel,\n\nI'd like to get a quote for a custom sublimation order.\n\nProduct:\nQuantity:\nDeadline:\n\nThanks!",
  },
  {
    label: "Sample kit",
    body:
      "Hi SublimApparel,\n\nPlease send me a sample kit so I can evaluate fabric quality and color before bulk.\n\nShip to (country):\n\nThanks!",
  },
  {
    label: "Bulk order",
    body:
      "Hi SublimApparel,\n\nWe have a bulk order and would like to discuss pricing, lead time, and DDP shipping.\n\nStyle:\nQuantity:\nDestination country:\nDeadline:\n\nThanks!",
  },
  {
    label: "Other",
    body:
      "Hi SublimApparel,\n\n",
  },
];

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [preset, setPreset] = useState<string>(PRESETS[0].label);
  const [sent, setSent] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const to = "info@sublimapparel.com";
  const subject = "New message from sublimapparel.com";

  // Auto-resize textarea
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [message, open]);

  // Load preset body when preset changes
  useEffect(() => {
    const p = PRESETS.find((x) => x.label === preset);
    if (p) setMessage(p.body);
  }, [preset]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    const bodyLines = [
      message.trim(),
      "",
      "----",
      name ? `Name: ${name}` : null,
      email ? `Reply email: ${email}` : null,
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join("\n"));
    const subj = encodeURIComponent(subject);
    window.location.href = `mailto:${to}?subject=${subj}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {/* Expanded chat panel — Zendesk-style message box */}
      {open && (
        <div
          role="dialog"
          aria-label="Send us a message"
          className="flex w-[340px] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl"
          style={{ maxHeight: "calc(100vh - 7rem)" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-[#0a0a0a] px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#25D366]" />
              </span>
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ff4d00]">
                  Online &middot; 24h reply
                </div>
                <div className="text-sm font-black leading-tight">
                  Send us a message
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat panel"
              className="rounded-full p-1 transition-colors hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Body — chat thread + form */}
          <form
            onSubmit={onSubmit}
            className="flex flex-1 flex-col gap-3 overflow-y-auto bg-[#faf9f6] p-3"
          >
            {/* Intro bubble (left) */}
            <div className="flex items-end gap-2">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#ff4d00] text-[10px] font-black text-white">
                SA
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-xs leading-relaxed text-neutral-800 shadow-sm">
                Hi! Pick a topic below or write your own. We&apos;ll get back to
                you within 24 hours, usually much faster.
              </div>
            </div>

            {/* Preset chips */}
            <div className="flex flex-wrap gap-1.5 pl-9">
              {PRESETS.map((p) => (
                <button
                  type="button"
                  key={p.label}
                  onClick={() => setPreset(p.label)}
                  className={
                    "rounded-full border px-2.5 py-1 text-[11px] font-bold transition-colors " +
                    (preset === p.label
                      ? "border-[#ff4d00] bg-[#ff4d00] text-white"
                      : "border-neutral-300 bg-white text-neutral-700 hover:border-[#ff4d00] hover:text-[#ff4d00]")
                  }
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Name + Email row */}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-md border border-neutral-300 bg-white px-2.5 py-2 text-xs text-neutral-900 outline-none focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00]"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Reply email"
                className="w-full rounded-md border border-neutral-300 bg-white px-2.5 py-2 text-xs text-neutral-900 outline-none focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00]"
              />
            </div>

            {/* Message textarea */}
            <div className="flex items-end gap-2">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#ff4d00]/20 text-[10px] font-black text-[#ff4d00]">
                You
              </div>
              <textarea
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                rows={3}
                required
                className="w-full resize-none rounded-2xl rounded-bl-sm border border-neutral-300 bg-white px-3 py-2 text-xs leading-relaxed text-neutral-900 outline-none focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00]"
              />
            </div>

            {/* Send button + status */}
            <div className="flex items-center justify-between pl-9">
              <span className="text-[10px] text-neutral-500">
                {sent ? (
                  <span className="font-bold text-[#25D366]">
                    Opening your email client &hellip;
                  </span>
                ) : (
                  <>
                    <Mail className="mr-1 inline h-3 w-3" />
                    Sends to {to}
                  </>
                )}
              </span>
              <button
                type="submit"
                disabled={!message.trim()}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#ff4d00] px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white transition-colors hover:bg-[#e64500] disabled:opacity-50"
              >
                <Send className="h-3 w-3" />
                Send
              </button>
            </div>

            {/* Footer note */}
            <p className="pl-9 text-[10px] leading-relaxed text-neutral-400">
              By sending, your email client opens with your message pre-filled.
              We never share your info.
            </p>
          </form>
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
