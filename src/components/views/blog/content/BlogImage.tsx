import Image from "next/image";

interface BlogImageProps {
  src?: string | null;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  fallbackSrc?: string;
}

export const BlogImage = ({ src, alt, caption, width, height, fallbackSrc }: BlogImageProps) => {
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_CMS_BASE_URL || "";
  let finalSrc = "/placeholder-image.jpg";

  if (src) {
    finalSrc = src.startsWith("/") ? `${strapiBaseUrl}${src}` : src;
  } else if (fallbackSrc) {
    finalSrc = fallbackSrc;
  }

  const imageWidth = width || 800;
  const imageHeight = height || 450;

  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.24)]">
        <Image
          src={finalSrc}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
          className="w-full object-cover"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-400">{caption}</figcaption>
      )}
    </figure>
  );
};
