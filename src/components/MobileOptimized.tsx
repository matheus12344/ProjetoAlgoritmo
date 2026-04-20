'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Menu, ChevronRight, Phone, MessageCircle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'

const whatsappUrl = 'https://wa.me/5511961820112?text=' + encodeURIComponent('Olá André, vim pelo Google e tenho interesse em agendar uma sessão de terapia particular')

// Mobile-optimized navigation
export function MobileNavigation({ menuItems }: { menuItems: Array<{ label: string; href: string }> }) {
  const [isOpen, setIsOpen] = useState(false)

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-3 text-white bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.div>
      </motion.button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-80 bg-slate-900/95 backdrop-blur-xl border-l border-white/20 z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">AF</span>
                    </div>
                    <div>
                      <span className="font-bold text-white">André Fiker</span>
                      <p className="text-xs text-gray-400">Psicólogo</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white/60 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Menu Items */}
                <div className="space-y-2 mb-8">
                  {menuItems.map((item, index) => (
                    <motion.button
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.href)}
                      className="w-full text-left p-4 rounded-xl text-white hover:bg-white/10 transition-all flex items-center justify-between group"
                    >
                      <span className="font-medium">{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    onClick={() => window.open('tel:+5511961820112', '_blank')}
                    className="w-full border-white/20 text-white hover:bg-white/10 backdrop-blur-sm flex items-center justify-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>(11) 96182-0112</span>
                  </Button>
                  <Button
                    onClick={() => window.open(whatsappUrl, '_blank')}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Agendar Sessão</span>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-300">+130 avaliações 5/5</p>
                  <p className="text-xs text-gray-400">Google e Doctoralia</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// Mobile-optimized hero section
export function MobileHero() {
  return (
    <div className="lg:hidden">
      {/* Mobile Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { value: "1000+", label: "Clientes" },
          { value: "50+", label: "Avaliações 5★" },
          { value: "6+", label: "Anos Exp." },
          { value: "98%", label: "Satisfação" }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 text-center"
          >
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-300">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="space-y-3">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            size="lg"
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 text-lg shadow-lg shadow-green-500/25"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Agendar Atendimento
          </Button>
        </motion.div>
        
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button
            size="lg"
            variant="outline"
            onClick={() => window.open('tel:+5511961820112', '_blank')}
            className="w-full border-white/20 text-white hover:bg-white/10 backdrop-blur-sm py-4 text-lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            Ligar Agora
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

// Touch-optimized card component
export function TouchOptimizedCard({ 
  children, 
  onClick, 
  className = "" 
}: { 
  children: React.ReactNode
  onClick?: () => void
  className?: string 
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={`active:scale-95 ${className}`}
    >
      {children}
    </motion.div>
  )
}

// Mobile swipe indicator
export function SwipeIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="flex justify-center lg:hidden"
    >
      <motion.div
        animate={{ x: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex space-x-1"
      >
        <div className="w-2 h-2 bg-white/40 rounded-full" />
        <div className="w-2 h-2 bg-white/60 rounded-full" />
        <div className="w-2 h-2 bg-white/80 rounded-full" />
      </motion.div>
    </motion.div>
  )
}

// Mobile-optimized service cards
export function MobileServiceCard({ 
  title, 
  description, 
  features, 
  icon,
  onClick 
}: {
  title: string
  description: string
  features: string[]
  icon: React.ReactNode
  onClick?: () => void
}) {
  return (
    <TouchOptimizedCard
      onClick={onClick}
      className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-4"
    >
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
          <p className="text-sm text-gray-300 mb-3 leading-relaxed">{description}</p>
          
          <div className="space-y-1">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                <span className="text-xs text-gray-400">{feature}</span>
              </div>
            ))}
          </div>
          
          {features.length > 3 && (
            <p className="text-xs text-gray-500 mt-2">+{features.length - 3} benefícios</p>
          )}
        </div>
      </div>
    </TouchOptimizedCard>
  )
}

// Mobile floating action button
export function MobileFAB() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 right-6 z-40 lg:hidden"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={() => window.open(whatsappUrl, '_blank')}
              size="lg"
              className="w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/25 p-0"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Responsive grid helper
export function ResponsiveGrid({ 
  children, 
  mobileCols = 1, 
  tabletCols = 2, 
  desktopCols = 3,
  gap = 6 
}: {
  children: React.ReactNode
  mobileCols?: number
  tabletCols?: number
  desktopCols?: number
  gap?: number
}) {
  return (
    <div className={`grid gap-${gap} grid-cols-${mobileCols} md:grid-cols-${tabletCols} lg:grid-cols-${desktopCols}`}>
      {children}
    </div>
  )
}

// Mobile optimized text sizes
export function ResponsiveText({ 
  children, 
  mobileSize = "base", 
  desktopSize = "xl" 
}: {
  children: React.ReactNode
  mobileSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
  desktopSize?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl"
}) {
  const sizeClasses = {
    xs: "text-xs lg:text-xs",
    sm: "text-sm lg:text-sm", 
    base: "text-base lg:text-base",
    lg: "text-lg lg:text-lg",
    xl: "text-xl lg:text-xl",
    "2xl": "text-2xl lg:text-2xl",
    "3xl": "text-3xl lg:text-3xl",
    "4xl": "text-4xl lg:text-4xl",
    "5xl": "text-5xl lg:text-5xl"
  }

  return (
    <span className={sizeClasses[mobileSize]}>
      {children}
    </span>
  )
}
