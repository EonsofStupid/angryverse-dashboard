import type { GlassEffects } from './effects/glass';
import type { HoverEffects } from './effects/hover';
import type { AnimationEffects } from './animation';
import type { InteractionTokens } from './effects/interaction';
import type { SpecialEffectTokens } from './effects/special';
import type { MotionTokens } from './effects/motion';

export interface ThemeEffects {
  glass: GlassEffects;
  hover: HoverEffects;
  animations: AnimationEffects;
  interaction_tokens?: InteractionTokens;
  special_effect_tokens?: SpecialEffectTokens;
  motion_tokens?: MotionTokens;
}

export * from './effects/glass';
export * from './effects/hover';
export * from './effects/interaction';
export * from './effects/special';
export * from './effects/motion';