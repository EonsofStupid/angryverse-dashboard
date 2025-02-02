import type { CSSValue } from '@/types/theme/utils/css';
import type { Duration, TimingFunction } from '@/types/theme/utils/css';
import type { EffectState } from '@/types/theme/utils/state';

export interface MotionTokens extends EffectState {
  paths?: {
    ease_curves: string[];
    preset_paths: string[];
  };
  scroll_triggers?: {
    thresholds: number[];
    animation_types: string[];
    directions: string[];
    distances: string[];
  };
}