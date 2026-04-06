"use client";

import Script from "next/script";
import { LPHero } from "@/components/landing-page/LP-Hero";
import { LPDemands } from "@/components/landing-page/LP-Demands";
import { LPDifferences } from "@/components/landing-page/LP-Differences";
import { LPScheduling } from "@/components/landing-page/LP-Scheduling";
import { LPFAQ } from "@/components/landing-page/LP-FAQ";
import { WhatsAppSticky } from "@/components/landing-page/WhatsAppSticky";
import Testimonials from "@/components/Testimonials";
import { trackLeadClick } from "@/lib/ads-tracking";

export default function LandingPageClient() {
  return (
    <main className="flex flex-col min-h-screen bg-white dark:bg-slate-950">
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="text-xl font-bold text-slate-900 dark:text-white">André Fiker <span className="text-blue-600">Psicólogo</span></span>
          <div className="flex gap-4">
            <a href="tel:+5511961820112" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 flex items-center gap-1">
              (11) 96182-0112
            </a>
          </div>
        </div>
      </nav>

      <LPHero />
      <LPDemands />
      <LPDifferences />
      <LPScheduling />
      <Testimonials />
      <LPFAQ />

      {/* Final CTA Section */}
      <section className="py-24 bg-blue-600 dark:bg-blue-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Pronto para dar o primeiro passo?</h2>
          <p className="text-xl text-blue-50 mb-10 opacity-90">Não deixe para amanhã o cuidado que você merece hoje. Estou aqui para te ouvir e ajudar.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://wa.me/5511961820112"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackLeadClick({
                  channel: "whatsapp",
                  ctaLocation: "lp_final_cta",
                  ctaLabel: "Falar com André agora",
                  destination: "https://wa.me/5511961820112",
                })
              }
              className="bg-white text-blue-600 hover:bg-slate-50 px-10 py-5 rounded-full text-xl font-bold shadow-xl transition-all hover:scale-105"
            >
              Falar com André agora
            </a>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
            © 2024 André Fiker - Psicólogo Clínico | CRP 06/115147
          </p>
          <p className="text-slate-400 text-xs max-w-2xl mx-auto leading-relaxed">
            O agendamento de consultas via este site não constitui emergência médica. Em casos de crise aguda ou risco imediato, procure o pronto-socorro mais próximo ou ligue 188 (CVV).
          </p>
        </div>
      </footer>

      <WhatsAppSticky />
    </main>
  );
}
