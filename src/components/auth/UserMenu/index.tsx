import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useThemeStore } from "@/store/useThemeStore";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AuthForm } from "../AuthForm";
import { UserMenuTrigger } from "./components/UserMenuTrigger";
import { UserMenuContent } from "./components/UserMenuContent";
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";

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
  const { theme } = useThemeStore();
  const [open, setOpen] = useState(false);
  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');

  const colors = useMemo(() => getRandomColors(), []); 
  const gradientBorder = `linear-gradient(45deg, ${colors.join(', ')})`;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <UserMenuTrigger 
          gradientBorder={gradientBorder}
          onClick={() => setOpen(true)}
        />
      </SheetTrigger>
      <SheetContent 
        className={cn(
          "w-[300px] sm:w-[400px] fixed inset-y-0 right-0 z-[100]",
          "flex h-full flex-col transition-all duration-300",
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
            <UserMenuContent 
              onClose={() => setOpen(false)} 
              isAdmin={isAdmin} 
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserMenu;