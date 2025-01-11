import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '@/store/useThemeStore';
import { ThemeContext } from '@/hooks/useTheme';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthStore } from '@/store/useAuthStore';
import { useRoleCheck } from '@/hooks/useRoleCheck';

// Theme Types
import { Theme, ThemeConfiguration, isThemeConfiguration } from '@/types/theme/core';
import { ThemeEffects } from '@/types/theme/utils/effects';
import { GlassEffects } from '@/types/theme/utils/effects/glass';
import { HoverEffects } from '@/types/theme/utils/effects/hover';
import { AnimationEffects } from '@/types/theme/utils/animation';
import { GradientEffects } from '@/types/theme/utils/effects/gradient';
import { isValidThemeColor, CSSColor } from '@/types/theme/utils/css';

const convertDatabaseTheme = (dbTheme: any): Theme => {
  // Parse configuration if it's a string
  const configuration = typeof dbTheme.configuration === 'string' 
    ? JSON.parse(dbTheme.configuration) 
    : dbTheme.configuration;

  if (!isThemeConfiguration(configuration)) {
    throw new Error('Invalid theme configuration structure');
  }

  return {
    id: dbTheme.id,
    name: dbTheme.name,
    description: dbTheme.description || '',
    is_default: !!dbTheme.is_default,
    status: dbTheme.status || 'active',
    configuration,
    created_by: dbTheme.created_by,
    created_at: dbTheme.created_at,
    updated_at: dbTheme.updated_at
  };
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { 
    currentTheme, 
    isLoading, 
    error,
    fetchPageTheme, 
    setCurrentTheme,
  } = useThemeStore();

  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');
  
  const location = useLocation();
  const { toast } = useToast();

  const isAdminRoute = location.pathname.startsWith('/admin');

  const applyThemeVariables = useCallback(() => {
    if (!currentTheme?.configuration) {
      console.warn('No theme configuration found');
      return;
    }
    
    const root = document.documentElement;

    // Apply route-specific theme class
    if (isAdminRoute) {
      root.classList.add('admin-theme');
      root.classList.remove('site-theme');
    } else {
      root.classList.add('site-theme');
      root.classList.remove('admin-theme');
    }

    // Apply colors and effects from the theme configuration
    const { colors, effects } = currentTheme.configuration;

    // Apply cyber colors
    if (colors?.cyber) {
      Object.entries(colors.cyber).forEach(([key, value]) => {
        if (typeof value === 'string' && isValidThemeColor(value)) {
          root.style.setProperty(`--theme-colors-cyber-${key}`, value);
        } else if (typeof value === 'object' && value !== null) {
          Object.entries(value).forEach(([subKey, subValue]) => {
            if (typeof subValue === 'string' && isValidThemeColor(subValue)) {
              const variableName = `--theme-colors-cyber-${key}-${subKey.toLowerCase()}`;
              root.style.setProperty(variableName, subValue);
            }
          });
        }
      });
    }

    // Apply glass effects
    if (effects?.glass) {
      const { background, blur, border, shadow_composition } = effects.glass as GlassEffects;
      root.style.setProperty('--glass-background', background);
      root.style.setProperty('--glass-blur', blur);
      root.style.setProperty('--glass-border', border);

      if (shadow_composition) {
        const { offset_y, blur_radius, spread_radius, opacity } = shadow_composition;
        root.style.setProperty('--glass-shadow-offset-y', offset_y);
        root.style.setProperty('--glass-shadow-blur-radius', blur_radius);
        root.style.setProperty('--glass-shadow-spread-radius', spread_radius);
        root.style.setProperty('--glass-shadow-opacity', opacity.toString());
      }
    }

    // Apply hover effects
    if (effects?.hover) {
      const { 
        scale, 
        lift, 
        glow_strength, 
        transition_duration,
        glow_color,
        glow_opacity,
        glow_spread,
        glow_blur,
        shadow_normal,
        shadow_hover
      } = effects.hover as HoverEffects;
      
      root.style.setProperty('--hover-scale', scale.toString());
      root.style.setProperty('--hover-lift', lift);
      root.style.setProperty('--hover-glow-strength', glow_strength);
      root.style.setProperty('--hover-transition', transition_duration);
      root.style.setProperty('--hover-glow-color', glow_color || 'var(--theme-primary)');
      root.style.setProperty('--hover-glow-opacity', glow_opacity?.toString() || '0.5');
      root.style.setProperty('--hover-glow-spread', glow_spread || '4px');
      root.style.setProperty('--hover-glow-blur', glow_blur || '8px');
      root.style.setProperty('--hover-shadow-normal', shadow_normal);
      root.style.setProperty('--hover-shadow-hover', shadow_hover);
    }

    // Apply animation timings
    if (effects?.animations) {
      const { timing, curves } = effects.animations as AnimationEffects;
      Object.entries(timing).forEach(([key, value]) => {
        root.style.setProperty(`--animation-timing-${key}`, value);
      });
      Object.entries(curves).forEach(([key, value]) => {
        root.style.setProperty(`--animation-curve-${key}`, value);
      });
    }
  }, [currentTheme, isAdminRoute]);

  useEffect(() => {
    const initializeTheme = async () => {
      try {
        const { data: themeData, error: themeError } = await supabase
          .from('themes')
          .select('*')
          .eq(isAdminRoute ? 'name' : 'is_default', isAdminRoute ? 'Admin Theme' : true)
          .maybeSingle();

        if (themeError) throw themeError;

        if (themeData) {
          const theme = convertDatabaseTheme(themeData);
          setCurrentTheme(theme);
          console.log('Theme set successfully:', theme.name);
        } else {
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
            const theme = convertDatabaseTheme(pageTheme.themes);
            setCurrentTheme(theme);
          }
        }

        await applyThemeVariables();

      } catch (error) {
        console.error('Theme initialization failed:', error);
        toast({
          title: "Theme Error",
          description: "Using fallback theme due to connection issues.",
          variant: "destructive",
        });
      }
    };

    initializeTheme();
  }, [location.pathname, setCurrentTheme, toast, applyThemeVariables, isAdminRoute]);

  const value = {
    currentTheme,
    isLoading,
    error,
    setCurrentTheme,
    fetchPageTheme,
    applyThemeVariables,
    isAdmin,
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
    </ThemeContext.Provider>
  );
};