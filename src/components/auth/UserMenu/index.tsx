import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore"; // Make sure paths are correct
import { AuthForm } from "./UserMenu/AuthForm";
import { UserProfile } from "./UserMenu/UserProfile";
import { UserMenuTrigger } from "./UserMenu/UserMenuTrigger";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const THEME_COLORS = [
  'rgba(139, 92, 246, 0.8)',   
  'rgba(217, 70, 239, 0.8)',   
  'rgba(249, 115, 22, 0.8)',   
  'rgba(14, 165, 233, 0.8)',   
  'rgba(255, 0, 127, 0.8)',    
  'rgba(0, 255, 245, 0.8)',    
  'rgba(121, 40, 202, 0.8)'    
];

const getRandomColors = () => {
  const shuffled = [...THEME_COLORS].sort(() => 0.5 - Math.random());
  const numColors = Math.floor(Math.random() * 2) + 4;
  return shuffled.slice(0, numColors);
};

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useThemeStore();
  const { user, role, isLoading, error, initialize, signOut } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const colors = getRandomColors();

  // Initialize the auth store (fetch session, etc.) once
  useEffect(() => {
    console.log('UserMenu mounted, calling initialize()...');
    initialize();
  }, [initialize]);

  const handleSignOut = async () => {
    try {
      setOpen(false);
      await signOut();
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

  // Derive 'isAdmin' from role in the store
  const isAdmin = role === 'admin';

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <UserMenuTrigger 
          onClick={() => {
            console.log('UserMenu trigger clicked');
            setOpen(true);
          }}
          colors={colors}
        />
      </SheetTrigger>
      <SheetContent 
        side="right"
        className={cn(
          "fixed inset-y-0 right-0",
          "w-[300px] sm:w-[400px]",
          "bg-background/80 backdrop-blur-md",
          "border-l border-primary/10",
          "shadow-lg",
          "z-[100]"
        )}
      >
        <VisuallyHidden>
          <DialogTitle>User Menu</DialogTitle>
          <DialogDescription>
            Access your account settings and manage your profile
          </DialogDescription>
        </VisuallyHidden>
        
        <div className="flex flex-col gap-4 mt-8 p-4">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : !user ? (
            <AuthForm />
          ) : (
            <UserProfile 
              user={user}
              isAdmin={isAdmin}
              onSignOut={handleSignOut}
              onSettingsClick={handleSettingsClick}
              onClose={() => setOpen(false)}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
