import { useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { ThemeEffects } from '@/types/theme';

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
  };
};