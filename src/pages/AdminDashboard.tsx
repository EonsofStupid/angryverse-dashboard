import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/useAuthStore";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { UserManagement } from "@/components/admin/UserManagement";
import { Settings } from "@/components/admin/Settings";
import { DashboardOverview } from "@/components/admin/DashboardOverview";
import { MediaLibrary } from "@/components/admin/content/MediaLibrary";
import { CategoriesManagement } from "@/components/admin/content/CategoriesManagement";
import { CommentsManagement } from "@/components/admin/content/CommentsManagement";
import { ThemeManagement } from "@/components/admin/ThemeManagement";
import { PortalContent } from "@/components/admin/social_portal/Social_PortalContent";
import { DatabaseManagement } from "@/components/admin/database/DatabaseManagement";
import { Documentation } from "@/components/admin/documentation/Documentation";
import { PermissionManagement } from "@/components/admin/permissions/PermissionManagement";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Loader2 } from "lucide-react";
import { useRoleCheck } from "@/hooks/useRoleCheck";

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const { hasRole: isAdmin, isLoading: roleLoading } = useRoleCheck(user, 'admin');
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentPath = location.pathname.split('/').pop() || 'dashboard';

  useEffect(() => {
    if (!roleLoading) {
      if (!user) {
        toast.error("Please sign in to access this area");
        navigate("/");
        return;
      }

      if (!isAdmin) {
        toast.error("You don't have permission to access this area");
        navigate("/");
        return;
      }
    }
  }, [user, isAdmin, roleLoading, navigate]);

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  const isPortalRoute = location.pathname.includes('/portal');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AdminLayout>
        {!isPortalRoute ? (
          <Tabs 
            defaultValue={currentPath} 
            value={currentPath}
            className="w-full"
            onValueChange={(value) => {
              const newPath = value === 'dashboard' ? '/admin' : `/admin/${value}`;
              navigate(newPath);
            }}
          >
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
              <TabsTrigger value="database">Database</TabsTrigger>
              <TabsTrigger value="themes">Themes</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="portal">Portal</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard">
              <DashboardOverview />
            </TabsContent>
            
            <TabsContent value="posts">
              <Outlet />
            </TabsContent>
            
            <TabsContent value="media">
              <MediaLibrary />
            </TabsContent>
            
            <TabsContent value="categories">
              <CategoriesManagement />
            </TabsContent>
            
            <TabsContent value="comments">
              <CommentsManagement />
            </TabsContent>
            
            <TabsContent value="users">
              <UserManagement />
            </TabsContent>

            <TabsContent value="permissions">
              <PermissionManagement />
            </TabsContent>

            <TabsContent value="database">
              <DatabaseManagement />
            </TabsContent>
            
            <TabsContent value="themes">
              <ThemeManagement />
            </TabsContent>
            
            <TabsContent value="documentation">
              <Documentation />
            </TabsContent>

            <TabsContent value="settings">
              <Settings />
            </TabsContent>

            <TabsContent value="portal">
              <Social_Portal />
            </TabsContent>
          </Tabs>
        ) : (
          <Social_Portal />
        )}
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;