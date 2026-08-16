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
export function indexToProductNumber(index: number): string {
  return (index + 1).toString().padStart(4, "0");
}
