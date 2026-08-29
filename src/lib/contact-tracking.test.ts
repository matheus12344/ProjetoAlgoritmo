import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import {
  CONTACT_CONVERSION_SEND_TO,
  GOOGLE_ADS_ID,
  trackContactAttempt,
} from "./contact-tracking";

const originalWindow = globalThis.window;

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

test("trackContactAttempt distinguishes TCC leads without clinical data", () => {
  const commands: unknown[][] = [];
  const dataLayer: Array<Record<string, unknown>> = [];

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      dataLayer,
      location: {
        hash: "#tcc",
        pathname: "/terapia-guarulhos",
      },
      gtag: (...args: unknown[]) => commands.push(args),
    },
    writable: true,
  });

  trackContactAttempt({
    channel: "whatsapp",
    ctaLabel: "Conversar sobre TCC e ACT",
    ctaLocation: "lp_tcc",
  });

  assert.deepEqual(dataLayer, [
    {
      contact_channel: "whatsapp",
      cta_label: "Conversar sobre TCC e ACT",
      cta_location: "lp_tcc",
      event: "lead_click",
      event_category: "contact",
      landing_path: "/terapia-guarulhos",
      landing_section: "tcc",
      lead_channel: "whatsapp",
      send_to: GOOGLE_ADS_ID,
    },
  ]);

  assert.equal(commands.length, 2);
  assert.deepEqual(commands[0], [
    "event",
    "conversion",
    {
      contact_channel: "whatsapp",
      cta_label: "Conversar sobre TCC e ACT",
      cta_location: "lp_tcc",
      event_category: "contact",
      landing_path: "/terapia-guarulhos",
      landing_section: "tcc",
      send_to: CONTACT_CONVERSION_SEND_TO,
      transport_type: "beacon",
    },
  ]);
  assert.equal(commands[1][0], "event");
  assert.equal(commands[1][1], "whatsapp_click");
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
    },
    writable: true,
  });

  trackContactAttempt(
    {
      channel: "whatsapp",
      ctaLabel: "Agendar via WhatsApp",
      ctaLocation: "lp_hero",
    },
    () => {
      completed = true;
    },
  );

  assert.equal(completed, true);
});
