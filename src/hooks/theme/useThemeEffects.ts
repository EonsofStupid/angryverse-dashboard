import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { ThemeEffects } from '@/types/theme/utils/effects';

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

    // Apply animation variables if present
    if (effects.animations) {
      const { timing, curves } = effects.animations;
      Object.entries(timing).forEach(([key, value]) => {
        root.style.setProperty(`--animation-timing-${key}`, value);
      });
      Object.entries(curves).forEach(([key, value]) => {
        root.style.setProperty(`--animation-curve-${key}`, value);
      });
    }

    // Apply hover effect variables if present
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

    return () => {
      // Cleanup effect variables when component unmounts
      root.style.removeProperty('--glass-background');
      root.style.removeProperty('--glass-blur');
      root.style.removeProperty('--glass-border');
      // Cleanup animation and hover variables
      Object.keys(effects.animations?.timing || {}).forEach((key) => {
        root.style.removeProperty(`--animation-timing-${key}`);
      });
      Object.keys(effects.animations?.curves || {}).forEach((key) => {
        root.style.removeProperty(`--animation-curve-${key}`);
      });
      root.style.removeProperty('--hover-scale');
      root.style.removeProperty('--hover-lift');
      root.style.removeProperty('--hover-glow-strength');
      root.style.removeProperty('--hover-transition');
      root.style.removeProperty('--hover-glow-color');
      root.style.removeProperty('--hover-glow-opacity');
      root.style.removeProperty('--hover-glow-spread');
      root.style.removeProperty('--hover-glow-blur');
    };
  }, [effects]);

  return {
    effects,
    hasGlass: !!effects?.glass,
    hasAnimations: !!effects?.animations,
    hasHover: !!effects?.hover,
  };
};