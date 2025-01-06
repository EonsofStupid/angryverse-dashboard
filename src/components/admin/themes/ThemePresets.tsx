import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const ThemePresets = () => {
  const { data: presets, isLoading } = useQuery({
    queryKey: ['theme-presets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('theme_presets')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme Presets</CardTitle>
          <CardDescription>Browse and apply pre-configured theme presets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {presets?.map((preset) => (
              <Card key={preset.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{preset.name}</h3>
                    <p className="text-sm text-muted-foreground">{preset.description}</p>
                    {preset.category && (
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {preset.category}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Preview</Button>
                    <Button variant="default" size="sm">Apply</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};