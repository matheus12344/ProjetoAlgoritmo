'use client'

import { motion } from 'framer-motion'
import { Calendar, User, Clock, BookOpen } from 'lucide-react'
import { Card } from '@/components/ui/card'
import MarkdownContent from './MarkdownContent'

interface PostContentProps {
  title: string
  content: string
  author: string
  createdAt: string
  readTime?: string
  emoji?: string
  category?: string
}

export default function PostContent({
  title,
  content,
  author,
  createdAt,
  readTime,
  emoji,
  category
}: PostContentProps) {
  const date = new Date(createdAt).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <article className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <header className="text-center space-y-4">
          <motion.div 
            className="inline-flex items-center space-x-2 text-blue-600"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <BookOpen className="w-5 h-5" />
            <span className="font-medium">{category || "Blog"}</span>
          </motion.div>

          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h1>

          <motion.div 
            className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={createdAt}>{date}</time>
            </div>
            {readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime}</span>
              </div>
            )}
          </motion.div>
        </header>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-8 md:p-12 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {emoji && (
              <motion.div 
                className="text-6xl mb-8 text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {emoji}
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <MarkdownContent content={content} />
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </article>
  )
}