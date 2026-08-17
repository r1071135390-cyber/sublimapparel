import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST ?? "smtp.exmail.qq.com";
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 465);
const SMTP_USER = process.env.SMTP_USER ?? "info@sublimapparel.com";
const SMTP_PASS = process.env.SMTP_PASS ?? "";
const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME ?? "SublimApparel Site";
const MAIL_FROM = process.env.MAIL_FROM ?? SMTP_USER;
const MAIL_TO = process.env.MAIL_TO ?? SMTP_USER;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // SSL for 465, STARTTLS for 587
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: {
    // Avoid failing on cert name mismatch with corporate proxies
    rejectUnauthorized: false,
  },
});

interface ChatMessageEmail {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  pageUrl?: string | null;
  userAgent?: string | null;
  createdAt?: string;
}

/** Send the chat message as a notification email to info@ */
export async function sendChatNotificationEmail(
  msg: ChatMessageEmail
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!SMTP_PASS) {
    return { ok: false, error: "SMTP_PASS not configured" };
  }

  const subject = `[${msg.topic.toUpperCase()}] New message from ${msg.name} <${msg.email}>`;
  const text = [
    `New chat message from your website`,
    ``,
    `Name:    ${msg.name}`,
    `Email:   ${msg.email}`,
    `Topic:   ${msg.topic}`,
    `Page:    ${msg.pageUrl ?? "(unknown)"}`,
    `When:    ${msg.createdAt ?? new Date().toISOString()}`,
    `UA:      ${msg.userAgent ?? "(unknown)"}`,
    `DB id:   ${msg.id}`,
    ``,
    `--- Message ---`,
    msg.message,
    ``,
    `--- Reply ---`,
    `Reply directly to this email, or just hit "Reply" — the From address is set to ${msg.email} (or hit the email above).`,
  ].join("\n");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;padding:24px;background:#fafafa;">
      <div style="background:#0a0a0a;padding:20px 24px;border-radius:12px 12px 0 0;">
        <div style="color:#ff4d00;font-size:11px;font-weight:800;letter-spacing:0.15em;text-transform:uppercase;">NEW CHAT MESSAGE</div>
        <div style="color:#fff;font-size:20px;font-weight:800;margin-top:4px;">${escapeHtml(msg.name)} &middot; <span style="color:#00c2ff;">${escapeHtml(msg.topic)}</span></div>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 12px 12px;">
        <table style="width:100%;font-size:14px;line-height:1.5;">
          <tr><td style="color:#6b6b6b;width:80px;padding:4px 0;">Email</td><td><a href="mailto:${escapeHtml(msg.email)}" style="color:#0a0a0a;font-weight:600;">${escapeHtml(msg.email)}</a></td></tr>
          <tr><td style="color:#6b6b6b;padding:4px 0;">Page</td><td style="color:#0a0a0a;">${escapeHtml(msg.pageUrl ?? "—")}</td></tr>
          <tr><td style="color:#6b6b6b;padding:4px 0;">When</td><td style="color:#0a0a0a;">${escapeHtml(msg.createdAt ?? new Date().toISOString())}</td></tr>
        </table>
        <div style="margin-top:20px;padding:16px;background:#0a0a0a;color:#fff;border-radius:8px;font-size:15px;line-height:1.55;white-space:pre-wrap;">${escapeHtml(msg.message)}</div>
        <div style="margin-top:20px;text-align:center;">
          <a href="mailto:${escapeHtml(msg.email)}?subject=Re: Your message to SublimApparel" style="display:inline-block;background:#ff4d00;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:800;font-size:14px;letter-spacing:0.05em;text-transform:uppercase;">Reply to ${escapeHtml(msg.name)}</a>
        </div>
        <div style="margin-top:16px;font-size:11px;color:#a0a0a0;text-align:center;">
          DB id: ${escapeHtml(msg.id)} &middot; Source: FloatingChat
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"${MAIL_FROM_NAME}" <${MAIL_FROM}>`,
      to: MAIL_TO,
      replyTo: msg.email,
      subject,
      text,
      html,
    });
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[/lib/email] send failed:", message);
    return { ok: false, error: message };
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
