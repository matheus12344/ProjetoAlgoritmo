"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, Mail, MapPin, CheckCircle, Calendar, Heart } from "lucide-react";

export function Hero() {
  // Função para agendar consulta via WhatsApp
  const handleAgendarConsulta = (customMessage?: string) => {
    const phoneNumber = '5511961820112' // Número de contato do profissional
    const defaultMessage = `Olá André Fiker! 👋\n\nGostaria de agendar uma sessão. Por favor, poderia me informar horários disponíveis e como procedemos para marcar? Obrigado.`
    const message = encodeURIComponent(customMessage || defaultMessage)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    // Abrir em nova aba para melhor experiência do usuário
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-300 dark:bg-slate-700 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Heart className="w-4 h-4 mr-2" />
                Cuidado para sua saúde mental
              </Badge>
            </motion.div>

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center lg:justify-start mb-6"
            >
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-slate-600 dark:text-slate-300 font-medium">(+130 avaliações)</span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Conheça a Terapia Comportamental
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed"
            >
              Sou especialista em Terapia Comportamental e atendo pacientes há 11 anos nos formatos presencial e online
            </motion.p>

            <motion.p className="text-md text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              As informações sobre mim estão nesse site, mas fique à vontade para entrar em contato e tirar suas dúvidas.
            </motion.p>

            {/* Features: removed per client request to simplify hero */}

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 text-slate-600 dark:text-slate-300"
            >
              <div className="flex items-center justify-center lg:justify-start">
                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                <span className="text-sm">(11) 96182-0112</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start">
                <span className="text-sm font-medium">CRP 06/115147</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 px-8 py-3 rounded-full font-medium transition-all duration-300"
                >
                  Saiba Mais
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => handleAgendarConsulta('Olá André Fiker, gostaria de agendar uma sessão. Obrigado!')}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Agendar Sessão
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Professional Photo Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:block mb-8 lg:mb-0"
          >
            {/* Floating Elements */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="relative"
            >
              {/* Main Image Container */}
              <div className="relative mx-auto w-60 h-80 sm:w-80 sm:h-[28rem] lg:w-full lg:max-w-md lg:h-auto">
                {/* Background Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl opacity-20 blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                {/* Professional Photo Placeholder */}
                <motion.div
                  className="relative bg-white dark:bg-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl"
                  whileHover={{
                    y: -5,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                    <img 
                      src="/images/image1.jpg"
                      alt="Foto profissional André Fiker"
                      className="object-cover w-full h-full rounded-2xl"
                    />
                    {/* Overlay Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.1) 35px, rgba(0,0,0,.1) 70px)`,
                      }} />
                    </div>
                  </div>
                </motion.div>

                {/* Floating Cards */}
                <motion.div
                  animate={{
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg hidden lg:flex"
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">5.0</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{
                    rotate: [5, -5, 5],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg hidden lg:flex"
                >
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">+2.000 pacientes</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}