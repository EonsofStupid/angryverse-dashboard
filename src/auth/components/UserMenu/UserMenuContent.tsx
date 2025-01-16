import { useNavigate } from "react-router-dom";
import { LogOut, Settings, Database, LayoutDashboard } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

interface UserMenuContentProps {
  user: User;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

export const UserMenuContent = ({ user, isAdmin, signOut }: UserMenuContentProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  return (
    <DropdownMenuContent className="w-56 glass-frost" align="end">
      <div className="flex items-center gap-2 p-2">
        <div className="flex flex-col space-y-1">
          <p className="text-sm font-medium">{user.email}</p>
          {isAdmin && (
            <p className="text-xs text-muted-foreground">Administrator</p>
          )}
        </div>
      </div>

      <DropdownMenuSeparator />

      {isAdmin && (
        <>
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => navigate("/admin")}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Admin Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="cursor-pointer"
            onClick={() => navigate("/admin/portal")}
          >
            <Database className="mr-2 h-4 w-4" />
            Portal
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </>
      )}

      <DropdownMenuItem 
        className="cursor-pointer"
        onClick={() => navigate("/settings")}
      >
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </DropdownMenuItem>

      <DropdownMenuItem 
        className="cursor-pointer text-destructive focus:text-destructive"
        onClick={handleSignOut}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
};