// Basic and enhanced easing function types
export type EasingFunction =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'magnetic'
  | 'hover-scale'
  | 'glass-transition'
  | 'bounce'
  | 'elastic'
  | `cubic-bezier(${number}, ${number}, ${number}, ${number})`;

// Time units and duration types
export type TimeUnit = 'ms' | 's';
export type Duration = `${number}${TimeUnit}`;

// Animation direction and fill mode types
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';

// Timing functions interface
export interface TimingFunctions {
  // Basic timing functions
  linear: string;
  ease: string;
  ease_in: string;
  ease_out: string;
  ease_in_out: string;

  // Enhanced effect-specific timing functions
  magnetic: string;
  hover_scale: string;
  glass_transition: string;

  // Special effects
  bounce: string;
  elastic: string;
}

// Animation timing configuration
export interface AnimationTiming {
  duration: Duration;
  function: EasingFunction;
  delay?: Duration;
}

// Timing function definitions
export const timingFunctions: TimingFunctions = {
  // Basic
  linear: 'linear',
  ease: 'ease',
  ease_in: 'cubic-bezier(0.42, 0, 1, 1)',
  ease_out: 'cubic-bezier(0, 0, 0.58, 1)',
  ease_in_out: 'cubic-bezier(0.42, 0, 0.58, 1)',

  // Enhanced
  magnetic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  hover_scale: 'cubic-bezier(0.4, 0, 0.2, 1)',
  glass_transition: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',

  // Special effects
  bounce: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  elastic: 'cubic-bezier(0.7, -0.5, 0.3, 1.5)',
};

// Utility to generate dynamic cubic-bezier functions
export const generateCubicBezier = (
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number
): string => `cubic-bezier(${p1x}, ${p1y}, ${p2x}, ${p2y})`;

// Keyframe types for animation definitions
export type KeyframePoint = '0%' | '25%' | '50%' | '75%' | '100%' | `${number}%`;
export type KeyframeDefinition = {
  [K in KeyframePoint]?: {
    transform?: string;
    opacity?: number;
    filter?: string;
    [key: string]: string | number | undefined;
  };
};