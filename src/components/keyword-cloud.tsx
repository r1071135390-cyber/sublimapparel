import Link from "next/link";
import { CATEGORY_TAGS, SPORT_TAGS, SCENARIO_TAGS, ALL_TAGS } from "@/lib/tag-archive";
import { tagArchiveLink } from "@/lib/tag-utils";

type TagDimension = "category" | "sport" | "scenario";

const DIMENSION_LABELS: Record<TagDimension, string> = {
  category: "Categories",
  sport: "Sports",
  scenario: "Scenarios",
};

const DIMENSION_ICON: Record<TagDimension, string> = {
  category: "📦",
  sport: "🏆",
  scenario: "🎯",
};

/**
 * Renders a keyword cloud for a specific tag dimension.
 * Used to inject SEO keywords into pages and footers.
 */
export function KeywordCloud({
  dimension,
  title,
  exclude = [],
  className = "",
  maxItems,
  size = "md",
  showHeading = true,
  variant = "default",
}: {
  dimension: TagDimension;
  /** Custom heading text (overrides default "Browse X (N)") */
  title?: string;
  /** Slugs or display names to exclude */
  exclude?: string[];
  className?: string;
  maxItems?: number;
  size?: "sm" | "md" | "lg";
  showHeading?: boolean;
  variant?: "default" | "compact" | "bordered";
}) {
  const tags = ALL_TAGS[dimension];
  const items = Object.entries(tags).filter(([key]) => !exclude.includes(key));
  const visible = maxItems ? items.slice(0, maxItems) : items;

  const sizeClasses = {
    sm: "text-[10px] px-2 py-1",
    md: "text-xs px-2.5 py-1.5",
    lg: "text-sm px-3 py-2",
  }[size];

  const baseLink =
    variant === "compact"
      ? `inline-flex items-center gap-1 ${sizeClasses} font-bold uppercase tracking-wide text-black transition-colors hover:text-[#cc3d00]`
      : variant === "bordered"
        ? `inline-flex items-center gap-1.5 ${sizeClasses} font-bold uppercase tracking-wide border-2 border-black bg-white text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#ff4d00] hover:bg-[#ff4d00] hover:text-black hover:shadow-[2px_2px_0_0_#000]`
        : `inline-flex items-center gap-1.5 ${sizeClasses} font-bold uppercase tracking-wide rounded-sm bg-black/5 text-black transition-all hover:bg-[#ff4d00] hover:text-black`;

  return (
    <div className={className}>
      {showHeading && (
        <div className="mb-3 flex items-center gap-2">
          <span aria-hidden="true" className="text-base">
            {DIMENSION_ICON[dimension]}
          </span>
          <h3 className="text-xs font-black uppercase tracking-widest text-[#cc3d00]">
            {title ?? `Browse ${DIMENSION_LABELS[dimension].toLowerCase()} (${items.length})`}
          </h3>
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {visible.map(([key, info]) => {
          const href = tagArchiveLink(dimension, key);
          const icon = (info as { icon?: string }).icon;
          return (
            <Link key={key} href={href} className={baseLink}>
              {icon && variant !== "compact" && (
                <span aria-hidden="true" className="text-sm">
                  {icon}
                </span>
              )}
              {info.label}
            </Link>
          );
        })}
        {maxItems && items.length > maxItems && (
          <span className="inline-flex items-center px-2 text-[10px] font-bold uppercase tracking-wide text-black/50">
            +{items.length - maxItems} more
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Renders all three dimensions (categories, sports, scenarios) as a stacked cloud.
 * Designed for the footer.
 */
export function FullKeywordCloud({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="grid gap-6 md:grid-cols-3">
        <KeywordCloud dimension="category" size="sm" variant="bordered" />
        <KeywordCloud dimension="sport" size="sm" variant="bordered" />
        <KeywordCloud dimension="scenario" size="sm" variant="bordered" />
      </div>
    </div>
  );
}
