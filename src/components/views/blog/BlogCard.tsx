import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  authorName: string;
  authorImageUrl?: string;
  date: string;
  tags?: string[];
}

export const BlogCard: React.FC<BlogCardProps> = ({
  slug,
  title,
  excerpt,
  imageUrl,
  authorName,
  authorImageUrl,
  date,
  tags,
}) => {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-700 bg-gray-800/50 shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-teal-500/20">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority // Prioritize loading images for cards likely in viewport
          />
        </div>
      </Link>
      <CardHeader className="p-4">
        {tags && tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} className="bg-teal-500/20 text-teal-300">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <Link href={`/blog/${slug}`} className="block">
          <CardTitle className="text-xl font-semibold text-white hover:text-teal-400">
            {title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4 pt-0">
        <p className="text-sm text-gray-400">{excerpt}</p>
      </CardContent>
      <CardFooter className="mt-auto flex items-center justify-between border-t border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            {authorImageUrl && <AvatarImage src={authorImageUrl} alt={authorName} />}
            <AvatarFallback className="bg-gray-600 text-xs text-white">
              {authorName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-400">{authorName}</span>
        </div>
        <span className="text-xs text-gray-500">{date}</span>
      </CardFooter>
    </Card>
  );
}; 