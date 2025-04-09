"use client";

import { MainLayout } from "@/components/layouts/MainLayout";
import {
  PackageFilterProvider,
  usePackageFilter,
} from "@/components/providers/PackageFilterProvider";
import { GCPackageCard } from "@/components/views/goi-cuoc/GCPackageCard";
import { GCPackageListCard } from "@/components/views/goi-cuoc/GCPackageListCard";
import { GCPackageFilters } from "@/components/views/goi-cuoc/GCPackageFilters";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useState, useMemo } from "react";
import { Package } from "@/types/package";
import { RegisterModal } from "@/components/RegisterModal";
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { SortAscIcon, SortDescIcon } from "@/components/ui/icons";

// Dynamically import MUI icons with SSR disabled
const GridViewIcon = dynamic(
  () => import('@mui/icons-material/GridView'),
  { ssr: false }
);

const ViewListIcon = dynamic(
  () => import('@mui/icons-material/ViewList'),
  { ssr: false }
);

type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";

function PackageContent() {
  const { filteredPackages, isLoading } = usePackageFilter();
  const [isGridView, setIsGridView] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("price-asc");

  const handleRegister = (pkg: Package) => {
    setSelectedPackage(pkg);
  };

  const sortedPackages = useMemo(() => {
    const sortedPkgs = [...filteredPackages];
    
    switch (sortOption) {
      case "price-asc":
        return sortedPkgs.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sortedPkgs.sort((a, b) => b.price - a.price);
      case "name-asc":
        return sortedPkgs.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sortedPkgs.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sortedPkgs;
    }
  }, [filteredPackages, sortOption]);

  return (
    <>
      {/* Hero Section with Background */}
      <div 
        className="relative mb-8 bg-cover bg-center py-16"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 100, 200, 0.8), rgba(0, 100, 200, 0.8)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070')`
        }}
      >
        <div className="container">
          {/* Breadcrumb with white text */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/" },
                { label: "Gói cước", href: "/goi-cuoc" },
              ]}
              className="text-white/80"
            />
          </div>
          
          {/* Hero Content */}
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold text-white">Gói Cước MobiFone</h1>
            <p className="text-lg text-white/90">
              Khám phá các gói cước đa dạng với ưu đãi hấp dẫn, đáp ứng mọi nhu cầu sử dụng của bạn
            </p>
          </div>
        </div>
      </div>

      {/* Rest of the content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container py-4"
      >
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <GCPackageFilters />
          </div>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Gói cước</h1>
              <div className="flex items-center gap-4">
                <div className="w-[180px]">
                  <Select 
                    defaultValue="price-asc"
                    onValueChange={(value: SortOption) => setSortOption(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sắp xếp theo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="price-asc" className="flex w-full items-center gap-2">
                        <SortAscIcon />
                        Giá tăng dần
                      </SelectItem>
                      <SelectItem value="price-desc" className="flex w-full items-center gap-2">
                        <SortDescIcon />
                        Giá giảm dần
                      </SelectItem>
                      <SelectItem value="name-asc" className="flex w-full items-center gap-2">
                        <SortAscIcon />
                        Tên A-Z
                      </SelectItem>
                      <SelectItem value="name-desc" className="flex w-full items-center gap-2">
                        <SortDescIcon />
                        Tên Z-A
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsGridView(true)}
                    className={`rounded-lg p-2 ${
                      isGridView ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {GridViewIcon && <GridViewIcon className="h-5 w-5" />}
                  </button>
                  <button
                    onClick={() => setIsGridView(false)}
                    className={`rounded-lg p-2 ${
                      !isGridView ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {ViewListIcon && <ViewListIcon className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-[300px] animate-pulse rounded-lg bg-gray-100 dark:bg-gray-800"
                  />
                ))}
              </div>
            ) : (
              <div
                className={
                  isGridView
                    ? "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-4"
                }
              >
                {sortedPackages.map((pkg) =>
                  isGridView ? (
                    <GCPackageCard key={pkg.ketnoiId} package={pkg} onRegister={handleRegister} />
                  ) : (
                    <GCPackageListCard key={pkg.ketnoiId} pkg={pkg} onRegister={handleRegister} />
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <RegisterModal
        isOpen={!!selectedPackage}
        onClose={() => setSelectedPackage(null)}
        affiliateUrl={selectedPackage?.affiliateUrl || ""}
      />
    </>
  );
}

export default function PackagesPage() {
  return (
    <PackageFilterProvider>
      <MainLayout
        title="Gói cước - MobiFone"
        description="Danh sách gói cước MobiFone với nhiều ưu đãi hấp dẫn."
      >
        <PackageContent />
      </MainLayout>
    </PackageFilterProvider>
  );
}
