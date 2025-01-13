import type { GlassEffects } from './glass';
import type { HoverEffects } from './hover';
import type { AnimationEffects } from './animation';

export interface ThemeEffects {
  glass: GlassEffects;
  hover: HoverEffects;
  animations: AnimationEffects;
}

export * from './glass';
export * from './hover';
export * from './animation';