import { EffectState, CSSValue, CSSColor, Duration } from '@/types/theme';

export type EasingFunction = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | `cubic-bezier(${number},${number},${number},${number})`;
export type AnimationDirection = 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
export type AnimationFillMode = 'none' | 'forwards' | 'backwards' | 'both';

export interface KeyframeState extends EffectState {
  core: {
    name: string;
    duration: Duration;
    timing_function: EasingFunction;
    delay: Duration;
    iteration_count: number | 'infinite';
    direction: AnimationDirection;
    fill_mode: AnimationFillMode;
  };
  
  transforms: {
    translate?: {
      x: CSSValue;
      y: CSSValue;
      z: CSSValue;
    };
    scale?: {
      x: number;
      y: number;
      z: number;
    };
    rotate?: {
      x: string;
      y: string;
      z: string;
    };
    skew?: {
      x: string;
      y: string;
    };
  };
  
  styles: {
    opacity?: number;
    background_color?: CSSColor;
    border_color?: CSSColor;
    box_shadow?: string;
    filter?: string;
  };
}