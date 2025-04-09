"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WifiIcon from "@mui/icons-material/Wifi";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import InfoIcon from "@mui/icons-material/Info";
import type { Package } from "@/types/package";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { useWindowSize } from "@/hooks/useWindowSize";
import { GCPkgMobileListCard } from "./GCPkgMobileListCard";

interface GCPackageListCardProps {
  pkg: Package;
  onRegister: (pkg: Package) => void;
}

const MOBILE_BREAKPOINT = 640;

export function GCPackageListCard({ pkg, onRegister }: GCPackageListCardProps) {
  const { width } = useWindowSize();
  const isMobile = width ? width < MOBILE_BREAKPOINT : false;

  if (isMobile) {
    return <GCPkgMobileListCard pkg={pkg} onRegister={onRegister} />;
  }

  const handleCardClick = (e: React.MouseEvent) => {
    // If clicking on any button, prevent navigation
    if ((e.target as HTMLElement).closest("button")) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Link href={`/goi-cuoc/${pkg.ketnoiId}`} className="block" onClick={handleCardClick}>
      <Card className="group relative flex h-full overflow-hidden border border-gray-200/50 bg-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:border-gray-700/30 dark:bg-gray-800/90">
        {/* Package Name and Price */}
        <div
          className={`relative flex w-48 flex-none flex-col justify-center p-4 shadow-[inset_-12px_0_20px_-12px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:shadow-[inset_-12px_0_20px_-12px_rgba(0,0,0,0.3)] ${
            pkg.hot
              ? "bg-gradient-to-br from-red-600 to-red-700"
              : "bg-gradient-to-br from-indigo-600 via-blue-600 to-blue-700"
          }`}
        >
          <div className="relative z-10">
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-lg font-bold text-white/90">{pkg.name}</h3>
              {pkg.hot && (
                <div className="flex items-center gap-1 rounded-lg bg-white/10 px-2 py-0.5 text-sm font-medium backdrop-blur-sm">
                  <motion.div
                    animate={{
                      scale: [1, 1.8, 1],
                      filter: [
                        "drop-shadow(0 0 0 rgba(255,255,255,0))",
                        "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
                        "drop-shadow(0 0 0 rgba(255,255,255,0))",
                      ],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <LocalFireDepartmentIcon className="h-4 w-4 text-amber-300" />
                  </motion.div>
                </div>
              )}
            </div>
            <div className="mt-2">
              <div className="text-2xl font-bold text-amber-300">
                {pkg.price.toLocaleString()}
                <span className="text-base text-amber-200/90">đ</span>
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-white/70">
                <AccessTimeIcon className="h-3 w-3" />
                <span>{pkg.duration}</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
        </div>

        {/* Data Info */}
        <div className="flex flex-1 items-center px-6">
          <div className="flex w-1/3 items-center gap-2">
            <WifiIcon className="h-4 w-4 text-orange-500 dark:text-orange-400" />
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Data:{" "}
              <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {pkg.dataVolume}
              </span>
            </span>
          </div>
          <div className="line-clamp-2 w-2/3 text-sm text-gray-600 dark:text-gray-300">
            {pkg.description}
          </div>
        </div>

        {/* Register Button */}
        <div className="flex items-center p-4">
          <button
            className={`rounded-lg border-2 px-6 py-2 text-sm font-bold transition-all duration-300 ${
              pkg.hot
                ? "border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-950/30"
                : "border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-950/30"
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRegister(pkg);
            }}
          >
            ĐĂNG KÝ
          </button>
        </div>
      </Card>
    </Link>
  );
}
