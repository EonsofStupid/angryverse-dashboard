import type { Duration, EasingFunction } from './core';

export interface AnimationTiming {
  durations: {
    instant: Duration;
    fast: Duration;
    normal: Duration;
    slow: Duration;
    verySlow: Duration;
  };
  
  easings: {
    linear: EasingFunction;
    easeOut: EasingFunction;
    easeIn: EasingFunction;
    easeInOut: EasingFunction;
    bounce: EasingFunction;
    elastic: EasingFunction;
  };
  
  delays: {
    none: Duration;
    short: Duration;
    medium: Duration;
    long: Duration;
  };
}

export const defaultTiming: AnimationTiming = {
  durations: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    verySlow: '1000ms'
  },
  
  easings: {
    linear: 'linear',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  
  delays: {
    none: '0ms',
    short: '100ms',
    medium: '200ms',
    long: '300ms'
  }
};