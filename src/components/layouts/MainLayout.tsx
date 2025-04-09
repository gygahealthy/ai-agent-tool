"use client";

// Remove this if you added it
// import { ParticlesBackground } from "@/components/effects/ParticlesBackground";
import { SiteFooter } from "@/components/layouts/common/SiteFooter";
import { SiteHeader } from "@/components/layouts/common/SiteHeader";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
// Re-add imports if removed
import { RouteTransitionManager } from "@/components/transitions/RouteTransitionManager";
import { NavigationProgress, PageTransitionIndicator } from "@/components/ui/NavigationProgress";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
// Add Script component from next/script
import { usePathname } from "next/navigation";
import Script from "next/script";
import { ReactNode } from "react";
import { ErrorBoundary } from "../ErrorBoundary";

type MainLayoutProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

export function MainLayout({
  children,
  title = "AI Hub - Perfecting Your Visual with AI",
  description = "Create stunning images quickly and easily with cutting-edge AI algorithms.",
}: MainLayoutProps) {
  const pathname = usePathname();

  return (
    <LoadingProvider>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <link rel="icon" href="/images/favicon.ico" />
        <html lang="en" />
      </Head>
      {/* Add the particles.js script */}
      <Script
        src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"
        strategy="beforeInteractive"
      />
      <ErrorBoundary>
        {/* Remove bg-gray-900 */}
        <div className="flex min-h-screen flex-col text-white">
          <NavigationProgress />
          <SiteHeader />
          {/* Remove direct ParticlesBackground */}
          {/* Restore children rendering */}
          <AnimatePresence mode="wait">
            <RouteTransitionManager key={pathname}>
              <main className="flex-1">{children}</main>
            </RouteTransitionManager>
          </AnimatePresence>

          <SiteFooter />
          <ScrollToTop />
          <PageTransitionIndicator />
        </div>
      </ErrorBoundary>
    </LoadingProvider>
  );
}
