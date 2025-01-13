import type { Duration, TimingFunction } from '../css';

export interface AnimationEffects {
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