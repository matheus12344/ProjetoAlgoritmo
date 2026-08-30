import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

import { GET as getBlogs } from "@/app/api/blogs/route";
import { GET as exportBlogs } from "@/app/api/blogs/export/route";
import { GET as getBlogById } from "@/app/api/blogs/[id]/route";
import { EXPLICITLY_UNPUBLISHED_BLOG_POSTS } from "./public-blog";

const originalDatabaseUrl = process.env.DATABASE_URL;

afterEach(() => {
  if (originalDatabaseUrl === undefined) {
    delete process.env.DATABASE_URL;
  } else {
    process.env.DATABASE_URL = originalDatabaseUrl;
  }
});

function assertNoExplicitlyUnpublishedPosts(posts: Array<{ id?: string; slug?: string }>) {
  for (const blocked of EXPLICITLY_UNPUBLISHED_BLOG_POSTS) {
    assert.equal(posts.some((post) => post.id === blocked.id), false);
    assert.equal(posts.some((post) => post.slug === blocked.slug), false);
  }
}

test("GET /api/blogs?all=true cannot feed ACT posts to /blog-creations", async () => {
  delete process.env.DATABASE_URL;

  const response = await getBlogs(
    new Request("https://www.andrefiker.com.br/api/blogs?all=true"),
  );
  const posts = (await response.json()) as Array<{ id?: string; slug?: string }>;

  assert.equal(response.status, 200);
  assertNoExplicitlyUnpublishedPosts(posts);
});

test("GET /api/blogs/{id} returns 404 for each retained ACT post", async () => {
  delete process.env.DATABASE_URL;

  for (const blocked of EXPLICITLY_UNPUBLISHED_BLOG_POSTS) {
    const response = await getBlogById(
      new Request(`https://www.andrefiker.com.br/api/blogs/${blocked.id}`),
      { params: { id: blocked.id } },
    );

    assert.equal(response.status, 404);
  }
});

test("GET /api/blogs/export excludes retained ACT posts", async () => {
  delete process.env.DATABASE_URL;

  const response = await exportBlogs();
  const posts = (await response.json()) as Array<{ id?: string; slug?: string }>;

  assert.equal(response.status, 200);
  assertNoExplicitlyUnpublishedPosts(posts);
});
