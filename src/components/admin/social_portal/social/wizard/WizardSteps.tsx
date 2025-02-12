import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WizardConfig } from "@/types/social";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink } from "lucide-react";

interface WizardStepsProps {
  step: number;
  config: WizardConfig;
  setConfig: (config: WizardConfig) => void;
  platformDisplayName: string;
  platform: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleExportConfig: () => void;
}

export const WizardSteps = ({
  step,
  config,
  setConfig,
  platformDisplayName,
  platform,
  fileInputRef,
  handleFileImport,
  handleExportConfig,
}: WizardStepsProps) => {
  if (platform === 'facebook_video') {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Connect to Facebook Video</DialogTitle>
          <DialogDescription>
            To access Facebook video feeds, you'll need to:
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Alert>
            <AlertDescription>
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to Facebook Business Settings</li>
                <li>Create or select your Business Account</li>
                <li>Navigate to System Users</li>
                <li>Create a System User with admin access</li>
                <li>Generate a token with the following permissions:
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>pages_read_engagement</li>
                    <li>pages_show_list</li>
                    <li>pages_read_user_content</li>
                    <li>read_insights</li>
                  </ul>
                </li>
              </ol>
            </AlertDescription>
          </Alert>
          
          <div className="space-y-2">
            <Label htmlFor="connectionLabel">Connection Label</Label>
            <Input
              id="connectionLabel"
              placeholder="e.g., Business Page Videos"
              value={config.connectionLabel}
              onChange={(e) =>
                setConfig({ ...config, connectionLabel: e.target.value })
              }
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientId">Page ID</Label>
            <Input
              id="clientId"
              placeholder="Your Facebook Page ID"
              value={config.clientId}
              onChange={(e) =>
                setConfig({ ...config, clientId: e.target.value })
              }
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clientSecret">Access Token</Label>
            <Input
              id="clientSecret"
              type="password"
              placeholder="Your System User Access Token"
              value={config.clientSecret}
              onChange={(e) =>
                setConfig({ ...config, clientSecret: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => window.open('https://business.facebook.com/settings/system-users', '_blank')}>
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Business Settings
            </Button>
          </div>
        </div>
      </>
    );
  }

  switch (step) {
    case 1:
      return (
        <>
          <DialogHeader>
            <DialogTitle>Connect to {platformDisplayName}</DialogTitle>
            <DialogDescription>
              Let's set up your {platformDisplayName} integration. First, you'll need to create an
              application in the {platformDisplayName} Developer Console.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p>Follow these steps:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Go to the {platformDisplayName} Developer Console</li>
                <li>Create a new application or project</li>
                <li>Note down your Client ID and Client Secret</li>
                <li>Add {config.redirectUri} to your authorized redirect URIs</li>
              </ol>
            </div>
          </div>
        </>
      );
    case 2:
      return (
        <>
          <DialogHeader>
            <DialogTitle>Enter API Credentials</DialogTitle>
            <DialogDescription>
              Enter the API credentials from your {platformDisplayName} Developer Console or import from a JSON file.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex gap-2 mb-4">
              <input
                type="file"
                accept=".json"
                onChange={handleFileImport}
                ref={fileInputRef}
                className="hidden"
              />
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                Import JSON
              </Button>
              {(config.clientId || config.clientSecret) && (
                <Button variant="outline" onClick={handleExportConfig}>
                  Export JSON
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="connectionLabel">Connection Label</Label>
              <Input
                id="connectionLabel"
                placeholder="e.g., Marketing Bot, Personal Account"
                value={config.connectionLabel}
                onChange={(e) =>
                  setConfig({ ...config, connectionLabel: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientId">Client ID</Label>
              <Input
                id="clientId"
                value={config.clientId}
                onChange={(e) =>
                  setConfig({ ...config, clientId: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="clientSecret">Client Secret</Label>
              <Input
                id="clientSecret"
                type="password"
                value={config.clientSecret}
                onChange={(e) =>
                  setConfig({ ...config, clientSecret: e.target.value })
                }
              />
            </div>
          </div>
        </>
      );
    case 3:
      return (
        <>
          <DialogHeader>
            <DialogTitle>Review and Connect</DialogTitle>
            <DialogDescription>
              Review your configuration and connect to {platformDisplayName}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <p>Configuration Summary:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Platform: {platformDisplayName}</li>
                <li>Label: {config.connectionLabel}</li>
                <li>Client ID: {config.clientId.slice(0, 8)}...</li>
                <li>Redirect URI: {config.redirectUri}</li>
              </ul>
            </div>
          </div>
        </>
      );
    default:
      return null;
  }
};
