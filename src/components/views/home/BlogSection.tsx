"use client";

import { ArticleSummaryFromAPI } from "@/types/article";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// LocalStorage keys
const CACHE_KEY_POSTS = "homepagePostsCache";
const CACHE_KEY_IDS = "homepagePostsIdsCache";
const POST_ID_COUNT_FOR_CACHE_CHECK = 3; // How many initial post IDs to compare

export default function BlogSection() {
  const blogParticleId = "blog-particles-js";
  const [blogPosts, setBlogPosts] = useState<ArticleSummaryFromAPI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBlogPosts() {
      setIsLoading(true); // Start loading initially
      setError(null);

      let cachedPosts: ArticleSummaryFromAPI[] | null = null;
      let cachedIds: number[] | null = null;

      // 1. Try loading from cache first
      try {
        const cachedPostsData = localStorage.getItem(CACHE_KEY_POSTS);
        const cachedIdsData = localStorage.getItem(CACHE_KEY_IDS);
        if (cachedPostsData) {
          cachedPosts = JSON.parse(cachedPostsData);
          if (Array.isArray(cachedPosts) && cachedPosts.length > 0) {
            console.log("Using cached homepage posts initially.");
            setBlogPosts(cachedPosts);
            setIsLoading(false); // Show cached data immediately
          } else {
            cachedPosts = null; // Invalid cache data
          }
        }
        if (cachedIdsData) {
          cachedIds = JSON.parse(cachedIdsData);
          if (!Array.isArray(cachedIds)) {
            cachedIds = null; // Invalid cache data
          }
        }
      } catch (e) {
        console.warn("Failed to read or parse homepage cache:", e);
        localStorage.removeItem(CACHE_KEY_POSTS);
        localStorage.removeItem(CACHE_KEY_IDS);
      }

      // 2. Fetch fresh data from API
      try {
        setIsLoading(true); // Set loading true again while fetching in background
        const response = await fetch("/api/homepage-posts");
        if (!response.ok) {
          throw new Error(`API fetch failed with status ${response.status}`);
        }
        const data = await response.json();
        const newPosts: ArticleSummaryFromAPI[] = data.posts || [];

        // 3. Compare IDs and update if necessary
        const newIds = newPosts.slice(0, POST_ID_COUNT_FOR_CACHE_CHECK).map((p) => p.id);

        // Simple array comparison (order matters)
        const idsMatch = cachedIds && JSON.stringify(newIds) === JSON.stringify(cachedIds);

        if (!idsMatch) {
          console.log("Homepage posts changed or cache empty. Updating.");
          setBlogPosts(newPosts);
          // Update cache
          try {
            localStorage.setItem(CACHE_KEY_POSTS, JSON.stringify(newPosts));
            localStorage.setItem(CACHE_KEY_IDS, JSON.stringify(newIds));
          } catch (e) {
            console.warn("Failed to write to homepage cache:", e);
          }
        } else {
          console.log("Homepage posts cache is up-to-date.");
          // Ensure state reflects cache if it wasn't set initially
          if (cachedPosts && blogPosts !== cachedPosts) {
            setBlogPosts(cachedPosts);
          }
        }
      } catch (err) {
        console.error("Failed to fetch homepage blog posts from API route:", err);
        setError("Could not load articles.");
        // Don't clear posts if cache was loaded, only if fetch fails AND cache was empty
        if (!cachedPosts) {
          setBlogPosts([]);
        }
      } finally {
        setIsLoading(false); // Final loading state update
      }
    }

    loadBlogPosts();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    if (typeof window !== "undefined" && window.particlesJS) {
      console.log("Initializing blog section particles...");
      window.particlesJS(blogParticleId, {
        particles: {
          number: {
            value: 60,
            density: { enable: true, value_area: 800 },
          },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
          },
          opacity: {
            value: 0.3,
            random: true,
          },
          size: {
            value: 2,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#aaaaaa",
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
        },
        interactivity: {
          events: {
            onhover: { enable: true, mode: "bubble" },
            onclick: { enable: true, mode: "push" },
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

  // Corrected helper function with simplified priority and base URL logic
  const getStrapiImageUrl = (article: ArticleSummaryFromAPI | null): string => {
    if (!article) return "/images/placeholder-image.jpg";

    const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_CMS_BASE_URL || "";
    let finalUrl: string | undefined | null = null;

    // 1. Prioritize coverUrl (assumed absolute)
    if (article.coverUrl) {
      finalUrl = article.coverUrl;
    } else {
      // 2. Try thumbnail URL from cover object
      const thumbnailUrl = article.cover?.formats?.thumbnail?.url;
      if (thumbnailUrl) {
        finalUrl = thumbnailUrl.startsWith("/") ? `${strapiBaseUrl}${thumbnailUrl}` : thumbnailUrl;
      } else {
        // 3. Try original URL from cover object
        const originalUrl = article.cover?.url;
        if (originalUrl) {
          finalUrl = originalUrl.startsWith("/") ? `${strapiBaseUrl}${originalUrl}` : originalUrl;
        }
      }
    }
    console.log("finalUrl", article);
    // 4. Final fallback to placeholder
    return finalUrl || "/images/placeholder-image.jpg";
  };

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
          {isLoading && <p className="col-span-3 text-center text-gray-400">Loading posts...</p>}
          {error && <p className="col-span-3 text-center text-red-500">{error}</p>}
          {!isLoading && !error && blogPosts.length === 0 && (
            <p className="col-span-3 text-center text-gray-400">No posts found.</p>
          )}
          {!isLoading &&
            !error &&
            blogPosts.map((post) => (
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
                        src={getStrapiImageUrl(post)}
                        alt={post.title || "Blog post image"}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Link>
                </div>

                <div className="flex flex-grow flex-col text-left">
                  <div className="mb-3 flex items-center gap-2 text-xs font-medium text-gray-400">
                    <span>
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : ""}
                    </span>
                    <span className="text-gray-600">•</span>
                    <span>{post.category?.name || "General"}</span>
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
