import { promises as fs } from 'fs'
import path from 'path'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { classifyPostEmoji } from '@/lib/post-emoji-classifier'
import PostContent from '@/components/PostContent'
import BlogLikeButton from '@/components/BlogLikeButton'
import BlogComments from '@/components/BlogComments'
import { prisma } from '@/lib/prisma'

interface PageProps {
  params: {
    slug: string
  }
}

// Função para carregar o post pelo slug
async function getPost(slug: string) {
  try {
    // If DATABASE_URL is set, read from Prisma
    if (process.env.DATABASE_URL) {
      const post = await prisma.post.findUnique({ where: { slug }, include: { comments: true } })
      if (!post) return null
      return {
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        createdAt: post.createdAt instanceof Date ? post.createdAt.toISOString() : post.createdAt,
        slug: post.slug,
        publishAt: post.publishAt ? (post.publishAt instanceof Date ? post.publishAt.toISOString() : post.publishAt) : undefined,
        likes: post.likes ?? 0,
        comments: post.comments || []
      }
    }

    const postsPath = path.join(process.cwd(), 'db', 'posts.json')
    const data = await fs.readFile(postsPath, 'utf8')
    const posts = JSON.parse(data)

    const post = posts.find((p: any) => p.slug === slug)
    if (!post) return null

    return post
  } catch (err) {
    console.error('Error loading post:', err)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // `params` can be a Promise in some Next.js versions/environments.
  const resolvedParams = typeof (params as any)?.then === 'function' ? await (params as any) : params
  const post = await getPost(resolvedParams.slug)
  
  if (!post) {
    return {
      title: 'Post não encontrado',
      description: 'O post que você está procurando não foi encontrado.'
    }
  }

  const { category } = classifyPostEmoji(post.title, post.content)
  
  return {
    title: post.title,
    description: post.excerpt || post.content.slice(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.slice(0, 160),
      type: 'article',
      authors: [post.author || 'André Fiker'],
      publishedTime: post.createdAt,
    }
  }
}

export default async function Page({ params }: PageProps) {
  // Aqui já sabemos que params.slug é seguro de usar porque Next.js
  // garante que generateMetadata será chamado primeiro
  const resolvedParams = typeof (params as any)?.then === 'function' ? await (params as any) : params
  const post = await getPost(resolvedParams.slug)
  
  if (!post) {
    notFound()
  }

  const { emoji, category } = classifyPostEmoji(post.title, post.content)
  const readTime = Math.max(1, Math.ceil(post.content.length / 1000)) + " min"

  return (
    <main className="py-16 px-4 md:px-6 lg:px-8 min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="space-y-8">
        <PostContent 
          title={post.title}
          content={post.content}
          author={post.author || "André Fiker"}
          createdAt={post.createdAt}
          readTime={readTime}
          emoji={emoji}
          category={category}
        />

        <div className="max-w-4xl mx-auto">
          <BlogLikeButton postId={post.id} />
          <BlogComments postId={post.id} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-12 flex justify-center">
        <a 
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-blue-600 transition-colors"
        >
          Voltar para o Blog
        </a>
      </div>
    </main>
  )
}