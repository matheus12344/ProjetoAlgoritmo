import { createHmac } from "node:crypto";

/**
 * Pure logic for the program pre-registration endpoint.
 *
 * Deliberately free of I/O and of Next.js imports so it can be unit-tested
 * directly (see program-interest.test.ts). The route handler owns the network
 * calls; everything decidable without a network lives here.
 */

export const PREFERRED_FORMATS = ["online", "presencial", "tanto_faz"] as const;
export type PreferredFormat = (typeof PREFERRED_FORMATS)[number];

// Mirrors the CHECK constraints in the Supabase migration. Both layers validate
// on purpose: the API is the only intended writer today, but the database must
// still refuse nonsense if anything ever writes to it directly.
export const LIMITS = {
  nameMax: 120,
  emailMin: 6,
  emailMax: 254,
  whatsappMin: 8,
  whatsappMax: 25,
  bodyBytesMax: 4096,
} as const;

const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const WHATSAPP_PATTERN = /^[0-9()+\-\s]+$/;

export type ValidSubmission = {
  name: string;
  email: string;
  emailNormalized: string;
  whatsapp: string | null;
  preferredFormat: PreferredFormat;
};

/** Deduplication key. Must match the database's generated column exactly. */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];
  return typeof value === "string" ? value.trim() : "";
}

/**
 * True when the hidden field carries anything. A human never sees it, so any
 * content marks the submission as automated.
 */
export function isHoneypotTripped(payload: unknown): boolean {
  if (!isPlainObject(payload)) {
    return false;
  }
  const value = payload.website;
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Returns the validated submission, or null if anything is off.
 *
 * The caller never learns *which* field failed. The browser already ran the
 * same checks, so a rejection here means a malformed or hostile payload, and
 * naming the reason only helps whoever sent it.
 */
export function validateSubmission(payload: unknown): ValidSubmission | null {
  if (!isPlainObject(payload)) {
    return null;
  }

  const name = readString(payload, "name");
  if (name.length < 1 || name.length > LIMITS.nameMax) {
    return null;
  }

  const email = readString(payload, "email");
  if (
    email.length < LIMITS.emailMin ||
    email.length > LIMITS.emailMax ||
    !EMAIL_PATTERN.test(email)
  ) {
    return null;
  }

  // Absent stays distinguishable from blank: the column is NULL, never "".
  const rawWhatsapp = readString(payload, "whatsapp");
  let whatsapp: string | null = null;
  if (rawWhatsapp.length > 0) {
    if (
      rawWhatsapp.length < LIMITS.whatsappMin ||
      rawWhatsapp.length > LIMITS.whatsappMax ||
      !WHATSAPP_PATTERN.test(rawWhatsapp)
    ) {
      return null;
    }
    whatsapp = rawWhatsapp;
  }

  const preferredFormat = readString(payload, "preferredFormat");
  if (!PREFERRED_FORMATS.includes(preferredFormat as PreferredFormat)) {
    return null;
  }

  // Consent is not recorded on trust: the request must assert it as a literal
  // boolean true. The string "true" does not count.
  if (payload.consent !== true) {
    return null;
  }

  return {
    name,
    email,
    emailNormalized: normalizeEmail(email),
    whatsapp,
    preferredFormat: preferredFormat as PreferredFormat,
  };
}

/**
 * First hop of x-forwarded-for, which on Vercel is the real client address.
 * Returns null when no address can be determined.
 */
export function extractClientIp(headers: Headers): string | null {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }
  return headers.get("x-real-ip")?.trim() || null;
}

/**
 * Keyed digest of the client address, for rate limiting only.
 *
 * The raw IP is never stored, logged, or sent anywhere — only this digest. It
 * is keyed rather than a plain hash because the IPv4 space is small enough to
 * enumerate exhaustively: an unkeyed hash of an IP address is reversible in
 * seconds and would therefore still be personal data at rest.
 */
export function hashIp(ip: string, secret: string): string {
  return createHmac("sha256", secret).update(ip).digest("hex");
}

/** Rejects cross-site posts. */
export function isSameOrigin(headers: Headers): boolean {
  const fetchSite = headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") {
    return false;
  }

  const origin = headers.get("origin");
  if (!origin) {
    // Browsers always send Origin on POST, including same-origin. A missing
    // header means a non-browser client, which is treated as untrusted.
    return false;
  }

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }

  const host = headers.get("x-forwarded-host") ?? headers.get("host");
  return Boolean(host) && originHost === host;
}
