import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { Settings, LogOut, Database, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useToast } from "@/hooks/use-toast";
import { DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, setUser, checkAdminStatus, signOut } = useAuthStore();
  const { theme } = useThemeStore();
  const { toast } = useToast();

  useEffect(() => {
    console.log('Setting up auth state change listener...');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        console.log('Current user state:', user);
        
        if (event === 'SIGNED_OUT') {
          console.log('SIGNED_OUT event received, clearing user...');
          setUser(null);
          return;
        }
        
        if (session?.user) {
          console.log('Session user found, updating state...', session.user);
          setUser(session.user);
          await checkAdminStatus(session.user.id);
        }
      }
    );

    return () => {
      console.log('Cleaning up auth state change listener...');
      subscription.unsubscribe();
    }
  }, [setUser, checkAdminStatus, user]);

  const handleSignOut = async () => {
    try {
      console.log('Handling sign out click...');
      console.log('Current user before signOut:', user);
      await signOut();
      console.log('SignOut completed successfully');
      setOpen(false);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
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
                      brand: 'hsl(var(--primary))',
                      brandAccent: 'hsl(var(--primary))',
                    },
                  },
                },
              }}
              theme={theme === 'dark' ? 'dark' : 'light'}
            />
          ) : (
            <>
              <div className="flex items-center gap-2 p-2">
                <Avatar>
                  <AvatarFallback>
                    {user.email?.[0].toUpperCase() ?? 'U'}
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
                    window.location.href = '/admin';
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