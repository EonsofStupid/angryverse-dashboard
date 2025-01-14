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
                className="relative font-semibold text-foreground hover:text-primary transition-all duration-300 
                          hover:scale-105 group cursor-pointer"
              >
                Home
                <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity 
                               duration-300 blur-lg bg-primary/30 rounded-full scale-150"></span>
              </Link>
              {isAdmin && (
                <>
                  <Link 
                    to="/admin" 
                    className="relative text-muted-foreground hover:text-foreground transition-all duration-300 
                              hover:scale-105 group cursor-pointer"
                  >
                    Admin
                    <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity 
                                   duration-300 blur-lg bg-secondary/30 rounded-full scale-150"></span>
                  </Link>
                  <Link 
                    to="/admin/portal" 
                    onClick={handlePortalClick}
                    className="relative text-muted-foreground hover:text-foreground transition-all duration-300 
                              hover:scale-105 group cursor-pointer"
                  >
                    Portal
                    <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity 
                                   duration-300 blur-lg bg-accent/30 rounded-full scale-150"></span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden relative text-foreground hover:text-primary transition-all duration-300 
                        hover:scale-105 group"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 transform transition-transform duration-300 rotate-0 hover:rotate-90" />
              ) : (
                <Menu className="h-6 w-6 transform transition-transform duration-300 rotate-0 hover:rotate-180" />
              )}
              <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity 
                             duration-300 blur-lg bg-primary/30 rounded-full scale-150"></span>
            </button>

            <UserMenu />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden absolute w-full bg-background/80 backdrop-blur-md border-b border-white/10",
            "transition-all duration-500 ease-in-out transform",
            isMenuOpen 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-2 pointer-events-none"
          )}
        >
          <div className={cn(
            "container mx-auto px-4 py-4 space-y-4 transition-all duration-500",
            isMenuOpen ? "transform translate-y-0" : "transform -translate-y-4"
          )}>
            <Link 
              to="/" 
              className="block relative font-semibold text-foreground hover:text-primary 
                        transition-all duration-300 hover:translate-x-2 group"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
              <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 
                             transition-opacity duration-300 blur-lg bg-primary/30"></span>
            </Link>
            {isAdmin && (
              <>
                <Link 
                  to="/admin" 
                  className="block relative text-muted-foreground hover:text-foreground 
                            transition-all duration-300 hover:translate-x-2 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                  <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 
                                 transition-opacity duration-300 blur-lg bg-secondary/30"></span>
                </Link>
                <Link 
                  to="/admin/portal" 
                  onClick={(e) => {
                    handlePortalClick(e);
                    setIsMenuOpen(false);
                  }}
                  className="block relative text-muted-foreground hover:text-foreground 
                            transition-all duration-300 hover:translate-x-2 group"
                >
                  Portal
                  <span className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 
                                 transition-opacity duration-300 blur-lg bg-accent/30"></span>
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