"use client";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MotionDiv } from "../../MotionWrapper";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sara Johnon",
    role: "Freelancer",
    quote:
      "I was blown away by the quality of the images I was able to generate with this platform. The AI algorithms are truly cutting-edge and the intuitive interface makes it incredibly easy to use.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&h=500&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Digital Artist",
    quote:
      "This platform has completely transformed my creative workflow. The AI tools provide endless inspiration and help me create stunning visuals in a fraction of the time it would normally take.",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=500&h=500&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Marketing Director",
    quote:
      "Our marketing campaigns have reached new heights since we started using this platform. The AI-generated visuals consistently outperform our traditional content in engagement metrics.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=500&h=500&auto=format&fit=crop",
  },
];

export function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative overflow-visible bg-[#191D27] py-24 md:py-32">
      {/* Removed the right-side glow */}

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center md:flex-row md:items-start md:gap-12 lg:gap-24">
          <MotionDiv
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10 w-full max-w-xs md:mb-0 md:w-1/3"
          >
            <div className="overflow-hidden rounded-full">
              <Image
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                width={500}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>
          </MotionDiv>

          <div className="flex w-full flex-col md:w-2/3">
            <div className="mb-6">
              <span className="inline-block rounded-full bg-gray-800 px-4 py-1 text-sm text-gray-300">
                testimonial
              </span>
            </div>

            <h2 className="mb-8 text-4xl font-bold text-white md:text-5xl">
              What They Say? <span className="text-cyan-400">✨</span>
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="mb-8"
              >
                <p className="text-lg italic text-gray-300">"{currentTestimonial.quote}"</p>
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
                className="mb-10"
              >
                <h3 className="text-xl font-semibold text-white">{currentTestimonial.name}</h3>
                <p className="text-gray-400">{currentTestimonial.role}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={isAnimating}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-colors hover:border-gray-500 hover:text-white disabled:opacity-50"
              >
                <ChevronLeftIcon />
              </button>
              <button
                onClick={handleNext}
                disabled={isAnimating}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-colors hover:border-gray-500 hover:text-white disabled:opacity-50"
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
