import { useEffect, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeContext } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useRoleCheck } from '@/hooks/useRoleCheck';
import { isThemeConfiguration } from '@/types/theme/core';
import type { Theme, ThemeConfiguration } from '@/types/theme/core';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');
  const [isInitialized, setIsInitialized] = useState(false);
  
  const {
    currentTheme,
    setCurrentTheme,
    isLoading,
    error,
    fetchPageTheme
  } = useThemeStore();

  const applyThemeVariables = useCallback(() => {
    if (currentTheme?.configuration) {
      const root = document.documentElement;
      const { colors, effects } = currentTheme.configuration;
      
      // Apply color system
      if (colors?.cyber) {
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
      }

      // Apply effects system
      if (effects) {
        // Glass effects
        if (effects.glass) {
          const { background, blur, border, shadow_composition } = effects.glass;
          root.style.setProperty('--glass-background', background);
          root.style.setProperty('--glass-blur', blur);
          root.style.setProperty('--glass-border', border);
          
          if (shadow_composition) {
            Object.entries(shadow_composition).forEach(([key, value]) => {
              root.style.setProperty(`--glass-shadow-${key}`, value.toString());
            });
          }
        }

        // Hover effects
        if (effects.hover) {
          const { 
            scale, lift, glow_strength, transition_duration, 
            glow_color, glow_opacity, glow_spread, glow_blur,
            shadow_normal, shadow_hover 
          } = effects.hover;
          
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
        }

        // Animation effects
        if (effects.animations) {
          Object.entries(effects.animations.timing).forEach(([key, value]) => {
            root.style.setProperty(`--animation-timing-${key}`, value);
          });
          Object.entries(effects.animations.curves).forEach(([key, value]) => {
            root.style.setProperty(`--animation-curve-${key}`, value);
          });
        }

        // Special effects
        if (effects.special_effect_tokens) {
          const { neon, glitch, matrix } = effects.special_effect_tokens;
          
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
        }

        // Motion tokens
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

        // Interaction tokens
        if (effects.interaction_tokens) {
          const { hover, magnetic, tilt } = effects.interaction_tokens;
          
          if (hover) {
            root.style.setProperty('--hover-lift-distances', hover.lift_distances.join(','));
            root.style.setProperty('--hover-scale-values', hover.scale_values.join(','));
            root.style.setProperty('--hover-transition-curves', hover.transition_curves.join(','));
            root.style.setProperty('--hover-shadow-levels', hover.shadow_levels.join(','));
          }

          if (magnetic) {
            root.style.setProperty('--magnetic-strength', magnetic.strength_levels.join(','));
            root.style.setProperty('--magnetic-radius', magnetic.radius_values.join(','));
            root.style.setProperty('--magnetic-smoothing', magnetic.smoothing_values.join(','));
          }

          if (tilt) {
            root.style.setProperty('--tilt-max', tilt.max_tilt_values.join(','));
            root.style.setProperty('--tilt-perspective', tilt.perspective_values.join(','));
            root.style.setProperty('--tilt-scale', tilt.scale_values.join(','));
          }
        }
      }

      // Set semantic color mappings
      root.style.setProperty('--theme-primary', 'var(--theme-colors-cyber-pink)');
      root.style.setProperty('--theme-secondary', 'var(--theme-colors-cyber-cyan)');
      root.style.setProperty('--theme-accent', 'var(--theme-colors-cyber-purple)');
    }
  }, [currentTheme]);

  useEffect(() => {
    if (!isInitialized) {
      console.log('Initializing theme...');
      initializeTheme();
    }
  }, [isInitialized]);

  useEffect(() => {
    if (currentTheme?.configuration) {
      console.log('Applying theme variables:', currentTheme.configuration);
      applyThemeVariables();
    }
  }, [currentTheme, applyThemeVariables]);

  const initializeTheme = useCallback(async () => {
    console.log('Initializing theme...');
    try {
      const { data: pageTheme, error: pageError } = await supabase
        .from('page_themes')
        .select(`
          theme_id,
          themes (*)
        `)
        .eq('page_path', location.pathname)
        .maybeSingle();

      if (pageError) throw pageError;

      if (pageTheme?.themes) {
        const themeData = pageTheme.themes as any;
        // First validate the configuration structure
        if (!themeData.configuration || typeof themeData.configuration !== 'object') {
          throw new Error('Theme configuration is missing or invalid');
        }

        // Type assertion with validation
        const configuration = themeData.configuration as unknown as ThemeConfiguration;
        if (!isThemeConfiguration(configuration)) {
          throw new Error('Invalid theme configuration structure');
        }

        const theme: Theme = {
          id: themeData.id,
          name: themeData.name,
          description: themeData.description || '',
          is_default: themeData.is_default,
          status: themeData.status,
          configuration,
          created_by: themeData.created_by || '',
          created_at: themeData.created_at,
          updated_at: themeData.updated_at
        };

        console.log('Found page-specific theme:', theme);
        setCurrentTheme(theme);
        setIsInitialized(true);
        return;
      }

      const { data: defaultTheme, error: defaultError } = await supabase
        .from('themes')
        .select('*')
        .eq('is_default', true)
        .maybeSingle();

      if (defaultError) throw defaultError;

      if (defaultTheme) {
        // Validate configuration structure
        if (!defaultTheme.configuration || typeof defaultTheme.configuration !== 'object') {
          throw new Error('Default theme configuration is missing or invalid');
        }

        const configuration = defaultTheme.configuration as unknown as ThemeConfiguration;
        if (!isThemeConfiguration(configuration)) {
          throw new Error('Invalid default theme configuration structure');
        }

        const theme: Theme = {
          id: defaultTheme.id,
          name: defaultTheme.name,
          description: defaultTheme.description || '',
          is_default: defaultTheme.is_default,
          status: defaultTheme.status,
          configuration,
          created_by: defaultTheme.created_by || '',
          created_at: defaultTheme.created_at,
          updated_at: defaultTheme.updated_at
        };

        console.log('Loading default theme:', theme);
        setCurrentTheme(theme);
      }
      
      setIsInitialized(true);
    } catch (error) {
      console.error('Theme initialization failed:', error);
      toast({
        title: "Theme Error",
        description: "Failed to load theme configuration",
        variant: "destructive"
      });
    }
  }, [location.pathname, setCurrentTheme, toast]);

  const value = {
    currentTheme,
    isLoading,
    error,
    setCurrentTheme,
    fetchPageTheme,
    isAdmin,
    applyThemeVariables
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
      {isLoading && (
        <div className="fixed top-4 right-4 flex items-center gap-2 bg-background/80 p-2 rounded-md">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm">Loading theme...</span>
        </div>
      )}
      
      {error && (
        <div className="fixed top-4 right-4 bg-destructive/80 text-destructive-foreground p-2 rounded-md">
          Theme error: {error.message}
        </div>
      )}
    </ThemeContext.Provider>
  );
};