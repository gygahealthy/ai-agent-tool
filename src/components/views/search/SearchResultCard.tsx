import { Package } from "@/types/package";
import Link from "next/link";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface SearchResultCardProps {
  package: Package;
  onClose: () => void;
}

export function SearchResultCard({ package: pkg, onClose }: SearchResultCardProps) {
  return (
    <Link 
      href={`/goi-cuoc/${pkg.ketnoiId}`}
      onClick={onClose}
      className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      {/* Left side - Package Name, Price, Duration and Hot indicator */}
      <div className="flex-shrink-0 min-w-[0px]">
        <div className="flex items-center gap-2">
          <h4 className="text-lg font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-blue-300 dark:to-blue-200">
            {pkg.name}
          </h4>
          {pkg.hot && (
            <LocalFireDepartmentIcon className="h-5 w-5 text-orange-500 animate-pulse" />
          )}
        </div>
        <div className="mt-2">
          <span className="text-xl font-bold bg-gradient-to-r from-amber-500 via-yellow-500 to-yellow-400 bg-clip-text text-transparent dark:from-amber-300 dark:via-yellow-400 dark:to-yellow-300">
            {pkg.price.toLocaleString()}đ
          </span>
        </div>
      </div>

      {/* Right side - Data Volume and Description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <WifiIcon className="h-4 w-4 text-blue-500 flex-shrink-0" />
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {pkg.dataVolume}
          </span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {pkg.description}
        </p>
      </div>
    </Link>
  );
}