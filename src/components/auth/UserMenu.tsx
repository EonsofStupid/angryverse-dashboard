import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthForm } from "@/components/auth/AuthForm"; // Fixed import path
import { Button } from "@/components/ui/button"; // Fixed import path
import { Avatar, AvatarFallback } from "@/components/ui/avatar"; // Fixed import path
import { Settings, LogOut, Database, LayoutDashboard, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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
  const numColors = Math.floor(Math.random() * 2) + 4;
  return shuffled.slice(0, numColors);
};

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useThemeStore();
  const { user, initialize, isAdmin, isLoading, signOut } = useAuthStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const colors = getRandomColors();
  const gradientBorder = `linear-gradient(45deg, ${colors.join(', ')})`;

  useEffect(() => {
    console.log('UserMenu mounted, initializing auth...');
    initialize();
  }, [initialize]);

  const handleSignOut = async () => {
    try {
      console.log('Initiating sign out');
      setOpen(false);
      await signOut();
      console.log('Sign out successful, navigating to home');
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
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative transition-all duration-300 hover:bg-transparent group focus-visible:ring-1 focus-visible:ring-primary/50 overflow-hidden z-50"
          onClick={() => {
            console.log('UserMenu trigger clicked');
            setOpen(true);
          }}
          style={{
            '--avatar-gradient': gradientBorder
          } as React.CSSProperties}
        >
          <div 
            className="absolute inset-0 rounded-full transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{
              background: gradientBorder,
              filter: "blur(8px)",
              transform: "scale(1.2)"
            }} 
          />
          <Avatar className="relative z-10 transition-all duration-300 w-9 h-9 before:absolute before:inset-0 before:rounded-full before:p-[2px] before:bg-[var(--avatar-gradient)] before:content-[''] before:opacity-100 after:absolute after:inset-[2px] after:rounded-full after:bg-background after:content-[''] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(155,135,245,0.8)]">
            <AvatarFallback className="bg-transparent">
              <User className="h-5 w-5 text-foreground/80" />
            </AvatarFallback>
          </Avatar>
        </Button>
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
            <AuthForm theme={theme} />
          ) : (
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
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
