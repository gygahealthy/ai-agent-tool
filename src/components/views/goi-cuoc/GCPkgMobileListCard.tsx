"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WifiIcon from "@mui/icons-material/Wifi";
import type { Package } from "@/types/package";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

interface GCPkgMobileListCardProps {
  pkg: Package;
  onRegister: (pkg: Package) => void;
}

export function GCPkgMobileListCard({ pkg, onRegister }: GCPkgMobileListCardProps) {
  const handleCardClick = (e: React.MouseEvent) => {
    // If clicking on any button, prevent navigation
    if ((e.target as HTMLElement).closest("button")) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <Link href={`/goi-cuoc/${pkg.ketnoiId}`} className="block" onClick={handleCardClick}>
      <Card className="group relative flex h-full overflow-hidden border border-gray-200/50 bg-white/90 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:border-gray-700/30 dark:bg-gray-800/90">
        {/* Left Section - Package Name and Price */}
        <div
          className={`relative flex w-[140px] flex-none flex-col justify-center p-3 ${
            pkg.hot
              ? "bg-gradient-to-br from-red-600 to-red-700"
              : "bg-gradient-to-r from-blue-600 to-blue-700"
          }`}
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-1">
              <h3 className="text-base font-bold text-white">{pkg.name}</h3>
              {pkg.hot && (
                <div className="flex items-center gap-0.5 rounded-lg bg-white/10 px-1.5 py-0.5 text-xs font-medium backdrop-blur-sm">
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
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
                    <LocalFireDepartmentIcon className="h-3.5 w-3.5 text-amber-300" />
                  </motion.div>
                  <span className="text-amber-200">Hot</span>
                </div>
              )}
            </div>
            <div className="mt-1">
              <div className="text-xl font-bold text-yellow-400">
                {pkg.price.toLocaleString()}
                <span className="text-sm text-yellow-300">đ</span>
              </div>
              <div className="mt-0.5 flex items-center gap-1 text-xs text-white/80">
                <AccessTimeIcon className="h-3 w-3" />
                <span>{pkg.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Data, Description and Button */}
        <div className="flex flex-1 flex-col justify-between p-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <WifiIcon className="h-4 w-4 flex-shrink-0 text-orange-500" />
              <div className="flex items-center gap-1">
                <span className="text-gray-500">Data:</span>
                <span className="text-base font-bold text-orange-500">{pkg.dataVolume}</span>
              </div>
            </div>
            <div className="line-clamp-2 text-sm text-gray-500">{pkg.description}</div>
          </div>

          {/* Register Button */}
          <button
            className={`mt-2 w-full rounded-lg border-2 px-4 py-1.5 text-sm font-bold transition-all duration-300 ${
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
