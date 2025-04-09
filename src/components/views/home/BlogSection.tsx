"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  image: string;
  date: string;
  category: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "The Ethical Implications of AI-Generated Images",
    slug: "ethical-implications-ai-images",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&q=80&w=1470&auto=format&fit=crop",
    date: "4 years ago",
    category: "Animation",
  },
  {
    id: "2",
    title: "Our work shows real results from a wide range of clients.",
    slug: "real-results-clients",
    image:
      "https://images.unsplash.com/photo-1677442135131-4d7c0d91517e?ixlib=rb-4.0.3&q=80&w=1632&auto=format&fit=crop",
    date: "2 years ago",
    category: "Creative",
  },
  {
    id: "3",
    title: "Our work shows real results from a wide range of clients.",
    slug: "real-results-clients-2",
    image:
      "https://images.unsplash.com/photo-1655720033654-a4239dd42d10?ixlib=rb-4.0.3&q=80&w=1470&auto=format&fit=crop",
    date: "2 years ago",
    category: "Creative",
  },
];

export default function BlogSection() {
  const blogParticleId = "blog-particles-js"; // Unique ID for blog section particles

  // Initialize particles.js with a unique ID for the blog section
  useEffect(() => {
    // Check if the particlesJS function is loaded
    if (typeof window !== "undefined" && window.particlesJS) {
      console.log("Initializing blog section particles...");
      window.particlesJS(blogParticleId, {
        particles: {
          number: {
            value: 60,
            density: { enable: true, value_area: 800 },
          },
          color: { value: "#ffffff" }, // White particles
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
          },
          opacity: {
            value: 0.3, // Lower opacity for subtle effect
            random: true,
          },
          size: {
            value: 2,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#aaaaaa", // Light gray lines
            opacity: 0.2, // More subtle lines
            width: 1,
          },
          move: {
            enable: true,
            speed: 1, // Slower for a more elegant effect
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "bubble" }, // Bubble effect on hover
            onclick: { enable: true, mode: "push" }, // Add particles on click
          },
          modes: {
            bubble: { distance: 200, size: 4, duration: 2, opacity: 0.5 },
          },
        },
        retina_detect: true,
      });
    } else {
      console.warn("particles.js script not loaded yet for blog section.");
    }

    // Cleanup function
    return () => {
      const particlesDiv = document.getElementById(blogParticleId);
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
    <section className="relative bg-[#13161C] py-20 text-white">
      <div className="absolute inset-0 z-0 opacity-30">
        <div
          id={blogParticleId}
          className="absolute h-full w-full"
          style={{ background: "#13161C" }}
        ></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="mb-4 inline-block rounded-full border border-gray-600 bg-gray-800/50 px-4 py-1 text-xs font-medium text-gray-300 backdrop-blur-sm">
            newest article
          </div>
          <h2 className="text-5xl font-bold md:text-6xl">
            AI Image
            <br />
            Trends
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 gap-10 md:grid-cols-3"
        >
          {BLOG_POSTS.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group flex flex-col"
            >
              <div className="mb-5 overflow-hidden rounded-lg shadow-lg">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </div>

              <div className="flex flex-grow flex-col text-left">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-400">
                  <span>{post.date}</span>
                  <span className="text-gray-600">•</span>
                  <span>{post.category}</span>
                </div>

                <h3 className="mb-4 flex-grow text-xl font-semibold text-white group-hover:text-gray-200">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                <div className="mt-auto">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group/link inline-flex items-center border-b border-gray-600 pb-px text-sm font-medium text-gray-300 transition-colors hover:border-gray-400 hover:text-white"
                  >
                    Read More
                    <span className="ml-1.5 transition-transform group-hover/link:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
