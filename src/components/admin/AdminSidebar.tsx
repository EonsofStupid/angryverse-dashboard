import { 
  LayoutDashboard, Users, Settings, 
  ChevronRight, Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminStore } from "@/store/useAdminStore";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const AdminSidebar = () => {
  const { sidebarOpen, toggleSidebar, setCurrentSection, setBreadcrumbs } = useAdminStore();

  const handleNavigation = (section: string) => {
    setCurrentSection(section);
    setBreadcrumbs(['Admin', section]);
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-background border-r transition-all duration-300",
        sidebarOpen ? "w-64" : "w-16"
      )}
    >
      <div className="p-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mb-4"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => handleNavigation(item.label)}
              className={cn(
                "flex items-center px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                "text-sm font-medium"
              )}
            >
              <item.icon className="h-5 w-5" />
              {sidebarOpen && (
                <span className="ml-3">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};