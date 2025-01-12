import { Duration } from './core';
import { AnimationDirection, AnimationFillMode } from '@/types/theme/utils/effects/animation';
import { AnimationState } from '@/types/theme/utils/effects/shared';

export * from './core';
export * from './keyframes';
export * from './motion';
export * from './scroll';
export * from './timing';

// Re-export common types for convenience
export type {
  Duration,
  AnimationDirection,
  AnimationFillMode,
  AnimationState
};