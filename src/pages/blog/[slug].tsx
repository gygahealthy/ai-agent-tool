import { useRouter } from "next/router";
import { MainLayout } from "@/components/layouts/MainLayout";
//
import { BlogCTA } from "@/components/views/blog/BlogCTA";
import { BlogComment } from "@/components/views/blog/BlogComment";
// Add to imports
import { BlogHeader } from "@/components/views/blog/BlogHeader";
import { BlogNavigation } from "@/components/views/blog/BlogNavigation";
import { BlogSimilarPosts } from "@/components/views/blog/BlogSimilarPosts";
import { BlogSidebar } from "@/components/views/blog/BlogSidebar";

// Placeholder data (in a real app, fetch this based on the slug)
const blogPosts = {
  "ai-in-web-design": {
    slug: "ai-in-web-design",
    title: "The Rising Impact of AI in Modern Web Design",
    excerpt:
      "Explore how artificial intelligence is revolutionizing web design, from automated layouts to personalized user experiences.",
    imageUrl:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Larger image for cover
    authorName: "Alex Johnson",
    authorImageUrl: "/images/authors/alex.jpg",
    date: "Apr 07, 2024",
    category: "Web Design",
    readingTime: "8 Min",
    tags: ["AI", "Web Design", "Technology"],
    content: `
<h2 class="text-3xl font-semibold mb-4 text-white" id="introduction">Introduction</h2>
<p class="mb-6 text-lg text-gray-300">Artificial Intelligence (AI) has emerged as a transformative force in the web design industry, reshaping user experiences, workflows, and the very nature of digital interfaces. In this blog post, we explore the profound impact of AI in web design, from revolutionizing design processes to enhancing user engagement.</p>

<div class="my-12 rounded-lg bg-[#0D2A2D] p-8 md:p-12">
  <div class="mx-auto max-w-3xl">
    <div class="text-lg leading-relaxed text-[#94A3B8] md:text-xl">
      Hustle and Cashflow is a blog that aims to educate millennials on personal finance. What allows to differ from other personal finance blogs, is how we chose to communicate personal finance and money to millennials using humour and relatable language while providing quality information about how to deal with money and sharing stories of young people overcoming their financial struggle.
    </div>
    <div class="mt-6 border-t border-[#1E4145] pt-4 text-sm text-[#64748B]">
      PHILIP REYES
    </div>
  </div>
</div>

<h2 class="text-3xl font-semibold mb-4 mt-8 text-white" id="ai-powered-tools">AI-Powered Design Tools</h2>
<p class="mb-6 text-lg text-gray-300">AI is powering a new generation of design tools that automate repetitive tasks, suggest layout options, and even generate code. Platforms leverage AI to analyze user data and create personalized website experiences in real-time.</p>

<figure class="my-8">
  <img src="https://images.unsplash.com/photo-1684493735679-b5983e1e3b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Abstract sphere grid" class="rounded-lg mx-auto" />
  <figcaption class="mt-2 text-center text-sm text-gray-500">AI generating abstract design patterns.</figcaption>
</figure>

<h2 class="text-3xl font-semibold mb-4 mt-8 text-white" id="personalization">Enhanced Personalization</h2>
<p class="mb-6 text-lg text-gray-300">AI algorithms analyze user behavior, preferences, and demographics to tailor website content, layouts, and recommendations. This level of personalization leads to higher engagement rates and improved conversion metrics.</p>

<div class="my-12 rounded-lg bg-[#0D2A2D] p-8 md:p-12">
  <div class="mx-auto max-w-3xl">
    <div class="text-lg leading-relaxed text-[#94A3B8] md:text-xl">
      It often makes reference to pop culture and the latest internet jokes, allowing our readers to have a place to learn and develop a sense of community.
    </div>
    <div class="mt-6 border-t border-[#1E4145] pt-4 text-sm text-[#64748B]">
      ALEX JOHNSON
    </div>
  </div>
</div>

<ul class="mb-6 list-disc space-y-2 pl-6 text-lg text-gray-300">
  <li>Dynamic content adaptation</li>
  <li>Personalized product recommendations</li>
  <li>User-specific UI adjustments</li>
</ul>

<h2 class="text-3xl font-semibold mb-4 mt-8 text-white" id="conclusion">Conclusion</h2>
<p class="text-lg text-gray-300">The integration of AI in web design is not just a trend; it's a fundamental shift in how we create and interact with digital experiences. By embracing AI tools and techniques, designers can unlock new levels of creativity, efficiency, and user satisfaction.</p>
    `,
  },
  "optimizing-images-with-ai": {
    slug: "optimizing-images-with-ai",
    title: "Optimizing Images for the Web Using AI Tools",
    excerpt:
      "Learn about cutting-edge AI tools that automatically compress and enhance images for faster load times and better quality.",
    imageUrl:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    authorName: "Samantha Lee",
    authorImageUrl: "/images/authors/samantha.jpg",
    date: "Apr 05, 2024",
    category: "Optimization",
    readingTime: "6 Min",
    tags: ["AI", "Optimization", "Images"],
    content: `<p class="mb-6 text-lg text-gray-300">Image optimization is crucial for web performance. AI tools are making this process smarter and more efficient...</p>`,
  },
  "future-of-content-creation": {
    slug: "future-of-content-creation",
    title: "AI and the Future of Content Creation",
    excerpt:
      "How AI algorithms are changing the landscape of content creation, from writing articles to generating video scripts.",
    imageUrl:
      "https://images.unsplash.com/photo-1677759946174-3a0d4937a5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
    authorName: "David Chen",
    authorImageUrl: undefined,
    date: "Apr 02, 2024",
    category: "Content Marketing",
    readingTime: "7 Min",
    tags: ["AI", "Content Marketing", "Future Tech"],
    content: `<p class="mb-6 text-lg text-gray-300">AI is rapidly transforming content creation, offering new possibilities for writers, marketers, and creators...</p>`,
  },
  "ethical-ai-development": {
    slug: "ethical-ai-development",
    title: "Navigating the Ethics of AI Development",
    excerpt:
      "A look into the important ethical considerations developers must address when building AI systems.",
    imageUrl:
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    authorName: "Maria Garcia",
    authorImageUrl: "/images/authors/maria.jpg",
    date: "Mar 30, 2024",
    category: "Ethics",
    readingTime: "9 Min",
    tags: ["AI", "Ethics", "Development"],
    content: `<p class="mb-6 text-lg text-gray-300">As AI becomes more powerful, the ethical implications of its development and deployment are paramount...</p>`,
  },
};

// Helper function to get a few other posts for the 'Similar News' section
const getSimilarPosts = (currentSlug: string) => {
  return Object.values(blogPosts)
    .filter((post) => post.slug !== currentSlug)
    .slice(0, 3); // Get up to 3 other posts
};

type BlogPostData = (typeof blogPosts)["ai-in-web-design"]; // Type helper

// Simple Table of Contents data based on example content IDs
const tableOfContents = [
  { title: "Introduction", id: "introduction" },
  { title: "AI-Powered Design Tools", id: "ai-powered-tools" },
  { title: "Enhanced Personalization", id: "personalization" },
  { title: "Conclusion", id: "conclusion" },
];

// Add this helper function after getSimilarPosts
const getAdjacentPosts = (currentSlug: string) => {
  const slugs = Object.keys(blogPosts);
  const currentIndex = slugs.indexOf(currentSlug);

  return {
    previous:
      currentIndex > 0 ? blogPosts[slugs[currentIndex - 1] as keyof typeof blogPosts] : null,
    next:
      currentIndex < slugs.length - 1
        ? blogPosts[slugs[currentIndex + 1] as keyof typeof blogPosts]
        : null,
  };
};

// In the BlogPostPage component, add:
export default function BlogPostPage() {
  const router = useRouter();
  const { slug } = router.query;

  const post = slug && typeof slug === "string" ? blogPosts[slug as keyof typeof blogPosts] : null;
  const similarPosts = slug && typeof slug === "string" ? getSimilarPosts(slug) : [];
  const adjacentPosts =
    slug && typeof slug === "string" ? getAdjacentPosts(slug) : { previous: null, next: null };

  if (router.isFallback || !post) {
    return (
      <MainLayout title="Loading...">
        <div className="flex min-h-screen items-center justify-center bg-[#13161C] text-white">
          Loading...
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title={`${post.title} - Blog`} description={post.excerpt}>
      <BlogHeader {...post} />

      {/* Main Content Area */}
      <div className="bg-[#13161C] py-12">
        <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 lg:grid-cols-3">
          <article className="prose prose-invert prose-lg prose-p:text-gray-300 prose-headings:text-white prose-a:text-teal-400 hover:prose-a:text-teal-300 prose-strong:text-white prose-blockquote:border-l-teal-500 prose-li:marker:text-teal-400 prose-img:rounded-lg prose-img:mx-auto prose-figcaption:text-gray-400 max-w-none lg:col-span-2">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          <BlogSidebar post={post} tableOfContents={tableOfContents} />
        </div>
      </div>

      <BlogNavigation previous={adjacentPosts.previous} next={adjacentPosts.next} />
      <BlogSimilarPosts posts={similarPosts} />
      <BlogCTA />
      <BlogComment />
    </MainLayout>
  );
}

// If using Next.js SSG (Static Site Generation), define getStaticPaths and getStaticProps
// Example:
/*
export async function getStaticPaths() {
  // Fetch all possible slugs from your data source
  const paths = Object.keys(blogPosts).map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: true, // or false if all paths are known
  };
}

export async function getStaticProps({ params }) {
  const slug = params.slug as string;
  // Fetch post data based on slug
  const post = blogPosts[slug];

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
    // revalidate: 60, // Optional: ISR (Incremental Static Regeneration)
  };
}
*/
// Note: The page component needs to accept `post` as a prop if using getStaticProps
