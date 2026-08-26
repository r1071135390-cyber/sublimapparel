/**
 * Shared helpers for Cloudflare Pages Functions.
 *
 * Centralised so that misconfigured env vars surface a clear, consistent
 * error and so the rest of the codebase can stay focused on its own logic.
 */

/**
 * Normalise a Supabase project URL read from a Cloudflare Pages
 * environment variable.
 *
 * Trims surrounding whitespace and strips any trailing characters that
 * would turn a valid Supabase origin into a non-resolvable host
 * (trailing dash, trailing slash, etc.). We have seen at least one
 * case where `COZE_SUPABASE_URL` was saved with a stray `-` at the
 * end — Cloudflare happily stores it, the `fetch()` to
 * `https://x.supabase.co-` then resolves nothing, and the Supabase
 * gateway returns `error code: 1016`. Trimming it here makes the
 * function recover automatically and also keeps a clear comment in
 * the eventual error string.
 */
export function normalizeSupabaseUrl(raw: string | undefined | null): string {
  if (!raw) return "";
  // 1) trim whitespace / control chars
  // 2) drop trailing whitespace, slashes, and dashes (we've seen `-`
  //    pasted by accident; harmless if not present)
  return raw.trim().replace(/[\s/\-]+$/, "");
}
