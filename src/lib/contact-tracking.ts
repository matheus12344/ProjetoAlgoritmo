"use client";

import {
  AD_REFERENCE_STORAGE_KEY,
  appendAdReference,
  findAdClickIdentifier,
  isValidAdReference,
} from "./ad-click-reference";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export const GOOGLE_ADS_ID = "AW-10966063764";
export const CONTACT_CONVERSION_SEND_TO =
  "AW-10966063764/eYEhCK_w8uYaEJS1g-0o";

type ContactChannel = "whatsapp" | "phone";

type ContactClickOptions = {
  channel: ContactChannel;
  ctaLocation: string;
  ctaLabel: string;
};

type StoredAdReference = {
  reference: string;
  expiresAt: string;
};

let activeCapture: {
  key: string;
  promise: Promise<string | null>;
} | null = null;
let currentAdReference: string | null = null;

function readStoredAdReference(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (currentAdReference) {
    return currentAdReference;
  }

  try {
    const raw = window.sessionStorage.getItem(AD_REFERENCE_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const stored = JSON.parse(raw) as Partial<StoredAdReference>;
    if (
      typeof stored.reference !== "string" ||
      !isValidAdReference(stored.reference) ||
      typeof stored.expiresAt !== "string" ||
      Date.parse(stored.expiresAt) <= Date.now()
    ) {
      window.sessionStorage.removeItem(AD_REFERENCE_STORAGE_KEY);
      return null;
    }

    currentAdReference = stored.reference;
    return currentAdReference;
  } catch {
    return null;
  }
}

export function captureAdClickReference(): Promise<string | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  const capture = findAdClickIdentifier(
    new URLSearchParams(window.location.search),
  );
  if (!capture) {
    return Promise.resolve(readStoredAdReference());
  }

  const key = `${capture.clickIdType}:${capture.clickId}`;
  if (activeCapture?.key === key) {
    return activeCapture.promise;
  }

  currentAdReference = null;
  try {
    window.sessionStorage.removeItem(AD_REFERENCE_STORAGE_KEY);
  } catch {
    // Storage may be blocked. The in-memory reference is already cleared.
  }

  const promise = fetch("/api/ad-click-reference", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(capture),
    cache: "no-store",
    credentials: "same-origin",
  })
    .then(async (response) => {
      if (!response.ok) {
        return null;
      }

      const result = (await response.json()) as Partial<StoredAdReference>;
      if (
        typeof result.reference !== "string" ||
        !isValidAdReference(result.reference) ||
        typeof result.expiresAt !== "string" ||
        Date.parse(result.expiresAt) <= Date.now()
      ) {
        return null;
      }

      try {
        window.sessionStorage.setItem(
          AD_REFERENCE_STORAGE_KEY,
          JSON.stringify({
            reference: result.reference,
            expiresAt: result.expiresAt,
          }),
        );
      } catch {
        // Storage may be blocked. The request still remains safely recorded.
      }

      currentAdReference = result.reference;
      return currentAdReference;
    })
    .catch(() => null);

  activeCapture = { key, promise };
  void promise.then((reference) => {
    if (!reference && activeCapture?.key === key) {
      activeCapture = null;
    }
  });
  return promise;
}

function getSafeMetadata({
  channel,
  ctaLocation,
  ctaLabel,
}: ContactClickOptions) {
  return {
    contact_channel: channel,
    cta_location: ctaLocation,
    cta_label: ctaLabel,
    landing_path: window.location.pathname,
    landing_section: window.location.hash.replace(/^#/, "") || "top",
    event_category: "contact",
  };
}

function pushDataLayerEvent(event: string, payload: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

export function trackContactAttempt(
  options: ContactClickOptions,
  onTracked?: () => void,
) {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof window.gtag !== "function") {
    onTracked?.();
    return;
  }

  const metadata = getSafeMetadata(options);

  pushDataLayerEvent("lead_click", {
    lead_channel: options.channel,
    send_to: GOOGLE_ADS_ID,
    ...metadata,
  });

  let fired = false;
  const complete = () => {
    if (fired) return;
    fired = true;
    onTracked?.();
  };

  window.gtag("event", "conversion", {
    send_to: CONTACT_CONVERSION_SEND_TO,
    transport_type: "beacon",
    ...metadata,
    ...(onTracked ? { event_callback: complete } : {}),
  });

  window.gtag(
    "event",
    options.channel === "whatsapp" ? "whatsapp_click" : "phone_click",
    {
      send_to: GOOGLE_ADS_ID,
      transport_type: "beacon",
      ...metadata,
    },
  );

  if (onTracked) {
    setTimeout(complete, 400);
  }
}

export function openTrackedWhatsApp(
  message: string,
  ctaLocation: string,
  ctaLabel: string,
) {
  if (typeof window === "undefined") {
    return;
  }

  const phoneNumber = "5511961820112";

  let redirected = false;
  const openWhatsApp = () => {
    if (redirected) return;
    redirected = true;

    void Promise.race([
      captureAdClickReference(),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 800)),
    ]).then((capturedReference) => {
      const messageWithReference = appendAdReference(
        message,
        capturedReference ?? readStoredAdReference(),
      );
      const destination = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageWithReference)}`;
      window.open(destination, "_blank", "noopener,noreferrer");
    });
  };

  trackContactAttempt(
    {
      channel: "whatsapp",
      ctaLocation,
      ctaLabel,
    },
    openWhatsApp,
  );
}

export function openTrackedPhoneCall(ctaLocation: string, ctaLabel: string) {
  if (typeof window === "undefined") {
    return;
  }

  trackContactAttempt({
    channel: "phone",
    ctaLocation,
    ctaLabel,
  });

  window.location.href = "tel:+5511961820112";
}
