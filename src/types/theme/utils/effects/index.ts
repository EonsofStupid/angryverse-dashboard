import type { GlassEffects } from './glass';
import type { HoverEffects } from './hover';
import type { AnimationEffects } from './animation';
import type { InteractionTokens } from './interaction';
import type { SpecialEffectTokens } from './special';
import type { MotionTokens } from './motion';
import type { GradientEffects } from './gradient';
import type { 
  EffectPriority,
  EffectSource,
  BaseEffectState,
  ShadowComposition,
  ShadowLevels,
  TransitionTiming,
  TransitionConfig,
  GlowProperties,
  GlowLevels,
  ValueLevels,
  GlassEffect,
  HoverEffect,
  AnimationEffect
} from './shared';

// Main Theme Effects Interface
export interface ThemeEffects {
  glass: GlassEffects;
  hover: HoverEffects;
  animations: AnimationEffects;
  interaction_tokens?: InteractionTokens;
  special_effect_tokens?: SpecialEffectTokens;
  motion_tokens?: MotionTokens;
  gradient?: GradientEffects;
}

// Export all effect types
export type {
  // Core effect types
  GlassEffects,
  HoverEffects,
  AnimationEffects,
  InteractionTokens,
  SpecialEffectTokens,
  MotionTokens,
  GradientEffects,
  
  // Shared types
  EffectPriority,
  EffectSource,
  BaseEffectState,
  ShadowComposition,
  ShadowLevels,
  TransitionTiming,
  TransitionConfig,
  GlowProperties,
  GlowLevels,
  ValueLevels,
  GlassEffect,
  HoverEffect,
  AnimationEffect
};

// Re-export from individual files
export * from './glass';
export * from './hover';
export * from './animation';
export * from './interaction';
export * from './special';
export * from './motion';
export * from './gradient';