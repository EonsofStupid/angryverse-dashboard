import type { GlassEffects } from './glass';
import type { HoverEffects } from './hover';
import type { AnimationEffects } from './animation';
import type { InteractionTokens } from './interaction';
import type { SpecialEffectTokens } from './special';
import type { MotionTokens } from './motion';
import type {
  BaseEffectState,
  GlassEffect,
  HoverEffect,
  AnimationEffect,
  ShadowComposition,
  GlowProperties,
  TransitionTiming
} from './shared';

export interface ThemeEffects {
  glass: GlassEffects;
  hover: HoverEffects;
  animations: AnimationEffects;
  interaction_tokens?: InteractionTokens;
  special_effect_tokens?: SpecialEffectTokens;
  motion_tokens?: MotionTokens;
}

export * from './glass';
export * from './hover';
export * from './animation';
export * from './interaction';
export * from './special';
export * from './motion';
export * from './shared';