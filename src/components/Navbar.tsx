import { UserMenu } from "./UserMenu";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { useRoleCheck } from "@/hooks/useRoleCheck";

export const Navbar = () => {
  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');
  const navigate = useNavigate();

  const handlePortalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/admin/portal");
  };

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
                <>
                  <Link to="/admin" className="text-muted-foreground hover:text-foreground">
                    Admin
                  </Link>
                  <Link 
                    to="/admin/portal" 
                    onClick={handlePortalClick}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Portal
                  </Link>
                </>
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