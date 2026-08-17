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

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<TopicKey>("quote");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(TOPICS[0].draft);
  const [state, setState] = useState<SubmitState>("idle");
  const [errorText, setErrorText] = useState("");
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest("[data-chat-trigger]")
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleTopic = (key: TopicKey) => {
    setTopic(key);
    const t = TOPICS.find((x) => x.key === key);
    if (t && t.draft) setMessage(t.draft);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setErrorText(data?.error || `HTTP ${res.status}`);
        setState("error");
        return;
      }
      setState("success");
    } catch (err) {
      setErrorText(err instanceof Error ? err.message : "Network error");
      setState("error");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setTopic("quote");
    setMessage(TOPICS[0].draft);
    setState("idle");
    setErrorText("");
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        type="button"
        data-chat-trigger
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#ff4d00] text-white shadow-[0_8px_30px_rgba(255,77,0,0.45)] transition hover:scale-105 hover:bg-[#ff5a14] active:scale-95 md:bottom-7 md:right-7"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4-.8L3 21l1.8-5A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
        {/* Unread pulse dot when closed */}
        {!open && (
          <span className="absolute right-1 top-1 h-3 w-3 rounded-full border-2 border-white bg-[#00c2ff]" />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-24 right-3 z-50 w-[calc(100vw-24px)] max-w-[360px] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:right-7"
          role="dialog"
          aria-label="Chat with SublimApparel"
        >
          {/* Header */}
          <div className="bg-[#0a0a0a] px-5 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00c2ff] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#00c2ff]" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/90">
                  Online · 24h reply
                </span>
              </div>
              <span className="text-[10px] text-white/50">EN / 中文</span>
            </div>
            <h3 className="mt-2 text-lg font-black leading-tight">
              Send us a message
            </h3>
            <p className="mt-1 text-xs text-white/70">
              Real person, no chatbot. We reply within 24h, Mon–Sat.
            </p>
          </div>

          {/* Body */}
          <div className="max-h-[70vh] overflow-y-auto bg-white">
            {/* Bot bubble */}
            <div className="px-5 pt-4">
              <div className="flex items-start gap-2">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#ff4d00] text-[11px] font-black text-white">
                  SA
                </div>
                <div className="rounded-2xl rounded-tl-sm bg-neutral-100 px-3 py-2 text-sm text-neutral-800">
                  Hi! What can we help you with today?
                </div>
              </div>
            </div>

            {state === "success" ? (
              <SuccessView onReset={resetForm} />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 px-5 py-4">
                {/* Topic chips */}
                <div className="flex flex-wrap gap-1.5">
                  {TOPICS.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      onClick={() => handleTopic(t.key)}
                      className={
                        "rounded-full border px-3 py-1 text-xs font-semibold transition " +
                        (topic === t.key
                          ? "border-[#ff4d00] bg-[#ff4d00] text-white"
                          : "border-neutral-300 bg-white text-neutral-700 hover:border-neutral-500")
                      }
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Your name
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Johnson"
                    className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#ff4d00] focus:ring-2 focus:ring-[#ff4d00]/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-neutral-500">
                    Reply email
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={200}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@brand.com"
                    className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[#ff4d00] focus:ring-2 focus:ring-[#ff4d00]/20"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-neutral-500">
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
                    className="w-full resize-none rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm leading-relaxed outline-none transition focus:border-[#ff4d00] focus:ring-2 focus:ring-[#ff4d00]/20"
                  />
                  <div className="mt-1 text-right text-[10px] text-neutral-400">
                    {message.length}/4000
                  </div>
                </div>

                {state === "error" && (
                  <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                    <strong>Send failed:</strong> {errorText}
                    <button
                      type="button"
                      onClick={() => setState("idle")}
                      className="ml-2 underline"
                    >
                      Try again
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state === "submitting"}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-[#ff4d00] px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#ff5a14] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {state === "submitting" ? (
                    <>
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                        <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>

                <p className="pt-1 text-center text-[10px] text-neutral-400">
                  Delivered to info@sublimapparel.com
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function SuccessView({ onReset }: { onReset: () => void }) {
  return (
    <div className="px-5 py-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h4 className="text-base font-black text-neutral-900">Message sent</h4>
      <p className="mt-1 text-sm text-neutral-600">
        We&apos;ve received your message and will reply within 24 hours.
      </p>
      <p className="mt-3 text-[11px] text-neutral-400">
        A copy is stored in our inbox. Check your email (including spam) for our reply.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-md border border-neutral-300 px-4 py-1.5 text-xs font-semibold text-neutral-700 transition hover:border-neutral-500"
      >
        Send another message
      </button>
    </div>
  );
}
