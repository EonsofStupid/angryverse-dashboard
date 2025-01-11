import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import type { ThemeEffects } from '@/types/theme/utils/effects';

export const useThemeEffects = () => {
  const { currentTheme } = useTheme();
  const effects = currentTheme?.configuration?.effects as ThemeEffects;

  useEffect(() => {
    if (!effects) return;

    const root = document.documentElement;

    // Apply glass effect variables
    if (effects.glass) {
      const { background, blur, border } = effects.glass;
      root.style.setProperty('--glass-background', background);
      root.style.setProperty('--glass-blur', blur);
      root.style.setProperty('--glass-border', border);
    }

    // Apply animation variables
    if (effects.animations) {
      const { timing, curves } = effects.animations;
      Object.entries(timing).forEach(([key, value]) => {
        if (typeof value === 'string') {
          root.style.setProperty(`--animation-timing-${key}`, value);
        }
      });
      Object.entries(curves).forEach(([key, value]) => {
        if (typeof value === 'string') {
          root.style.setProperty(`--animation-curve-${key}`, value);
        }
      });
    }

    // Apply hover effect variables
    if (effects.hover) {
      const { 
        scale, 
        lift, 
        glow_strength, 
        transition_duration,
        glow_color,
        glow_opacity,
        glow_spread,
        glow_blur
      } = effects.hover;
      
      root.style.setProperty('--hover-scale', String(scale));
      root.style.setProperty('--hover-lift', lift);
      root.style.setProperty('--hover-glow-strength', glow_strength);
      root.style.setProperty('--hover-transition', transition_duration);
      root.style.setProperty('--hover-glow-color', glow_color || 'var(--theme-primary)');
      root.style.setProperty('--hover-glow-opacity', String(glow_opacity || 0.5));
      root.style.setProperty('--hover-glow-spread', glow_spread || '4px');
      root.style.setProperty('--hover-glow-blur', glow_blur || '8px');
    }

    // Apply interaction tokens
    if (effects.interaction_tokens) {
      const { hover, magnetic, tilt } = effects.interaction_tokens;
      
      if (hover) {
        root.style.setProperty('--hover-lift-distances', hover.lift_distances.join(','));
        root.style.setProperty('--hover-scale-values', hover.scale_values.join(','));
        root.style.setProperty('--hover-transition-curves', hover.transition_curves.join(','));
        root.style.setProperty('--hover-shadow-levels', hover.shadow_levels.join(','));
      }

      if (magnetic) {
        root.style.setProperty('--magnetic-strength-levels', magnetic.strength_levels.join(','));
        root.style.setProperty('--magnetic-radius-values', magnetic.radius_values.join(','));
        root.style.setProperty('--magnetic-smoothing-values', magnetic.smoothing_values.join(','));
      }

      if (tilt) {
        root.style.setProperty('--tilt-max-values', tilt.max_tilt_values.join(','));
        root.style.setProperty('--tilt-perspective-values', tilt.perspective_values.join(','));
        root.style.setProperty('--tilt-scale-values', tilt.scale_values.join(','));
      }
    }

    // Apply special effect tokens
    if (effects.special_effect_tokens) {
      const { neon, glitch, matrix } = effects.special_effect_tokens;
      
      if (neon) {
        root.style.setProperty('--neon-glow-sizes', neon.glow_sizes.join(','));
        root.style.setProperty('--neon-flicker-speeds', neon.flicker_speeds.join(','));
      }

      if (glitch) {
        root.style.setProperty('--glitch-intensity-levels', glitch.intensity_levels.join(','));
        root.style.setProperty('--glitch-frequency-values', glitch.frequency_values.join(','));
      }

      if (matrix) {
        root.style.setProperty('--matrix-speed-levels', matrix.speed_levels.join(','));
        root.style.setProperty('--matrix-density-values', matrix.density_values.join(','));
      }
    }

    // Apply motion tokens
    if (effects.motion_tokens) {
      const { paths, scroll_triggers } = effects.motion_tokens;
      
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
    }

    return () => {
      // Cleanup effect variables
      root.style.removeProperty('--glass-background');
      root.style.removeProperty('--glass-blur');
      root.style.removeProperty('--glass-border');
      
      if (effects.animations) {
        Object.entries(effects.animations.timing).forEach(([key]) => {
          root.style.removeProperty(`--animation-timing-${key}`);
        });
        Object.entries(effects.animations.curves).forEach(([key]) => {
          root.style.removeProperty(`--animation-curve-${key}`);
        });
      }
      
      if (effects.hover) {
        root.style.removeProperty('--hover-scale');
        root.style.removeProperty('--hover-lift');
        root.style.removeProperty('--hover-glow-strength');
        root.style.removeProperty('--hover-transition');
        root.style.removeProperty('--hover-glow-color');
        root.style.removeProperty('--hover-glow-opacity');
        root.style.removeProperty('--hover-glow-spread');
        root.style.removeProperty('--hover-glow-blur');
      }
      
      // Cleanup interaction tokens
      root.style.removeProperty('--hover-lift-distances');
      root.style.removeProperty('--hover-scale-values');
      root.style.removeProperty('--hover-transition-curves');
      root.style.removeProperty('--hover-shadow-levels');
      root.style.removeProperty('--magnetic-strength-levels');
      root.style.removeProperty('--magnetic-radius-values');
      root.style.removeProperty('--magnetic-smoothing-values');
      root.style.removeProperty('--tilt-max-values');
      root.style.removeProperty('--tilt-perspective-values');
      root.style.removeProperty('--tilt-scale-values');
      
      // Cleanup special effect tokens
      root.style.removeProperty('--neon-glow-sizes');
      root.style.removeProperty('--neon-flicker-speeds');
      root.style.removeProperty('--glitch-intensity-levels');
      root.style.removeProperty('--glitch-frequency-values');
      root.style.removeProperty('--matrix-speed-levels');
      root.style.removeProperty('--matrix-density-values');
      
      // Cleanup motion tokens
      root.style.removeProperty('--motion-ease-curves');
      root.style.removeProperty('--motion-preset-paths');
      root.style.removeProperty('--scroll-thresholds');
      root.style.removeProperty('--scroll-animation-types');
      root.style.removeProperty('--scroll-directions');
      root.style.removeProperty('--scroll-distances');
    };
  }, [effects]);

  return {
    effects,
    hasGlass: !!effects?.glass,
    hasAnimations: !!effects?.animations,
    hasHover: !!effects?.hover,
    hasInteractionTokens: !!effects?.interaction_tokens,
    hasSpecialEffects: !!effects?.special_effect_tokens,
    hasMotionTokens: !!effects?.motion_tokens
  };
};
