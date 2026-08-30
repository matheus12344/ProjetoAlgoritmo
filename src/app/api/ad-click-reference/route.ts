import { randomInt } from "node:crypto";
import { NextResponse } from "next/server";
import { validateAdClickCapture, type AdClickIdentifier } from "@/lib/ad-click-reference";
import { isSameOrigin } from "@/lib/program-interest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BODY_BYTES_MAX = 1024;
const UPSTREAM_TIMEOUT_MS = 8000;
const REFERENCE_ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ";

type StorageConfig = {
  url: string;
  serviceRoleKey: string;
};

type StoredReference = {
  reference_code: string;
  expires_at: string;
};

function jsonResponse(body: unknown, status: number) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function failure(error: string, status: number) {
  return jsonResponse({ ok: false, error }, status);
}

function resolveStorageConfig(): StorageConfig | null {
  const url = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url: url.replace(/\/+$/, ""), serviceRoleKey };
}

function storageHeaders(config: StorageConfig): Record<string, string> {
  return {
    apikey: config.serviceRoleKey,
    Authorization: `Bearer ${config.serviceRoleKey}`,
    "Content-Type": "application/json",
  };
}

function createReferenceCode(): string {
  let characters = "";
  for (let index = 0; index < 8; index += 1) {
    characters += REFERENCE_ALPHABET[randomInt(REFERENCE_ALPHABET.length)];
  }
  return `AF-${characters.slice(0, 4)}-${characters.slice(4)}`;
}

async function purgeExpiredReferences(
  config: StorageConfig,
  deadlineSignal: AbortSignal,
) {
  const url = new URL("/rest/v1/ad_click_references", config.url);
  url.searchParams.set("expires_at", `lt.${new Date().toISOString()}`);

  try {
    await fetch(url, {
      method: "DELETE",
      headers: {
        ...storageHeaders(config),
        Prefer: "return=minimal",
      },
      cache: "no-store",
      signal: deadlineSignal,
    });
  } catch {
    // Retention cleanup is opportunistic. A failed purge must not leak an
    // upstream error or log a request that contains a click identifier.
  }
}

async function findStoredReference(
  config: StorageConfig,
  capture: AdClickIdentifier,
  deadlineSignal: AbortSignal,
): Promise<StoredReference | null> {
  if (deadlineSignal.aborted) {
    return null;
  }

  const url = new URL("/rest/v1/ad_click_references", config.url);
  url.searchParams.set("select", "reference_code,expires_at");
  url.searchParams.set("click_id_type", `eq.${capture.clickIdType}`);
  url.searchParams.set("click_id", `eq.${capture.clickId}`);
  url.searchParams.set("expires_at", `gt.${new Date().toISOString()}`);
  url.searchParams.set("limit", "1");

  try {
    const response = await fetch(url, {
      headers: storageHeaders(config),
      cache: "no-store",
      signal: deadlineSignal,
    });
    if (!response.ok) {
      return null;
    }

    const rows = (await response.json()) as StoredReference[];
    return rows[0] ?? null;
  } catch {
    return null;
  }
}

async function storeReference(
  config: StorageConfig,
  capture: AdClickIdentifier,
  deadlineSignal: AbortSignal,
): Promise<StoredReference | null> {
  await purgeExpiredReferences(config, deadlineSignal);

  if (deadlineSignal.aborted) {
    return null;
  }

  const existing = await findStoredReference(config, capture, deadlineSignal);
  if (existing) {
    return existing;
  }

  for (let attempt = 0; attempt < 3; attempt += 1) {
    if (deadlineSignal.aborted) {
      return null;
    }

    const url = new URL("/rest/v1/ad_click_references", config.url);
    url.searchParams.set("on_conflict", "click_id_type,click_id");
    url.searchParams.set("select", "reference_code,expires_at");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          ...storageHeaders(config),
          Prefer: "resolution=ignore-duplicates,return=representation",
        },
        body: JSON.stringify([
          {
            click_id_type: capture.clickIdType,
            click_id: capture.clickId,
            reference_code: createReferenceCode(),
          },
        ]),
        cache: "no-store",
        signal: deadlineSignal,
      });

      if (!response.ok) {
        return null;
      }

      const rows = (await response.json()) as StoredReference[];
      if (rows[0]) {
        return rows[0];
      }

      const duplicate = await findStoredReference(
        config,
        capture,
        deadlineSignal,
      );
      if (duplicate) {
        return duplicate;
      }
    } catch {
      return null;
    }
  }

  return null;
}

export async function POST(request: Request) {
  const deadlineSignal = AbortSignal.timeout(UPSTREAM_TIMEOUT_MS);

  if (!isSameOrigin(request.headers)) {
    return failure("forbidden", 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return failure("unsupported_media_type", 415);
  }

  const body = await request.text();
  if (body.length > BODY_BYTES_MAX) {
    return failure("payload_too_large", 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return failure("invalid_request", 400);
  }

  const capture = validateAdClickCapture(payload);
  if (!capture) {
    return failure("invalid_request", 400);
  }

  const config = resolveStorageConfig();
  if (!config) {
    return failure("not_configured", 503);
  }

  const stored = await storeReference(config, capture, deadlineSignal);
  if (!stored) {
    return failure("storage_unavailable", 502);
  }

  return jsonResponse(
    {
      ok: true,
      reference: stored.reference_code,
      expiresAt: stored.expires_at,
    },
    200,
  );
}

export async function GET() {
  return failure("method_not_allowed", 405);
}
