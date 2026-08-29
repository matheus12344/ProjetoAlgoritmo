'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

export default function DynamicBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Animated gradient mesh
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let time = 0

    const animate = () => {
      time += 0.005

      // Create gradient mesh
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time) * 100,
        canvas.height * 0.3 + Math.cos(time) * 100,
        0,
        canvas.width * 0.3 + Math.sin(time) * 100,
        canvas.height * 0.3 + Math.cos(time) * 100,
        400
      )
      gradient1.addColorStop(0, 'rgba(59, 130, 246, 0.15)')
      gradient1.addColorStop(1, 'rgba(59, 130, 246, 0)')

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(time * 1.5) * 150,
        canvas.height * 0.6 + Math.sin(time * 1.5) * 150,
        0,
        canvas.width * 0.7 + Math.cos(time * 1.5) * 150,
        canvas.height * 0.6 + Math.sin(time * 1.5) * 150,
        500
      )
      gradient2.addColorStop(0, 'rgba(147, 51, 234, 0.15)')
      gradient2.addColorStop(1, 'rgba(147, 51, 234, 0)')

      const gradient3 = ctx.createRadialGradient(
        canvas.width * 0.5 + Math.sin(time * 0.8) * 200,
        canvas.height * 0.8 + Math.cos(time * 0.8) * 200,
        0,
        canvas.width * 0.5 + Math.sin(time * 0.8) * 200,
        canvas.height * 0.8 + Math.cos(time * 0.8) * 200,
        600
      )
      gradient3.addColorStop(0, 'rgba(236, 72, 153, 0.1)')
      gradient3.addColorStop(1, 'rgba(236, 72, 153, 0)')

      // Mouse-following gradient
      const mouseGradient = ctx.createRadialGradient(
        mousePosition.x,
        mousePosition.y,
        0,
        mousePosition.x,
        mousePosition.y,
        300
      )
      mouseGradient.addColorStop(0, 'rgba(251, 191, 36, 0.1)')
      mouseGradient.addColorStop(1, 'rgba(251, 191, 36, 0)')

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = gradient3
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = mouseGradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [mousePosition])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ mixBlendMode: 'screen' }}
      />
      
      {/* Animated gradient overlay */}
      <motion.div
        className="fixed inset-0 opacity-30 z-0"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
    </>
  )
}

// Floating geometric shapes
export function FloatingShapes() {
  const shapes = [
    { type: 'circle', size: 60, color: 'rgba(59, 130, 246, 0.1)', duration: 20, delay: 0 },
    { type: 'square', size: 40, color: 'rgba(147, 51, 234, 0.1)', duration: 15, delay: 2 },
    { type: 'triangle', size: 50, color: 'rgba(236, 72, 153, 0.1)', duration: 25, delay: 4 },
    { type: 'hexagon', size: 45, color: 'rgba(34, 211, 238, 0.1)', duration: 18, delay: 1 },
    { type: 'circle', size: 35, color: 'rgba(251, 191, 36, 0.1)', duration: 22, delay: 3 },
    { type: 'square', size: 55, color: 'rgba(34, 197, 94, 0.1)', duration: 30, delay: 5 },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            borderRadius: shape.type === 'circle' ? '50%' : shape.type === 'triangle' ? '0' : '10%',
            clipPath: shape.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 
                     shape.type === 'hexagon' ? 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' : 
                     'none',
          }}
          animate={{
            x: [0, 300, -200, 400, 0],
            y: [0, -200, 300, -150, 0],
            rotate: [0, 180, 360, 540, 720],
            scale: [1, 1.2, 0.8, 1.1, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
          initial={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}

// Aurora effect
export function AuroraEffect() {
  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      animate={{
        background: [
          'linear-gradient(135deg, transparent 0%, rgba(59, 130, 246, 0.1) 25%, transparent 50%, rgba(147, 51, 234, 0.1) 75%, transparent 100%)',
          'linear-gradient(225deg, transparent 0%, rgba(236, 72, 153, 0.1) 25%, transparent 50%, rgba(34, 211, 238, 0.1) 75%, transparent 100%)',
          'linear-gradient(315deg, transparent 0%, rgba(251, 191, 36, 0.1) 25%, transparent 50%, rgba(34, 197, 94, 0.1) 75%, transparent 100%)',
          'linear-gradient(45deg, transparent 0%, rgba(59, 130, 246, 0.1) 25%, transparent 50%, rgba(147, 51, 234, 0.1) 75%, transparent 100%)',
        ],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  )
}

// Parallax stars
export function ParallaxStars() {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; speed: number }>>([])

  useEffect(() => {
    const generateStars = () => {
      const newStars = []
      for (let i = 0; i < 100; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 0.5,
          speed: Math.random() * 0.5 + 0.1
        })
      }
      setStars(newStars)
    }

    generateStars()
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute bg-white rounded-full"
          style={{
            width: star.size,
            height: star.size,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 / star.speed,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.01,
          }}
        />
      ))}
    </div>
  )
}