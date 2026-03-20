'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, HelpCircle, Clock, Shield, CreditCard, Video, Users, MessageSquare, Calendar } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useScrollAnimation, fadeInUpVariants, scaleInVariants } from '@/hooks/useScrollAnimation'

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()

  const faqItems = [
    {
      question: "Como funciona a primeira sessão?",
      answer: "A primeira sessão é uma consulta de 50 minutos onde farei uma avaliação inicial do seu caso. Vamos conversar sobre suas expectativas, histórico e objetivos. É uma oportunidade para você conhecer minha abordagem e sentirmos se há uma boa conexão terapêutica.",
      icon: HelpCircle,
      category: "Primeira Sessão",
      color: "blue"
    },
    {
      question: "Qual é a frequência ideal das sessões?",
      answer: "Recomendo sessões semanais no início do tratamento para manter o vínculo e construir uma base sólida. Conforme seu progresso, podemos avaliar a diminuição da frequência para sessões quinzenais ou mensais, sempre de acordo com suas necessidades.",
      icon: Clock,
      category: "Frequência",
      color: "green"
    },
    {
      question: "Reembolso para convênios",
      answer: "Eu emito notas fiscais para reembolso de acordo com o seu plano de saúde, porém não atendo diretamente por convênio.",
      icon: Shield,
      category: "Pagamento",
      color: "red"
    },
    {
      question: "Como é garantido o sigilo das informações?",
      answer: "O sigilo profissional é um pilar da psicologia e é garantido pelo Código de Ética. Todas as informações compartilhadas nas sessões são confidenciais. Somente em casos específicos previstos por lei (risco de vida próprio ou alheio) o sigilo pode ser quebrado.",
      icon: Shield,
      category: "Sigilo",
      color: "red"
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer: "Aceito pagamento por PIX, transferência bancária, cartão de crédito e débito. Também ofereço a opção de pagamento por pacote de sessões com desconto. As sessões devem ser pagas antecipadamente ou no dia do atendimento.",
      icon: CreditCard,
      category: "Pagamento",
      color: "yellow"
    },
    {
      question: "Como funciona a terapia de casal?",
      answer: "A terapia de casal envolve sessões conjuntas onde trabalhamos a comunicação, resolução de conflitos e fortalecimento do vínculo. Algumas vezes podem ser recomendadas sessões individuais complementares. O objetivo é desenvolver ferramentas para um relacionamento mais saudável.",
      icon: Users,
      category: "Terapia de Casal",
      color: "pink"
    },
    {
      question: "Preciso de encaminhamento médico?",
      answer: "Não é necessário encaminhamento médico para iniciar a terapia. Você pode agendar diretamente comigo. No entanto, se você já estiver acompanhado por outros profissionais de saúde, posso trabalhar em conjunto com eles (com sua autorização) para um tratamento integrado.",
      icon: MessageSquare,
      category: "Encaminhamento",
      color: "indigo"
    },
    {
      question: "Qual é a política de cancelamento?",
      answer: "Peço um aviso mínimo de 24 horas para cancelamentos ou remarcações. Isso permite que eu possa oferecer o horário para outro paciente que precise. Cancelamentos com menos de 24 horas podem ser cobrados integralmente, exceto em casos de emergência.",
      icon: Calendar,
      category: "Políticas",
      color: "gray"
    }
  ]

  const categories = Array.from(new Set(faqItems.map(item => item.category)))
  
  const filteredItems = selectedCategory 
    ? faqItems.filter(item => item.category === selectedCategory)
    : faqItems

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-50' },
      green: { bg: 'bg-green-100', text: 'text-green-600', hover: 'hover:bg-green-50' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-50' },
      red: { bg: 'bg-red-100', text: 'text-red-600', hover: 'hover:bg-red-50' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', hover: 'hover:bg-yellow-50' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600', hover: 'hover:bg-pink-50' },
      indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', hover: 'hover:bg-indigo-50' },
      gray: { bg: 'bg-gray-100', text: 'text-gray-600', hover: 'hover:bg-gray-50' }
    }
    return colors[color] || colors.blue
  }

  const accordionVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  }

  const iconVariants = {
    static: { rotate: 0 },
    rotating: { rotate: 360 }
  }

  return (
    <section id="faq" ref={sectionRef} className="py-20 bg-white">
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
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600 font-medium">Dúvidas Frequentes</span>
          </motion.div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tire suas dúvidas sobre o processo terapêutico e como posso
            ajudar você a alcançar mais bem-estar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Categories Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={sectionVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Categorias</h3>
                <div className="space-y-2">
                  <motion.button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                      selectedCategory === null
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Todas as perguntas
                  </motion.button>
                  {categories.map((category, index) => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.3 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={sectionVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Card className="border-0 shadow-sm mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Ainda tem dúvidas?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Se não encontrou sua resposta aqui, entre em contato diretamente.
                  </p>
                  <div className="space-y-2 text-sm">
                    <motion.div 
                      className="text-gray-700"
                      whileHover={{ x: 5 }}
                    >
                      <strong>Telefone:</strong> (11) 96182-0112
                    </motion.div>
                    <motion.div 
                      className="text-gray-700"
                      whileHover={{ x: 5 }}
                    >
                      <strong>CRP:</strong> 06/115147
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* FAQ Items */}
          <div className="lg:col-span-2 space-y-4">
            {filteredItems.map((item, index) => {
              const colorClasses = getColorClasses(item.color)
              const isOpen = openItem === index
              const originalIndex = faqItems.indexOf(item)
              
              return (
                <motion.div
                  key={originalIndex}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className={`border-0 shadow-sm transition-all duration-300 ${
                    isOpen ? 'shadow-lg ring-2 ring-blue-100' : 'hover:shadow-md'
                  }`}>
                    <CardContent className="p-0">
                      <motion.button
                        onClick={() => setOpenItem(isOpen ? null : index)}
                        className={`w-full px-6 py-4 text-left flex items-center justify-between transition-all duration-300 ${
                          isOpen ? colorClasses.hover : 'hover:bg-gray-50'
                        }`}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div 
                            className={`w-10 h-10 ${colorClasses.bg} rounded-lg flex items-center justify-center flex-shrink-0`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <item.icon className={`w-5 h-5 ${colorClasses.text}`} />
                          </motion.div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{item.question}</h3>
                            <p className="text-sm text-gray-500">{item.category}</p>
                          </div>
                        </div>
                        <motion.div
                          variants={iconVariants}
                          animate={isOpen ? "rotating" : "static"}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown 
                            className={`w-5 h-5 transition-colors duration-300 ${
                              isOpen ? colorClasses.text : 'text-gray-400'
                            }`}
                          />
                        </motion.div>
                      </motion.button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            className="px-6 pb-4"
                            variants={accordionVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                          >
                            <div className="pl-13 text-gray-700 leading-relaxed">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="mt-16 text-center bg-gray-50 rounded-2xl p-8"
          initial="hidden"
          animate={sectionVisible ? "visible" : "hidden"}
          variants={scaleInVariants}
        >
          <blockquote className="text-xl italic text-gray-700 mb-8 max-w-2xl mx-auto font-medium">
            "Não considere nenhuma prática como imutável. Mude e esteja pronto a mudar novamente. Não aceite a verdade eterna. Experimente."
            <br />
            <span className="block mt-4 text-base font-medium text-gray-500">B. F. Skinner</span>
          </blockquote>
          <div className="flex justify-center">
            <motion.a
              href="https://wa.me/5511961820112?text=Olá%20André%20Fiker%2C%20gostaria%20de%20agendar%20uma%20sessão"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Agendar Sessão
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}