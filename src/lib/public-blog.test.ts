import assert from "node:assert/strict";
import { test } from "node:test";

import {
  EXPLICITLY_UNPUBLISHED_BLOG_POSTS,
  isExplicitlyUnpublishedBlogPost,
  isPublicBlogPost,
  UNPUBLISHED_BLOG_SLUGS,
} from "./public-blog";

const NOW = Date.parse("2026-08-30T12:00:00.000Z");

test("ordinary current posts remain public", () => {
  assert.equal(
    isPublicBlogPost(
      { slug: "post-publico", publishAt: "2026-08-01T12:00:00.000Z" },
      NOW,
    ),
    true,
  );
});

test("scheduled posts are not public", () => {
  assert.equal(
    isPublicBlogPost(
      { slug: "post-agendado", publishAt: "2999-12-31T23:59:59.000Z" },
      NOW,
    ),
    false,
  );
});

test("both retained ACT posts are explicitly unpublished", () => {
  assert.equal(UNPUBLISHED_BLOG_SLUGS.size, 2);

  for (const post of EXPLICITLY_UNPUBLISHED_BLOG_POSTS) {
    assert.equal(isExplicitlyUnpublishedBlogPost(post), true);
    assert.equal(
      isPublicBlogPost(
        { ...post, publishAt: "2025-01-01T00:00:00.000Z" },
        NOW,
      ),
      false,
    );
  }
});

test("missing dates publish immediately but malformed dates fail closed", () => {
  assert.equal(isPublicBlogPost({ slug: "sem-data" }, NOW), true);
  assert.equal(
    isPublicBlogPost({ slug: "data-invalida", publishAt: "invalida" }, NOW),
    false,
  );
});
