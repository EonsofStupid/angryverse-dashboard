import { UserMenu } from "./UserMenu";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { useRoleCheck } from "@/hooks/useRoleCheck";
import { useTheme } from "@/hooks/useTheme";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const { user } = useAuthStore();
  const { hasRole: isAdmin } = useRoleCheck(user, 'admin');
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentTheme } = useTheme();

  const handlePortalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/admin/portal");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link 
                to="/" 
                className="font-semibold text-foreground hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
              {isAdmin && (
                <>
                  <Link 
                    to="/admin" 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Admin
                  </Link>
                  <Link 
                    to="/admin/portal" 
                    onClick={handlePortalClick}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    Portal
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden text-foreground hover:text-primary transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <UserMenu />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden absolute w-full bg-background/80 backdrop-blur-md border-b border-white/10",
            "transition-all duration-300 ease-in-out",
            isMenuOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          )}
        >
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/" 
              className="block font-semibold text-foreground hover:text-primary transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {isAdmin && (
              <>
                <Link 
                  to="/admin" 
                  className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
                <Link 
                  to="/admin/portal" 
                  onClick={(e) => {
                    handlePortalClick(e);
                    setIsMenuOpen(false);
                  }}
                  className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  Portal
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <div className="h-16" /> {/* Spacer for fixed navbar */}
    </>
  );
};