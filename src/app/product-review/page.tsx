import fs from "node:fs";
import { buildPageMetadata } from "@/lib/page-metadata";
import path from "node:path";
import Link from "next/link";

export const metadata = buildPageMetadata({
    title: "Product Review",
    description: "Internal product / blank / tag review dashboards.",
    robots: { index: false, follow: false },
  });;

const tsvFiles = [
  { file: "01-products.tsv", title: "Products (120 SKUs)", desc: "Full product catalog with category, sports, scenarios." },
  { file: "02-categories.tsv", title: "Categories (13)", desc: "Apparel type categories (T-Shirt, Hoodie, Polo, ...)." },
  { file: "03-sports.tsv", title: "Sports (41)", desc: "Sport tags (Soccer, Basketball, Cycling, ...)." },
  { file: "04-scenarios.tsv", title: "Scenarios (29)", desc: "Use-case scenarios (Promo, Event, Corporate, ...)." },
  { file: "05-tag-archives-on-production.tsv", title: "Tag archives on production", desc: "83 tag archive URLs already deployed on sublimapparel.com." },
  { file: "06-real-product-counts.tsv", title: "Real product counts", desc: "Actual product counts per category, sport, scenario." },
  { file: "07-sportswear-reclassification.tsv", title: "Sportswear reclassification (v1)", desc: "38 products currently under 'Sportswear' — proposed re-classification." },
  { file: "08-sportswear-reclassification-v2.tsv", title: "Sportswear reclassification (v2)", desc: "v2 mapping, sports = sportswear, then split by product." },
  { file: "09-blanks-and-craft-services.tsv", title: "Ready-to-decorate blanks (25)", desc: "Blank apparel catalog + 4 craft services (sublimation / embroidery / heat transfer / screen print)." },
];

const htmlFiles = [
  { file: "classification-rules.html", title: "Classification rules", desc: "Data model: 12 categories × 66 scenarios (sports + scenarios merged)." },
  { file: "SITE-STATUS-REPORT.md", title: "Site status report", desc: "Direction A — current site status, gap analysis, 5 micro-copy tweaks." },
];

const pageFiles = [
  { href: "/product-review/09-blanks/", title: "Blanks catalog (HTML view)", desc: "Browse the 25 blank styles in a card layout." },
];

function listTsv() {
  const dir = path.join(process.cwd(), "public/product-review");
  return tsvFiles
    .map((f) => {
      const full = path.join(dir, f.file);
      const exists = fs.existsSync(full);
      let lineCount = 0;
      if (exists) {
        const text = fs.readFileSync(full, "utf-8");
        lineCount = text.split(/\r?\n/).filter(Boolean).length;
      }
      return { ...f, exists, lineCount };
    });
}

function listHtml() {
  const dir = path.join(process.cwd(), "public/product-review");
  return htmlFiles
    .map((f) => {
      const full = path.join(dir, f.file);
      const exists = fs.existsSync(full);
      return { ...f, exists };
    });
}

export default function ProductReviewIndex() {
  const tsvs = listTsv();
  const htmls = listHtml();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16">
      <h1 className="mb-2 text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
        Product Review
      </h1>
      <p className="mb-8 max-w-3xl text-sm text-black/70 md:text-base">
        Internal review dashboard. Not indexed. Raw TSV data + supporting docs.
      </p>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-black uppercase tracking-tight">TSV data files</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {tsvs.map((f) => (
            <a
              key={f.file}
              href={`/product-review/${f.file}`}
              className={
                "block rounded border p-4 transition-shadow hover:shadow-md " +
                (f.exists ? "border-black/15 bg-white" : "border-dashed border-black/20 bg-black/5 opacity-60")
              }
            >
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#cc3d00]">
                {f.exists ? `${f.lineCount} rows` : "missing"}
              </div>
              <div className="text-base font-black leading-tight">{f.title}</div>
              <div className="mt-1 text-xs text-black/60">{f.desc}</div>
              <div className="mt-2 truncate font-mono text-[10px] text-black/40">{f.file}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-black uppercase tracking-tight">Markdown / HTML</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {htmls.map((f) => (
            <a
              key={f.file}
              href={`/product-review/${f.file}`}
              className={
                "block rounded border p-4 transition-shadow hover:shadow-md " +
                (f.exists ? "border-black/15 bg-white" : "border-dashed border-black/20 bg-black/5 opacity-60")
              }
            >
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#0078a8]">
                {f.exists ? "available" : "missing"}
              </div>
              <div className="text-base font-black leading-tight">{f.title}</div>
              <div className="mt-1 text-xs text-black/60">{f.desc}</div>
              <div className="mt-2 truncate font-mono text-[10px] text-black/40">{f.file}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-xl font-black uppercase tracking-tight">HTML views</h2>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {pageFiles.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="block rounded border border-black/15 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#cc3d00]">
                React page
              </div>
              <div className="text-base font-black leading-tight">{f.title}</div>
              <div className="mt-1 text-xs text-black/60">{f.desc}</div>
              <div className="mt-2 truncate font-mono text-[10px] text-black/40">{f.href}</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
