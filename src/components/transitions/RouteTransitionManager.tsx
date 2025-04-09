"use client";

import { motion, LazyMotion, domAnimation } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type TransitionVariant = {
  initial: any;
  animate: any;
  exit: any;
};

const defaultTransition = {
  type: "tween",
  duration: 0.2,
};

const transitions: Record<string, TransitionVariant> = {
  // Simplified transitions for better performance
  "/": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "/goi-cuoc": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "/ho-tro": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "/tin-tuc": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
};

export function RouteTransitionManager({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Only enable animations if the user hasn't opted for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShouldAnimate(!prefersReducedMotion);
  }, []);

  // Get the transition for the current route, or use default fade transition
  const currentTransition = pathname ? transitions[pathname] : transitions["/"];

  if (!shouldAnimate) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation}>
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={currentTransition}
        transition={defaultTransition}
        className="w-full"
      >
        {children}
      </motion.div>
    </LazyMotion>
  );
}

// Progress bar for route changes
export function RouteProgressBar() {
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-blue-600"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
      transition={{ duration: 0.5 }}
    />
  );
}

// Page loading overlay
export function PageLoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-900/80"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="h-16 w-16 rounded-full border-4 border-blue-600 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-medium text-gray-600 dark:text-gray-300"
        >
          Đang chuyển trang...
        </motion.p>
      </div>
    </motion.div>
  );
}

// Shared animation variants
export const sharedPageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const sharedTransition = {
  type: "spring",
  damping: 20,
  stiffness: 100,
};
