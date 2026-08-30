import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  CONTACT_CONVERSION_SEND_TO,
  captureAdClickReference,
  clearAdClickReference,
  openTrackedWhatsApp,
  trackContactAttempt,
} from "./contact-tracking";
import { CONSENT_STORAGE_KEY } from "./consent";

const originalWindow = globalThis.window;
const originalFetch = globalThis.fetch;

function consentValue(analytics: boolean, advertising: boolean) {
  return JSON.stringify({
    version: 1,
    analytics,
    advertising,
    decidedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  });
}

function localStorageWithConsent(analytics: boolean, advertising: boolean) {
  return {
    getItem: (key: string) =>
      key === CONSENT_STORAGE_KEY
        ? consentValue(analytics, advertising)
        : null,
    removeItem: () => undefined,
    setItem: () => undefined,
  };
}

function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  const promise = new Promise<T>((resolvePromise) => {
    resolve = resolvePromise;
  });

  return { promise, resolve };
}

function createPopupTarget() {
  const navigations: string[] = [];
  const popup = {
    closed: false,
    opener: {} as unknown,
    location: {
      replace: (destination: string) => navigations.push(destination),
    },
  };

  return { navigations, popup };
}

async function flushAsyncWork() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  await new Promise((resolve) => setTimeout(resolve, 0));
}

afterEach(() => {
  clearAdClickReference();
  globalThis.fetch = originalFetch;

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

test("trackContactAttempt uses a neutral placement and excludes URL fragments", () => {
  const commands: unknown[][] = [];
  const dataLayer: Array<Record<string, unknown>> = [];

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      dataLayer,
      location: {
        hash: "#ansiedade",
        pathname: "/terapia-guarulhos",
      },
      localStorage: localStorageWithConsent(true, true),
      gtag: (...args: unknown[]) => commands.push(args),
    },
    writable: true,
  });

  trackContactAttempt({
    channel: "whatsapp",
    placement: "approach",
  });

  assert.deepEqual(dataLayer, [
    {
      contact_channel: "whatsapp",
      cta_placement: "approach",
      event: "lead_click",
      event_category: "contact",
      landing_path: "/terapia-guarulhos",
      lead_channel: "whatsapp",
    },
  ]);

  assert.equal(commands.length, 2);
  assert.deepEqual(commands[0], [
    "event",
    "whatsapp_click",
    {
      contact_channel: "whatsapp",
      cta_placement: "approach",
      event_category: "contact",
      landing_path: "/terapia-guarulhos",
      send_to: "G-8PBSESWNLH",
      transport_type: "beacon",
    },
  ]);
  assert.deepEqual(commands[1], [
    "event",
    "conversion",
    {
      contact_channel: "whatsapp",
      cta_placement: "approach",
      event_category: "contact",
      landing_path: "/terapia-guarulhos",
      send_to: CONTACT_CONVERSION_SEND_TO,
      transport_type: "beacon",
    },
  ]);

  assert.doesNotMatch(JSON.stringify({ commands, dataLayer }), /ansiedade|landing_section/);
});

test("trackContactAttempt still completes when Google scripts are unavailable", () => {
  let completed = false;

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      dataLayer: [],
      location: {
        hash: "",
        pathname: "/terapia-guarulhos",
      },
      localStorage: localStorageWithConsent(true, true),
    },
    writable: true,
  });

  trackContactAttempt(
    {
      channel: "whatsapp",
      placement: "hero",
    },
    () => {
      completed = true;
    },
  );

  assert.equal(completed, true);
});

test("WhatsApp receives the opaque reference but never the click ID", async () => {
  const openCalls: Array<{ target: string; url: string }> = [];
  const { navigations, popup } = createPopupTarget();
  const storage = new Map<string, string>();
  const reference = "AF-7K9M-4Q2X";
  const expiresAt = new Date(
    Date.now() + 90 * 24 * 60 * 60 * 1000,
  ).toISOString();

  globalThis.fetch = async () =>
    Response.json({ ok: true, reference, expiresAt });

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      dataLayer: [],
      location: {
        hash: "",
        pathname: "/terapia-guarulhos",
        search: "?gclid=EAIaIQobChMIPrivateClick123",
      },
      localStorage: localStorageWithConsent(false, true),
      open: (url: string, target: string) => {
        openCalls.push({ target, url });
        return popup;
      },
      sessionStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        removeItem: (key: string) => storage.delete(key),
        setItem: (key: string, value: string) => storage.set(key, value),
      },
    },
    writable: true,
  });

  openTrackedWhatsApp(
    "Olá André, gostaria de conversar",
    "hero",
  );

  await flushAsyncWork();

  assert.deepEqual(openCalls, [{ target: "_blank", url: "about:blank" }]);
  assert.equal(popup.opener, null);
  assert.equal(navigations.length, 1);
  assert.match(navigations[0], /AF-7K9M-4Q2X/);
  assert.doesNotMatch(navigations[0], /EAIaIQobChMIPrivateClick123/);
});

test("a delayed AF response keeps the reserved popup until capture finishes", async () => {
  const captureResponse = createDeferred<Response>();
  const { navigations, popup } = createPopupTarget();
  const openCalls: string[] = [];
  let requests = 0;
  const reference = "AF-7K9M-4Q2X";
  const expiresAt = new Date(
    Date.now() + 90 * 24 * 60 * 60 * 1000,
  ).toISOString();

  globalThis.fetch = () => {
    requests += 1;
    return captureResponse.promise;
  };

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      dataLayer: [],
      location: {
        pathname: "/terapia-guarulhos",
        search: "?gclid=EAIaIQobChMIPrivateClick123",
      },
      localStorage: localStorageWithConsent(false, true),
      open: (url: string) => {
        openCalls.push(url);
        return popup;
      },
      sessionStorage: {
        getItem: () => null,
        removeItem: () => undefined,
        setItem: () => undefined,
      },
    },
    writable: true,
  });

  openTrackedWhatsApp("Olá André", "hero");

  assert.equal(requests, 1);
  assert.deepEqual(openCalls, ["about:blank"]);
  await new Promise((resolve) => setTimeout(resolve, 850));
  assert.deepEqual(navigations, []);

  captureResponse.resolve(Response.json({ ok: true, reference, expiresAt }));
  await flushAsyncWork();

  assert.equal(navigations.length, 1);
  assert.match(navigations[0], /AF-7K9M-4Q2X/);
  assert.doesNotMatch(navigations[0], /PrivateClick123/);
});

test("an invalid AF response fails open without exposing the click ID", async () => {
  const { navigations, popup } = createPopupTarget();
  const expiresAt = new Date(
    Date.now() + 90 * 24 * 60 * 60 * 1000,
  ).toISOString();

  globalThis.fetch = async () =>
    Response.json({ ok: true, reference: "not-an-af-reference", expiresAt });

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      dataLayer: [],
      location: {
        pathname: "/terapia-guarulhos",
        search: "?gclid=EAIaIQobChMIPrivateClick123",
      },
      localStorage: localStorageWithConsent(false, true),
      open: () => popup,
      sessionStorage: {
        getItem: () => null,
        removeItem: () => undefined,
        setItem: () => undefined,
      },
    },
    writable: true,
  });

  openTrackedWhatsApp("Olá André", "hero");
  await flushAsyncWork();

  assert.equal(navigations.length, 1);
  assert.doesNotMatch(
    navigations[0],
    /not-an-af-reference|PrivateClick123|Referência do anúncio/,
  );
});

test("revoking consent during capture discards the late AF response", async () => {
  const captureResponse = createDeferred<Response>();
  const { navigations, popup } = createPopupTarget();
  const storage = new Map<string, string>();
  let advertisingConsent = true;
  const reference = "AF-7K9M-4Q2X";
  const expiresAt = new Date(
    Date.now() + 90 * 24 * 60 * 60 * 1000,
  ).toISOString();

  globalThis.fetch = () => captureResponse.promise;

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      dataLayer: [],
      location: {
        pathname: "/terapia-guarulhos",
        search: "?gclid=EAIaIQobChMIPrivateClick123",
      },
      localStorage: {
        getItem: (key: string) =>
          key === CONSENT_STORAGE_KEY
            ? consentValue(false, advertisingConsent)
            : null,
        removeItem: () => undefined,
        setItem: () => undefined,
      },
      open: () => popup,
      sessionStorage: {
        getItem: (key: string) => storage.get(key) ?? null,
        removeItem: (key: string) => storage.delete(key),
        setItem: (key: string, value: string) => storage.set(key, value),
      },
    },
    writable: true,
  });

  openTrackedWhatsApp("Olá André", "hero");
  advertisingConsent = false;
  clearAdClickReference();
  captureResponse.resolve(Response.json({ ok: true, reference, expiresAt }));
  await flushAsyncWork();

  assert.equal(storage.size, 0);
  assert.equal(navigations.length, 1);
  assert.doesNotMatch(
    navigations[0],
    /AF-7K9M-4Q2X|PrivateClick123|Referência do anúncio/,
  );
});

test("a blocked popup falls back to same-tab WhatsApp navigation", async () => {
  const sameTabNavigations: string[] = [];
  const reference = "AF-7K9M-4Q2X";
  const expiresAt = new Date(
    Date.now() + 90 * 24 * 60 * 60 * 1000,
  ).toISOString();

  globalThis.fetch = async () =>
    Response.json({ ok: true, reference, expiresAt });

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      dataLayer: [],
      location: {
        assign: (destination: string) => sameTabNavigations.push(destination),
        pathname: "/terapia-guarulhos",
        search: "?gclid=EAIaIQobChMIPrivateClick123",
      },
      localStorage: localStorageWithConsent(false, true),
      open: () => null,
      sessionStorage: {
        getItem: () => null,
        removeItem: () => undefined,
        setItem: () => undefined,
      },
    },
    writable: true,
  });

  openTrackedWhatsApp("Olá André", "hero");
  await flushAsyncWork();

  assert.equal(sameTabNavigations.length, 1);
  assert.match(sameTabNavigations[0], /AF-7K9M-4Q2X/);
  assert.doesNotMatch(sameTabNavigations[0], /PrivateClick123/);
});

test("capture is blocked before advertising consent", async () => {
  let requests = 0;
  let storageReads = 0;
  let storageWrites = 0;

  globalThis.fetch = async () => {
    requests += 1;
    return Response.json({ ok: true });
  };

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      location: {
        hostname: "www.andrefiker.com.br",
        search: "?gclid=EAIaIQobChMIPrivateClick123",
      },
      localStorage: {
        getItem: () => null,
        removeItem: () => undefined,
        setItem: () => undefined,
      },
      sessionStorage: {
        getItem: () => {
          storageReads += 1;
          return null;
        },
        removeItem: () => undefined,
        setItem: () => {
          storageWrites += 1;
        },
      },
    },
    writable: true,
  });

  assert.equal(await captureAdClickReference(), null);
  assert.equal(requests, 0);
  assert.equal(storageReads, 0);
  assert.equal(storageWrites, 0);
});

test("rejecting advertising prevents events, storage and AF reuse", async () => {
  const { navigations, popup } = createPopupTarget();
  let requests = 0;
  const storedReference = JSON.stringify({
    reference: "AF-7K9M-4Q2X",
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  });

  globalThis.fetch = async () => {
    requests += 1;
    return Response.json({ ok: true });
  };

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      dataLayer: [],
      location: {
        hash: "#tema-clinico",
        pathname: "/terapia-guarulhos",
        search: "?gclid=EAIaIQobChMIPrivateClick123",
      },
      localStorage: localStorageWithConsent(false, false),
      open: () => popup,
      sessionStorage: {
        getItem: () => storedReference,
        removeItem: () => undefined,
        setItem: () => undefined,
      },
    },
    writable: true,
  });

  openTrackedWhatsApp("Olá André, gostaria de conversar", "hero");
  await flushAsyncWork();

  assert.equal(requests, 0);
  assert.deepEqual(window.dataLayer, []);
  assert.equal(navigations.length, 1);
  assert.doesNotMatch(
    navigations[0],
    /AF-|PrivateClick|tema-clinico|Referência do anúncio/,
  );
});
