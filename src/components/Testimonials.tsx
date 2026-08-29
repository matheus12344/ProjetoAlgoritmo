'use client'

import { motion } from 'framer-motion'
import { Star, Heart, TrendingUp, ShieldCheck } from 'lucide-react'
import { useScrollAnimation, fadeInUpVariants, scaleInVariants } from '@/hooks/useScrollAnimation'

export default function Testimonials() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()

  return (
    <section id="testimonials" ref={sectionRef} className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          initial="hidden"
          animate={sectionVisible ? "visible" : "hidden"}
          variants={fadeInUpVariants}
        >
          <motion.div 
            className="inline-flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3 sm:mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-red-500" />
            <span className="text-red-500 font-medium text-sm sm:text-base">Avaliações Verificadas</span>
          </motion.div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Confiança de quem já se consultou
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Avaliações verificadas de pacientes na Doctoralia.
          </p>
        </motion.div>

        {/* Aggregate social proof */}
        <motion.a
          href="https://www.doctoralia.com.br/andre-fiker/psicologo/guarulhos"
          target="_blank"
          rel="noopener noreferrer"
          className="block max-w-xl mx-auto mb-8 sm:mb-12 lg:mb-16 rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 sm:p-8 text-center"
          initial="hidden"
          animate={sectionVisible ? "visible" : "hidden"}
          variants={fadeInUpVariants}
        >
          <div className="flex items-center justify-center space-x-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Nota 5,0</div>
          <p className="text-gray-600 text-sm sm:text-base">
            Avaliações verificadas de pacientes na Doctoralia
          </p>
          <span className="inline-block mt-3 text-sm sm:text-base text-blue-600 font-medium hover:underline">
            Ver avaliações na Doctoralia →
          </span>
        </motion.a>

        {/* Verifiable facts */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white"
          initial="hidden"
          animate={sectionVisible ? "visible" : "hidden"}
          variants={scaleInVariants}
        >
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 text-center">
            {[
              { label: "12 anos de prática clínica", icon: TrendingUp },
              { label: "CRP 06/115147", icon: ShieldCheck },
              { label: "Avaliação 5,0 na Doctoralia", icon: Star }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2" />
                <div className="text-xs sm:text-base text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
