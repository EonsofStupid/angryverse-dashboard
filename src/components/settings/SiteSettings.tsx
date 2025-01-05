import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export const SiteSettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your site settings have been updated successfully.",
    });
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Site Settings</CardTitle>
        <CardDescription>
          Manage your site's general settings and configurations
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="site-name">Site Name</Label>
          <Input id="site-name" defaultValue="AngryGaming" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="site-description">Site Description</Label>
          <Input id="site-description" defaultValue="Your gaming community hub" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Maintenance Mode</Label>
            <p className="text-sm text-muted-foreground">
              Temporarily disable public access to the site
            </p>
          </div>
          <Switch />
        </div>
        
        <Button onClick={handleSave} className="w-full">Save Changes</Button>
      </CardContent>
    </Card>
  );
};