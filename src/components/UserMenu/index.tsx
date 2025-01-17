import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useThemeStore } from "@/store/useThemeStore";
import { useAuthStore } from "@/store/useAuthStore";
import { AuthForm } from "../auth/AuthForm";
import { UserMenuTrigger } from "./UserMenuTrigger";
import { UserProfile } from "./UserProfile";
import { AdminOptions } from "./AdminOptions";
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
  const { user, initialize, isAdmin, isLoading } = useAuthStore();
  const colors = getRandomColors();

  useEffect(() => {
    console.log('UserMenu mounted, initializing auth...');
    initialize();
  }, [initialize]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <UserMenuTrigger 
          open={open} 
          onOpenChange={setOpen}
          colors={colors}
        />
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
            <div className="flex flex-col gap-4">
              <UserProfile onClose={() => setOpen(false)} />
              {isAdmin && <AdminOptions onClose={() => setOpen(false)} />}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserMenu;