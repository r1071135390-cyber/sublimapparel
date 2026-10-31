#!/usr/bin/env node
/**
 * scripts/gen-admin-users.mjs
 *
 * Generates one entry for the ADMIN_USERS roster that backs the admin
 * login (see functions/api/_admin-auth.ts).
 *
 *   node scripts/gen-admin-users.mjs --email sales@sublimapparel.com --role admin
 *   node scripts/gen-admin-users.mjs --email boss@sublimapparel.com  --role owner --password "s3cret"
 *
 * It prints:
 *   1. the JSON object to paste into ADMIN_USERS (contains the token and
 *      the SHA-256 hash of the password — never the password itself),
 *   2. on stderr, the plaintext password and the raw token, which the
 *      operator has to hand over to the new colleague.
 *
 * Roles:
 *   owner — full access, including the corporate bank accounts and
 *           deleting invoices.
 *   admin — create / edit / upload invoices, read the PI summary and the
 *           customer archive.
 *
 * No dependencies, no network access.
 */

import { createHash, randomBytes } from "node:crypto";

const argv = process.argv.slice(2);

function arg(name, fallback = null) {
  const index = argv.indexOf(`--${name}`);
  if (index === -1) return fallback;
  const value = argv[index + 1];
  if (!value || value.startsWith("--")) return fallback;
  return value;
}

const email = (arg("email") || "").trim();
const role = (arg("role") || "admin").trim().toLowerCase();

if (!email) {
  console.error(
    "Usage: node scripts/gen-admin-users.mjs --email <you@example.com> [--role owner|admin] [--password <plaintext>]",
  );
  process.exit(1);
}

if (role !== "owner" && role !== "admin") {
  console.error(`--role must be "owner" or "admin" (got "${role}")`);
  process.exit(1);
}

const token = randomBytes(32).toString("hex");
const password = arg("password") || randomBytes(9).toString("base64url");
const passwordHash = createHash("sha256").update(password).digest("hex");

const entry = { id: email, email, role, token, passwordHash };

console.log(JSON.stringify(entry));

console.error("");
console.error("  token          : " + token);
console.error("  password       : " + password);
console.error("  password hash  : " + passwordHash);
console.error("");
console.error("  Paste the JSON line above into the ADMIN_USERS environment");
console.error("  variable in Cloudflare Pages → Settings → Environment");
console.error("  variables (tick BOTH Production and Preview). Multiple");
console.error("  accounts = one JSON array, or one JSON object per line.");
