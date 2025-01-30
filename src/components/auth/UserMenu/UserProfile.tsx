import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

interface UserProfileProps {
  user: any;
  onSignOut: () => Promise<void>;
  onSettingsClick: () => void;
  onClose: () => void;
}

export const UserProfile = ({ 
  user, 
  onSignOut, 
  onSettingsClick,
  onClose 
}: UserProfileProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userRole, isAdmin } = useAuthStore();

  const handleAdminNavigation = (route: string) => {
    navigate(route);
    onClose();
    toast({
      title: "Accessing Admin Area",
      description: "Please wait while we verify your permissions...",
    });
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
            {user.email?.[0].toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-primary">{user.email}</span>
          <span className="text-sm text-primary/60">
            {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'Loading...'}
          </span>
        </div>
      </div>

      <Button
        variant="ghost"
        className="justify-start gap-2 hover:bg-primary/10 hover:text-primary"
        onClick={onSettingsClick}
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
            Portal
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-2 hover:bg-primary/10 hover:text-primary"
            onClick={() => handleAdminNavigation("/admin")}
          >
            Admin Dashboard
          </Button>
        </>
      )}

      <Button
        variant="ghost"
        className="justify-start gap-2 hover:bg-destructive/10 hover:text-destructive"
        onClick={onSignOut}
      >
        <LogOut className="h-5 w-5" />
        Log Out
      </Button>
    </div>
  );
};