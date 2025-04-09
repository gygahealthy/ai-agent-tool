"use client";

import { useEffect } from "react";

// Make sure the particlesJS function is available globally
declare global {
  interface Window {
    particlesJS: any; // Use 'any' for simplicity, or find/create specific types
  }
}

interface ParticlesBackgroundProps {
  id?: string; // Optional custom ID
  config?: any; // Optional custom configuration
  backgroundColor?: string; // Optional background color
}

export function ParticlesBackground({
  id = "particles-js",
  config,
  backgroundColor = "#13161C",
}: ParticlesBackgroundProps) {
  useEffect(() => {
    // Check if the particlesJS function is loaded
    if (typeof window !== "undefined" && window.particlesJS) {
      console.log(`Initializing particles.js with ID: ${id}...`);

      // Default configuration if none is provided
      const defaultConfig = {
        particles: {
          number: {
            value: 80,
            density: { enable: true, value_area: 800 },
          },
          color: { value: "#00ffcc" }, // Use theme color if desired
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
            color: "#00ffcc", // Use theme color if desired
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
      };

      // Initialize with custom ID and config or defaults
      window.particlesJS(id, config || defaultConfig);
    } else {
      console.warn(`particles.js script not loaded yet or function not available for ID: ${id}.`);
      // Optionally, retry after a short delay or handle the error
      const checkInterval = setInterval(() => {
        if (typeof window !== "undefined" && window.particlesJS) {
          console.log(`Retrying particles.js initialization for ID: ${id}...`);
          clearInterval(checkInterval);
          // Call the initialization logic again here if needed
        }
      }, 100);
    }

    // Cleanup function (optional, particles.js doesn't have a standard destroy method)
    return () => {
      const particlesDiv = document.getElementById(id);
      // Basic cleanup: remove the canvas if it exists
      if (
        particlesDiv &&
        particlesDiv.firstChild &&
        particlesDiv.firstChild instanceof HTMLCanvasElement
      ) {
        particlesDiv.removeChild(particlesDiv.firstChild);
      }
      console.log(`Particles background cleanup attempted for ID: ${id}.`);
    };
  }, [id, config]); // Add dependencies to rerun effect if they change

  // Render the target div for particles.js with the background color
  return (
    <div id={id} className="absolute h-full w-full" style={{ background: backgroundColor }}></div>
  );
}
