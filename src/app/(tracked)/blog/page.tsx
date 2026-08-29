import { promises as fs } from 'fs'
import path from 'path'
import BlogPageContent from '@/components/BlogPageContent'
import { prisma } from '@/lib/prisma'

async function getPosts() {
  // If DATABASE_URL is set, read directly from Prisma
  if (process.env.DATABASE_URL) {
    const now = new Date()
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { publishAt: { lte: now } },
          { publishAt: null }
        ]
      },
      include: { comments: true },
      orderBy: { createdAt: 'desc' }
    })

    // Map Date objects to strings to match previous shape
    return posts.map((p: any) => ({
      id: p.id,
      title: p.title,
      excerpt: p.excerpt,
      content: p.content,
      author: p.author,
      createdAt: p.createdAt instanceof Date ? p.createdAt.toISOString() : p.createdAt,
      slug: p.slug,
      publishAt: p.publishAt ? (p.publishAt instanceof Date ? p.publishAt.toISOString() : p.publishAt) : undefined,
      likes: p.likes ?? 0,
      comments: p.comments || []
    }))
  }

  const postsPath = path.join(process.cwd(), 'db', 'posts.json')
  const data = await fs.readFile(postsPath, 'utf8')
  const posts = JSON.parse(data)
  // only return posts that are published (publishAt not in the future)
  const now = Date.now()
  const visible = posts.filter((p: any) => {
    if (!p.publishAt) return true
    const t = Date.parse(p.publishAt)
    if (isNaN(t)) return true
    return t <= now
  })
  return visible
}

export default async function BlogPage() {
  const posts = await getPosts()

  return <BlogPageContent posts={posts} />
}
