"use client";

import {
  AD_REFERENCE_STORAGE_KEY,
  appendAdReference,
  findAdClickIdentifier,
  isValidAdReference,
} from "./ad-click-reference";
import {
  hasAdvertisingConsent,
  hasAnalyticsConsent,
} from "./consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GOOGLE_ADS_ID = "AW-10966063764";
export const CONTACT_CONVERSION_SEND_TO =
  "AW-10966063764/eYEhCK_w8uYaEJS1g-0o";

const WHATSAPP_AF_CAPTURE_TIMEOUT_MS = 3_000;

type ContactChannel = "whatsapp" | "phone";
export type ContactPlacement =
  | "hero"
  | "approach"
  | "scheduling"
  | "final"
  | "sticky"
  | "nav";

type ContactClickOptions = {
  channel: ContactChannel;
  placement: ContactPlacement;
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
let captureGeneration = 0;

function readStoredAdReference(): string | null {
  if (typeof window === "undefined" || !hasAdvertisingConsent()) {
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

export function captureAdClickReference(
  signal?: AbortSignal,
): Promise<string | null> {
  if (
    typeof window === "undefined" ||
    signal?.aborted ||
    !hasAdvertisingConsent()
  ) {
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
  const generation = captureGeneration;
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
    signal,
  })
    .then(async (response) => {
      if (
        signal?.aborted ||
        !response.ok ||
        generation !== captureGeneration ||
        !hasAdvertisingConsent()
      ) {
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

      if (
        signal?.aborted ||
        generation !== captureGeneration ||
        !hasAdvertisingConsent()
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

type WhatsAppCaptureResult = {
  reference: string | null;
  timedOut: boolean;
};

function captureAdReferenceForWhatsApp(): Promise<WhatsAppCaptureResult> {
  return new Promise((resolve) => {
    const controller =
      typeof AbortController === "undefined" ? null : new AbortController();
    let settled = false;

    const finish = (result: WhatsAppCaptureResult) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      resolve(result);
    };

    const timeoutId = setTimeout(() => {
      controller?.abort();
      finish({ reference: null, timedOut: true });
    }, WHATSAPP_AF_CAPTURE_TIMEOUT_MS);

    try {
      void captureAdClickReference(controller?.signal).then(
        (reference) => finish({ reference, timedOut: false }),
        () => finish({ reference: null, timedOut: false }),
      );
    } catch {
      finish({ reference: null, timedOut: false });
    }
  });
}

export function clearAdClickReference() {
  captureGeneration += 1;
  activeCapture = null;
  currentAdReference = null;

  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.removeItem(AD_REFERENCE_STORAGE_KEY);
    } catch {
      // Storage may be unavailable; the in-memory reference was still cleared.
    }
  }
}

function getSafeMetadata({
  channel,
  placement,
}: ContactClickOptions) {
  return {
    contact_channel: channel,
    cta_placement: placement,
    landing_path: window.location.pathname,
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

  const analyticsAllowed = hasAnalyticsConsent();
  const advertisingAllowed = hasAdvertisingConsent();

  if (
    (!analyticsAllowed && !advertisingAllowed) ||
    typeof window.gtag !== "function"
  ) {
    onTracked?.();
    return;
  }

  const metadata = getSafeMetadata(options);

  if (analyticsAllowed) {
    pushDataLayerEvent("lead_click", {
      lead_channel: options.channel,
      ...metadata,
    });

    window.gtag(
      "event",
      options.channel === "whatsapp" ? "whatsapp_click" : "phone_click",
      {
        send_to: "G-8PBSESWNLH",
        transport_type: "beacon",
        ...metadata,
      },
    );
  }

  let fired = false;
  const complete = () => {
    if (fired) return;
    fired = true;
    onTracked?.();
  };

  if (advertisingAllowed) {
    window.gtag("event", "conversion", {
      send_to: CONTACT_CONVERSION_SEND_TO,
      transport_type: "beacon",
      ...metadata,
      ...(onTracked ? { event_callback: complete } : {}),
    });
  } else {
    complete();
  }

  if (onTracked && advertisingAllowed) {
    setTimeout(complete, 400);
  }
}

export function openTrackedWhatsApp(
  message: string,
  placement: ContactPlacement,
) {
  if (typeof window === "undefined") {
    return;
  }

  const phoneNumber = "5511961820112";

  let pendingWindow: Window | null = null;
  try {
    pendingWindow = window.open("about:blank", "_blank");
    if (pendingWindow) {
      try {
        pendingWindow.opener = null;
      } catch {
        pendingWindow.close();
        pendingWindow = null;
      }
    }
  } catch {
    // Popup blocking must not prevent the contact attempt. The current page
    // becomes the fail-open target after the attribution attempt completes.
  }

  let capturePromise: Promise<WhatsAppCaptureResult>;
  try {
    // Start capture synchronously in the click handler. Basic Consent remains
    // authoritative inside captureAdClickReference(), so rejected visitors do
    // not create a request or touch advertising storage.
    capturePromise = captureAdReferenceForWhatsApp();
  } catch {
    capturePromise = Promise.resolve({ reference: null, timedOut: false });
  }

  let redirected = false;
  const openWhatsApp = () => {
    if (redirected) return;
    redirected = true;

    void capturePromise.then(({ reference: capturedReference, timedOut }) => {
      const allowedReference = !timedOut && hasAdvertisingConsent()
        ? capturedReference ?? readStoredAdReference()
        : null;
      const messageWithReference = appendAdReference(
        message,
        allowedReference,
      );
      const destination = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageWithReference)}`;

      try {
        if (pendingWindow && !pendingWindow.closed) {
          pendingWindow.location.replace(destination);
          return;
        }
      } catch {
        // A closed or inaccessible pending window falls through to same-tab
        // navigation. The contact remains possible even without attribution.
      }

      window.location.assign(destination);
    });
  };

  try {
    trackContactAttempt(
      {
        channel: "whatsapp",
        placement,
      },
      openWhatsApp,
    );
  } catch {
    openWhatsApp();
  }
}

export function openTrackedPhoneCall(placement: ContactPlacement) {
  if (typeof window === "undefined") {
    return;
  }

  trackContactAttempt({
    channel: "phone",
    placement,
  });

  window.location.href = "tel:+5511961820112";
}
