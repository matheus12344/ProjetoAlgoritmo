import { hasAnalyticsConsent } from "./consent";

export const GOOGLE_ANALYTICS_ID = "G-8PBSESWNLH";

export const GOOGLE_ANALYTICS_CONFIG = {
  allow_ad_personalization_signals: false,
  allow_google_signals: false,
  send_page_view: false,
} as const;

type SafeRoute = {
  pathname: string;
  title: string;
};

const SAFE_ROUTES: Record<string, SafeRoute> = {
  "/": {
    pathname: "/",
    title: "André Fiker | Psicólogo",
  },
  "/blog": {
    pathname: "/blog",
    title: "Blog | André Fiker",
  },
  "/cookies": {
    pathname: "/cookies",
    title: "Política de Cookies | André Fiker",
  },
  "/privacidade": {
    pathname: "/privacidade",
    title: "Política de Privacidade | André Fiker",
  },
  "/terapia-guarulhos": {
    pathname: "/terapia-guarulhos",
    title: "Terapia Comportamental e TCC em Guarulhos",
  },
};

export function getSafeAnalyticsRoute(pathname: string): SafeRoute {
  const normalized = pathname.startsWith("/") ? pathname : "/";
  const exactRoute = SAFE_ROUTES[normalized];

  if (exactRoute) {
    return exactRoute;
  }

  if (normalized.startsWith("/blog/")) {
    return {
      pathname: "/blog/artigo",
      title: "Artigo do blog | André Fiker",
    };
  }

  return {
    pathname: "/pagina",
    title: "Site profissional | André Fiker",
  };
}

export function buildSanitizedPageView(origin: string, pathname: string) {
  const safeRoute = getSafeAnalyticsRoute(pathname);

  return {
    page_location: `${origin}${safeRoute.pathname}`,
    page_path: safeRoute.pathname,
    page_title: safeRoute.title,
  };
}

export function emitSanitizedPageView(pathname?: string): boolean {
  if (
    typeof window === "undefined" ||
    !hasAnalyticsConsent() ||
    typeof window.gtag !== "function"
  ) {
    return false;
  }

  const payload = buildSanitizedPageView(
    window.location.origin,
    pathname ?? window.location.pathname,
  );

  window.gtag("event", "page_view", {
    ...payload,
    send_to: GOOGLE_ANALYTICS_ID,
  });

  return true;
}
