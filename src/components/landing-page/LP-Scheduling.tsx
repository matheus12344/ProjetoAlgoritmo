"use client";

import { motion } from "framer-motion";
import { MessageCircle, Search, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openTrackedWhatsApp } from "@/lib/ads-tracking";

const steps = [
  {
    icon: MessageCircle,
    title: "1. Primeiro Contato",
    description: "Você entra em contato via WhatsApp ou telefone para tirar dúvidas iniciais."
  },
  {
    icon: Search,
    title: "2. Breve Triagem",
    description: "Batemos um papo rápido para entender sua demanda e alinhar expectativas."
  },
  {
    icon: CalendarCheck,
    title: "3. Primeira Sessão",
    description: "Agendamos o melhor horário para darmos início ao seu processo terapêutico."
  }
];

export function LPScheduling() {
  const handleWhatsAppClick = () => {
    openTrackedWhatsApp(
      "Olá André Fiker! Gostaria de agendar minha primeira sessão.",
      "lp_scheduling",
      "Começar Agora",
    );
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Como Iniciar seu Atendimento?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            O processo é simples e direto, desenhado para reduzir a burocracia e focar no que importa: você.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-blue-100 dark:bg-slate-800 -translate-y-1/2 z-0" />
          
          <div className="grid lg:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="flex flex-col items-center text-center bg-white dark:bg-slate-950 p-6"
              >
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white mb-6 border-8 border-white dark:border-slate-950 shadow-xl">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Button 
            onClick={handleWhatsAppClick}
            size="lg" 
            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-12 py-7 text-xl font-bold shadow-2xl transition-all hover:scale-105"
          >
            Começar Agora
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
