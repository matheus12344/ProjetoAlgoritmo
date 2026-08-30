import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

import { CONSENT_STORAGE_KEY } from "./consent";
import {
  buildSanitizedPageView,
  emitSanitizedPageView,
  GOOGLE_ANALYTICS_CONFIG,
} from "./page-view";

const originalWindow = globalThis.window;

function consentValue(analytics: boolean) {
  return JSON.stringify({
    version: 1,
    analytics,
    advertising: false,
    decidedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  });
}

function analyticsWindow(analytics: boolean, commands: unknown[][]) {
  return {
    gtag: (...args: unknown[]) => commands.push(args),
    location: {
      hash: "#ansiedade",
      origin: "https://www.andrefiker.com.br",
      pathname: "/blog/relato-clinico-identificavel",
      search: "?gclid=PrivateClickId&tema=ansiedade",
    },
    localStorage: {
      getItem: (key: string) =>
        key === CONSENT_STORAGE_KEY ? consentValue(analytics) : null,
      removeItem: () => undefined,
      setItem: () => undefined,
    },
  };
}

afterEach(() => {
  if (originalWindow) {
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: originalWindow,
      writable: true,
    });
    return;
  }

  Reflect.deleteProperty(globalThis, "window");
});

test("GA4 automatic page views are disabled", () => {
  assert.equal(GOOGLE_ANALYTICS_CONFIG.send_page_view, false);
});

test("known routes produce an origin plus pathname without query or hash", () => {
  const payload = buildSanitizedPageView(
    "https://www.andrefiker.com.br",
    "/terapia-guarulhos",
  );

  assert.deepEqual(payload, {
    page_location: "https://www.andrefiker.com.br/terapia-guarulhos",
    page_path: "/terapia-guarulhos",
    page_title: "Terapia Comportamental e TCC em Guarulhos",
  });
  assert.doesNotMatch(JSON.stringify(payload), /[?#]/);
});

test("dynamic and unknown routes are reduced to non-sensitive route buckets", () => {
  const blog = buildSanitizedPageView(
    "https://www.andrefiker.com.br",
    "/blog/relato-clinico-identificavel",
  );
  const unknown = buildSanitizedPageView(
    "https://www.andrefiker.com.br",
    "/diagnostico/sensivel",
  );

  assert.equal(blog.page_location, "https://www.andrefiker.com.br/blog/artigo");
  assert.equal(blog.page_title, "Artigo do blog | André Fiker");
  assert.equal(unknown.page_location, "https://www.andrefiker.com.br/pagina");
  assert.equal(unknown.page_title, "Site profissional | André Fiker");
  assert.doesNotMatch(JSON.stringify({ blog, unknown }), /relato|diagnostico|sensivel/);
});

test("manual page_view is blocked before analytics consent", () => {
  const commands: unknown[][] = [];

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: analyticsWindow(false, commands),
    writable: true,
  });

  assert.equal(emitSanitizedPageView(), false);
  assert.deepEqual(commands, []);
});

test("manual page_view after consent excludes query, hash and dynamic slug", () => {
  const commands: unknown[][] = [];

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: analyticsWindow(true, commands),
    writable: true,
  });

  assert.equal(emitSanitizedPageView(), true);
  assert.deepEqual(commands, [
    [
      "event",
      "page_view",
      {
        page_location: "https://www.andrefiker.com.br/blog/artigo",
        page_path: "/blog/artigo",
        page_title: "Artigo do blog | André Fiker",
        send_to: "G-8PBSESWNLH",
      },
    ],
  ]);
  assert.doesNotMatch(
    JSON.stringify(commands),
    /PrivateClickId|ansiedade|relato-clinico-identificavel|[?#]/,
  );
});
