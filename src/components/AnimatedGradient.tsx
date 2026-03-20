'use client'

import { motion } from 'framer-motion'

export default function AnimatedGradient() {
  return (
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-100/20 via-transparent to-purple-100/20"
        animate={{
          background: [
            'linear-gradient(to top right, #0B3D9110, transparent, #25D36610)',
            'linear-gradient(to bottom right, #25D36610, transparent, #0B3D9110)',
            'linear-gradient(to top left, #4A90E210, transparent, #0B3D9110)',
            'linear-gradient(to top right, #0B3D9110, transparent, #25D36610)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}