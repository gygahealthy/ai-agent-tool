"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

// Updated and verified AI-related Unsplash image URLs
const allImages = [
  "https://images.unsplash.com/photo-1677759946174-3a0d4937a5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // AI face wires
  "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1032&q=80", // Circuit board closeup
  "https://images.unsplash.com/photo-1684493735679-b5983e1e3b39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80", // Abstract sphere grid
  "https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1632&q=80", // Blue tech abstract
  "https://images.unsplash.com/photo-1680687688158-e9c1c56941ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80", // Futuristic glowing lines
  "https://images.unsplash.com/photo-1675553426688-de9fef845300?ixlib=rb-4.0.3&auto=format&fit=crop&w=1474&q=80", // Abstract color flow
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80", // Colorful VR/tech
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1635&q=80", // Geometric AI pattern
  "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80", // AI/Code concept
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&auto=format&fit=crop&w=1528&q=80", // Robot hand touch
];

// Split images into two columns
const column1Images = allImages.filter((_, index) => index % 2 === 0);
const column2Images = allImages.filter((_, index) => index % 2 !== 0);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroParticleId = "hero-particles-js"; // Unique ID for hero section particles

  // Initialize particles.js with a unique ID for the hero section
  useEffect(() => {
    // Check if the particlesJS function is loaded
    if (typeof window !== "undefined" && window.particlesJS) {
      console.log("Initializing hero section particles...");
      window.particlesJS(heroParticleId, {
        particles: {
          number: {
            value: 80,
            density: { enable: true, value_area: 800 },
          },
          color: { value: "#00ffcc" }, // Teal color to match the hero theme
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
          },
          opacity: {
            value: 0.5,
            random: false,
          },
          size: {
            value: 3,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#00ffcc", // Teal lines
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            bounce: false,
          },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
          },
        },
        retina_detect: true,
      });
    } else {
      console.warn("particles.js script not loaded yet for hero section.");
    }

    // Cleanup function
    return () => {
      const particlesDiv = document.getElementById(heroParticleId);
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
    <section ref={sectionRef} className="relative min-h-screen overflow-visible text-white">
      {/* Custom particle background for hero section */}
      <div className="absolute inset-0 z-0">
        <div
          id={heroParticleId}
          className="absolute h-full w-full"
          style={{ background: "#13161C" }}
        ></div>
      </div>

      <div className="container relative z-10 mx-auto grid min-h-screen grid-cols-1 items-center px-4 md:grid-cols-3">
        <div className="col-span-1 flex flex-col items-start justify-center py-16 md:col-span-2 md:py-0">
          <div className="mb-4 inline-block rounded-full bg-gray-700/50 px-4 py-1 text-xs font-medium text-teal-300 backdrop-blur-sm">
            digital engagement
          </div>
          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
            Perfecting
            <br />
            Your Visual
            <br />
            with AI ✨
          </h1>
          <p className="mb-8 max-w-lg text-lg text-gray-300">
            Create stunning images quickly and easily with cutting-edge AI algorithms.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button
              size="lg"
              className="rounded-full bg-teal-500 px-8 py-3 text-base font-semibold text-gray-900 transition hover:bg-teal-400"
            >
              Get Started
            </Button>
            <Link href="/community">
              <Button
                variant="link"
                size="lg"
                className="group rounded-full px-8 py-3 text-base font-semibold text-white hover:text-gray-300"
              >
                Join Community{" "}
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden md:col-span-1 md:block"></div>
      </div>

      <div className="absolute bottom-0 right-0 top-0 z-10 hidden h-[130vh] w-1/4 md:block">
        <div className="flex h-full gap-4 overflow-hidden p-4">
          <div className="flex flex-1 flex-col gap-4">
            <div className="animate-scroll-up flex flex-col gap-4">
              {[...column1Images, ...column1Images].map((src, index) => (
                <div
                  key={`col1-loop-${index}`}
                  className="relative aspect-square w-full flex-shrink-0 overflow-hidden rounded-lg bg-gray-800/50 backdrop-blur-sm"
                >
                  <Image
                    src={src}
                    alt={`AI Generated Image Col 1 ${(index % column1Images.length) + 1}`}
                    fill
                    sizes="(max-width: 1024px) 12.5vw, 8vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    priority={index < 2}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-4">
            <div className="animate-scroll-down flex flex-col gap-4">
              {[...column2Images, ...column2Images].map((src, index) => (
                <div
                  key={`col2-loop-${index}`}
                  className="relative aspect-square w-full flex-shrink-0 overflow-hidden rounded-lg bg-gray-800/50 backdrop-blur-sm"
                >
                  <Image
                    src={src}
                    alt={`AI Generated Image Col 2 ${(index % column2Images.length) + 1}`}
                    fill
                    sizes="(max-width: 1024px) 12.5vw, 8vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    priority={index < 2}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
