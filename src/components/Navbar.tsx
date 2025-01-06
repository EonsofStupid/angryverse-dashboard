import { Search, Bell, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { UserMenu } from "./UserMenu";
import { useAuthStore } from "@/store/useAuthStore";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { isAdmin, user } = useAuthStore();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full z-50 glass backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <h1 className="text-2xl font-cyber font-bold text-gradient animate-glow">
                AngryGaming
              </h1>
            </Link>
            <div className="hidden md:flex space-x-6">
              {user ? (
                <>
                  <Link to="/portal">
                    <Button variant="ghost" className="hover-glow text-gray-300 hover:text-white transition-colors duration-500">
                      Portal
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button variant="ghost" className="hover-glow text-gray-300 hover:text-white transition-colors duration-500">
                        Admin
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Button variant="ghost" className="hover-glow text-gray-300 hover:text-white transition-colors duration-500">
                    Guides
                  </Button>
                  <Button variant="ghost" className="hover-glow text-gray-300 hover:text-white transition-colors duration-500">
                    Updates
                  </Button>
                  <Button variant="ghost" className="hover-glow text-gray-300 hover:text-white transition-colors duration-500">
                    Blog
                  </Button>
                  <Button variant="ghost" className="hover-glow text-gray-300 hover:text-white transition-colors duration-500">
                    Videos
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover-glow text-gray-300 hover:text-white transition-colors duration-500">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover-glow text-gray-300 hover:text-white transition-colors duration-500">
              <Bell className="h-5 w-5" />
            </Button>
            <UserMenu />
            <Button variant="ghost" size="icon" className="md:hidden hover-glow text-gray-300 hover:text-white transition-colors duration-500">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>
      {/* Add spacing below navbar to prevent content from being hidden */}
      <div className="h-16"></div>
    </>
  );
};