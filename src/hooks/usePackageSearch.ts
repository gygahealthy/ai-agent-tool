import { useState, useEffect, useCallback, useMemo } from "react";
import { Package } from "@/types/package";
import { useIndexedDBSync } from "@/services/IndexedDBSyncService";

export function usePackageSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dbSync = useIndexedDBSync();

  // Memoize the dbSync instance
  const memoizedDbSync = useMemo(() => dbSync, []);

  // Memoize the search function
  const searchPackages = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const packages = await memoizedDbSync.getPackages();
        const normalizedQuery = query.toLowerCase().trim();

        // First, find exact matches in names
        const exactNameMatches = packages.filter((pkg) =>
          pkg.name.toLowerCase().includes(normalizedQuery)
        );

        // Then find matches in other fields
        const otherMatches = packages.filter((pkg) => {
          if (exactNameMatches.includes(pkg)) return false;
          return (
            pkg.description.toLowerCase().includes(normalizedQuery) ||
            pkg.dataVolume.toLowerCase().includes(normalizedQuery) ||
            pkg.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
          );
        });

        return [...exactNameMatches, ...otherMatches].slice(0, 5);
      } catch (error) {
        console.error("Search failed:", error);
        return [];
      }
    },
    [memoizedDbSync]
  );

  // Separate effect for loading state and search execution
  useEffect(() => {
    let isActive = true;

    const executeSearch = async () => {
      if (!searchQuery || searchQuery.length < 2) {
        setSearchResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const results = await searchPackages(searchQuery);
        if (isActive) {
          setSearchResults(results || []);
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    const debounceTimeout = setTimeout(executeSearch, 300);

    return () => {
      isActive = false;
      clearTimeout(debounceTimeout);
    };
  }, [searchQuery, searchPackages]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isLoading,
  };
}
