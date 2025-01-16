import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, LogOut, Database, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";

interface UserMenuContentProps {
  onClose: () => void;
  isAdmin: boolean;
}

export const UserMenuContent = ({ onClose, isAdmin }: UserMenuContentProps) => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleSignOut = async () => {
    try {
      onClose();
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  return (
    <div className={cn(
      "flex flex-col gap-4 p-4",
      "bg-background/80 backdrop-blur-md",
      "border border-primary/10",
      "rounded-lg shadow-xl",
      "animate-in fade-in-0 slide-in-from-top-5",
      isVisible ? "opacity-100" : "opacity-0",
    )}>
      <div className="flex items-center gap-2 p-2">
        <Avatar>
          <AvatarFallback>
            {user.email?.[0].toUpperCase() ?? "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-primary">{user.email}</span>
          {isAdmin && (
            <span className="text-sm text-primary/60">Admin</span>
          )}
        </div>
      </div>

      <Button
        variant="ghost"
        className="justify-start gap-2 hover:bg-primary/10 hover:text-primary"
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

      {isAdmin && (
        <>
          <Button
            variant="ghost"
            className="justify-start gap-2 hover:bg-primary/10 hover:text-primary"
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
            className="justify-start gap-2 hover:bg-primary/10 hover:text-primary"
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
        className="justify-start gap-2 hover:bg-destructive/10 hover:text-destructive"
        onClick={handleSignOut}
      >
        <LogOut className="h-5 w-5" />
        Log Out
      </Button>
    </div>
  );
};