import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuthStore } from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { WizardSteps } from "./wizard/WizardSteps";
import { WizardConfig } from "./wizard/types";

interface ConnectionWizardProps {
  platform: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectionWizard = ({ platform, isOpen, onClose }: ConnectionWizardProps) => {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<WizardConfig>({
    clientId: "",
    clientSecret: "",
    redirectUri: window.location.origin + "/auth/callback",
    connectionLabel: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const platformDisplayName = {
    facebook: "Facebook",
    instagram: "Instagram",
    twitter: "Twitter/X",
    linkedin: "LinkedIn",
    youtube: "YouTube",
  }[platform] || platform;

  const handleNext = () => {
    if (step === 2 && !config.connectionLabel) {
      toast.error("Please provide a label for this connection");
      return;
    }
    
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

  const handleComplete = async () => {
    if (!user) {
      toast.error("You must be logged in to connect social accounts");
      return;
    }

    if (!config.connectionLabel) {
      toast.error("Please provide a label for this connection");
      return;
    }

    try {
      const { error } = await supabase
        .from("social_connections")
        .insert([
          {
            user_id: user.id,
            platform,
            platform_username: config.clientId,
            access_token: config.clientSecret,
            status: "active",
            connection_name: config.connectionLabel,
            account_type: "Business",
          },
        ]);

      if (error) throw error;

      toast.success(`${platformDisplayName} configuration saved successfully`);
      queryClient.invalidateQueries({ queryKey: ["social-connections"] });
      onClose();
      setStep(1);
      setConfig({
        clientId: "",
        clientSecret: "",
        redirectUri: window.location.origin + "/auth/callback",
        connectionLabel: "",
      });
    } catch (error) {
      console.error("Error saving configuration:", error);
      toast.error(`Failed to save ${platformDisplayName} configuration`);
    }
  };

  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonConfig = JSON.parse(e.target?.result as string);
        if (jsonConfig.clientId && jsonConfig.clientSecret) {
          setConfig({
            ...config,
            clientId: jsonConfig.clientId,
            clientSecret: jsonConfig.clientSecret,
          });
          toast.success("Configuration imported successfully");
        } else {
          toast.error("Invalid configuration file format");
        }
      } catch (error) {
        toast.error("Failed to parse configuration file");
      }
    };
    reader.readAsText(file);
  };

  const handleExportConfig = () => {
    const configData = JSON.stringify({
      clientId: config.clientId,
      clientSecret: config.clientSecret,
      redirectUri: config.redirectUri,
    }, null, 2);

    const blob = new Blob([configData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${platform}-config.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <WizardSteps
          step={step}
          config={config}
          setConfig={setConfig}
          platformDisplayName={platformDisplayName}
          fileInputRef={fileInputRef}
          handleFileImport={handleFileImport}
          handleExportConfig={handleExportConfig}
        />
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