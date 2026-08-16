/**
 * Client-safe product image helpers.
 *
 * This file MUST NOT import `node:fs`, `node:path`, or anything else
 * that isn't available in the browser bundle. The 0.webp / 1.webp
 * detection is intentionally omitted here — clients always try 0.webp
 * first and fall back to 1.webp via the `onError` handler.
 *
 * Server-side code that needs the "real" main image should use
 * `getMainImagePath` from `@/lib/product-images` (which uses fs).
 */

/**
 * Returns the preferred main image source for a product.
 * On the client we always try 0.webp first; if it 404s the consumer
 * should fall back to 1.webp via onError.
 */
export function getProductMainSrc(productNumber: string): string {
  if (!/^\d{4}$/.test(productNumber)) {
    return "/products/0001/1.webp";
  }
  return `/products/${productNumber}/0.webp`;
}

/**
 * Gallery images for a product. On the client we don't know which
 * files exist on disk, so we just return the conventional sequence.
 * The 0.webp cover is included as the first entry (and skipped via
 * the same onError pattern if missing).
 */
export function getProductGallerySrcs(productNumber: string): string[] {
  if (!/^\d{4}$/.test(productNumber)) return [];
  return [`/products/${productNumber}/0.webp`];
}
