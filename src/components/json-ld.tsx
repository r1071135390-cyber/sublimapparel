/**
 * JsonLd — render one or more schema.org JSON-LD <script> tags.
 *
 * Two rendering modes:
 *
 * 1. Array / object (legacy): each item is a self-contained schema node
 *    with its own @context. Renders one <script> per item. Used by
 *    individual page-level schemas (FAQPage, HowTo, BreadcrumbList, etc.).
 *
 * 2. @graph wrapper (recommended for site-wide schemas): the data
 *    object has { "@context": "https://schema.org", "@graph": [...] }.
 *    Renders a single <script> with all nodes inside @graph. Google's
 *    Rich Results guidance is to use a single @graph for multi-entity
 *    sites so cross-references via @id resolve in one parse pass.
 *    https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
 */
export function JsonLd({ data }: { data: object | object[] }) {
  if (isGraph(data)) {
    return (
      <script
        type="application/ld+json"
        // dangerouslySetInnerHTML is required because the children of a
        // <script> tag in JSX are not parsed as raw HTML; the browser
        // would otherwise escape JSON quotes and break the payload.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    );
  }
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

function isGraph(data: object): data is { "@context": string; "@graph": object[] } {
  if (Array.isArray(data)) return false;
  const obj = data as Record<string, unknown>;
  return typeof obj === "object" && obj !== null && "@graph" in obj;
}
