import { Button } from "@/components/ui/button";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";

// Updated Navigation Items based on reference site
const NAVIGATION_ITEMS: [string, string][] = [
  ["Home", "/"],
  ["Features", "/features"],
  ["Process", "/process"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
];

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle search visibility - keep this if search functionality is desired
  const handleSearchVisibilityToggle = useCallback(() => {
    setIsSearchVisible((prev) => !prev);
    if (isSearchVisible && searchQuery) {
      setSearchQuery(""); // Clear search when closing
    }
  }, [isSearchVisible, searchQuery]);

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-[#13161C] text-white">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-12">
          <Link href="/" className="relative flex items-center" aria-label="AI Hub Home">
            <span className="text-2xl font-bold tracking-wider text-white">AI Hub</span>
          </Link>

          <nav className="hidden md:flex">
            <ul className="flex items-center gap-6">
              {NAVIGATION_ITEMS.map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm font-medium text-gray-300 transition-colors hover:text-white"
                  >
                    {label} {label === "Process" ? "▾" : ""}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-300 hover:bg-gray-700 hover:text-white"
            onClick={handleSearchVisibilityToggle}
            aria-label="Search"
          >
            <SearchIcon className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-gray-300 hover:bg-gray-700 hover:text-white md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isSearchVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full border-t border-gray-700 bg-gray-800 shadow-lg"
          >
            <div className="container mx-auto px-4 py-3">
              <div className="relative">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Search..."
                  className="h-10 w-full rounded-lg border border-gray-600 bg-gray-700 px-4 pr-10 text-sm text-white placeholder-gray-400 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                  aria-label="Search website"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <SearchIcon
                    className="h-5 w-5 cursor-pointer text-gray-400 hover:text-white"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 z-50 h-full w-[80%] max-w-sm bg-gray-900 p-6 shadow-xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-gray-700 pb-4">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} aria-label="AI Hub Home">
                  <span className="text-2xl font-bold tracking-wider text-white">AI Hub</span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-full text-gray-400 hover:bg-gray-700 hover:text-white"
                  aria-label="Close menu"
                >
                  <CloseIcon className="h-6 w-6" />
                </Button>
              </div>

              <nav className="mt-8">
                <ul className="space-y-2">
                  {NAVIGATION_ITEMS.map(([label, href]) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="block rounded-lg px-4 py-2.5 text-base font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {label} {label === "Process" ? "▾" : ""}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 border-t border-gray-700 pt-6">
                <div className="relative">
                  <input
                    type="search"
                    placeholder="Search..."
                    className="h-10 w-full rounded-lg border border-gray-600 bg-gray-800 px-4 pr-10 text-sm text-white placeholder-gray-400 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500"
                    aria-label="Search website (mobile)"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
