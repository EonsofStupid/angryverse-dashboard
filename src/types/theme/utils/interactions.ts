import { CSSValue } from './css';
import { Duration, EasingFunction } from './animation';

export type MagneticStrength = 'weak' | 'medium' | 'strong';

export interface MagneticConfig {
  strength: MagneticStrength;
  radius: CSSValue;
  smoothing: number;
  maxRotation?: number;
}

export interface HoverTransition {
  property: string;
  duration: Duration;
  easing: string;
  delay?: Duration;
}

export interface HoverConfig {
  scale?: number;
  rotate?: number;
  translate?: [CSSValue, CSSValue];
  transitions?: HoverTransition[];
}

export type ScrollTriggerPoint = 'top' | 'center' | 'bottom' | number;

export interface ScrollConfig {
  trigger: ScrollTriggerPoint;
  offset?: CSSValue;
  duration?: Duration;
  once?: boolean;
}