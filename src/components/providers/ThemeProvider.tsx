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
import type { Theme } from '@/types/theme/core';

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

  const initializeTheme = useCallback(async () => {
    console.log('Initializing theme...');
    try {
      // First try to get a page-specific theme
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
        console.log('Found page-specific theme:', pageTheme.themes);
        setCurrentTheme(pageTheme.themes as Theme);
        setIsInitialized(true);
        return;
      }

      // If no page theme, get the default theme
      const { data: defaultTheme, error: defaultError } = await supabase
        .from('themes')
        .select('*')
        .eq('is_default', true)
        .maybeSingle();

      if (defaultError) throw defaultError;

      if (defaultTheme) {
        console.log('Loading default theme:', defaultTheme);
        if (!isThemeConfiguration(defaultTheme.configuration)) {
          throw new Error('Invalid theme configuration structure');
        }
        setCurrentTheme(defaultTheme as Theme);
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

  useEffect(() => {
    if (!isInitialized) {
      initializeTheme();
    }
  }, [isInitialized, initializeTheme]);

  useEffect(() => {
    if (currentTheme?.configuration) {
      const root = document.documentElement;
      
      // Apply color variables
      if (currentTheme.configuration.colors?.cyber) {
        Object.entries(currentTheme.configuration.colors.cyber).forEach(([key, value]) => {
          if (typeof value === 'string') {
            root.style.setProperty(`--theme-colors-cyber-${key}`, value);
          } else if (typeof value === 'object' && value !== null) {
            Object.entries(value).forEach(([subKey, subValue]) => {
              root.style.setProperty(
                `--theme-colors-cyber-${key}-${subKey.toLowerCase()}`,
                subValue as string
              );
            });
          }
        });
      }

      // Apply effect variables
      if (currentTheme.configuration.effects) {
        const { glass, hover, animations } = currentTheme.configuration.effects;
        
        // Glass effects
        if (glass) {
          root.style.setProperty('--glass-background', glass.background);
          root.style.setProperty('--glass-blur', glass.blur);
          root.style.setProperty('--glass-border', glass.border);
        }

        // Hover effects
        if (hover) {
          root.style.setProperty('--hover-scale', hover.scale.toString());
          root.style.setProperty('--hover-lift', hover.lift);
          root.style.setProperty('--hover-glow-strength', hover.glow_strength);
          root.style.setProperty('--hover-transition', hover.transition_duration);
        }

        // Animation effects
        if (animations) {
          Object.entries(animations.timing).forEach(([key, value]) => {
            root.style.setProperty(`--animation-${key}`, value);
          });
          Object.entries(animations.curves).forEach(([key, value]) => {
            root.style.setProperty(`--animation-curve-${key}`, value);
          });
        }
      }
    }
  }, [currentTheme]);

  const value = {
    currentTheme,
    isLoading,
    error,
    setCurrentTheme,
    fetchPageTheme,
    isAdmin,
    applyThemeVariables: () => {} // This is a placeholder for now
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