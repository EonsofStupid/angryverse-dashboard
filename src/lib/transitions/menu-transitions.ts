import { type MotionProps } from "framer-motion";

export const slideInRight: MotionProps = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
  transition: {
    type: "spring",
    damping: 30,
    stiffness: 300,
  },
};

export const menuItemFade: MotionProps = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: {
    duration: 0.2,
  },
};

export const glowPulse: MotionProps = {
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(255, 0, 127, 0)",
      "0 0 20px 2px rgba(255, 0, 127, 0.3)",
      "0 0 0 0 rgba(255, 0, 127, 0)",
    ],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const cyberpunkGlitch: MotionProps = {
  animate: {
    x: [-2, 2, -2, 0],
    y: [1, -1, 1, 0],
    filter: [
      "hue-rotate(0deg)",
      "hue-rotate(90deg)",
      "hue-rotate(-90deg)",
      "hue-rotate(0deg)",
    ],
  },
  transition: {
    duration: 0.2,
    repeat: Infinity,
    repeatType: "reverse",
    ease: "easeInOut",
  },
};

export const scanLine: MotionProps = {
  initial: { y: "-100%" },
  animate: { y: "100%" },
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "linear",
  },
};

export const neonTrace: MotionProps = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: {
    pathLength: { 
      duration: 1.5,
      ease: "easeInOut"
    },
    opacity: { 
      duration: 0.5
    }
  },
};

export type TransitionPreset = "slideIn" | "fade" | "glow" | "glitch" | "scan" | "neon";

export const getTransitionPreset = (preset: TransitionPreset): MotionProps => {
  const presets: Record<TransitionPreset, MotionProps> = {
    slideIn: slideInRight,
    fade: menuItemFade,
    glow: glowPulse,
    glitch: cyberpunkGlitch,
    scan: scanLine,
    neon: neonTrace,
  };
  
  return presets[preset];
};