import { EffectState, CSSValue, Duration } from '@/types/theme';
import { EasingFunction } from './keyframes';

export type ScrollTriggerEvent = 'enter' | 'leave' | 'enter-back' | 'leave-back';
export type ScrollDirection = 'vertical' | 'horizontal' | 'both';

export interface ScrollEffectState extends EffectState {
  trigger: {
    element_selector?: string;
    viewport_threshold: number;
    offset: {
      top: CSSValue;
      bottom: CSSValue;
      left: CSSValue;
      right: CSSValue;
    };
    direction: ScrollDirection;
    events: ScrollTriggerEvent[];
  };
  
  parallax: {
    intensity: number;
    smooth_factor: number;
    direction: ScrollDirection;
    reverse: boolean;
    scale_range: {
      min: number;
      max: number;
    };
  };
  
  reveal: {
    effect: 'fade' | 'slide' | 'scale' | 'custom';
    duration: Duration;
    easing: EasingFunction;
    distance: CSSValue;
    origin: 'top' | 'bottom' | 'left' | 'right';
    stagger: {
      amount: Duration;
      from: 'start' | 'end' | 'center' | 'edges';
      grid: [number, number];
    };
  };
  
  viewport: {
    root_margin: string;
    threshold: number[];
    once: boolean;
    disable_mobile?: boolean;
  };
}