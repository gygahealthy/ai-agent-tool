"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface NetworkBackgroundProps {
  className?: string;
  dotColor?: string;
  lineColor?: string;
  backgroundColor?: string;
}

export function NetworkBackground({
  className = "",
  dotColor = "rgba(191, 174, 151, 0.6)",
  lineColor = "rgba(191, 174, 151, 0.4)",
  backgroundColor = "#f9f1e7",
}: NetworkBackgroundProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dots, setDots] = useState<Array<{ x: number; y: number; radius: number }>>([]);

  // Generate dots based on container size
  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateDimensions = () => {
        const width = window.innerWidth;
        const height = 300; // Fixed height for container format

        setDimensions({ width, height });

        // Generate dots based on dimensions
        const dotCount = Math.floor(width / 50); // Responsive dot count
        const newDots = Array.from({ length: dotCount }).map(() => {
          const x = Math.random() * width;
          const y = Math.random() * height;
          const radius = Math.random() * 3 + 2; // Smaller radius for furniture theme
          return { x, y, radius };
        });

        setDots(newDots);
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);

      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }
  }, []);

  if (dimensions.width === 0) return null;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ backgroundColor, height: `${dimensions.height}px` }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-full w-full"
      >
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="furniture-glow">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="blur" />
              </feMerge>
            </filter>
          </defs>

          {dots.map((dot, index) => (
            <motion.circle
              key={index}
              cx={dot.x}
              cy={dot.y}
              r={dot.radius}
              fill={dotColor}
              filter="url(#furniture-glow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: index * 0.01 }}
            />
          ))}

          {dots.map((dot1, index1) =>
            dots.map((dot2, index2) => {
              if (index1 !== index2) {
                const distance = Math.sqrt((dot1.x - dot2.x) ** 2 + (dot1.y - dot2.y) ** 2);
                if (distance < 120) {
                  // Connect dots within distance
                  const opacity = 1 - distance / 120; // Fade lines by distance
                  return (
                    <motion.line
                      key={`${index1}-${index2}`}
                      x1={dot1.x}
                      y1={dot1.y}
                      x2={dot2.x}
                      y2={dot2.y}
                      stroke={lineColor}
                      strokeWidth={0.5}
                      strokeOpacity={opacity}
                      initial={{ strokeOpacity: 0 }}
                      animate={{ strokeOpacity: opacity }}
                      transition={{ duration: 1.5, delay: Math.min(index1, index2) * 0.02 }}
                    />
                  );
                }
              }
              return null;
            })
          )}
        </svg>
      </motion.div>
    </div>
  );
}
