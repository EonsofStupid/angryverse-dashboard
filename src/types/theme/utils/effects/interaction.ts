import type { CSSValue } from '../css';
import type { Duration } from '../animation';

export interface MagneticTokens {
  strength_levels: number[];
  radius_values: number[];
  smoothing_values: number[];
  resistance_levels: number[];
}

export interface CursorTokens {
  sizes: string[];
  effects: string[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  transition_speeds: Duration[];
}

export interface TiltTokens {
  max_tilt_values: number[];
  perspective_values: number[];
  scale_values: number[];
  transition_speeds: Duration[];
}

export interface HoverTokens {
  lift_distances: CSSValue[];
  scale_values: number[];
  transition_curves: string[];
  shadow_levels: string[];
}

export interface InteractionTokens {
  magnetic?: MagneticTokens;
  cursor?: CursorTokens;
  tilt?: TiltTokens;
  hover?: HoverTokens;
}