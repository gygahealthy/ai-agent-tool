"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

// Removed imports: Button, ProductCard, ChevronRightIcon, Link, useEffect, useState

// Updated with real Unsplash AI-related image URLs with height/width dimensions
const popularProductImages = [
  {
    src: "https://images.unsplash.com/photo-1685094807199-2140265a039a?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    alt: "AI Brain Network Visualization",
  },
  {
    src: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    alt: "Gothic Interior with Stained Glass",
  },
  {
    src: "https://images.unsplash.com/photo-1664194079527-4a58d5e89985?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    alt: "AI Generated Portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1644858848363-35d5649caf8c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    alt: "Digital Eye Close-up",
  },
  {
    src: "https://images.unsplash.com/photo-1674078119895-a448286188b7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=800",
    alt: "Futuristic Mountain Tower",
  },
];

// Renamed component function
export default function PopularProductsSection() {
  const productParticleId = "product-particles-js"; // Unique ID for product section particles

  // Initialize particles.js with a unique ID for the product section
  useEffect(() => {
    // Check if the particlesJS function is loaded
    if (typeof window !== "undefined" && window.particlesJS) {
      console.log("Initializing product section particles...");
      window.particlesJS(productParticleId, {
        particles: {
          number: {
            value: 40, // Fewer particles for the bottom section
            density: { enable: true, value_area: 800 },
          },
          color: { value: "#4d7cff" }, // Blue-tinted particles
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
          },
          opacity: {
            value: 0.4,
            random: true,
          },
          size: {
            value: 2.5,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#4d7cff", // Blue-tinted lines
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "bottom", // Move slightly upward
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "bubble" },
            onclick: { enable: false },
          },
          modes: {
            bubble: { distance: 150, size: 5, duration: 2, opacity: 0.8 },
          },
        },
        retina_detect: true,
      });
    } else {
      console.warn("particles.js script not loaded yet for product section.");
    }

    // Cleanup function
    return () => {
      const particlesDiv = document.getElementById(productParticleId);
      if (
        particlesDiv &&
        particlesDiv.firstChild &&
        particlesDiv.firstChild instanceof HTMLCanvasElement
      ) {
        particlesDiv.removeChild(particlesDiv.firstChild);
      }
    };
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-visible bg-[#13161C] py-20 text-white">
      {/* Right glow - positioned to be half in feature and half in product section */}
      <div className="pointer-events-none absolute -right-[32rem] top-[-50vh] z-0 h-[1000px] w-[1000px] rounded-full bg-purple-500/10 opacity-40 blur-[100px]"></div>

      {/* Particle Background at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-0 h-1/3 opacity-40">
        <div
          id={productParticleId}
          className="absolute h-full w-full"
          style={{ background: "#13161C" }}
        ></div>
      </div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          {/* Tag */}
          <span className="mb-4 inline-block rounded-full border border-gray-600 bg-gray-800/50 px-4 py-1 text-xs font-medium text-gray-300 backdrop-blur-sm">
            potent software
          </span>
          {/* Title */}
          <h2 className="mb-6 text-5xl font-bold md:text-6xl">
            Most Popular
            <br />
            Products
          </h2>
          {/* Description */}
          <p className="max-w-2xl text-base text-gray-400 md:text-lg">
            Browse our most popular products today and start creating images that stand out and
            captivate your audience like never before.
          </p>
        </motion.div>

        {/* Image Grid - Simplified and fixed layout */}
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:grid-rows-2 lg:gap-6">
            {/* First two images in first row */}
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
              <Image
                src={popularProductImages[0].src}
                alt={popularProductImages[0].alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
              <Image
                src={popularProductImages[1].src}
                alt={popularProductImages[1].alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Tall image spanning two rows */}
            <div className="relative row-span-2 aspect-[3/4] overflow-hidden rounded-lg shadow-lg sm:aspect-auto md:row-span-2">
              <Image
                src={popularProductImages[4].src}
                alt={popularProductImages[4].alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Second row, first two images */}
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
              <Image
                src={popularProductImages[2].src}
                alt={popularProductImages[2].alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
              <Image
                src={popularProductImages[3].src}
                alt={popularProductImages[3].alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
