import { GlassEffects } from './effects/glass';
import { HoverEffects } from './effects/hover';
import { AnimationEffects } from './animation';
import { GradientEffects } from './effects/gradient';

export interface ThemeEffects {
  glass: GlassEffects;
  hover: HoverEffects;
  animations: AnimationEffects;
  gradients: GradientEffects;
}

// Re-export specialized effects
export * from './effects/glass';
export * from './effects/hover';
export * from './effects/animation';
export * from './effects/gradient';