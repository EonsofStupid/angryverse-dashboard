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
      
      // Apply color variables with proper CSS variable naming
      if (currentTheme.configuration.colors?.cyber) {
        Object.entries(currentTheme.configuration.colors.cyber).forEach(([key, value]) => {
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

      // Apply effect variables with proper scoping
      if (currentTheme.configuration.effects) {
        const { glass, hover, animations } = currentTheme.configuration.effects;
        
        // Glass effects
        if (glass) {
          root.style.setProperty('--theme-glass-background', glass.background);
          root.style.setProperty('--theme-glass-blur', glass.blur);
          root.style.setProperty('--theme-glass-border', glass.border);
          
          if (glass.shadow_composition) {
            Object.entries(glass.shadow_composition).forEach(([key, value]) => {
              root.style.setProperty(`--theme-glass-shadow-${key}`, value.toString());
            });
          }
        }

        // Hover effects
        if (hover) {
          root.style.setProperty('--theme-hover-scale', hover.scale.toString());
          root.style.setProperty('--theme-hover-lift', hover.lift);
          root.style.setProperty('--theme-hover-glow-strength', hover.glow_strength);
          root.style.setProperty('--theme-hover-transition', hover.transition_duration);
          root.style.setProperty('--theme-hover-glow-color', hover.glow_color);
          root.style.setProperty('--theme-hover-shadow-normal', hover.shadow_normal);
          root.style.setProperty('--theme-hover-shadow-hover', hover.shadow_hover);
        }

        // Animation effects
        if (animations) {
          Object.entries(animations.timing).forEach(([key, value]) => {
            root.style.setProperty(`--theme-animation-${key}`, value);
          });
          Object.entries(animations.curves).forEach(([key, value]) => {
            root.style.setProperty(`--theme-animation-curve-${key}`, value);
          });
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
