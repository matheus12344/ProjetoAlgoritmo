'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { classifyPostEmoji } from '@/lib/post-emoji-classifier'
import BlogLikeButton from '@/components/BlogLikeButton'
import BlogComments from '@/components/BlogComments'
import { Button } from '@/components/ui/button'
import { ArrowRight, Home, Search, Filter } from 'lucide-react'
import Link from 'next/link'

type Post = {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  createdAt: string
  slug: string
  likes: number
  comments: any[]
}

interface BlogPageContentProps {
  posts: Post[]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94] as any,
    },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as any,
    },
  },
}

export default function BlogPageContent({ posts }: BlogPageContentProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPosts, setFilteredPosts] = useState(posts)

  useEffect(() => {
    setFilteredPosts(
      posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [searchTerm, posts])

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-white" />
        <motion.div
          className="absolute top-0 -right-40 w-80 h-80 bg-blue-200/20 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200/20 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={headerVariants}
          className="mb-12 sm:mb-16"
        >
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/60 backdrop-blur-md hover:bg-white/80 shadow-lg hover:shadow-xl transition-all"
              >
                <Home className="w-5 h-5 text-blue-600" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Title & Description */}
          <motion.div className="space-y-4 mb-10">
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-blue-800 to-indigo-900 bg-clip-text text-transparent">
                Blog
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Descubra artigos inspiradores sobre saúde mental, bem-estar e desenvolvimento pessoal. Participe da comunidade com curtidas e comentários.
            </motion.p>
          </motion.div>

          {/* Search & Filter Bar */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* Search Input */}
            <motion.div
              className="flex-1 relative group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                placeholder="Buscar artigos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-3 bg-white/70 backdrop-blur-md border border-slate-200/50 rounded-full text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/90 transition-all shadow-md"
              />
              <motion.div
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                <Search className="w-5 h-5" />
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex gap-4 text-sm font-medium"
              whileHover={{ scale: 1.05 }}
            >
              <div className="px-4 py-2 bg-white/60 backdrop-blur-md rounded-full text-slate-700 shadow-md">
                {filteredPosts.length} {filteredPosts.length === 1 ? 'artigo' : 'artigos'}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-20 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="mb-4 text-5xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🔍
            </motion.div>
            <p className="text-xl text-slate-600">Nenhum artigo encontrado.</p>
            <p className="text-sm text-slate-500 mt-2">Tente ajustar seus critérios de busca.</p>
          </motion.div>
        ) : (
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {filteredPosts.map((post: any, index: number) => {
              const { emoji, category } = classifyPostEmoji(post.title, post.content)
              const readTime = Math.max(1, Math.ceil(post.content.length / 200))

              return (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="group relative"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Card Background Glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-indigo-600/0 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    layoutId={`glow-${post.id}`}
                  />

                  {/* Main Card */}
                  <div className="relative bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-col md:flex-row h-full">
                      {/* Emoji Section */}
                      <motion.div
                        className="relative flex items-center justify-center md:w-56 h-56 md:h-auto bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-30">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-indigo-600/20" />
                        </div>

                        {/* Floating Emoji */}
                        <motion.div
                          className="relative z-10"
                          animate={{ 
                            y: [0, -15, 0],
                            rotate: [0, 3, 0, -3, 0]
                          }}
                          transition={{ 
                            duration: 4, 
                            repeat: Infinity, 
                            ease: 'easeInOut'
                          }}
                        >
                          <span className="text-7xl md:text-8xl select-none drop-shadow-lg">
                            {emoji}
                          </span>
                        </motion.div>
                      </motion.div>

                      {/* Content Section */}
                      <div className="flex-1 flex flex-col p-6 sm:p-8 md:p-10 justify-between">
                        {/* Top Content */}
                        <div className="space-y-4">
                          {/* Category & Read Time */}
                          <motion.div
                            className="flex flex-wrap items-center gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                          >
                            <motion.span
                              whileHover={{ scale: 1.05 }}
                              className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700 text-xs font-bold rounded-full backdrop-blur-sm"
                            >
                              {category}
                            </motion.span>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs font-medium text-slate-500">
                              {readTime} min de leitura
                            </span>
                          </motion.div>

                          {/* Title */}
                          <motion.h2
                            className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors duration-300"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15, duration: 0.5 }}
                          >
                            {post.title}
                          </motion.h2>

                          {/* Excerpt */}
                          <motion.p
                            className="text-base text-slate-600 leading-relaxed line-clamp-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                          >
                            {post.excerpt || post.content.slice(0, 150) + '...'}
                          </motion.p>

                          {/* Meta Info */}
                          <motion.div
                            className="flex flex-wrap items-center gap-3 text-sm text-slate-500 pt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25, duration: 0.5 }}
                          >
                            <span className="font-medium">Por {post.author || 'Comunidade'}</span>
                            <span className="text-slate-300">•</span>
                            <span>
                              {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </span>
                          </motion.div>
                        </div>

                        {/* Bottom Actions */}
                        <motion.div
                          className="flex flex-wrap gap-4 items-center mt-6 pt-4 border-t border-slate-200/50"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                        >
                          {/* Like Button */}
                          <motion.div whileHover={{ scale: 1.1 }}>
                            <BlogLikeButton postId={post.id} />
                          </motion.div>

                          {/* Read More Button */}
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link href={`/blog/${post.slug || post.id}`}>
                              <motion.button
                                className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:shadow-lg transition-all group/btn"
                                whileHover={{ x: 3 }}
                              >
                                Ler artigo
                                <motion.span
                                  className="inline-block"
                                  animate={{ x: [0, 3, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </motion.span>
                              </motion.button>
                            </Link>
                          </motion.div>

                          {/* Stats */}
                          <motion.div
                            className="ml-auto flex gap-4 text-sm text-slate-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35, duration: 0.5 }}
                          >
                            <span>{post.likes || 0} curtidas</span>
                            <span>•</span>
                            <span>{post.comments?.length || 0} comentários</span>
                          </motion.div>
                        </motion.div>

                        {/* Comments Preview - Collapsible */}
                        {post.comments?.length > 0 && (
                          <motion.div
                            className="mt-4 pt-4 border-t border-slate-200/50"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                          >
                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                              <span className="font-medium">Comentários recentes</span>
                            </div>
                            <BlogComments postId={post.id} />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        )}
      </div>
    </main>
  )
}
