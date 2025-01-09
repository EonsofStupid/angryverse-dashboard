// Basic and Enhanced Easing Function Types
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

export type TimeUnit = 'ms' | 's';
export type Duration = `${number}${TimeUnit}`;

export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';

export interface TimingFunctions {
  linear: string;
  ease: string;
  ease_in: string;
  ease_out: string;
  ease_in_out: string;
  magnetic: string;
  hover_scale: string;
  glass_transition: string;
  bounce: string;
  elastic: string;
}

export interface AnimationTiming {
  duration: Duration;
  function: EasingFunction;
  delay?: Duration;
}

export const timingFunctions: TimingFunctions = {
  linear: 'linear',
  ease: 'ease',
  ease_in: 'cubic-bezier(0.42, 0, 1, 1)',
  ease_out: 'cubic-bezier(0, 0, 0.58, 1)',
  ease_in_out: 'cubic-bezier(0.42, 0, 0.58, 1)',
  magnetic: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  hover_scale: 'cubic-bezier(0.4, 0, 0.2, 1)',
  glass_transition: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)',
  elastic: 'cubic-bezier(0.7, -0.5, 0.3, 1.5)',
};

export const generateCubicBezier = (
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number
): `cubic-bezier(${number}, ${number}, ${number}, ${number})` =>
  `cubic-bezier(${p1x}, ${p1y}, ${p2x}, ${p2y})`;

export type KeyframePoint = '0%' | '25%' | '50%' | '75%' | '100%' | `${number}%`;

export type KeyframeDefinition = {
  [K in KeyframePoint]?: {
    transform?: string;
    opacity?: number;
    filter?: string;
    [key: string]: string | number | undefined;
  };
};