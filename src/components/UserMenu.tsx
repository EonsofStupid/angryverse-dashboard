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
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { cn } from "@/lib/utils";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useAuthStore();
  const { theme } = useThemeStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      switch (event) {
        case 'INITIAL_SESSION':
          if (session?.user) {
            setUser(session.user);
          }
          break;
        case 'SIGNED_IN':
          if (session) {
            setUser(session.user);
            setOpen(false);
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
            toast({
              title: "Profile updated",
              description: "Your profile has been successfully updated.",
            });
          }
          break;
        case 'PASSWORD_RECOVERY':
          toast({
            title: "Password recovery",
            description: "Check your email for password reset instructions.",
          });
          break;
      }
    });

    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session check error:", error);
        return;
      }
      if (session?.user) {
        setUser(session.user);
      }
    };
    
    checkSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast, setUser]);

  const handleOpenChange = (isOpen: boolean) => {
    setIsAnimating(true);
    setOpen(isOpen);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "relative transition-all duration-300",
            "hover:bg-transparent group",
            "focus-visible:ring-1 focus-visible:ring-primary/50",
            "after:absolute after:inset-0 after:rounded-full",
            "after:transition-all after:duration-300",
            "hover:after:bg-[rgba(155,135,245,0.1)]",
            "hover:after:backdrop-blur-md",
            "hover:after:border hover:after:border-white/10",
            "hover:after:shadow-[inset_0_0.5px_0.5px_0_rgba(255,255,255,0.3),0_4px_12px_rgba(155,135,245,0.2)]",
            "hover:after:scale-110"
          )}
        >
          <Avatar className="relative z-10">
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent 
        className={cn(
          "w-[300px] sm:w-[400px]",
          "fixed inset-y-0 right-0 z-[100]",
          "flex h-full flex-col",
          "transition-all duration-300",
          !open && "translate-x-full",
          open && "translate-x-0",
          "glass"
        )}
        side="right"
      >
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
            <UserProfile 
              onClose={() => handleOpenChange(false)} 
              isAdmin={isAdmin} 
              isCheckingRole={false}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserMenu;
