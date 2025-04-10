import { ArticleSummaryFromAPI } from "@/types/article";
import Link from "next/link";
import { BlogCard } from "./BlogCard";
// Import the helper function if needed, or define locally
// import { getStrapiImageUrl } from '@/utils/imageUrl'; // Example path

interface BlogSimilarPostsProps {
  posts: ArticleSummaryFromAPI[];
}

export const BlogSimilarPosts = ({ posts }: BlogSimilarPostsProps) => {
  if (!posts || posts.length === 0) return null; // Add null check for safety

  // Define helper here for simplicity, or import from utils
  const getStrapiImageUrl = (coverData: ArticleSummaryFromAPI["cover"]) => {
    const thumbnailUrl = coverData?.formats?.thumbnail?.url;
    const originalUrl = coverData?.url;
    const url = thumbnailUrl || originalUrl;
    return url
      ? `${process.env.NEXT_PUBLIC_STRAPI_CMS_BASE_URL || ""}${url}`
      : "/images/placeholder-image.jpg";
  };

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
          {posts.map((post) => {
            // Map ArticleSummaryFromAPI to BlogCardProps
            const cardProps = {
              slug: post.slug,
              title: post.title || "Untitled Post",
              excerpt: post.description || "",
              imageUrl: getStrapiImageUrl(post.cover),
              authorName: post.author?.name || "Unknown Author",
              // authorImageUrl: post.author?.avatar?.url, // Add if available
              date: post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "",
              // tags: post.category ? [post.category.name] : [], // Optional: Map category to tags
            };

            return <BlogCard key={post.id} {...cardProps} />;
          })}
        </div>
      </div>
    </div>
  );
};
