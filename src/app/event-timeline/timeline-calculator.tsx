"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Plane,
} from "lucide-react";
import Link from "next/link";

type Urgency = "ok" | "tight" | "rush" | "impossible";

interface Milestone {
  label: string;
  daysOut: number;
  description: string;
}

const MILESTONES: Milestone[] = [
  {
    label: "Submit inquiry",
    daysOut: 90,
    description:
      "Best pricing. Fabric choices unlocked. No rush fees. Start here if you can.",
  },
  {
    label: "Design + sample sign-off",
    daysOut: 60,
    description:
      "Lock the design. Physical sample on your exact fabric. Sign-off is the contract.",
  },
  {
    label: "Final count lock",
    daysOut: 30,
    description:
      "Your registration numbers are real. We adjust production within 5% of your estimate.",
  },
  {
    label: "Production + QC",
    daysOut: 15,
    description:
      "Bulk cut, print, sew, inspect. 4-stage QC with photo evidence.",
  },
  {
    label: "Event day",
    daysOut: 0,
    description: "Apparel at your door. DDP shipping to 100+ countries.",
  },
];

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function fmt(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function daysBetween(a: Date, b: Date): number {
  const ms = a.getTime() - b.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

export function TimelineCalculator() {
  const [eventDate, setEventDate] = useState<string>("");
  const [today] = useState<Date>(() => new Date());

  const computed = useMemo(() => {
    if (!eventDate) return null;
    const ev = new Date(eventDate + "T00:00:00");
    if (Number.isNaN(ev.getTime())) return null;
    const daysUntil = daysBetween(ev, today);
    if (daysUntil < 0) return null;

    let urgency: Urgency = "ok";
    let headline = "You're in great shape. Standard 90-day program.";
    if (daysUntil < 15) {
      urgency = "impossible";
      headline = "Not enough time for production. We can still help via US warehouse (2-5 day domestic).";
    } else if (daysUntil < 30) {
      urgency = "rush";
      headline = "Tight. Rush production via air freight (30-35 days compressed). Pricing +20-30%.";
    } else if (daysUntil < 60) {
      urgency = "tight";
      headline = "Tight but doable. Compressed schedule, reduced fabric choices.";
    } else if (daysUntil < 90) {
      urgency = "tight";
      headline = "Workable. Reduced fabric choices. Start this week.";
    } else {
      urgency = "ok";
      headline = "You're in great shape. Standard 90-day program.";
    }

    const items = MILESTONES.map((m) => ({
      ...m,
      date: addDays(ev, -m.daysOut),
    }));

    return { daysUntil, urgency, headline, items, ev };
  }, [eventDate, today]);

  const urgencyColor = {
    ok: { bg: "bg-[#0a0a0a]", text: "text-[#0a0a0a]", accent: "text-[#ff4d00]" },
    tight: { bg: "bg-[#ff4d00]", text: "text-[#ff4d00]", accent: "text-[#ff4d00]" },
    rush: { bg: "bg-[#cc3d00]", text: "text-[#cc3d00]", accent: "text-[#cc3d00]" },
    impossible: { bg: "bg-black", text: "text-black", accent: "text-black" },
  }[computed?.urgency ?? "ok"];

  return (
    <div className="rounded-sm border-2 border-black/10 bg-white p-6 md:p-10">
      {/* INPUT */}
      <div className="mb-8">
        <label
          htmlFor="event-date"
          className="block text-sm font-black uppercase tracking-wider text-black/60"
        >
          When is your event?
        </label>
        <input
          id="event-date"
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="mt-3 w-full rounded-sm border-2 border-black/20 bg-white px-4 py-4 text-2xl font-black tracking-tight text-black focus:border-[#ff4d00] focus:outline-none md:text-3xl"
        />
        <p className="mt-2 text-xs text-black/50">
          Today is {fmt(today)}.
        </p>
      </div>

      {/* RESULT */}
      {computed ? (
        <>
          <div
            className={`mb-8 rounded-sm border-2 border-black/10 ${urgencyColor.bg === "bg-[#0a0a0a]" ? "bg-[#0a0a0a]" : urgencyColor.bg === "bg-[#ff4d00]" ? "bg-[#ff4d00]/10" : urgencyColor.bg === "bg-[#cc3d00]" ? "bg-[#cc3d00]/10" : "bg-black/5"} p-6`}
          >
            <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wider">
              {computed.urgency === "ok" || computed.urgency === "tight" ? (
                <CheckCircle2 className={`h-4 w-4 ${urgencyColor.text}`} />
              ) : (
                <AlertTriangle className={`h-4 w-4 ${urgencyColor.text}`} />
              )}
              <span className={urgencyColor.text}>
                {computed.daysUntil} days until your event
              </span>
            </div>
            <p className="text-lg font-black leading-tight md:text-xl">
              {computed.headline}
            </p>
          </div>

          {/* MILESTONES */}
          <div className="space-y-3">
            {computed.items.map((m, idx) => {
              const past = m.date < today;
              return (
                <div
                  key={m.label}
                  className={`flex items-start gap-4 rounded-sm border-2 p-4 ${
                    past
                      ? "border-black/5 bg-black/5 opacity-60"
                      : idx === 0
                      ? "border-[#ff4d00]/40 bg-[#ff4d00]/5"
                      : "border-black/10 bg-white"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm font-black ${
                      past
                        ? "bg-black/10 text-black/40"
                        : idx === 0
                        ? "bg-[#ff4d00] text-black"
                        : "bg-black/5 text-black"
                    }`}
                  >
                    {idx === 0 ? <Clock className="h-5 w-5" /> : idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <div className="font-black">{m.label}</div>
                      <div className="text-sm font-bold text-black/60">
                        {fmt(m.date)}
                      </div>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-black/70">
                      {m.description}
                    </p>
                    {idx === 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Link
                          href="/contact/"
                          className="inline-flex items-center gap-1.5 rounded-sm bg-[#ff4d00] px-3 py-2 text-xs font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5"
                        >
                          Submit inquiry
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                        {computed.urgency !== "ok" && (
                          <Link
                            href="/90-day-program/"
                            className="inline-flex items-center gap-1.5 rounded-sm border-2 border-black/20 bg-white px-3 py-2 text-xs font-black uppercase tracking-wider text-black transition-all hover:border-[#ff4d00]"
                          >
                            <Plane className="h-3.5 w-3.5" />
                            Rush options
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="rounded-sm border-2 border-dashed border-black/10 bg-[#faf9f6] p-10 text-center">
          <Calendar className="mx-auto h-10 w-10 text-black/30" />
          <p className="mt-3 text-sm font-bold text-black/50">
            Select your event date to see your timeline.
          </p>
        </div>
      )}
    </div>
  );
}
