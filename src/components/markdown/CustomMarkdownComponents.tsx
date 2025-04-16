// src/components/markdown/CustomMarkdownComponents.tsx
import { slugify } from "@/utils/slugify"; // Import the slugify utility
import Image from "next/image";
import Link from "next/link";
import { Components } from "react-markdown"; // Use the main Components type

// Helper to extract text content from heading node
const getNodeText = (node: any): string => {
  if (!node || !node.children) return "";
  return node.children
    .map((child: any) => {
      if (child.type === "text") return child.value;
      return getNodeText(child); // Recursively get text from nested nodes if any
    })
    .join("");
};

// Define custom components with Tailwind classes for dark theme
export const customMarkdownComponents: Components = {
  // Hide H1 from markdown content entirely as it duplicates BlogHeader
  h1: ({ node, ...props }) => <h1 className="hidden" {...props} />,
  // Keep H2 as a major section separator
  h2: ({ node, ...props }) => {
    const textContent = getNodeText(node);
    const id = slugify(textContent);
    return (
      <h2
        id={id}
        className="mb-4 mt-10 scroll-mt-20 border-b border-gray-700 pb-2 text-2xl font-semibold text-white"
        {...props}
      />
    );
  },
  h3: ({ node, ...props }) => (
    <h3 className="mb-4 mt-6 text-xl font-semibold text-white" {...props} />
  ),
  h4: ({ node, ...props }) => (
    <h4 className="mb-4 mt-4 text-lg font-semibold text-white" {...props} />
  ),
  p: ({ node, ...props }) => (
    <p className="mb-6 text-lg leading-relaxed text-gray-300" {...props} />
  ),
  a: ({ node, href, children, ...props }) => {
    // Safety check for href
    if (!href) {
      return <span className="text-gray-400">{children}</span>;
    }

    // Handle internal links
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link
          href={href}
          className="text-teal-400 transition hover:text-teal-300 hover:underline"
          {...props}
        >
          {children}
        </Link>
      );
    }

    // Handle external links (including affiliate links)
    // Use stringified href to ensure it works in production
    const safeHref = String(href);
    return (
      <a
        href={safeHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-teal-400 transition hover:text-teal-300 hover:underline"
        onClick={(e) => {
          // Optional: Add analytics tracking for affiliate links
          if (safeHref.includes("partnerlinks.io")) {
            console.log("Affiliate link clicked:", safeHref);
            // Add your analytics code here if needed
          }
        }}
        {...props}
      >
        {children}
      </a>
    );
  },
  ul: ({ node, ...props }) => (
    <ul
      className="mb-6 list-disc space-y-2 pl-6 text-lg text-gray-300 marker:text-teal-400"
      {...props}
    />
  ),
  ol: ({ node, ...props }) => (
    <ol
      className="mb-6 list-decimal space-y-2 pl-6 text-lg text-gray-300 marker:text-teal-400"
      {...props}
    />
  ),
  li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote
      className="my-6 border-l-4 border-teal-500 bg-[#1E2329] p-4 italic text-gray-400"
      {...props}
    />
  ),
  img: ({ node, src, alt, title, width, height, ...props }) => {
    const imageUrl = src?.startsWith("http")
      ? src
      : (process.env.NEXT_PUBLIC_STRAPI_CMS_BASE_URL || "") + src;
    const imgWidth = typeof width === "number" ? width : 800;
    const imgHeight = typeof height === "number" ? height : 450;
    return (
      <figure className="my-8">
        <Image
          src={imageUrl}
          alt={alt || "Markdown image"}
          width={imgWidth}
          height={imgHeight}
          title={title}
          className="mx-auto rounded-lg shadow-md"
        />
      </figure>
    );
  },

  // Improved Table Styling
  table: ({ node, ...props }) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-gray-700 bg-[#13161C]">
      <table className="w-full min-w-[640px] text-left text-sm" {...props} />
    </div>
  ),
  thead: ({ node, ...props }) => (
    <thead className="bg-gray-800/60 text-xs uppercase text-gray-400" {...props} />
  ),
  tbody: ({ node, ...props }) => <tbody className="divide-y divide-gray-700" {...props} />,
  tr: ({ node, ...props }) => (
    <tr className="border-b border-gray-700 bg-[#1E2329] hover:bg-gray-800/50" {...props} />
  ),
  th: ({ node, style, ...props }) => (
    <th
      scope="col"
      style={style}
      className="whitespace-nowrap px-6 py-3 font-medium text-white"
      {...props}
    />
  ),
  td: ({ node, style, ...props }) => (
    <td style={style} className="whitespace-nowrap px-6 py-4 text-gray-300" {...props} />
  ),
};
