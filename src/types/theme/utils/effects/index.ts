import type { GlassEffects } from './glass';
import type { HoverEffects } from './hover';
import type { AnimationEffects } from '../animation';
import type { GradientEffects } from './gradient';

export interface ThemeEffects {
  glass: GlassEffects;
  hover: HoverEffects;
  animations: AnimationEffects;
  gradients?: GradientEffects;
}

export * from './glass';
export * from './hover';
export * from './gradient';