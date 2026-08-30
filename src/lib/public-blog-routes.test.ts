import assert from "node:assert/strict";
import { afterEach, test } from "node:test";

import { DELETE as deleteBlog, GET as getBlogById } from "@/app/api/blogs/[id]/route";
import {
  GET as getBlogComments,
  POST as createBlogComment,
} from "@/app/api/blogs/[id]/comments/route";
import { POST as likeBlog } from "@/app/api/blogs/[id]/like/route";
import { GET as exportBlogs } from "@/app/api/blogs/export/route";
import { GET as getBlogs, POST as createBlog } from "@/app/api/blogs/route";
import { EXPLICITLY_UNPUBLISHED_BLOG_POSTS } from "./public-blog";

const originalDatabaseUrl = process.env.DATABASE_URL;
const originalNodeEnv = process.env.NODE_ENV;
const originalLocalAdminFlag = process.env.BLOG_ADMIN_LOCAL_ENABLED;

afterEach(() => {
  restoreEnvironment("DATABASE_URL", originalDatabaseUrl);
  restoreEnvironment("NODE_ENV", originalNodeEnv);
  restoreEnvironment("BLOG_ADMIN_LOCAL_ENABLED", originalLocalAdminFlag);
});

function restoreEnvironment(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}

function useFileStorageWithAdministrationClosed() {
  delete process.env.DATABASE_URL;
  restoreEnvironment("NODE_ENV", "test");
  delete process.env.BLOG_ADMIN_LOCAL_ENABLED;
}

function enableLocalAdministration() {
  delete process.env.DATABASE_URL;
  restoreEnvironment("NODE_ENV", "development");
  process.env.BLOG_ADMIN_LOCAL_ENABLED = "true";
}

function forceProductionWithLocalFlag() {
  delete process.env.DATABASE_URL;
  restoreEnvironment("NODE_ENV", "production");
  process.env.BLOG_ADMIN_LOCAL_ENABLED = "true";
}

function assertNoExplicitlyUnpublishedPosts(
  posts: Array<{ id?: string; slug?: string }>,
) {
  for (const blocked of EXPLICITLY_UNPUBLISHED_BLOG_POSTS) {
    assert.equal(posts.some((post) => post.id === blocked.id), false);
    assert.equal(posts.some((post) => post.slug === blocked.slug), false);
  }
}

test("public GET returns published posts and direct public IDs remain readable", async () => {
  useFileStorageWithAdministrationClosed();

  const listResponse = await getBlogs(
    new Request("https://www.andrefiker.com.br/api/blogs"),
  );
  const posts = (await listResponse.json()) as Array<{ id: string; slug?: string }>;

  assert.equal(listResponse.status, 200);
  assert.ok(posts.length > 0);
  assertNoExplicitlyUnpublishedPosts(posts);

  const firstPost = posts[0];
  const directResponse = await getBlogById(
    new Request(`https://www.andrefiker.com.br/api/blogs/${firstPost.id}`),
    { params: Promise.resolve({ id: firstPost.id }) },
  );
  const commentsResponse = await getBlogComments(
    new Request(
      `https://www.andrefiker.com.br/api/blogs/${firstPost.id}/comments`,
    ),
    { params: Promise.resolve({ id: firstPost.id }) },
  );

  assert.equal(directResponse.status, 200);
  assert.equal(commentsResponse.status, 200);
});

test("anonymous all=true, export, create and delete access fails closed", async () => {
  useFileStorageWithAdministrationClosed();

  const allResponse = await getBlogs(
    new Request("https://www.andrefiker.com.br/api/blogs?all=true"),
  );
  const exportResponse = await exportBlogs();
  const createResponse = await createBlog(
    new Request("https://www.andrefiker.com.br/api/blogs", {
      method: "POST",
    }),
  );
  const deleteResponse = await deleteBlog(
    new Request("https://www.andrefiker.com.br/api/blogs/not-a-real-post", {
      method: "DELETE",
    }),
    { params: Promise.resolve({ id: "not-a-real-post" }) },
  );

  assert.equal(allResponse.status, 404);
  assert.equal(exportResponse.status, 404);
  assert.equal(createResponse.status, 404);
  assert.equal(deleteResponse.status, 404);
});

test("production cannot be reopened by the local administration flag", async () => {
  forceProductionWithLocalFlag();

  const allResponse = await getBlogs(
    new Request("https://www.andrefiker.com.br/api/blogs?all=true"),
  );
  const exportResponse = await exportBlogs();

  assert.equal(allResponse.status, 404);
  assert.equal(exportResponse.status, 404);
});

test("explicit local opt-in preserves administrative listing and export", async () => {
  enableLocalAdministration();

  const allResponse = await getBlogs(
    new Request("http://localhost:3000/api/blogs?all=true"),
  );
  const allPosts = (await allResponse.json()) as Array<{
    id?: string;
    slug?: string;
  }>;
  const exportResponse = await exportBlogs();
  const exportedPosts = (await exportResponse.json()) as Array<{
    id?: string;
    slug?: string;
  }>;

  assert.equal(allResponse.status, 200);
  assert.equal(exportResponse.status, 200);
  assertNoExplicitlyUnpublishedPosts(allPosts);
  assertNoExplicitlyUnpublishedPosts(exportedPosts);
});

test("direct post, comments and likes reject every retained ACT post", async () => {
  useFileStorageWithAdministrationClosed();

  for (const blocked of EXPLICITLY_UNPUBLISHED_BLOG_POSTS) {
    const postResponse = await getBlogById(
      new Request(`https://www.andrefiker.com.br/api/blogs/${blocked.id}`),
      { params: Promise.resolve({ id: blocked.id }) },
    );
    const commentsResponse = await getBlogComments(
      new Request(
        `https://www.andrefiker.com.br/api/blogs/${blocked.id}/comments`,
      ),
      { params: Promise.resolve({ id: blocked.id }) },
    );
    const createCommentResponse = await createBlogComment(
      new Request(
        `https://www.andrefiker.com.br/api/blogs/${blocked.id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ author: "Teste", content: "Teste" }),
        },
      ),
      { params: Promise.resolve({ id: blocked.id }) },
    );
    const likeResponse = await likeBlog(
      new Request(
        `https://www.andrefiker.com.br/api/blogs/${blocked.id}/like`,
        { method: "POST" },
      ),
      { params: Promise.resolve({ id: blocked.id }) },
    );

    assert.equal(postResponse.status, 404);
    assert.equal(commentsResponse.status, 404);
    assert.equal(createCommentResponse.status, 404);
    assert.equal(likeResponse.status, 404);
  }
});
