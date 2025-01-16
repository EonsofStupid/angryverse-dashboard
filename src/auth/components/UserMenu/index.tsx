import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/store/useAuthStore";
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { UserMenuTrigger } from "./UserMenuTrigger";
import { UserMenuContent } from "./UserMenuContent";
import { AuthDialog } from "./AuthDialog";

export const UserMenu = () => {
  const { user, signOut } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  if (!user) {
    return (
      <>
        <Button 
          variant="ghost" 
          className="hover:bg-white/10"
          onClick={() => setAuthDialogOpen(true)}
        >
          Sign In
        </Button>
        <AuthDialog 
          open={authDialogOpen} 
          onOpenChange={setAuthDialogOpen} 
        />
      </>
    );
  }

  return (
    <DropdownMenu>
      <UserMenuTrigger user={user} />
      <UserMenuContent 
        user={user} 
        isAdmin={isAdmin} 
        signOut={signOut}
      />
    </DropdownMenu>
  );
};