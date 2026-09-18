/**
 * GeoAnswerBlock — Direct Answer + By the Numbers + Citations
 *
 * 2026-09-18 (R73 GEO): Perplexity, ChatGPT Search, Gemini and Google
 * AI Overviews all prefer the same content shape on a high-authority
 * page:
 *
 *   1. A short, first-person, fact-dense "Direct Answer" paragraph
 *      answering the page's primary question in 50–80 words.
 *   2. A small "By the numbers" stat strip (3–6 items) with concrete
 *      figures the AI can quote verbatim.
 *   3. Inline citations to authoritative external sources (.org /
 *      .gov / standards-body) so the AI can treat the answer as
 *      verified.
 *   4. Internal "Based on" links to sister SublimApparel pages so the
 *      answer stays inside the entity graph.
 *   5. Visible "Last reviewed" + named author so the page is treated
 *      as EEAT-compliant by Perplexity's quality filter.
 *
 * Every page that uses this block renders the same shape, so the five
 * core hub pages (/, /products/, /fabric/cotton/, /blog/, /contact/)
 * share a single "answer" surface that AI crawlers can recognise and
 * lift into their summaries.
 *
 * The block does NOT carry its own JSON-LD. Each host page already
 * owns its WebPage / FAQPage / Service graph (see breadcrumb.ts); the
 * block exposes its question + answer via the `data-tldr-question` /
 * `data-tldr-answer` attributes so the page-level `speakable` xpath
 * can resolve to the same DOM nodes Google already indexes.
 *
 * Visual rules:
 *   - `light` variant: cream surface, brand-orange left border. Used
 *     after a white hero (e.g. /, /fabric/cotton/, /products/).
 *   - `dark` variant:   deep surface, brand-orange border. Used after
 *     a dark hero (e.g. /contact/, /blog/).
 *   - Typography matches the existing hero system (font-black for the
 *     small "Quick Answer" eyebrow, font-medium for the answer body).
 */

import Link from "next/link";
import { BookOpen, CheckCircle2, Quote } from "lucide-react";
import { getPageTldr } from "@/lib/tldr-content";
import { JsonLd } from "@/components/json-ld";

export type GeoStat = {
  /** Big number / figure — e.g. "2,500+" or "100+" */
  value: string;
  /** Short caption — e.g. "pieces / day" */
  label: string;
  /** Optional micro-context — e.g. "12 production lines" */
  detail?: string;
};

export type GeoCitation = {
  /** Display label — e.g. "OEKO-TEX Standard 100" */
  label: string;
  /** Public URL */
  href: string;
  /** Year or ISO date of the cited version */
  date?: string;
};

export type GeoInternalSource = {
  /** Display label — e.g. "SublimApparel /products/" */
  label: string;
  /** Internal path — e.g. "/products/" */
  href: string;
};

type Props = {
  /** The single most-natural query this page answers. AI engines match
   *  this against their own question phrasing. */
  question: string;
  /** 50–80 word direct answer in first person, factual, no fluff.
   *  Plain English, 2–3 sentences, mentions specific numbers. */
  answer: string;
  /** "By the numbers" stat strip — 3 to 6 items. */
  stats?: GeoStat[];
  /** External authoritative citations (max 4 — too many dilutes). */
  citations?: GeoCitation[];
  /** Internal sources this answer is built on (max 4). */
  internalSources?: GeoInternalSource[];
  /** ISO date the answer was last reviewed. */
  lastReviewed?: string;
  /** Person who reviewed the answer — required for EEAT. */
  reviewedBy?: string;
  /** Page variant selector. */
  variant?: "light" | "dark";
  /** Optional anchor id — useful when other sections want to scroll here. */
  id?: string;
};

export function GeoAnswerBlock({
  question,
  answer,
  stats = [],
  citations = [],
  internalSources = [],
  lastReviewed,
  reviewedBy = "Ramon Wang, Sales Director, SublimApparel",
  variant = "light",
  id,
}: Props) {
  const isDark = variant === "dark";

  // Container surface — light uses cream + brand-orange left border;
  // dark uses deep surface + brand-orange border so the answer reads
  // as a deliberate "answer card" rather than another content section.
  const containerClass = isDark
    ? "border-y-2 border-[#ff4d00] bg-[#0a0a0a] text-white"
    : "border-2 border-black border-l-[6px] border-l-[#ff4d00] bg-[#faf9f6] text-black";

  const eyebrowClass = isDark ? "text-[#ff4d00]" : "text-[#cc3d00]";
  const questionClass = isDark ? "text-white" : "text-black";
  const bodyClass = isDark ? "text-white/90" : "text-black/85";
  const dividerClass = isDark ? "border-white/15" : "border-black/15";
  const statValueClass = isDark ? "text-white" : "text-black";
  const statLabelClass = isDark ? "text-white/65" : "text-black/65";
  const citationClass = isDark
    ? "border-white/20 bg-white/5 text-white hover:bg-[#ff4d00] hover:text-black hover:border-[#ff4d00]"
    : "border-black/15 bg-white text-black hover:bg-[#ff4d00] hover:text-black hover:border-[#ff4d00]";

  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-question` : undefined}
      className={containerClass}
      // The question + answer are surfaced via data-* attributes so
      // the host page's `speakable` schema can resolve to the same
      // DOM nodes without duplicating text into the JSON-LD.
      data-tldr-question={question}
      data-tldr-answer={answer}
    >
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        {/* Eyebrow + Question — AI engines read this as the page's
            primary Q and lift it verbatim. */}
        <div className="mb-3 flex items-center gap-2">
          <Quote className={`h-3.5 w-3.5 ${eyebrowClass}`} aria-hidden="true" />
          <p
            className={`text-[10px] font-black uppercase tracking-[0.18em] md:text-xs ${eyebrowClass}`}
          >
            Quick Answer
          </p>
        </div>
        <h2
          id={id ? `${id}-question` : undefined}
          // 2026-09-18 (R73 GEO): expose the question heading as a
          // speakable target so each page's WebPage.speakable schema
          // can resolve to the same DOM node Google already indexes.
          data-speakable="true"
          className={`mb-3 text-xl font-black leading-tight tracking-tight md:text-2xl lg:text-3xl ${questionClass}`}
        >
          {question}
        </h2>

        {/* Direct answer paragraph — 50–80 words. */}
        <p
          // 2026-09-18 (R73 GEO): same marker on the answer paragraph
          // so the page-level speakable xpath/cssSelector can pick up
          // both the heading and the answer body in one pass.
          data-speakable="true"
          className={`max-w-4xl text-base leading-relaxed md:text-lg ${bodyClass}`}
        >
          {answer}
        </p>

        {/* By the numbers — stat strip. */}
        {stats.length > 0 && (
          <div
            className={`mt-6 grid grid-cols-2 gap-px border ${dividerClass} bg-transparent md:grid-cols-3 lg:grid-cols-6`}
            role="list"
            aria-label="Key facts"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                role="listitem"
                className={
                  isDark
                    ? "bg-[#0a0a0a] p-4"
                    : "bg-[#faf9f6] p-4 md:p-5"
                }
              >
                <div
                  className={`text-2xl font-black leading-none md:text-3xl ${statValueClass}`}
                >
                  {s.value}
                </div>
                <div
                  className={`mt-1.5 text-[10px] font-black uppercase tracking-widest md:text-xs ${statLabelClass}`}
                >
                  {s.label}
                </div>
                {s.detail && (
                  <div
                    className={`mt-1 text-[11px] leading-snug md:text-xs ${statLabelClass}`}
                  >
                    {s.detail}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Citations — external authoritative sources. */}
        {citations.length > 0 && (
          <div className={`mt-6 border-t pt-5 ${dividerClass}`}>
            <div className="mb-2 flex items-center gap-2">
              <BookOpen
                className={`h-3.5 w-3.5 ${eyebrowClass}`}
                aria-hidden="true"
              />
              <p
                className={`text-[10px] font-black uppercase tracking-[0.18em] md:text-xs ${eyebrowClass}`}
              >
                Sources &amp; Standards
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {citations.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 border px-2.5 py-1.5 text-xs font-bold transition-colors md:text-sm ${citationClass}`}
                  >
                    <CheckCircle2
                      className={`h-3 w-3 ${eyebrowClass}`}
                      aria-hidden="true"
                    />
                    {c.label}
                    {c.date && (
                      <span
                        className={`text-[10px] ${isDark ? "text-white/55" : "text-black/55"}`}
                      >
                        ({c.date})
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Internal sources — sister pages this answer draws on. */}
        {internalSources.length > 0 && (
          <div className="mt-4">
            <p
              className={`mb-2 text-[10px] font-black uppercase tracking-[0.18em] md:text-xs ${eyebrowClass}`}
            >
              Based on
            </p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs md:text-sm">
              {internalSources.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className={
                      isDark
                        ? "text-white/75 underline decoration-white/25 underline-offset-2 hover:text-[#ff4d00] hover:decoration-[#ff4d00]"
                        : "text-black/75 underline decoration-black/25 underline-offset-2 hover:text-[#cc3d00] hover:decoration-[#cc3d00]"
                    }
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Review metadata — EEAT signal. */}
        {(lastReviewed || reviewedBy) && (
          <p
            className={`mt-5 text-[11px] leading-snug md:text-xs ${isDark ? "text-white/55" : "text-black/55"}`}
          >
            {lastReviewed && (
              <>
                <span className="font-bold uppercase tracking-wider">
                  Last reviewed:
                </span>{" "}
                {lastReviewed}
                {reviewedBy && <> · </>}
              </>
            )}
            {reviewedBy && (
              <>
                <span className="font-bold uppercase tracking-wider">
                  By:
                </span>{" "}
                {reviewedBy}
              </>
            )}
          </p>
        )}
      </div>
    </section>
  );
}

/**
 * PageGeoAnswerBlock — 1-line wrapper for the 49 hub pages.
 *
 * 2026-09-18 (R73 GEO): each host page does not need to import the
 * lookup helper, call it, and spread the result. This component does
 * the lookup by the page path so every page just needs:
 *
 *     <PageGeoAnswerBlock path="/products/" />
 *
 * If no TL;DR is registered for the path, it renders nothing — the
 * page remains unaffected.
 *
 * Side effect: when a TL;DR IS registered, the component also emits
 * a sibling <script type="application/ld+json"> containing a
 * SpeakableSpecification scoped to the page URL. The Speakable
 * contract uses `cssSelector: ["[data-speakable='true']"]` which
 * resolves to the question <h2> + answer <p> rendered by
 * <GeoAnswerBlock> above (both carry `data-speakable="true"`). This
 * gives Perplexity / ChatGPT Search / Gemini / Google AI Overviews a
 * stable, named answer surface that matches the @graph entity graph
 * (`isPartOf → #website`, `about → #organization`) without having to
 * edit the page-level speakable on every host page.
 */
export function PageGeoAnswerBlock({ path }: { path: string }) {
  const tldr = getPageTldr(path);
  if (!tldr) return null;
  const id = path === "/" ? "home-tldr" : `${path.replace(/\W+/g, "-").replace(/^-|-$/g, "")}-tldr`;
  const pageUrl = `https://sublimapparel.com${path}`;
  // 2026-09-18 (R73 GEO): sibling JSON-LD node carrying a
  // SpeakableSpecification scoped to the page URL. Schema.org allows
  // SpeakableSpecification to be emitted as a standalone @graph
  // node, in which case `url` scopes it to a single document so
  // search engines can attribute the speakable target to the
  // correct page rather than the global site. We also wire the
  // brand entity graph (isPartOf / about / inLanguage) so the
  // SpeakableSpecification joins the same #website + #organization
  // graph the page-level WebPage uses.
  const speakableNode = {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    "@id": `${pageUrl}#tldr-speakable`,
    url: pageUrl,
    inLanguage: "en",
    isPartOf: { "@id": "https://sublimapparel.com/#website" },
    about: { "@id": "https://sublimapparel.com/#organization" },
    xpath: ["/html/body//*[@data-speakable='true']"],
    cssSelector: ["[data-speakable='true']"],
  };
  return (
    <>
      <JsonLd data={speakableNode} />
      <GeoAnswerBlock {...tldr} id={id} />
    </>
  );
}