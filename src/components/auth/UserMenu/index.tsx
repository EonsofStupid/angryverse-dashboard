import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useThemeStore } from "@/store/useThemeStore";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { cn } from "@/lib/utils";
import { useUserMenu } from "./hooks/useUserMenu";
import { UserAvatar } from "./components/UserAvatar";
import { AuthForm } from "./components/AuthForm";
import { UserProfile } from "./components/UserProfile";
import "./styles.css";

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
  const numColors = Math.floor(Math.random() * 2) + 4;
  return shuffled.slice(0, numColors);
};

export const UserMenu = () => {
  const { open, handleOpenChange, user } = useUserMenu();
  const { theme } = useThemeStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');
  const colors = getRandomColors();
  const gradientBorder = `linear-gradient(45deg, ${colors.join(', ')})`;

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="user-menu-trigger">
          <div className="user-menu-gradient" style={{ background: gradientBorder }} />
          <UserAvatar gradientBorder={gradientBorder} />
        </Button>
      </SheetTrigger>
      <SheetContent className={cn("user-menu-sheet", !open && "translate-x-full", open && "translate-x-0")}>
        <VisuallyHidden>
          <DialogTitle>User Menu</DialogTitle>
          <DialogDescription>
            Access your account settings and manage your profile
          </DialogDescription>
        </VisuallyHidden>
        <div className="user-menu-content">
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