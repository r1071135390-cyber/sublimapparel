// functions/_middleware.ts
//
// R126-J: keep the admin surface off the *.pages.dev deployment host.
//
// sublimapparel.com is fronted by a Cloudflare Access application that
// demands an OTP login before /administered is served. The same Pages
// deployment is also reachable at sublimapparel.pages.dev, and that
// hostname is not part of the zone, so the Access policy never sees it —
// the admin UI was loadable straight from the pages.dev host.
//
// The Access application cannot be extended to pages.dev with the API token
// this project deploys with (account-level Access writes answer 403), so
// the deployment host is rejected here instead. The admin pages are served
// from the protected custom domain only.
//
// R129: the check is no longer a literal string comparison. The Pages asset
// server resolves "/%61dministered/", "/administered%2f" and
// "//administered/" to the very same admin document, so the path is
// normalized before it is compared: escapes decoded, backslashes treated
// as separators, repeated separators collapsed.
//
// The admin API endpoints are rejected on the deployment host as well.
// Otherwise the Access gate could be skipped by talking to the API
// directly, which is the one thing the gate exists for.
//
// This middleware sits in front of the static assets, so next() falls
// through to the asset server for everything that is not blocked.

const ADMIN_PATH = "/administered";
const ADMIN_API_PREFIX = "/api/admin/";

interface MiddlewareContext {
  request: Request;
  next(): Promise<Response>;
}

/**
 * Percent-decode without throwing on malformed sequences.
 *
 * decodeURIComponent() rejects a path as soon as one escape is invalid
 * ("/%zz"), which would let a payload hide behind a broken escape.
 * Decoding byte by byte keeps the comparison total: every valid escape is
 * decoded, invalid ones are left in place.
 */
export function decodePathEscapes(value: string): string {
  return value.replace(/%([0-9a-fA-F]{2})/g, (_match, hex: string) =>
    String.fromCharCode(parseInt(hex, 16)),
  );
}

/**
 * Bring a request path into the shape the asset server resolves against:
 * escapes decoded, backslashes turned into separators, repeated separators
 * collapsed.
 *
 * Decoding runs twice so a doubly encoded path ("%2561dministered") is
 * caught as well. Over-blocking costs nothing here: the comparison only
 * asks "is this the admin surface", and the asset server would have to
 * decode the path twice as well to reach the admin file.
 */
export function normalizeRequestPath(pathname: string): string {
  let decoded = pathname;
  for (let pass = 0; pass < 2; pass += 1) {
    const next = decodePathEscapes(decoded);
    if (next === decoded) break;
    decoded = next;
  }
  return decoded.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
}

/**
 * True when the path resolves to the admin UI.
 */
export function isAdminPagePath(pathname: string): boolean {
  const normalized = normalizeRequestPath(pathname);
  return normalized === ADMIN_PATH || normalized.startsWith(ADMIN_PATH + "/");
}

/**
 * True when the path resolves to an admin-only API endpoint.
 */
export function isAdminApiPath(pathname: string): boolean {
  return normalizeRequestPath(pathname).startsWith(ADMIN_API_PREFIX);
}

export async function onRequest(
  context: MiddlewareContext,
): Promise<Response> {
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();
  const pathname = url.pathname;

  const isPagesHost = hostname.endsWith(".pages.dev");
  const isBlocked = isAdminPagePath(pathname) || isAdminApiPath(pathname);

  if (isPagesHost && isBlocked) {
    return new Response("Not Found", {
      status: 404,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return context.next();
}
