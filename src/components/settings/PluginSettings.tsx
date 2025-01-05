import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const PluginSettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Plugins updated",
      description: "Your plugin settings have been saved successfully.",
    });
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Plugin Management</CardTitle>
        <CardDescription>
          Enable or disable plugins and manage their settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {[
            { name: "Chat Integration", description: "Enable real-time chat features" },
            { name: "Analytics", description: "Track site usage and performance" },
            { name: "Social Share", description: "Add social media sharing buttons" },
            { name: "Comments", description: "Enable user comments on posts" }
          ].map((plugin) => (
            <div key={plugin.name} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="font-medium">{plugin.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {plugin.description}
                </p>
              </div>
              <Switch />
            </div>
          ))}
        </div>
        
        <Button onClick={handleSave} className="w-full">Save Changes</Button>
      </CardContent>
    </Card>
  );
};