import type { CSSColor } from '@/types/theme/utils/css';
import type { Duration } from '@/types/theme/utils/css';
import type { EffectState } from '@/types/theme/utils/state';

export interface SpecialEffectTokens extends EffectState {
  glitch?: {
    intensity_levels: number[];
    frequency_values: number[];
    color_schemes: string[][];
  };
  neon?: {
    glow_sizes: string[];
    flicker_speeds: string[];
  };
  matrix?: {
    speed_levels: number[];
    density_values: number[];
  };
}