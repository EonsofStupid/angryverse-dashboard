import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
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
import { PortalContent } from "@/components/portal/PortalContent";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Loader2 } from "lucide-react";
import { useRoleCheck } from "@/hooks/useRoleCheck";

const AdminDashboard = () => {
  const { user, isLoading: authLoading } = useAuthStore();
  const { hasRole: isAdmin, isLoading: roleLoading } = useRoleCheck(user, 'admin');
  const navigate = useNavigate();
  const location = useLocation();
  const isPortal = location.pathname === '/portal';
  const currentPath = location.pathname.split('/').pop() || '';

  console.log('AdminDashboard rendering:', {
    currentPath,
    pathname: location.pathname,
    isPortal,
    user: !!user,
    isAdmin,
    authLoading,
    roleLoading
  });

  // Single auth check for both admin and portal
  useEffect(() => {
    console.log('Auth check effect running:', {
      pathname: location.pathname,
      user: !!user,
      isAdmin,
      authLoading,
      roleLoading
    });

    if (!authLoading && !user) {
      console.log("No user found, redirecting to home");
      toast.error("Please sign in to access this area");
      navigate("/");
      return;
    }

    if (!authLoading && !roleLoading && !isAdmin) {
      console.log("User is not admin, redirecting to home");
      toast.error("You don't have permission to access this area");
      navigate("/");
    }
  }, [user, isAdmin, authLoading, roleLoading, navigate, location.pathname]);

  if (authLoading || roleLoading) {
    console.log('Showing loading state');
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    console.log('User or admin check failed, rendering null');
    return null;
  }

  // Portal route
  if (isPortal) {
    console.log('Rendering portal content');
    return (
      <div className="min-h-screen bg-transparent text-foreground relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-b from-background via-background/90 to-background/80 z-0" />
        <div className="relative z-10">
          <Navbar />
          <div className="pt-20">
            <PortalContent />
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard route
  console.log('Rendering admin dashboard:', { currentPath });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AdminLayout>
        <Tabs 
          defaultValue={currentPath || ''} 
          value={currentPath} 
          className="w-full" 
          onValueChange={(value) => {
            const newPath = value ? `/admin/${value}` : '/admin';
            console.log('Tab change, navigating to:', newPath);
            navigate(newPath);
          }}
        >
          <TabsList>
            <TabsTrigger value="">Dashboard</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="">
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
          
          <TabsContent value="themes">
            <ThemeManagement />
          </TabsContent>
          
          <TabsContent value="settings">
            <Settings />
          </TabsContent>
        </Tabs>
      </AdminLayout>
    </div>
  );
};

export default AdminDashboard;