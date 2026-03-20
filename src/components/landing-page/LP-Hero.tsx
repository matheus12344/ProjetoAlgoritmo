"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, MessageCircle, Heart, ShieldCheck } from "lucide-react";

export function LPHero() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '5511961820112';
    const message = encodeURIComponent("Olá André Fiker! 👋 Vi seu anúncio no Google e gostaria de agendar uma consulta em Guarulhos.");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const handleCallClick = () => {
    window.location.href = "tel:+5511961820112";
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 pt-32 pb-20 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-100/50 dark:bg-blue-900/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-slate-100 dark:bg-slate-800/20 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <Badge variant="outline" className="mb-4 py-1.5 px-4 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
              <Star className="w-3.5 h-3.5 mr-2 fill-current" />
              Atendimento em Guarulhos e Online
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight mb-6">
              Terapia Comportamental: <span className="text-blue-600">Acolhimento</span> e Resultados Reais
            </h1>

            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              Atendimento psicológico ético para adultos que buscam equilíbrio emocional, superação de traumas e autoconhecimento.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-green-200/50 transition-all hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Agendar via WhatsApp
              </Button>
              <Button
                onClick={handleCallClick}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-2 rounded-full px-8 py-6 text-lg font-semibold transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <Phone className="w-5 h-5 mr-2" />
                Ligar Agora
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-slate-100 dark:border-slate-800">
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
                <img
                  src="/images/image1.jpg"
                  alt="André Fiker - Psicólogo em Guarulhos especialista em Terapia Comportamental"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                  loading="eager"
                  fetchPriority="high"
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
