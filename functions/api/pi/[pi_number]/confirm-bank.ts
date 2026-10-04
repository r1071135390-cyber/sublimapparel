/**
 * POST /api/pi/[pi_number]/confirm-bank
 *
 * Customer confirms they have initiated a bank wire transfer (T/T).
 * Updates PI status to 'pending_bank' so the factory knows to watch for the wire.
 *
 * 2026-10-04 (R85): the actual logic now lives in
 * `functions/api/pi/_actions/confirm-bank.ts` and is re-exported here.
 * This file exists as the canonical route — Cloudflare Pages Functions
 * prefers files with static trailing segments over the catch-all
 * `[[pi_number]].ts`, so this is the primary handler. The catch-all
 * dispatches to the same shared function as a safety net.
 */

import type { EventContext } from "@cloudflare/workers-types";
import { handleConfirmBank, CONFIRM_BANK_CORS_HEADERS } from "../_actions/confirm-bank";

interface Env {
  COZE_SUPABASE_URL: string;
  COZE_SUPABASE_SERVICE_ROLE_KEY: string;
}

export const onRequestPost = async (
  context: EventContext<Env, string, Record<string, unknown>>,
): Promise<Response> => {
  return handleConfirmBank(context);
};

export const onRequestOptions = async () => {
  return new Response(null, { status: 204, headers: CONFIRM_BANK_CORS_HEADERS });
};
