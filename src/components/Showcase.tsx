'use client'

import { motion } from 'framer-motion'
import { Sparkles, Zap, Shield, Smartphone, Palette, Rocket } from 'lucide-react'
import { Card3D } from './Card3D'
import { SectionTransition, ScaleIn } from './LoadingTransitions'

export default function Showcase() {
  const features = [
    {
      icon: Sparkles,
      title: "Partículas Interativas",
      description: "Sistema de partículas dinâmicas que reagem ao movimento do mouse",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: Zap,
      title: "Animações Fluidas",
      description: "Transições suaves e micro-interações em todos os elementos",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      icon: Shield,
      title: "Cards 3D",
      description: "Efeitos de profundidade e hover com transformações 3D realistas",
      gradient: "from-green-500/20 to-teal-500/20"
    },
    {
      icon: Smartphone,
      title: "Design Responsivo",
      description: "Experiência mobile-first com navegação otimizada para toque",
      gradient: "from-orange-500/20 to-red-500/20"
    },
    {
      icon: Palette,
      title: "Gradientes Animados",
      description: "Background dinâmico com efeitos visuais impressionantes",
      gradient: "from-indigo-500/20 to-purple-500/20"
    },
    {
      icon: Rocket,
      title: "Performance Otimizada",
      description: "Animações otimizadas para 60fps e carregamento rápido",
      gradient: "from-yellow-500/20 to-amber-500/20"
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionTransition>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md text-white px-6 py-3 rounded-full border border-white/20 mb-6"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-semibold">Tecnologia de Ponta</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Design Moderno e
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Profissional</span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Um site 100% incrível com as melhores tecnologias de design e experiência do usuário
            </p>
          </div>
        </SectionTransition>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <ScaleIn key={index} delay={index * 0.1}>
              <Card3D glowColor={feature.gradient}>
                <div className="text-center space-y-4">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 360,
                      boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)"
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                  </div>

                  <motion.div
                    className="w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                  />
                </div>
              </Card3D>
            </ScaleIn>
          ))}
        </div>

        <SectionTransition delay={0.8}>
          <div className="mt-16 text-center">
            <motion.div
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-3xl font-bold text-white mb-4">
                Resultado Final
              </h3>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Um site moderno, profissional e 100% responsivo que encanta e converte visitantes em clientes
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-green-500/25 inline-flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Site Transformado</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </SectionTransition>
      </div>
    </section>
  )
}