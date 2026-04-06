"use client";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const ADS_SEND_TO = "AW-10966063764";
const WHATSAPP_CONVERSION_SEND_TO = "AW-10966063764/eYEhCK_w8uYaEJS1g-0o";

type LeadChannel = "whatsapp" | "phone";

type LeadClickOptions = {
  channel: LeadChannel;
  ctaLocation: string;
  ctaLabel: string;
  destination: string;
};

function pushDataLayerEvent(event: string, payload: Record<string, unknown>) {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

export function trackLeadClick({
  channel,
  ctaLocation,
  ctaLabel,
  destination,
}: LeadClickOptions) {
  if (typeof window === "undefined") {
    return;
  }

  const payload = {
    lead_channel: channel,
    cta_location: ctaLocation,
    cta_label: ctaLabel,
    destination,
    send_to: ADS_SEND_TO,
  };

  pushDataLayerEvent("lead_click", payload);

  if (typeof window.gtag === "function") {
    window.gtag("event", "contact", payload);

    if (channel === "whatsapp") {
      window.gtag("event", "conversion", {
        send_to: WHATSAPP_CONVERSION_SEND_TO,
      });
    }
  }
}

export function openTrackedWhatsApp(
  message: string,
  ctaLocation: string,
  ctaLabel: string,
) {
  const phoneNumber = "5511961820112";
  const destination = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  trackLeadClick({
    channel: "whatsapp",
    ctaLocation,
    ctaLabel,
    destination,
  });

  window.open(destination, "_blank", "noopener,noreferrer");
}

export function openTrackedPhoneCall(ctaLocation: string, ctaLabel: string) {
  const destination = "tel:+5511961820112";

  trackLeadClick({
    channel: "phone",
    ctaLocation,
    ctaLabel,
    destination,
  });

  window.location.href = destination;
}
