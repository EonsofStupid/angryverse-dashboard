import type { Duration, CSSValue } from '@/types/theme/utils/css';
import type { EffectState } from '@/types/theme/utils/state';

export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';
export type TimingFunction = 
  | 'linear' 
  | 'ease' 
  | 'ease-in' 
  | 'ease-out' 
  | 'ease-in-out' 
  | `cubic-bezier(${number},${number},${number},${number})`;

export interface AnimationState extends EffectState {
  direction: AnimationDirection;
  fillMode: AnimationFillMode;
  iterationCount: number | 'infinite';
  delay: Duration;
}

export interface AnimationEffects extends EffectState {
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

export type { Duration, CSSValue };