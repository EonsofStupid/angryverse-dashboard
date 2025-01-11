import type { Duration, CSSValue } from '@/types/theme/utils/css';
import type { KeyframeState, EasingFunction } from '@/theme/animations/types/keyframes';
import type { MotionPathState } from '@/theme/animations/types/motion-paths';
import type { ScrollEffectState } from '@/theme/animations/types/scroll-effects';
import type { EffectState } from '@/types/theme/utils/state';

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

export type { Duration, TimingFunction, KeyframeState, MotionPathState, ScrollEffectState };