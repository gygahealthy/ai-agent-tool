import Link from "next/link";
import { BlogCard } from "./BlogCard";
import { BlogPostData } from "@/types/blog";

interface BlogSimilarPostsProps {
  posts: BlogPostData[];
}

export const BlogSimilarPosts = ({ posts }: BlogSimilarPostsProps) => {
  if (posts.length === 0) return null;

  return (
    <div className="border-t border-[#1E2329] bg-[#13161C] py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Similar News</h2>
          <Link
            href="/blog"
            className="group inline-flex items-center text-sm font-medium text-teal-400 transition hover:text-teal-300"
          >
            View All News
            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};
