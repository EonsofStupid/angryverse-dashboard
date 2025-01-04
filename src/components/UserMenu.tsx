import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { Settings, LogIn, LogOut, Database, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useToast } from "@/components/ui/use-toast";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, setUser, checkAdminStatus, signOut } = useAuthStore();
  const { theme } = useThemeStore();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await checkAdminStatus(session.user.id);
          console.log("Checked admin status for user:", session.user.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [setUser, checkAdminStatus]);

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
                onClick={() => {
                  signOut();
                  setOpen(false);
                }}
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