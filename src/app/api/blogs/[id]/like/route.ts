import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { prisma } from '@/lib/prisma'

const postsPath = path.join(process.cwd(), "db", "posts.json");

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = (await (params as any)) as { id: string };
    if (process.env.DATABASE_URL) {
      const post = await prisma.post.findUnique({ where: { id: resolvedParams.id } });
      if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
      const updated = await prisma.post.update({ where: { id: resolvedParams.id }, data: { likes: (post.likes || 0) + 1 } });
      return NextResponse.json({ likes: updated.likes });
    }

    const raw = await fs.readFile(postsPath, "utf8");
    const posts = JSON.parse(raw);

    const post = posts.find((p: any) => p.id === resolvedParams.id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    post.likes = (post.likes || 0) + 1;

    await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));

    return NextResponse.json({ likes: post.likes });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update likes" },
      { status: 500 }
    );
  }
}