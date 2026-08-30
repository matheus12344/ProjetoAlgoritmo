export const EXPLICITLY_UNPUBLISHED_BLOG_POSTS = [
  {
    id: "1764033126003-6904",
    slug: "quando-a-mente-cria-hist-rias-e-voc-aprende-a-n-o-interpret-las-como-destino-6904",
  },
  {
    id: "1764033003700-3277",
    slug: "quando-a-mente-fala-alto-demais-entendendo-fus-o-e-desfus-o-na-act-3277",
  },
] as const;

export const UNPUBLISHED_BLOG_SLUGS: ReadonlySet<string> = new Set(
  EXPLICITLY_UNPUBLISHED_BLOG_POSTS.map((post) => post.slug),
);

export const UNPUBLISHED_BLOG_IDS: ReadonlySet<string> = new Set(
  EXPLICITLY_UNPUBLISHED_BLOG_POSTS.map((post) => post.id),
);

export type PublicBlogPost = {
  id?: string | null;
  slug?: string | null;
  publishAt?: string | Date | null;
};

export function isExplicitlyUnpublishedBlogPost(
  post: PublicBlogPost,
): boolean {
  return Boolean(
    (post.id && UNPUBLISHED_BLOG_IDS.has(post.id)) ||
      (post.slug && UNPUBLISHED_BLOG_SLUGS.has(post.slug)),
  );
}

export function isPublicBlogPost(
  post: PublicBlogPost,
  now: number | Date = Date.now(),
): boolean {
  if (isExplicitlyUnpublishedBlogPost(post)) {
    return false;
  }

  if (!post.publishAt) {
    return true;
  }

  const publishedAt =
    post.publishAt instanceof Date
      ? post.publishAt.getTime()
      : Date.parse(post.publishAt);

  if (Number.isNaN(publishedAt)) {
    return false;
  }

  const nowMs = now instanceof Date ? now.getTime() : now;
  return publishedAt <= nowMs;
}
