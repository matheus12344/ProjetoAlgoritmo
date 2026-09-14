"use client";

import { motion } from "framer-motion";
import { MessageCircle, Search, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openTrackedWhatsApp } from "@/lib/contact-tracking";

const steps = [
  {
    icon: MessageCircle,
    title: "1. Primeiro contato",
    description: "O primeiro contato pelo WhatsApp ou telefone serve para verificar horários e esclarecer dúvidas práticas. Nesse momento, não é necessário contar toda a sua história nem explicar em detalhes o que está acontecendo."
  },
  {
    icon: Search,
    title: "2. Dúvidas iniciais",
    description: "Antes do agendamento, você pode confirmar as informações necessárias sobre o atendimento e perguntar o que considerar importante. A ideia é que o início aconteça com clareza, sem transformar esse contato administrativo em uma sessão informal."
  },
  {
    icon: CalendarCheck,
    title: "3. Primeira sessão",
    description: "Você não precisa chegar à primeira sessão sabendo exatamente o que dizer ou com uma explicação pronta. Podemos começar por aquilo que motivou sua procura agora. Durante o encontro, posso fazer perguntas para compreender melhor o contexto, as dificuldades atuais e suas expectativas em relação à psicoterapia. Você não precisa falar imediatamente sobre assuntos para os quais ainda não se sente preparado. A primeira sessão também permite conhecer minha forma de trabalho, conversar sobre o que você espera do processo e esclarecer dúvidas. É o começo de uma compreensão, não uma promessa de diagnóstico, solução imediata ou resultado. Ao final, teremos mais elementos para avaliar se o atendimento que ofereço é compatível com aquilo de que você necessita e para conversar sobre possíveis próximos passos."
  }
];

export function LPScheduling() {
  const handleWhatsAppClick = () => {
    openTrackedWhatsApp(
      "Olá André, vim pelo Google e tenho interesse em agendar uma sessão de terapia particular",
      "scheduling",
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
            Conversar pelo WhatsApp
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
