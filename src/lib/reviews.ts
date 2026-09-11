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
  /**
   * 2026-09-11 (R28): optional link to a specific case study
   * (matches `CaseStudy.id` in src/lib/cases.ts). When set, this review
   * shows up on /cases/[slug]/[caseId]/ (or on the industry hub if
   * relatedIndustrySlug is also set). When unset, the review is
   * industry-level only and shows up on /about/ + the matching
   * /cases/[slug]/ hub.
   */
  relatedCaseId?: string;
  /**
   * 2026-09-11 (R28): optional link to an industry slug (matches
   * `IndustryCase.slug` in src/lib/cases.ts). Lets an industry-level
   * review (e.g. "SublimApparel handled our entire 14,000-piece festival
   * run") be surfaced on the matching /cases/[slug]/ hub without
   * binding to one specific case study.
   */
  relatedIndustrySlug?: string;
  /**
   * 2026-09-11 (R30): optional link to a product catalog slug
   * (matches `Product.slug` in src/lib/products-data.ts). When set,
   * this review shows up on /products/all/[slug]/ — Google's
   * preferred shape for Product rich-results is to embed the
   * review + aggregateRating directly inside the Product JSON-LD
   * node, not as a sibling Service node. A product-level review
   * ("These jerseys survived 40 washes with no fade") is the
   * highest-intent surface a buyer sees before clicking Get a quote.
   */
  relatedProductSlug?: string;
  /**
   * 2026-09-11 (R31): optional link to a blog post slug (matches
   * `Post.slug` in src/lib/blog-data.ts). When set, this review shows
   * up on /blog/[slug]/. Used for buyer comments on tutorial / case
   * study posts where the review is content-specific (e.g. "Following
   * your wash-care guide reduced our shrinkage claims 80%") rather
   * than product-specific. Embedded into the BlogPosting node.
   */
  relatedBlogSlug?: string;
  /**
   * 2026-09-11 (R31): optional link to a fabric catalog slug
   * (matches `Fabric.slug` in src/lib/fabric-data.ts). When set, this
   * review shows up on /fabric/[slug]/, embedded into the Product
   * JSON-LD node (R30 /fabric/[slug]/ uses the same Product schema
   * shape, so we re-use the embedded review/aggregateRating pattern).
   */
  relatedFabricSlug?: string;
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
 * 2026-09-11 (R28): returns the subset of reviews attached to a given
 * industry slug — i.e. reviews whose `relatedIndustrySlug` matches
 * the supplied slug. Used by /cases/[slug]/ (industry hub) to surface
 * industry-level buyer feedback. Pass the full industry slugs list
 * (from src/lib/cases.ts) and an explicit case-id set; a review matches
 * when its industry slug matches OR when its case id is in the set.
 */
export function filterReviewsForIndustry(
  industrySlug: string,
  caseIdsInIndustry: string[],
  reviews: VerifiedReview[] = verifiedReviews
): VerifiedReview[] {
  const caseIdSet = new Set(caseIdsInIndustry);
  return reviews.filter(
    (r) =>
      r.relatedIndustrySlug === industrySlug ||
      (typeof r.relatedCaseId === "string" && caseIdSet.has(r.relatedCaseId))
  );
}

/**
 * 2026-09-11 (R28): returns the subset of reviews attached to a single
 * case study. Used by future /cases/[slug]/[caseId]/ pages. Today those
 * pages do not exist (the gallery links to a route that is not yet
 * implemented), so this helper is exported for forward compatibility
 * and unit tests.
 */
export function filterReviewsForCase(
  caseId: string,
  reviews: VerifiedReview[] = verifiedReviews
): VerifiedReview[] {
  return reviews.filter((r) => r.relatedCaseId === caseId);
}

/**
 * 2026-09-11 (R30): returns the subset of reviews attached to a
 * product catalog slug. Used by /products/all/[slug]/ — the most
 * decision-critical surface for a buyer who has already opened a
 * product detail page and is comparing this product to alternatives.
 * The result feeds both the embedded `review` + `aggregateRating`
 * fields inside the Product JSON-LD node and the on-page "Buyer
 * feedback" UI section.
 */
export function filterReviewsForProduct(
  productSlug: string,
  reviews: VerifiedReview[] = verifiedReviews
): VerifiedReview[] {
  return reviews.filter((r) => r.relatedProductSlug === productSlug);
}

/**
 * 2026-09-11 (R31): returns the subset of reviews attached to a
 * blog post slug. Used by /blog/[slug]/. A blog-level review
 * ("Following your wash-care guide reduced our shrinkage claims 80%")
 * is content-specific rather than product-specific — the buyer
 * reacted to a tutorial, not a product. Embedded into the
 * BlogPosting node.
 */
export function filterReviewsForBlog(
  blogSlug: string,
  reviews: VerifiedReview[] = verifiedReviews
): VerifiedReview[] {
  return reviews.filter((r) => r.relatedBlogSlug === blogSlug);
}

/**
 * 2026-09-11 (R31): returns the subset of reviews attached to a
 * fabric catalog slug. Used by /fabric/[slug]/. A fabric-level
 * review ("The 220gsm polyester survived 40 wash cycles with no
 * fade") is the highest-intent surface for a buyer choosing between
 * fabric options before they even open a product detail page.
 * Embedded into the Product JSON-LD node (same shape as R30).
 */
export function filterReviewsForFabric(
  fabricSlug: string,
  reviews: VerifiedReview[] = verifiedReviews
): VerifiedReview[] {
  return reviews.filter((r) => r.relatedFabricSlug === fabricSlug);
}

/**
 * 2026-09-11 (R28): convenience for /about/. Today every review is
 * surfaced on /about/ — there is no negative-targeting — so this
 * simply returns the whole list. Kept as a function so future
 * review-segmentation work (e.g. "only show reviews older than 6
 * months on /about/") has a single hook to extend.
 */
export function filterReviewsForAbout(
  reviews: VerifiedReview[] = verifiedReviews
): VerifiedReview[] {
  return reviews;
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
