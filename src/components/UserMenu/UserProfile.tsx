import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

interface UserProfileProps {
  onClose: () => void;
}

export const UserProfile = ({ onClose }: UserProfileProps) => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      console.log('Initiating sign out');
      onClose();
      await signOut();
      console.log('Sign out successful, navigating to home');
      navigate("/");
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
    toast({
      title: "Settings",
      description: "Settings page coming soon!",
    });
  };

  if (!user) return null;

  return (
    <div className={cn(
      "flex flex-col gap-4 p-4",
      "bg-background/80 backdrop-blur-md",
      "border border-primary/10",
      "rounded-lg shadow-xl",
      "animate-in fade-in-0 slide-in-from-top-5",
    )}>
      <div className="flex items-center gap-2 p-2">
        <Avatar>
          <AvatarFallback>
            {user.email?.[0].toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-primary">{user.email}</span>
        </div>
      </div>

      <Button
        variant="ghost"
        className="justify-start gap-2 hover:bg-primary/10 hover:text-primary"
        onClick={handleSettingsClick}
      >
        <Settings className="h-5 w-5" />
        Settings
      </Button>

      <Button
        variant="ghost"
        className="justify-start gap-2 hover:bg-destructive/10 hover:text-destructive"
        onClick={handleSignOut}
      >
        <LogOut className="h-5 w-5" />
        Log Out
      </Button>
    </div>
  );
};