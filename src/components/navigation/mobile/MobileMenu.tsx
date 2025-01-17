import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MobileNavLink } from "./MobileNavLink";
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { useAuthStore } from "@/store/useAuthStore";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "fixed top-14 left-0 right-0",
        "glass-frost",
        "border-b border-white/10",
        "shadow-lg shadow-primary/10",
        "bg-background/80",
        "backdrop-blur-md",
        "z-50"
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col space-y-2">
          <MobileNavLink to="/" onClick={onClose}>
            Home
          </MobileNavLink>
          
          {isAdmin && (
            <>
              <MobileNavLink to="/admin" onClick={onClose}>
                Admin
              </MobileNavLink>
              <MobileNavLink to="/admin/portal" onClick={onClose}>
                Portal
              </MobileNavLink>
            </>
          )}
        </nav>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 animate-scan-line bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>
    </motion.div>
  );
};