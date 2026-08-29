import assert from "node:assert/strict";
import { test } from "node:test";
import {
  appendAdReference,
  findAdClickIdentifier,
  isValidAdReference,
  validateAdClickCapture,
} from "./ad-click-reference";

test("selects a valid Google Ads click ID without changing its case", () => {
  const result = findAdClickIdentifier(
    new URLSearchParams("gclid=EAIaIQobChMIAbCdEf1234&gclsrc=aw.ds"),
  );

  assert.deepEqual(result, {
    clickIdType: "gclid",
    clickId: "EAIaIQobChMIAbCdEf1234",
  });
});

test("ignores a non-Ads gclid source and falls back to wbraid", () => {
  const result = findAdClickIdentifier(
    new URLSearchParams(
      "gclid=EAIaIQobChMIAbCdEf1234&gclsrc=partner&wbraid=ClEKCAiAValidWebClick123",
    ),
  );

  assert.deepEqual(result, {
    clickIdType: "wbraid",
    clickId: "ClEKCAiAValidWebClick123",
  });
});

test("rejects malformed capture requests", () => {
  assert.equal(validateAdClickCapture(null), null);
  assert.equal(
    validateAdClickCapture({ clickIdType: "email", clickId: "person@example.com" }),
    null,
  );
  assert.equal(
    validateAdClickCapture({ clickIdType: "gclid", clickId: "has spaces" }),
    null,
  );
});

test("keeps only the allowed click fields from a capture request", () => {
  assert.deepEqual(
    validateAdClickCapture({
      clickIdType: "gclid",
      clickId: "EAIaIQobChMIAbCdEf1234",
      message: "sensitive content must be ignored",
      phone: "5511999999999",
    }),
    {
      clickIdType: "gclid",
      clickId: "EAIaIQobChMIAbCdEf1234",
    },
  );
});

test("appends only a valid opaque reference to the WhatsApp draft", () => {
  const original = "Olá André, gostaria de conversar";
  const reference = "AF-7K9M-4Q2X";

  assert.equal(isValidAdReference(reference), true);
  assert.equal(
    appendAdReference(original, reference),
    `${original}\n\nReferência do anúncio: ${reference}`,
  );
  assert.equal(appendAdReference(original, "gclid-secret"), original);
});
