'use client'

import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { motion } from 'framer-motion'
import { classifyPostEmoji } from '@/lib/post-emoji-classifier'

type Post = {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  emoji: string
  trending: boolean
  slug?: string
  likes: number
  comments: number
}

import { Calendar, Clock, ArrowRight, User, BookOpen, Send, TrendingUp, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useScrollAnimation, fadeInUpVariants, scaleInVariants, staggerContainer } from '@/hooks/useScrollAnimation'

// Skeleton Loader Component
function PostSkeleton() {
  return (
    <Card className="border-0 shadow-sm h-full">
      <CardContent className="p-0">
        <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-lg animate-pulse" />
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3" />
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mt-4" />
        </div>
      </CardContent>
    </Card>
  )
}

// Memoized Blog Post Card
const BlogPostCard = memo(({ post }: { post: Post }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  } as const

  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="group"
    >
      <Card className="border-0 shadow-sm h-full transition-all duration-300 group-hover:shadow-xl">
        <CardContent className="p-0">
          {/* Image placeholder with emoji */}
          <motion.div 
            className="h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-t-lg flex items-center justify-center overflow-hidden relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="text-6xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {post.emoji}
            </motion.div>
            {post.trending && (
              <motion.div
                className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <TrendingUp className="w-3 h-3" />
                <span>Trending</span>
              </motion.div>
            )}
          </motion.div>
          
          <div className="p-6 space-y-4">
            {/* Category */}
            <div className="flex items-center justify-between">
              <motion.span 
                className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full"
                whileHover={{ scale: 1.05 }}
              >
                {post.category}
              </motion.span>
              <motion.div 
                className="flex items-center space-x-1 text-gray-500"
                whileHover={{ scale: 1.05 }}
              >
                <Clock className="w-4 h-4" />
                <span className="text-sm">{post.readTime}</span>
              </motion.div>
            </div>
            
            {/* Title */}
            <motion.h3 
              className="text-xl font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors"
              whileHover={{ x: 5 }}
            >
              {post.title}
            </motion.h3>
            
            {/* Excerpt */}
            <p className="text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
            
            {/* Meta */}
            <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t">
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
              >
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </motion.div>
            </div>
            
            {/* Read more */}
            <motion.div
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-0 h-auto font-medium group"
                asChild
              >
                <a href={`/blog/${post.slug || post.id}`}>
                  Ler mais
                  <motion.div
                    className="inline-block ml-1"
                    whileHover={{ x: 5 }}
                    initial={{ x: 0 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </a>
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}, (prevProps, nextProps) => {
  // Custom comparison to prevent unnecessary re-renders
  return prevProps.post.id === nextProps.post.id
})

export default function BlogPreview() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation()
  const { ref: postsRef, isVisible: postsVisible } = useScrollAnimation()
  const { ref: newsletterRef, isVisible: newsletterVisible } = useScrollAnimation()

  const [posts, setPosts] = useState<Post[]>([])

  // Fetch posts with optimized caching
  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetch('/api/blogs?cached=true', {
        next: { revalidate: 3600 } // Cache for 1 hour
      })
      
      if (res.ok) {
        const data = await res.json()
        const formattedPosts = data.map((post: any) => {
          const { emoji, category } = classifyPostEmoji(post.title, post.content)
          return {
            id: post.id,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt || post.content.slice(0, 150) + "...",
            author: post.author || "André Fiker",
            date: new Date(post.createdAt).toLocaleDateString('pt-BR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }),
            readTime: Math.max(1, Math.ceil(post.content.length / 1000)) + " min",
            category: category,
            image: "/blog/default.jpg",
            emoji: emoji,
            trending: false,
            likes: post.likes || 0,
            comments: post.comments?.length || 0
          }
        })
        const sortedPosts = formattedPosts
          .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3)
        setPosts(sortedPosts)
      }
    } catch (err) {
      console.error('Erro ao carregar posts:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const categories = [
    "Saúde Mental",
    "Relacionamentos",
    "Ansiedade e Estresse",
    "Depressão",
    "Autoestima",
    "Mindfulness",
    "Desenvolvimento Pessoal",
    "Sono e Descanso",
    "Trabalho e Carreira",
    "Comunicação"
  ]

  // Memoized categories to prevent recalculation
  const memoizedCategories = useMemo(() => categories, [])

  const handleSubscribe = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setTimeout(() => {
      setIsSubscribed(false)
      setEmail('')
    }, 3000)
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  } as const

  return (
    <section id="blog" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={sectionVisible ? "visible" : "hidden"}
          variants={fadeInUpVariants}
        >
          <motion.div 
            className="inline-flex items-center space-x-2 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span className="text-blue-600 font-medium">Recursos e Conteúdos</span>
          </motion.div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Blog e Recursos
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compartilho conhecimentos e insights sobre saúde mental para
            ajudar você no seu processo de autoconhecimento.
          </p>
        </motion.div>

        <motion.div 
          ref={postsRef}
          className="grid lg:grid-cols-3 gap-8 mb-12"
          variants={staggerContainer}
          initial="hidden"
          animate={postsVisible ? "visible" : "hidden"}
        >
          {isLoading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 3 }).map((_, i) => (
              <PostSkeleton key={`skeleton-${i}`} />
            ))
          ) : posts.length > 0 ? (
            // Show actual posts
            posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))
          ) : (
            // Show empty state
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-600">Nenhum post disponível no momento.</p>
            </div>
          )}
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          ref={newsletterRef}
          className="bg-white rounded-2xl p-8 shadow-sm"
          initial="hidden"
          animate={newsletterVisible ? "visible" : "hidden"}
          variants={scaleInVariants}
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.div 
              className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen className="w-8 h-8 text-blue-600" />
            </motion.div>
            
            <motion.h3 
              className="text-2xl font-semibold text-gray-900 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              Receba nossos artigos por e-mail
            </motion.h3>
            
            <p className="text-gray-600 mb-8">
              Inscreva-se para receber conteúdos exclusivos sobre saúde mental
              e bem-estar diretamente na sua caixa de entrada.
            </p>
            
            <motion.form 
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.input
                type="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex items-center"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Heart className="w-4 h-4 mr-2" />
                      </motion.div>
                      Inscrito!
                    </motion.div>
                  ) : (
                    <motion.div className="flex items-center">
                      <Send className="w-4 h-4 mr-2" />
                      Inscrever-se
                    </motion.div>
                  )}
                </Button>
              </motion.div>
            </motion.form>
            
            <motion.p 
              className="text-xs text-gray-500 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              Respeitamos sua privacidade. Cancele a inscrição a qualquer momento.
            </motion.p>
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={sectionVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">
            Explore por tópicos
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {memoizedCategories.map((category, index) => (
              <motion.button
                key={category}
                className="px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}