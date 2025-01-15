import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useThemeStore } from "@/store/useThemeStore";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import type { Theme, ThemeConfiguration } from "@/types/theme/core";
import { useAuthStore } from "@/store/useAuthStore";

const isValidThemeConfiguration = (config: unknown): config is ThemeConfiguration => {
  if (typeof config !== 'object' || !config) return false;
  
  const conf = config as any;
  return (
    conf.colors?.cyber &&
    conf.typography?.fonts &&
    conf.effects?.glass &&
    typeof conf.effects.glass.background === 'string' &&
    typeof conf.effects.glass.blur === 'string' &&
    typeof conf.effects.glass.border === 'string' &&
    conf.effects.glass.shadow_composition
  );
};

export const ThemeSettings = () => {
  const { theme, setTheme, currentTheme, setCurrentTheme } = useThemeStore();
  const { user } = useAuthStore();
  const { toast } = useToast();

  const restoreDefaultTheme = async () => {
    try {
      const { data: defaultTheme, error } = await supabase
        .from('theme_presets')
        .select('*')
        .eq('name', 'Modern Glass Theme')
        .single();

      if (error) throw error;

      if (defaultTheme) {
        if (!isValidThemeConfiguration(defaultTheme.configuration)) {
          throw new Error('Invalid theme configuration structure');
        }

        const updatedTheme: Theme = {
          id: currentTheme?.id || 'default',
          name: 'Default Theme',
          description: 'Default application theme',
          is_default: true,
          status: 'active',
          configuration: defaultTheme.configuration,
          created_by: user?.id || '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        setCurrentTheme(updatedTheme);
        toast({
          title: "Default theme restored",
          description: "Your theme has been reset to the default configuration.",
        });
      }
    } catch (error) {
      console.error('Error restoring default theme:', error);
      toast({
        title: "Error",
        description: "Failed to restore default theme.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!currentTheme) {
      restoreDefaultTheme();
    }
  }, []);

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
        <CardDescription>
          Customize the look and feel of your site
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Label>Theme Mode</Label>
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant={theme === 'light' ? 'default' : 'outline'}
              onClick={() => setTheme('light')}
              className="w-full"
            >
              Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'default' : 'outline'}
              onClick={() => setTheme('dark')}
              className="w-full"
            >
              Dark
            </Button>
            <Button
              variant={theme === 'system' ? 'default' : 'outline'}
              onClick={() => setTheme('system')}
              className="w-full"
            >
              System
            </Button>
          </div>
        </div>
        
        <Button 
          onClick={restoreDefaultTheme} 
          className="w-full hover-glow bg-gradient-to-r from-cyber-pink via-cyber-purple to-cyber-cyan"
        >
          Restore Default Theme
        </Button>
      </CardContent>
    </Card>
  );
};