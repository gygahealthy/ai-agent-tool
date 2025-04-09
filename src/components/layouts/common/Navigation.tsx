import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export interface NavigationItem {
  label: string;
  href: string;
  submenu?: {
    title?: string;
    items: {
      label: string;
      href: string;
      isHot?: boolean;
    }[];
    hasImage?: boolean;
  }[];
}

const NAVIGATION_DATA: NavigationItem[] = [
  { label: "HOME", href: "/" },
  {
    label: "SHOP",
    href: "/shop",
    submenu: [
      {
        title: "Shop Layout",
        items: [
          { label: "Shop - Left Sidebar", href: "/shop/left-sidebar" },
          { label: "Shop - Right Sidebar", href: "/shop/right-sidebar" },
          { label: "Shop - Fullwidth V1", href: "/shop/fullwidth-v1" },
          { label: "Shop - Fullwidth V2", href: "/shop/fullwidth-v2" },
          { label: "Shop - Fullwidth V3", href: "/shop/fullwidth-v3", isHot: true },
        ],
      },
      {
        title: "Shop Features",
        items: [
          { label: "Shop - List view", href: "/shop/list-view" },
          { label: "Shop - Filter List", href: "/shop/filter-list" },
          { label: "Shop - Filter Inline", href: "/shop/filter-inline" },
          { label: "Shop - Filter Top", href: "/shop/filter-top" },
          { label: "Shop - Infinite Scroll", href: "/shop/infinite-scroll" },
        ],
      },
      {
        title: "Shop by Popular Parts",
        items: [
          { label: "Chairs", href: "/shop/chairs" },
          { label: "Decor", href: "/shop/decor" },
          { label: "Furnitures", href: "/shop/furnitures" },
          { label: "Sofas", href: "/shop/sofas" },
          { label: "Lighting", href: "/shop/lighting" },
        ],
        hasImage: true,
      },
    ],
  },
  { label: "PRODUCT", href: "/product" },
  { label: "BLOG", href: "/blog" },
  { label: "PAGES", href: "/pages" },
  { label: "CONTACT", href: "/contact" },
];

const CATEGORY_IMAGES = [
  {
    category: "Chairs",
    src: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=300",
  },
  {
    category: "Decor",
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=300",
  },
  {
    category: "Furnitures",
    src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=300",
  },
  {
    category: "Sofas",
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=300",
  },
  {
    category: "Lighting",
    src: "https://images.unsplash.com/photo-1573966823540-4b609cce98fe?q=80&w=300",
  },
];

export function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="hidden items-center md:flex">
      <div className="flex gap-8">
        {NAVIGATION_DATA.map((item) => (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href={item.href}
              className="group relative py-4 text-sm font-medium text-gray-700 transition-colors hover:text-black"
              aria-label={`Navigate to ${item.label} page`}
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-[1px] h-[2px] scale-x-0 transform bg-black transition-transform group-hover:scale-x-100" />
            </Link>

            {/* Dropdown Menu */}
            {item.submenu && (
              <AnimatePresence>
                {activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full z-50 mt-0 w-[1000px] rounded-md bg-white p-6 shadow-lg"
                  >
                    <div className="grid grid-cols-3 gap-8">
                      {item.submenu.map((section, index) => (
                        <div key={index} className="space-y-4">
                          {section.title && (
                            <h3 className="font-medium text-gray-800">{section.title}</h3>
                          )}

                          {section.hasImage ? (
                            <div className="grid grid-cols-5 gap-4">
                              {section.items.map((subItem, idx) => (
                                <div key={idx} className="text-center">
                                  <div className="aspect-square overflow-hidden rounded bg-[#f9f1e7]">
                                    <Link href={subItem.href} className="block">
                                      <Image
                                        src={
                                          CATEGORY_IMAGES.find(
                                            (img) => img.category === subItem.label
                                          )?.src || ""
                                        }
                                        alt={subItem.label}
                                        width={160}
                                        height={160}
                                        className="h-full w-full object-cover transition-transform hover:scale-105"
                                      />
                                    </Link>
                                  </div>
                                  <Link
                                    href={subItem.href}
                                    className="mt-2 block text-sm font-medium text-gray-700 hover:text-black"
                                  >
                                    {subItem.label}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <ul className="space-y-2">
                              {section.items.map((subItem, idx) => (
                                <li key={idx}>
                                  <Link
                                    href={subItem.href}
                                    className="flex items-center text-sm text-gray-600 transition-colors hover:text-black"
                                  >
                                    {subItem.label}
                                    {subItem.isHot && (
                                      <span className="ml-2 rounded bg-green-500 px-1.5 py-0.5 text-[10px] font-medium uppercase text-white">
                                        Hot
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
