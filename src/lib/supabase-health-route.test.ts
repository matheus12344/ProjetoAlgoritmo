import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { GET } from "@/app/api/health/supabase/route";

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

test("performs one zero-row, read-only Supabase health check", async () => {
  process.env.SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "server-only-test-key";

  let upstreamRequest: { method?: string; body?: BodyInit | null; url: string } | null = null;
  globalThis.fetch = async (input, init) => {
    upstreamRequest = {
      url: String(input),
      method: init?.method,
      body: init?.body,
    };
    return new Response(null, { status: 200 });
  };

  const response = await GET();

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  const recordedRequest = upstreamRequest as unknown as {
    method?: string;
    body?: BodyInit | null;
    url: string;
  };
  assert.ok(recordedRequest);
  assert.equal(recordedRequest.method, "HEAD");
  assert.equal(recordedRequest.body, undefined);

  const url = new URL(recordedRequest.url);
  assert.equal(url.pathname, "/rest/v1/ad_click_references");
  assert.equal(url.searchParams.get("select"), "reference_code");
  assert.equal(url.searchParams.get("reference_code"), "eq.AF-0000-0000");
  assert.equal(url.searchParams.get("limit"), "1");
});

test("returns only generic unavailable status when Supabase is not configured", async () => {
  delete process.env.SUPABASE_URL;
  delete process.env.SUPABASE_SERVICE_ROLE_KEY;

  let fetchCalled = false;
  globalThis.fetch = async () => {
    fetchCalled = true;
    return new Response(null, { status: 200 });
  };

  const response = await GET();

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { ok: false });
  assert.equal(fetchCalled, false);
});

test("does not expose upstream failures", async () => {
  process.env.SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "server-only-test-key";
  globalThis.fetch = async () => new Response("details must stay private", { status: 500 });

  const response = await GET();

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { ok: false });
});
