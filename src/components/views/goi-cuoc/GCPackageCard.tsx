"use client";

import { Card } from "@/components/ui/card";
import type { Package } from "@/types/package";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    isPreOrder?: boolean;
    discount?: number;
    colors: string[];
    slug: string;
  };
  onAddToCart?: (id: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product.id);
    }
  };

  return (
    <div className="group relative isolate h-full transform-gpu will-change-transform">
      <Link href={`/product/${product.slug}`} className="block h-full">
        <Card className="relative h-full overflow-hidden border-none bg-gray-50 transition-all duration-300">
          {/* Product Image with Badges */}
          <div className="relative aspect-square overflow-hidden bg-white">
            {/* Pre-order Badge */}
            {product.isPreOrder && (
              <div className="absolute left-3 top-3 z-10 bg-cyan-500 px-2 py-1 text-xs font-medium text-white">
                Pre_order
              </div>
            )}

            {/* Discount Badge */}
            {product.discount && (
              <div className="absolute right-3 top-3 z-10 bg-green-500 px-2 py-1 text-xs font-medium text-white">
                -{product.discount}%
              </div>
            )}

            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Quick Action Buttons - Only visible on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-colors hover:bg-gray-100"
                  onClick={handleAddToCart}
                >
                  <ShoppingCartOutlinedIcon className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-colors hover:bg-gray-100"
                >
                  <FavoriteBorderIcon className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition-colors hover:bg-gray-100"
                >
                  <SearchIcon className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="p-4">
            {/* Product Name */}
            <h3 className="text-sm font-medium text-gray-700">{product.name}</h3>

            {/* Pricing */}
            <div className="mt-2 flex items-center gap-2">
              {product.originalPrice ? (
                <>
                  <span className="text-base font-semibold text-orange-500">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-base font-semibold text-gray-800">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Color Options */}
            <div className="mt-3 flex gap-1">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className="h-4 w-4 cursor-pointer rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                  title={color}
                ></div>
              ))}
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}

// Legacy adapter for backward compatibility
export function GCPackageCard({
  package: pkg,
  onRegister,
}: {
  package: Package;
  onRegister: (pkg: Package) => void;
}) {
  const product = {
    id: pkg.id,
    name: pkg.name,
    price: pkg.price,
    originalPrice: pkg.hot ? pkg.price * 1.2 : undefined,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1000",
    discount: pkg.hot ? 20 : undefined,
    colors: ["#789395", "#94B49F", "#B4CFB0", "#E5E3C9"],
    slug: pkg.ketnoiId,
  };

  return <ProductCard product={product} onAddToCart={() => onRegister(pkg)} />;
}
