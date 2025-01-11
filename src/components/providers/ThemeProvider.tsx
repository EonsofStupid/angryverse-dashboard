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
import type { GlassEffects } from '@/types/theme/utils/effects/glass';
import type { HoverEffects } from '@/types/theme/utils/effects/hover';
import type { AnimationEffects } from '@/types/theme/utils/animation';

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Rate limiting - max calls per minute
const MAX_CALLS_PER_MINUTE = 10;
const MINUTE = 60 * 1000;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { toast } = useToast();
  const { isAdmin } = useRoleCheck();
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
    console.log('Converting database theme:', dbTheme);
    console.log('Parsed configuration:', configuration);
    
    // Ensure glass effects are present
    if (!configuration.effects) {
      configuration.effects = {};
    }
    
    if (!configuration.effects.glass) {
      configuration.effects.glass = {
        background: 'rgba(0, 0, 0, 0.1)',
        blur: '8px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        shadow_composition: {
          offset_y: '4px',
          blur_radius: '6px',
          spread_radius: '0px',
          opacity: 0.1
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

  const initializeTheme = useCallback(async () => {
    console.log('Initializing theme...');
    
    const now = Date.now();
    
    // Check cache first
    if (cachedTheme && (now - lastFetch < CACHE_DURATION)) {
      console.log('Using cached theme');
      setCurrentTheme(cachedTheme);
      return;
    }
    
    // Check rate limiting
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

      console.log('Theme data from database:', themeData);
      
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
    isAdmin
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