// Shared worker instances
let packageWorker: Worker | null = null;
let detailsWorker: Worker | null = null;

// Initialize main package worker
function initializePackageWorker() {
  if (packageWorker) return packageWorker;

  try {
    packageWorker = new Worker(new URL("../workers/webPackageWorker.ts", import.meta.url));
    packageWorker.postMessage({ type: "CHECK_UPDATES" });
    return packageWorker;
  } catch (error) {
    console.error("Failed to initialize package worker:", error);
    return null;
  }
}

// Initialize package details worker
function initializeDetailsWorker() {
  if (detailsWorker) return detailsWorker;

  try {
    detailsWorker = new Worker(new URL("../workers/webPkgDetailWorker.ts", import.meta.url));
    detailsWorker.postMessage({ type: "CHECK_UPDATES" });
    return detailsWorker;
  } catch (error) {
    console.error("Failed to initialize package details worker:", error);
    return null;
  }
}

// Initialize all workers
export function initializeWorkers() {
  if (typeof window === "undefined") return;

  initializePackageWorker();
  initializeDetailsWorker();
}

// Get shared worker instances
export function getPackageWorker() {
  return packageWorker;
}

export function getDetailsWorker() {
  return detailsWorker;
}
