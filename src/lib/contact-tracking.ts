"use client";

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

function getSafeMetadata({
  channel,
  ctaLocation,
  ctaLabel,
}: ContactClickOptions) {
  return {
    contact_channel: channel,
    cta_location: ctaLocation,
    cta_label: ctaLabel,
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
  const destination = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  let redirected = false;
  const openWhatsApp = () => {
    if (redirected) return;
    redirected = true;
    window.open(destination, "_blank", "noopener,noreferrer");
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
