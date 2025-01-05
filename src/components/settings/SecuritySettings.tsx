import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const SecuritySettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Security settings updated",
      description: "Your security settings have been saved successfully.",
    });
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>
          Manage your account security and privacy settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Two-Factor Authentication</Label>
            <p className="text-sm text-muted-foreground">
              Add an extra layer of security to your account
            </p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Session Timeout</Label>
            <p className="text-sm text-muted-foreground">
              Automatically log out after period of inactivity
            </p>
          </div>
          <Switch />
        </div>

        <div className="space-y-2">
          <Label>Password Requirements</Label>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Switch defaultChecked />
              <span className="text-sm">Require uppercase letters</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch defaultChecked />
              <span className="text-sm">Require numbers</span>
            </div>
            <div className="flex items-center gap-2">
              <Switch defaultChecked />
              <span className="text-sm">Require special characters</span>
            </div>
          </div>
        </div>
        
        <Button onClick={handleSave} className="w-full">Save Changes</Button>
      </CardContent>
    </Card>
  );
};