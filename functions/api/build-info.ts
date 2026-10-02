// functions/api/build-info.ts
//
// GET /api/build-info — reports which commit is currently deployed.
//
// Useful when a Cloudflare Pages build is suspected to have lagged behind
// git HEAD. The endpoint reads the build-time env vars CF Pages injects:
//
//   CF_PAGES_COMMIT_SHA       — SHA of the deployed commit
//   CF_PAGES_BRANCH           — branch name (main for production)
//   CF_PAGES_URL              — preview URL (production branch returns subdomain)
//   CF_PAGES_DEPLOYMENT_ID    — CF internal deployment id
//
// Plus the latest 5 commits from git log via /api/git-info when available.
//
// DELETE once we stop getting "my commit didn't deploy" support pings.

interface Env {
  CF_PAGES_COMMIT_SHA?: string;
  CF_PAGES_BRANCH?: string;
  CF_PAGES_URL?: string;
  CF_PAGES_DEPLOYMENT_ID?: string;
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

export async function onRequestOptions(): Promise<Response> {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function onRequestGet(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const { env } = context;
  return jsonResponse({
    deployment: {
      commit_sha: env.CF_PAGES_COMMIT_SHA ?? null,
      branch: env.CF_PAGES_BRANCH ?? null,
      url: env.CF_PAGES_URL ?? null,
      deployment_id: env.CF_PAGES_DEPLOYMENT_ID ?? null,
    },
    hint:
      "If commit_sha does not match the latest commit on main, Cloudflare Pages skipped the most recent build. Common causes: free-tier build quota exhausted, 5-minute build timeout, or build script failure.",
    instructions:
      "Compare commit_sha with: curl -s https://api.github.com/repos/r1071135390-cyber/sublimapparel/commits/main | jq -r .sha",
  });
}