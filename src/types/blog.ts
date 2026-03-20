export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: BlogComment[];
}

export interface BlogComment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}