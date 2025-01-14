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
    // Reset animating state after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Match this with your animation duration
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-accent/50 transition-colors"
          onClick={() => handleOpenChange(true)}
        >
          <Avatar>
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent 
        className={cn(
          "w-[300px] sm:w-[400px] transition-all duration-300",
          "fixed inset-y-0 right-0 z-50 flex flex-col",
          isAnimating ? "transform translate-x-0" : "",
          !isAnimating && "glass"
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