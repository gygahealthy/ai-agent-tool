import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Send } from "lucide-react";

interface BlogHeaderProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  authorName: string;
  authorImageUrl?: string;
  date: string;
  tags?: string[];
}

export const BlogHeader = ({
  title,
  excerpt,
  imageUrl,
  authorName,
  authorImageUrl,
  date,
  tags,
}: BlogHeaderProps) => {
  return (
    <>
      {/* Back to Blog Link */}
      <div className="bg-[#13161C] pt-8">
        <div className="container mx-auto px-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-teal-400 transition hover:text-teal-300"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>

      {/* Cover Image Section */}
      <div className="bg-[#13161C] px-4 py-8">
        <div className="container mx-auto">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.24)]">
            <Image src={imageUrl} alt={title} fill className="object-cover" priority />
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="bg-[#13161C] px-4 py-12">
        <div className="container mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl font-bold text-white">{title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {authorImageUrl && <AvatarImage src={authorImageUrl} alt={authorName} />}
                <AvatarFallback className="bg-gray-700 text-white">
                  {authorName.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span>{authorName}</span>
            </div>
            <span>•</span>
            <span>{date}</span>
          </div>
          <div className="mt-4 flex gap-2">
            {tags?.map((tag) => (
              <Badge key={tag} className="bg-[#1E2329] text-teal-400 hover:bg-[#262B33]">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-b border-t border-[#1E2329] bg-[#13161C]">
        <div className="container mx-auto flex justify-end gap-6 px-4 py-3 text-sm">
          <span className="flex items-center gap-1.5 text-red-400">
            <Heart className="h-4 w-4" /> 24.5k
          </span>
          <span className="flex items-center gap-1.5 text-blue-400">
            <Eye className="h-4 w-4" /> 50k
          </span>
          <span className="flex items-center gap-1.5 text-green-400">
            <Send className="h-4 w-4" /> 206
          </span>
        </div>
      </div>
    </>
  );
};