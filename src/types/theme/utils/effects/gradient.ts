import { CSSColor } from '../css';

export interface GrayGradient {
  start: CSSColor;
  end: CSSColor;
}

export type OpacityLevel = 0.1 | 0.2 | 0.3 | 0.4 | 0.5;

export interface GradientEffects {
  gray_combinations: GrayGradient[];
  opacity_levels: OpacityLevel[];
}