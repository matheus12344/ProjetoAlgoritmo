'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  opacity: number
  connections: number[]
}

export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    const particleCount = Math.min(80, Math.floor((dimensions.width * dimensions.height) / 15000))
    const newParticles: Particle[] = []

    const colors = [
      'rgba(59, 130, 246, 0.6)',  // blue
      'rgba(147, 51, 234, 0.6)',  // purple
      'rgba(236, 72, 153, 0.6)',  // pink
      'rgba(34, 211, 238, 0.6)',  // cyan
      'rgba(251, 191, 36, 0.6)',  // amber
    ]

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.5 + 0.3,
        connections: []
      })
    }

    setParticles(newParticles)
  }, [dimensions])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      // Update and draw particles
      const updatedParticles = particles.map(particle => {
        let newX = particle.x + particle.vx
        let newY = particle.y + particle.vy
        let newVx = particle.vx
        let newVy = particle.vy

        // Bounce off walls
        if (newX <= 0 || newX >= dimensions.width) {
          newVx = -newVx
          newX = Math.max(0, Math.min(dimensions.width, newX))
        }
        if (newY <= 0 || newY >= dimensions.height) {
          newVy = -newVy
          newY = Math.max(0, Math.min(dimensions.height, newY))
        }

        // Mouse interaction
        const dx = mousePos.x - newX
        const dy = mousePos.y - newY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          const force = (150 - distance) / 150
          newVx -= (dx / distance) * force * 0.02
          newVy -= (dy / distance) * force * 0.02
        }

        // Limit velocity
        const maxSpeed = 1
        const speed = Math.sqrt(newVx * newVx + newVy * newVy)
        if (speed > maxSpeed) {
          newVx = (newVx / speed) * maxSpeed
          newVy = (newVy / speed) * maxSpeed
        }

        return {
          ...particle,
          x: newX,
          y: newY,
          vx: newVx,
          vy: newVy
        }
      })

      // Draw connections
      updatedParticles.forEach((particle, i) => {
        updatedParticles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = (1 - distance / 120) * 0.3
            ctx.beginPath()
            ctx.strokeStyle = `rgba(147, 197, 253, ${opacity})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })

        // Draw connection to mouse
        const mouseDx = particle.x - mousePos.x
        const mouseDy = particle.y - mousePos.y
        const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy)

        if (mouseDistance < 150) {
          const opacity = (1 - mouseDistance / 150) * 0.4
          ctx.beginPath()
          ctx.strokeStyle = `rgba(251, 191, 36, ${opacity})`
          ctx.lineWidth = 1
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(mousePos.x, mousePos.y)
          ctx.stroke()
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = particle.color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      setParticles(updatedParticles)
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [particles, mousePos, dimensions])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

// Floating orb component for additional visual effects
export function FloatingOrbs() {
  const orbs = [
    { size: 200, color: 'from-blue-500/20 to-purple-500/20', duration: 20, delay: 0 },
    { size: 150, color: 'from-purple-500/20 to-pink-500/20', duration: 15, delay: 2 },
    { size: 100, color: 'from-cyan-500/20 to-blue-500/20', duration: 25, delay: 4 },
    { size: 180, color: 'from-amber-500/20 to-orange-500/20', duration: 18, delay: 1 },
    { size: 120, color: 'from-green-500/20 to-teal-500/20', duration: 22, delay: 3 },
  ]

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl`}
          style={{
            width: orb.size,
            height: orb.size,
          }}
          animate={{
            x: [0, 300, -200, 400, 0],
            y: [0, -200, 300, -150, 0],
            scale: [1, 1.2, 0.8, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
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

// Magnetic button wrapper component
export function MagneticButton({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) / 10
    const deltaY = (e.clientY - centerY) / 10
    
    setMousePosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      {children}
    </motion.div>
  )
}