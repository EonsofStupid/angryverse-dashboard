import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { UserMenuTrigger } from "./UserMenuTrigger";
import { UserProfile } from "./UserProfile";
import { AuthForm } from "./AuthForm";

// For demonstration, we define theme colors here.
// Could also be stored in a separate file or store.
const THEME_COLORS = [
  "rgba(139, 92, 246, 0.8)",  // Vivid Purple
  "rgba(217, 70, 239, 0.8)",  // Magenta Pink
  "rgba(249, 115, 22, 0.8)",  // Bright Orange
  "rgba(14, 165, 233, 0.8)",  // Ocean Blue
  "rgba(255, 0, 127, 0.8)",   // Cyber Pink
  "rgba(0, 255, 245, 0.8)",   // Cyber Cyan
  "rgba(121, 40, 202, 0.8)",  // Cyber Purple
];

const getRandomColors = () => {
  const shuffled = [...THEME_COLORS].sort(() => 0.5 - Math.random());
  const numColors = Math.floor(Math.random() * 2) + 4; // Randomly choose 4 or 5 colors
  return shuffled.slice(0, numColors);
};

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useThemeStore();
  const { user, initialize, isLoading, signOut } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const colors = getRandomColors();

  useEffect(() => {
    console.log("UserMenu mounted, initializing auth...");
    // Properly handle the Promise returned by initialize
    initialize().catch((error) => {
      console.error("Failed to initialize auth:", error);
    });
  }, [initialize]);

  const handleSignOut = async () => {
    console.log("Initiating sign out");
    setOpen(false);
    const errorMessage = await signOut();

    if (errorMessage) {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } else {
      console.log("Sign out successful, navigating to home");
      navigate("/");
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
    }
  };

  const handleSettingsClick = () => {
    console.log("Settings clicked");
    toast({
      title: "Settings",
      description: "Settings page coming soon!",
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <UserMenuTrigger
          onClick={() => {
            console.log("UserMenu trigger clicked");
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