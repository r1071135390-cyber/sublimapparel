import { onRequestOptions as __api_pi_confirm_bank_ts_onRequestOptions } from "/workspace/projects/functions/api/pi/confirm-bank.ts"
import { onRequestPost as __api_pi_confirm_bank_ts_onRequestPost } from "/workspace/projects/functions/api/pi/confirm-bank.ts"
import { onRequestOptions as __api_pi_create_ts_onRequestOptions } from "/workspace/projects/functions/api/pi/create.ts"
import { onRequestPost as __api_pi_create_ts_onRequestPost } from "/workspace/projects/functions/api/pi/create.ts"
import { onRequestGet as __api_pi_get_ts_onRequestGet } from "/workspace/projects/functions/api/pi/get.ts"
import { onRequestOptions as __api_pi_get_ts_onRequestOptions } from "/workspace/projects/functions/api/pi/get.ts"
import { onRequestGet as __api_pi_next_number_ts_onRequestGet } from "/workspace/projects/functions/api/pi/next-number.ts"
import { onRequestPost as __api_pi_parse_ts_onRequestPost } from "/workspace/projects/functions/api/pi/parse.ts"
import { onRequestPost as __api_stripe_checkout_session_ts_onRequestPost } from "/workspace/projects/functions/api/stripe/checkout-session.ts"
import { onRequestPost as __api_stripe_create_payment_intent_ts_onRequestPost } from "/workspace/projects/functions/api/stripe/create-payment-intent.ts"
import { onRequestPost as __api_stripe_webhook_ts_onRequestPost } from "/workspace/projects/functions/api/stripe/webhook.ts"

export const routes = [
    {
      routePath: "/api/pi/confirm-bank",
      mountPath: "/api/pi",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_pi_confirm_bank_ts_onRequestOptions],
    },
  {
      routePath: "/api/pi/confirm-bank",
      mountPath: "/api/pi",
      method: "POST",
      middlewares: [],
      modules: [__api_pi_confirm_bank_ts_onRequestPost],
    },
  {
      routePath: "/api/pi/create",
      mountPath: "/api/pi",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_pi_create_ts_onRequestOptions],
    },
  {
      routePath: "/api/pi/create",
      mountPath: "/api/pi",
      method: "POST",
      middlewares: [],
      modules: [__api_pi_create_ts_onRequestPost],
    },
  {
      routePath: "/api/pi/get",
      mountPath: "/api/pi",
      method: "GET",
      middlewares: [],
      modules: [__api_pi_get_ts_onRequestGet],
    },
  {
      routePath: "/api/pi/get",
      mountPath: "/api/pi",
      method: "OPTIONS",
      middlewares: [],
      modules: [__api_pi_get_ts_onRequestOptions],
    },
  {
      routePath: "/api/pi/next-number",
      mountPath: "/api/pi",
      method: "GET",
      middlewares: [],
      modules: [__api_pi_next_number_ts_onRequestGet],
    },
  {
      routePath: "/api/pi/parse",
      mountPath: "/api/pi",
      method: "POST",
      middlewares: [],
      modules: [__api_pi_parse_ts_onRequestPost],
    },
  {
      routePath: "/api/stripe/checkout-session",
      mountPath: "/api/stripe",
      method: "POST",
      middlewares: [],
      modules: [__api_stripe_checkout_session_ts_onRequestPost],
    },
  {
      routePath: "/api/stripe/create-payment-intent",
      mountPath: "/api/stripe",
      method: "POST",
      middlewares: [],
      modules: [__api_stripe_create_payment_intent_ts_onRequestPost],
    },
  {
      routePath: "/api/stripe/webhook",
      mountPath: "/api/stripe",
      method: "POST",
      middlewares: [],
      modules: [__api_stripe_webhook_ts_onRequestPost],
    },
  ]