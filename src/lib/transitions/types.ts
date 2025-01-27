import { type MotionProps } from "framer-motion";

export interface TransitionConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  type?: "tween" | "spring" | "inertia";
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface AnimationPreset {
  initial?: Record<string, any>;
  animate?: Record<string, any>;
  exit?: Record<string, any>;
  transition?: TransitionConfig;
  variants?: Record<string, any>;
}

export type TransitionFunction = (config?: Partial<TransitionConfig>) => MotionProps;