'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Users, Heart, Clock, Shield, Video, MessageCircle, Target, ArrowRight, Check, Sparkles, Star } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useScrollAnimation, fadeInUpVariants, scaleInVariants, staggerContainer } from '@/hooks/useScrollAnimation'

export default function Services() {
  const whatsappMessage = 'Olá André, vim pelo Google e tenho interesse em agendar uma sessão de terapia particular'
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation()
  const { ref: specialtiesRef, isVisible: specialtiesVisible } = useScrollAnimation()

  const services = [
    {
      id: 'individual',
      icon: Brain,
      title: 'Terapia Individual',
      description: 'Atendimento personalizado para sua demanda',
      duration: '50 minutos',
      features: [
        'Avaliação psicológica completa',
        'Plano terapêutico individualizado',
        'Técnicas baseadas em evidências',
        'Acompanhamento contínuo'
      ],
      popular: false,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'casal',
      icon: Heart,
      title: 'Terapia de Casal',
      description: 'Fortalecimento do relacionamento através da comunicação eficaz e resolução de conflitos.',
      duration: '60 minutos',
      features: [
        'Melhora na comunicação',
        'Resolução de conflitos',
        'Fortalecimento de vínculos',
        'Planejamento conjunto'
      ],
      popular: true,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'groups',
      icon: Users,
      title: 'Atendimento de grupos',
      description: 'Conduzo grupos focados em pessoas com TEA (transtorno do espectro autista) para promover comunicação, conexão e habilidades sociais.',
      duration: 'Sessões semanais',
      features: [
        'Atendimentos semanais',
        'Flexibilidade de horários',
        'Formato presencial e online'
      ],
      popular: false,
      gradient: 'from-green-500 to-teal-500'
    }
  ]

  const clientWhatsApp = '5511961820112'

  function handleSelect(service: any) {
    // toggle local selection for UI
    setSelectedService(prev => (prev === service.id ? null : service.id))

    // build pre-filled message for WhatsApp (Português)
    const url = 'https://wa.me/' + clientWhatsApp + '?text=' + encodeURIComponent(whatsappMessage)

    // open WhatsApp in a new tab
    if (typeof window !== 'undefined') {
      window.open(url, '_blank')
    }
  }

  const specialties = [
    {
      icon: Shield,
      title: 'Transtornos de Humor e de personalidade',
      description: 'Atendimento para ansiedade, depressão, bipolaridade, borderline, esquizofrenia',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: MessageCircle,
      title: 'Neurodivergências',
      description: 'TEA (Transtorno do Espectro Autista) / TDA (Transtorno do Déficit de Atenção)',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Users,
      title: 'Autoestima e autoconfiança',
      description: 'Trabalhos específicos para fortalecer autoestima e confiança',
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      icon: Target,
      title: 'Terapia para alta performance',
      description: 'Apoio psicológico para otimizar performance pessoal e profissional',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ]

  const cardVariants: any = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -15,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={sectionVisible ? "visible" : "hidden"}
          variants={fadeInUpVariants}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600 font-medium">Serviços Especializados</span>
          </motion.div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Serviços Terapêuticos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofereço atendimento especializado com abordagens modernas e eficazes
            para promover seu bem-estar emocional e psicológico.
          </p>
        </motion.div>

        {/* Main Services */}
        <motion.div 
          ref={servicesRef}
          className="grid lg:grid-cols-3 gap-8 mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate={servicesVisible ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredService(service.id)}
              onHoverEnd={() => setHoveredService(null)}
              onClick={() => setSelectedService(service.id === selectedService ? null : service.id)}
              className="relative cursor-pointer"
            >
              <Card className={`border-0 shadow-lg h-full transition-all duration-300 ${
                selectedService === service.id ? 'ring-2 ring-blue-600 shadow-xl' : ''
              } ${hoveredService === service.id ? 'shadow-xl' : ''}`}>
                {service.popular && (
                  <motion.div
                    className="absolute top-3 right-3 z-20"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.06 }}
                  >
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                      <Star className="w-3.5 h-3.5" />
                      Mais procurado
                    </div>
                  </motion.div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <motion.div
                    className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${service.gradient}`}
                    whileHover={{ rotate: 20, scale: 1.08 }}
                    transition={{ duration: 0.45 }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-center">
                    {service.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <motion.div
                      className="flex items-center space-x-2 text-gray-600"
                      whileHover={{ scale: 1.04 }}
                    >
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{service.duration}</span>
                    </motion.div>
                  </div>
                  
                  <AnimatePresence>
                    {selectedService === service.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 pt-3 border-t"
                      >
                        {service.features.map((feature, featureIndex) => (
                          <motion.div
                            key={featureIndex}
                            className="flex items-center space-x-2"
                            variants={featureVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: featureIndex * 0.1 }}
                          >
                            <motion.div
                              className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0"
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Check className="w-3 h-3 text-green-600" />
                            </motion.div>
                            <span className="text-sm text-gray-600">{feature}</span>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={(e) => { e.stopPropagation(); handleSelect(service) }}
                      className={`w-full py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                        selectedService === service.id
                          ? 'text-white shadow-lg bg-gradient-to-r from-blue-600 to-blue-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <motion.div className="flex items-center" whileHover={{ x: selectedService === service.id ? 5 : 0 }}>
                        {selectedService === service.id ? 'Selecionado — WhatsApp' : 'Agendar via WhatsApp'}
                        {selectedService === service.id ? <Check className="w-4 h-4 ml-2" /> : <ArrowRight className="w-4 h-4 ml-2" />}
                      </motion.div>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Specialties */}
        <motion.div
          ref={specialtiesRef}
          className="bg-gray-50 rounded-2xl p-8"
          initial="hidden"
          animate={specialtiesVisible ? "visible" : "hidden"}
          variants={scaleInVariants}
        >
          <motion.h3 
            className="text-2xl font-semibold text-gray-900 text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Especialidades
          </motion.h3>
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={specialtiesVisible ? "visible" : "hidden"}
          >
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                variants={scaleInVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <motion.div 
                      className={`w-12 h-12 ${specialty.bgColor} rounded-full flex items-center justify-center mx-auto`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <specialty.icon className={`w-6 h-6 ${specialty.color}`} />
                    </motion.div>
                    <h4 className="font-semibold text-gray-900">{specialty.title}</h4>
                    <p className="text-sm text-gray-600">{specialty.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.h3 
              className="text-2xl font-semibold text-gray-900 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              Pronto para dar o primeiro passo?
            </motion.h3>
            <p className="text-gray-600 mb-8">
              Agende uma sessão e conheça minha abordagem.
            </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button onClick={() => window.open('https://wa.me/5511961820112?text=' + encodeURIComponent(whatsappMessage))} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
              <motion.div
                className="flex items-center"
                whileHover={{ x: 5 }}
              >
                Agendar Sessão
                <ArrowRight className="w-4 h-4 ml-2" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
