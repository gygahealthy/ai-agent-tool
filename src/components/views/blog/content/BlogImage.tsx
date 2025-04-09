import Image from "next/image";

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export const BlogImage = ({ src, alt, caption }: BlogImageProps) => (
  <figure className="my-8">
    <div className="overflow-hidden rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.24)]">
      <img src={src} alt={alt} className="w-full object-cover" />
    </div>
    {caption && (
      <figcaption className="mt-3 text-center text-sm text-gray-400">{caption}</figcaption>
    )}
  </figure>
);