import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, LogOut, Database, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

interface UserProfileProps {
  user: any;
  isAdmin: boolean;
  onSignOut: () => Promise<void>;
  onSettingsClick: () => void;
  onClose: () => void;
}

export const UserProfile = ({ 
  user, 
  isAdmin, 
  onSignOut, 
  onSettingsClick,
  onClose 
}: UserProfileProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAdminNavigation = async (route: string) => {
    console.log('Admin Navigation: Attempting to navigate to', route);
    
    try {
      // Log the admin access attempt
      await supabase.from('auth_security_logs').insert({
        user_id: user.id,
        event_type: 'admin_navigation_attempt',
        metadata: {
          route,
          timestamp: new Date().toISOString()
        }
      });

      navigate(route);
      onClose();
      
      toast({
        title: "Accessing Admin Area",
        description: "Please wait while we verify your permissions...",
      });
      
    } catch (error) {
      console.error('Admin Navigation: Error logging navigation attempt:', error);
      toast({
        title: "Navigation Error",
        description: "There was an error accessing the admin area. Please try again.",
        variant: "destructive"
      });
    }
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
          {isAdmin && (
            <span className="text-sm text-primary/60">Admin</span>
          )}
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
        onClick={onSignOut}
      >
        <LogOut className="h-5 w-5" />
        Log Out
      </Button>
    </div>
  );
};