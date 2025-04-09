"use client";

import { MainLayout } from "@/components/layouts/MainLayout";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { useRouter } from "next/router";
import { GCPackageDetail } from "@/components/views/goi-cuoc/GCPackageDetail";
import {
  PackageFilterProvider,
  usePackageFilter,
} from "@/components/providers/PackageFilterProvider";
import { useState } from "react";
import { RegisterModal } from "@/components/RegisterModal";

function PackageDetailContent() {
  const router = useRouter();
  const { id } = router.query;
  const { packages, getPackageById } = usePackageFilter();
  const packageData = getPackageById(id as string);
  const basicPackage = packages.find((p) => p.ketnoiId === id);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="container py-4">
        <Breadcrumb
          items={[
            { label: "Trang chủ", href: "/" },
            { label: "Gói cước", href: "/goi-cuoc" },
            { label: basicPackage?.name || "Chi tiết gói cước", href: "#" },
          ]}
        />
      </div>
      <GCPackageDetail packageId={id as string} onRegister={() => setShowModal(true)} />

      {packageData && (
        <RegisterModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          affiliateUrl={packageData.affiliateUrl}
        />
      )}
    </>
  );
}

export default function PackageDetailPage() {
  return (
    <PackageFilterProvider>
      <MainLayout
        title="Chi tiết gói cước - MobiFone"
        description="Chi tiết gói cước MobiFone với nhiều ưu đãi hấp dẫn."
      >
        <PackageDetailContent />
      </MainLayout>
    </PackageFilterProvider>
  );
}
