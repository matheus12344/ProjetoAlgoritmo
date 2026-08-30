"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Clock3, MapPin, MessageCircle } from "lucide-react";
import { openTrackedWhatsApp } from "@/lib/contact-tracking";

const processSteps = [
  "Mapear situações, pensamentos, emoções e respostas que mantêm o ciclo.",
  "Definir objetivos observáveis para orientar o processo terapêutico.",
  "Testar novas respostas no cotidiano e revisar o que funcionou nas sessões.",
];

export function LPTCC() {
  const handleWhatsAppClick = () => {
    openTrackedWhatsApp(
      "Olá André, vim pelo Google e quero entender como funciona o atendimento com Terapia Comportamental e TCC",
      "approach",
    );
  };

  return (
    <section
      id="tcc"
      aria-labelledby="tcc-title"
      className="relative scroll-mt-20 overflow-hidden border-y border-slate-800 bg-slate-950 py-20 text-white sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.22),transparent_42%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Terapia Comportamental e TCC para adultos
          </p>
          <h2
            id="tcc-title"
            className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
          >
            Um processo colaborativo para compreender padrões e definir objetivos
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            A Terapia Comportamental e a TCC ajudam a observar relações entre
            situações, pensamentos, emoções e ações. O processo é construído em
            conjunto, com objetivos revisados ao longo das sessões e sem promessas
            de resultado.
          </p>

          <ol className="mt-8 space-y-4">
            {processSteps.map((step) => (
              <li key={step} className="flex gap-3 text-slate-200">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="border-l border-slate-700 pl-6 sm:pl-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
            Atendimento particular
          </p>
          <div className="mt-6 space-y-5">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-blue-400" />
              <p className="text-lg font-semibold">Sessões individuais de 50 minutos</p>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-400" />
              <p className="text-lg font-semibold">Centro de Guarulhos ou online</p>
            </div>
          </div>

          <p className="mt-7 leading-relaxed text-slate-300">
            Antes de agendar, você pode contar brevemente o que busca e tirar suas
            dúvidas diretamente pelo WhatsApp.
          </p>

          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" />
            Conversar pelo WhatsApp
          </button>
        </motion.div>
      </div>
    </section>
  );
}
