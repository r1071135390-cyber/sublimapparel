/**
 * Stripe decline code → user-readable Chinese message mapping.
 *
 * Used by:
 *   - src/components/PayWithStripeElements.tsx (client) — when
 *     stripe.confirmPayment() rejects, we read error.code /
 *     error.decline_code and surface the friendly text inline so the
 *     customer knows what to try next (different card, contact issuer,
 *     fall back to T/T, …).
 *   - functions/api/stripe/webhook.ts (server) — when the
 *     payment_intent.payment_failed event arrives, we stash the friendly
 *     message in the payments row so admin dashboards / future email
 *     notifications can reference it.
 *
 * Sources for the code list:
 *   - https://stripe.com/docs/declines/codes
 *   - https://docs.stripe.com/api/errors#errors-payment-failed
 *
 * If Stripe returns a code we don't know about, we fall back to a generic
 * message that nudges the customer to try another card or contact their
 * issuer — the worst case must still be informative.
 */

export type StripeDeclineCode =
  | "do_not_honor"
  | "generic_decline"
  | "insufficient_funds"
  | "invalid_cvc"
  | "expired_card"
  | "incorrect_cvc"
  | "incorrect_number"
  | "incorrect_zip"
  | "invalid_expiry_month"
  | "invalid_expiry_year"
  | "card_declined"
  | "card_velocity_exceeded"
  | "currency_not_supported"
  | "duplicate_transaction"
  | "fraudulent"
  | "lost_card"
  | "merchant_blacklist"
  | "new_account_information_available"
  | "no_action_taken"
  | "not_permitted"
  | "offline_pin_required"
  | "online_or_offline_pin_required"
  | "pin_try_exceeded"
  | "pickup_card"
  | "processing_error"
  | "restricted_card"
  | "revoked"
  | "security_violation"
  | "service_not_allowed"
  | "stolen_card"
  | "stop_payment_order"
  | "testmode_decline"
  | "transaction_not_allowed"
  | "try_again_later"
  | "withdrawal_count_limit_exceeded"
  | "rejected_by_issuer";

export interface DeclineInfo {
  message: string;
  retryable: boolean;
  tag: string;
}

export const STRIPE_DECLINE_MESSAGES: Record<StripeDeclineCode, DeclineInfo> = {
  do_not_honor: {
    message: "发卡行拒绝了这笔交易，请换一张卡尝试，或联系发卡银行了解具体原因。",
    retryable: false,
    tag: "issuer_declined",
  },
  generic_decline: {
    message: "发卡行拒绝了这笔交易，请换一张卡尝试，或联系发卡银行了解具体原因。",
    retryable: false,
    tag: "issuer_declined",
  },
  insufficient_funds: {
    message: "卡内余额不足，请换一张卡或充值后重试。",
    retryable: true,
    tag: "insufficient_funds",
  },
  invalid_cvc: {
    message: "安全码（CVV/CVC）不正确，请检查后重试。",
    retryable: true,
    tag: "cvc_invalid",
  },
  incorrect_cvc: {
    message: "安全码（CVV/CVC）不正确，请检查后重试。",
    retryable: true,
    tag: "cvc_invalid",
  },
  expired_card: {
    message: "卡片已过期，请换一张有效卡片重试。",
    retryable: false,
    tag: "card_expired",
  },
  incorrect_number: {
    message: "卡号格式不正确，请检查后重试。",
    retryable: true,
    tag: "card_number_invalid",
  },
  incorrect_zip: {
    message: "邮政编码不正确，请检查后重试。",
    retryable: true,
    tag: "zip_invalid",
  },
  invalid_expiry_month: {
    message: "卡片有效月份不正确，请检查后重试。",
    retryable: true,
    tag: "expiry_month_invalid",
  },
  invalid_expiry_year: {
    message: "卡片有效年份不正确，请检查后重试。",
    retryable: true,
    tag: "expiry_year_invalid",
  },
  card_declined: {
    message: "发卡行拒绝了这笔交易，请换一张卡重试。",
    retryable: false,
    tag: "card_declined",
  },
  card_velocity_exceeded: {
    message: "该卡短时间内的交易次数超限，请稍后再试或换其他支付方式。",
    retryable: true,
    tag: "velocity_exceeded",
  },
  currency_not_supported: {
    message: "此卡片不支持当前结算货币，请使用其他支付方式（如银行电汇）。",
    retryable: false,
    tag: "currency_unsupported",
  },
  duplicate_transaction: {
    message: "检测到一笔重复的交易，请稍候片刻再试。",
    retryable: true,
    tag: "duplicate",
  },
  fraudulent: {
    message: "发卡行将此笔交易标记为可疑，请联系发卡行或使用其他支付方式。",
    retryable: false,
    tag: "fraudulent",
  },
  lost_card: {
    message: "发卡行报告此卡已挂失，请使用其他卡片。",
    retryable: false,
    tag: "lost_card",
  },
  stolen_card: {
    message: "发卡行报告此卡被盗用，请联系发卡行或使用其他支付方式。",
    retryable: false,
    tag: "stolen_card",
  },
  merchant_blacklist: {
    message: "该卡被商户系统拒绝，请使用其他支付方式。",
    retryable: false,
    tag: "merchant_blacklist",
  },
  new_account_information_available: {
    message: "发卡行提示卡片账户信息已更新，请联系发卡行后重试。",
    retryable: false,
    tag: "new_account_info",
  },
  no_action_taken: {
    message: "支付未完成，请稍后重试。",
    retryable: true,
    tag: "no_action",
  },
  not_permitted: {
    message: "此卡片不允许本次交易，请换其他支付方式。",
    retryable: false,
    tag: "not_permitted",
  },
  offline_pin_required: {
    message: "此卡需要输入线下 PIN，请使用其他支付方式。",
    retryable: false,
    tag: "pin_required",
  },
  online_or_offline_pin_required: {
    message: "此卡需要输入 PIN，请使用其他支付方式。",
    retryable: false,
    tag: "pin_required",
  },
  pin_try_exceeded: {
    message: "PIN 输入次数超限，请联系发卡行解锁。",
    retryable: false,
    tag: "pin_locked",
  },
  pickup_card: {
    message: "发卡行要求收回此卡，请联系发卡行。",
    retryable: false,
    tag: "pickup_card",
  },
  processing_error: {
    message: "支付处理时遇到临时错误，请稍后重试。",
    retryable: true,
    tag: "processing_error",
  },
  restricted_card: {
    message: "此卡片被限制用于线上交易，请使用其他支付方式。",
    retryable: false,
    tag: "card_restricted",
  },
  revoked: {
    message: "交易被发卡行撤销，请换一张卡重试。",
    retryable: false,
    tag: "revoked",
  },
  security_violation: {
    message: "发卡行出于安全考虑拒绝了该交易，请使用其他支付方式。",
    retryable: false,
    tag: "security_violation",
  },
  service_not_allowed: {
    message: "此卡片不允许用于此类商户交易，请使用其他支付方式。",
    retryable: false,
    tag: "service_not_allowed",
  },
  stop_payment_order: {
    message: "此卡已被设置了止付指令，请使用其他支付方式。",
    retryable: false,
    tag: "stop_payment",
  },
  testmode_decline: {
    message: "测试卡被拒绝。如使用真实卡，请联系发卡行。",
    retryable: false,
    tag: "testmode_decline",
  },
  transaction_not_allowed: {
    message: "此卡不允许进行本次交易，请使用其他支付方式。",
    retryable: false,
    tag: "transaction_not_allowed",
  },
  try_again_later: {
    message: "发卡行暂时无法处理该交易，请稍后再试。",
    retryable: true,
    tag: "try_again_later",
  },
  withdrawal_count_limit_exceeded: {
    message: "此卡当日交易次数已达上限，请稍后再试。",
    retryable: true,
    tag: "withdrawal_limit",
  },
  rejected_by_issuer: {
    message: "发卡行拒绝了这笔交易，请联系发卡行或使用其他支付方式。",
    retryable: false,
    tag: "rejected_by_issuer",
  },
};

/**
 * Map a raw decline code (or null / unknown string) into a friendly
 * Chinese sentence. Always returns a non-empty string so the UI never
 * shows blank error text.
 */
export function formatDeclineMessage(code: string | null | undefined): string {
  if (!code) {
    return "支付失败，请换一张卡尝试。";
  }
  const key = code.toLowerCase() as StripeDeclineCode;
  const entry = STRIPE_DECLINE_MESSAGES[key];
  if (entry) return entry.message;
  return "支付失败，请换一张卡尝试或联系发卡行。";
}

/**
 * Same as formatDeclineMessage but returns the full DeclineInfo object so
 * callers can decide whether to surface a retry button or a hard "switch
 * to T/T" prompt.
 */
export function getDeclineInfo(code: string | null | undefined): DeclineInfo {
  const fallback: DeclineInfo = {
    message: formatDeclineMessage(code),
    retryable: false,
    tag: "unknown",
  };
  if (!code) return fallback;
  const key = code.toLowerCase() as StripeDeclineCode;
  const entry = STRIPE_DECLINE_MESSAGES[key];
  return entry ?? fallback;
}

/**
 * Best-effort: read whichever field Stripe's StripePaymentIntent error
 * shape carries. Newer Stripe SDKs surface `decline_code` on the typed
 * error; older ones nest it on `error.payment_intent.last_payment_error`
 * via `code` instead. Cover both so the message is never blank.
 */
export function pickDeclineCode(input: {
  decline_code?: string | null;
  code?: string | null;
} | null | undefined): string | null {
  if (!input) return null;
  if (input.decline_code) return input.decline_code;
  if (input.code) return input.code;
  return null;
}