"use client";

import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

export function MarqueeBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleId = "marquee-particles-js"; // Unique ID for this particle instance

  // Effect for infinite scrolling animation
  useEffect(() => {
    const scrollContainer = containerRef.current;
    if (!scrollContainer) return;

    // Clone the content for seamless scrolling
    const content = scrollContainer.querySelector(".marquee-content");
    if (!content) return;

    scrollContainer.appendChild(content.cloneNode(true));
  }, []);

  // Initialize particles.js with a unique ID
  useEffect(() => {
    // Check if the particlesJS function is loaded
    if (typeof window !== "undefined" && window.particlesJS) {
      console.log("Initializing marquee particles...");
      window.particlesJS(particleId, {
        particles: {
          number: {
            value: 100, // More stars
            density: { enable: true, value_area: 800 },
          },
          color: { value: "#ffffff" }, // White stars
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
          },
          opacity: {
            value: 0.7,
            random: true, // Random opacity for more natural look
          },
          size: {
            value: 2,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#8a8a8a", // Slightly darker lines for better visibility
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1, // Slower for more elegant movement
            direction: "none",
            random: true, // Random movement
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" }, // Connect stars on hover
            onclick: { enable: true, mode: "push" }, // Add stars on click
            resize: true,
          },
          modes: {
            grab: { distance: 140, line_linked: { opacity: 0.8 } },
            push: { particles_nb: 3 },
          },
        },
        retina_detect: true,
      });
    } else {
      console.warn("particles.js script not loaded yet for marquee.");
    }

    // Cleanup function
    return () => {
      const particlesDiv = document.getElementById(particleId);
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
    <section className="relative overflow-hidden bg-[#13161C] py-8">
      {/* Custom Particle background with unique ID */}
      <div className="absolute inset-0 z-0">
        <div
          id={particleId}
          className="absolute h-full w-full"
          style={{ background: "#13161C" }}
        ></div>
      </div>

      {/* Scrolling text container */}
      <div ref={containerRef} className="relative z-10 flex overflow-hidden whitespace-nowrap">
        <div className="marquee-content animate-marquee flex items-center">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="mx-8 text-[2.5rem] font-bold tracking-tighter text-gray-500">
                Unleash Your Creativity
              </span>
              <Sparkles className="mx-2 h-8 w-8 text-cyan-400" />
              <span className="mx-8 text-[2.5rem] font-bold text-white">Our Technology</span>
              <Sparkles className="mx-2 h-8 w-8 text-cyan-400" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
