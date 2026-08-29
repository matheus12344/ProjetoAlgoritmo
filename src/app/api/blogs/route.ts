import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { prisma } from "@/lib/prisma";

const postsPath = path.join(process.cwd(), "db", "posts.json");

async function ensureFile() {
  try {
    await fs.access(postsPath);
  } catch (err) {
    await fs.mkdir(path.dirname(postsPath), { recursive: true });
    await fs.writeFile(postsPath, "[]");
  }
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function GET(req: Request) {
  try {
    // If DATABASE_URL is set, read from Prisma DB
    if (process.env.DATABASE_URL) {
      try {
        const url = new URL(req.url);
        const all = url.searchParams.get("all") === "true";
        if (all) {
          const posts = await prisma.post.findMany({ include: { comments: true }, orderBy: { createdAt: 'desc' } });
          return NextResponse.json(posts);
        }

        const now = new Date();
        const posts = await prisma.post.findMany({
          where: {
            OR: [
              { publishAt: { lte: now } },
              { publishAt: null }
            ]
          },
          include: { comments: true },
          orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(posts);
      } catch (err) {
        // fall back to file system below if something goes wrong with DB access
        console.error('Prisma GET error', err);
      }
    }
    await ensureFile();
    const raw = await fs.readFile(postsPath, "utf8");
    const posts = raw ? JSON.parse(raw) : [];

    // Support query param `all=true` to return all posts (including scheduled)
    try {
      const url = new URL(req.url);
      const all = url.searchParams.get("all") === "true";
      if (all) return NextResponse.json(posts);
    } catch (err) {
      // ignore URL parsing errors and fall through to default behavior
    }

    // Default: only return posts whose publishAt is not in the future
    const now = Date.now();
    const visible = posts.filter((p: any) => {
      if (!p.publishAt) return true; // immediate publish
      const t = Date.parse(p.publishAt);
      if (isNaN(t)) return true; // malformed publishAt -> show
      return t <= now;
    });

    return NextResponse.json(visible);
  } catch (err) {
    return NextResponse.json({ error: "Failed to read posts" }, { status: 500 });
  }
}

// Helper function to save posts
async function savePosts(posts: any[]) {
  await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));
}

export async function POST(req: Request) {
  try {
    // If DATABASE_URL is present use Prisma to persist posts
    const body = await req.json();
    if (process.env.DATABASE_URL) {
      try {
        const title = (body.title || "").toString().trim();
        const content = (body.content || "").toString().trim();
        const excerpt = (body.excerpt || null) as string | null;
        const author = (body.author || "Anônimo").toString().trim();

        if (!title || !content) {
          return NextResponse.json({ error: "O título e o conteúdo são obrigatórios." }, { status: 400 });
        }

        const publishAtRaw = body.publishAt;
        let publishAt: Date | null = null;
        if (publishAtRaw) {
          const parsed = Date.parse(publishAtRaw);
          if (!isNaN(parsed)) publishAt = new Date(parsed);
        }

        const createdAt = new Date();

        const created = await prisma.post.create({
          data: {
            title,
            slug: (body.slug && body.slug.toString()) || `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`,
            excerpt,
            content,
            author,
            publishAt,
            createdAt,
            likes: 0,
          }
        });

        return NextResponse.json(created, { status: 201 });
      } catch (err) {
        console.error('Prisma POST error', err);
        return NextResponse.json({ error: 'Failed to save post (db)' }, { status: 500 });
      }
    }

    await ensureFile();

    const title = (body.title || "").toString().trim();
    const content = (body.content || "").toString().trim();
    const excerpt = (body.excerpt || "").toString().trim();
    const author = (body.author || "Anônimo").toString().trim();

    if (!title || !content) {
      return NextResponse.json(
        { error: "O título e o conteúdo são obrigatórios." },
        { status: 400 }
      );
    }

    const raw = await fs.readFile(postsPath, "utf8");
    const posts = raw ? JSON.parse(raw) : [];

    const id = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
    const slug = slugify(title) + "-" + id.slice(-4);
    const createdAt = new Date().toISOString();

    const publishAtRaw = body.publishAt;
    let publishAt: string | undefined = undefined;
    if (publishAtRaw) {
      const parsed = Date.parse(publishAtRaw);
      if (!isNaN(parsed)) publishAt = new Date(parsed).toISOString();
    }

    const post = {
      id,
      title,
      slug,
      excerpt,
      content,
      author,
      publishAt: publishAt || undefined,
      createdAt,
      likes: 0,
      comments: [],
    };

    posts.unshift(post);

    await fs.writeFile(postsPath, JSON.stringify(posts, null, 2));

    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to save post" }, { status: 500 });
  }
}
