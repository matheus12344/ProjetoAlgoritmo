export const AD_CLICK_ID_TYPES = ["gclid", "gbraid", "wbraid"] as const;
export type AdClickIdType = (typeof AD_CLICK_ID_TYPES)[number];

export const AD_REFERENCE_STORAGE_KEY = "andrefiker_ad_reference_v1";

const CLICK_ID_PATTERN = /^[A-Za-z0-9._~-]{10,512}$/;
const REFERENCE_PATTERN =
  /^AF-[23456789ABCDEFGHJKMNPQRSTVWXYZ]{4}-[23456789ABCDEFGHJKMNPQRSTVWXYZ]{4}$/;

export type AdClickIdentifier = {
  clickIdType: AdClickIdType;
  clickId: string;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isValidAdClickId(value: string): boolean {
  return CLICK_ID_PATTERN.test(value);
}

export function isValidAdReference(value: string): boolean {
  return REFERENCE_PATTERN.test(value);
}

export function findAdClickIdentifier(
  searchParams: URLSearchParams,
): AdClickIdentifier | null {
  const gclsrc = searchParams.get("gclsrc");
  const gclid = searchParams.get("gclid")?.trim() ?? "";
  const gclidIsGoogleAds = !gclsrc || gclsrc.includes("aw");

  if (gclidIsGoogleAds && isValidAdClickId(gclid)) {
    return { clickIdType: "gclid", clickId: gclid };
  }

  for (const clickIdType of ["wbraid", "gbraid"] as const) {
    const clickId = searchParams.get(clickIdType)?.trim() ?? "";
    if (isValidAdClickId(clickId)) {
      return { clickIdType, clickId };
    }
  }

  return null;
}

export function validateAdClickCapture(
  payload: unknown,
): AdClickIdentifier | null {
  if (!isPlainObject(payload)) {
    return null;
  }

  const { clickIdType, clickId } = payload;
  if (
    typeof clickIdType !== "string" ||
    !AD_CLICK_ID_TYPES.includes(clickIdType as AdClickIdType) ||
    typeof clickId !== "string" ||
    !isValidAdClickId(clickId)
  ) {
    return null;
  }

  return {
    clickIdType: clickIdType as AdClickIdType,
    clickId,
  };
}

export function appendAdReference(message: string, reference: string | null) {
  if (!reference || !isValidAdReference(reference)) {
    return message;
  }

  return `${message}\n\nReferência do anúncio: ${reference}`;
}
