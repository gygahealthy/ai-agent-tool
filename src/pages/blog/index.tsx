import { BlogCard } from "@/components/views/blog/BlogCard";
import { MainLayout } from "@/components/layouts/MainLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, TrendingUp, Clock, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BlogCTA } from "@/components/views/blog/BlogCTA";

// Placeholder data for blog posts
const blogPosts = [
  {
    slug: "ai-in-web-design",
    title: "The Rising Impact of AI in Modern Web Design",
    excerpt:
      "Explore how artificial intelligence is revolutionizing web design, from automated layouts to personalized user experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Robot hand touch
    authorName: "Alex Johnson",
    authorImageUrl: "/images/authors/alex.jpg", // Placeholder path
    date: "Apr 07, 2024",
    tags: ["AI", "Web Design", "Technology"],
  },
  {
    slug: "optimizing-images-with-ai",
    title: "Optimizing Images for the Web Using AI Tools",
    excerpt:
      "Learn about cutting-edge AI tools that automatically compress and enhance images for faster load times and better quality.",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Colorful VR/tech
    authorName: "Samantha Lee",
    authorImageUrl: "/images/authors/samantha.jpg", // Placeholder path
    date: "Apr 05, 2024",
    tags: ["AI", "Optimization", "Images"],
  },
  {
    slug: "future-of-content-creation",
    title: "AI and the Future of Content Creation",
    excerpt:
      "How AI algorithms are changing the landscape of content creation, from writing articles to generating video scripts.",
    imageUrl:
      "https://images.unsplash.com/photo-1677759946174-3a0d4937a5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", // AI face wires
    authorName: "David Chen",
    date: "Apr 02, 2024",
    tags: ["AI", "Content Marketing", "Future Tech"],
  },
  // Add more placeholder posts as needed
  {
    slug: "ethical-ai-development",
    title: "Navigating the Ethics of AI Development",
    excerpt:
      "A look into the important ethical considerations developers must address when building AI systems.",
    imageUrl:
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // AI/Code concept
    authorName: "Maria Garcia",
    authorImageUrl: "/images/authors/maria.jpg", // Placeholder path
    date: "Mar 30, 2024",
    tags: ["AI", "Ethics", "Development"],
  },
];

// Featured post data
const featuredPost = blogPosts[0];

// Categories for blog posts
const categories = [
  { name: "AI & Technology", count: 12, color: "bg-blue-500/10 text-blue-400" },
  { name: "Web Design", count: 8, color: "bg-purple-500/10 text-purple-400" },
  { name: "Development", count: 15, color: "bg-green-500/10 text-green-400" },
  { name: "Ethics", count: 6, color: "bg-orange-500/10 text-orange-400" },
];

export default function BlogIndexPage() {
  // Get latest posts excluding featured
  const latestPosts = blogPosts.slice(1, 4);
  // Get trending posts (could be based on views/likes)
  const trendingPosts = [...blogPosts].sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <MainLayout
      title="Blog - AI Visuals"
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

            {/* Featured Post */}
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl lg:aspect-auto lg:h-full">
                <Image
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <Badge className="mb-4 w-fit bg-teal-500/10 text-teal-400">Featured Post</Badge>
                <h2 className="mb-4 text-3xl font-bold">{featuredPost.title}</h2>
                <p className="mb-6 text-gray-400">{featuredPost.excerpt}</p>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={featuredPost.authorImageUrl || "/images/placeholder-avatar.png"}
                      alt={featuredPost.authorName}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span className="text-sm text-gray-400">{featuredPost.authorName}</span>
                  </div>
                  <span className="text-sm text-gray-400">{featuredPost.date}</span>
                </div>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <Button className="w-fit bg-teal-500 hover:bg-teal-600">Read More</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Posts Column */}
            <div className="lg:col-span-2">
              {/* Latest Posts */}
              <section className="mb-16">
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Latest Articles</h2>
                  <Clock className="h-5 w-5 text-teal-400" />
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                  {latestPosts.map((post) => (
                    <BlogCard key={post.slug} {...post} />
                  ))}
                </div>
              </section>

              {/* Trending Posts */}
              <section>
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Trending Now</h2>
                  <TrendingUp className="h-5 w-5 text-teal-400" />
                </div>
                <div className="grid gap-8 md:grid-cols-2">
                  {trendingPosts.map((post) => (
                    <BlogCard key={post.slug} {...post} />
                  ))}
                </div>
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
      </div>
    </MainLayout>
  );
}

{/* Add CTA Section */}
<BlogCTA />
