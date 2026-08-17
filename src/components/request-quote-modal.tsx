"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, FileText, Send, Loader2 } from "lucide-react";

// Source context the user is on when they click "Request a quote"
export type QuoteSource = {
  // Friendly label shown in the modal title
  label: string;
  // The page path used for analytics / hidden form field
  path: string;
  // Optional prefill values (e.g., for product detail pages)
  prefill?: {
    productName?: string;
    productCategory?: string;
    productNumber?: string;
  };
};

type QuoteState = {
  open: boolean;
  source: QuoteSource;
};

type QuoteContextValue = {
  state: QuoteState;
  openQuote: (source?: Partial<QuoteSource>) => void;
  closeQuote: () => void;
};

const defaultSource: QuoteSource = {
  label: "this page",
  path: "/",
};

const QuoteContext = React.createContext<QuoteContextValue | null>(null);

export function useRequestQuote() {
  const ctx = React.useContext(QuoteContext);
  if (!ctx) {
    throw new Error("useRequestQuote must be used within <RequestQuoteProvider>");
  }
  return ctx;
}

export function RequestQuoteProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [state, setState] = React.useState<QuoteState>({
    open: false,
    source: { ...defaultSource, path: pathname || "/" },
  });

  // Keep the source.path in sync with the current route
  React.useEffect(() => {
    setState((prev) => ({ ...prev, source: { ...prev.source, path: pathname || "/" } }));
  }, [pathname]);

  const openQuote = React.useCallback(
    (source?: Partial<QuoteSource>) => {
      setState((prev) => ({
        open: true,
        source: {
          label: source?.label || prev.source.label,
          path: source?.path || pathname || "/",
          prefill: source?.prefill || prev.source.prefill,
        },
      }));
    },
    [pathname]
  );

  const closeQuote = React.useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <QuoteContext.Provider value={{ state, openQuote, closeQuote }}>
      {children}
      <RequestQuoteModal />
    </QuoteContext.Provider>
  );
}

function RequestQuoteModal() {
  const { state, closeQuote } = useRequestQuote();
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    garment: "",
    quantity: "",
    deadline: "",
    message: "",
  });

  // Prefill the form when the source has prefill data (e.g., from a product page)
  React.useEffect(() => {
    if (state.open && state.source.prefill?.productName) {
      setForm((prev) => ({
        ...prev,
        garment: prev.garment || state.source.prefill!.productName || "",
      }));
    }
  }, [state.open, state.source]);

  // Reset form when modal closes
  React.useEffect(() => {
    if (!state.open) {
      setSubmitted(false);
    }
  }, [state.open]);

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Build a structured email body that includes the source page
    const sourceLine = `Source page: ${state.source.path}`;
    const prefillLine = state.source.prefill?.productName
      ? `Product viewed: ${state.source.prefill.productName}${state.source.prefill.productNumber ? ` (No. ${state.source.prefill.productNumber})` : ""}`
      : "";

    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Phone: ${form.phone}`,
      ``,
      `Garment / product: ${form.garment || state.source.prefill?.productName || "—"}`,
      `Estimated quantity: ${form.quantity || "—"}`,
      `Delivery deadline: ${form.deadline || "—"}`,
      ``,
      `Message: ${form.message || "—"}`,
      ``,
      `---`,
      sourceLine,
      prefillLine,
    ]
      .filter(Boolean)
      .join("\n");

    // Open the user's mail client with the quote details
    const subject = `Quote request from ${state.source.label} — ${form.company || form.name || "Anonymous"}`;
    const mailto = `mailto:info@sublimapparel.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Give the user a moment to see the loading state
    await new Promise((r) => setTimeout(r, 400));

    window.location.href = mailto;
    setSubmitting(false);
    setSubmitted(true);
  };

  return (
    <Dialog open={state.open} onOpenChange={(open) => !open && closeQuote()}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto bg-white p-0 text-[#0a0a0a]">
        <DialogHeader className="border-b-2 border-[#0a0a0a] bg-[#0a0a0a] p-6 text-white">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-[#ff4d00]">
                [ Get a Quote · 24h reply ]
              </div>
              <DialogTitle className="mt-2 text-2xl font-black leading-tight md:text-3xl">
                Request a quote
              </DialogTitle>
              <DialogDescription className="mt-2 text-sm text-white/70">
                You are requesting a quote for:{" "}
                <span className="font-bold text-[#00C2FF]">{state.source.label}</span>
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ff4d00] text-white">
              <Send className="h-8 w-8" />
            </div>
            <h3 className="mb-2 text-2xl font-black">Your email client opened.</h3>
            <p className="mb-6 text-sm text-[#3a3a3a]">
              Please click &quot;Send&quot; in your email app to send the request to{" "}
              <span className="font-bold text-[#0a0a0a]">info@sublimapparel.com</span>.
              We will reply within 1 business day.
            </p>
            <Button
              onClick={closeQuote}
              className="bg-[#0a0a0a] px-6 py-3 text-white hover:bg-[#ff4d00]"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-6">
            <input type="hidden" name="source" value={state.source.path} />
            <input
              type="hidden"
              name="sourceLabel"
              value={state.source.label}
            />
            {state.source.prefill?.productName && (
              <input
                type="hidden"
                name="productName"
                value={state.source.prefill.productName}
              />
            )}
            {state.source.prefill?.productNumber && (
              <input
                type="hidden"
                name="productNumber"
                value={state.source.prefill.productNumber}
              />
            )}

            {/* Quote context banner — appears on every modal; product name is added on product detail pages */}
            <div className="mb-5 flex items-start gap-3 border-2 border-[#ff4d00] bg-[#fff5f0] p-3">
              <FileText className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#ff4d00]" />
              <div className="text-xs">
                <div className="font-black uppercase tracking-widest text-[#ff4d00]">
                  Quote context
                </div>
                <div className="mt-1 font-bold text-[#0a0a0a]">
                  {state.source.label}
                </div>
                <div className="mt-0.5 text-[10px] text-[#6B6B6B]">
                  Source: <code className="bg-white px-1">{state.source.path}</code>
                  {state.source.prefill?.productName && (
                    <> · Quoting for{" "}
                      <span className="font-bold text-[#0a0a0a]">{state.source.prefill.productName}</span>
                      {state.source.prefill.productNumber && (
                        <span className="text-[#6B6B6B]"> (No. {state.source.prefill.productNumber})</span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Your name *" required>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={update("name")}
                  className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-sm focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
              <Field label="Email *" required>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-sm focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
              <Field label="Company">
                <input
                  type="text"
                  value={form.company}
                  onChange={update("company")}
                  className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-sm focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
              <Field label="Phone / WhatsApp">
                <input
                  type="tel"
                  value={form.phone}
                  onChange={update("phone")}
                  className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-sm focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field
                label={`Garment / product ${state.source.prefill?.productName ? "(pre-filled)" : ""} *`}
                required={!state.source.prefill?.productName}
              >
                <input
                  type="text"
                  required={!state.source.prefill?.productName}
                  value={form.garment}
                  onChange={update("garment")}
                  placeholder={
                    state.source.prefill?.productName
                      ? state.source.prefill.productName
                      : "e.g., All-Over Print T-Shirt, hoodie, etc."
                  }
                  className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-sm focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Estimated quantity">
                <input
                  type="text"
                  value={form.quantity}
                  onChange={update("quantity")}
                  placeholder="e.g., 500 pcs"
                  className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-sm focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
              <Field label="Delivery deadline">
                <input
                  type="text"
                  value={form.deadline}
                  onChange={update("deadline")}
                  placeholder="e.g., 2026-03-15"
                  className="w-full border-2 border-[#0a0a0a] bg-white px-3 py-2 text-sm focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Anything else we should know?">
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Print method, fabric, size breakdown, decoration details, etc."
                  className="w-full resize-none border-2 border-[#0a0a0a] bg-white px-3 py-2 text-sm focus:border-[#ff4d00] focus:outline-none"
                />
              </Field>
            </div>

            <div className="mt-6 flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-[10px] text-[#6B6B6B] md:max-w-md">
                By clicking send, your email client opens with the form pre-filled. We will reply within 1 business day from info@sublimapparel.com.
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={closeQuote}
                  className="border-2 border-[#0a0a0a] bg-white text-[#0a0a0a] hover:bg-[#f5f5f5]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#ff4d00] px-6 text-white hover:bg-black"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Opening...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send quote request
                    </>
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}

        <button
          onClick={closeQuote}
          className="absolute right-3 top-3 rounded-sm p-1 text-white/60 transition-all hover:bg-white/10 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-black uppercase tracking-widest text-[#0a0a0a]">
        {label}
      </span>
      {children}
    </label>
  );
}
