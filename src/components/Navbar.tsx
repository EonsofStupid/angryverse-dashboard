import { Search, Bell, Menu } from "lucide-react";
import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 glass">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-cyber font-bold text-gradient">
            AngryGaming
          </h1>
          <div className="hidden md:flex space-x-6">
            <Button variant="ghost" className="hover-glow">
              Dashboard
            </Button>
            <Button variant="ghost" className="hover-glow">
              Content
            </Button>
            <Button variant="ghost" className="hover-glow">
              Analytics
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover-glow">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hover-glow">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden hover-glow">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};