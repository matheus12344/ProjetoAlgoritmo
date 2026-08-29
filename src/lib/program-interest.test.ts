import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  extractClientIp,
  hashIp,
  isHoneypotTripped,
  isSameOrigin,
  normalizeEmail,
  validateSubmission,
} from "./program-interest";

// Run with: npx tsx --test src/lib/program-interest.test.ts

const valid = {
  name: "Teste Pré-Inscrição",
  email: "teste-programa@example.invalid",
  whatsapp: "11 96182-0112",
  preferredFormat: "online",
  consent: true,
};

describe("validateSubmission — accepts", () => {
  it("a complete submission", () => {
    const result = validateSubmission(valid);
    assert.ok(result);
    assert.equal(result.name, "Teste Pré-Inscrição");
    assert.equal(result.preferredFormat, "online");
    assert.equal(result.whatsapp, "11 96182-0112");
  });

  it("a submission with no whatsapp, as NULL rather than empty string", () => {
    const result = validateSubmission({ ...valid, whatsapp: "" });
    assert.ok(result);
    assert.equal(result.whatsapp, null, "blank must become NULL, not ''");
  });

  it("a submission with whatsapp absent entirely", () => {
    const { whatsapp: _omitted, ...withoutWhatsapp } = valid;
    const result = validateSubmission(withoutWhatsapp);
    assert.ok(result);
    assert.equal(result.whatsapp, null);
  });

  it("every permitted format token", () => {
    for (const preferredFormat of ["online", "presencial", "tanto_faz"]) {
      assert.ok(
        validateSubmission({ ...valid, preferredFormat }),
        `${preferredFormat} should be accepted`,
      );
    }
  });

  it("and trims surrounding whitespace", () => {
    const result = validateSubmission({ ...valid, name: "  Teste  " });
    assert.ok(result);
    assert.equal(result.name, "Teste");
  });
});

describe("validateSubmission — rejects", () => {
  const rejected: Array<[string, unknown]> = [
    ["a malformed email", { ...valid, email: "nope" }],
    ["an email with no TLD", { ...valid, email: "a@b" }],
    ["an email with whitespace", { ...valid, email: "a b@c.com" }],
    ["a missing consent field", { ...valid, consent: undefined }],
    ["consent as the string 'true'", { ...valid, consent: "true" }],
    ["consent as false", { ...valid, consent: false }],
    ["consent as 1", { ...valid, consent: 1 }],
    ["an empty name", { ...valid, name: "   " }],
    ["a name over 120 characters", { ...valid, name: "x".repeat(121) }],
    ["an email over 254 characters", { ...valid, email: `${"x".repeat(250)}@e.com` }],
    ["a display label instead of a format token", { ...valid, preferredFormat: "Online" }],
    ["an unknown format", { ...valid, preferredFormat: "hibrido" }],
    ["a whatsapp containing letters", { ...valid, whatsapp: "chame me agora" }],
    ["a whatsapp that is too short", { ...valid, whatsapp: "1234" }],
    ["a whatsapp that is too long", { ...valid, whatsapp: "1".repeat(26) }],
    ["an array payload", [valid]],
    ["a null payload", null],
    ["a string payload", "name=teste"],
    ["a number payload", 42],
  ];

  for (const [label, payload] of rejected) {
    it(label, () => {
      assert.equal(validateSubmission(payload), null);
    });
  }

  it("never collects a clinical free-text field even when one is sent", () => {
    const result = validateSubmission({
      ...valid,
      notes: "tenho ansiedade e tomo medicação",
      symptoms: "insônia",
    });
    assert.ok(result);
    // Extra keys are dropped, not passed through to storage.
    assert.deepEqual(Object.keys(result).sort(), [
      "email",
      "emailNormalized",
      "name",
      "preferredFormat",
      "whatsapp",
    ]);
  });
});

describe("duplicate handling", () => {
  it("normalizes case and whitespace to one dedup key", () => {
    assert.equal(normalizeEmail("  Teste@Example.INVALID "), "teste@example.invalid");
  });

  it("maps differently-cased addresses to the same upsert target", () => {
    const first = validateSubmission({ ...valid, email: "Teste@Example.Invalid" });
    const second = validateSubmission({ ...valid, email: "teste@example.invalid  " });
    assert.ok(first && second);
    assert.equal(first.emailNormalized, second.emailNormalized);
  });

  it("preserves the address as typed for display", () => {
    const result = validateSubmission({ ...valid, email: "Teste@Example.Invalid" });
    assert.ok(result);
    assert.equal(result.email, "Teste@Example.Invalid");
    assert.equal(result.emailNormalized, "teste@example.invalid");
  });
});

describe("honeypot", () => {
  it("trips when the hidden field is filled", () => {
    assert.equal(isHoneypotTripped({ ...valid, website: "http://spam" }), true);
  });

  it("does not trip when empty, blank, or absent", () => {
    assert.equal(isHoneypotTripped({ ...valid, website: "" }), false);
    assert.equal(isHoneypotTripped({ ...valid, website: "   " }), false);
    assert.equal(isHoneypotTripped(valid), false);
  });
});

describe("hashIp", () => {
  const secret = "test-salt";

  it("is deterministic", () => {
    assert.equal(hashIp("203.0.113.7", secret), hashIp("203.0.113.7", secret));
  });

  it("differs per address and per secret", () => {
    assert.notEqual(hashIp("203.0.113.7", secret), hashIp("203.0.113.8", secret));
    assert.notEqual(hashIp("203.0.113.7", secret), hashIp("203.0.113.7", "other"));
  });

  it("never leaks the address, and matches the column's CHECK constraint", () => {
    const digest = hashIp("203.0.113.7", secret);
    assert.ok(!digest.includes("203.0.113.7"));
    assert.match(digest, /^[0-9a-f]{64}$/);
  });
});

describe("extractClientIp", () => {
  it("takes the first hop of x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.7, 70.41.3.18" });
    assert.equal(extractClientIp(headers), "203.0.113.7");
  });

  it("falls back to x-real-ip", () => {
    assert.equal(extractClientIp(new Headers({ "x-real-ip": "203.0.113.9" })), "203.0.113.9");
  });

  it("returns null when no address is present", () => {
    assert.equal(extractClientIp(new Headers()), null);
  });
});

describe("isSameOrigin", () => {
  it("accepts a matching origin and host", () => {
    const headers = new Headers({
      origin: "https://www.andrefiker.com.br",
      host: "www.andrefiker.com.br",
    });
    assert.equal(isSameOrigin(headers), true);
  });

  it("rejects a foreign origin", () => {
    const headers = new Headers({
      origin: "https://evil.example.com",
      host: "www.andrefiker.com.br",
    });
    assert.equal(isSameOrigin(headers), false);
  });

  it("rejects a missing origin", () => {
    assert.equal(isSameOrigin(new Headers({ host: "www.andrefiker.com.br" })), false);
  });

  it("rejects sec-fetch-site cross-site even when origin matches", () => {
    const headers = new Headers({
      origin: "https://www.andrefiker.com.br",
      host: "www.andrefiker.com.br",
      "sec-fetch-site": "cross-site",
    });
    assert.equal(isSameOrigin(headers), false);
  });

  it("prefers x-forwarded-host behind a proxy", () => {
    const headers = new Headers({
      origin: "https://www.andrefiker.com.br",
      "x-forwarded-host": "www.andrefiker.com.br",
      host: "internal.vercel.app",
    });
    assert.equal(isSameOrigin(headers), true);
  });
});
