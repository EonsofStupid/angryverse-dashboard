import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useThemeStore } from "@/store/useThemeStore";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import type { Theme, ThemeConfiguration } from "@/types/theme";

export const ThemeSettings = () => {
  const { theme, setTheme, currentTheme, setCurrentTheme } = useThemeStore();
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
        const defaultConfiguration: ThemeConfiguration = {
          colors: {
            cyber: {
              dark: "hsl(222, 47%, 11%)",
              pink: {
                DEFAULT: "hsl(327, 73%, 57%)",
                hover: "hsl(327, 73%, 52%)"
              },
              cyan: {
                DEFAULT: "hsl(180, 100%, 50%)",
                hover: "hsl(180, 100%, 45%)"
              },
              purple: "hsl(267, 73%, 57%)",
              green: {
                DEFAULT: "hsl(142, 71%, 45%)",
                hover: "hsl(142, 71%, 40%)"
              },
              yellow: {
                DEFAULT: "hsl(47, 95%, 55%)",
                hover: "hsl(47, 95%, 50%)"
              }
            }
          },
          typography: {
            fonts: {
              sans: ["Inter", "sans-serif"],
              cyber: ["Orbitron", "sans-serif"]
            }
          },
          effects: {
            glass: {
              background: "rgba(255, 255, 255, 0.1)",
              blur: "8px",
              border: "1px solid rgba(255, 255, 255, 0.2)"
            }
          }
        };

        const updatedTheme: Theme = {
          id: currentTheme?.id || 'default',
          name: 'Default Theme',
          description: 'Default application theme',
          is_default: true,
          status: 'active',
          configuration: defaultConfiguration,
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