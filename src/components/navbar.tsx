"use client";

import Link from "next/link";
import { User, ChevronDown, Mail, MessageCircle, Briefcase, Wrench, Building2, Shirt } from "lucide-react";

const solutions = [
  {
    href: "/teams-sports-apparel/",
    label: "Teams & Sports Apparel",
    desc: "Race, marathon, league and club kits",
  },
  {
    href: "/event-festivals-conferences/",
    label: "Event Festivals & Conferences",
    desc: "Conferences, festivals, expos, trade shows",
  },
  {
    href: "/corporate-organization-apparel/",
    label: "Corporate & Organization Apparel",
    desc: "Companies, clubs, schools, nonprofits",
  },
  {
    href: "/promotional-marketing-apparel/",
    label: "Promotional & Marketing Apparel",
    desc: "Brand merch, giveaways, marketing campaigns",
  },
  {
    href: "/apparel-brands-agencies/",
    label: "Apparel Brands & Agencies",
    desc: "Private label, OEM, white-label production",
  },
  {
    href: "/e-commerce-fulfillment/",
    label: "E-commerce & Fulfillment",
    desc: "Bulk production, drop-ship, online sellers",
  },
];

// 2026-09-15 (R69): 7 use-case / scenario pages added so every page in
// the site carries an internal link to the new buyer-intent landing pages
// surfaced by the GSC audit (wedding / church / fundraiser / fraternity /
// sorority / camp / marathon were at zero coverage). These were missing
// from the navbar entirely, so Google had no priority signal flowing into
// them. Adding them to the Solutions dropdown (grouped under their own
// "By Use Case" sub-section) gives every navbar surface a text link,
// which is the project-memory hard requirement for high-priority pages.
const useCases = [
  {
    href: "/event-apparel/",
    label: "Event Apparel",
    desc: "Fundraiser, charity, community, awareness walks",
  },
  {
    href: "/custom-event-t-shirts/",
    label: "Custom Event T-Shirts",
    desc: "Wedding & reunion shirts, event-day tees",
  },
  {
    href: "/summer-camp-shirts/",
    label: "Summer Camp Shirts",
    desc: "Camp counselor, staff, color-coded groups",
  },
  {
    href: "/corporate-event-apparel/",
    label: "Corporate Event Apparel",
    desc: "Retreats, trade shows, church & wedding events",
  },
  {
    href: "/race-shirts/",
    label: "Race Shirts",
    desc: "5K, 10K, fun runs, charity races, club kits",
  },
  {
    href: "/marathon-shirts/",
    label: "Marathon Shirts",
    desc: "Marathon, half-marathon, ultra finisher tees",
  },
  {
    href: "/private-label-sportswear/",
    label: "Private Label Sportswear",
    desc: "Fraternity, sorority, Greek life, esports brands",
  },
];

// Industries dropdown — 12 industry verticals (links to /industries/* pages that were orphaned before this change)
const industries = [
  { href: "/industries/sports-teams-leagues/", label: "Sports Teams & Leagues" },
  { href: "/industries/endurance-race-events/", label: "Endurance & Race Events" },
  { href: "/industries/events-conferences/", label: "Events & Conferences" },
  { href: "/industries/music-festival-tour-merchandise/", label: "Music, Tour & Festival Merch" },
  { href: "/industries/corporate-employee-programs/", label: "Corporate & Employee Programs" },
  { href: "/industries/schools-universities-greek-life/", label: "Schools, Universities & Greek Life" },
  { href: "/industries/breweries-coffee-hospitality/", label: "Breweries, Coffee & Hospitality" },
  { href: "/industries/promotional-marketing-agencies/", label: "Promotional & Marketing Agencies" },
  { href: "/industries/trade-shows-display/", label: "Trade Shows & Display" },
  { href: "/industries/apparel-brands-agencies/", label: "Apparel Brands & Agencies" },
  { href: "/industries/political-campaigns/", label: "Political Campaigns" },
  { href: "/industries/e-commerce-fulfillment/", label: "E-commerce & Fulfillment" },
];

const resources = [
  {
    href: "/event-timeline/",
    label: "Event Timeline Calculator",
    desc: "Plan backward from your event date",
  },
  {
    href: "/us-size-guide/",
    label: "US Size Guide",
    desc: "Charts + free Excel template",
  },
  {
    href: "/quality-control/",
    label: "Quality Control Process",
    desc: "4-step inspection with AQL 2.5",
  },
  {
    href: "/90-day-program/",
    label: "90-Day Production Program",
    desc: "2-Phase model: reserve, lock",
  },
  {
    href: "/how-to-source/",
    label: "How to Source",
    desc: "5-step process from inquiry to delivery",
  },
  // 2026-09-13 (R58): Yiwu factory WhatsApp landing page
  // promoted into the resources dropdown so every navbar
  // surface (desktop + mobile) carries an internal link to
  // it. The orange WhatsApp button on the right has linked
  // here since R6, but the project memory constraint
  // requires a *text* link from the main nav so PageRank
  // flows through every page. Adding to the resources array
  // makes it appear in both the desktop dropdown and the
  // mobile menu's resources section without restructuring
  // the navbar component.
  {
    href: "/yiwu-factory-whatsapp/",
    label: "Yiwu Factory WhatsApp",
    desc: "Chat directly with our Yiwu factory floor",
  },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b-2 border-black bg-[#faf9f6]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5">
        <Link href="/" className="group flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/sublimapparel-logo-v2.webp"
            alt="SublimApparel — custom all-over print apparel factory, Yiwu China"
            width={220}
            height={88}
            decoding="async"
            loading="eager"
            /* eslint-disable-next-line react/no-unknown-property */
            fetchPriority="high"
            className="h-11 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <Link
            href="/"
            className="text-sm font-bold uppercase tracking-wider text-black transition-colors hover:text-[#cc3d00]"
          >
            Home
          </Link>
          {/* Industries dropdown — 12 industry verticals */}
          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:text-[#cc3d00]"
            >
              Industries
              <ChevronDown
                className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
                strokeWidth={3}
              />
            </button>
            <div className="invisible absolute left-1/2 top-full z-20 w-80 -translate-x-1/2 border-2 border-black bg-white opacity-0 shadow-[6px_6px_0_0_rgba(10,10,10,1)] transition-all group-hover:visible group-hover:opacity-100">
              <div className="border-b-2 border-black bg-[#00c2ff] px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-black">
                <Building2 className="mr-1 inline h-3 w-3" />
                By Industry Vertical
              </div>
              <div className="max-h-[480px] overflow-y-auto">
                {industries.map((ind) => (
                  <Link
                    key={ind.href}
                    href={ind.href}
                    className="block border-b border-black/10 px-4 py-2 text-sm font-bold uppercase tracking-wider text-black transition-colors last:border-0 hover:bg-[#0a0a0a] hover:text-white"
                  >
                    {ind.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Solutions dropdown */}
          <div className="group relative">
            <Link
              href="/solutions/"
              className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:text-[#cc3d00]"
            >
              Solutions
              <ChevronDown
                className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
                strokeWidth={3}
              />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-20 w-80 -translate-x-1/2 border-2 border-black bg-white opacity-0 shadow-[6px_6px_0_0_rgba(10,10,10,1)] transition-all group-hover:visible group-hover:opacity-100">
              <div className="border-b-2 border-black bg-[#ff4d00] px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-black">
                <Briefcase className="mr-1 inline h-3 w-3" />
                By Customer
              </div>
              <Link
                href="/solutions/"
                className="block border-b-2 border-black bg-[#faf9f6] px-4 py-2.5 transition-colors hover:bg-[#0a0a0a] hover:text-white"
              >
                <div className="text-sm font-black">All Solutions Overview</div>
                <div className="mt-0.5 text-[11px] text-black/60 group-hover:text-white/70">
                  See all 6 buyer profiles + 7 use cases
                </div>
              </Link>
              {solutions.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="block border-b border-black/10 px-4 py-2.5 transition-colors last:border-0 hover:bg-[#0a0a0a] hover:text-white"
                >
                  <div className="text-sm font-black">{s.label}</div>
                  <div className="mt-0.5 text-[11px] text-black/60 group-hover:text-white/70">
                    {s.desc}
                  </div>
                </Link>
              ))}
              {/* 2026-09-15 (R69): "By Use Case" sub-section so the 7 new
                  scenario landing pages get a navbar text link from every
                  page on the site (desktop + mobile). Grouped under their
                  own header for scannability. */}
              <div className="border-b-2 border-t-2 border-black bg-[#faf9f6] px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-[#cc3d00]">
                <Shirt className="mr-1 inline h-3 w-3" />
                By Use Case
              </div>
              {useCases.map((u) => (
                <Link
                  key={u.href}
                  href={u.href}
                  className="block border-b border-black/10 px-4 py-2.5 transition-colors last:border-0 hover:bg-[#0a0a0a] hover:text-white"
                >
                  <div className="text-sm font-black">{u.label}</div>
                  <div className="mt-0.5 text-[11px] text-black/60 group-hover:text-white/70">
                    {u.desc}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Tools dropdown (main link → /resources/ hub) */}
          <div className="group relative">
            <Link
              href="/resources/"
              className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:text-[#cc3d00]"
            >
              Tools
              <ChevronDown
                className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
                strokeWidth={3}
              />
            </Link>
            <div className="invisible absolute left-1/2 top-full z-20 w-72 -translate-x-1/2 border-2 border-black bg-white opacity-0 shadow-[6px_6px_0_0_rgba(10,10,10,1)] transition-all group-hover:visible group-hover:opacity-100">
              <div className="border-b-2 border-black bg-[#00c2ff] px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-black">
                <Wrench className="mr-1 inline h-3 w-3" />
                Free Resources
              </div>
              <Link
                href="/resources/"
                className="block border-b-2 border-black bg-[#00c2ff]/20 px-4 py-2.5 transition-colors hover:bg-[#0a0a0a] hover:text-black"
              >
                <div className="text-sm font-black">View All Resources</div>
                <div className="mt-0.5 text-[11px] text-black/60 group-hover:text-white/70">
                  All tools, calculators & guides in one place
                </div>
              </Link>
              {resources.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="block border-b border-black/10 px-4 py-2.5 transition-colors last:border-0 hover:bg-[#0a0a0a] hover:text-white"
                >
                  <div className="text-sm font-black">{r.label}</div>
                  <div className="mt-0.5 text-[11px] text-black/60 group-hover:text-white/70">
                    {r.desc}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/about/"
            className="text-sm font-bold uppercase tracking-wider text-black transition-colors hover:text-[#cc3d00]"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-1">
          {/* WhatsApp — direct chat for high-intent B2B buyers (2026-09-11 push)
              Linked to /yiwu-factory-whatsapp/ so internal PageRank flows into
              the new landing page from every page that renders the navbar. */}
          <Link
            href="/yiwu-factory-whatsapp/"
            aria-label="Chat on WhatsApp"
            className="inline-flex items-center gap-1.5 rounded-sm bg-[#ff4d00] px-2.5 py-2 text-sm font-black uppercase tracking-wider text-black transition-all hover:-translate-y-0.5 hover:bg-[#cc3d00] hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)]"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
            <span className="hidden sm:inline">WhatsApp</span>
          </Link>

          {/* Contact — sits next to account, always visible (desktop + mobile) */}
          <Link
            href="/contact/"
            aria-label="Contact"
            className="inline-flex items-center gap-1.5 rounded-sm px-2.5 py-2 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#ff4d00] hover:text-black"
          >
            <Mail className="h-5 w-5" strokeWidth={2.5} />
            <span className="hidden sm:inline">Contact</span>
          </Link>

          <div className="group relative">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-bold uppercase tracking-wider text-black transition-colors hover:text-[#cc3d00]"
              aria-label="Account"
            >
              <User className="h-5 w-5" strokeWidth={2.5} />
              <ChevronDown className="h-3.5 w-3.5" strokeWidth={3} />
            </button>
            <div className="invisible absolute right-0 top-full z-10 w-44 border-2 border-black bg-white pt-1 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
              <Link
                href="/login/"
                className="block px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/register/"
                className="block border-t border-black/10 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-black hover:bg-[#ff4d00] hover:text-black"
              >
                Create account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
