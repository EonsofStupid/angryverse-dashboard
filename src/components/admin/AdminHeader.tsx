import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAdminStore } from "@/store/useAdminStore";
import { UserMenu } from "@/components/UserMenu";

export const AdminHeader = () => {
  const currentSection = useAdminStore((state) => state.currentSection);

  return (
    <header className="fixed top-0 right-0 left-0 bg-background border-b z-50 h-16">
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
          <UserMenu />
        </div>
      </div>
    </header>
  );
};