import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, Database, LayoutDashboard, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";

interface UserProfileProps {
  onClose: () => void;
}

export const UserProfile = ({ onClose }: UserProfileProps) => {
  const { user, isAdmin, signOut } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      console.log('Initiating sign out');
      await signOut();
      console.log('Sign out successful, navigating to home');
      onClose();
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

  const handleAdminNavigation = (route: string) => {
    console.log('Navigating to admin route:', route);
    navigate(route);
    onClose();
  };

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
            {user?.email?.[0].toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-primary">{user?.email}</span>
          {isAdmin && (
            <span className="text-sm text-primary/60">Admin</span>
          )}
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

      {isAdmin && (
        <>
          <Button
            variant="ghost"
            className="justify-start gap-2 hover:bg-primary/10 hover:text-primary"
            onClick={() => handleAdminNavigation("/admin/portal")}
          >
            <LayoutDashboard className="h-5 w-5" />
            Portal
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-2 hover:bg-primary/10 hover:text-primary"
            onClick={() => handleAdminNavigation("/admin")}
          >
            <Database className="h-5 w-5" />
            Admin Dashboard
          </Button>
        </>
      )}

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