import fs from 'fs/promises'
import path from 'path'
import pkg from '@prisma/client';
const { PrismaClient } = pkg as any;

const prisma = new PrismaClient()

async function main() {
  const postsPath = path.join(process.cwd(), 'db', 'posts.json')
  let raw = '[]'
  try {
    raw = await fs.readFile(postsPath, 'utf8')
  } catch (e) {
    console.log('No posts.json found, nothing to seed.')
    return
  }

  const posts = JSON.parse(raw)
  console.log(`Seeding ${posts.length} posts...`)

  for (const p of posts) {
    // Upsert post by id (preserve existing ids)
    const postData: any = {
      id: p.id,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || null,
      content: p.content,
      author: p.author || 'Anônimo',
      publishAt: p.publishAt ? new Date(p.publishAt) : null,
      createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
      likes: p.likes || 0,
    }

    await prisma.post.upsert({
      where: { id: postData.id },
      update: postData,
      create: postData,
    })

    // comments
    if (Array.isArray(p.comments)) {
      for (const c of p.comments) {
        const commentData = {
          id: c.id || `${Date.now()}-${Math.floor(Math.random()*10000)}`,
          content: c.content,
          author: c.author || 'Anônimo',
          createdAt: c.createdAt ? new Date(c.createdAt) : new Date(),
          postId: p.id,
        }
        // upsert comment
        await prisma.comment.upsert({
          where: { id: commentData.id },
          update: commentData,
          create: commentData,
        })
      }
    }
  }

  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
