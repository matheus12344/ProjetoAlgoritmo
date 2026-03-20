import { promises as fs } from 'fs'
import path from 'path'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const postsPath = path.join(process.cwd(), 'db', 'posts.json')
    if (process.env.DATABASE_URL) {
      const posts = await prisma.post.findMany({ include: { comments: true }, orderBy: { createdAt: 'desc' } })
      const json = JSON.stringify(posts, null, 2)
      return new Response(json, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename="posts-export.json"',
        },
      })
    }

    let data: string
    try {
      data = await fs.readFile(postsPath, 'utf8')
    } catch (err: any) {
      if (err?.code === 'ENOENT') {
        data = '[]'
      } else {
        throw err
      }
    }
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="posts-export.json"',
      },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to read posts' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
