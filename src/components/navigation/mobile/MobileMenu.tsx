import { MobileNavLink } from "./MobileNavLink";
import { cn } from "@/lib/utils";
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { useAuthStore } from "@/store/useAuthStore";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { X } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          {/* Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed right-0 top-0 bottom-0 w-[280px] z-50"
          >
            <div className="h-full glass-frost overflow-y-auto">
              <div className="sticky top-0 flex justify-end p-4">
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="px-6 py-4 space-y-6">
                <MobileNavLink 
                  to="/" 
                  className="text-lg font-semibold text-foreground"
                  onClick={onClose}
                >
                  Home
                </MobileNavLink>
                
                {isAdmin && (
                  <>
                    <MobileNavLink 
                      to="/admin" 
                      onClick={onClose}
                      className="text-lg"
                    >
                      Admin
                    </MobileNavLink>
                    <MobileNavLink 
                      to="/admin/portal" 
                      onClick={onClose}
                      className="text-lg"
                    >
                      Portal
                    </MobileNavLink>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};