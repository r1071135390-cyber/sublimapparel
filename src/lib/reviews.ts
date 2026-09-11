// 2026-09-11 (R27): Centralized, single source of truth for verified
// customer reviews. The /about/ page imports this file to drive both:
//   (1) the on-page "Trusted by buyers worldwide" UI block, and
//   (2) the Review / AggregateRating JSON-LD emitted on /about/.
//
// Why this file exists (and why it is empty by default)
// ----------------------------------------------------
// Google explicitly forbids fabricated ratings in structured data — see
// https://developers.google.com/search/docs/appearance/structured-data/review-snippet#guidelines
// "Reviewer must be a real person who actually used the product/service,
//  and the rating must reflect that person's genuine experience."
// "Self-serving reviews are not allowed."
// "Reviews should be collected directly from users, not invented."
//
// We do not currently publish a public, verifiable star-rating feed
// (no Trustpilot / Google Business Profile / Alibaba review widget is
// live on sublimapparel.com as of 2026-09-11). Until a real, public
// review feed is wired up, this array MUST stay empty. Emitting an
// aggregateRating with synthesized ratingValue / reviewCount would
// (a) violate Google's structured data spam policy, and
// (b) be flagged by Rich Results Test as ineligible for stars.
//
// How to activate the Review + AggregateRating schema later
// ---------------------------------------------------------
// When the team decides to expose public reviews (recommended path:
// add a Trustpilot / Google Business Profile widget on /about/, and
// also feed those same reviews into this file once a quarter), populate
// the `verifiedReviews` array below with one entry per real review.
// Each entry MUST satisfy:
//   - author is a real named individual OR a real organization (e.g.
//     "Midwest Victory PAC" — already a public case-study client).
//   - reviewBody is a verbatim quote (or near-verbatim) from a public
//     review source OR a signed, opt-in follow-up email from the
//     customer. Do not paraphrase into marketing copy.
//   - source is one of: 'case-study', 'email', 'linkedin', 'alibaba',
//     'trustpilot', 'google-business', 'trade-show'.
//   - url is a publicly accessible link to the review source, OR
//     undefined when the review comes from a private email.
//   - datePublished is the ISO date the review was originally posted.
//   - ratingValue is 1-5 inclusive. Only include when the rating was
//     given explicitly by the reviewer (e.g. 5 stars on Trustpilot).
//
// Once verifiedReviews has ≥ 1 entry with a ratingValue, the /about/
// JSON-LD will automatically start emitting `review: [...]` and
// `aggregateRating: {...}` blocks. No additional code change needed.

export type ReviewSource =
  | "case-study"
  | "email"
  | "linkedin"
  | "alibaba"
  | "trustpilot"
  | "google-business"
  | "trade-show";

export type VerifiedReview = {
  /** Stable, URL-safe id (e.g. "midwest-victory-pac-2024"). */
  id: string;
  /** Real individual or organization that wrote the review. */
  author: string;
  /** Optional job title / role at author (e.g. "Race Director"). */
  authorRole?: string;
  /** ISO-8601 date the review was originally posted (e.g. "2024-11-12"). */
  datePublished: string;
  /** Verbatim or near-verbatim quote. Keep it short (1–3 sentences). */
  reviewBody: string;
  /** 1–5 inclusive. Required for the JSON-LD to count toward aggregateRating. */
  ratingValue?: number;
  /** Public source URL (Trustpilot page, LinkedIn post, etc.). Optional. */
  url?: string;
  /** Source type — required for the review to be auditable later. */
  source: ReviewSource;
};

/**
 * Active public reviews. Empty until a real review feed is wired up.
 * See the file header for the activation criteria.
 */
export const verifiedReviews: VerifiedReview[] = [];

/**
 * Returns true when at least one entry has a usable rating — the gate
 * for emitting `aggregateRating` in JSON-LD. Google requires a real
 * reviewCount + ratingValue pair; we never fabricate these.
 */
export function hasAggregateableReviews(
  reviews: VerifiedReview[] = verifiedReviews
): boolean {
  return reviews.some(
    (r) =>
      typeof r.ratingValue === "number" &&
      r.ratingValue >= 1 &&
      r.ratingValue <= 5
  );
}

/**
 * Computes the mean rating and total count for the JSON-LD
 * aggregateRating block. Returns null when no eligible review exists,
 * so the caller can omit the block entirely.
 */
export function computeAggregateRating(
  reviews: VerifiedReview[] = verifiedReviews
): { ratingValue: number; reviewCount: number; bestRating: 5; worstRating: 1 } | null {
  const eligible = reviews.filter(
    (r) =>
      typeof r.ratingValue === "number" &&
      r.ratingValue >= 1 &&
      r.ratingValue <= 5
  );
  if (eligible.length === 0) return null;
  const sum = eligible.reduce((acc, r) => acc + (r.ratingValue as number), 0);
  const avg = Math.round((sum / eligible.length) * 10) / 10; // 1 decimal
  return {
    ratingValue: avg,
    reviewCount: eligible.length,
    bestRating: 5,
    worstRating: 1,
  };
}

/**
 * Maps a VerifiedReview into a schema.org Review node ready for JSON-LD.
 * Kept here (not in the page component) so /about/, /cases/[slug]/,
 * and any future review-touching page all emit identical shapes.
 */
export function toSchemaReview(r: VerifiedReview) {
  return {
    "@type": "Review" as const,
    author: {
      "@type": "Person" as const,
      name: r.author,
      ...(r.authorRole ? { jobTitle: r.authorRole } : {}),
    },
    datePublished: r.datePublished,
    reviewBody: r.reviewBody,
    ...(typeof r.ratingValue === "number"
      ? {
          reviewRating: {
            "@type": "Rating" as const,
            ratingValue: r.ratingValue,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    ...(r.url ? { url: r.url } : {}),
  };
}
