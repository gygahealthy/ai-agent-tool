import Image from "next/image";

interface BlogSliderProps {
  images: Array<{ src: string; alt: string }>;
}

export const BlogSlider = ({ images }: BlogSliderProps) => (
  <div className="my-8 overflow-hidden rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
    <div className="relative aspect-[16/9]">
      <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" />
    </div>
  </div>
);