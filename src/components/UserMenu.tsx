import { useState, useEffect, useMemo } from "react";
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

const THEME_COLORS = [
  'rgba(139, 92, 246, 0.8)',  // Vivid Purple
  'rgba(217, 70, 239, 0.8)',  // Magenta Pink
  'rgba(249, 115, 22, 0.8)',  // Bright Orange
  'rgba(14, 165, 233, 0.8)',  // Ocean Blue
  'rgba(255, 0, 127, 0.8)',   // Cyber Pink
  'rgba(0, 255, 245, 0.8)',   // Cyber Cyan
  'rgba(121, 40, 202, 0.8)'   // Cyber Purple
];

const getRandomColors = () => {
  const shuffled = [...THEME_COLORS].sort(() => 0.5 - Math.random());
  const numColors = Math.floor(Math.random() * 2) + 4; // Random number between 4-5
  return shuffled.slice(0, numColors);
};

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
      
      // Debug RLS access
      const profileTest = await supabase.from('profiles').select('*');
      console.log("Profiles access test:", profileTest);
      
      const rolesTest = await supabase.from('user_roles').select('*');
      console.log("Roles access test:", rolesTest);
      
      switch (event) {
        case 'INITIAL_SESSION':
          if (session?.user) {
            console.log("Setting initial user:", session.user);
            setUser(session.user);
          }
          break;
        case 'SIGNED_IN':
          if (session) {
            console.log("User signed in:", session.user);
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
          console.log("User signed out");
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
            console.log("User updated:", session.user);
            setUser(session.user);
            toast({
              title: "Profile updated",
              description: "Your profile has been successfully updated.",
            });
          }
          break;
        case 'PASSWORD_RECOVERY':
          console.log("Password recovery initiated");
          toast({
            title: "Password recovery",
            description: "Check your email for password reset instructions.",
          });
          break;
      }
    });

    const checkSession = async () => {
      console.log("Checking session...");
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Session check error:", error);
        return;
      }
      if (session?.user) {
        console.log("Found existing session:", session.user);
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

  const colors = useMemo(() => getRandomColors(), []); // Get random theme colors
  const gradientBorder = `linear-gradient(45deg, ${colors.join(', ')})`;

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
            "overflow-hidden",
            "z-50"
          )}
          style={{
            '--avatar-gradient': gradientBorder
          } as React.CSSProperties}
        >
          <div className={cn(
            "absolute inset-0 rounded-full",
            "transition-opacity duration-300",
            "opacity-0 group-hover:opacity-100"
          )}
          style={{
            background: gradientBorder,
            filter: "blur(8px)",
            transform: "scale(1.2)"
          }} />
          <Avatar className={cn(
            "relative z-10 transition-all duration-300",
            "w-9 h-9", // Increased size by ~15%
            "before:absolute before:inset-0",
            "before:rounded-full before:p-[2px]",
            "before:bg-[var(--avatar-gradient)]",
            "before:content-['']",
            "before:opacity-100",
            "after:absolute after:inset-[2px]",
            "after:rounded-full after:bg-background",
            "after:content-['']",
            "group-hover:scale-110",
            "group-hover:shadow-[0_0_25px_rgba(155,135,245,0.8)]"
          )}>
            <AvatarFallback className="bg-transparent">
              <User className="h-5 w-5 text-foreground/80" />
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
