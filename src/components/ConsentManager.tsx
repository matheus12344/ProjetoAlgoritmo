"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { clearAdClickReference } from "@/lib/contact-tracking";
import {
  clearAdvertisingStorage,
  clearAnalyticsStorage,
  ConsentChoices,
  ConsentPreferences,
  getConsentPreferences,
  OPEN_CONSENT_SETTINGS_EVENT,
  saveConsentPreferences,
} from "@/lib/consent";
import {
  emitSanitizedPageView,
  GOOGLE_ANALYTICS_CONFIG,
  GOOGLE_ANALYTICS_ID,
} from "@/lib/page-view";

const GOOGLE_ADS_ID = "AW-10966063764";
const GOOGLE_TAG_SCRIPT_ID = "af-google-tag";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __afConsentDefaultsSet?: boolean;
    __afGoogleTagInitialized?: boolean;
    __afAnalyticsConfigured?: boolean;
    __afAdsConfigured?: boolean;
  }
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };

  return window.gtag;
}

function loadGoogleTag(choices: ConsentChoices) {
  if (!choices.analytics && !choices.advertising) {
    return;
  }

  const gtag = ensureGtag();

  if (!window.__afGoogleTagInitialized) {
    window.__afGoogleTagInitialized = true;
    gtag("js", new Date());
  }

  if (!document.getElementById(GOOGLE_TAG_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = GOOGLE_TAG_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${
      choices.analytics ? GOOGLE_ANALYTICS_ID : GOOGLE_ADS_ID
    }`;
    script.dataset.consentManaged = "true";
    document.head.appendChild(script);
  }

  if (choices.analytics && !window.__afAnalyticsConfigured) {
    window.__afAnalyticsConfigured = true;
    gtag("config", GOOGLE_ANALYTICS_ID, GOOGLE_ANALYTICS_CONFIG);
  }

  if (choices.advertising && !window.__afAdsConfigured) {
    window.__afAdsConfigured = true;
    gtag("config", GOOGLE_ADS_ID, {
      allow_ad_personalization_signals: false,
      allow_enhanced_conversions: false,
    });
  }
}

function applyGoogleConsent(choices: ConsentChoices) {
  const gtag = ensureGtag();

  if (!window.__afConsentDefaultsSet) {
    window.__afConsentDefaultsSet = true;
    gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted",
      wait_for_update: 500,
    });
  }

  gtag("consent", "update", {
    ad_storage: choices.advertising ? "granted" : "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: choices.analytics ? "granted" : "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
  });

  if (!choices.analytics) {
    clearAnalyticsStorage();
  }

  if (!choices.advertising) {
    clearAdClickReference();
    clearAdvertisingStorage();
  }

  loadGoogleTag(choices);
}

const deniedChoices: ConsentChoices = {
  analytics: false,
  advertising: false,
};

export function ConsentManager() {
  const pathname = usePathname();
  const lastPageViewPath = useRef<string | null>(null);
  const [preferences, setPreferences] = useState<
    ConsentPreferences | null | undefined
  >(undefined);
  const [isManaging, setIsManaging] = useState(false);
  const [draft, setDraft] = useState<ConsentChoices>(deniedChoices);

  useEffect(() => {
    const stored = getConsentPreferences();
    setPreferences(stored);
    setDraft(stored ?? deniedChoices);
    applyGoogleConsent(stored ?? deniedChoices);

    const openSettings = () => {
      const current = getConsentPreferences();
      setDraft(current ?? deniedChoices);
      setIsManaging(true);
    };

    window.addEventListener(OPEN_CONSENT_SETTINGS_EVENT, openSettings);
    return () => {
      window.removeEventListener(OPEN_CONSENT_SETTINGS_EVENT, openSettings);
    };
  }, []);

  useEffect(() => {
    if (!preferences?.analytics) {
      lastPageViewPath.current = null;
      return;
    }

    if (
      lastPageViewPath.current !== pathname &&
      emitSanitizedPageView(pathname)
    ) {
      lastPageViewPath.current = pathname;
    }
  }, [pathname, preferences?.analytics]);

  const choose = (choices: ConsentChoices) => {
    const saved = saveConsentPreferences(choices);
    setPreferences(saved);
    setDraft(saved);
    setIsManaging(false);
    applyGoogleConsent(saved);
  };

  if (preferences === undefined) {
    return null;
  }

  return (
    <>
      {preferences === null && !isManaging ? (
        <section
          aria-label="Preferências de privacidade"
          className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-950 dark:text-white sm:inset-x-6 sm:p-6"
          role="dialog"
        >
          <h2 className="text-lg font-semibold">Sua privacidade neste site</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Cookies e armazenamento opcionais ficam desativados até sua escolha.
            Você pode aceitar ou rejeitar a medição do site e da publicidade sem
            afetar o contato pelo WhatsApp ou telefone.
          </p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Consulte a <Link className="underline" href="/privacidade">Política de Privacidade</Link>{" "}
            e a <Link className="underline" href="/cookies">Política de Cookies</Link>.
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              onClick={() => choose({ analytics: true, advertising: true })}
              type="button"
            >
              Aceitar tudo
            </button>
            <button
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-900"
              onClick={() => choose(deniedChoices)}
              type="button"
            >
              Rejeitar opcionais
            </button>
            <button
              className="rounded-full px-5 py-3 text-sm font-semibold text-blue-700 underline-offset-4 hover:underline dark:text-blue-300"
              onClick={() => setIsManaging(true)}
              type="button"
            >
              Gerenciar preferências
            </button>
          </div>
        </section>
      ) : null}

      {isManaging ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/55 p-3 sm:items-center sm:p-6"
          role="presentation"
        >
          <section
            aria-labelledby="consent-settings-title"
            aria-modal="true"
            className="w-full max-w-xl rounded-2xl bg-white p-6 text-slate-900 shadow-2xl dark:bg-slate-950 dark:text-white"
            role="dialog"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="consent-settings-title" className="text-xl font-semibold">
                  Preferências de privacidade
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  Você pode alterar ou revogar sua escolha a qualquer momento.
                </p>
              </div>
              {preferences ? (
                <button
                  aria-label="Fechar preferências"
                  className="rounded-full px-3 py-1 text-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900"
                  onClick={() => setIsManaging(false)}
                  type="button"
                >
                  ×
                </button>
              ) : null}
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <p className="font-semibold">Essenciais — sempre ativos</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  Guardam somente sua escolha de privacidade e mantêm recursos
                  básicos do site.
                </p>
              </div>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <input
                  checked={draft.analytics}
                  className="mt-1 h-4 w-4"
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      analytics: event.target.checked,
                    }))
                  }
                  type="checkbox"
                />
                <span>
                  <span className="block font-semibold">Medição do site</span>
                  <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">
                    Autoriza o Google Analytics 4 a registrar dados técnicos e
                    agregados de uso, sem conteúdo clínico.
                  </span>
                </span>
              </label>

              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <input
                  checked={draft.advertising}
                  className="mt-1 h-4 w-4"
                  onChange={(event) =>
                    setDraft((current) => ({
                      ...current,
                      advertising: event.target.checked,
                    }))
                  }
                  type="checkbox"
                />
                <span>
                  <span className="block font-semibold">Medição de publicidade</span>
                  <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">
                    Autoriza a medição de cliques de contato e a referência opaca
                    AF. Personalização e dados de usuário permanecem desativados.
                  </span>
                </span>
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-900"
                onClick={() => choose(deniedChoices)}
                type="button"
              >
                Rejeitar opcionais
              </button>
              <button
                className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                onClick={() => choose(draft)}
                type="button"
              >
                Salvar preferências
              </button>
            </div>
          </section>
        </div>
      ) : null}

      {preferences !== null && !isManaging ? (
        <button
          className="fixed bottom-3 left-3 z-[60] rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-lg hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900 sm:bottom-4 sm:left-4"
          onClick={() => setIsManaging(true)}
          type="button"
        >
          Privacidade
        </button>
      ) : null}
    </>
  );
}
