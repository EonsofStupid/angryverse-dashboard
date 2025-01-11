import type { CSSValue } from '../theme/utils/css';
import type { AnimationConfig } from './core';

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

export interface ScrollConfig extends AnimationConfig {
  trigger: ScrollTrigger;
  direction: ScrollDirection;
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