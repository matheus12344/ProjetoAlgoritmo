'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

interface Card3DProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  tiltAmount?: number
}

export function Card3D({ children, className = "", glowColor = "from-blue-500/20 to-purple-500/20", tiltAmount = 15 }: Card3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) / (rect.width / 2)
    const deltaY = (e.clientY - centerY) / (rect.height / 2)
    
    setMousePosition({
      x: deltaX * tiltAmount,
      y: -deltaY * tiltAmount
    })
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: mousePosition.y,
        rotateY: mousePosition.x,
        scale: isHovering ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {/* Glow Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${glowColor} rounded-2xl blur-xl opacity-0`}
        animate={{
          opacity: isHovering ? 0.7 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Main Card */}
      <Card className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
        <CardContent className="p-6">
          {children}
        </CardContent>
      </Card>

      {/* Floating Particles */}
      {isHovering && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: 0,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

// Parallax Section Component
export function ParallaxSection({ children, className = "", speed = 0.5 }: { 
  children: React.ReactNode, 
  className?: string,
  speed?: number 
}) {
  const [scrollY, setScrollY] = useState(0)

  useState(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <motion.div
      className={className}
      style={{
        transform: `translateY(${scrollY * speed}px)`,
      }}
    >
      {children}
    </motion.div>
  )
}

// Animated Service Card
export function AnimatedServiceCard({ 
  icon, 
  title, 
  description, 
  features,
  delay = 0 
}: {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <Card3D glowColor="from-blue-500/20 to-cyan-500/20">
        <div className="text-center space-y-4">
          {/* Icon */}
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto"
            whileHover={{ 
              scale: 1.1, 
              rotate: 360,
              boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)"
            }}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.div>

          {/* Content */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">{description}</p>
            
            {/* Features */}
            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + 0.1 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 text-left"
                >
                  <motion.div
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.2,
                    }}
                  />
                  <span className="text-gray-300 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pt-4"
          >
            <motion.button
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25"
              whileHover={{
                boxShadow: "0 10px 40px rgba(59, 130, 246, 0.4)",
              }}
            >
              Saiba Mais
            </motion.button>
          </motion.div>
        </div>
      </Card3D>
    </motion.div>
  )
}

// Testimonial Card with 3D Effect
export function TestimonialCard3D({ 
  name, 
  text, 
  rating, 
  avatar,
  delay = 0 
}: {
  name: string
  text: string
  rating: number
  avatar?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, z: -100 }}
      whileInView={{ opacity: 1, z: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Card3D glowColor="from-purple-500/20 to-pink-500/20">
        <div className="space-y-4">
          {/* Rating */}
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: delay + 0.1 + i * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              >
                <svg
                  className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.div>
            ))}
          </div>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
            className="text-gray-300 italic leading-relaxed"
          >
            "{text}"
          </motion.p>

          {/* Author */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.7 }}
            className="flex items-center space-x-3 pt-4 border-t border-white/20"
          >
            <motion.div
              className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              {avatar || name.charAt(0)}
            </motion.div>
            <div>
              <p className="font-semibold text-white">{name}</p>
              <p className="text-sm text-gray-400">Paciente Verificado</p>
            </div>
          </motion.div>
        </div>
      </Card3D>
    </motion.div>
  )
}