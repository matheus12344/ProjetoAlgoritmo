import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPSTREAM_TIMEOUT_MS = 8_000;
// This value cannot satisfy the database constraint for a reference code, so
// the read always returns zero rows and no stored code is ever received.
const IMPOSSIBLE_REFERENCE_CODE = "AF-0000-0000";

type StorageConfig = {
  url: string;
  serviceRoleKey: string;
};

function healthResponse(ok: boolean, status: number) {
  return NextResponse.json(
    { ok },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

function resolveStorageConfig(): StorageConfig | null {
  const url = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!url || !serviceRoleKey) {
    return null;
  }

  return { url: url.replace(/\/+$/, ""), serviceRoleKey };
}

export async function GET() {
  const config = resolveStorageConfig();
  if (!config) {
    return healthResponse(false, 503);
  }

  const url = new URL("/rest/v1/ad_click_references", config.url);
  url.searchParams.set("select", "reference_code");
  url.searchParams.set(
    "reference_code",
    `eq.${IMPOSSIBLE_REFERENCE_CODE}`,
  );
  url.searchParams.set("limit", "1");

  try {
    const response = await fetch(url, {
      // PostgREST executes this as a SELECT, while HTTP HEAD prevents a
      // response body from carrying any table value back to this application.
      method: "HEAD",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });

    return healthResponse(response.ok, response.ok ? 200 : 503);
  } catch {
    return healthResponse(false, 503);
  }
}
