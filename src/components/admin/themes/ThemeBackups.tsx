import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const ThemeBackups = () => {
  const { data: backups, isLoading } = useQuery({
    queryKey: ['theme-backups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('theme_backups')
        .select(`
          *,
          themes:theme_id (
            name,
            description
          )
        `)
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
          <CardTitle>Theme Backups</CardTitle>
          <CardDescription>View and restore theme backups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {backups?.map((backup) => (
              <Card key={backup.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {backup.themes?.name} - Version {backup.version}
                    </h3>
                    <p className="text-sm text-muted-foreground">{backup.notes}</p>
                    <p className="text-xs text-muted-foreground">
                      Created: {new Date(backup.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Preview</Button>
                    <Button variant="default" size="sm">Restore</Button>
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