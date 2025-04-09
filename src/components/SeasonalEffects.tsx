"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Particle = {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
};

export function SeasonalEffects() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [month] = useState(new Date().getMonth() + 1); // 1-12

  useEffect(() => {
    // Generate particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // Random x position (0-100%)
      delay: Math.random() * 2, // Random delay (0-2s)
      duration: 3 + Math.random() * 2, // Random duration (3-5s)
      size: 4 + Math.random() * 8, // Random size (4-12px)
    }));
    setParticles(newParticles);

    // Apply seasonal cursor to body
    const body = document.body;
    if (month === 1 || month === 2) {
      body.classList.add("cursor-tet");
    } else if (month >= 2 && month <= 4) {
      body.classList.add("cursor-spring");
    } else if (month >= 5 && month <= 7) {
      body.classList.add("cursor-summer");
    } else if (month >= 8 && month <= 10) {
      body.classList.add("cursor-autumn");
    } else {
      body.classList.add("cursor-winter");
    }

    // Cleanup function
    return () => {
      body.classList.remove(
        "cursor-tet",
        "cursor-spring",
        "cursor-summer",
        "cursor-autumn",
        "cursor-winter"
      );
    };
  }, [month]);

  // Spring season (February - April)
  const renderSpringEffects = () => (
    <>
      {/* Falling petals */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: "translateZ(0)",
            willChange: "transform",
          }}
          initial={{ top: "-5%", opacity: 0, rotate: 0 }}
          animate={{
            top: "105%",
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
            type: "tween",
          }}
        >
          <div className="h-full w-full rotate-45 transform rounded-full bg-pink-200/40" />
        </motion.div>
      ))}
    </>
  );

  // Tet/Lunar New Year effects (January - February)
  const renderTetEffects = () => (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: "translateZ(0)",
            willChange: "transform",
          }}
          initial={{ top: "-5%", opacity: 0 }}
          animate={{
            top: "105%",
            opacity: [0, 1, 1, 0],
            rotate: [-30, 30],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
            type: "tween",
          }}
        >
          <div className="h-full w-full rotate-45 transform bg-red-500/30" />
        </motion.div>
      ))}
      {/* Gold coins/elements */}
      {particles.slice(0, 5).map((particle) => (
        <motion.div
          key={`gold-${particle.id}`}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size * 1.5}px`,
            height: `${particle.size * 1.5}px`,
            transform: "translateZ(0)",
            willChange: "transform",
          }}
          initial={{ top: "-5%", opacity: 0 }}
          animate={{
            top: "105%",
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: particle.duration * 1.2,
            delay: particle.delay + 1,
            repeat: Infinity,
            ease: "linear",
            type: "tween",
          }}
        >
          <div className="h-full w-full rounded-full bg-yellow-400/30" />
        </motion.div>
      ))}
    </>
  );

  // Summer effects (May - July)
  const renderSummerEffects = () => (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            transform: "translateZ(0)",
            willChange: "transform",
          }}
          initial={{ top: "-5%", opacity: 0 }}
          animate={{
            top: "105%",
            opacity: [0, 0.3, 0.3, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
            type: "tween",
          }}
        >
          <div className="h-full w-full rounded-full bg-yellow-200/20 blur-sm" />
        </motion.div>
      ))}
    </>
  );

  // Autumn effects (August - October)
  const renderAutumnEffects = () => (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size * 1.5}px`,
            height: `${particle.size * 1.5}px`,
            transform: "translateZ(0)",
            willChange: "transform",
          }}
          initial={{ top: "-5%", opacity: 0, rotate: 0 }}
          animate={{
            top: "105%",
            opacity: [0, 1, 1, 0],
            rotate: 360,
          }}
          transition={{
            duration: particle.duration * 1.5,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
            type: "tween",
          }}
        >
          <div className="h-full w-full rotate-45 transform bg-orange-300/30" />
        </motion.div>
      ))}
    </>
  );

  // Winter effects (November - January)
  const renderWinterEffects = () => (
    <>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            width: `${particle.size / 2}px`,
            height: `${particle.size / 2}px`,
            transform: "translateZ(0)",
            willChange: "transform",
          }}
          initial={{ top: "-5%", opacity: 0 }}
          animate={{
            top: "105%",
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: particle.duration * 1.2,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
            type: "tween",
          }}
        >
          <div className="h-full w-full rounded-full bg-white blur-[1px]" />
        </motion.div>
      ))}
    </>
  );

  const getSeasonalEffect = () => {
    if (month === 1 || month === 2) return renderTetEffects(); // Tet/Lunar New Year
    if (month >= 2 && month <= 4) return renderSpringEffects(); // Spring
    if (month >= 5 && month <= 7) return renderSummerEffects(); // Summer
    if (month >= 8 && month <= 10) return renderAutumnEffects(); // Autumn
    return renderWinterEffects(); // Winter
  };

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {getSeasonalEffect()}
    </div>
  );
}
