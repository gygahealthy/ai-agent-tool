import { customMarkdownComponents } from "@/components/markdown/CustomMarkdownComponents"; // Import custom components
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image"; // Import Image if needed for block rendering
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown"; // Import for rendering RichText blocks
import rehypeRaw from "rehype-raw"; // Import the rehype-raw plugin
import remarkGfm from "remark-gfm"; // Import the GFM plugin
//
import { MainLayout } from "@/components/layouts/MainLayout";
//
import { BlogCTA } from "@/components/views/blog/BlogCTA";
import { BlogComment } from "@/components/views/blog/BlogComment";
// Add to imports
import { BlogHeader } from "@/components/views/blog/BlogHeader";
import { BlogNavigation } from "@/components/views/blog/BlogNavigation";
import { BlogSidebar } from "@/components/views/blog/BlogSidebar";
import { BlogSimilarPosts } from "@/components/views/blog/BlogSimilarPosts";
//
import { fetchAllArticleSlugs, fetchArticleBySlug } from "@/lib/strapi/fetchAiArticles"; // Import the new slug fetcher
import {
  Article, // Import the updated flat Article type
  ArticleBlock,
  StrapiListResponse,
} from "@/types/article";
import { slugify } from "@/utils/slugify"; // Import slugify
import { useEffect, useState } from "react";
import remarkParse from "remark-parse";
import { unified } from "unified";
import { visit } from "unist-util-visit";

// Placeholder data (in a real app, fetch this based on the slug)
// REMOVE STATIC blogPosts object - data comes from Strapi now
/*
const blogPosts = {
  // ... removed static data ...
};
*/

// Helper function to get a few other posts for the 'Similar News' section
// REMOVE STATIC getSimilarPosts function
/*
const getSimilarPosts = (currentSlug: string) => {
  // ... removed static logic ...
};
*/

// Type helper - No longer needed with Strapi types
// type BlogPostData = (typeof blogPosts)["ai-in-web-design"];

// Simple Table of Contents data based on example content IDs
// TODO: Generate Table of Contents dynamically from post.blocks (e.g., RichText headings)
const tableOfContents: { title: string; id: string }[] = [
  // Example, replace with dynamic generation
  // { title: "Introduction", id: "introduction" },
];

// Add this helper function after getSimilarPosts
// REMOVE STATIC getAdjacentPosts function
/*
const getAdjacentPosts = (currentSlug: string) => {
  // ... removed static logic ...
};
*/

// Helper component to render Strapi blocks
// TODO: Move this to a separate file (e.g., components/strapi/BlockRenderer.tsx)
//       and enhance with styling and support for all block types.
const BlockRenderer: React.FC<{ block: ArticleBlock }> = ({ block }) => {
  switch (block.__component) {
    case "shared.rich-text":
      const trimmedBody = block.body?.trim() || "";
      return (
        <div className="max-w-none">
          <ReactMarkdown
            components={customMarkdownComponents}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {trimmedBody}
          </ReactMarkdown>
        </div>
      );
    case "blocks.media":
      // Access file directly from block, then its nested data
      if (!block.file?.data) return null;
      const media = block.file.data.attributes;
      return (
        <figure className="my-8">
          <Image
            src={
              media?.url
                ? (process.env.NEXT_PUBLIC_STRAPI_CMS_BASE_URL || "") + media.url
                : "/placeholder-image.jpg"
            }
            alt={media?.alternativeText || "Blog image"}
            width={media?.width || 800}
            height={media?.height || 450}
            className="mx-auto rounded-lg"
          />
          {media?.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-500">
              {media.caption}
            </figcaption>
          )}
        </figure>
      );
    case "blocks.quote":
      return (
        <blockquote className="my-12 rounded-lg border-l-4 border-teal-500 bg-[#0D2A2D] p-8 md:p-12">
          <div className="mx-auto max-w-3xl">
            <div className="text-lg italic leading-relaxed text-[#94A3B8] md:text-xl">
              {block.text}
            </div>
            {block.author && (
              <div className="mt-6 border-t border-[#1E4145] pt-4 text-sm text-[#64748B]">
                {block.author}
              </div>
            )}
          </div>
        </blockquote>
      );
    // case "blocks.slider":
    //   // Implement Slider rendering
    //   return <div>Slider Component Placeholder</div>;
    default:
      console.warn(`Unsupported block type: ${block.__component}`);
      return null;
  }
};

// Define TOC item type
interface TocItem {
  title: string;
  id: string;
  level: number; // Keep track of heading level (e.g., 2 for H2)
}

// In the BlogPostPage component, add:
export default function BlogPostPage({ post }: { post: Article | null }) {
  const router = useRouter();
  const [tableOfContents, setTableOfContents] = useState<TocItem[]>([]);

  useEffect(() => {
    if (!post || !post.blocks) return;

    const tocItems: TocItem[] = [];

    // Find the rich text block(s) - adjust if you have multiple
    const richTextBlock = post.blocks.find((block) => block.__component === "shared.rich-text");

    if (richTextBlock && "body" in richTextBlock) {
      const processor = unified().use(remarkParse);
      const tree = processor.parse(richTextBlock.body);

      visit(tree, "heading", (node) => {
        // Only process H2 headings for now
        if (node.depth === 2) {
          let textContent = "";
          // Extract text content from children
          visit(node, "text", (textNode) => {
            textContent += textNode.value;
          });

          if (textContent) {
            tocItems.push({
              title: textContent,
              id: slugify(textContent), // Generate ID using the utility
              level: node.depth,
            });
          }
        }
      });
    }

    setTableOfContents(tocItems);
  }, [post]); // Re-run effect if post data changes

  if (router.isFallback || !post) {
    return (
      <MainLayout title="Loading...">
        <div className="flex min-h-screen items-center justify-center bg-[#13161C] text-white">
          Loading...
        </div>
      </MainLayout>
    );
  }

  // Prepare props for BlogHeader using direct access on post
  const headerProps = {
    title: post.title,
    excerpt: post.description || "",
    imageUrl: post.cover?.url
      ? (process.env.NEXT_PUBLIC_STRAPI_CMS_BASE_URL || "") + post.cover.url
      : post.coverUrl || "/placeholder-image.jpg",
    authorName: post.author?.data?.attributes?.name || "Unknown Author",
    date: new Date(post.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  return (
    <MainLayout title={`${post.title} - Blog`} description={post.description || ""}>
      <BlogHeader {...headerProps} />

      {/* Main Content Area */}
      <div className="bg-[#13161C] py-12">
        <div className="container mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 lg:grid-cols-3">
          <article className="space-y-6 lg:col-span-2">
            {/* Render Strapi Blocks directly from post.blocks */}
            {post.blocks && post.blocks.length > 0 ? (
              post.blocks.map((block) => (
                <BlockRenderer key={`${block.__component}-${block.id}`} block={block} />
              ))
            ) : (
              <p className="text-gray-400">Content not available.</p>
            )}
          </article>

          {/* Pass generated tableOfContents to sidebar */}
          <BlogSidebar post={post} tableOfContents={tableOfContents} />
        </div>
      </div>
      {/* TODO: Fetch actual adjacent posts in getStaticProps */}
      <BlogNavigation previous={null} next={null} />
      {/* TODO: Fetch actual similar posts in getStaticProps */}
      <BlogSimilarPosts posts={[]} />
      <BlogCTA />
      <BlogComment />
    </MainLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  console.log("Generating static paths for blog posts...");
  let paths: { params: { slug: string } }[] = [];

  try {
    // Fetch all slugs from Strapi
    const slugs = await fetchAllArticleSlugs();

    // Map the slugs to the format required by getStaticPaths
    paths = slugs.map((slug) => ({
      params: { slug },
    }));

    console.log(`Generated ${paths.length} paths.`);
  } catch (error) {
    console.error("Error fetching slugs for getStaticPaths:", error);
    // Return empty paths on error, resulting in 404s for all blog posts
    paths = [];
  }

  return {
    paths,
    fallback: false, // Required for output: 'export'
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params?.slug as string;
  let postData: Article | null = null; // Use the flat Article type
  let notFound = false;

  if (!slug) {
    return { notFound: true };
  }

  try {
    // Fetch returns StrapiListResponse<Article> where Article is flat
    const response: StrapiListResponse<Article> = await fetchArticleBySlug(slug);

    // Check if data array has items
    if (response.data && response.data.length > 0) {
      postData = response.data[0]; // Assign the first (flat) article object
    } else {
      console.log(`No article found for slug: ${slug}`);
      notFound = true;
    }
  } catch (error) {
    console.error(`Error fetching article with slug ${slug}:`, error);
    notFound = true;
  }

  if (notFound) {
    return { notFound: true };
  }

  // TODO: Fetch similar/adjacent posts based on the fetched postData (now flat)

  return {
    props: {
      post: postData, // Pass the flat article object or null
    },
    // No revalidate
  };
};
