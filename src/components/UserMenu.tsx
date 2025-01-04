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

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, setUser, setIsAdmin, signOut } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          // Here you would check if the user is an admin
          // For now, we'll just set it to false
          setIsAdmin(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [setUser, setIsAdmin]);

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
                </div>
              </div>
              
              <Button
                variant="ghost"
                className="justify-start gap-2"
                onClick={() => {/* Navigate to settings */}}
              >
                <Settings className="h-5 w-5" />
                Settings
              </Button>

              {isAdmin && (
                <Button
                  variant="ghost"
                  className="justify-start gap-2"
                  onClick={() => {/* Navigate to admin dashboard */}}
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