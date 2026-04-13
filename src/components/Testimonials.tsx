'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { Star, Quote, ChevronLeft, ChevronRight, Heart, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useScrollAnimation, fadeInUpVariants, scaleInVariants } from '@/hooks/useScrollAnimation'

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()

  const testimonials = [
    {
      id: 1,
      name: "Ana Silva",
      age: 32,
      treatment: "Terapia para Ansiedade",
      duration: "6 meses",
      rating: 5,
  content: "André Fiker mudou minha vida. Sua abordagem me ajudou a controlar minha ansiedade e recuperar a confiança. Hoje consigo lidar com situações que antes me paralisavam.",
      result: "Voltei a trabalhar e me sinto mais segura",
      avatar: "👩‍💼"
    },
    {
      id: 3,
      name: "Mariana Costa",
      age: 28,
      treatment: "Depressão",
      duration: "8 meses",
      rating: 5,
  content: "Achei que nunca mais ia sorrir de verdade. André Fiker me acompanhou com paciência e profissionalismo. Hoje tenho ferramentas para lidar com meus sentimentos.",
      result: "Recuperei a alegria e o propósito de vida",
      avatar: "👩‍🎓"
    },
    {
      id: 4,
      name: "Roberto Santos",
      age: 38,
      treatment: "Estresse e Burnout",
      duration: "3 meses",
      rating: 5,
  content: "O atendimento foi perfeito para minha rotina corrida. André Fiker me ajudou a encontrar equilíbrio entre trabalho e vida pessoal.",
      result: "Equilíbrio entre vida profissional e pessoal",
      avatar: "👨‍💻"
    },
    {
      id: 5,
      name: "Lucia Ferreira",
      age: 52,
      treatment: "Autoconhecimento",
      duration: "5 meses",
      rating: 5,
  content: "Mesmo na minha idade, descobri coisas sobre mim que não sabia. A terapia com André Fiker me deu uma nova perspectiva sobre a vida e sobre minhas relações.",
      result: "Mais autoconfiança e clareza mental",
      avatar: "👩‍🏫"
    }
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const { offset, velocity } = info
    if (offset.x < -50 || velocity.x < -500) {
      nextTestimonial()
    } else if (offset.x > 50 || velocity.x > 500) {
      prevTestimonial()
    }
  }

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setActiveTestimonial(index)
    setIsAutoPlaying(false)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const [[page, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }

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
            <span className="text-red-500 font-medium text-sm sm:text-base">Histórias Reais</span>
            <a href="https://www.doctoralia.com.br/andre-fiker" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-blue-600 hover:underline">Ver avaliações (+130)</a>
          </motion.div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Histórias de Transformação
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Conheça as experiências de pacientes que encontraram equilíbrio
            e bem-estar através da terapia.
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 lg:mb-16 overflow-hidden">
          <div className="relative px-0 sm:px-8">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <Card className="border-0 shadow-lg mx-2 sm:mx-0">
                  <CardContent className="p-4 sm:p-6 lg:p-12">
                    <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="hidden sm:block flex-shrink-0"
                      >
                        <Quote className="w-10 sm:w-12 h-10 sm:h-12 text-blue-600" />
                      </motion.div>
                      <div className="flex-1 space-y-4 sm:space-y-6">
                        <div className="flex items-center space-x-1">
                          {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ rotate: -180, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              transition={{ delay: i * 0.1, duration: 0.3 }}
                            >
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            </motion.div>
                          ))}
                        </div>
                        
                        <blockquote className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed">
                          "{testimonials[activeTestimonial].content}"
                        </blockquote>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                          <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                            <motion.div 
                              className="text-3xl sm:text-4xl flex-shrink-0"
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              {testimonials[activeTestimonial].avatar}
                            </motion.div>
                            <div className="min-w-0">
                              <div className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                                {testimonials[activeTestimonial].name}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-600 truncate">
                                {testimonials[activeTestimonial].age} anos • {testimonials[activeTestimonial].treatment}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-500 truncate">
                                {testimonials[activeTestimonial].duration} de terapia
                              </div>
                            </div>
                          </div>
                          
                          <motion.div 
                            className="text-left sm:text-right w-full sm:w-auto"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                          >
                            <div className="text-xs sm:text-sm font-medium text-blue-600 mb-1">Resultado:</div>
                            <div className="text-xs sm:text-sm text-gray-700">
                              {testimonials[activeTestimonial].result}
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.button
              className="hidden sm:flex absolute left-2 sm:left-4 lg:-left-16 top-1/2 transform -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white border border-gray-300 items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
              onClick={prevTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onHoverStart={() => setIsAutoPlaying(false)}
              onHoverEnd={() => setIsAutoPlaying(true)}
            >
              <ChevronLeft className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
            </motion.button>
            
            <motion.button
              className="hidden sm:flex absolute right-2 sm:right-4 lg:-right-16 top-1/2 transform -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-white border border-gray-300 items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-10"
              onClick={nextTestimonial}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onHoverStart={() => setIsAutoPlaying(false)}
              onHoverEnd={() => setIsAutoPlaying(true)}
            >
              <ChevronRight className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
            </motion.button>
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center space-x-2 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
        </div>

        {/* Grid of all testimonials */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16"
          initial="hidden"
          animate={sectionVisible ? "visible" : "hidden"}
          variants={fadeInUpVariants}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              onClick={() => goToTestimonial(index)}
              className="cursor-pointer"
            >
              <Card className={`border-0 shadow-sm transition-all duration-300 ${
                index === activeTestimonial ? 'ring-2 ring-blue-600 shadow-lg' : 'hover:shadow-md'
              }`}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-3 sm:w-4 h-3 sm:h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-gray-700 text-xs sm:text-sm mb-4 line-clamp-3">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="border-t pt-3">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <motion.div 
                        className="text-xl sm:text-2xl flex-shrink-0"
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-600 truncate">
                          {testimonial.treatment} • {testimonial.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 sm:p-8 text-white"
          initial="hidden"
          animate={sectionVisible ? "visible" : "hidden"}
          variants={scaleInVariants}
        >
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 text-center">
            {[
              { number: "+130", label: "Avaliações", icon: Star },
              { number: "+2.000", label: "Pacientes atendidos", icon: Users },
              { number: "11+", label: "Anos de experiência", icon: TrendingUp }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10 }}
              >
                <motion.div 
                  className="text-2xl sm:text-3xl font-bold mb-2"
                  whileHover={{ scale: 1.1 }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-xs sm:text-base text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}