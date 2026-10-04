/**
 * POST /api/pi/[pi_number]/confirm-bank
 *
 * Customer confirms they have initiated a bank wire transfer (T/T).
 * Updates PI status to 'pending_bank' so the factory knows to watch for the wire.
 *
 * 2026-10-04 (R86): re-shaped the call site to pass
 * `{ request: context.request, env: context.env }` explicitly into
 * `handleConfirmBank`. The shared helper now takes that plain shape
 * instead of a wrapper interface, which lets us side-step the
 * Cloudflare-flavored Request vs. lib.dom Request structural-mismatch
 * that was tripping `next build`'s tsc check (the previous fix widened
 * `request: any` on a wrapper interface, but the wrapper's other fields
 * were still being compared structurally against the EventContext shape
 * and failing on the `Env` interface mismatch).
 *
 * Both the dedicated handler here and the catch-all `[[pi_number]].ts`
 * dispatcher wire into the same shared function in
 * `functions/api/pi/pi-actions/confirm-bank.ts`. Cloudflare's route
 * precedence prefers this file (static `confirm-bank` segment wins over
 * the catch-all), so this is the primary handler; the catch-all is a
 * safety net.
 */

import type { EventContext } from "@cloudflare/workers-types";
import { handleConfirmBank, CONFIRM_BANK_CORS_HEADERS } from "../pi-actions/confirm-bank";

interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

export const onRequestPost = async (
  context: EventContext<Env, string, Record<string, unknown>>,
): Promise<Response> => {
  return handleConfirmBank({ request: context.request, env: context.env });
};

export const onRequestOptions = async () => {
  return new Response(null, { status: 204, headers: CONFIRM_BANK_CORS_HEADERS });
};