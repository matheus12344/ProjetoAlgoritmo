import { NextResponse } from "next/server";
import {
  LIMITS,
  extractClientIp,
  hashIp,
  isHoneypotTripped,
  isSameOrigin,
  validateSubmission,
  type ValidSubmission,
} from "@/lib/program-interest";

/**
 * Pre-registration intake for the "Estresse & Reatividade" program page.
 *
 * Disabled by default. Nothing is forwarded anywhere unless
 * PROGRAM_WAITLIST_MODE === "live" *and* every required server variable is
 * present. Any other state fails closed and stores nothing.
 *
 * Deliberate omissions:
 *  - No logging. Request bodies carry personal data, so nothing here writes to
 *    the console, a file, or any analytics sink — not even on error, and never
 *    the client IP.
 *  - No error detail in responses. Failures return a short generic code, never
 *    the submitted values and never the upstream message.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPSTREAM_TIMEOUT_MS = 8000;

// Five write attempts per address per hour. Generous for a person who mistypes
// their email, useless for a script farming distinct addresses.
const RATE_LIMIT_MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_SECONDS = 3600;

function jsonResponse(body: unknown, status: number) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function failure(error: string, status: number) {
  return jsonResponse({ ok: false, error }, status);
}

type LiveConfig = {
  url: string;
  serviceRoleKey: string;
  rateSalt: string;
};

/**
 * Live only when the server mode is exactly "live" and every server-side
 * variable is present. Anything else — unset, "demo", a typo, half configured —
 * means not live.
 *
 * The rate-limit salt is required rather than optional: without it the limiter
 * cannot run, and a live endpoint with no working limiter is not something to
 * fail open on.
 *
 * None of these are NEXT_PUBLIC_, so none reach the client bundle. The
 * service-role key must stay server-side — it bypasses RLS.
 */
function resolveLiveConfig(): LiveConfig | null {
  if (process.env.PROGRAM_WAITLIST_MODE !== "live") {
    return null;
  }

  const url = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const rateSalt = process.env.PROGRAM_WAITLIST_RATE_SALT?.trim();
  if (!url || !serviceRoleKey || !rateSalt) {
    return null;
  }

  return { url: url.replace(/\/+$/, ""), serviceRoleKey, rateSalt };
}

function supabaseHeaders(config: LiveConfig): Record<string, string> {
  return {
    apikey: config.serviceRoleKey,
    Authorization: `Bearer ${config.serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

/**
 * Atomic check-and-increment in Postgres.
 *
 * Done database-side rather than in memory because serverless instances are
 * per-request and cold-started — an in-process counter would reset constantly
 * and provide no real limit.
 *
 * Returns false when the caller is over the limit, and also when the check
 * itself fails: a limiter that cannot run must not wave traffic through.
 */
async function withinRateLimit(
  config: LiveConfig,
  ipDigest: string,
): Promise<boolean> {
  try {
    const response = await fetch(
      `${config.url}/rest/v1/rpc/program_interest_rate_check`,
      {
        method: "POST",
        headers: supabaseHeaders(config),
        body: JSON.stringify({
          p_digest: ipDigest,
          p_max_attempts: RATE_LIMIT_MAX_ATTEMPTS,
          p_window_seconds: RATE_LIMIT_WINDOW_SECONDS,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      },
    );

    if (!response.ok) {
      return false;
    }

    return (await response.json()) === true;
  } catch {
    return false;
  }
}

/**
 * Upserts on the database-derived email_normalized column, so re-submitting the
 * same address refreshes the existing row rather than duplicating it.
 * return=minimal keeps the stored row out of the response entirely.
 */
async function storeSubmission(
  config: LiveConfig,
  submission: ValidSubmission,
): Promise<boolean> {
  try {
    const response = await fetch(
      `${config.url}/rest/v1/program_interest?on_conflict=email_normalized`,
      {
        method: "POST",
        headers: {
          ...supabaseHeaders(config),
          Prefer: "resolution=merge-duplicates,return=minimal",
        },
        body: JSON.stringify([
          {
            name: submission.name,
            email: submission.email,
            whatsapp: submission.whatsapp,
            preferred_format: submission.preferredFormat,
            consent_at: new Date().toISOString(),
          },
        ]),
        cache: "no-store",
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      },
    );

    return response.ok;
  } catch {
    // Network failure, DNS failure, timeout. Swallowed on purpose: the upstream
    // message can quote the row it rejected, and that must never surface or be
    // logged.
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request.headers)) {
    return failure("forbidden", 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return failure("unsupported_media_type", 415);
  }

  const body = await request.text();
  if (body.length > LIMITS.bodyBytesMax) {
    return failure("payload_too_large", 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return failure("invalid_request", 400);
  }

  // Hidden field, invisible to people and irresistible to bots. Anything in it
  // means the submission is automated: answer exactly as on success so the
  // sender learns nothing, and store nothing.
  if (isHoneypotTripped(payload)) {
    return jsonResponse({ ok: true }, 200);
  }

  const submission = validateSubmission(payload);
  if (!submission) {
    return failure("invalid_request", 400);
  }

  const config = resolveLiveConfig();
  if (!config) {
    // Fail closed. Not configured for live means nothing leaves this process.
    return failure("not_configured", 503);
  }

  const clientIp = extractClientIp(request.headers);
  if (!clientIp) {
    // No address means the limiter cannot be applied to this request.
    return failure("forbidden", 403);
  }

  if (!(await withinRateLimit(config, hashIp(clientIp, config.rateSalt)))) {
    return failure("rate_limited", 429);
  }

  if (!(await storeSubmission(config, submission))) {
    return failure("storage_unavailable", 502);
  }

  return jsonResponse({ ok: true }, 200);
}

// POST only. Next.js answers unexported methods with 405 already; GET is spelled
// out because it is the one someone will reach for by hand in a browser.
export async function GET() {
  return failure("method_not_allowed", 405);
}
