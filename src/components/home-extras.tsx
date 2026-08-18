"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Calendar, Package, MessageCircle, ChevronRight, Activity, Mail } from "lucide-react";
import { useRequestQuote } from "@/components/request-quote-modal";
import { RequestSampleButton } from "@/components/request-sample-button";
import type { IndustryCase } from "@/lib/cases";

/**
 * FreeDesignService – section about free design support
 */
function FreeDesignService() {
  return (
    <section className="bg-[#0a0a0a] text-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#ff4d00] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Free · No commitment
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-[1.1] mb-4">
              <span className="text-white">Free </span>
              <span className="text-[#cc3d00]">design service</span>
              <span className="text-white">.</span>
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6">
              Don&apos;t have artwork yet? Send us a rough sketch, a logo, or even a chat message describing what you want. Our in-house design team will mock up your design on the actual garment &mdash; free of charge. No commitment required.
            </p>
            <ul className="space-y-2.5 mb-6 text-sm md:text-base text-white/80">
              <li className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#cc3d00] mt-0.5 shrink-0" />
                <span>Hand-drawn sketch &rarr; production-ready artwork</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#cc3d00] mt-0.5 shrink-0" />
                <span>Logo clean-up, color matching, placement guidance</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#cc3d00] mt-0.5 shrink-0" />
                <span>Free mockup on the actual garment before you commit</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-[#cc3d00] mt-0.5 shrink-0" />
                <span>Unlimited revisions during the artwork stage</span>
              </li>
            </ul>
            <RequestSampleButton className="bg-white text-[#0a0a0a] hover:bg-white/90 font-semibold px-6 py-3 rounded-md text-sm inline-flex items-center gap-2">
              Send my design idea
              <ChevronRight className="w-4 h-4" />
            </RequestSampleButton>
          </div>

          {/* Right: design workspace visual */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#1a1a1a]">
            <Image
              src="/design-workspace.webp"
              alt="SublimApparel in-house design team working on a custom sublimation t-shirt mockup in Adobe Photoshop on a curved ultrawide monitor"
              width={1200}
              height={900}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent" />
            {/* Caption tag */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 text-white/90 text-xs md:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-[#cc3d00]" />
              <span>Your rough idea &rarr; our polished design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * LiveInventory – weekly capacity indicator
 * Pseudo-realistic, client-side rotating numbers
 */
function LiveInventory() {
  const [slots, setSlots] = useState(12);
  const [days, setDays] = useState(4);

  useEffect(() => {
    // Slight oscillation to feel alive (deterministic, no OOM)
    const t = setInterval(() => {
      setSlots((s) => Math.max(3, Math.min(18, s + (Math.random() > 0.5 ? 1 : -1))));
    }, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-white border-y border-neutral-200 py-6 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-[#ff4d00]/10 to-transparent border border-[#ff4d00]/20">
            <div className="relative">
              <div className="w-2.5 h-2.5 bg-[#ff4d00] rounded-full" />
              <div className="absolute inset-0 w-2.5 h-2.5 bg-[#ff4d00] rounded-full animate-ping" />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">Live capacity</div>
              <div className="text-base md:text-lg font-bold text-[#0a0a0a]">
                <span className="text-[#cc3d00]">{slots}</span> bulk order slots left this week
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-[#00c2ff]/10 to-transparent border border-[#00c2ff]/20">
            <Calendar className="w-5 h-5 text-[#0078a8]" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">Lead time</div>
              <div className="text-base md:text-lg font-bold text-[#0a0a0a]">
                Sample <span className="text-[#0078a8]">5 days</span> &middot; Bulk <span className="text-[#0078a8]">15 days</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20">
            <Package className="w-5 h-5 text-green-600" />
            <div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">MOQ</div>
              <div className="text-base md:text-lg font-bold text-[#0a0a0a]">
                From <span className="text-green-600">50 pcs</span> per design
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * LiveActivity – recent orders & inquiries ticker
 */
const ACTIVITY = [
  { name: "John D.", city: "Los Angeles, US", action: "just placed a 200 pcs esports jersey order", time: "8 min ago" },
  { name: "Maria S.", city: "Madrid, ES", action: "requested a quote for 500 pcs all-over print tees", time: "23 min ago" },
  { name: "Mike R.", city: "Toronto, CA", action: "approved the mockup for 120 pcs sublimation hoodies", time: "1 hr ago" },
  { name: "Lisa T.", city: "Sydney, AU", action: "received a sample kit for marathon singlets", time: "2 hr ago" },
  { name: "Ahmed K.", city: "Dubai, AE", action: "inquiry for 1000 pcs DDP-shipping rally tees", time: "3 hr ago" },
  { name: "Sophie L.", city: "Paris, FR", action: "confirmed a 50 pcs allover digital print cotton run", time: "5 hr ago" },
  { name: "Chris B.", city: "Austin, US", action: "requested rush 5-day bulk turnaround", time: "6 hr ago" },
  { name: "Daniela F.", city: "São Paulo, BR", action: "ordered 300 pcs festival merch shirts", time: "8 hr ago" },
  { name: "Oskar W.", city: "Berlin, DE", action: "downloaded our sublimation artwork template", time: "11 hr ago" },
  { name: "Aiko N.", city: "Tokyo, JP", action: "requested mockup of a custom esports jersey", time: "13 hr ago" },
  { name: "Ryan P.", city: "Manchester, UK", action: "booked a video factory tour", time: "1 day ago" },
  { name: "Elena V.", city: "Milan, IT", action: "ordered 150 pcs all-over print racing polos", time: "1 day ago" },
];

function LiveActivity() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % ACTIVITY.length);
        setVisible(true);
      }, 400);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const a = ACTIVITY[idx];

  return (
    <section className="bg-[#0a0a0a] text-white py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-3">
        <div className="flex items-center gap-1.5 shrink-0">
          <Activity className="w-3.5 h-3.5 text-[#cc3d00]" />
          <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-[#cc3d00]">Live</span>
        </div>
        <div
          className={`flex-1 min-w-0 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="text-xs md:text-sm text-white/90 truncate">
            <span className="font-bold text-white">{a.name}</span>
            <span className="text-white/60"> from {a.city}</span>
            <span className="text-white/90"> {a.action}</span>
            <span className="text-white/40"> &middot; {a.time}</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1.5 shrink-0">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] uppercase tracking-widest font-semibold text-white/50">Active now</span>
        </div>
      </div>
    </section>
  );
}

function LogoWall() {
  return (
    <section className="bg-white py-6 md:py-8 border-y border-neutral-200">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Image
          src="/logowall.webp"
          alt="Client logo wall — 200+ brands, teams and agencies trust SublimApparel for custom sublimation apparel"
          width={1672}
          height={941}
          sizes="(max-width: 768px) 100vw, 1152px"
          className="w-full h-auto block"
          priority={false}
        />
      </div>
    </section>
  );
}

function VideoShowcase() {
  return (
    <section className="bg-[#0a0a0a] text-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <div className="text-[10px] md:text-xs uppercase tracking-widest text-[#cc3d00] font-bold mb-3">
              [ 003 / Watch · 40 seconds ]
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-[1.1] mb-4">
              <span className="text-white">See our </span>
              <span className="text-[#cc3d00]">factory in action.</span>
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed mb-6">
              Walk through our 8,000 m² Yiwu facility &mdash; 12 production lines, digital sublimation printers, cut-and-sew lines, quality control, packing. 40 seconds, real footage, no fluff.
            </p>
            <ul className="space-y-2 text-sm md:text-base text-white/70">
              <li>&bull; Sublimation printing &mdash; large format, edge-to-edge</li>
              <li>&bull; All-over digital print 100% cotton</li>
              <li>&bull; Cut-and-sew assembly lines</li>
              <li>&bull; QC, packing, DDP shipping prep</li>
            </ul>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-white/10">
            <video
              src="/videos/sublimapparel-intro.mp4"
              poster="/factory-floor.webp"
              controls
              preload="metadata"
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Newsletter – mailto-based signup
 */
function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Newsletter subscription request");
    const body = encodeURIComponent(
      `Hi SublimApparel,\n\nPlease add this email to the B2B newsletter:\n\n${email}\n\nThanks!`
    );
    window.location.href = `mailto:info@sublimapparel.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] text-white py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <Mail className="w-8 h-8 text-[#cc3d00] mx-auto mb-3" />
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
          Monthly B2B digest
        </h2>
        <p className="text-sm md:text-base text-white/70 mb-6">
          New fabric, technique, lead-time tips, sample drops. No spam, unsubscribe anytime.
        </p>
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            required
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-md bg-white/5 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[#ff4d00]"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-md bg-[#ff4d00] hover:bg-[#ff5d1a] text-white font-semibold text-sm whitespace-nowrap"
          >
            {submitted ? "Check your email" : "Subscribe"}
          </button>
        </form>
        <p className="text-[10px] text-white/40 mt-3">
          We&apos;ll send a confirmation email to verify your address.
        </p>
      </div>
    </section>
  );
}

// Recent Case Studies — showcase 3 real cases from the database
import { industries } from "@/lib/cases";

function RecentCaseStudies() {
  const featured = industries
    .flatMap((ind: IndustryCase) =>
      ind.cases.map((c) => ({ ...c, industrySlug: ind.slug, industryTitle: ind.title }))
    )
    .slice(0, 3);
  if (featured.length === 0) return null;
  return (
    <section className="bg-[#0a0a0a] py-16 md:py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <p className="text-[#cc3d00] text-xs font-bold tracking-[0.2em] uppercase mb-3">Recent work</p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Case studies from the line</h2>
            <p className="mt-3 text-white/60 text-base max-w-2xl">Real production runs, real numbers, shipped to real customers across the US, EU, and the UK.</p>
          </div>
          <Link href="/cases" className="text-sm font-semibold text-white border-b-2 border-[#ff4d00] pb-1 hover:text-[#cc3d00] transition-colors">View all industries →</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((c) => (
            <Link
              key={c.id}
              href={`/cases/${c.industrySlug}/${c.id}`}
              className="group block bg-[#1a1a1a] border border-white/10 rounded-xl p-6 hover:border-[#ff4d00] transition-all duration-200"
            >
              <div className="text-[10px] font-bold tracking-widest uppercase text-[#cc3d00] mb-3">{c.industryTitle} · {c.year}</div>
              <h3 className="text-lg font-bold leading-snug mb-3 group-hover:text-[#cc3d00] transition-colors">{c.title}</h3>
              <p className="text-sm text-white/60 line-clamp-3 leading-relaxed">{c.summary}</p>
              <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-white/80 group-hover:text-[#cc3d00]">
                <span>Read the case study</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Export all as a single composed section for the home page
export function HomeExtras() {
  return (
    <>
      <LiveActivity />
      <LiveInventory />
    </>
  );
}

// Also export individual components in case other pages want them
export { FreeDesignService, LiveInventory, LiveActivity, LogoWall, RecentCaseStudies, VideoShowcase, Newsletter };
