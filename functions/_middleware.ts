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
// This middleware sits in front of the static assets, so next() falls
// through to the asset server for everything that is not blocked.

const ADMIN_PATH = "/administered";

interface MiddlewareContext {
  request: Request;
  next(): Promise<Response>;
}

export async function onRequest(
  context: MiddlewareContext,
): Promise<Response> {
  const url = new URL(context.request.url);
  const hostname = url.hostname.toLowerCase();
  const pathname = url.pathname;

  const isPagesHost = hostname.endsWith(".pages.dev");
  const isAdminPath =
    pathname === ADMIN_PATH || pathname.startsWith(ADMIN_PATH + "/");

  if (isPagesHost && isAdminPath) {
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