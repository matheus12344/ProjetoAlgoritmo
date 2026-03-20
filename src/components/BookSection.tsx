'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BookSection() {
  const books = [
    {
      title: 'Breve Manual de Terapia para Leigos',
      description:
        'Conceitos claros e exercícios práticos para quem deseja entender a terapia e aplicar ferramentas comportamentais no dia a dia.',
      url: 'https://www.amazon.com.br/Breve-Manual-Terapia-para-Leigos-ebook/dp/B0F3W9Y8TD',
      image: '/images/book.png',
    },
    {
      title: 'A Tríade Sombria',
      description: 'O que aprendi tratando pacientes no espectro da Tríade Sombria.',
      url: 'https://www.amazon.com.br/dp/B0G75WYZDH/ref=mp_s_a_1_1?crid=3BCYWAG9IMT4M&dib=eyJ2IjoiMSJ9.N8990mtZUC3dGecPHyzbAXVe1Eho-QINwJxRF7_hDe5kPyT6IDyBCWI_A1Vo09PqjMR1vpeRv9RA0hrOmCp4iFpikPJTydiXKw_2-MvRdBjfzzbEgCwrBHWwUlu7OAjxLWdiFAd_N9hfD7CYdUd2ouW90tZF3FAmnCJ7m10nwtHNlPr8veXXYFq_lfiXJDF0.g9sULr_dJAYD8RxX_vA-okxmR1Sr9ifoFvXjxA5YQjk&dib_tag=se&keywords=andre+fiker',
      image: '/images/book2.jpg',
    },
    {
      title: 'A Solução Simbólica e a Expansão do Modelo de Skinner',
      description: 'Teoria das Molduras Relacionais - A Herança da Austeridade. Uma análise profunda e expansiva sobre abordagens comportamentais.',
      url: 'https://www.amazon.com.br/dp/B0GHSQBHDF/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=ZM2P21ZDNXKW&dib=eyJ2IjoiMSJ9.lxYbG4F1ysztIFrnzvkIS9zHe4P9fZ8k-EanOcIaeTLgPBtbOy1aiQ1rIbqish9ZxSe2vVQuiQqDHDLNmAgV2cdOFxqmntUxioK--0s9hJKGvA4WQOVhTIu_bcGm3W2QC0Nu0sOSTnlXnhcjGZ_EN2CuML-Le6tYE0He29vP7sO1dzJj_cDuhK4Cza6LAlr5.XjCDYnzPcAeH-jHdLmJGekGw5VG7BkcmiukwtAWq6SA&dib_tag=se&keywords=andre+fiker&qid=1768940775&sprefix=andre+fike%2Caps%2C195&sr=8-1',
      image: '/images/book3.png',
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 6000) // 6 seconds
    return () => clearInterval(timer)
  }, [currentIndex])

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prev) => (prev + newDirection + books.length) % books.length)
  }

  const handleAgendarConsulta = (customMessage?: string) => {
    const phoneNumber = '5511961820112'
    const defaultMessage = `Olá André Fiker! 👋\n\nGostaria de agendar uma sessão. Por favor, poderia me informar horários disponíveis e como procedemos para marcar? Obrigado.`
    const message = encodeURIComponent(customMessage || defaultMessage)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      position: 'absolute' as const,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      position: 'relative' as const,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      position: 'absolute' as const,
    }),
  }

  const currentBook = books[currentIndex]

  return (
    <section id="book" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-indigo-600 text-sm font-semibold tracking-wider uppercase mb-3 px-4 py-1.5 bg-indigo-50 rounded-full">Lançamentos</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Livros Publicados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Uma coleção de obras dedicadas ao comportamento humano, terapia e psicologia analítica.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto min-h-[600px] md:min-h-[450px] flex items-center justify-center">
          {/* Navigation Buttons for Desktop */}
          <div className="absolute left-0 z-20 hidden lg:block">
            <button onClick={() => paginate(-1)} className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-800 hover:bg-white hover:scale-110 transition-all border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>
          <div className="absolute right-0 z-20 hidden lg:block">
            <button onClick={() => paginate(1)} className="p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg text-gray-800 hover:bg-white hover:scale-110 transition-all border border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          <div className="w-full relative flex justify-center items-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full px-4 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-16 justify-center"
              >
                {/* Book Image */}
                <div className="relative group w-64 md:w-80 flex-shrink-0 perspective-1000">
                  <motion.div
                    className="relative rounded-lg shadow-2xl bg-white p-2 transition-transform duration-500 hover:scale-105"
                  >
                    <img
                      src={currentBook.image}
                      alt={currentBook.title}
                      className="w-full h-auto rounded shadow-inner object-cover"
                    />
                    {/* Reflection/Shadow effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent opacity-50 rounded-b-lg"></div>
                  </motion.div>
                  <div className="absolute -z-10 bottom-[-20px] left-[10%] w-[80%] h-[20px] bg-black/30 blur-xl rounded-full"></div>
                </div>

                {/* Book Content */}
                <div className="max-w-xl text-center md:text-left flex flex-col items-center md:items-start">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {currentBook.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                      {currentBook.description}
                    </p>
                  </motion.div>

                  <motion.div
                    className="flex flex-wrap gap-4 justify-center md:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <a
                      href={currentBook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 hover:shadow-indigo-200 transition-all active:scale-95"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                      Comprar na Amazon
                    </a>
                    <button
                      onClick={() => handleAgendarConsulta(`Olá André, tenho interesse no livro "${currentBook.title}" e gostaria de agendar uma consulta.`)}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-800 font-semibold rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      Agendar Consulta
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8 z-20 relative">
          {books.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1)
                setCurrentIndex(idx)
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-10 bg-indigo-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Ir para livro ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
