import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { List } from "lucide-react";
import { BlogPostData } from "@/types/blog";

interface BlogSidebarProps {
  post: BlogPostData;
  tableOfContents: Array<{ title: string; id: string }>;
}

export const BlogSidebar = ({ post, tableOfContents }: BlogSidebarProps) => {
  return (
    <aside className="lg:col-span-1">
      <div className="sticky top-24 space-y-8">
        {/* Post Details Box */}
        <div className="rounded-lg bg-[#1E2329] p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">Post Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Publication Date:</span>
              <span className="text-gray-200">{post.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Category:</span>
              <span className="text-gray-200">{post.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Reading Time:</span>
              <span className="text-gray-200">{post.readingTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Author Name:</span>
              <span className="text-gray-200">{post.authorName}</span>
            </div>
            {post.authorImageUrl && (
              <div className="flex items-center justify-end pt-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.authorImageUrl} alt={post.authorName} />
                  <AvatarFallback className="bg-gray-700 text-white">
                    {post.authorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
            )}
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

        {/* Tags Box */}
        {post.tags && post.tags.length > 0 && (
          <div className="rounded-lg bg-[#1E2329] p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} className="bg-[#13161C] text-teal-400 hover:bg-[#262B33]">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
