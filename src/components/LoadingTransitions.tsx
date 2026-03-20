'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Sparkles } from 'lucide-react'

// Initial loading screen
export function InitialLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-white mb-2"
            >
              André Fiker
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-400 mb-6"
            >
              Preparando sua experiência...
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center"
            >
              <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Section transition wrapper
export function SectionTransition({ 
  children, 
  delay = 0,
  direction = "up"
}: { 
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
}) {
  const getInitialPosition = () => {
    switch (direction) {
      case "up": return { opacity: 0, y: 50 }
      case "down": return { opacity: 0, y: -50 }
      case "left": return { opacity: 0, x: -50 }
      case "right": return { opacity: 0, x: 50 }
      default: return { opacity: 0, y: 50 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  )
}

// Staggered animation for lists
export function StaggeredAnimation({ 
  children, 
  staggerDelay = 0.1,
  initialDelay = 0 
}: { 
  children: React.ReactNode[]
  staggerDelay?: number
  initialDelay?: number 
}) {
  return (
    <div>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: initialDelay + index * staggerDelay,
            duration: 0.6
          }}
          viewport={{ once: true }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// Fade in animation
export function FadeIn({ 
  children, 
  delay = 0,
  duration = 0.6 
}: { 
  children: React.ReactNode
  delay?: number
  duration?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

// Scale animation
export function ScaleIn({ 
  children, 
  delay = 0,
  initialScale = 0.8 
}: { 
  children: React.ReactNode
  delay?: number
  initialScale?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: initialScale }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

// Slide in from left
export function SlideInLeft({ 
  children, 
  delay = 0,
  distance = 50 
}: { 
  children: React.ReactNode
  delay?: number
  distance?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -distance }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

// Slide in from right
export function SlideInRight({ 
  children, 
  delay = 0,
  distance = 50 
}: { 
  children: React.ReactNode
  delay?: number
  distance?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: distance }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

// Reveal animation (bottom to top)
export function Reveal({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  )
}

// Typewriter effect for text
export function Typewriter({ 
  text, 
  delay = 0.05,
  onComplete 
}: { 
  text: string
  delay?: number
  onComplete?: () => void 
}) {
  const [displayText, setDisplayText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    const timer = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1))
        currentIndex++
      } else {
        setIsComplete(true)
        clearInterval(timer)
        onComplete?.()
      }
    }, delay * 1000)

    return () => clearInterval(timer)
  }, [text, delay, onComplete])

  return (
    <span>
      {displayText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-5 bg-blue-400 ml-1"
        />
      )}
    </span>
  )
}

// Progress bar animation
export function AnimatedProgressBar({ 
  progress, 
  duration = 1.5,
  color = "from-blue-500 to-purple-500" 
}: { 
  progress: number
  duration?: number
  color?: string 
}) {
  const [displayProgress, setDisplayProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(progress)
    }, 100)

    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${displayProgress}%` }}
        transition={{ duration, ease: "easeOut" }}
        className={`h-full bg-gradient-to-r ${color} rounded-full`}
      />
    </div>
  )
}

// Page transition wrapper
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

// Intersection observer for triggering animations
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options?: IntersectionObserverInit
) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
        ...options,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, options])

  return isIntersecting
}

// Scroll-triggered animation hook
export function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}

// Parallax scroll effect
export function ParallaxScroll({ 
  children, 
  speed = 0.5,
  offset = 0 
}: { 
  children: React.ReactNode
  speed?: number
  offset?: number 
}) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        transform: `translateY(${scrollY * speed + offset}px)`,
      }}
    >
      {children}
    </div>
  )
}