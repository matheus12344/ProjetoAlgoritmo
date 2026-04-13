"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { openTrackedWhatsApp } from "@/lib/ads-tracking";

export function WhatsAppSticky() {
  const handleWhatsAppClick = () => {
    openTrackedWhatsApp(
      "Olá André, vim pelo Google e tenho interesse em agendar uma sessão de terapia particular.",
      "lp_sticky_button",
      "Agendar pelo WhatsApp",
    );
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="fixed right-4 z-50 flex items-center gap-3 rounded-full bg-green-600 px-4 py-3 text-white shadow-2xl transition-all duration-300 hover:bg-green-500 md:right-6"
      style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}
      aria-label="Agendar atendimento pelo WhatsApp"
      type="button"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
        <MessageCircle className="h-6 w-6" />
      </span>
      <span className="hidden text-left leading-tight sm:flex sm:flex-col">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-green-100">
          WhatsApp
        </span>
        <span className="text-sm font-semibold">Agende sua consulta</span>
      </span>
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
      </span>
    </motion.button>
  );
}
