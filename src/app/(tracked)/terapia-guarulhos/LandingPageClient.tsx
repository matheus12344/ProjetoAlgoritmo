"use client";

import { useEffect } from "react";
import Link from "next/link";

import { ConsentPreferencesButton } from "@/components/ConsentPreferencesButton";
import { LPHero } from "@/components/landing-page/LP-Hero";
import { LPTCC } from "@/components/landing-page/LP-TCC";
import { LPDemands } from "@/components/landing-page/LP-Demands";
import { LPDifferences } from "@/components/landing-page/LP-Differences";
import { LPScheduling } from "@/components/landing-page/LP-Scheduling";
import { LPFAQ } from "@/components/landing-page/LP-FAQ";
import { DoctoraliaWidget } from "@/components/landing-page/DoctoraliaWidget";
import { WhatsAppSticky } from "@/components/landing-page/WhatsAppSticky";
import {
  captureAdClickReference,
  clearAdClickReference,
  openTrackedPhoneCall,
  openTrackedWhatsApp,
} from "@/lib/contact-tracking";
import {
  CONSENT_CHANGED_EVENT,
  hasAdvertisingConsent,
} from "@/lib/consent";

export default function LandingPageClient() {
  useEffect(() => {
    const syncAdReference = () => {
      if (hasAdvertisingConsent()) {
        void captureAdClickReference();
        return;
      }

      clearAdClickReference();
    };

    syncAdReference();
    window.addEventListener(CONSENT_CHANGED_EVENT, syncAdReference);

    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, syncAdReference);
    };
  }, []);

  const handleFinalWhatsAppClick = () => {
    openTrackedWhatsApp(
      "Olá André, vim pelo Google e quero entender se o atendimento faz sentido para a minha situação",
      "final",
    );
  };

  const handleNavPhoneClick = () => {
    openTrackedPhoneCall("nav");
  };

  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="text-xl font-bold text-slate-900 dark:text-white">André Fiker <span className="text-blue-600">Psicólogo</span></span>
          <div className="flex gap-4">
            <button
              onClick={handleNavPhoneClick}
              type="button"
              className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 flex items-center gap-1"
            >
              (11) 96182-0112
            </button>
          </div>
        </div>
      </nav>

      <div id="inicio">
        <LPHero />
      </div>
      <LPTCC />
      <div id="temas">
        <LPDemands />
      </div>
      <div id="sobre-atendimento">
        <LPDifferences />
      </div>
      <section className="border-y border-blue-100 bg-blue-50 px-4 py-10 text-center dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Escopo do atendimento
          </h2>
          <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-300">
            Atendo psicoterapia de adultos. Não realizo avaliação
            neuropsicológica, emissão de laudos ou atendimento de urgência.
          </p>
        </div>
      </section>
      <div id="agendar">
        <LPScheduling />
      </div>
      <DoctoraliaWidget />
      <div id="faq">
        <LPFAQ />
      </div>

      {/* Final CTA Section */}
      <section className="py-24 bg-blue-600 dark:bg-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Quer verificar se este atendimento combina com o que você procura?</h2>
          <p className="text-xl text-blue-50 mb-10 opacity-90">Podemos começar com uma conversa breve pelo WhatsApp para você explicar o que busca e tirar dúvidas.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleFinalWhatsAppClick}
              className="bg-white text-blue-600 hover:bg-slate-50 px-10 py-5 rounded-full text-xl font-bold shadow-xl transition-all hover:scale-105"
              type="button"
            >
              Conversar sobre o atendimento
            </button>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            © 2026 André Fiker - Psicólogo Clínico | CRP 06/115147
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            Atendimento presencial na Clínica Equalize · Rua Doutor Ramos de Azevedo, 159, sala 2112 · Centro · Guarulhos - SP · CEP 07012-020 · (11) 96182-0112
          </p>
          <div className="mb-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            <Link className="text-blue-700 underline-offset-4 hover:underline dark:text-blue-300" href="/privacidade">
              Política de Privacidade
            </Link>
            <Link className="text-blue-700 underline-offset-4 hover:underline dark:text-blue-300" href="/cookies">
              Política de Cookies
            </Link>
            <ConsentPreferencesButton className="text-blue-700 underline-offset-4 hover:underline dark:text-blue-300" />
          </div>
          <p className="text-slate-400 text-xs max-w-2xl mx-auto leading-relaxed">
            O agendamento de consultas via este site não constitui emergência médica. Em casos de crise aguda ou risco imediato, procure o pronto-socorro mais próximo ou ligue 188 (CVV).
          </p>
        </div>
      </footer>

      <WhatsAppSticky />
    </main>
  );
}
