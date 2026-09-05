"use client";

import { useEffect, useRef, useState } from "react";

type TopicKey = "quote" | "sample" | "bulk" | "other";

interface TopicChip {
  key: TopicKey;
  label: string;
  draft: string;
}

const TOPICS: TopicChip[] = [
  {
    key: "quote",
    label: "Get a quote",
    draft:
      "Hi SublimApparel, I'd like a quote for: {apparel type, quantity, destination country, delivery date}. Design is ready / not yet ready.",
  },
  {
    key: "sample",
    label: "Sample kit",
    draft:
      "Hi SublimApparel, please send me a fabric / print sample kit to: {full shipping address}. I want to evaluate the print quality and hand-feel before placing a bulk order.",
  },
  {
    key: "bulk",
    label: "Bulk order",
    draft:
      "Hi SublimApparel, I have a bulk order inquiry: {apparel type, total quantity, design status, ship-to country, target delivery date}. Please share pricing and lead time.",
  },
  {
    key: "other",
    label: "Other",
    draft: "",
  },
];

type SubmitState = "idle" | "submitting" | "success" | "error";

// Update this to the real WhatsApp number (international format, no + or spaces)
const WHATSAPP_NUMBER = "8619817930190";
const WHATSAPP_PREFILL =
  "Hi SublimApparel, I'd like to chat about a custom sublimation order.";

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<TopicKey>("quote");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(TOPICS[0].draft);
  const [state, setState] = useState<SubmitState>("idle");
  const [errorText, setErrorText] = useState("");
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click + Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        const target = e.target as HTMLElement;
        if (!target.closest("[data-floating-chat-trigger]")) {
          setOpen(false);
        }
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onTopicClick = (chip: TopicChip) => {
    setTopic(chip.key);
    setMessage(chip.draft);
  };

  const reset = () => {
    setName("");
    setEmail("");
    setMessage(TOPICS[0].draft);
    setTopic("quote");
    setState("idle");
    setErrorText("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "submitting") return;
    setState("submitting");
    setErrorText("");
    try {
      const res = await fetch("/api/chat-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          topic,
          message,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const data = (await res.json()) as { ok: boolean; reply?: string; error?: string };
      if (!res.ok || !data.ok) {
        setState("error");
        setErrorText(data?.error ?? "Failed to send. Please try again.");
        return;
      }
      setState("success");
    } catch (err) {
      setState("error");
      setErrorText("Network error. Please check your connection and retry.");
    }
  };

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_PREFILL
  )}`;

  return (
    <>
      {/* Sticky right-side sidebar — MyStickyElements style */}
      <div
        className="fixed right-0 top-1/2 z-40 -translate-y-1/2 select-none"
        aria-label="Quick contact"
      >
        <div className="flex flex-col gap-1.5 pr-0">
          {/* TOP: Message (opens chat panel) */}
          <button
            type="button"
            data-floating-chat-trigger
            onClick={() => {
              reset();
              setOpen((o) => !o);
            }}
            aria-label={open ? "Close message" : "Send us a message"}
            className="group relative flex h-14 w-14 items-center justify-center rounded-l-xl bg-[#ff4d00] text-black shadow-lg ring-1 ring-black/10 transition-all duration-200 hover:w-20 hover:shadow-2xl md:h-16 md:w-16 md:hover:w-24"
          >
            <svg
              className="h-6 w-6 md:h-7 md:w-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span className="pointer-events-none ml-2 hidden whitespace-nowrap text-xs font-black uppercase tracking-wider opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:inline md:text-sm">
              {open ? "Close" : "Message"}
            </span>
          </button>

          {/* MIDDLE: WhatsApp (top tab label rotated) */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="group relative flex h-14 w-14 items-center justify-center rounded-l-xl bg-[#25D366] text-white shadow-lg ring-1 ring-black/10 transition-all duration-200 hover:w-20 hover:shadow-2xl md:h-16 md:w-16 md:hover:w-24"
          >
            <svg
              className="h-6 w-6 md:h-7 md:w-7"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            <span className="pointer-events-none ml-2 hidden whitespace-nowrap text-xs font-black uppercase tracking-wider opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:inline md:text-sm">
              WhatsApp
            </span>
          </a>
        </div>
      </div>

      {/* Chat panel (slides in from right) */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Send us a message"
          className="fixed bottom-4 right-20 z-50 w-[calc(100vw-2rem)] max-w-[360px] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl ring-1 ring-black/5 md:bottom-auto md:right-24 md:top-1/2 md:-translate-y-1/2"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 bg-[#0a0a0a] px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ff4d00] text-sm font-black">
                  SA
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0a0a0a] bg-emerald-400" />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-bold">SublimApparel</div>
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-emerald-400">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Online · 24h reply
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="rounded p-1 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[70vh] overflow-y-auto p-4">
            {state === "success" ? (
              <div className="py-6 text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="text-base font-bold text-black">Message sent</div>
                <div className="mt-1 text-sm text-black/60">
                  We&apos;ll reply to <span className="font-semibold text-black">{email}</span> within 24 hours.
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#0a0a0a] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-[#ff4d00]"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-3">
                {/* Bot bubble intro */}
                <div className="flex items-start gap-2">
                  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#0a0a0a] text-[10px] font-black text-white">
                    SA
                  </div>
                  <div className="rounded-2xl rounded-tl-sm bg-black/5 px-3 py-2 text-xs leading-relaxed text-black/80">
                    Hi! Pick a topic and tell us what you need — we&apos;ll reply within 24h.
                  </div>
                </div>

                {/* Topic chips */}
                <div className="flex flex-wrap gap-1.5">
                  {TOPICS.map((chip) => (
                    <button
                      key={chip.key}
                      type="button"
                      onClick={() => onTopicClick(chip)}
                      className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
                        topic === chip.key
                          ? "bg-[#ff4d00] text-black"
                          : "bg-black/5 text-black/70 hover:bg-black/10"
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                {/* Name */}
                <div>
                  <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-black/60">
                    Your name
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-[#ff4d00] focus:ring-2 focus:ring-[#ff4d00]/20"
                  />
                </div>

                {/* Reply email */}
                <div>
                  <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-black/60">
                    Reply email
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={200}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@brand.com"
                    className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-black outline-none transition focus:border-[#ff4d00] focus:ring-2 focus:ring-[#ff4d00]/20"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1 block text-[10px] font-black uppercase tracking-widest text-black/60">
                    Message
                  </label>
                  <textarea
                    required
                    minLength={4}
                    maxLength={4000}
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your project..."
                    className="w-full resize-none rounded-lg border border-black/10 bg-white px-3 py-2 text-sm leading-relaxed text-black outline-none transition focus:border-[#ff4d00] focus:ring-2 focus:ring-[#ff4d00]/20"
                  />
                  <div className="mt-1 text-right text-[10px] text-black/40">
                    {message.length}/4000
                  </div>
                </div>

                {state === "error" && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                    {errorText || "Failed to send. Please retry."}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff4d00] px-4 py-2.5 text-sm font-black uppercase tracking-wider text-black transition hover:bg-[#e64400] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {state === "submitting" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>

                <p className="text-center text-[10px] text-black/40">
                  Stored securely · Replies within 24h
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default FloatingChat;
