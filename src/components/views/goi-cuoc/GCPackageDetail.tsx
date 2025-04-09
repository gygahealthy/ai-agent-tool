"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import StorageIcon from "@mui/icons-material/Storage";
import PhoneIcon from "@mui/icons-material/Phone";
import PhoneCallbackIcon from "@mui/icons-material/PhoneCallback";
import EmailIcon from "@mui/icons-material/Email";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import PublicIcon from "@mui/icons-material/Public";
import DiamondIcon from "@mui/icons-material/Diamond";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { usePackageFilter } from "@/components/providers/PackageFilterProvider";
import { RegisterModal } from "@/components/RegisterModal";
import { useState } from "react";
import { GCPackageCard } from "./GCPackageCard";
import { Separator } from "@/components/ui/seperator";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import Link from "next/link";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

interface GCPackageDetailProps {
  packageId: string;
  onRegister: () => void;
}

// Helper function to get icon color based on type
const getIconColor = (iconName: string) => {
  switch (iconName) {
    case "fa-database":
      return "text-indigo-500";
    case "fa-phone-alt":
      return "text-teal-500";
    case "fa-phone-incoming":
      return "text-emerald-500";
    case "fa-envelope":
      return "text-violet-500";
    case "fa-gem":
      return "text-rose-500";
    default:
      return "text-sky-500";
  }
};

// Helper function to get the appropriate icon based on FA icon name
const getIconComponent = (iconName: string) => {
  const colorClass = getIconColor(iconName);
  const baseClasses = "h-6 w-6 transition-all duration-300 group-hover:scale-110";
  const classes = `${baseClasses} ${colorClass}`;

  switch (iconName) {
    case "fa-database":
      return <DataUsageIcon className={classes} />;
    case "fa-phone-alt":
      return <PhoneIcon className={classes} />;
    case "fa-phone-incoming":
      return <PhoneCallbackIcon className={classes} />;
    case "fa-envelope":
      return <EmailIcon className={classes} />;
    case "fa-gem":
      return <DiamondIcon className={classes} />;
    default:
      return <StorageIcon className={classes} />;
  }
};

export function GCPackageDetail({ packageId, onRegister }: GCPackageDetailProps) {
  const { packages, getPackageById, isLoading } = usePackageFilter();
  const packageData = getPackageById(packageId);
  const basicPackage = packages.find((p) => p.ketnoiId === packageId);
  const [showModal, setShowModal] = useState(false);

  // Add these state and functions for scroll control
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth
    );
  };

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('package-scroll-container');
    if (container) {
      const scrollAmount = 400; // Adjust this value as needed
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Find related packages (same type or similar price range)
  const relatedPackages = packages
    .filter((p) => {
      if (p.ketnoiId === packageId) return false;
      if (!basicPackage) return false;
      return (
        p.type === basicPackage.type ||
        Math.abs(p.price - basicPackage.price) <= basicPackage.price * 0.2
      );
    })
    .slice(0, 6);

  // Get the background gradient based on whether package is hot
  const getBackgroundGradient = (isHot: boolean) => {
    return isHot 
      ? 'from-red-900 via-rose-900 to-orange-900'
      : 'from-indigo-600 via-blue-600 to-sky-500';
  };

  // Get the hero background color based on whether package is hot
  const getHeroBackground = (isHot: boolean) => {
    return isHot
      ? 'linear-gradient(rgba(180, 30, 30, 0.8), rgba(90, 30, 30, 0.8))'
      : 'linear-gradient(rgba(0, 100, 200, 0.8), rgba(0, 100, 200, 0.8))';
  };

  if (isLoading) {
    return (
      <div className="container py-4">
        <div className="animate-pulse">
          <div className="h-64 rounded-xl bg-gray-200 dark:bg-gray-800"></div>
          <div className="mt-4 h-8 w-1/2 rounded-lg bg-gray-200 dark:bg-gray-800"></div>
          <div className="mt-2 h-6 w-1/4 rounded-lg bg-gray-200 dark:bg-gray-800"></div>
        </div>
      </div>
    );
  }

  if (!packageData || !basicPackage) {
    return (
      <div className="container py-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Không tìm thấy gói cước</h1>
          <p className="mt-2">Gói cước bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Background */}
      <div 
        className="relative mb-8 bg-cover bg-center py-16"
        style={{
          backgroundImage: `${getHeroBackground(basicPackage.hot)}, url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070')`
        }}
      >
        <div className="container">
          {/* Breadcrumb with indicator for hot packages */}
          <div className="mb-6 flex items-center justify-between">
            <Breadcrumb
              items={[
                { label: "Trang chủ", href: "/" },
                { label: "Gói cước", href: "/goi-cuoc" },
                { label: basicPackage.name, href: `/goi-cuoc/${packageId}` },
              ]}
              className="text-white/80"
            />
            {basicPackage.hot && (
              <div className="flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <LocalFireDepartmentIcon className="h-10 w-10 animate-pulse text-amber-400" />
                <span className="text-lg font-bold text-white">Gói Hot</span>
              </div>
            )}
          </div>
          
          {/* Hero Content */}
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold text-white">{basicPackage.name}</h1>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-amber-300">
                {basicPackage.price.toLocaleString()}đ
              </span>
              <span className="text-lg text-amber-200/90">/{basicPackage.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container space-y-8 py-4">
        {/* Main Package Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`overflow-hidden rounded-2xl bg-gradient-to-br ${getBackgroundGradient(basicPackage.hot)} shadow-xl`}
        >
          <div className="backdrop-blur-sm">
            <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-2">
              {/* Left side - Image */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent" />
                <Image
                  src={packageData.imageUrl}
                  alt={basicPackage.name}
                  width={800}
                  height={600}
                  className="relative z-10 rounded-xl object-contain drop-shadow-2xl"
                  priority
                />
              </div>

              {/* Right side - Info */}
              <div className="flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-white">{basicPackage.name}</h1>
                    {/* <div className="mt-4 flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-amber-300">
                        {basicPackage.price.toLocaleString()}đ
                      </span>
                      <span className="text-lg text-amber-200/90">/{basicPackage.duration}</span>
                    </div> */}
                  </div>

                  {/* Main Features */}
                  <div className="space-y-4">
                    {packageData.detailInfo.map((info, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group flex items-start gap-4 rounded-xl bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                      >
                        <div className="rounded-lg bg-white p-2.5 shadow-lg ring-1 ring-white/30 transition-all duration-300 group-hover:shadow-lg group-hover:ring-white/50">
                          {getIconComponent(info.icon)}
                        </div>
                        <div className="flex-1 whitespace-pre-line text-white/90">{info.text}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Register Section */}
                <div className="mt-8 space-y-4">
                  {/* Price Display */}
                  <div className="flex items-center justify-between rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="text-white/80">Giá gói cước</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-amber-300">
                        {basicPackage.price.toLocaleString()}đ
                      </span>
                      <span className="text-lg text-amber-200/90">/{basicPackage.duration}</span>
                    </div>
                  </div>

                  {/* Register Button */}
                  <motion.div className="relative" whileHover="hover">
                    {/* Decorative gradient blur behind button */}
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-amber-300/50 via-amber-400/50 to-orange-400/50 blur-xl transition-all duration-300 group-hover:blur-2xl" />

                    <motion.button
                      onClick={onRegister}
                      className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 p-4 text-lg font-bold text-indigo-900 shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Inner gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />

                      {/* Button content */}
                      <div className="relative flex items-center justify-center gap-2">
                        <span className="tracking-wide">ĐĂNG KÝ NGAY</span>
                        <motion.span
                          variants={{
                            hover: {
                              x: [0, 4, 0],
                              transition: {
                                repeat: Infinity,
                                duration: 1,
                              },
                            },
                          }}
                        >
                          →
                        </motion.span>
                      </div>
                    </motion.button>
                  </motion.div>

                  {/* Additional Info */}
                  <div className="text-center text-sm text-white/60">
                    Đăng ký nhanh chóng · Kích hoạt tự động · Hỗ trợ 24/7
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Registration Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getBackgroundGradient(basicPackage.hot)} shadow-xl`}
        >
          {/* Network background */}
          {/* <NetworkBackground></NetworkBackground> */}

          {/* Content */}
          <div className="relative p-8">
            <div className="flex items-center gap-4 pb-6">
              <div className="rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
                <InfoOutlinedIcon className="h-6 w-6 text-white" />
              </div>
              <div className="w-full">
                <h2 className="text-2xl font-bold text-white">Điều kiện đăng ký</h2>
                <Separator className="my-2 h-0.5 bg-white/30 dark:bg-gray-700" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 grid gap-4 md:grid-cols-2"
            >
              {packageData?.registrationConditions
                ?.replace("Điều kiện áp dụng:\n", "")
                .split("\n")
                .filter(Boolean)
                .map((condition, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="group relative overflow-hidden rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                  >
                    <div className="absolute -right-6 -top-6 h-12 w-12 rounded-full bg-white/5" />
                    <div className="absolute -bottom-6 -left-6 h-12 w-12 rounded-full bg-white/5" />

                    <div className="relative flex gap-3">
                      <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-white/20">
                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      </div>
                      <p className="text-white/90">{condition}</p>
                    </div>
                  </motion.div>
                ))}
            </motion.div>

            {/* Bottom Note */}
            <div className="mt-6 text-center text-sm text-white/70">
              Vui lòng đọc kỹ điều kiện trước khi đăng ký gói cước
            </div>
          </div>
        </motion.div>

        {/* Related Packages Section */}
        {relatedPackages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl bg-gray-50 dark:bg-gray-800/50 shadow-lg overflow-hidden"
          >
            <div className="p-8">
              {/* Section Header */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                      Gói cước tương tự
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">
                      Các gói cước khác phù hợp với nhu cầu của bạn
                    </p>
                  </div>
                  
                  {/* Updated View All button */}
                  <Link 
                    href="/goi-cuoc" 
                    className="group relative inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500/25"
                  >
                    <span>Xem tất cả gói cước</span>
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    <div className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 opacity-0 blur transition-all duration-300 group-hover:opacity-30"></div>
                  </Link>
                </div>
                
                {/* Decorative line */}
                <div className="mt-4 flex items-center gap-4">
                  <div className="h-1 w-20 rounded-full bg-blue-600"></div>
                  <div className="h-1 w-10 rounded-full bg-blue-400"></div>
                  <div className="h-1 w-5 rounded-full bg-blue-300"></div>
                </div>
              </div>

              {/* Cards Grid with Navigation */}
              <div className="relative">
                {/* Scroll Buttons */}
                <div className="absolute left-0 top-1/2 z-10 -translate-y-1/2">
                  <button
                    onClick={() => scroll('left')}
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 ${
                      canScrollLeft 
                        ? 'text-gray-700 hover:bg-gray-50' 
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                    disabled={!canScrollLeft}
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="absolute right-0 top-1/2 z-10 -translate-y-1/2">
                  <button
                    onClick={() => scroll('right')}
                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 ${
                      canScrollRight 
                        ? 'text-gray-700 hover:bg-gray-50' 
                        : 'text-gray-300 cursor-not-allowed'
                    }`}
                    disabled={!canScrollRight}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </div>
                
                {/* Scrollable container */}
                <div 
                  id="package-scroll-container"
                  className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 pt-4"
                  onScroll={handleScroll}
                >
                  {relatedPackages.map((pkg) => (
                    <div 
                      key={pkg.ketnoiId} 
                      className="w-full min-w-[300px] max-w-sm flex-shrink-0 snap-start"
                      style={{ padding: '1px' }} // This prevents hover effect cropping
                    >
                      <GCPackageCard package={pkg} onRegister={onRegister} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <RegisterModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        affiliateUrl={packageData.affiliateUrl}
      />

      {/* Add this CSS to your global styles or as a styled component */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}
