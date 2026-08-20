import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const PUBLIC_DIR = join(process.cwd(), "public");
const PRODUCTS_DIR = join(PUBLIC_DIR, "products");

/**
 * Pick the main image filename for a product.
 * Rule: if `<num>/0.webp` exists, use that as the hero / cover; otherwise
 * fall back to `1.webp`. The `0.webp` is treated as a designated cover image
 * and is excluded from the regular gallery listing.
 */
export function getMainImageName(productNumber: string): string {
  if (!/^\d{4}$/.test(productNumber)) return "1.webp";
  if (existsSync(join(PRODUCTS_DIR, productNumber, "0.webp"))) {
    return "0.webp";
  }
  return "1.webp";
}

/**
 * Absolute public path of the main image for a product, e.g.
 * `/products/0001/0.webp` or `/products/0001/1.webp`.
 */
export function getMainImagePath(productNumber: string): string {
  return `/products/${productNumber}/${getMainImageName(productNumber)}`;
}

/**
 * Get list of product image paths for a given 4-digit product number.
 * Returns paths like ["/products/0001/1.webp", "/products/0001/2.webp", ...]
 * Sorted by filename (1, 2, 3, ...). The designated main image
 * (0.webp if present) is placed first.
 *
 * This function runs at build time (during static generation), so filesystem
 * access is safe.
 */
export function getProductImages(productNumber: string): string[] {
  if (!/^\d{4}$/.test(productNumber)) {
    return [];
  }
  const dir = join(PRODUCTS_DIR, productNumber);
  if (!existsSync(dir)) {
    return [];
  }
  const files = readdirSync(dir);
  const webpFiles = files
    .filter((f) => f.endsWith(".webp"))
    .sort((a, b) => {
      // Sort numerically: 1.webp, 2.webp, ..., 10.webp
      const na = parseInt(a.split(".")[0], 10);
      const nb = parseInt(b.split(".")[0], 10);
      return na - nb;
    });
  const main = getMainImageName(productNumber);
  const mainPath = main === "1.webp" ? null : `/products/${productNumber}/${main}`;
  const others = webpFiles
    .filter((f) => f !== main)
    .map((f) => `/products/${productNumber}/${f}`);
  return mainPath ? [mainPath, ...others] : others;
}

/**
 * Get product number (4-digit string) from 1-based index in the products array.
 */
export type ProductLike = { number?: string; id: string };

export function indexToProductNumber(index: number): string {
  return (index + 1).toString().padStart(4, "0");
}

/**
 * Pick N product first-image URLs deterministically based on a seed string.
 * Used for archive/tag page heroes — gives a stable "random" feel
 * so the hero doesn't change between builds but varies between pages.
 *
 * Uses each product's main image (0.webp if designated, else 1.webp).
 * Skips products that have no images.
 */
export function pickHeroImages(
  products: ProductLike[],
  count: number,
  seed: string,
): string[] {
  // Simple hash of the seed string
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const pool = products
    .map((p) => p.number)
    .filter((n): n is string => !!n && /^\d{4}$/.test(n) && getProductImages(n).length > 0);

  if (pool.length === 0) return [];

  const picked: string[] = [];
  const seen = new Set<string>();
  let h = Math.abs(hash) | 1; // ensure odd to avoid 2-bit periodic stuck states

  // Hard iteration limit to guarantee termination even with poor LCG mixing.
  const maxIters = pool.length * 64 + 16;
  let iter = 0;
  while (picked.length < count && seen.size < pool.length && iter < maxIters) {
    const idx = h % pool.length;
    const num = pool[idx];
    if (!seen.has(num)) {
      seen.add(num);
      picked.push(getMainImagePath(num));
    }
    // Use Math.imul for 32-bit precision and a better-mixing multiplier.
    h = (Math.imul(h, 2654435761) + 1013904223) >>> 0;
    if (h === 0) h = 1;
    iter++;
  }
  // Fallback: fill remaining slots sequentially if loop exited early.
  for (const num of pool) {
    if (picked.length >= count) break;
    if (!seen.has(num)) {
      seen.add(num);
      picked.push(getMainImagePath(num));
    }
  }

  return picked;
}

/**
 * Pick N product images AND alt-text, paired. Same deterministic seeding as
 * `pickHeroImages`. The alt string is built from the product's name + category
 * so screen readers and crawlers see unique, descriptive text on every slide.
 */
export type NamedProduct = {
  number?: string;
  id: string;
  name: string;
  category: string;
};

export function pickHeroImagesWithAlts(
  products: NamedProduct[],
  count: number,
  seed: string,
): { src: string; alt: string }[] {
  // Same seed hash as pickHeroImages so the order is stable.
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  const pool = products
    .filter(
      (p) =>
        !!p.number &&
        /^\d{4}$/.test(p.number) &&
        getProductImages(p.number).length > 0,
    );

  if (pool.length === 0) return [];

  const picked: NamedProduct[] = [];
  const seen = new Set<string>();
  let h = Math.abs(hash) | 1; // ensure odd to avoid 2-bit periodic stuck states

  // Hard iteration limit to guarantee termination even with poor LCG mixing.
  const maxIters = pool.length * 64 + 16;
  let iter = 0;
  while (picked.length < count && seen.size < pool.length && iter < maxIters) {
    const idx = h % pool.length;
    const p = pool[idx];
    if (!seen.has(p.id)) {
      seen.add(p.id);
      picked.push(p);
    }
    // Use Math.imul for 32-bit precision and a better-mixing multiplier.
    h = (Math.imul(h, 2654435761) + 1013904223) >>> 0;
    if (h === 0) h = 1;
    iter++;
  }
  // Fallback: if we exited the loop early, fill remaining slots sequentially.
  for (const p of pool) {
    if (picked.length >= count) break;
    if (!seen.has(p.id)) {
      seen.add(p.id);
      picked.push(p);
    }
  }

  return picked.map((p) => ({
    src: getMainImagePath(p.number!),
    alt: `${p.name} — custom ${p.category.toLowerCase()} from SublimApparel`,
  }));
}
