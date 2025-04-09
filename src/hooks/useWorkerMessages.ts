import { useEffect, useState } from "react";
import type { Package } from "@/types/package";

interface UseWorkerMessagesProps {
  worker: Worker | null;
  onMessage?: (data: any) => void;
}

interface UseWorkerMessagesReturn {
  packages: Package[];
  homepagePackages: Package[];
  loading: boolean;
  error: string | null;
  lastCheck: number | null;
  forceUpdate: () => void;
}

export function useWorkerMessages({
  worker,
  onMessage,
}: UseWorkerMessagesProps): UseWorkerMessagesReturn {
  const [packages, setPackages] = useState<Package[]>([]);
  const [homepagePackages, setHomepagePackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastCheck, setLastCheck] = useState<number | null>(null);

  useEffect(() => {
    if (!worker) {
      setError("Worker not available");
      setLoading(false);
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      const {
        type,
        packages: newPackages,
        homepage_packages: newHomepagePackages,
        error: workerError,
      } = event.data;

      switch (type) {
        case "LOADING_START":
          setLoading(true);
          break;

        case "UPDATE_SUCCESS":
          setPackages(newPackages || []);
          if (newHomepagePackages) setHomepagePackages(newHomepagePackages);
          setLoading(false);
          setError(null);
          setLastCheck(Date.now());
          break;

        case "ERROR":
          setError(workerError);
          setLoading(false);
          break;
      }

      onMessage?.(event.data);
    };

    worker.addEventListener("message", handleMessage);
    worker.postMessage({ type: "CHECK_UPDATES" });

    return () => {
      worker.removeEventListener("message", handleMessage);
    };
  }, [worker, onMessage]);

  const forceUpdate = () => {
    if (worker) {
      setLoading(true);
      worker.postMessage({ type: "FORCE_UPDATE" });
    }
  };

  return {
    packages,
    homepagePackages,
    loading,
    error,
    lastCheck,
    forceUpdate,
  };
}
