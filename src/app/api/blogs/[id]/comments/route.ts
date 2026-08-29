import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { prisma } from '@/lib/prisma'

const postsPath = path.join(process.cwd(), "db", "posts.json");

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = (await (params as any)) as { id: string };
    if (process.env.DATABASE_URL) {
      const post = await prisma.post.findUnique({ where: { id: resolvedParams.id }, include: { comments: true } });
      if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
      return NextResponse.json(post.comments || []);
    }

    const raw = await fs.readFile(postsPath, "utf8");
    const posts = JSON.parse(raw);

    const post = posts.find((p: any) => p.id === resolvedParams.id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post.comments || []);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const resolvedParams = (await (params as any)) as { id: string };
    const body = await request.json();
    const { content, author } = body;

    if (!content || !author) {
      return NextResponse.json(
        { error: "Content and author are required" },
        { status: 400 }
      );
    }

    if (process.env.DATABASE_URL) {
      const post = await prisma.post.findUnique({ where: { id: resolvedParams.id } });
      if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });
      const comment = await prisma.comment.create({ data: {
        content,
        author,
        createdAt: new Date(),
        postId: resolvedParams.id,
      }});
      return NextResponse.json(comment, { status: 201 });
    }

    const raw = await fs.readFile(postsPath, "utf8");
    const posts = JSON.parse(raw);

    const post = posts.find((p: any) => p.id === resolvedParams.id);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const comment: Comment = {
      id: Date.now().toString(),
      content,
      author,
      createdAt: new Date().toISOString(),
    };

    post.comments = post.comments || [];
    post.comments.push(comment);

    await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));

    return NextResponse.json(comment, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to add comment" },
      { status: 500 }
    );
  }
}