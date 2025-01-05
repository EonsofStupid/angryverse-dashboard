import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface ConnectionWizardProps {
  platform: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectionWizard = ({ platform, isOpen, onClose }: ConnectionWizardProps) => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState({
    clientId: "",
    clientSecret: "",
    redirectUri: window.location.origin + "/auth/callback",
  });

  const platformDisplayName = {
    facebook: "Facebook",
    instagram: "Instagram",
    twitter: "Twitter/X",
    linkedin: "LinkedIn",
    youtube: "YouTube",
  }[platform] || platform;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    // Here we'll implement the actual OAuth flow
    toast.info(`Configuration saved for ${platformDisplayName}`);
    onClose();
    setStep(1);
    setConfig({
      clientId: "",
      clientSecret: "",
      redirectUri: window.location.origin + "/auth/callback",
    });
  };

  const renderStep = () => {
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
                Enter the API credentials from your {platformDisplayName} Developer Console.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        {renderStep()}
        <DialogFooter>
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button onClick={handleNext}>
            {step === 3 ? "Connect" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};