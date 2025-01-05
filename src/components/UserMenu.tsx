import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { Settings, LogOut, Database, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useToast } from "@/hooks/use-toast";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useNavigate } from "react-router-dom";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuthStore();
  const { theme } = useThemeStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Add auth state change listener
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      setOpen(false);
      navigate('/');
      toast({
        title: "Welcome!",
        description: "You have successfully signed in.",
      });
    }
  });

  const handleSignOut = async () => {
    try {
      setOpen(false);
      await signOut();
      navigate("/");
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="hover-glow">
          <Avatar>
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px] glass">
        <VisuallyHidden>
          <DialogTitle>User Menu</DialogTitle>
          <DialogDescription>
            Access your account settings and manage your profile
          </DialogDescription>
        </VisuallyHidden>
        <div className="flex flex-col gap-4 mt-8">
          {!user ? (
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "hsl(var(--primary))",
                      brandAccent: "hsl(var(--primary))",
                    },
                  },
                },
              }}
              theme={theme === "dark" ? "dark" : "light"}
              providers={[]}
              redirectTo={window.location.origin}
            />
          ) : (
            <>
              <div className="flex items-center gap-2 p-2">
                <Avatar>
                  <AvatarFallback>
                    {user.email?.[0].toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{user.email}</span>
                  {isAdmin && <span className="text-sm text-muted-foreground">Admin</span>}
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

              {isAdmin && (
                <Button
                  variant="ghost"
                  className="justify-start gap-2"
                  onClick={() => {
                    navigate("/admin");
                    setOpen(false);
                  }}
                >
                  <Database className="h-5 w-5" />
                  Admin Dashboard
                </Button>
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
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserMenu;