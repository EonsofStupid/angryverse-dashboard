import type { CSSValue, CSSColor } from '@/types/theme/utils/css'
import type { Duration } from '@/types/theme/utils/animation'
import type { EffectState } from '@/types/theme/utils/state'

export interface InteractionTokens extends EffectState {
  hover?: {
    lift_distances: CSSValue[];
    scale_values: number[];
    transition_curves: string[];
    shadow_levels: string[];
  };
  magnetic?: {
    strength_levels: number[];
    radius_values: number[];
    smoothing_values: number[];
  };
  tilt?: {
    max_tilt_values: number[];
    perspective_values: number[];
    scale_values: number[];
  };
}