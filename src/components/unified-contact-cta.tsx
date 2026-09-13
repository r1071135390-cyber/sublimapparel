"use client";

import Link from "next/link";
import { MessageCircle, Mail, FileText, Clock, ShieldCheck, Phone } from "lucide-react";
import { RequestQuoteLink } from "@/components/request-quote-link";

/**
 * 2026-09-13 (R59): Unified CTA entry point for the three contact
 * channels the project has spent the last 6+ rounds building:
 *   1. /get-a-quote/         - opens the in-page quote modal (default
 *                              B2B funnel entry, lands the most fields)
 *   2. /yiwu-factory-whatsapp/ - direct WhatsApp line, fastest reply
 *   3. /contact/              - full contact form, email + 24h SLA
 *
 * Before R59 these three entry points were each styled differently
 * across the site (different button colors, sizes, copy, ordering)
 * and appeared on different page surfaces with different copy. That
 * inconsistency hurts:
 *   - Conversion (user has to re-evaluate 3 different visual signals
 *     on every page instead of recognizing a single, consistent pattern)
 *   - Link equity (PageRank is split between the three URLs with no
 *     visual hierarchy hinting at which one is preferred for what
 *     intent)
 *
 * This component renders all three on the same surface, with
 * intent-matched copy ("Tell us your spec" / "WhatsApp the floor" /
 * "Send a detailed inquiry") and a consistent visual treatment, so:
 *   - Users see one unified "how to reach us" widget wherever it
 *     appears
 *   - Each channel's relative priority is shown by color and
 *     ordering (modal > WhatsApp > form, matching the actual
 *     B2B buyer funnel)
 *   - All three URLs get internal anchor text from every surface
 *     that renders the component (footer, /contact/, /yiwu-factory-whatsapp/)
 *
 * Variants:
 *   - "full"    : 3-column grid, hero-section spacing, used on
 *                 /contact/ and /yiwu-factory-whatsapp/ as the
 *                 "primary next step" block
 *   - "compact" : single horizontal row with smaller button sizing,
 *                 used in the global footer to keep the
 *                 already-busy footer from getting too tall
 */
type Variant = "full" | "compact";

type Props = {
  variant?: Variant;
  /** Optional className passthrough for the outer section */
  className?: string;
  /** Source label passed to the quote modal so we can attribute the lead */
  sourceLabel?: string;
  /** When true, the surrounding section assumes a dark background */
  onDark?: boolean;
};

const WHATSAPP_NUMBER = "+8619817930190";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi SublimApparel, I'd like to chat about a custom sublimation order."
)}`;

export function UnifiedContactCta({
  variant = "full",
  className = "",
  sourceLabel = "Unified contact CTA",
  onDark = false,
}: Props) {
  if (variant === "compact") {
    return (
      <CompactBar
        className={className}
        sourceLabel={sourceLabel}
        onDark={onDark}
      />
    );
  }
  return (
    <FullGrid
      className={className}
      sourceLabel={sourceLabel}
      onDark={onDark}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Full variant — used on /contact/ and /yiwu-factory-whatsapp/ hero   */
/* ------------------------------------------------------------------ */

function FullGrid({
  className,
  sourceLabel,
  onDark,
}: {
  className: string;
  sourceLabel: string;
  onDark: boolean;
}) {
  const sectionBg = onDark ? "bg-[#0a0a0a] text-white" : "bg-white text-black";
  const cardBg = onDark ? "bg-[#1a1a1a] border-white/15" : "bg-[#faf9f6] border-black";
  const mutedText = onDark ? "text-white/65" : "text-black/65";

  return (
    <section className={`${sectionBg} ${className}`}>
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 inline-block bg-[#ff4d00] px-3 py-1 text-xs font-black uppercase tracking-widest text-black">
            Three ways to reach us
          </div>
          <h2 className="text-3xl font-black leading-[1.05] tracking-tight md:text-5xl">
            Pick the channel that
            <br />
            <span className="text-[#cc3d00]">matches your urgency.</span>
          </h2>
          <p className={`mt-4 max-w-xl text-base leading-relaxed md:text-lg ${mutedText}`}>
            All three reach the same Yiwu production managers — no call
            center, no chatbot. Average reply under 1 business day.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {/* 1. Get a quote — primary funnel (modal) */}
          <article
            className={`flex flex-col gap-4 border-2 p-6 ${cardBg}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center bg-[#ff4d00] text-black">
                <FileText className="h-6 w-6" strokeWidth={2.5} />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#ff4d00]">
                Most detail
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black leading-tight md:text-2xl">
                Tell us your spec
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${mutedText}`}>
                1-minute guided form. Step-by-step inputs for size
                breakdown, deadline, destination. Best for orders of
                200+ pieces.
              </p>
            </div>
            <ul className={`mt-1 space-y-1.5 text-xs ${mutedText}`}>
              <li className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> Reply within 1 business day
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Landed DDP quote
              </li>
            </ul>
            <RequestQuoteLink
              label={sourceLabel}
              className="mt-auto inline-flex items-center justify-center gap-2 bg-[#ff4d00] px-5 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white"
            >
              Get a quote →
            </RequestQuoteLink>
          </article>

          {/* 2. WhatsApp the factory — fastest */}
          <article
            className={`flex flex-col gap-4 border-2 p-6 ${cardBg}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center bg-[#25D366] text-black">
                <MessageCircle className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#25D366]">
                Fastest
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black leading-tight md:text-2xl">
                WhatsApp the floor
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${mutedText}`}>
                Direct chat with a Yiwu production manager. No signup,
                no form, no bot. Attach artwork on the first message.
              </p>
            </div>
            <ul className={`mt-1 space-y-1.5 text-xs ${mutedText}`}>
              <li className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> +86 198 1793 0190
              </li>
              <li className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> Mon–Sat 09:00–18:00 CST
              </li>
            </ul>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 bg-[#25D366] px-5 py-3 text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-[#1ebd57]"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </article>

          {/* 3. Contact form — most formal */}
          <article
            className={`flex flex-col gap-4 border-2 p-6 ${cardBg}`}
          >
            <div className="flex items-center justify-between">
              <div className={`flex h-12 w-12 items-center justify-center ${onDark ? "bg-white/10 text-white" : "bg-black text-white"}`}>
                <Mail className="h-6 w-6" />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${onDark ? "text-white/60" : "text-black/60"}`}>
                Most formal
              </span>
            </div>
            <div>
              <h3 className="text-xl font-black leading-tight md:text-2xl">
                Send a detailed inquiry
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${mutedText}`}>
                Full contact form with name, company, role, message.
                Same 24-hour reply SLA, written record for procurement
                teams.
              </p>
            </div>
            <ul className={`mt-1 space-y-1.5 text-xs ${mutedText}`}>
              <li className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> info@sublimapparel.com
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Tracked in CRM
              </li>
            </ul>
            <Link
              href="/contact/"
              className={`mt-auto inline-flex items-center justify-center gap-2 border-2 px-5 py-3 text-sm font-black uppercase tracking-widest transition-all ${
                onDark
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-black text-black hover:bg-black hover:text-white"
              }`}
            >
              Open the form →
            </Link>
          </article>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Compact variant — used in the global footer                         */
/* ------------------------------------------------------------------ */

function CompactBar({
  className,
  sourceLabel,
  onDark,
}: {
  className: string;
  sourceLabel: string;
  onDark: boolean;
}) {
  const wrap = onDark
    ? "bg-[#0a0a0a] border-white/10"
    : "bg-white border-black";

  return (
    <div className={`border-2 ${wrap} ${className}`}>
      <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between md:gap-4 md:p-5">
        <div className="flex-1">
          <div className="text-[10px] font-black uppercase tracking-widest text-[#ff4d00]">
            Three ways to reach us
          </div>
          <p className="mt-1 text-sm font-bold leading-snug md:text-base">
            Real production managers in Yiwu — not chatbots.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <RequestQuoteLink
            label={sourceLabel}
            className="inline-flex items-center gap-1.5 bg-[#ff4d00] px-3 py-2 text-xs font-black uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white md:text-sm"
          >
            <FileText className="h-3.5 w-3.5" /> Get a quote
          </RequestQuoteLink>
          <a
            href="/yiwu-factory-whatsapp/"
            className="inline-flex items-center gap-1.5 bg-[#25D366] px-3 py-2 text-xs font-black uppercase tracking-widest text-black transition-all hover:bg-[#1ebd57] md:text-sm"
          >
            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
          </a>
          <Link
            href="/contact/"
            className={`inline-flex items-center gap-1.5 border-2 px-3 py-2 text-xs font-black uppercase tracking-widest transition-all md:text-sm ${
              onDark
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-black text-black hover:bg-black hover:text-white"
            }`}
          >
            <Mail className="h-3.5 w-3.5" /> Contact form
          </Link>
        </div>
      </div>
    </div>
  );
}
