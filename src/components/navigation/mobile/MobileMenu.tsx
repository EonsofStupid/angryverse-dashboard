import { MobileNavLink } from "./MobileNavLink";
import { cn } from "@/lib/utils";
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { useAuthStore } from "@/store/useAuthStore";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');

  const handlePortalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Navigate to the portal
    onClose();
  };

  return (
    <div
      className={cn(
        "md:hidden absolute w-full glass",
        "transition-all duration-500 ease-in-out transform",
        isOpen 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 -translate-y-2 pointer-events-none"
      )}
    >
      <div className={cn(
        "container mx-auto px-4 py-4 space-y-4 transition-all duration-500",
        isOpen ? "transform translate-y-0" : "transform -translate-y-4"
      )}>
        <MobileNavLink 
          to="/" 
          className="font-semibold text-foreground"
          onClick={onClose}
        >
          Home
        </MobileNavLink>
        
        {isAdmin && (
          <>
            <MobileNavLink 
              to="/admin" 
              onClick={onClose}
            >
              Admin
            </MobileNavLink>
            <MobileNavLink 
              to="/admin/portal" 
              onClick={handlePortalClick}
            >
              Portal
            </MobileNavLink>
          </>
        )}
      </div>
    </div>
  );
};
