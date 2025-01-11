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

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const MAX_CALLS_PER_MINUTE = 10;
const MINUTE = 60 * 1000;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuthStore();
  const { hasRole } = useRoleCheck(user, 'admin');
  const [apiCalls, setApiCalls] = useState<number[]>([]);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const [cachedTheme, setCachedTheme] = useState<Theme | null>(null);
  
  const {
    currentTheme,
    setCurrentTheme,
    isLoading,
    error,
    fetchPageTheme
  } = useThemeStore();

  const checkRateLimit = useCallback(() => {
    const now = Date.now();
    const recentCalls = apiCalls.filter(timestamp => now - timestamp < MINUTE);
    
    if (recentCalls.length >= MAX_CALLS_PER_MINUTE) {
      return false;
    }
    
    setApiCalls([...recentCalls, now]);
    return true;
  }, [apiCalls]);

  const applyThemeVariables = useCallback(() => {
    if (!currentTheme?.configuration) {
      console.error('No theme configuration available');
      return;
    }
    
    const root = document.documentElement;
    const { effects, colors } = currentTheme.configuration;

    // Apply color variables
    if (colors?.cyber) {
      Object.entries(colors.cyber).forEach(([key, value]) => {
        if (typeof value === 'string') {
          root.style.setProperty(`--color-cyber-${key}`, value);
        } else if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            root.style.setProperty(
              `--color-cyber-${key}-${subKey.toLowerCase()}`,
              subValue as string
            );
          });
        }
      });
    }

    // Apply effect variables
    if (effects) {
      // Glass effects
      if (effects.glass) {
        const { background, blur, border } = effects.glass;
        root.style.setProperty('--glass-background', background);
        root.style.setProperty('--glass-blur', blur);
        root.style.setProperty('--glass-border', border);
      }

      // Hover effects
      if (effects.hover) {
        const { scale, lift, glow_strength, transition_duration } = effects.hover;
        root.style.setProperty('--hover-scale', scale.toString());
        root.style.setProperty('--hover-lift', lift);
        root.style.setProperty('--hover-glow-strength', glow_strength);
        root.style.setProperty('--hover-transition', transition_duration);
      }

      // Animation effects
      if (effects.animations) {
        const { timing, curves } = effects.animations;
        Object.entries(timing).forEach(([key, value]) => {
          root.style.setProperty(`--animation-${key}`, value);
        });
        Object.entries(curves).forEach(([key, value]) => {
          root.style.setProperty(`--animation-curve-${key}`, value);
        });
      }
    }
  }, [currentTheme]);

  const initializeTheme = useCallback(async () => {
    console.log('Initializing theme...');
    
    const now = Date.now();
    
    if (cachedTheme && (now - lastFetch < CACHE_DURATION)) {
      console.log('Using cached theme');
      setCurrentTheme(cachedTheme);
      return;
    }
    
    if (!checkRateLimit()) {
      console.log('Rate limit exceeded');
      toast({
        title: "Rate limit exceeded",
        description: "Please try again in a minute",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data: themeData, error } = await supabase
        .from('themes')
        .select('*')
        .eq('is_default', true)
        .single();

      if (error) throw error;

      if (themeData) {
        // Ensure the configuration is properly structured
        if (!isThemeConfiguration(themeData.configuration)) {
          throw new Error('Invalid theme configuration structure');
        }

        const theme: Theme = {
          id: themeData.id,
          name: themeData.name,
          description: themeData.description || '',
          is_default: !!themeData.is_default,
          status: themeData.status || 'active',
          configuration: themeData.configuration,
          created_by: themeData.created_by,
          created_at: themeData.created_at,
          updated_at: themeData.updated_at
        };

        setCurrentTheme(theme);
        setCachedTheme(theme);
        setLastFetch(now);
      }
    } catch (error) {
      console.error('Theme initialization failed:', error);
      toast({
        title: "Theme Error",
        description: "Failed to load theme configuration",
        variant: "destructive"
      });
    }
  }, [setCurrentTheme, checkRateLimit, toast, cachedTheme, lastFetch]);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  useEffect(() => {
    applyThemeVariables();
  }, [applyThemeVariables]);

  const value = {
    currentTheme,
    isLoading,
    error,
    setCurrentTheme,
    fetchPageTheme,
    isAdmin: hasRole,
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
    </ThemeContext.Provider>
  );
};