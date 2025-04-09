//=============================================================================
// Package Worker Implementation
//=============================================================================
import type { Package } from "@/types/package";
import { IndexedDBSyncService } from "@/services/IndexedDBSyncService";
import packageData from "@/data/ketnoi_packages.json";

//=============================================================================
// Package Management
//=============================================================================

// Helper function to map JSON data to Package type
function mapFirestoreToPackage(pkg: any): Package {
  return {
    id: pkg.ketnoiId,
    name: pkg.name,
    price: Number(pkg.price),
    type: pkg.type,
    duration: pkg.duration,
    description: pkg.description,
    dataVolume: pkg.dataVolume || "",
    commission: pkg.commission,
    affiliateUrl: pkg.affiliateUrl,
    affiliateLink: pkg.affiliateUrl,
    qrCodeLink: "",
    ketnoiUrl: `https://ketnoi.mobifone.vn/en/singlemoblie?id=${pkg.ketnoiId}`,
    ketnoiId: pkg.ketnoiId,
    clickId: pkg.affiliateUrl.split("click_id=")[1]?.split("&")[0] || "",
    affNetwork: "MBF",
    status: pkg.status,
    tags: pkg.tags || [],
    hot: pkg.tags?.includes("Gói Hot") || false,
    lastUpdated: Date.now(),
    displayOrder: pkg.displayOrder || 0,
  };
}

// Function to fetch packages from local JSON
async function fetchPackages(): Promise<Package[]> {
  try {
    self.postMessage({ type: "LOADING_START" });

    const dbService = IndexedDBSyncService.getInstance();
    await dbService.checkAndSyncMetadata();

    try {
      const cachedPackages = await dbService.getPackages();
      if (cachedPackages.length > 0) {
        return cachedPackages;
      }
    } catch (error) {
      console.warn("Failed to get from IndexedDB, falling back to JSON:", error);
    }

    // If no cached data, load from JSON
    const packages = packageData.filter((pkg) => pkg.status === 1).map(mapFirestoreToPackage);

    // Cache in IndexedDB for future use
    try {
      await dbService.savePackages(packages);
    } catch (error) {
      console.warn("Failed to cache in IndexedDB:", error);
    }

    return packages;
  } catch (error) {
    throw error;
  }
}

// Function to get homepage packages by categories with caching
let cachedHomepagePackages: Package[] | null = null;

function getHomepagePackagesFromMain(packages: Package[]): Package[] {
  if (cachedHomepagePackages) {
    return cachedHomepagePackages;
  }

  const categories = Array.from(new Set(packages.flatMap((pkg) => pkg.tags)));
  const seenIds = new Set<string>();

  const allPackages = categories.flatMap((category) => {
    const categoryPackages = packages
      .filter((pkg) => pkg.tags.includes(category) && !seenIds.has(pkg.id))
      .sort((a, b) => (b.displayOrder || 0) - (a.displayOrder || 0))
      .slice(0, 6);

    categoryPackages.forEach((pkg) => seenIds.add(pkg.id));
    return categoryPackages;
  });

  // Cache the result
  cachedHomepagePackages = allPackages;
  return allPackages;
}

// Main worker logic
self.onmessage = async (event) => {
  const { type } = event.data;

  if (type === "CHECK_UPDATES" || type === "FORCE_UPDATE") {
    try {
      const packages = await fetchPackages();
      const homepagePackages = getHomepagePackagesFromMain(packages);

      // Save homepage packages to IndexedDB
      try {
        const dbService = IndexedDBSyncService.getInstance();
        await dbService.saveHomepagePackages(homepagePackages);
      } catch (error) {
        console.warn("Failed to cache homepage packages:", error);
      }

      self.postMessage({
        type: "UPDATE_SUCCESS",
        packages,
        homepage_packages: homepagePackages,
      });
    } catch (error) {
      console.error("[Package Worker] Error:", error);
      self.postMessage({
        type: "ERROR",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }
};
