import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { BlogPost } from "@/types/blog";
import { prisma } from '@/lib/prisma'

const postsPath = path.join(process.cwd(), "db", "posts.json");

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // If DB configured, use Prisma
    const resolvedParams = (await (params as any)) as { id: string };
    if (process.env.DATABASE_URL) {
      const post = await prisma.post.findUnique({ where: { id: resolvedParams.id }, include: { comments: true } });
      if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
      return NextResponse.json(post as any);
    }

    const raw = await fs.readFile(postsPath, "utf8");
    const posts: BlogPost[] = JSON.parse(raw);
    const post = posts.find((p) => p.id === resolvedParams.id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = (await (params as any)) as { id: string };
    if (process.env.DATABASE_URL) {
      const found = await prisma.post.findUnique({ where: { id: resolvedParams.id } });
      if (!found) return NextResponse.json({ error: "Post not found" }, { status: 404 });
      await prisma.comment.deleteMany({ where: { postId: resolvedParams.id } });
      await prisma.post.delete({ where: { id: resolvedParams.id } });
      return NextResponse.json({ success: true });
    }

    const raw = await fs.readFile(postsPath, "utf8");
    const posts: BlogPost[] = JSON.parse(raw);

    const idx = posts.findIndex((p) => p.id === resolvedParams.id);
    if (idx === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    posts.splice(idx, 1);

    await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}