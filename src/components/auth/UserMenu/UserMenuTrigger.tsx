import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAuthStore } from "@/store/useAuthStore";
import { UserMenuTrigger } from "./UserMenuTrigger";
import { UserProfile } from "./UserProfile";
import { AuthForm } from "./AuthForm";
import { cn } from "@/lib/utils";

const THEME_COLORS = [
  'rgba(139, 92, 246, 0.8)',
  'rgba(217, 70, 239, 0.8)',
  'rgba(249, 115, 22, 0.8)',
  'rgba(14, 165, 233, 0.8)',
  'rgba(255, 0, 127, 0.8)',
  'rgba(0, 255, 245, 0.8)',
  'rgba(121, 40, 202, 0.8)',
];

const getRandomColors = () => {
  const shuffled = [...THEME_COLORS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
};

export const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, isLoading, initialize } = useAuthStore();
  const colors = getRandomColors();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <UserMenuTrigger
          onClick={() => setOpen(true)}
          colors={colors}
        />
      </SheetTrigger>
      <SheetContent
        side="right"
        className={cn(
          "fixed inset-y-0 right-0",
          "w-[300px] sm:w-[400px]",
          "bg-background/80 backdrop-blur-md",
          "border-l border-primary/10 shadow-lg z-[100]"
        )}
      >
        <VisuallyHidden>
          <h2>User Menu</h2>
          <p>Access your account settings and manage your profile.</p>
        </VisuallyHidden>

        <div className="flex flex-col gap-4 mt-8 p-4">
          {isLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : user ? (
            <UserProfile
              user={user}
              isAdmin={isAdmin}
              onSignOut={async () => {
                await useAuthStore.getState().signOut();
                setOpen(false);
              }}
              onClose={() => setOpen(false)}
            />
          ) : (
            <AuthForm />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
