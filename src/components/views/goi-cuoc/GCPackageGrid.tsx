"use client";

import { useState, useMemo, memo, useCallback, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { GCPackageCard } from "./GCPackageCard";
import { GCPackageListCard } from "./GCPackageListCard";
import type { Package } from "@/types/package";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Card } from "@/components/ui/card";

interface GCPackageGridProps {
  packages: Package[];
  onRegister: (pkg: Package) => void;
}

const PackageCard = memo(function PackageCard({
  pkg,
  isGridView,
  onRegister,
}: {
  pkg: Package;
  isGridView: boolean;
  onRegister: (pkg: Package) => void;
}) {
  return (
    <div className="relative h-full transform-gpu">
      <Card className="h-full border-0 bg-transparent shadow-none">
        <div
          className={`transition-[visibility,opacity] duration-200 ${
            isGridView ? "visible opacity-100" : "invisible h-0 opacity-0"
          }`}
        >
          <GCPackageCard package={pkg} onRegister={onRegister} />
        </div>
        <div
          className={`transition-[visibility,opacity] duration-200 ${
            !isGridView ? "visible opacity-100" : "invisible h-0 opacity-0"
          }`}
        >
          <GCPackageListCard pkg={pkg} onRegister={onRegister} />
        </div>
      </Card>
    </div>
  );
});

const ViewToggle = memo(function ViewToggle({
  isGridView,
  onToggle,
}: {
  isGridView: boolean;
  onToggle: (isGrid: boolean) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggle(true)}
        className={`px-3 ${
          isGridView
            ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200"
            : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50"
        }`}
      >
        <GridViewIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onToggle(false)}
        className={`px-3 ${
          !isGridView
            ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200"
            : "text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800/50"
        }`}
      >
        <ViewListIcon className="h-4 w-4" />
      </Button>
    </div>
  );
});

export function GCPackageGrid({ packages, onRegister }: GCPackageGridProps) {
  const [isGridView, setIsGridView] = useState(true);

  const handleViewToggle = useCallback(
    (isGrid: boolean) => {
      if (isGrid === isGridView) return;
      requestAnimationFrame(() => {
        setIsGridView(isGrid);
      });
    },
    [isGridView]
  );

  const containerClassName = useMemo(
    () =>
      isGridView
        ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        : "grid grid-cols-1 gap-4",
    [isGridView]
  );

  return (
    <div className="container mx-auto space-y-6 p-4">
      <div className="flex justify-end">
        <ViewToggle isGridView={isGridView} onToggle={handleViewToggle} />
      </div>

      <div
        className={`content-visibility-auto will-change-auto contain-layout ${containerClassName}`}
      >
        <Suspense fallback={null}>
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} isGridView={isGridView} onRegister={onRegister} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}
