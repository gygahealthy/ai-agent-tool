import { Package } from "@/types/package";
import { SearchResultCard } from "./SearchResultCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

interface SearchDropdownProps {
  results: Package[];
  isVisible: boolean;
  onClose: () => void;
}

export function SearchDropdown({ results, isVisible, onClose }: SearchDropdownProps) {
  // Sort results by price in ascending order
  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => {
      // Direct number comparison since price is already a number
      return a.price - b.price;
    });
  }, [results]);

  if (!isVisible || results.length === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute left-0 right-0 top-full z-50 mt-2"
      >
        <div className="rounded-lg border border-gray-200/50 bg-white/90 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/90">
          <ScrollArea className="max-h-[60vh] overflow-y-auto" style={{ height: 'auto' }}>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {sortedResults.map((pkg) => (
                <div
                  key={pkg.ketnoiId}
                  className="p-1 transition-colors first:pt-2 last:pb-2 hover:bg-gray-50/80 dark:hover:bg-gray-800/80"
                >
                  <SearchResultCard package={pkg} onClose={onClose} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
