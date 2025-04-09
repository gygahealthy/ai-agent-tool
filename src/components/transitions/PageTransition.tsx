'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 20 }
}

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: "linear", duration: 0.5 }}
    >
      {children}
    </motion.main>
  )
}

// Variants for staggered animations
export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.2
  }
}

// Page slide animations
export const slideIn = {
  hidden: { x: '100%' },
  show: {
    x: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300
    }
  },
  exit: {
    x: '-100%',
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300
    }
  }
}

// Fade animations with different directions
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export const fadeInDown = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
}

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5
    }
  }
} 