import { UserMenu } from "./UserMenu";
import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "react-router-dom";
import { useRoleCheck } from "@/hooks/useRoleCheck";

export const Navbar = () => {
  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="font-semibold">
                Home
              </Link>
              {isAdmin && (
                <Link to="/admin" className="text-muted-foreground hover:text-foreground">
                  Admin
                </Link>
              )}
            </div>
            <UserMenu />
          </div>
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
};