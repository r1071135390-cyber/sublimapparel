import { readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const PUBLIC_DIR = join(process.cwd(), "public");
const PRODUCTS_DIR = join(PUBLIC_DIR, "products");

/**
 * Get list of product image paths for a given 4-digit product number.
 * Returns paths like ["/products/0001/1.webp", "/products/0001/2.webp", ...]
 * Sorted by filename (1, 2, 3, ...).
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
  return webpFiles.map((f) => `/products/${productNumber}/${f}`);
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
  let h = Math.abs(hash);

  while (picked.length < count && seen.size < pool.length) {
    const idx = h % pool.length;
    const num = pool[idx];
    if (!seen.has(num)) {
      seen.add(num);
      picked.push(`/products/${num}/1.webp`);
    }
    h = (h * 1103515245 + 12345) >>> 0; // LCG step
    if (h === 0) h = 1;
  }

  return picked;
}
