import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

export const PageThemes = () => {
  const { data: pageThemes, isLoading } = useQuery({
    queryKey: ['page-themes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('page_themes')
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
          <CardTitle>Page Themes</CardTitle>
          <CardDescription>Manage themes for specific pages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pageThemes?.map((pageTheme) => (
              <Card key={pageTheme.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{pageTheme.page_path}</h3>
                    <p className="text-sm text-muted-foreground">
                      Theme: {pageTheme.themes?.name}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Change Theme</Button>
                    <Button variant="outline" size="sm">Preview</Button>
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