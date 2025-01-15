import { DesktopNavLink } from "./DesktopNavLink";
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { useAuthStore } from "@/store/useAuthStore";

export const DesktopNav = () => {
  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');

  const handlePortalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/admin/portal");
  };

  return (
    <div className="hidden md:flex items-center gap-6">
      <DesktopNavLink to="/" className="text-foreground">
        Home
      </DesktopNavLink>
      
      {isAdmin && (
        <>
          <DesktopNavLink to="/admin">
            Admin
          </DesktopNavLink>
          <DesktopNavLink 
            to="/admin/portal" 
            onClick={handlePortalClick}
          >
            Portal
          </DesktopNavLink>
        </>
      )}
    </div>
  );
};
