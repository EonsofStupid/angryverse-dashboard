import type { Theme, ThemeConfiguration } from '@/types/theme/core';

const applyColorSystem = (colors: ThemeConfiguration['colors']) => {
  const root = document.documentElement;
  if (!colors?.cyber) return;

  Object.entries(colors.cyber).forEach(([key, value]) => {
    if (typeof value === 'string') {
      root.style.setProperty(`--theme-colors-cyber-${key}`, value);
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        const variableName = subKey === 'DEFAULT' 
          ? `--theme-colors-cyber-${key}`
          : `--theme-colors-cyber-${key}-${subKey.toLowerCase()}`;
        root.style.setProperty(variableName, subValue as string);
      });
    }
  });
};

const applyGlassEffects = (glass: ThemeConfiguration['effects']['glass']) => {
  const root = document.documentElement;
  if (!glass) return;

  const { background, blur, border, shadow_composition } = glass;
  root.style.setProperty('--glass-background', background);
  root.style.setProperty('--glass-blur', blur);
  root.style.setProperty('--glass-border', border);
  
  if (shadow_composition) {
    Object.entries(shadow_composition).forEach(([key, value]) => {
      root.style.setProperty(`--glass-shadow-${key}`, value.toString());
    });
  }
};

const applyHoverEffects = (hover: ThemeConfiguration['effects']['hover']) => {
  const root = document.documentElement;
  if (!hover) return;

  const { 
    scale, lift, glow_strength, transition_duration, 
    glow_color, glow_opacity, glow_spread, glow_blur,
    shadow_normal, shadow_hover 
  } = hover;
  
  root.style.setProperty('--hover-scale', scale.toString());
  root.style.setProperty('--hover-lift', lift);
  root.style.setProperty('--hover-glow-strength', glow_strength);
  root.style.setProperty('--hover-transition', transition_duration);
  root.style.setProperty('--hover-glow-color', glow_color);
  root.style.setProperty('--hover-glow-opacity', glow_opacity.toString());
  root.style.setProperty('--hover-glow-spread', glow_spread);
  root.style.setProperty('--hover-glow-blur', glow_blur);
  root.style.setProperty('--hover-shadow-normal', shadow_normal);
  root.style.setProperty('--hover-shadow-hover', shadow_hover);
};

const applyAnimationEffects = (animations: ThemeConfiguration['effects']['animations']) => {
  const root = document.documentElement;
  if (!animations) return;

  Object.entries(animations.timing).forEach(([key, value]) => {
    root.style.setProperty(`--animation-timing-${key}`, value);
  });
  Object.entries(animations.curves).forEach(([key, value]) => {
    root.style.setProperty(`--animation-curve-${key}`, value);
  });
};

const applySpecialEffects = (special_effect_tokens: ThemeConfiguration['effects']['special_effect_tokens']) => {
  const root = document.documentElement;
  if (!special_effect_tokens) return;

  const { neon, glitch, matrix } = special_effect_tokens;
  
  if (neon) {
    root.style.setProperty('--neon-glow-sizes', neon.glow_sizes.join(','));
    root.style.setProperty('--neon-flicker-speeds', neon.flicker_speeds.join(','));
  }
  
  if (glitch) {
    root.style.setProperty('--glitch-intensity', glitch.intensity_levels.join(','));
    root.style.setProperty('--glitch-frequency', glitch.frequency_values.join(','));
  }
  
  if (matrix) {
    root.style.setProperty('--matrix-speed', matrix.speed_levels.join(','));
    root.style.setProperty('--matrix-density', matrix.density_values.join(','));
  }
};

const applyMotionTokens = (motion_tokens: ThemeConfiguration['effects']['motion_tokens']) => {
  const root = document.documentElement;
  if (!motion_tokens) return;

  const { paths, scroll_triggers } = motion_tokens;
  
  if (paths) {
    root.style.setProperty('--motion-ease-curves', paths.ease_curves.join(','));
    root.style.setProperty('--motion-preset-paths', paths.preset_paths.join(','));
  }
  
  if (scroll_triggers) {
    root.style.setProperty('--scroll-thresholds', scroll_triggers.thresholds.join(','));
    root.style.setProperty('--scroll-animation-types', scroll_triggers.animation_types.join(','));
    root.style.setProperty('--scroll-directions', scroll_triggers.directions.join(','));
    root.style.setProperty('--scroll-distances', scroll_triggers.distances.join(','));
  }
};

export const applyThemeVariables = (theme: Theme | null) => {
  if (!theme?.configuration) return;
  const { colors, effects } = theme.configuration;

  // Apply each theme system
  applyColorSystem(colors);
  applyGlassEffects(effects.glass);
  applyHoverEffects(effects.hover);
  applyAnimationEffects(effects.animations);
  applySpecialEffects(effects.special_effect_tokens);
  applyMotionTokens(effects.motion_tokens);
}; 