import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { useAdminStore } from "@/store/useAdminStore";
import { useTheme } from "@/hooks/useTheme";
import { Loader2 } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const sidebarOpen = useAdminStore((state) => state.sidebarOpen);
  const { isLoading, error } = useTheme();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold text-destructive">Theme Error</p>
          <p className="text-muted-foreground">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
          <div className="container mx-auto px-6 py-8">
            <AdminBreadcrumb />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};