"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Package, PackageDetail } from "@/types/package";
import { useIndexedDBSync } from "@/services/IndexedDBSyncService";

interface PackageFilterContextType {
  packages: Package[];
  filteredPackages: Package[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  selectedDataVolumes: string[];
  setSelectedDataVolumes: (volumes: string[]) => void;
  selectedPackageTypes: string[];
  setSelectedPackageTypes: Dispatch<SetStateAction<string[]>>;
  isLoading: boolean;
  getPackageById: (id: string) => PackageDetail | undefined;
}

const PackageFilterContext = createContext<PackageFilterContextType | undefined>(undefined);

export function PackageFilterProvider({ children }: { children: ReactNode }) {
  const [packages, setPackages] = useState<Package[]>([]);
  const [packageDetails, setPackageDetails] = useState<PackageDetail[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const dbSync = useIndexedDBSync();

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDataVolumes, setSelectedDataVolumes] = useState<string[]>([]);
  const [selectedPackageTypes, setSelectedPackageTypes] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      let retries = 0;
      const maxRetries = 5;

      const tryLoadData = async () => {
        try {
          await dbSync.checkAndSync();
          const [rawPackages, rawDetails] = await Promise.all([
            dbSync.getPackages(),
            dbSync.getPackageDetails(),
          ]);

          const activePackages = rawPackages
            .filter((pkg) => pkg.status === 1)
            .map((pkg) => ({
              ...pkg,
              hot: pkg.tags?.includes("Gói Hot") || false,
              displayOrder: pkg.displayOrder || 0,
              lastUpdated: Date.now(),
            }));

          setPackages(activePackages);
          setPackageDetails(rawDetails);
          setFilteredPackages(activePackages);
          setIsLoading(false);
        } catch (error) {
          if (retries < maxRetries) {
            retries++;
            console.log(`Failed to load data, retrying... (${retries}/${maxRetries})`);
            setTimeout(tryLoadData, 1000);
          } else {
            console.error("Failed to load data after maximum retries:", error);
            setIsLoading(false);
          }
        }
      };

      tryLoadData();
    };

    loadData();
  }, []);

  // Apply filters
  useEffect(() => {
    if (!packages.length) return;

    let filtered = [...packages];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered.filter((pkg) => pkg.price >= priceRange[0] && pkg.price <= priceRange[1]);

    // Apply tags filter
    if (selectedTags.length) {
      filtered = filtered.filter((pkg) => selectedTags.some((tag) => pkg.tags.includes(tag)));
    }

    // Apply data volume filter
    if (selectedDataVolumes.length) {
      filtered = filtered.filter((pkg) => selectedDataVolumes.includes(pkg.dataVolume));
    }

    // Apply package type filter
    if (selectedPackageTypes.length) {
      filtered = filtered.filter((pkg) => selectedPackageTypes.includes(pkg.type));
    }

    setFilteredPackages(filtered);
  }, [searchQuery, priceRange, selectedTags, selectedDataVolumes, selectedPackageTypes, packages]);

  const getPackageById = (id: string) => {
    return packageDetails.find((pkg) => pkg.ketnoiId === id);
  };

  return (
    <PackageFilterContext.Provider
      value={{
        packages,
        filteredPackages,
        searchQuery,
        setSearchQuery,
        priceRange,
        setPriceRange,
        selectedTags,
        setSelectedTags,
        selectedDataVolumes,
        setSelectedDataVolumes,
        selectedPackageTypes,
        setSelectedPackageTypes,
        isLoading,
        getPackageById,
      }}
    >
      {children}
    </PackageFilterContext.Provider>
  );
}

export function usePackageFilter() {
  const context = useContext(PackageFilterContext);
  if (context === undefined) {
    throw new Error("usePackageFilter must be used within a PackageFilterProvider");
  }
  return context;
}
