"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { openTrackedWhatsApp } from "@/lib/ads-tracking";

export function WhatsAppSticky() {
  const handleWhatsAppClick = () => {
    openTrackedWhatsApp(
      "Olá André Fiker! Gostaria de agendar uma consulta.",
      "lp_sticky_button",
      "Falar pelo WhatsApp",
    );
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 p-4 bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300"
      aria-label="Falar pelo WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
      </span>
    </motion.button>
  );
}
