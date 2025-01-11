import type { Duration, TimingFunction } from '@/types/animations/core';
import type { EffectState } from '../state';

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