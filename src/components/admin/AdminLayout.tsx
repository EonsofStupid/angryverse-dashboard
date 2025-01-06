import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { useAdminStore } from "@/store/useAdminStore";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const sidebarOpen = useAdminStore((state) => state.sidebarOpen);

  return (
    <div className="min-h-screen bg-background w-full">
      <AdminHeader />
      <div className="flex w-full">
        <AdminSidebar />
        <main 
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-16'
          }`}
        >
          <div className="px-6 py-8 mt-16">
            <AdminBreadcrumb />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};