import { GlassEffects } from './effects/glass';
import { HoverEffects } from './effects/hover';
import { AnimationEffects } from './animation';

export interface ThemeEffects {
  glass: GlassEffects;
  hover: HoverEffects;
  animations: AnimationEffects;
}

export * from './effects/glass';
export * from './effects/hover';