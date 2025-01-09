import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

export interface ThemeEffects {
  glass?: {
    background: string;
    blur: string;
    border: string;
  };
  glow?: {
    strengths: {
      sm: string;
      md: string;
      lg: string;
    };
  };
  matrix?: {
    core: {
      speed: string;
      density: number;
    };
  };
  animations?: {
    timing: {
      fast: string;
      normal: string;
      slow: string;
      very_slow: string;
    };
    curves: {
      linear: string;
      ease_out: string;
      ease_in: string;
      ease_in_out: string;
    };
  };
  hover?: {
    scale: number;
    lift: string;
    glow_strength: string;
    transition_duration: string;
  };
}

export const useThemeEffects = () => {
  const { currentTheme } = useTheme();
  const effects = currentTheme?.configuration?.effects;

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

    // Apply glow effect variables if present
    if (effects.glow) {
      Object.entries(effects.glow.strengths).forEach(([key, value]) => {
        root.style.setProperty(`--glow-strength-${key}`, value);
      });
    }

    // Apply matrix effect variables if present
    if (effects.matrix) {
      const { core } = effects.matrix;
      root.style.setProperty('--matrix-speed', core.speed);
      root.style.setProperty('--matrix-density', String(core.density));
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
      const { scale, lift, glow_strength, transition_duration } = effects.hover;
      root.style.setProperty('--hover-scale', String(scale));
      root.style.setProperty('--hover-lift', lift);
      root.style.setProperty('--hover-glow', glow_strength);
      root.style.setProperty('--hover-transition', transition_duration);
    }

    return () => {
      // Cleanup effect variables when component unmounts
      root.style.removeProperty('--glass-background');
      root.style.removeProperty('--glass-blur');
      root.style.removeProperty('--glass-border');
      // ... cleanup other effect variables
    };
  }, [effects]);

  return {
    effects,
    hasGlass: !!effects?.glass,
    hasGlow: !!effects?.glow,
    hasMatrix: !!effects?.matrix,
    hasAnimations: !!effects?.animations,
    hasHover: !!effects?.hover,
  };
};