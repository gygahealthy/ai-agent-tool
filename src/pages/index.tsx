import { MainLayout } from "@/components/layouts/MainLayout";
import BlogSection from "@/components/views/home/BlogSection";
import { FeatureSection } from "@/components/views/home/FeatureSection";
import { HeroSection } from "@/components/views/home/HeroSection";
import { MarqueeBanner } from "@/components/views/home/MarqueeBanner";
import PopularProductSection from "@/components/views/home/PopularProductSection";
import { TestimonialSection } from "@/components/views/home/TestimonialSection";

// Add this inside your layout/page component
export default function HomePage() {
  return (
    <>
      {/* {process.env.NODE_ENV === 'development' && <PackageDebug />} */}

      <MainLayout
        title="Đăng ký Data | Trang chủ"
        description="Đăng ký 4G | 5G di động nhanh chóng, tiện lợi với nhiều ưu đãi hấp dẫn. Khám phá các gói cước data chất lượng cao."
      >
        <main>
          <HeroSection />
          <FeatureSection />
          <MarqueeBanner />
          <PopularProductSection />
          <TestimonialSection />
          <BlogSection />
        </main>
      </MainLayout>
    </>
  );
}
