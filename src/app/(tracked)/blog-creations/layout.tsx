import { notFound } from "next/navigation";

import { isBlogAdministrationEnabled } from "@/lib/blog-admin-access";

export default function BlogCreationsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!isBlogAdministrationEnabled()) {
    notFound();
  }

  return children;
}

