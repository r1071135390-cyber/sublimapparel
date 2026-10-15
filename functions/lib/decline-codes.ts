/**
 * Server-side Stripe decline code helper (functions/lib/decline-codes.ts).
 *
 * Mirror of src/lib/decline-codes.ts so Cloudflare Functions can resolve
 * a decline code into a human-readable string before INSERTing it into
 * the `payments` table. Used by /api/stripe/webhook.ts when reacting to
 * `payment_intent.payment_failed` events.
 *
 * Keep this list in sync with src/lib/decline-codes.ts.
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

const MESSAGES: Record<StripeDeclineCode, string> = {
  do_not_honor: "发卡行拒绝了这笔交易，请换一张卡尝试，或联系发卡银行了解具体原因。",
  generic_decline: "发卡行拒绝了这笔交易，请换一张卡尝试，或联系发卡银行了解具体原因。",
  insufficient_funds: "卡内余额不足，请换一张卡或充值后重试。",
  invalid_cvc: "安全码（CVV/CVC）不正确，请检查后重试。",
  incorrect_cvc: "安全码（CVV/CVC）不正确，请检查后重试。",
  expired_card: "卡片已过期，请换一张有效卡片重试。",
  incorrect_number: "卡号格式不正确，请检查后重试。",
  incorrect_zip: "邮政编码不正确，请检查后重试。",
  invalid_expiry_month: "卡片有效月份不正确，请检查后重试。",
  invalid_expiry_year: "卡片有效年份不正确，请检查后重试。",
  card_declined: "发卡行拒绝了这笔交易，请换一张卡重试。",
  card_velocity_exceeded: "该卡短时间内的交易次数超限，请稍后再试或换其他支付方式。",
  currency_not_supported: "此卡片不支持当前结算货币，请使用其他支付方式（如银行电汇）。",
  duplicate_transaction: "检测到一笔重复的交易，请稍候片刻再试。",
  fraudulent: "发卡行将此笔交易标记为可疑，请联系发卡行或使用其他支付方式。",
  lost_card: "发卡行报告此卡已挂失，请使用其他卡片。",
  stolen_card: "发卡行报告此卡被盗用，请联系发卡行或使用其他支付方式。",
  merchant_blacklist: "该卡被商户系统拒绝，请使用其他支付方式。",
  new_account_information_available: "发卡行提示卡片账户信息已更新，请联系发卡行后重试。",
  no_action_taken: "支付未完成，请稍后重试。",
  not_permitted: "此卡片不允许本次交易，请换其他支付方式。",
  offline_pin_required: "此卡需要输入线下 PIN，请使用其他支付方式。",
  online_or_offline_pin_required: "此卡需要输入 PIN，请使用其他支付方式。",
  pin_try_exceeded: "PIN 输入次数超限，请联系发卡行解锁。",
  pickup_card: "发卡行要求收回此卡，请联系发卡行。",
  processing_error: "支付处理时遇到临时错误，请稍后重试。",
  restricted_card: "此卡片被限制用于线上交易，请使用其他支付方式。",
  revoked: "交易被发卡行撤销，请换一张卡重试。",
  security_violation: "发卡行出于安全考虑拒绝了该交易，请使用其他支付方式。",
  service_not_allowed: "此卡片不允许用于此类商户交易，请使用其他支付方式。",
  stop_payment_order: "此卡已被设置了止付指令，请使用其他支付方式。",
  testmode_decline: "测试卡被拒绝。如使用真实卡，请联系发卡行。",
  transaction_not_allowed: "此卡不允许进行本次交易，请使用其他支付方式。",
  try_again_later: "发卡行暂时无法处理该交易，请稍后再试。",
  withdrawal_count_limit_exceeded: "此卡当日交易次数已达上限，请稍后再试。",
  rejected_by_issuer: "发卡行拒绝了这笔交易，请联系发卡行或使用其他支付方式。",
};

export function formatDeclineMessageServer(code: string | null | undefined): string {
  if (!code) return "支付失败，请换一张卡尝试。";
  const key = code.toLowerCase() as StripeDeclineCode;
  const entry = MESSAGES[key];
  if (entry) return entry;
  return "支付失败，请换一张卡尝试或联系发卡行。";
}