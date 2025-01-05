import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";
import { User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "./auth/AuthForm";
import { UserProfile } from "./auth/UserProfile";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, checkAdminStatus } = useAuthStore();
  const { theme } = useThemeStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      switch (event) {
        case 'INITIAL_SESSION':
          if (session?.user) {
            console.log("Initial session with user:", session.user);
            setUser(session.user);
            await checkAdminStatus(session.user.id);
          }
          break;
        case 'SIGNED_IN':
          if (session) {
            setOpen(false);
            setUser(session.user);
            await checkAdminStatus(session.user.id);
            navigate('/');
            toast({
              title: "Welcome back!",
              description: "You have successfully signed in.",
            });
          }
          break;
        case 'SIGNED_OUT':
          setUser(null);
          toast({
            title: "Signed out",
            description: "You have been successfully signed out.",
          });
          break;
        case 'TOKEN_REFRESHED':
          console.log("Token refreshed successfully");
          break;
        case 'USER_UPDATED':
          if (session?.user) {
            setUser(session.user);
            await checkAdminStatus(session.user.id);
          }
          toast({
            title: "Profile updated",
            description: "Your profile has been successfully updated.",
          });
          break;
        default:
          console.log("Unhandled auth event:", event);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast, setUser, checkAdminStatus]);

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
            <AuthForm theme={theme} />
          ) : (
            <UserProfile onClose={() => setOpen(false)} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserMenu;