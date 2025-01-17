import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthForm } from "../AuthForm";
import { UserMenuTrigger } from "./components/UserMenuTrigger";
import { UserProfile } from "./components/UserProfile";
import { cn } from "@/lib/utils";

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { theme } = useThemeStore();
  const { user, initialize, isLoading } = useAuthStore();

  useEffect(() => {
    console.log('UserMenu mounted, initializing auth...');
    initialize();
  }, [initialize]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <UserMenuTrigger onClick={() => setOpen(true)} />
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
            <UserProfile onClose={() => setOpen(false)} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserMenu;