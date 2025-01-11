import type { CSSValue } from '@/types/theme/utils/css';
import type { AnimationConfig, AnimationState } from './core';

export type ScrollDirection = 'vertical' | 'horizontal' | 'both';
export type ScrollTriggerEvent = 'enter' | 'leave' | 'enter-back' | 'leave-back';

export interface ScrollTrigger {
  element?: string;
  start?: string | number;
  end?: string | number;
  scrub?: boolean | number;
  markers?: boolean;
  once?: boolean;
}

export interface ScrollConfig {
  trigger: ScrollTrigger;
  direction: ScrollDirection;
  duration: string;
  easing: string;
  distance?: CSSValue;
  pin?: boolean;
  pinSpacing?: boolean;
  anticipatePin?: number;
}

export interface ScrollState extends AnimationState {
  progress: number;
  direction: 1 | -1;
  velocity: number;
  isInView: boolean;
}