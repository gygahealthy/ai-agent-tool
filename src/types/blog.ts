export interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  authorName: string;
  authorImageUrl?: string;
  date: string;
  category: string;
  readingTime: string;
  tags?: string[];
  content: string;
}