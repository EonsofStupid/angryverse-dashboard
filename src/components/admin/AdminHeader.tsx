import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminStore } from "@/store/useAdminStore";

export const AdminHeader = () => {
  const currentSection = useAdminStore((state) => state.currentSection);

  return (
    <header className="fixed top-0 right-0 left-0 bg-background border-b z-50 h-16 w-full">
      <div className="flex items-center justify-between px-6 h-full">
        <h1 className="text-xl font-semibold">{currentSection}</h1>
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};