type BlogAdminEnvironment = {
  NODE_ENV?: string;
  BLOG_ADMIN_LOCAL_ENABLED?: string;
};

/**
 * The repository has no configured administrator authentication.
 * Keep blog administration closed by default and impossible to enable in
 * production. Local development can opt in explicitly without introducing a
 * deployable credential or weakening the public read-only routes.
 */
export function isBlogAdministrationEnabled(
  environment: BlogAdminEnvironment = process.env,
): boolean {
  return (
    environment.NODE_ENV === "development" &&
    environment.BLOG_ADMIN_LOCAL_ENABLED === "true"
  );
}
