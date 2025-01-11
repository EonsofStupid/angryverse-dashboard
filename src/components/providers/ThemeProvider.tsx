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
import type { ThemeEffects } from '@/types/theme/utils/effects';

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

  const convertDatabaseTheme = useCallback((dbTheme: any): Theme => {
    const configuration = dbTheme.configuration as ThemeConfiguration;
    
    // Ensure effects structure is complete
    if (!configuration.effects) {
      configuration.effects = {
        glass: {
          enabled: true,
          priority: 'database',
          source: 'database',
          background: 'rgba(0, 0, 0, 0.1)',
          blur: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          shadow_composition: {
            offset_y: '4px',
            blur_radius: '6px',
            spread_radius: '0px',
            opacity: 0.1
          }
        },
        hover: {
          scale: 1.05,
          lift: '-4px',
          glow_strength: '10px',
          transition_duration: '300ms',
          shadow_normal: '0 4px 6px rgba(0, 0, 0, 0.1)',
          shadow_hover: '0 8px 12px rgba(0, 0, 0, 0.15)'
        },
        animations: {
          timing: {
            fast: '100ms',
            normal: '200ms',
            slow: '300ms',
            very_slow: '1000ms'
          },
          curves: {
            linear: 'linear',
            ease_out: 'cubic-bezier(0, 0, 0.2, 1)',
            ease_in: 'cubic-bezier(0.4, 0, 1, 1)',
            ease_in_out: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }
        }
      };
    }

    if (!isThemeConfiguration(configuration)) {
      console.error('Invalid theme configuration:', configuration);
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
  }, []);

  const applyThemeVariables = useCallback(() => {
    if (!currentTheme?.configuration?.effects) return;
    
    const root = document.documentElement;
    const effects = currentTheme.configuration.effects;

    // Apply glass effect variables
    if (effects.glass) {
      root.style.setProperty('--glass-background', effects.glass.background);
      root.style.setProperty('--glass-blur', effects.glass.blur);
      root.style.setProperty('--glass-border', effects.glass.border);
    }

    // Apply hover effect variables
    if (effects.hover) {
      root.style.setProperty('--hover-scale', effects.hover.scale.toString());
      root.style.setProperty('--hover-lift', effects.hover.lift);
      root.style.setProperty('--hover-glow-strength', effects.hover.glow_strength);
      root.style.setProperty('--hover-transition', effects.hover.transition_duration);
    }

    // Apply animation variables
    if (effects.animations) {
      Object.entries(effects.animations.timing).forEach(([key, value]) => {
        root.style.setProperty(`--animation-${key}`, value);
      });
      Object.entries(effects.animations.curves).forEach(([key, value]) => {
        root.style.setProperty(`--animation-curve-${key}`, value);
      });
    }
  }, [currentTheme]);

  useEffect(() => {
    applyThemeVariables();
  }, [applyThemeVariables]);

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
        const convertedTheme = convertDatabaseTheme(themeData);
        setCurrentTheme(convertedTheme);
        setCachedTheme(convertedTheme);
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
  }, [setCurrentTheme, convertDatabaseTheme, toast, checkRateLimit, cachedTheme, lastFetch]);

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

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