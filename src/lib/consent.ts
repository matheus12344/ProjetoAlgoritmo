import { AD_REFERENCE_STORAGE_KEY } from "./ad-click-reference";

export const CONSENT_STORAGE_KEY = "andrefiker_consent_v1";
export const CONSENT_CHANGED_EVENT = "af:consent-changed";
export const OPEN_CONSENT_SETTINGS_EVENT = "af:open-consent-settings";

const CONSENT_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000;

export type ConsentChoices = {
  analytics: boolean;
  advertising: boolean;
};

export type ConsentPreferences = ConsentChoices & {
  version: 1;
  decidedAt: string;
  expiresAt: string;
};

let inMemoryPreferences: ConsentPreferences | null = null;

function isConsentPreferences(value: unknown): value is ConsentPreferences {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const candidate = value as Partial<ConsentPreferences>;
  return (
    candidate.version === 1 &&
    typeof candidate.analytics === "boolean" &&
    typeof candidate.advertising === "boolean" &&
    typeof candidate.decidedAt === "string" &&
    Number.isFinite(Date.parse(candidate.decidedAt)) &&
    typeof candidate.expiresAt === "string" &&
    Date.parse(candidate.expiresAt) > Date.now()
  );
}

export function getConsentPreferences(): ConsentPreferences | null {
  if (typeof window === "undefined") {
    return inMemoryPreferences;
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      inMemoryPreferences = null;
      return null;
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!isConsentPreferences(parsed)) {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      inMemoryPreferences = null;
      return null;
    }

    inMemoryPreferences = parsed;
    return parsed;
  } catch {
    return inMemoryPreferences;
  }
}

export function saveConsentPreferences(
  choices: ConsentChoices,
): ConsentPreferences {
  const now = new Date();
  const preferences: ConsentPreferences = {
    version: 1,
    analytics: choices.analytics,
    advertising: choices.advertising,
    decidedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + CONSENT_LIFETIME_MS).toISOString(),
  };

  inMemoryPreferences = preferences;

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify(preferences),
      );
    } catch {
      // The choice remains valid for this page view if persistent storage is blocked.
    }

    window.dispatchEvent(
      new CustomEvent<ConsentPreferences>(CONSENT_CHANGED_EVENT, {
        detail: preferences,
      }),
    );
  }

  return preferences;
}

export function hasAnalyticsConsent(): boolean {
  return getConsentPreferences()?.analytics === true;
}

export function hasAdvertisingConsent(): boolean {
  return getConsentPreferences()?.advertising === true;
}

function deleteFirstPartyCookies(predicate: (name: string) => boolean) {
  if (typeof document === "undefined") {
    return;
  }

  const cookieNames = document.cookie
    .split(";")
    .map((entry) => entry.split("=", 1)[0]?.trim())
    .filter((name): name is string => Boolean(name) && predicate(name));

  for (const name of cookieNames) {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;

    if (window.location.hostname.endsWith("andrefiker.com.br")) {
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.andrefiker.com.br; SameSite=Lax`;
    }
  }
}

export function clearAnalyticsStorage() {
  deleteFirstPartyCookies((name) => name === "_ga" || name.startsWith("_ga_"));
}

export function clearAdvertisingStorage() {
  if (typeof window !== "undefined") {
    try {
      window.sessionStorage.removeItem(AD_REFERENCE_STORAGE_KEY);
    } catch {
      // Storage may be unavailable; there is nothing else to clear here.
    }
  }

  deleteFirstPartyCookies((name) => name.startsWith("_gcl_"));
}
