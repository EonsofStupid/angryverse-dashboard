import type { CSSValue, CSSColor } from '../css';
import type { Duration, TimingFunction } from '../animation';

// Base Effect State
export type EffectPriority = 'database' | 'fallback' | 'hybrid';
export type EffectSource = 'database' | 'fallback';

export interface BaseEffectState {
  enabled: boolean;
  priority: EffectPriority;
  source: EffectSource;
}

// Shadow System
export interface ShadowComposition {
  offset_y: CSSValue;
  blur_radius: CSSValue;
  spread_radius: CSSValue;
  opacity: number;
}

export interface ShadowLevels {
  light: string;
  medium: string;
  heavy: string;
}

// Transition System
export interface TransitionTiming {
  duration: Duration;
  timing_function: TimingFunction;
}

export interface TransitionConfig extends TransitionTiming {
  property: string;
}

// Glow System
export interface GlowProperties {
  size: CSSValue;
  color: CSSColor;
  opacity: number;
}

export interface GlowLevels {
  soft: GlowProperties;
  medium: GlowProperties;
  intense: GlowProperties;
}

// Value Ranges
export interface ValueLevels<T> {
  values: T[];
  default_index: number;
}

// Composite Effects
export interface GlassEffect extends BaseEffectState {
  background: string;
  blur: CSSValue;
  border: string;
  shadow_composition?: ShadowComposition;
}

export interface HoverEffect extends BaseEffectState {
  scale: number;
  transition: TransitionTiming;
  glow?: GlowProperties;
  shadow?: {
    normal: string;
    hover: string;
  };
}

export interface AnimationEffect extends BaseEffectState {
  timing: {
    fast: Duration;
    normal: Duration;
    slow: Duration;
    very_slow: Duration;
  };
  curves: {
    linear: TimingFunction;
    ease_out: TimingFunction;
    ease_in: TimingFunction;
    ease_in_out: TimingFunction;
  };
}