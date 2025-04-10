import { Clock, Search } from "lucide-react";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
// Components
import { MainLayout } from "@/components/layouts/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogCard } from "@/components/views/blog/BlogCard";
import { BlogCTA } from "@/components/views/blog/BlogCTA";
// Api
import { fetchBlogIndexArticles } from "@/lib/strapi/fetchAiArticles";
import { ArticleSummaryFromAPI, StrapiListResponse } from "@/types/article";

// Categories for blog posts - Keep static for now
const categories = [
  { name: "AI & Technology", count: 12, color: "bg-blue-500/10 text-blue-400" },
  { name: "Web Design", count: 8, color: "bg-purple-500/10 text-purple-400" },
  { name: "Development", count: 15, color: "bg-green-500/10 text-green-400" },
  { name: "Ethics", count: 6, color: "bg-orange-500/10 text-orange-400" },
];

// Define props type for the page component
interface BlogIndexPageProps {
  articles?: ArticleSummaryFromAPI[] | null;
}

export default function BlogIndexPage({ articles }: BlogIndexPageProps) {
  const safeArticles = Array.isArray(articles) ? articles : [];

  const featuredPostData = safeArticles.length > 0 ? safeArticles[0] : null;
  const latestPostsData = safeArticles.slice(1);

  // Corrected helper function to prioritize coverUrl -> thumbnail -> cover.url -> placeholder
  const getStrapiImageUrl = (article: ArticleSummaryFromAPI | null): string => {
    if (!article) return "/images/placeholder-image.jpg";

    const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_CMS_BASE_URL || "";
    let finalUrl: string | undefined | null = null;

    // 1. Prioritize coverUrl (assumed absolute)
    if (article.coverUrl) {
      finalUrl = article.coverUrl;
    } else {
      // 2. Try thumbnail URL from cover object
      const thumbnailUrl = article.cover?.formats?.thumbnail?.url;
      if (thumbnailUrl) {
        finalUrl = thumbnailUrl.startsWith("/") ? `${strapiBaseUrl}${thumbnailUrl}` : thumbnailUrl;
      } else {
        // 3. Try original URL from cover object
        const originalUrl = article.cover?.url;
        if (originalUrl) {
          finalUrl = originalUrl.startsWith("/") ? `${strapiBaseUrl}${originalUrl}` : originalUrl;
        }
      }
    }

    // 4. Final fallback to placeholder
    return finalUrl || "/images/placeholder-image.jpg";
  };

  // Helper function for author name - adjust for flat structure
  const getAuthorName = (authorData: ArticleSummaryFromAPI["author"]) => {
    return authorData?.name || "Unknown Author"; // Access name directly if author is not null
  };

  return (
    <MainLayout
      title="Blog - AI Insights"
      description="Explore articles on AI, web design, image optimization, and the future of technology."
    >
      <div className="min-h-screen bg-[#13161C] text-white">
        {/* Hero Section with Featured Post */}
        <div className="relative bg-gradient-to-b from-[#1E2329] to-[#13161C] px-4 py-16">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <h1 className="mb-4 text-4xl font-extrabold text-white md:text-6xl">
                Discover AI Insights
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-400">
                Explore the latest trends, innovations, and insights in artificial intelligence, web
                design, and technology.
              </p>
              <div className="mx-auto flex max-w-md items-center gap-2">
                <Input placeholder="Search articles..." className="border-[#2E3338] bg-[#1E2329]" />
                <Button className="bg-teal-500 hover:bg-teal-600">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Featured Post - Access data directly */}
            {featuredPostData && (
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="relative aspect-[16/9] overflow-hidden rounded-xl lg:aspect-auto lg:h-full">
                  <Image
                    src={getStrapiImageUrl(featuredPostData)} // Pass the whole article object
                    alt={featuredPostData.title || "Featured post image"} // Access title directly
                    fill
                    className="object-cover transition-transform hover:scale-105"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <Badge className="mb-4 w-fit bg-teal-500/10 text-teal-400">Featured Post</Badge>
                  <h2 className="mb-4 text-3xl font-bold">{featuredPostData.title}</h2>
                  {/* Description might be null, provide fallback */}
                  <p className="mb-6 text-gray-400">
                    {featuredPostData.description || "No description available."}
                  </p>
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {getAuthorName(featuredPostData.author)} {/* Pass author directly */}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">
                      {featuredPostData.publishedAt && // Check publishedAt directly
                        new Date(featuredPostData.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                    </span>
                  </div>
                  {featuredPostData.slug && ( // Check slug directly
                    <Link href={`/blog/${featuredPostData.slug}`}>
                      <Button className="w-fit bg-teal-500 hover:bg-teal-600">Read More</Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
            {!featuredPostData && (
              <p className="text-center text-gray-400">No featured articles found.</p>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Posts Column */}
            <div className="lg:col-span-2">
              {/* Latest Posts - Access data directly */}
              <section className="mb-16">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Latest Articles</h2>
                  <Clock className="h-5 w-5 text-teal-400" />
                </div>
                {latestPostsData.length > 0 ? (
                  <div className="grid gap-8 md:grid-cols-2">
                    {latestPostsData
                      .filter((article) => !!article.publishedAt)
                      .map((article) => {
                        const slug = article.slug;
                        const publishedAt = article.publishedAt;

                        const cardProps = {
                          slug: slug || "#",
                          title: article.title,
                          excerpt: article.description || "",
                          // Pass the whole article object to get the prioritized URL
                          imageUrl: getStrapiImageUrl(article),
                          authorName: getAuthorName(article.author),
                          date: new Date(publishedAt!).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }),
                        };
                        return slug ? <BlogCard key={article.id} {...cardProps} /> : null;
                      })}
                  </div>
                ) : (
                  <p className="text-gray-400">No more articles found.</p>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Categories */}
              <div className="rounded-xl bg-[#1E2329] p-6">
                <h3 className="mb-6 text-xl font-semibold">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={`/blog/category/${category.name.toLowerCase().replace(/ /g, "-")}`}
                      className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-[#262B33]"
                    >
                      <span className={`rounded-full px-2 py-1 text-sm ${category.color}`}>
                        {category.name}
                      </span>
                      <span className="text-sm text-gray-400">{category.count}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="rounded-xl bg-gradient-to-r from-teal-900/50 to-blue-900/50 p-6">
                <h3 className="mb-4 text-xl font-semibold">Stay Updated</h3>
                <p className="mb-6 text-sm text-gray-400">
                  Get the latest articles and insights delivered to your inbox.
                </p>
                <Input
                  placeholder="Enter your email"
                  className="mb-4 border-[#2E3338] bg-[#1E2329]"
                />
                <Button className="w-full bg-teal-500 hover:bg-teal-600">Subscribe</Button>
              </div>
            </aside>
          </div>
        </div>
        {/* Add CTA Section */}
        <BlogCTA />
      </div>
    </MainLayout>
  );
}

// Fetch articles at build time
export const getStaticProps: GetStaticProps = async () => {
  let articles: ArticleSummaryFromAPI[] = []; // Use correct type
  try {
    // Expecting StrapiListResponse<ArticleSummaryFromAPI>
    const response: StrapiListResponse<ArticleSummaryFromAPI> = await fetchBlogIndexArticles();
    // Log the raw data received from the API to inspect its structure
    console.log("Fetched articles data:", JSON.stringify(response.data, null, 2));
    articles = response.data; // Data should already be the correct array structure
  } catch (error) {
    console.error("Error fetching blog index articles:", error);
    articles = [];
  }

  // Log the articles array being passed as props
  console.log("Articles passed to props:", JSON.stringify(articles, null, 2));

  return {
    props: {
      articles,
    },
    // No revalidate
  };
};
