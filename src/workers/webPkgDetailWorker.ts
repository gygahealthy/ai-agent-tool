import { IndexedDBSyncService } from "@/services/IndexedDBSyncService";
import packageDetailsData from "@/data/ketnoi_package_details.json";

//=============================================================================
// Package Details Management
//=============================================================================

async function fetchPackageDetails(): Promise<any[]> {
  try {
    self.postMessage({ type: "LOADING_START" });

    const dbService = IndexedDBSyncService.getInstance();

    try {
      const cachedDetails = await dbService.getPackageDetails();
      if (cachedDetails.length > 0) {
        return cachedDetails;
      }
    } catch (error) {
      console.warn("Failed to get from IndexedDB, falling back to JSON:", error);
    }

    const details = packageDetailsData.data;

    try {
      await dbService.savePackageDetails(details);
    } catch (error) {
      console.warn("Failed to cache in IndexedDB:", error);
    }

    return details;
  } catch (error) {
    throw error;
  }
}

//=============================================================================
// Worker Event Handlers
//=============================================================================

self.onmessage = async (event) => {
  const { type } = event.data;

  if (type === "CHECK_UPDATES" || type === "FORCE_UPDATE") {
    try {
      const details = await fetchPackageDetails();
      self.postMessage({
        type: "UPDATE_SUCCESS",
        details,
      });
    } catch (error) {
      console.error("[Package Details Worker] Error:", error);
      self.postMessage({
        type: "ERROR",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  }
};
