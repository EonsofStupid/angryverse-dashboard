import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { UserMenuTrigger } from "./UserMenuTrigger";
import { UserProfile } from "./UserProfile";
import { AuthForm } from "./AuthForm";

const THEME_COLORS = [
  'rgba(139, 92, 246, 0.8)',   // Vivid Purple
  'rgba(217, 70, 239, 0.8)',   // Magenta Pink
  'rgba(249, 115, 22, 0.8)',   // Bright Orange
  'rgba(14, 165, 233, 0.8)',   // Ocean Blue
  'rgba(255, 0, 127, 0.8)',    // Cyber Pink
  'rgba(0, 255, 245, 0.8)',    // Cyber Cyan
  'rgba(121, 40, 202, 0.8)'    // Cyber Purple
];

const getRandomColors = () => {
  const shuffled = [...THEME_COLORS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * 2) + 4);
};

export const UserMenu = () => {
  console.log("UserMenu component rendering"); // Debug log

  const [open, setOpen] = useState(false);
  const { user, isAdmin, isLoading, signOut } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const colors = getRandomColors();

  console.log("Auth store state:", { // Debug log
    user,
    isAdmin,
    isLoading
  });

  const handleSignOut = async () => {
    try {
      console.log("Attempting sign out"); // Debug log
      setOpen(false);
      await signOut();
      navigate("/");
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
    toast({
      title: "Settings",
      description: "Settings page coming soon!",
    });
  };

  console.log("Rendering UserMenu with state:", { open, isLoading }); // Debug log

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <UserMenuTrigger 
          onClick={() => {
            console.log("UserMenuTrigger clicked"); // Debug log
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