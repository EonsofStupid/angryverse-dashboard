import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const Settings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Allow New Signups</Label>
            <p className="text-sm text-muted-foreground">
              Enable or disable new user registrations
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Email Verification Required</Label>
            <p className="text-sm text-muted-foreground">
              Require email verification before allowing access
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Auto-suspend Inactive Users</Label>
            <p className="text-sm text-muted-foreground">
              Automatically suspend users after 30 days of inactivity
            </p>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};