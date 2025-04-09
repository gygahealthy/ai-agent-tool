"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Start progress when navigation starts
    setIsNavigating(true);
    setProgress(0);

    const animateProgress = () => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + (90 - prev) * 0.1;
      });
    };

    // Simulate progress
    timer = setInterval(animateProgress, 100);

    // Complete progress when navigation ends
    const completeProgress = () => {
      setProgress(100);
      setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 200);
    };

    completeProgress();

    return () => {
      clearInterval(timer);
    };
  }, [pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          className="fixed left-0 right-0 top-0 z-[9999] h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          exit={{ opacity: 0 }}
          transition={{ ease: "easeInOut" }}
          style={{ transformOrigin: "0%" }}
        />
      )}
    </AnimatePresence>
  );
}

// Loading dots animation
export function LoadingDots() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-blue-600"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.4,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

// Page transition indicator
export function PageTransitionIndicator() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setShow(true);
    const timer = setTimeout(() => setShow(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 transform rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-lg dark:bg-gray-100 dark:text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="flex items-center gap-2">
            <LoadingDots />
            <span>Đang chuyển trang</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
