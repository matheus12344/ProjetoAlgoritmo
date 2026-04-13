"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, MessageCircle, Heart, ShieldCheck } from "lucide-react";
import { openTrackedPhoneCall, openTrackedWhatsApp } from "@/lib/ads-tracking";

export function LPHero() {
  const handleWhatsAppClick = () => {
    openTrackedWhatsApp(
      "Olá André, vim pelo Google e tenho interesse em agendar uma sessão de terapia particular.",
      "lp_hero",
      "Agendar via WhatsApp",
    );
  };

  const handleCallClick = () => {
    openTrackedPhoneCall("lp_hero", "Ligar Agora");
  };

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50 to-white pb-14 pt-24 dark:from-slate-950 dark:to-slate-900 sm:pb-20 sm:pt-32">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-0 h-52 w-52 -translate-y-1/3 translate-x-1/4 rounded-full bg-blue-100/60 blur-3xl dark:bg-blue-900/20 sm:h-80 sm:w-80" />
        <div className="absolute bottom-0 left-0 h-40 w-40 translate-y-1/4 -translate-x-1/4 rounded-full bg-slate-100 blur-3xl dark:bg-slate-800/20 sm:h-64 sm:w-64" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <Badge variant="outline" className="mb-3 border-blue-200 bg-blue-50/50 px-3 py-1 text-xs text-blue-700 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-300 sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm">
              <Star className="w-3.5 h-3.5 mr-2 fill-current" />
              Atendimento em Guarulhos e Online
            </Badge>

            <h1 className="mb-4 max-w-[11ch] text-3xl font-bold tracking-tight leading-[1.05] text-slate-900 dark:text-white sm:mb-5 sm:max-w-none sm:text-4xl md:text-5xl lg:text-6xl">
              Psicólogo em Guarulhos
              <span className="block text-blue-600">Atendimento Particular</span>
            </h1>

            <p className="mx-auto mb-4 max-w-2xl text-base text-slate-600 dark:text-slate-400 sm:mb-5 sm:text-lg md:text-xl lg:mx-0">
              Terapia comportamental para adultos com atendimento presencial em Guarulhos e online, com foco em ansiedade, depressão, TDAH e relacionamentos.
            </p>

            <div className="mb-4 flex flex-col items-stretch justify-center gap-3 sm:mb-5 sm:flex-row sm:items-center lg:justify-start">
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className="w-full rounded-full bg-green-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-green-200/50 transition-all hover:scale-105 hover:bg-green-700 sm:w-auto sm:px-8 sm:py-6 sm:text-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Agendar via WhatsApp
              </Button>
              <Button
                onClick={handleCallClick}
                variant="outline"
                size="lg"
                className="w-full rounded-full border-2 px-6 py-4 text-base font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-800 sm:w-auto sm:px-8 sm:py-6 sm:text-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Ligar Agora
              </Button>
            </div>

            <p className="mx-auto mb-5 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base lg:mx-0">
              Sessões particulares com escuta acolhedora, clareza no processo terapêutico e possibilidade de tirar dúvidas pelo WhatsApp antes de agendar.
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 dark:border-slate-800 sm:grid-cols-3 sm:gap-6 sm:pt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <Heart className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Acolhimento</p>
                  <p className="text-xs text-slate-500">Ético e Humano</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">+11 Anos</p>
                  <p className="text-xs text-slate-500">Experiência Clínica</p>
                </div>
              </div>
              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">CRP Ativo</p>
                  <p className="text-xs text-slate-500">06/115147</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] w-full max-w-md ml-auto group">
              <div className="absolute inset-0 bg-blue-600 rounded-[2rem] rotate-3 transition-transform group-hover:rotate-6" />
              <div className="relative h-full w-full bg-slate-200 dark:bg-slate-800 rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/image1.jpg"
                  alt="André Fiker - Psicólogo em Guarulhos especialista em Terapia Comportamental"
                  fill
                  sizes="448px"
                  className="h-full w-full object-cover grayscale-[20%] transition-all duration-500 hover:grayscale-0"
                  priority
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800 bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                    +130
                  </div>
                </div>
                <div>
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">Avaliações Positivas</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
