import type { CSSValue } from '@/types/theme/utils/css';

// Core timing types
export type Duration = `${number}${'ms' | 's'}`;
export type EasingFunction = 
  | 'linear' 
  | 'ease' 
  | 'ease-in' 
  | 'ease-out' 
  | 'ease-in-out' 
  | `cubic-bezier(${number},${number},${number},${number})`;

// Animation direction and fill modes
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';

// Base animation configuration
export interface AnimationConfig {
  duration: Duration;
  easing: EasingFunction;
  delay?: Duration;
  direction?: AnimationDirection;
  fillMode?: AnimationFillMode;
  iterationCount?: number | 'infinite';
}

// Animation state interface
export interface AnimationState {
  isAnimating: boolean;
  isPaused: boolean;
  isComplete: boolean;
  currentIteration: number;
  elapsedTime: Duration;
}