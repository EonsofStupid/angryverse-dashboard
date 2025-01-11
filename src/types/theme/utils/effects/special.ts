export interface GlitchTokens {
  intensity_levels: number[];
  frequency_values: number[];
  color_schemes: string[][];
  duration_values: string[];
}

export interface MatrixTokens {
  speed_levels: number[];
  density_values: number[];
  character_sets: string[];
  color_schemes: string[];
}

export interface NeonTokens {
  glow_sizes: string[];
  flicker_speeds: string[];
  color_schemes: string[][];
}

export interface HolographicTokens {
  rainbow_intensities: number[];
  noise_scales: number[];
  animation_speeds: string[];
  blend_modes: string[];
}

export interface SpecialEffectTokens {
  glitch?: GlitchTokens;
  matrix?: MatrixTokens;
  neon?: NeonTokens;
  holographic?: HolographicTokens;
}