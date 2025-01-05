import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useThemeStore } from "@/store/useThemeStore";

export const ThemeSettings = () => {
  const { theme, setTheme } = useThemeStore();
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Theme updated",
      description: "Your theme settings have been saved successfully.",
    });
  };

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
        
        <Button onClick={handleSave} className="w-full">Save Changes</Button>
      </CardContent>
    </Card>
  );
};