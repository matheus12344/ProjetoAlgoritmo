import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { POST } from "@/app/api/ad-click-reference/route";
import { isValidAdReference } from "./ad-click-reference";

const originalFetch = globalThis.fetch;
const originalUrl = process.env.SUPABASE_URL;
const originalServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

afterEach(() => {
  globalThis.fetch = originalFetch;

  if (originalUrl === undefined) {
    delete process.env.SUPABASE_URL;
  } else {
    process.env.SUPABASE_URL = originalUrl;
  }

  if (originalServiceRoleKey === undefined) {
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  } else {
    process.env.SUPABASE_SERVICE_ROLE_KEY = originalServiceRoleKey;
  }
});

function sameOriginRequest(body: unknown) {
  return new Request("https://www.andrefiker.com.br/api/ad-click-reference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Host: "www.andrefiker.com.br",
      Origin: "https://www.andrefiker.com.br",
      "Sec-Fetch-Site": "same-origin",
    },
    body: JSON.stringify(body),
  });
}

test("stores only click correlation and returns only the opaque reference", async () => {
  process.env.SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "server-only-test-key";

  const upstreamRequests: Array<{ method: string; url: string; body: string }> = [];
  const expiry = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString();

  globalThis.fetch = async (input, init) => {
    const url = String(input);
    const method = init?.method ?? "GET";
    upstreamRequests.push({
      method,
      url,
      body: typeof init?.body === "string" ? init.body : "",
    });

    if (method === "DELETE") {
      return new Response(null, { status: 204 });
    }
    if (method === "GET") {
      return Response.json([]);
    }

    const stored = JSON.parse(String(init?.body)) as Array<{
      reference_code: string;
    }>;
    return Response.json([
      {
        reference_code: stored[0].reference_code,
        expires_at: expiry,
      },
    ]);
  };

  const response = await POST(
    sameOriginRequest({
      clickIdType: "gclid",
      clickId: "EAIaIQobChMIAbCdEf1234",
      message: "must not reach storage",
      phone: "5511999999999",
    }),
  );
  const result = (await response.json()) as Record<string, unknown>;

  assert.equal(response.status, 200);
  assert.equal(result.ok, true);
  assert.equal(typeof result.reference, "string");
  assert.equal(isValidAdReference(String(result.reference)), true);
  assert.equal(result.expiresAt, expiry);
  assert.equal("clickId" in result, false);

  const insert = upstreamRequests.find((request) => request.method === "POST");
  assert.ok(insert);
  assert.match(insert.body, /EAIaIQobChMIAbCdEf1234/);
  assert.doesNotMatch(insert.body, /must not reach storage/);
  assert.doesNotMatch(insert.body, /5511999999999/);
});

test("rejects cross-site capture before any storage request", async () => {
  process.env.SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "server-only-test-key";

  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    return Response.json([]);
  };

  const request = new Request(
    "https://www.andrefiker.com.br/api/ad-click-reference",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Host: "www.andrefiker.com.br",
        Origin: "https://attacker.example",
        "Sec-Fetch-Site": "cross-site",
      },
      body: JSON.stringify({
        clickIdType: "gclid",
        clickId: "EAIaIQobChMIAbCdEf1234",
      }),
    },
  );

  const response = await POST(request);
  assert.equal(response.status, 403);
  assert.equal(fetchCalled, false);
});
