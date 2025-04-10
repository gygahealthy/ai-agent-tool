import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";

// Define a simpler type for navigation links
interface NavPostLink {
  slug: string;
  title: string;
}

interface BlogNavigationProps {
  previous: NavPostLink | null;
  next: NavPostLink | null;
}

export const BlogNavigation = ({ previous, next }: BlogNavigationProps) => {
  return (
    <div className="border-t border-[#1E2329] bg-[#13161C] py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {previous ? (
            <Link
              href={`/blog/${previous.slug}`}
              className="flex items-center gap-2 text-teal-400 transition hover:text-teal-300"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              <div>
                <div className="text-sm text-gray-400">Previous Article</div>
                <div className="text-lg font-semibold">{previous.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="flex items-center gap-2 text-right text-teal-400 transition hover:text-teal-300"
            >
              <div>
                <div className="text-sm text-gray-400">Next Article</div>
                <div className="text-lg font-semibold">{next.title}</div>
              </div>
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
