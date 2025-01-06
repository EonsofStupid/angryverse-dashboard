import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, LogOut, Database, User, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";

interface UserProfileProps {
  onClose: () => void;
  isAdmin: boolean;
  isCheckingRole: boolean;
}

export const UserProfile = ({ onClose, isAdmin, isCheckingRole }: UserProfileProps) => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      onClose();
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  return (
    <>
      <div className="flex items-center gap-2 p-2">
        <Avatar>
          <AvatarFallback>
            {user.email?.[0].toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{user.email}</span>
          {isCheckingRole ? (
            <span className="text-sm text-muted-foreground">Checking permissions...</span>
          ) : isAdmin && (
            <span className="text-sm text-muted-foreground">Admin</span>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        className="justify-start gap-2"
        onClick={() => {
          toast({
            title: "Settings",
            description: "Settings page coming soon!",
          });
        }}
      >
        <Settings className="h-5 w-5" />
        Settings
      </Button>

      {!isCheckingRole && isAdmin && (
        <>
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={() => {
              navigate("/portal");
              onClose();
            }}
          >
            <LayoutDashboard className="h-5 w-5" />
            Portal
          </Button>
          <Button
            variant="ghost"
            className="justify-start gap-2"
            onClick={() => {
              navigate("/admin");
              onClose();
            }}
          >
            <Database className="h-5 w-5" />
            Admin Dashboard
          </Button>
        </>
      )}

      <Button
        variant="ghost"
        className="justify-start gap-2"
        onClick={handleSignOut}
      >
        <LogOut className="h-5 w-5" />
        Log Out
      </Button>
    </>
  );
};