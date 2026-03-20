'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Briefcase, Award, Users, BookOpen, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useScrollAnimation, fadeInUpVariants, fadeInLeftVariants, fadeInRightVariants, scaleInVariants, staggerContainer } from '@/hooks/useScrollAnimation'

export default function About() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation()
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation()
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation()

  const qualifications = [
    {
      icon: GraduationCap,
      title: "Formação Acadêmica",
      items: [
        "Graduação em Psicologia - PUC SP",
        "Especialização em Terapia Comportamental - ITCR",
        "Treinamento em terapia baseada em mindfulness - OXFORD Mindfulness Center",
        "Capacitação em terapia cognitivo-comportamental",
        "Capacitação em ACP (terapia de aceitação e compromisso)",
        "Formação em terapia baseada em processos - Diade lab"
      ]
    },
    {
      icon: Briefcase,
      title: "Experiência Profissional",
      items: [
        "+11 anos de experiência clínica",
        {
          label: "Especialidades:",
          subitems: [
            "Transtornos de Humor e de personalidade",
            "Neuro divergências: TEA (Transtorno do Espectro Autista) / TDA (Transtorno do Déficit de Atenção)",
            "Autoestima e autoconfiança",
            "Terapia para alta performance"
          ]
        }
      ]
    }
  ]

  const values = [
    {
      icon: Heart,
      title: "Atendimento Humanizado",
      description: "Foco no bem-estar e acolhimento do paciente"
    },
    {
      icon: BookOpen,
      title: "Base Científica",
      description: "Técnicas validadas pela psicologia moderna"
    },
    {
      icon: Users,
      title: "Compromisso Ético",
      description: "Sigilo absoluto e respeito profissional"
    }
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={sectionVisible ? "visible" : "hidden"}
          variants={fadeInUpVariants}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Sobre André Fiker
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Psicólogo clínico com especialização em terapia comportamental. 11 anos de experiência na clínica particular, comprometido com formação e atualização contínua para garantir a excelência no atendimento.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Professional Photo and Bio */}
          <motion.div 
            ref={leftRef}
            className="space-y-6"
            initial="hidden"
            animate={leftVisible ? "visible" : "hidden"}
            variants={fadeInLeftVariants}
          >
            <motion.div 
              className="bg-gray-200 rounded-lg h-80 flex items-center justify-center overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
                <div className="w-full h-72 bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
                  <img 
                    src="/images/image2.jpg"
                    alt="Foto profissional André Fiker"
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={leftVisible ? "visible" : "hidden"}
              variants={scaleInVariants}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Minha Abordagem</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    A Terapia Comportamental, embasada na metodologia científica, é uma abordagem proativa, focada no presente e orientada para a solução de problemas e alívio de sintomas.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    Por meio da promoção de autoconhecimento, modificação de comportamentos inadequados e aquisição de novos repertórios, sua meta é promover a autoestima, confiança e autonomia do cliente.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Qualifications */}
          <motion.div 
            ref={rightRef}
            className="space-y-6"
            initial="hidden"
            animate={rightVisible ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {qualifications.map((qualification, index) => (
              <motion.div
                key={index}
                variants={fadeInRightVariants}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <motion.div 
                        className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <qualification.icon className="w-6 h-6 text-blue-600" />
                      </motion.div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {qualification.title}
                        </h3>
                        <ul className="space-y-2">
                          {qualification.items.map((item, itemIndex) => (
                            Array.isArray(item.subitems) ? (
                              <li key={itemIndex} className="flex flex-col items-start mt-2">
                                <span className="font-semibold text-gray-700 mb-1">{item.label}</span>
                                <ul className="ml-4 space-y-1">
                                  {item.subitems.map((sub, subIndex) => (
                                    <motion.li
                                      key={subIndex}
                                      className="flex items-start space-x-2"
                                      initial={{ x: -20, opacity: 0 }}
                                      animate={{ x: 0, opacity: 1 }}
                                      transition={{ delay: 0.4 + subIndex * 0.1, duration: 0.3 }}
                                    >
                                      <motion.div
                                        className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"
                                        whileHover={{ scale: 1.5 }}
                                      />
                                      <span className="text-gray-600">{sub}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </li>
                            ) : (
                              <motion.li
                                key={itemIndex}
                                className="flex items-start space-x-2"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 + itemIndex * 0.1, duration: 0.3 }}
                              >
                                <motion.div
                                  className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"
                                  whileHover={{ scale: 1.5 }}
                                />
                                <span className="text-gray-600">{item.label ? item.label : item}</span>
                              </motion.li>
                            )
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          ref={valuesRef}
          className="bg-white rounded-2xl p-8 shadow-sm"
          initial="hidden"
          animate={valuesVisible ? "visible" : "hidden"}
          variants={scaleInVariants}
        >
          <motion.h3 
            className="text-2xl font-semibold text-gray-900 text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Meus Valores
          </motion.h3>
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={valuesVisible ? "visible" : "hidden"}
          >
            {values.map((value, index) => (
              <motion.div 
                key={index} 
                className="text-center space-y-4"
                variants={fadeInUpVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <value.icon className="w-8 h-8 text-blue-600" />
                </motion.div>
                <h4 className="text-lg font-semibold text-gray-900">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}