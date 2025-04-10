import { Article } from "@/types/article";
import { List } from "lucide-react";

interface BlogSidebarProps {
  post: Article | null;
  tableOfContents: Array<{ title: string; id: string }>;
}

export const BlogSidebar = ({ post, tableOfContents }: BlogSidebarProps) => {
  if (!post) {
    return (
      <aside className="lg:col-span-1">
        <div className="sticky top-24 space-y-8">
          <div className="rounded-lg bg-[#1E2329] p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Post Details</h3>
            <p className="text-gray-400">Loading details...</p>
          </div>
          <div className="rounded-lg bg-[#1E2329] p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Table of Contents</h3>
            <p className="text-gray-400">Loading contents...</p>
          </div>
        </div>
      </aside>
    );
  }

  const publicationDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";
  const categoryName = post.category?.data?.attributes?.name || "Uncategorized";
  const authorName = post.author?.data?.attributes?.name || "Unknown Author";

  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24 space-y-8">
        {/* Post Details Box */}
        <div className="rounded-lg bg-[#1E2329] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">Post Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Publication Date:</span>
              <span className="text-gray-200">{publicationDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Category:</span>
              <span className="text-gray-200">{categoryName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Author Name:</span>
              <span className="text-gray-200">{authorName}</span>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="rounded-lg bg-[#1E2329] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">Table of Contents</h3>
          <ul className="space-y-2 text-sm">
            {tableOfContents.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-center gap-2 text-gray-400 transition hover:text-teal-400"
                >
                  <List className="h-3.5 w-3.5 flex-shrink-0" />
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
